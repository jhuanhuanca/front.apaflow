<script setup>
import { computed, ref, watch } from 'vue';
import { useRouter, RouterLink, useRoute } from 'vue-router';
import { Download, Crown, Check, ArrowLeft } from 'lucide-vue-next';
import { useAuthStore } from '@/stores/auth';
import {
  PLAN_PAY_PER_DOWNLOAD,
  PLAN_PREMIUM,
  PENDING_DOC_KEY,
  SELECTED_PLAN_KEY,
  savePendingDocId,
} from '@/constants/guestBilling';
import AppLogo from '@/components/brand/AppLogo.vue';
import PasswordField from '@/components/forms/PasswordField.vue';
import LanguageSwitcher from '@/components/layout/LanguageSwitcher.vue';
import { useI18n } from '@/composables/useI18n';

const router = useRouter();
const route = useRoute();
const auth = useAuthStore();
const { t, tm } = useI18n();

const name = ref('');
const email = ref('');
const password = ref('');
const password_confirmation = ref('');
const error = ref('');
const loading = ref(false);
const selectedPlan = ref(PLAN_PAY_PER_DOWNLOAD);

const isUpgradeFlow = computed(() => route.query.intent === 'second-download');
const pendingDocId = computed(() => {
  const q = route.query.docId;
  return q != null && String(q).trim() !== '' ? String(q) : null;
});

watch(
  pendingDocId,
  (id) => {
    if (id) {
      savePendingDocId(id);
    }
  },
  { immediate: true },
);

watch(
  () => route.query.plan,
  (p) => {
    if (p === PLAN_PREMIUM) {
      selectedPlan.value = PLAN_PREMIUM;
    } else if (p === PLAN_PAY_PER_DOWNLOAD) {
      selectedPlan.value = PLAN_PAY_PER_DOWNLOAD;
    }
  },
  { immediate: true },
);

