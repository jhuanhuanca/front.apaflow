<script setup>
import { computed } from 'vue';
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router';
import { LogOut, BookOpen, FileInput, Link2, Table2 } from 'lucide-vue-next';
import { useAuthStore } from '@/stores/auth';
import { useSubscriptionStore } from '@/stores/subscription';
import { useSiteNav } from '@/composables/useSiteNav';
import { useI18n } from '@/composables/useI18n';
import AppLogo from '@/components/brand/AppLogo.vue';
import LanguageSwitcher from '@/components/layout/LanguageSwitcher.vue';
import SubscriptionNoticeBanner from '@/components/billing/SubscriptionNoticeBanner.vue';

const auth = useAuthStore();
const subscription = useSubscriptionStore();
const router = useRouter();
const route = useRoute();
const { appModules } = useSiteNav();
const { t, locale } = useI18n();

const moduleIcons = {
  'apa-generator': FileInput,
  'guia-apa-7': BookOpen,
  'referencias-apa': Link2,
  'tablas-figuras': Table2,
  'app-apa-settings': FileInput,
};

const planBadgeClass = computed(() => {
  if (subscription.hasProAccess) return 'bg-brand text-cream border-brand';
  const p = subscription.plan;
  if (p === 'trial') return 'bg-flow/15 text-brand border-flow/40';
  return 'bg-neutral-100 text-ink-secondary border-line-strong';
});

const planBadgeText = computed(() => {
  locale.value;
  if (subscription.hasProAccess) return t('app.shell.badges.pro');
  const p = subscription.plan;
  if (p === 'trial') return t('app.shell.badges.trial');
  return t('app.shell.badges.free');
});

function isActive(name) {
  if (name === 'apa-generator') return route.name === 'apa-generator';
  return route.name === name;
}

async function logout() {
  await auth.logout();
  await router.push('/login');
}
</script>

<template>
  <div class="min-h-full bg-midnight text-ink flex flex-col">
    <nav class="site-nav-fixed" :aria-label="t('app.shell.navAriaLabel')">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-2 sm:gap-4 min-w-0">
        <div class="flex items-center gap-2 min-w-0 flex-1">
          <AppLogo to="/apa-generator" size="nav" />
          <span
            v-if="auth.isAuthenticated"
            class="text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full border shrink-0 hidden sm:inline"
            :class="planBadgeClass"
          >
            {{ planBadgeText }}
          </span>
        </div>

        <div class="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <LanguageSwitcher />
          <RouterLink to="/" class="text-sm text-ink-muted hover:text-brand hidden lg:inline px-2 py-1.5">
            {{ t('app.shell.home') }}
          </RouterLink>
          <template v-if="!auth.isAuthenticated">
            <RouterLink to="/login" class="text-sm text-ink-secondary hover:text-brand px-2 sm:px-3 py-1.5">
              {{ t('app.shell.login') }}
            </RouterLink>
            <RouterLink
              to="/register"
              class="text-sm bg-accent text-cream hover:bg-brand-dark transition px-3 sm:px-4 py-1.5 rounded-full font-medium whitespace-nowrap"
            >
              {{ t('app.shell.register') }}
            </RouterLink>
          </template>
          <button
            v-else
            type="button"
            class="inline-flex items-center gap-1.5 text-sm border border-line hover:border-brand/30 hover:bg-brand/5 px-2.5 sm:px-3 py-1.5 rounded-full transition touch-target"
            @click="logout"
          >
            <LogOut class="w-4 h-4" />
            <span class="hidden sm:inline">{{ t('app.shell.logout') }}</span>
          </button>
        </div>
      </div>

      <div class="max-w-6xl mx-auto px-4 sm:px-6 pb-3">
        <div class="grid grid-cols-2 gap-2 sm:hidden">
          <RouterLink
            v-for="mod in appModules"
            :key="mod.name"
            :to="mod.path"
            class="flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-medium border transition min-h-[44px]"
            :class="
              isActive(mod.name)
                ? 'bg-brand/8 border-brand text-brand'
                : 'border-line text-ink-muted hover:border-flow/40 hover:bg-flow/5'
            "
          >
            <component :is="moduleIcons[mod.name]" class="w-4 h-4 shrink-0" :class="isActive(mod.name) ? 'text-flow' : ''" />
            <span class="leading-tight">{{ mod.shortLabel }}</span>
          </RouterLink>
        </div>
        <div class="hidden sm:block scroll-tabs">
          <RouterLink
            v-for="mod in appModules"
            :key="mod.name"
            :to="mod.path"
            class="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition whitespace-nowrap min-h-[40px]"
            :class="
              isActive(mod.name)
                ? 'bg-brand/8 border-brand text-brand shadow-sm'
                : 'border-line text-ink-muted hover:border-flow/50 hover:text-brand hover:bg-flow/5'
            "
          >
            <component
              :is="moduleIcons[mod.name]"
              class="w-4 h-4 shrink-0"
              :class="isActive(mod.name) ? 'text-flow' : ''"
            />
            {{ mod.label }}
          </RouterLink>
        </div>
      </div>
    </nav>

    <div class="site-nav-offset-app flex-1 flex flex-col min-w-0">
      <div v-if="auth.isAuthenticated" class="page-shell pt-4 pb-0">
        <SubscriptionNoticeBanner />
      </div>
      <RouterView :key="locale" />
    </div>
  </div>
</template>
