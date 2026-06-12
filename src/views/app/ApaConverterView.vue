<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { RouterLink, useRouter, useRoute } from 'vue-router';
import { UploadCloud, Download, FileText, Loader2, Sparkles } from 'lucide-vue-next';
import http from '@/services/api';
import { useAuthStore } from '@/stores/auth';
import { useClientConfigStore } from '@/stores/clientConfig';
import { useSubscriptionStore } from '@/stores/subscription';
import DocumentPaymentModal from '@/components/billing/DocumentPaymentModal.vue';
import ProUpgradeModal from '@/components/billing/ProUpgradeModal.vue';
import { usePaddle } from '@/composables/usePaddle';
import {
  GUEST_PROCESS_KEY,
  GUEST_DOWNLOAD_KEY,
  guestDownloadNeedsUpgrade,
  guestProcessNeedsPaywall,
  readGuestProcessCount,
  readGuestDownloadCount,
  savePendingDocId,
} from '@/constants/guestBilling';
import { waitForDocumentDownloadReady, syncDocumentPayment } from '@/utils/billingCheckout';
import { useI18n } from '@/composables/useI18n';
import { useSiteNav } from '@/composables/useSiteNav';

defineProps({
  embedded: { type: Boolean, default: false },
});

const auth = useAuthStore();
const clientConfig = useClientConfigStore();
const subscription = useSubscriptionStore();
const router = useRouter();
const route = useRoute();
const { t } = useI18n();
const { appModules } = useSiteNav();

const file = ref(null);
const fileInput = ref(null);
const dragActive = ref(false);
const uploading = ref(false);
const message = ref('');
const documents = ref([]);
const guestTrials = ref({ remaining: 1, used: 0, max: 1 });
const paymentModalDocId = ref(null);
const showProUpgradeModal = ref(false);
const paddle = usePaddle();

let pollTimer;

const isProPlan = computed(() => subscription.hasProAccess);
const hasProAccess = computed(() => subscription.hasProAccess);

const planTitle = computed(() => {
  if (subscription.hasProAccess) return t('generator.plans.pro');
  if (subscription.plan === 'trial') return t('generator.plans.trial');
  return t('generator.plans.free');
});

const hasActiveJobs = computed(() => documents.value.some((d) => d.status === 'pending' || d.status === 'processing'));

function redirectToRegisterPlans(docId = null) {
  if (docId != null) {
    savePendingDocId(docId);
  }
  router.push({
    name: 'register',
    query: {
      intent: 'second-download',
      ...(docId != null ? { docId: String(docId) } : {}),
    },
  });
}

function syncGuestTrialsFromStorage() {
  const max = clientConfig.guestMaxUploads;
  const trialConsumed = readGuestProcessCount() >= max;
  guestTrials.value = {
    used: trialConsumed ? 1 : 0,
    max,
    remaining: trialConsumed ? 0 : max,
  };
}

function markGuestProcess() {
  try {
    localStorage.setItem(GUEST_PROCESS_KEY, String(readGuestProcessCount() + 1));
  } catch {
    /* noop */
  }
  syncGuestTrialsFromStorage();
}

function markGuestDownload() {
  try {
    localStorage.setItem(GUEST_DOWNLOAD_KEY, String(readGuestDownloadCount() + 1));
  } catch {
    /* noop */
  }
  syncGuestTrialsFromStorage();
}

function guestProcessNeedsPaywallLocal() {
  return !auth.isAuthenticated && guestProcessNeedsPaywall(clientConfig.guestMaxUploads);
}

const guestDownloadNeedsPaywall = () =>
  guestDownloadNeedsUpgrade(clientConfig.guestMaxFreeDownloads);

async function syncPendingDocumentPayments() {
  if (!auth.isAuthenticated) {
    return;
  }
  const pending = documents.value.filter((d) => d.billing_status === 'pending_payment');
  if (!pending.length) {
    return;
  }
  let changed = false;
  await Promise.all(
    pending.map(async (doc) => {
      try {
        const { data } = await syncDocumentPayment(http, doc.id);
        if (data?.document?.billing_status === 'paid' || data?.synced) {
          changed = true;
        }
      } catch {
        /* noop */
      }
    }),
  );
  if (changed) {
    const { data } = await http.get('/api/documents');
    documents.value = Array.isArray(data) ? data : [];
  }
}

