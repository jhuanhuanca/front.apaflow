import { ref } from 'vue';
import http from '@/services/api';
import { useClientConfigStore } from '@/stores/clientConfig';
import { redirectToPaddleCheckout, extractPaddleTransactionId } from '@/utils/billingCheckout';

let scriptPromise = null;

function loadPaddleScript() {
  if (typeof window !== 'undefined' && window.Paddle) {
    return Promise.resolve(window.Paddle);
  }
  if (scriptPromise) {
    return scriptPromise;
  }

  scriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://cdn.paddle.com/paddle/v2/paddle.js';
    script.async = true;
    script.onload = () => {
      if (window.Paddle) {
        resolve(window.Paddle);
        return;
      }
      reject(new Error('Paddle.js no expuso window.Paddle.'));
    };
    script.onerror = () => reject(new Error('No se pudo cargar Paddle.js.'));
    document.head.appendChild(script);
  });

  return scriptPromise;
}

/**
 * Checkout Paddle Billing v2 + polling de estado en el backend.
 */
export function usePaddle() {
  const clientConfig = useClientConfigStore();
  const initializing = ref(false);
  const waitingPayment = ref(false);
  const error = ref('');

  function isPaddleProvider() {
    return (
      clientConfig.paymentProvider === 'paddle'
      && (clientConfig.paddle?.server_enabled || clientConfig.paddle?.enabled)
    );
  }

  async function ensureInitialized() {
    const paddleConfig = clientConfig.paddle;
    if (!paddleConfig?.enabled || !paddleConfig?.client_token) {
      throw new Error('Paddle no está configurado en el servidor.');
    }

    initializing.value = true;
    error.value = '';

    try {
      const Paddle = await loadPaddleScript();
      const environment = paddleConfig.environment === 'production' ? 'production' : 'sandbox';
      Paddle.Environment.set(environment);
      Paddle.Initialize({ token: paddleConfig.client_token });
      return Paddle;
    } catch (e) {
      error.value = e?.message || 'Error al inicializar Paddle.';
      throw e;
    } finally {
      initializing.value = false;
    }
  }

  async function openCheckout(transactionId, checkoutUrl = null) {
    const ptxn = transactionId || extractPaddleTransactionId(checkoutUrl);
    if (!ptxn) {
      throw new Error('Falta transaction_id de Paddle.');
    }
    const Paddle = await ensureInitialized();
    Paddle.Checkout.open({ transactionId: String(ptxn) });
  }

  async function openCheckoutUrl(checkoutUrl) {
    redirectToPaddleCheckout(checkoutUrl);
  }

  async function pollPaymentStatus(paymentId, { intervalMs = 2500, maxAttempts = 72, onTick } = {}) {
    waitingPayment.value = true;
    error.value = '';

    try {
      for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
        await new Promise((resolve) => {
          setTimeout(resolve, intervalMs);
        });

        const { data } = await http.get(`/api/billing/payments/${paymentId}`);
        onTick?.(data);

        const status = data?.payment?.status;
        if (status === 'paid') {
          return data;
        }
        if (status === 'canceled' || status === 'failed') {
          throw new Error('El pago fue cancelado o rechazado.');
        }
      }

      throw new Error(
        'Tiempo de espera agotado. Si ya pagaste, cierra y vuelve a abrir la app en unos minutos.',
      );
    } catch (e) {
      error.value = e?.response?.data?.message || e?.message || 'No se pudo verificar el pago.';
      throw e;
    } finally {
      waitingPayment.value = false;
    }
  }

  return {
    initializing,
    waitingPayment,
    error,
    isPaddleProvider,
    ensureInitialized,
    openCheckout,
    openCheckoutUrl,
    pollPaymentStatus,
  };
}
