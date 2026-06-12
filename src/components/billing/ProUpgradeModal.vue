<script setup>
import { onMounted, ref } from 'vue';
import { Crown, Loader2, X } from 'lucide-vue-next';
import http from '@/services/api';
import { useI18n } from '@/composables/useI18n';
import { useClientConfigStore } from '@/stores/clientConfig';
import { parsePaddleInitiateResponse, redirectToPaddleCheckout } from '@/utils/billingCheckout';

const props = defineProps({
  formattedPrice: { type: String, default: '$5.99' },
});

const emit = defineEmits(['upgraded', 'close']);

const clientConfig = useClientConfigStore();
const { t } = useI18n();

const loading = ref(true);
const submitting = ref(false);
const error = ref('');
const isDemo = ref(false);

async function initiateCheckout() {
  loading.value = true;
  error.value = '';

  if (!clientConfig.loaded) {
    try {
      await clientConfig.bootstrap();
    } catch {
      /* noop */
    }
  }

  if (clientConfig.paymentProvider === 'none') {
    error.value = t('billing.pro.errors.paymentsDisabled');
    loading.value = false;
    return;
  }

  isDemo.value = clientConfig.paymentProvider === 'demo';

  try {
    const { data } = await http.post('/api/billing/pro-subscription/initiate');
    const parsed = parsePaddleInitiateResponse(data);

    if (parsed.success && parsed.checkoutUrl) {
      redirectToPaddleCheckout(parsed.checkoutUrl);
      return;
    }

    if (isDemo.value && parsed.raw?.payment?.id) {
      loading.value = false;
      return;
    }

    throw new Error(parsed.error || t('billing.pro.errors.intentFailed'));
  } catch (e) {
    const data = e?.response?.data ?? {};
    const code = data.code;
    if (code === 'PAYMENTS_DISABLED') {
      error.value = data.error || data.message || t('billing.pro.errors.paymentsDisabled');
    } else if (code === 'PADDLE_INIT_FAILED') {
      const detail = data.detail ? ` (${data.detail})` : '';
      error.value = (data.error || data.message || t('billing.pro.errors.initFailed')) + detail;
    } else {
      error.value = data.error || data.message || e?.message || t('billing.pro.errors.initFailed');
    }
    loading.value = false;
  }
}

async function submitDemoPayment() {
  submitting.value = true;
  error.value = '';
  try {
    const { data: initData } = await http.post('/api/billing/pro-subscription/initiate');
    const paymentId = initData?.payment?.id;
    if (!paymentId) {
      throw new Error(t('billing.pro.errors.intentFailed'));
    }

    const { data } = await http.post('/api/billing/pro-subscription/confirm', {
      payment_id: paymentId,
      channel: 'card',
      card_number: '4242 4242 4242 4242',
      card_exp: '12/30',
      card_cvc: '123',
    });

    emit('upgraded', data.user);
  } catch (e) {
    error.value = e?.response?.data?.error || e?.response?.data?.message || e?.message || t('billing.pro.errors.confirmFailed');
  } finally {
    submitting.value = false;
  }
}

onMounted(initiateCheckout);
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60" @click.self="emit('close')">
    <div class="w-full max-w-md rounded-2xl border border-line bg-deep shadow-xl overflow-hidden">
      <div class="flex items-center justify-between px-5 py-4 border-b border-line">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-flow/10 flex items-center justify-center">
            <Crown class="w-5 h-5 text-flow" />
          </div>
          <div>
            <p class="text-xs text-ink-muted uppercase tracking-wide">{{ t('billing.pro.title') }}</p>
            <p class="font-display text-lg">{{ t('billing.pro.perMonth', { price: formattedPrice }) }}</p>
          </div>
        </div>
        <button type="button" class="text-ink-muted hover:text-ink p-1" @click="emit('close')">
          <X class="w-5 h-5" />
        </button>
      </div>

      <div class="p-5 space-y-4">
        <p v-if="loading" class="text-sm text-ink-muted flex items-center gap-2">
          <Loader2 class="w-4 h-4 animate-spin" />
          {{ t('billing.pro.preparing') }}
        </p>

        <template v-else-if="isDemo">
          <p class="text-sm text-ink-muted">{{ t('billing.pro.demoDesc') }}</p>
          <p v-if="error" class="text-sm text-red-400">{{ error }}</p>
          <button
            type="button"
            class="w-full rounded-full bg-accent text-cream hover:bg-brand-dark py-3 text-sm font-medium disabled:opacity-50 inline-flex items-center justify-center gap-2"
            :disabled="submitting"
            @click="submitDemoPayment"
          >
            <Loader2 v-if="submitting" class="w-4 h-4 animate-spin" />
            {{ submitting ? t('billing.pro.confirming') : t('billing.pro.pay', { price: formattedPrice }) }}
          </button>
        </template>

        <template v-else>
          <p v-if="error" class="text-sm text-red-400">{{ error }}</p>
          <p v-else class="text-sm text-ink-muted">{{ t('billing.pro.paddleRedirect') }}</p>
          <button
            v-if="error"
            type="button"
            class="w-full rounded-full bg-accent text-cream hover:bg-brand-dark py-3 text-sm font-medium"
            @click="initiateCheckout"
          >
            {{ t('billing.pro.retry') }}
          </button>
        </template>
      </div>
    </div>
  </div>
</template>
