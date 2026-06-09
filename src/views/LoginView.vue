<script setup>
import { ref } from 'vue';
import { useRouter, useRoute, RouterLink } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useI18n } from '@/composables/useI18n';
import { PENDING_DOC_KEY, SELECTED_PLAN_KEY } from '@/constants/guestBilling';
import AppLogo from '@/components/brand/AppLogo.vue';
import LanguageSwitcher from '@/components/layout/LanguageSwitcher.vue';

const router = useRouter();
const route = useRoute();
const auth = useAuthStore();
const { t } = useI18n();

const email = ref('');
const password = ref('');
const error = ref('');
const loading = ref(false);

async function submit() {
  error.value = '';
  loading.value = true;
  try {
    await auth.login({ email: email.value, password: password.value });
    if (auth.needsRegistrationCheckout) {
      const checkoutQuery = { redirect: '/apa-generator' };
      const plan = route.query.plan || sessionStorage.getItem(SELECTED_PLAN_KEY);
      const docId = route.query.docId || sessionStorage.getItem(PENDING_DOC_KEY);
      if (plan) checkoutQuery.plan = String(plan);
      if (docId) checkoutQuery.docId = String(docId);
      await router.push({ name: 'registration-checkout', query: checkoutQuery });
    } else {
      await router.push('/apa-generator');
    }
  } catch (e) {
    error.value = e?.response?.data?.message || t('common.errors.loginFailed');
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="min-h-full bg-midnight text-ink flex flex-col items-center justify-center px-4 py-10 sm:py-16 pb-[max(2.5rem,env(safe-area-inset-bottom))]">
    <div class="absolute top-4 right-4 sm:top-6 sm:right-6">
      <LanguageSwitcher />
    </div>
    <div class="mb-6 sm:mb-8 w-full flex justify-center">
      <div class="sm:hidden"><AppLogo to="/" size="xl" /></div>
      <div class="hidden sm:block"><AppLogo to="/" size="hero" /></div>
    </div>
    <div class="w-full max-w-md bg-deep border border-line rounded-2xl p-5 sm:p-8 shadow-soft">
      <div class="flex items-center justify-between mb-6">
        <h1 class="font-display text-2xl">{{ t('auth.login.title') }}</h1>
        <RouterLink to="/" class="text-ink-faint hover:text-ink text-sm">{{ t('common.actions.home') }}</RouterLink>
      </div>
      <form class="space-y-4" @submit.prevent="submit">
        <div>
          <label for="email" class="block text-sm text-ink-muted mb-1.5">{{ t('common.forms.email') }}</label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            class="w-full bg-surface border border-line rounded-xl px-4 py-3 text-sm text-ink placeholder:text-ink-faint"
            :placeholder="t('common.forms.emailPlaceholder')"
          />
        </div>
        <div>
          <label for="password" class="block text-sm text-ink-muted mb-1.5">{{ t('common.forms.password') }}</label>
          <input
            id="password"
            v-model="password"
            type="password"
            required
            class="w-full bg-surface border border-line rounded-xl px-4 py-3 text-sm text-ink placeholder:text-ink-faint"
            placeholder="••••••••"
          />
        </div>
        <p v-if="error" class="text-sm text-red-400">{{ error }}</p>
        <button
          type="submit"
          class="w-full bg-accent text-cream hover:bg-brand-dark transition py-3 rounded-full font-medium text-sm disabled:opacity-60"
          :disabled="loading"
        >
          {{ loading ? t('auth.login.submitting') : t('common.actions.login') }}
        </button>
      </form>
      <p class="mt-5 text-center text-ink-faint text-sm">
        {{ t('auth.login.noAccount') }}
        <RouterLink to="/register" class="text-link hover:underline">{{ t('auth.login.signUp') }}</RouterLink>
      </p>
    </div>
  </div>
</template>
