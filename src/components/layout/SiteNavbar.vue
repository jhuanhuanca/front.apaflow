<script setup>
import { computed, ref } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { LogOut, Menu, X, Search } from 'lucide-vue-next';
import AppLogo from '@/components/brand/AppLogo.vue';
import LanguageSwitcher from '@/components/layout/LanguageSwitcher.vue';
import { useSiteNav } from '@/composables/useSiteNav';
import { useI18n } from '@/composables/useI18n';
import { useRoutePrefetch } from '@/composables/useRoutePrefetch';
import { useAuthStore } from '@/stores/auth';

const route = useRoute();
const router = useRouter();
const auth = useAuthStore();
const { mainNav } = useSiteNav();
const { t } = useI18n();
const { prefetch } = useRoutePrefetch();
const open = ref(false);

const centerNav = computed(() => mainNav.value.filter((item) => item.name !== 'apa-generator'));

function isActive(item) {
  if (item.name === 'home') return route.path === '/';
  return route.name === item.name;
}

function closeMenu() {
  open.value = false;
}

const loggingOut = ref(false);

async function handleLogout() {
  if (loggingOut.value) {
    return;
  }
  loggingOut.value = true;
  try {
    await auth.logout();
    closeMenu();
    await router.push('/');
  } finally {
    loggingOut.value = false;
  }
}
</script>

<template>
  <header class="site-nav-fixed">
    <!-- Barra superior utilitaria -->
    <div class="site-nav-topbar">
      <div class="site-nav-inner site-nav-topbar-inner">
        <RouterLink
          to="/#faq"
          class="site-nav-topbar-link hidden sm:inline-flex"
          @click="closeMenu"
        >
          {{ t('nav.topbar.help') }}
        </RouterLink>

        <div class="ml-auto flex items-center gap-4">
          <LanguageSwitcher variant="topbar" class="hidden sm:inline-flex" />
          <LanguageSwitcher variant="pill" class="sm:hidden" />
        </div>
      </div>
    </div>

    <!-- Barra principal -->
    <div class="site-nav-main">
      <div class="site-nav-inner site-nav-main-inner">
        <RouterLink to="/" class="site-nav-logo shrink-0" @click="closeMenu" @mouseenter="prefetch('/')">
          <AppLogo size="nav" />
        </RouterLink>

        <nav
          class="site-nav-links hidden xl:flex items-center justify-center flex-1 min-w-0 px-4"
          :aria-label="t('nav.aria.main')"
        >
          <RouterLink
            v-for="item in centerNav"
            :key="item.to"
            :to="item.to"
            class="site-nav-link"
            :class="{ 'site-nav-link-active': isActive(item) }"
            @mouseenter="prefetch(item.to)"
          >
            {{ item.label }}
          </RouterLink>
        </nav>

        <div class="site-nav-actions hidden lg:flex items-center gap-2.5 shrink-0">
          <RouterLink
            to="/guia-apa-7"
            class="site-nav-icon-btn"
            :aria-label="t('nav.topbar.searchGuides')"
            @mouseenter="prefetch('/guia-apa-7')"
          >
            <Search class="w-[1.125rem] h-[1.125rem]" />
          </RouterLink>

          <template v-if="auth.isAuthenticated">
            <RouterLink to="/apa-generator" class="btn-nav-solid">
              {{ t('common.actions.useGenerator') }}
            </RouterLink>
            <button
              type="button"
              class="btn-nav-outline inline-flex items-center gap-2"
              :disabled="loggingOut"
              @click="handleLogout"
            >
              <LogOut class="w-4 h-4" />
              {{ loggingOut ? t('common.actions.loading') : t('common.actions.logout') }}
            </button>
          </template>
          <template v-else>
            <RouterLink to="/register" class="btn-nav-solid">
              {{ t('nav.footer.register') }}
            </RouterLink>
            <RouterLink to="/login" class="btn-nav-outline">
              {{ t('common.actions.login') }}
            </RouterLink>
          </template>
        </div>

        <div class="lg:hidden flex items-center gap-2 ml-auto">
          <RouterLink
            to="/guia-apa-7"
            class="site-nav-icon-btn"
            :aria-label="t('nav.topbar.searchGuides')"
            @mouseenter="prefetch('/guia-apa-7')"
          >
            <Search class="w-5 h-5" />
          </RouterLink>
          <button
            type="button"
            class="site-nav-menu-btn"
            :aria-label="t('common.actions.openMenu')"
            :aria-expanded="open"
            @click="open = !open"
          >
            <Menu v-if="!open" class="w-6 h-6" />
            <X v-else class="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>

    <!-- Menú móvil -->
    <div v-if="open" class="site-nav-mobile lg:hidden">
      <nav class="px-4 py-4 space-y-0.5" :aria-label="t('nav.aria.main')">
        <RouterLink
          v-for="item in centerNav"
          :key="`m-${item.to}`"
          :to="item.to"
          class="site-nav-mobile-link"
          :class="{ 'site-nav-mobile-link-active': isActive(item) }"
          @click="closeMenu"
          @mouseenter="prefetch(item.to)"
        >
          {{ item.label }}
        </RouterLink>
        <RouterLink
          to="/apa-generator"
          class="site-nav-mobile-link font-semibold text-brand"
          @click="closeMenu"
        >
          {{ t('nav.main.generator') }}
        </RouterLink>
      </nav>

      <div class="px-4 pb-5 pt-3 border-t border-line/80 flex flex-col gap-2">
        <template v-if="auth.isAuthenticated">
          <RouterLink to="/apa-generator" class="btn-nav-solid w-full text-center" @click="closeMenu">
            {{ t('common.actions.useGenerator') }}
          </RouterLink>
          <button
            type="button"
            class="btn-nav-outline w-full inline-flex items-center justify-center gap-2"
            :disabled="loggingOut"
            @click="handleLogout"
          >
            <LogOut class="w-4 h-4" />
            {{ loggingOut ? t('common.actions.loading') : t('common.actions.logout') }}
          </button>
        </template>
        <template v-else>
          <RouterLink to="/register" class="btn-nav-solid w-full text-center" @click="closeMenu">
            {{ t('nav.footer.register') }}
          </RouterLink>
          <RouterLink to="/login" class="btn-nav-outline w-full text-center" @click="closeMenu">
            {{ t('common.actions.login') }}
          </RouterLink>
        </template>
      </div>
    </div>
  </header>
</template>