async function loadDocuments() {
  try {
    if (auth.isAuthenticated) {
      const { data } = await http.get('/api/documents');
      documents.value = Array.isArray(data) ? data : [];
      await syncPendingDocumentPayments();
    } else {
      const { data } = await http.get('/api/guest/documents');
      documents.value = Array.isArray(data) ? data : [];
      syncGuestTrialsFromStorage();
    }
  } catch (e) {
    documents.value = [];
    const msg = e?.response?.data?.message;
    const st = e?.response?.status;
    message.value =
      msg ||
      (st === 503 ? t('generator.messages.migration') : t('generator.messages.loadFailed'));
  }
}

function onFileChange(e) {
  const f = e.target.files?.[0];
  file.value = f || null;
}

function onDrop(e) {
  dragActive.value = false;
  const f = e.dataTransfer.files?.[0];
  if (f && f.name.toLowerCase().endsWith('.docx')) {
    file.value = f;
  } else {
    message.value = t('generator.upload.docxOnly');
  }
}

function openFilePicker() {
  fileInput.value?.click();
}

async function processDocument() {
  message.value = '';
  if (!auth.isAuthenticated && guestProcessNeedsPaywallLocal()) {
    redirectToRegisterPlans();
    return;
  }
  if (!file.value) {
    message.value = t('generator.upload.selectFile');
    return;
  }
  uploading.value = true;
  try {
    const fd = new FormData();
    fd.append('file', file.value);
    fd.append('university', clientConfig.uploadDefaults.university);
    fd.append('career', clientConfig.uploadDefaults.career);
    const url = auth.isAuthenticated ? '/api/upload-document' : '/api/guest/upload-document';
    const { data, status } = await http.post(url, fd);
    if (!auth.isAuthenticated) {
      markGuestProcess();
    }
    if (status === 402 || data?.code === 'PAYMENT_REQUIRED') {
      const doc = data.document ?? data;
      paymentModalDocId.value = doc?.id ?? null;
      message.value = t('generator.messages.payToConvert', { price: subscription.documentPriceFormatted });
    } else {
      message.value = t('generator.messages.processing');
    }
    file.value = null;
    await loadDocuments();
  } catch (e) {
    if (e?.response?.status === 402) {
      const data = e.response.data;
      paymentModalDocId.value = data.document?.id ?? data.document_id ?? null;
      message.value = data.message || t('generator.messages.completePayment', { price: subscription.documentPriceFormatted });
      await loadDocuments();
    } else if (e?.response?.status === 403 && !auth.isAuthenticated) {
      markGuestProcess();
      syncGuestTrialsFromStorage();
      redirectToRegisterPlans();
    } else {
      message.value = e?.response?.data?.message || t('generator.messages.uploadFailed');
    }
  } finally {
    uploading.value = false;
  }
}

function openProUpgrade() {
  showProUpgradeModal.value = true;
}

function onProUpgraded() {
  showProUpgradeModal.value = false;
  message.value = t('generator.messages.proActivated');
}

function onDocumentPaid(doc) {
  paymentModalDocId.value = null;
  message.value = t('generator.messages.paidProcessing');
  loadDocuments();
  if (doc?.id && doc.status === 'completed') {
    downloadDoc(doc.id);
  }
}

function billingLabel(doc) {
  if (doc.billing_status === 'pending_payment') return t('generator.billing.pending');
  if (doc.billing_status === 'paid') return t('generator.billing.paid');
  if (doc.billing_status === 'included_in_pro') return t('generator.billing.includedPro');
  return '';
}

function canDownloadDoc(doc) {
  if (doc.status !== 'completed') return false;
  if (!auth.isAuthenticated) return true;
  if (subscription.hasProAccess) return true;
  return doc.billing_status === 'paid';
}

function openPaymentForDoc(doc) {
  paymentModalDocId.value = doc.id;
}

