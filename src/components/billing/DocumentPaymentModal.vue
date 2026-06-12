<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { Loader2, X } from 'lucide-vue-next';
import http from '@/services/api';
import { useI18n } from '@/composables/useI18n';
import { useClientConfigStore } from '@/stores/clientConfig';
import { usePaddle, setPaddleCheckoutCompletedHandler } from '@/composables/usePaddle';
import {
  openPaddleCheckoutFromResponse,
  pollDocumentPaymentSync,
} from '@/utils/billingCheckout';

const props = defineProps({
  documentId: { type: [Number, String], required: true },
  formattedPrice: { type: String, default: '$0.99' },
});

const emit = defineEmits(['paid', 'close']);

const clientConfig = useClientConfigStore();
const paddle = usePaddle();
const { t } = useI18n();

const loading = ref(true);
const confirming = ref(false);
const error = ref('');
const isDemo = ref(false);
let pollAbort = false;

async function confirmPaidAndClose() {
  if (pollAbort) {
    return;
  }
  confirming.value = true;
  error.value = '';
  try {
    const data = await pollDocumentPaymentSync(http, props.documentId, {
      intervalMs: 2000,
      maxAttempts: 30,
    });
    emit('paid', data.document);
  } catch (e) {
    error.value = e?.message || t('billing.document.errors.completeFailed');
    confirming.value = false;
  }
}

async function initiateCheckout() {
  loading.value = true;
  error.value = '';
  confirming.value = false;

  if (!clientConfig.loaded) {
    try {
      await clientConfig.bootstrap();
    } catch {
      /* noop */
    }
  }

  isDemo.value = clientConfig.paymentProvider === 'demo';

  try {
    const payload = { document_id: Number(props.documentId) };
    if (isDemo.value) {
      Object.assign(payload, {
        channel: 'card',
        card_number: '4242 4242 4242 4242',
        card_exp: '12/30',
        card_cvc: '123',
      });
    }

    const { data } = await http.post('/api/billing/complete-document-payment', payload);

    if (isDemo.value && data?.document) {
      emit('paid', data.document);
      return;
    }

    setPaddleCheckoutCompletedHandler(() => {
      confirmPaidAndClose();
    });

    await openPaddleCheckoutFromResponse(data, { clientConfig, paddle });
    loading.value = false;
    confirming.value = true;

    confirmPaidAndClose();
  } catch (e) {
    error.value =
      e?.response?.data?.error
      || e?.response?.data?.message
      || paddle.error.value
      || e?.message
      || t('billing.document.errors.initFailed');
    loading.value = false;
    confirming.value = false;
  }
}

onBeforeUnmount(() => {
  pollAbort = true;
  setPaddleCheckoutCompletedHandler(null);
});

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

        <p v-else-if="confirming" class="text-sm text-ink-muted flex items-center gap-2">
          <Loader2 class="w-4 h-4 animate-spin" />
          {{ t('billing.document.confirming') }}
        </p>

        <template v-else>
          <p v-if="error" class="text-sm text-red-400">{{ error }}</p>
          <p v-else class="text-sm text-ink-muted">{{ t('billing.document.paddleOverlay') }}</p>
          <button
            v-if="error"
            type="button"
            class="w-full rounded-full bg-accent text-cream hover:bg-brand-dark py-3 text-sm font-medium"
            @click="initiateCheckout"
          >
            {{ t('billing.document.retry') }}
          </button>
        </template>
      </div>
    </div>
  </div>
</template>
