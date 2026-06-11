<script setup>
import { onMounted, ref } from 'vue';
import { CreditCard, Crown, ExternalLink, Loader2, X } from 'lucide-vue-next';
import http from '@/services/api';
import { usePaddle } from '@/composables/usePaddle';
import { useI18n } from '@/composables/useI18n';
import { useAuthStore } from '@/stores/auth';
import { useClientConfigStore } from '@/stores/clientConfig';

const props = defineProps({
  formattedPrice: { type: String, default: '$5.99' },
});

const emit = defineEmits(['upgraded', 'close']);

const auth = useAuthStore();
const clientConfig = useClientConfigStore();
const paddle = usePaddle();
const { t } = useI18n();

const loading = ref(true);
const submitting = ref(false);
const error = ref('');
const paymentId = ref(null);
const checkoutProvider = ref('demo');
const transactionId = ref(null);
const checkoutUrl = ref(null);
const cardNumber = ref('4242 4242 4242 4242');
const cardExp = ref('12/30');
const cardCvc = ref('123');

const isPaddleCheckout = () => checkoutProvider.value === 'paddle';

async function handlePaddleSuccess(data) {
  if (data.user) {
    auth.user = data.user;
  }
  emit('upgraded', data.user);
}

async function startPaddleFlow() {
  submitting.value = true;
  error.value = '';
  try {
    if (transactionId.value || checkoutUrl.value) {
      await paddle.openCheckout(transactionId.value, checkoutUrl.value);
    } else {
      throw new Error(t('billing.pro.errors.incomplete'));
    }

    const data = await paddle.pollPaymentStatus(paymentId.value, {
      onTick: (payload) => {
        if (payload.user) {
          auth.user = payload.user;
        }
      },
    });
    await handlePaddleSuccess(data);
  } catch (e) {
    error.value = paddle.error.value || e?.response?.data?.message || e?.message || t('billing.pro.errors.confirmFailed');
  } finally {
    submitting.value = false;
  }
}

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

  try {
    const { data } = await http.post('/api/billing/pro-subscription/initiate');
    paymentId.value = data.payment?.id ?? null;
    checkoutProvider.value = data.checkout?.provider ?? 'demo';
    transactionId.value = data.checkout?.transaction_id ?? null;
    checkoutUrl.value = data.checkout?.checkout_url ?? null;

    if (data.user) {
      auth.user = data.user;
    }
    if (!paymentId.value) {
      error.value = t('billing.pro.errors.intentFailed');
      return;
    }

    if (isPaddleCheckout()) {
      await startPaddleFlow();
    }
  } catch (e) {
    const code = e?.response?.data?.code;
    if (code === 'PAYMENTS_DISABLED') {
      error.value = e?.response?.data?.message || t('billing.pro.errors.paymentsDisabled');
    } else {
      error.value = e?.response?.data?.message || t('billing.pro.errors.initFailed');
    }
  } finally {
    loading.value = false;
  }
}

async function submitPayment() {
  if (!paymentId.value) {
    error.value = t('billing.pro.errors.notStarted');
    return;
  }
  submitting.value = true;
  error.value = '';
  try {
    const { data } = await http.post('/api/billing/pro-subscription/confirm', {
      payment_id: paymentId.value,
      channel: 'card',
      card_number: cardNumber.value,
      card_exp: cardExp.value.trim(),
      card_cvc: cardCvc.value.trim(),
    });
    await handlePaddleSuccess(data);
  } catch (e) {
    error.value = e?.response?.data?.message || t('billing.pro.errors.confirmFailed');
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

        <template v-else-if="isPaddleCheckout()">
          <p class="text-sm text-ink-muted">
            {{ t('billing.pro.paddleDesc') }}
          </p>
          <p v-if="error" class="text-sm text-red-400">{{ error }}</p>
          <p
            v-else-if="submitting || paddle.waitingPayment"
            class="text-sm text-ink-muted flex items-center gap-2"
          >
            <Loader2 class="w-4 h-4 animate-spin" />
            {{ t('billing.pro.waiting') }}
          </p>
          <button
            v-if="!submitting && !paddle.waitingPayment"
            type="button"
            class="w-full rounded-full bg-accent text-cream hover:bg-brand-dark py-3 text-sm font-medium inline-flex items-center justify-center gap-2"
            @click="startPaddleFlow"
          >
            <ExternalLink class="w-4 h-4" />
            {{ t('billing.pro.reopenPaddle') }}
          </button>
        </template>

        <template v-else>
          <p class="text-sm text-ink-muted">
            {{ t('billing.pro.demoDesc') }}
          </p>
          <p v-if="error" class="text-sm text-red-400">{{ error }}</p>

          <form v-if="paymentId" class="space-y-4" @submit.prevent="submitPayment">
            <div>
              <label class="block text-xs text-ink-muted mb-1">{{ t('common.forms.cardNumber') }}</label>
              <input
                v-model="cardNumber"
                type="text"
                class="w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm tracking-wider"
              />
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-xs text-ink-muted mb-1">{{ t('common.forms.cardExp') }}</label>
                <input v-model="cardExp" type="text" class="w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm" />
              </div>
              <div>
                <label class="block text-xs text-ink-muted mb-1">{{ t('common.forms.cardCvc') }}</label>
                <input v-model="cardCvc" type="text" class="w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm" />
              </div>
            </div>
            <button
              type="submit"
              class="w-full rounded-full bg-accent text-cream hover:bg-brand-dark py-3 text-sm font-medium disabled:opacity-50 inline-flex items-center justify-center gap-2"
              :disabled="submitting"
            >
              <Loader2 v-if="submitting" class="w-4 h-4 animate-spin" />
              <CreditCard v-else class="w-4 h-4" />
              {{ submitting ? t('billing.pro.confirming') : t('billing.pro.pay', { price: formattedPrice }) }}
            </button>
          </form>
        </template>
      </div>
    </div>
  </div>
</template>
