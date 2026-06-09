<script setup>
import { onMounted, ref, computed } from 'vue';
import { RouterLink, useRouter, useRoute } from 'vue-router';
import { CreditCard, QrCode, Loader2, ShieldCheck, Download, Crown } from 'lucide-vue-next';
import http from '@/services/api';
import { useAuthStore } from '@/stores/auth';
import {
  PLAN_PAY_PER_DOWNLOAD,
  PLAN_PREMIUM,
  SELECTED_PLAN_KEY,
  readPendingDocId,
  clearPendingDocId,
} from '@/constants/guestBilling';
import AppLogo from '@/components/brand/AppLogo.vue';

const auth = useAuthStore();
const router = useRouter();
const route = useRoute();

const loading = ref(true);
const submitting = ref(false);
const error = ref('');
const demoEnabled = ref(false);
const needsCheckout = ref(true);

const mode = ref('card');
const cardNumber = ref('4242 4242 4242 4242');
const cardExp = ref('12/30');
const cardCvc = ref('123');

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

const payButtonLabel = computed(() => {
  if (submitting.value) {
    return 'Procesando…';
  }
  return isPayPerDownload.value
    ? 'Activar cuenta gratuita'
    : `Suscribirme a Pro — ${planSummary.value.price}`;
});

const qrSrc = computed(() => {
  const payload = encodeURIComponent(
    `DEMO-${isPayPerDownload.value ? 'DOC' : 'PRO'}|${auth.user?.email || ''}|${Date.now()}`,
  );
  return `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${payload}`;
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

async function loadStatus() {
  loading.value = true;
  error.value = '';
  try {
    const { data } = await http.get('/api/billing/checkout-status');
    demoEnabled.value = Boolean(data.demo_enabled);
    needsCheckout.value = Boolean(data.needs_checkout);
    if (data.user) {
      auth.user = data.user;
    }
    if (!data.needs_checkout) {
      await router.replace(buildPostCheckoutRedirect());
      return;
    }
    if (!data.demo_enabled) {
      error.value =
        'El checkout de demostración no está activo en el servidor. Si ya tienes cuenta, ve al panel.';
    }
  } catch (e) {
    error.value = e?.response?.data?.message || 'No se pudo cargar el estado del checkout.';
  } finally {
    loading.value = false;
  }
}

async function submitCard() {
  submitting.value = true;
  error.value = '';
  try {
    const { data } = await http.post('/api/billing/complete-registration-checkout', {
      plan: selectedPlan.value,
      channel: 'card',
      card_number: cardNumber.value,
      card_exp: cardExp.value.trim(),
      card_cvc: cardCvc.value.trim(),
    });
    await finishCheckout(data);
  } catch (e) {
    const bag = e?.response?.data?.errors;
    error.value = bag
      ? Object.values(bag).flat().join(' ')
      : e?.response?.data?.message || 'No se pudo completar el pago simulado.';
  } finally {
    submitting.value = false;
  }
}

async function submitQr() {
  submitting.value = true;
  error.value = '';
  try {
    const { data } = await http.post('/api/billing/complete-registration-checkout', {
      plan: selectedPlan.value,
      channel: 'qr',
    });
    await finishCheckout(data);
  } catch (e) {
    error.value = e?.response?.data?.message || 'No se pudo confirmar el pago con QR.';
  } finally {
    submitting.value = false;
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
      <div v-if="loading" class="flex items-center gap-2 text-ink-muted text-sm">
        <Loader2 class="w-5 h-5 animate-spin" />
        Cargando checkout…
      </div>

      <div v-else class="w-full max-w-lg">
        <div class="text-center mb-8">
          <div
            class="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand/10 text-brand mb-4 mx-auto"
          >
            <ShieldCheck class="w-7 h-7" />
          </div>
          <h1 class="font-display text-2xl sm:text-3xl mb-2">Confirma tu pago</h1>
          <p class="text-ink-muted text-sm max-w-md mx-auto">
            Simulación sin cargo real. Al confirmar se activa tu cuenta y podrás continuar en el panel.
          </p>
        </div>

        <div
          v-if="demoEnabled && needsCheckout"
          class="rounded-2xl border border-line bg-deep/60 p-4 sm:p-5 mb-6 flex flex-col sm:flex-row items-start gap-4"
        >
          <div
            class="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
            :class="planSummary.bg"
          >
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

        <div v-if="error && !demoEnabled" class="rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-100 mb-6">
          {{ error }}
          <RouterLink to="/apa-generator" class="block mt-2 text-accent hover:underline text-xs">Ir al panel</RouterLink>
        </div>

        <div
          v-else-if="demoEnabled && needsCheckout"
          class="rounded-2xl border border-line bg-deep/80 overflow-hidden shadow-xl"
        >
          <div class="flex border-b border-line">
            <button
              type="button"
              class="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition"
              :class="mode === 'card' ? 'bg-brand/8 text-brand border-b-2 border-brand' : 'text-ink-muted hover:bg-neutral-50'"
              @click="mode = 'card'"
            >
              <CreditCard class="w-4 h-4" />
              Tarjeta
            </button>
            <button
              type="button"
              class="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition border-l border-line"
              :class="mode === 'qr' ? 'bg-flow/8 text-brand border-b-2 border-flow' : 'text-ink-muted hover:bg-neutral-50'"
              @click="mode = 'qr'"
            >
              <QrCode class="w-4 h-4" />
              Escanear QR
            </button>
          </div>

          <div class="p-4 sm:p-6 space-y-4">
            <p v-if="error" class="text-sm text-red-400">{{ error }}</p>

            <form v-if="mode === 'card'" class="space-y-4" @submit.prevent="submitCard">
              <div>
                <label class="block text-xs text-ink-muted mb-1">Número de tarjeta</label>
                <input
                  v-model="cardNumber"
                  type="text"
                  autocomplete="off"
                  class="w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm tracking-wider"
                  placeholder="4242 4242 4242 4242"
                />
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs text-ink-muted mb-1">Caducidad (MM/AA)</label>
                  <input
                    v-model="cardExp"
                    type="text"
                    class="w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm"
                    placeholder="12/30"
                  />
                </div>
                <div>
                  <label class="block text-xs text-ink-muted mb-1">CVC</label>
                  <input
                    v-model="cardCvc"
                    type="text"
                    class="w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm"
                    placeholder="123"
                  />
                </div>
              </div>
              <p class="text-[11px] text-ink-faint">Demo: no se envían datos a bancos. Cumple formato para continuar.</p>
              <button
                type="submit"
                class="w-full rounded-full bg-accent text-cream hover:bg-brand-dark py-3 text-sm font-medium disabled:opacity-50"
                :disabled="submitting"
              >
                {{ payButtonLabel }}
              </button>
            </form>

            <div v-else class="space-y-5 text-center">
              <p class="text-sm text-ink-muted">Escanea este código con la app de pago (simulación).</p>
              <div class="inline-block rounded-2xl bg-white p-3 shadow-lg">
                <img :src="qrSrc" alt="Código QR de demostración" width="220" height="220" class="block" />
              </div>
              <button
                type="button"
                class="w-full rounded-full bg-accent text-cream hover:bg-brand-dark py-3 text-sm font-medium disabled:opacity-50"
                :disabled="submitting"
                @click="submitQr"
              >
                {{ submitting ? 'Confirmando…' : payButtonLabel }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