async function submit() {
  error.value = '';
  loading.value = true;
  try {
    try {
      sessionStorage.setItem(SELECTED_PLAN_KEY, selectedPlan.value);
    } catch {
      /* noop */
    }
    await auth.register({
      name: name.value,
      email: email.value,
      password: password.value,
      password_confirmation: password_confirmation.value,
    });
    await router.push({
      path: '/registro/checkout',
      query: {
        plan: selectedPlan.value,
        ...(pendingDocId.value ? { docId: pendingDocId.value } : {}),
      },
    });
  } catch (e) {
    const bag = e?.response?.data?.errors;
    error.value = bag
      ? Object.values(bag).flat().join(' ')
      : e?.response?.data?.message || t('common.errors.registerFailed');
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="min-h-full bg-midnight text-ink px-4 py-8 sm:py-12 md:py-16 pb-[max(2rem,env(safe-area-inset-bottom))] overflow-x-hidden relative">
    <div class="absolute top-4 right-4 sm:top-6 sm:right-6">
      <LanguageSwitcher />
    </div>
    <div class="max-w-4xl mx-auto w-full min-w-0">
      <div class="flex justify-center mb-6 sm:mb-10">
        <div class="sm:hidden"><AppLogo to="/" size="xl" /></div>
        <div class="hidden sm:block"><AppLogo to="/" size="hero" /></div>
      </div>
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 sm:mb-8">
        <RouterLink
          :to="isUpgradeFlow ? '/apa-generator' : '/'"
          class="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-ink"
        >
          <ArrowLeft class="w-4 h-4" />
          {{ isUpgradeFlow ? t('auth.register.backToPanel') : t('common.actions.home') }}
        </RouterLink>
        <RouterLink to="/login" class="text-sm text-link hover:underline">{{ t('nav.footer.login') }}</RouterLink>
      </div>

      <header v-if="isUpgradeFlow" class="text-center mb-10">
        <p class="text-brand text-sm font-medium tracking-wide mb-2">{{ t('auth.register.upgradeTitle') }}</p>
        <h1 class="font-display text-2xl sm:text-3xl md:text-4xl mb-3">{{ t('auth.register.upgradeSubtitle') }}</h1>
        <p class="text-ink-muted text-sm max-w-lg mx-auto leading-relaxed">{{ t('auth.register.upgradeDesc') }}</p>
      </header>

      <header v-else class="mb-8">
        <h1 class="font-display text-2xl md:text-3xl mb-2">{{ t('auth.register.title') }}</h1>
        <p class="text-ink-muted text-sm">{{ t('auth.register.desc') }}</p>
      </header>

      <!-- Selección de plan (upgrade flow o registro con plan en query) -->
      <div
        class="grid md:grid-cols-2 gap-4 mb-8"
        :class="{ 'mb-10': isUpgradeFlow }"
      >
        <button
          type="button"
          class="text-left rounded-2xl border p-5 transition card-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-ink"
          :class="
            selectedPlan === PLAN_PAY_PER_DOWNLOAD
              ? 'border-ink bg-neutral-50 ring-1 ring-ink/20'
              : 'border-line bg-deep/60 hover:border-line-strong'
          "
          @click="selectedPlan = PLAN_PAY_PER_DOWNLOAD"
        >
          <div class="flex items-start gap-3 mb-3">
            <div class="w-11 h-11 rounded-xl bg-neutral-100 flex items-center justify-center shrink-0">
              <Download class="w-5 h-5 text-ink-secondary" />
            </div>
            <div>
              <p class="font-medium">{{ t('auth.register.singleDoc') }}</p>
              <p class="text-2xl font-display mt-1">
                $0.99
                <span class="text-sm font-normal text-ink-muted">{{ t('auth.register.perDownload') }}</span>
              </p>
            </div>
          </div>
          <ul class="space-y-2 text-xs text-ink-muted">
            <li v-for="(item, i) in tm('auth.register.singleBullets')" :key="i" class="flex items-center gap-2">
              <Check class="w-3.5 h-3.5 text-accent shrink-0" />
              {{ item }}
            </li>
          </ul>
        </button>

        <button
          type="button"
          class="relative text-left rounded-2xl border p-5 transition card-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-ink"
          :class="
            selectedPlan === PLAN_PREMIUM
              ? 'border-ink bg-neutral-50 ring-1 ring-ink/20'
              : 'border-line bg-deep/60 hover:border-line-strong'
          "
          @click="selectedPlan = PLAN_PREMIUM"
        >
          <span
            class="absolute -top-2.5 right-4 text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-accent text-cream"
          >
            {{ t('common.actions.recommended') }}
          </span>
          <div class="flex items-start gap-3 mb-3">
            <div class="w-11 h-11 rounded-xl bg-amber-500/20 flex items-center justify-center shrink-0">
              <Crown class="w-5 h-5 text-amber-200" />
            </div>
            <div>
              <p class="font-medium">{{ t('common.plans.planPro') }}</p>
              <p class="text-2xl font-display mt-1">
                $5.99
                <span class="text-sm font-normal text-ink-muted">{{ t('auth.register.perMonth') }}</span>
              </p>
            </div>
          </div>
          <ul class="space-y-2 text-xs text-ink-muted">
            <li v-for="(item, i) in tm('auth.register.proBullets')" :key="i" class="flex items-center gap-2">
              <Check class="w-3.5 h-3.5 text-accent shrink-0" />
              {{ item }}
            </li>
          </ul>
        </button>
      </div>

      <div class="max-w-md mx-auto w-full bg-deep border border-line rounded-2xl p-5 sm:p-8">
        <h2 class="font-display text-xl mb-1">
          {{ isUpgradeFlow ? t('auth.register.formTitleUpgrade') : t('auth.register.formTitleDefault') }}
        </h2>
        <p class="text-xs text-ink-muted mb-6">
          {{ t('auth.register.selectedPlan') }}
          <strong class="text-ink-secondary">{{
            selectedPlan === PLAN_PREMIUM ? t('auth.register.selectedPro') : t('auth.register.selectedSingle')
          }}</strong>
        </p>

        <form class="space-y-4" @submit.prevent="submit">
          <div>
            <label class="block text-sm text-ink-muted mb-1.5" for="name">{{ t('common.forms.fullName') }}</label>
            <input
              id="name"
              v-model="name"
              type="text"
              required
              class="w-full bg-surface border border-line rounded-xl px-4 py-3 text-sm text-ink placeholder:text-ink-faint"
              :placeholder="t('common.forms.namePlaceholder')"
            />
          </div>
          <div>
            <label class="block text-sm text-ink-muted mb-1.5" for="email">{{ t('common.forms.email') }}</label>
            <input
              id="email"
              v-model="email"
              type="email"
              required
              class="w-full bg-surface border border-line rounded-xl px-4 py-3 text-sm text-ink placeholder:text-ink-faint"
              :placeholder="t('common.forms.emailPlaceholder')"
            />
          </div>
          <PasswordField
            id="password"
            v-model="password"
            :label="t('common.forms.password')"
            :placeholder="t('common.forms.passwordPlaceholder')"
            autocomplete="new-password"
            :minlength="8"
            required
          />
          <PasswordField
            id="pc"
            v-model="password_confirmation"
            :label="t('common.forms.confirmPassword')"
            :placeholder="t('common.forms.confirmPasswordPlaceholder')"
            autocomplete="new-password"
            required
          />
          <p v-if="error" class="text-sm text-red-400">{{ error }}</p>
          <button
            type="submit"
            class="w-full bg-accent text-cream hover:bg-brand-dark transition py-3 rounded-full font-medium text-sm disabled:opacity-60"
            :disabled="loading"
          >
            {{
              loading
                ? t('auth.register.creating')
                : selectedPlan === PLAN_PREMIUM
                  ? t('auth.register.submitPro')
                  : t('auth.register.submitSingle')
            }}
          </button>
        </form>
        <p class="mt-5 text-center text-ink-faint text-sm">
          {{ t('auth.register.hasAccount') }}
          <RouterLink
            :to="{ path: '/login', query: route.query.intent ? { redirect: '/apa-generator', ...route.query } : {} }"
            class="text-accent hover:underline"
          >
            {{ t('auth.register.signIn') }}
          </RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>
