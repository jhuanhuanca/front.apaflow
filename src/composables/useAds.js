import { computed } from 'vue';
import { useAdsStore } from '@/stores/ads';

export function useAds() {
  const ads = useAdsStore();

  return {
    canShowAds: computed(() => ads.canShowAds),
    canShowAdsInCurrentRoute: computed(() => ads.canShowAdsInCurrentRoute),
    provider: computed(() => ads.provider),
    lazyLoad: computed(() => ads.lazyLoad),
    slotFor: ads.slotFor,
    isAdSenseReady: ads.isAdSenseReady,
    shouldRender: computed(() => ads.canShowAdsInCurrentRoute),
  };
}
