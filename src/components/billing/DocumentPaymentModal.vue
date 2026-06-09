<script setup>
import { onMounted, ref } from 'vue';
import { CreditCard, ExternalLink, Loader2, X } from 'lucide-vue-next';
import http from '@/services/api';
import { usePaddle } from '@/composables/usePaddle';
import { useI18n } from '@/composables/useI18n';
import { useAuthStore } from '@/stores/auth';
import { useSubscriptionStore } from '@/stores/subscription';

const props = defineProps({
  documentId: { type: [Number, String], required: true },
  formattedPrice: { type: String, default: '$0.99' },
});

const emit = defineEmits(['paid', 'close']);

const auth = useAuthStore();
const subscription = useSubscriptionStore();
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

async function handlePaid(data) {
  if (data.user) {
    auth.user = data.user;
  }
  emit('paid', data.document);
}

async function startPaddleFlow() {
  submitting.value = true;
  error.value = '';
  try {
    if (transactionId.value) {
      await paddle.openCheckout(transactionId.value);
    } else if (checkoutUrl.value) {
      await paddle.openCheckoutUrl(checkoutUrl.value);
    } else {
      throw new Error(t('billing.document.errors.incomplete'));
    }

    const data = await paddle.pollPaymentStatus(paymentId.value, {
      onTick: (payload) => {
        if (payload.user) {
          auth.user = payload.user;
        }
      },
    });
    await handlePaid(data);
  } catch (e) {
    error.value = paddle.error.value || e?.response?.data?.message || e?.message || t('billing.document.errors.completeFailed');
  } finally {
    submitting.value = false;
  }
}

async function initiateCheckout() {
  loading.value = true;
  error.value = '';
  try {
    const { data } = await http.post('/api/billing/complete-document-payment', {
      document_id: Number(props.documentId),
    });
    paymentId.value = data.payment?.id ?? null;
    checkoutProvider.value = data.checkout?.provider ?? 'demo';
    transactionId.value = data.checkout?.transaction_id ?? null;
    checkoutUrl.value = data.checkout?.checkout_url ?? null;

    if (data.user) {
      auth.user = data.user;
    }

    if (isPaddleCheckout()) {
      if (!paymentId.value) {
        error.value = t('billing.document.errors.createFailed');
        return;
      }
      await startPaddleFlow();
      return;
    }
  } catch (e) {
    error.value = e?.response?.data?.message || t('billing.document.errors.initFailed');
  } finally {
    loading.value = false;
  }
}

async function submitPayment() {
  submitting.value = true;
  error.value = '';
  try {
    const { data } = await http.post('/api/billing/complete-document-payment', {
      document_id: Number(props.documentId),
      channel: 'card',
      card_number: cardNumber.value,
      card_exp: cardExp.value.trim(),
      card_cvc: cardCvc.value.trim(),
    });
    await handlePaid(data);
  } catch (e) {
    error.value = e?.response?.data?.message || t('billing.document.errors.completeFailed');
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
        <div>
          <p class="text-xs text-ink-muted uppercase tracking-wide">{{ t('billing.document.title') }}</p>
          <p class="font-display text-lg">{{ formattedPrice }} USD</p>
        </div>
        <button type="button" class="text-ink-muted hover:text-ink p-1" @click="emit('close')">
          <X class="w-5 h-5" />
        </button>
      </div>

      <div class="p-5 space-y-4">
        <p v-if="loading" class="text-sm text-ink-muted flex items-center gap-2">
          <Loader2 class="w-4 h-4 animate-spin" />
          {{ t('billing.document.preparing') }}
        </p>

        <template v-else-if="isPaddleCheckout()">
          <p class="text-sm text-ink-muted">
            {{ t('billing.document.paddleDesc', { price: formattedPrice }) }}
          </p>
          <p v-if="error" class="text-sm text-red-400">{{ error }}</p>
          <p
            v-else-if="submitting || paddle.waitingPayment"
            class="text-sm text-ink-muted flex items-center gap-2"
          >
            <Loader2 class="w-4 h-4 animate-spin" />
            {{ t('billing.document.waiting') }}
          </p>
          <button
            v-if="!submitting && !paddle.waitingPayment"
            type="button"
            class="w-full rounded-full bg-accent text-cream hover:bg-brand-dark py-3 text-sm font-medium inline-flex items-center justify-center gap-2"
            @click="startPaddleFlow"
          >
            <ExternalLink class="w-4 h-4" />
            {{ t('billing.document.reopenPaddle') }}
          </button>
        </template>

        <form v-else class="space-y-4" @submit.prevent="submitPayment">
          <p class="text-sm text-ink-muted">
            {{ t('billing.document.demoDesc', { price: formattedPrice }) }}
          </p>
          <p v-if="error" class="text-sm text-red-400">{{ error }}</p>

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
            {{ submitting ? t('common.actions.processing') : t('billing.document.pay', { price: formattedPrice }) }}
          </button>

          <p v-if="subscription.hasProAccess" class="text-xs text-ink-faint text-center">
            {{ t('billing.document.proNotice') }}
          </p>
        </form>
      </div>
    </div>
  </div>
</template>
