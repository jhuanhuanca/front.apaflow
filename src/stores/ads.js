import { defineStore } from 'pinia';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useClientConfigStore } from '@/stores/clientConfig';
import { useSubscriptionStore } from '@/stores/subscription';
import { ADS_BLOCKED_ROUTE_NAMES } from '@/constants/ads';

/**
 * Fuente única de permisos de anuncios en el frontend.
 * guest => true, free => true, pro => false
 */
export const useAdsStore = defineStore('ads', () => {
  const auth = useAuthStore();
  const clientConfig = useClientConfigStore();
  const subscription = useSubscriptionStore();
  const route = useRoute();

  const config = computed(() => clientConfig.ads);

  const enabled = computed(() => Boolean(config.value?.enabled));

  const provider = computed(() => config.value?.provider || 'placeholder');

  const slots = computed(() => config.value?.slots ?? {});

  const lazyLoad = computed(() => config.value?.lazy_load !== false);

  const canShowAds = computed(() => {
    if (!enabled.value) {
      return false;
    }
    if (auth.isAuthenticated) {
      return subscription.showAds;
    }
    return true;
  });

  const canShowAdsInCurrentRoute = computed(() => {
    if (!canShowAds.value) {
      return false;
    }
    const name = route.name;
    if (name && ADS_BLOCKED_ROUTE_NAMES.has(String(name))) {
      return false;
    }
    const blocked = config.value?.blocked_paths ?? [];
    return !blocked.some((p) => route.path === p || route.path.startsWith(`${p}/`));
  });

  function slotFor(location) {
    return slots.value[location] || '';
  }

  function isAdSenseReady(location) {
    return provider.value === 'adsense' && Boolean(slotFor(location));
  }

  return {
    enabled,
    provider,
    slots,
    lazyLoad,
    canShowAds,
    canShowAdsInCurrentRoute,
    slotFor,
    isAdSenseReady,
  };
});
