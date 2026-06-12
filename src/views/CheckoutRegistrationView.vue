<script setup>
import { onMounted, ref, computed } from 'vue';
import { RouterLink, useRouter, useRoute } from 'vue-router';
import { Download, Crown, Loader2, ShieldCheck } from 'lucide-vue-next';
import http from '@/services/api';
import { useAuthStore } from '@/stores/auth';
import { useClientConfigStore } from '@/stores/clientConfig';
import {
  PLAN_PAY_PER_DOWNLOAD,
  PLAN_PREMIUM,
  SELECTED_PLAN_KEY,
  readPendingDocId,
  clearPendingDocId,
} from '@/constants/guestBilling';
import { parsePaddleInitiateResponse, redirectToPaddleCheckout } from '@/utils/billingCheckout';
import AppLogo from '@/components/brand/AppLogo.vue';

const auth = useAuthStore();
const clientConfig = useClientConfigStore();
const router = useRouter();
const route = useRoute();

const loading = ref(true);
const submitting = ref(false);
const error = ref('');
const needsCheckout = ref(true);
const paymentProvider = ref('none');

const selectedPlan = computed(() => {
  const q = route.query.plan;
  if (q === PLAN_PREMIUM || q === PLAN_PAY_PER_DOWNLOAD) {
    return q;
  }
  try {
    const stored = sessionStorage.getItem(SELECTED_PLAN_KEY);
    if (stored === PLAN_PREMIUM || stored === PLAN_PAY_PER_DOWNLOAD) {
      return stored;
    }
  } catch {
    /* noop */
  }
  return PLAN_PREMIUM;
});

const isPayPerDownload = computed(() => selectedPlan.value === PLAN_PAY_PER_DOWNLOAD);
const isProPlan = computed(() => selectedPlan.value === PLAN_PREMIUM);
const isPaddle = computed(() => paymentProvider.value === 'paddle');
const isDemo = computed(() => paymentProvider.value === 'demo');

const planSummary = computed(() => {
  if (isPayPerDownload.value) {
    return {
      title: 'Plan gratuito',
      price: 'USD 0.99 / documento',
      subtitle: 'Sin suscripción. Pagas solo cuando conviertes un documento.',
      icon: Download,
      accent: 'text-brand',
      bg: 'bg-brand/10',
    };
  }
  return {
    title: 'Plan Pro',
    price: '$5.99 USD / mes',
    subtitle: 'Conversiones y descargas ilimitadas en el catálogo.',
    icon: Crown,
    accent: 'text-flow',
    bg: 'bg-flow/10',
  };
});

const pendingDocId = computed(() => {
  const q = route.query.docId;
  if (q != null && String(q).trim() !== '') {
    return String(q);
  }
  return readPendingDocId();
});

function buildPostCheckoutRedirect() {
  const explicit = typeof route.query.redirect === 'string' ? route.query.redirect : null;
  if (explicit && explicit.startsWith('/')) {
    return explicit;
  }
  const docId = pendingDocId.value;
  if (docId) {
    return `/apa-generator?autoDownload=${encodeURIComponent(docId)}`;
  }
  return '/apa-generator';
}

async function finishCheckout(data) {
  auth.user = data.user;
  try {
    sessionStorage.removeItem(SELECTED_PLAN_KEY);
  } catch {
    /* noop */
  }
  if (pendingDocId.value) {
    clearPendingDocId();
  }
  await router.replace(buildPostCheckoutRedirect());
}

async function activateFreePlan() {
  submitting.value = true;
  error.value = '';
  try {
    const payload = { plan: PLAN_PAY_PER_DOWNLOAD };
    if (isDemo.value) {
      payload.channel = 'card';
    }
    const { data } = await http.post('/api/billing/complete-registration-checkout', payload);
    if (!data.success && !data.user) {
      throw new Error(data.error || data.message || 'No se pudo activar la cuenta.');
    }
    await finishCheckout(data);
  } catch (e) {
    error.value = e?.response?.data?.error || e?.response?.data?.message || e?.message || 'No se pudo activar la cuenta.';
  } finally {
    submitting.value = false;
  }
}

async function startProPaddleCheckout() {
  submitting.value = true;
  error.value = '';
  try {
    const { data } = await http.post('/api/billing/registration-checkout/initiate');
    const parsed = parsePaddleInitiateResponse(data);

    if (parsed.success && parsed.checkoutUrl) {
      redirectToPaddleCheckout(parsed.checkoutUrl);
      return;
    }

    throw new Error(parsed.error || 'No se recibió checkout_url de Paddle.');
  } catch (e) {
    error.value = e?.response?.data?.error || e?.response?.data?.message || e?.message || 'No se pudo iniciar el checkout Pro.';
    submitting.value = false;
  }
}

async function submitDemoPro() {
  submitting.value = true;
  error.value = '';
  try {
    const { data } = await http.post('/api/billing/complete-registration-checkout', {
      plan: PLAN_PREMIUM,
      channel: 'card',
      card_number: '4242 4242 4242 4242',
      card_exp: '12/30',
      card_cvc: '123',
    });
    await finishCheckout(data);
  } catch (e) {
    const bag = e?.response?.data?.errors;
    error.value = bag
      ? Object.values(bag).flat().join(' ')
      : e?.response?.data?.error || e?.response?.data?.message || 'No se pudo completar el pago simulado.';
  } finally {
    submitting.value = false;
  }
}