async function downloadDoc(id) {
  if (!auth.isAuthenticated && guestDownloadNeedsPaywall()) {
    redirectToRegisterPlans(id);
    return;
  }
  const doc = documents.value.find((d) => d.id === id);
  if (auth.isAuthenticated && doc?.billing_status === 'pending_payment') {
    openPaymentForDoc(doc);
    return;
  }
  try {
    const path = auth.isAuthenticated
      ? `/api/document/${id}/download`
      : `/api/guest/document/${id}/download`;
    const res = await http.get(path, { responseType: 'blob' });
    if (!auth.isAuthenticated) {
      markGuestDownload();
    }
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `tesis_apa7_${id}.docx`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (e) {
    if (e?.response?.status === 402) {
      openPaymentForDoc({ id });
    } else if (e?.response?.status === 403 && !auth.isAuthenticated) {
      markGuestDownload();
      syncGuestTrialsFromStorage();
      redirectToRegisterPlans(id);
    } else {
      message.value = e?.response?.data?.message || t('generator.messages.downloadFailed');
    }
  }
}

function statusLabel(status, billingStatus) {
  if (billingStatus === 'pending_payment' && status === 'pending') return t('generator.status.waitingPayment');
  const map = {
    pending: t('generator.status.queued'),
    processing: t('generator.status.processing'),
    completed: t('generator.status.ready'),
    failed: t('generator.status.error'),
  };
  return map[status] || status;
}

function statusBadgeClass(status) {
  if (status === 'completed') return 'text-green-300 bg-green-500/10 border-green-500/20';
  if (status === 'failed') return 'text-red-300 bg-red-500/10 border-red-500/20';
  if (status === 'processing') return 'text-amber-200 bg-amber-500/10 border-amber-500/20';
  return 'text-ink-secondary bg-neutral-50 border-line';
}

function cardClass(status) {
  if (status === 'failed') return 'border-red-500/20 bg-red-500/5';
  if (status === 'processing') return 'border-amber-500/20 bg-amber-500/5';
  if (status === 'completed') return 'border-green-500/20 bg-green-500/5';
  return 'border-line bg-deep/40';
}

watch(
  () => auth.isAuthenticated,
  async () => {
    await loadDocuments();
    if (!auth.isAuthenticated) {
      syncGuestTrialsFromStorage();
    }
  },
);

async function openPaddleCheckoutFromQuery() {
  const ptxn = route.query._ptxn;
  if (!ptxn || String(ptxn).trim() === '') {
    return false;
  }

  if (!clientConfig.loaded) {
    try {
      await clientConfig.bootstrap();
    } catch {
      /* noop */
    }
  }

  if (!clientConfig.paddle?.client_token) {
    message.value =
      'Falta PADDLE_CLIENT_TOKEN en el servidor. Configúralo en Paddle → Developer tools → Client-side tokens.';
    return true;
  }

  try {
    await paddle.openCheckout(String(ptxn));
    const { _ptxn: _removed, ...restQuery } = route.query;
    router.replace({ path: route.path, query: restQuery });
  } catch (e) {
    message.value = paddle.error.value || e?.message || 'No se pudo abrir el checkout de Paddle.';
  }

  return true;
}

onMounted(async () => {
  syncGuestTrialsFromStorage();
  await loadDocuments();

  const openedPaddle = await openPaddleCheckoutFromQuery();
  if (openedPaddle) {
    pollTimer = setInterval(async () => {
      if (!hasActiveJobs.value) return;
      try {
        await loadDocuments();
      } catch {
        /* noop */
      }
    }, 3000);
    return;
  }

  const checkoutStatus = route.query.checkout;
  const docIdFromCheckout = route.query.docId;
  const flow = route.query.flow;
  const legacyPro = route.query.pro === 'success';

  if (checkoutStatus === 'success' || legacyPro) {
    try {
      await auth.fetchUser();
    } catch {
      /* noop */
    }

    if (flow === 'pro' || legacyPro) {
      message.value = t('generator.messages.proActivated');
    } else if (flow === 'registration') {
      message.value = t('generator.messages.accountActivated');
    }

    const autoId = docIdFromCheckout ?? route.query.autoDownload;
    if (autoId != null && String(autoId).trim() !== '') {
      try {
        message.value = t('generator.messages.paidProcessing');
        await syncDocumentPayment(http, String(autoId));
        await waitForDocumentDownloadReady(http, String(autoId));
        await downloadDoc(String(autoId));
      } catch (e) {
        message.value = e?.message || t('generator.messages.downloadFailed');
      }
    }

    router.replace({ path: route.path, query: {} });
  } else if (route.query.autoDownload != null && String(route.query.autoDownload).trim() !== '') {
    await downloadDoc(String(route.query.autoDownload));
    router.replace({ path: route.path, query: {} });
  }

  pollTimer = setInterval(async () => {
    if (!hasActiveJobs.value) return;
    try {
      await loadDocuments();
    } catch {
      /* noop */
    }
  }, 3000);
});

onUnmounted(() => {
  if (pollTimer) clearInterval(pollTimer);
});
</script>

<template>
  <div class="page-shell" :class="{ 'max-w-5xl mx-auto': embedded }">
    <div v-if="auth.isAuthenticated" class="rounded-2xl border border-line bg-surface/50 p-4 sm:p-5 md:p-6 mb-6 sm:mb-8">
      <p class="text-[11px] text-ink-muted uppercase tracking-wide mb-1">{{ t('generator.account.label') }}</p>
      <div class="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span class="font-display text-xl sm:text-2xl text-ink">{{ planTitle }}</span>
        <span class="text-sm text-ink-muted truncate">{{ auth.user?.email }}</span>
      </div>
      <p v-if="hasProAccess" class="text-sm text-emerald-300/90 mt-2 flex items-center gap-2">
        <Sparkles class="w-4 h-4 shrink-0" />
        <span v-if="isProPlan">{{ t('generator.account.proActive') }}</span>
        <span v-else>{{ t('generator.account.trialActive') }}</span>
      </p>
      <p v-else class="text-sm text-ink-muted mt-2">
        {{ t('generator.account.payPerDoc', { price: subscription.documentPriceFormatted }) }}
        <button
          type="button"
          class="text-accent hover:underline ml-1"
          @click="openProUpgrade"
        >
          {{ t('generator.account.upgrade', { price: subscription.proMonthlyFormatted }) }}
        </button>
      </p>
    </div>

    <div
      v-if="!auth.isAuthenticated"
      class="rounded-xl border border-flow/25 bg-flow/5 px-4 py-3 text-sm text-ink-secondary mb-8"
    >
      <strong>{{ t('generator.guest.label') }}</strong>
      <span v-if="guestTrials.remaining > 0">{{ t('generator.guest.trialLeft') }}</span>
      <span v-else>
        {{ t('generator.guest.trialUsedBefore') }}
        <RouterLink to="/register?intent=second-download" class="text-accent hover:underline">{{ t('generator.guest.register') }}</RouterLink>
        {{ t('generator.guest.trialUsedAfter', { docPrice: subscription.documentPriceFormatted || t('generator.guest.docPrice'), proPrice: subscription.proMonthlyFormatted || t('generator.guest.proPrice') }) }}
      </span>
    </div>

    <div v-if="!embedded" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8 sm:mb-10">
      <RouterLink
        v-for="mod in appModules"
        :key="mod.name"
        :to="mod.path"
        class="rounded-xl border border-line bg-surface/40 p-4 hover:border-brand/40 hover:bg-brand/5 transition group"
      >
        <p class="font-medium text-sm text-ink group-hover:text-brand">{{ mod.label }}</p>
        <p class="text-xs text-ink-muted mt-1 leading-snug">{{ mod.description }}</p>
      </RouterLink>
    </div>

    <div v-if="!embedded" class="mb-8">
      <h1 class="font-display text-2xl md:text-3xl mb-2">{{ t('generator.converter.title') }}</h1>
      <p class="text-ink-muted text-sm max-w-2xl">
        {{ t('generator.converter.subtitle') }}
      </p>
    </div>

    <div class="grid lg:grid-cols-2 gap-8">
      <section class="bg-surface/50 border border-line rounded-2xl p-4 sm:p-6 md:p-8 min-w-0">
        <h2 class="font-display text-lg sm:text-xl mb-4">{{ t('generator.upload.title') }}</h2>

        <div
          class="upload-zone rounded-2xl p-6 sm:p-8 text-center cursor-pointer bg-deep/40 mb-4 touch-manipulation"
          :class="{ 'border-flow bg-flow/5': dragActive }"
          @dragover.prevent="dragActive = true"
          @dragleave.prevent="dragActive = false"
          @drop.prevent="onDrop"
          @click="openFilePicker"
        >
          <UploadCloud class="w-10 h-10 text-brand mx-auto mb-3" />
          <p class="text-ink-secondary font-medium mb-1">{{ t('generator.upload.drag') }}</p>
          <p class="text-ink-faint text-sm mb-3">{{ t('generator.upload.click') }}</p>
          <p v-if="file" class="text-xs text-ink-secondary break-all">{{ file.name }}</p>
          <input ref="fileInput" type="file" accept=".docx" class="hidden" @change="onFileChange" />
        </div>

        <button
          type="button"
          class="w-full bg-accent text-cream hover:bg-brand-dark transition py-3.5 sm:py-3 rounded-full font-medium text-sm inline-flex items-center justify-center gap-2 disabled:opacity-60 touch-target"
          :disabled="uploading"
          @click="processDocument"
        >
          <Loader2 v-if="uploading" class="w-4 h-4 animate-spin" />
          <span>{{
            uploading
              ? t('generator.upload.converting')
              : !auth.isAuthenticated && guestTrials.remaining > 0
                ? t('generator.upload.convertFree')
                : t('generator.upload.convert')
          }}</span>
        </button>
        <p v-if="message" class="text-sm text-ink-secondary mt-3">{{ message }}</p>
      </section>

      <section class="bg-surface/50 border border-line rounded-2xl p-4 sm:p-6 md:p-8 min-w-0">
        <div class="flex items-center justify-between gap-2 mb-4">
          <h2 class="font-display text-lg sm:text-xl">{{ auth.isAuthenticated ? t('generator.documents.titleAuth') : t('generator.documents.titleGuest') }}</h2>
          <button type="button" class="text-xs text-accent hover:underline" @click="loadDocuments">{{ t('generator.documents.refresh') }}</button>
        </div>
        <div class="space-y-3 max-h-[480px] overflow-auto pr-1">
          <div
            v-for="doc in documents"
            :key="doc.id"
            class="border rounded-xl p-4 flex flex-col gap-3"
            :class="cardClass(doc.status)"
          >
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div class="flex items-start gap-3 min-w-0 flex-1">
                <div class="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center shrink-0">
                  <FileText class="w-5 h-5 text-ink-secondary" />
                </div>
                <div class="min-w-0 flex-1">
                  <p class="text-sm font-medium text-ink break-all sm:truncate">{{ doc.original_file.split('/').pop() }}</p>
                  <p class="text-xs text-ink-faint sm:hidden">{{ statusLabel(doc.status, doc.billing_status) }}</p>
                  <p v-if="auth.isAuthenticated && billingLabel(doc)" class="text-[10px] text-ink-faint mt-0.5">
                    {{ billingLabel(doc) }}
                  </p>
                </div>
              </div>
              <span
                class="text-[11px] uppercase tracking-wide px-2 py-1 rounded-full border shrink-0 self-start hidden sm:inline"
                :class="statusBadgeClass(doc.status)"
              >
                {{ statusLabel(doc.status, doc.billing_status) }}
              </span>
            </div>
            <div class="flex items-stretch sm:items-center justify-stretch sm:justify-end gap-2">
              <button
                v-if="auth.isAuthenticated && doc.billing_status === 'pending_payment'"
                type="button"
                class="inline-flex items-center justify-center gap-2 text-xs bg-brand text-cream hover:bg-brand-dark px-4 py-2.5 sm:py-2 rounded-full w-full sm:w-auto touch-target"
                @click="openPaymentForDoc(doc)"
              >
                {{ t('generator.documents.pay', { price: subscription.documentPriceFormatted }) }}
              </button>
              <button
                type="button"
                class="inline-flex items-center justify-center gap-2 text-xs bg-accent text-cream hover:bg-brand-dark px-4 py-2.5 sm:py-2 rounded-full disabled:opacity-40 w-full sm:w-auto touch-target"
                :disabled="!canDownloadDoc(doc)"
                @click="downloadDoc(doc.id)"
              >
                <Download class="w-4 h-4" />
                {{
                  doc.status === 'completed' && guestDownloadNeedsPaywall() && !auth.isAuthenticated
                    ? t('generator.documents.downloadPaid')
                    : t('generator.documents.download')
                }}
              </button>
            </div>
          </div>
          <p v-if="!documents.length" class="text-sm text-ink-faint">{{ t('generator.documents.empty') }}</p>
        </div>
      </section>
    </div>

    <ProUpgradeModal
      v-if="showProUpgradeModal"
      :formatted-price="subscription.proMonthlyFormatted"
      @upgraded="onProUpgraded"
      @close="showProUpgradeModal = false"
    />

    <DocumentPaymentModal
      v-if="paymentModalDocId"
      :document-id="paymentModalDocId"
      :formatted-price="subscription.documentPriceFormatted"
      @paid="onDocumentPaid"
      @close="paymentModalDocId = null"
    />
  </div>
</template>