async function loadStatus() {
  loading.value = true;
  error.value = '';

  if (!clientConfig.loaded) {
    try {
      await clientConfig.bootstrap();
    } catch {
      /* noop */
    }
  }

  try {
    const { data } = await http.get('/api/billing/checkout-status');
    paymentProvider.value = data.payment_provider || clientConfig.paymentProvider || 'none';
    needsCheckout.value = Boolean(data.needs_checkout);
    if (data.user) {
      auth.user = data.user;
    }
    if (!data.needs_checkout) {
      await router.replace(buildPostCheckoutRedirect());
      return;
    }

    if (isPaddle.value && isProPlan.value) {
      await startProPaddleCheckout();
      return;
    }

    if (isPaddle.value && isPayPerDownload.value) {
      await activateFreePlan();
      return;
    }

    if (!isDemo.value) {
      error.value = 'Los pagos no están configurados en el servidor.';
    }
  } catch (e) {
    error.value = e?.response?.data?.error || e?.response?.data?.message || 'No se pudo cargar el estado del checkout.';
  } finally {
    loading.value = false;
  }
}

async function logoutAndLogin() {
  await auth.logout();
  await router.push('/login');
}

onMounted(loadStatus);
</script>

<template>
  <div class="min-h-full bg-midnight text-ink flex flex-col">
    <nav class="site-nav-fixed" aria-label="Checkout">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3 min-w-0">
        <AppLogo to="/" size="nav" />
        <button type="button" class="text-sm text-ink-muted hover:text-brand whitespace-nowrap py-2 shrink-0" @click="logoutAndLogin">
          Cerrar sesión
        </button>
      </div>
    </nav>

    <div class="site-nav-offset-checkout flex-1 flex items-center justify-center px-4 py-8 sm:py-12 pb-[max(2rem,env(safe-area-inset-bottom))]">
      <div v-if="loading || (isPaddle && submitting)" class="flex flex-col items-center gap-3 text-ink-muted text-sm">
        <Loader2 class="w-5 h-5 animate-spin" />
        <span v-if="isPaddle && isProPlan">Redirigiendo al checkout seguro de Paddle…</span>
        <span v-else-if="isPaddle && isPayPerDownload">Activando tu cuenta gratuita…</span>
        <span v-else>Cargando checkout…</span>
      </div>

      <div v-else class="w-full max-w-lg">
        <div class="text-center mb-8">
          <div class="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand/10 text-brand mb-4 mx-auto">
            <ShieldCheck class="w-7 h-7" />
          </div>
          <h1 class="font-display text-2xl sm:text-3xl mb-2">Confirma tu plan</h1>
          <p class="text-ink-muted text-sm max-w-md mx-auto">
            <template v-if="isPaddle && isProPlan">
              El pago se procesa en Paddle. Al confirmar se activará tu cuenta Pro.
            </template>
            <template v-else-if="isPaddle && isPayPerDownload">
              Sin cargo ahora. Pagas solo cuando conviertes un documento.
            </template>
            <template v-else>
              Simulación sin cargo real. Al confirmar se activa tu cuenta.
            </template>
          </p>
        </div>

        <div
          v-if="needsCheckout"
          class="rounded-2xl border border-line bg-deep/60 p-4 sm:p-5 mb-6 flex flex-col sm:flex-row items-start gap-4"
        >
          <div class="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" :class="planSummary.bg">
            <component :is="planSummary.icon" class="w-6 h-6" :class="planSummary.accent" />
          </div>
          <div class="text-left min-w-0">
            <p class="text-xs text-ink-muted uppercase tracking-wide mb-0.5">Plan seleccionado</p>
            <p class="font-display text-xl">{{ planSummary.title }}</p>
            <p class="text-ink-secondary font-medium mt-0.5">{{ planSummary.price }}</p>
            <p class="text-xs text-ink-muted mt-2">{{ planSummary.subtitle }}</p>
            <p v-if="pendingDocId" class="text-[11px] text-ink-faint mt-2">
              Documento pendiente #{{ pendingDocId }} — se descargará al finalizar.
            </p>
          </div>
        </div>

        <div v-if="error" class="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200 mb-6">
          {{ error }}
          <button
            v-if="isPaddle && isProPlan"
            type="button"
            class="block mt-3 text-accent hover:underline text-xs"
            @click="startProPaddleCheckout"
          >
            Reintentar checkout Paddle
          </button>
          <RouterLink v-else to="/apa-generator" class="block mt-2 text-accent hover:underline text-xs">Ir al panel</RouterLink>
        </div>

        <div v-else-if="isDemo && needsCheckout" class="rounded-2xl border border-line bg-deep/80 overflow-hidden shadow-xl p-6 space-y-4">
          <p class="text-sm text-ink-muted">Modo demostración: confirma para activar tu plan sin cargo real.</p>
          <button
            type="button"
            class="w-full rounded-full bg-accent text-cream hover:bg-brand-dark py-3 text-sm font-medium disabled:opacity-50"
            :disabled="submitting"
            @click="isProPlan ? submitDemoPro() : activateFreePlan()"
          >
            {{ submitting ? 'Procesando…' : isProPlan ? 'Activar Pro (demo)' : 'Activar cuenta gratuita' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
