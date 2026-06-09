import { defineStore } from 'pinia';
import { computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useClientConfigStore } from '@/stores/clientConfig';

/**
 * Capacidades de plan derivadas del backend (/api/user → capabilities).
 * El frontend NUNCA decide PRO por sí solo.
 */
export const useSubscriptionStore = defineStore('subscription', () => {
  const auth = useAuthStore();
  const clientConfig = useClientConfigStore();

  const capabilities = computed(() => auth.user?.capabilities ?? null);

  const plan = computed(() => capabilities.value?.plan ?? 'free');

  const hasProAccess = computed(() => Boolean(capabilities.value?.pro_active ?? capabilities.value?.unlimited_documents));

  const isFreePlan = computed(
    () => !hasProAccess.value && (plan.value === 'free' || !auth.isAuthenticated),
  );

  const requiresPaymentPerDocument = computed(
    () => Boolean(capabilities.value?.requires_payment_per_document) && auth.isAuthenticated,
  );

  const canCustomizeApa = computed(() => Boolean(capabilities.value?.can_customize_apa));

  const subscriptionExpiresAt = computed(() => capabilities.value?.subscription_expires_at ?? null);

  const subscriptionNotice = computed(() => capabilities.value?.subscription_notice ?? null);

  const documentPriceFormatted = computed(
    () =>
      capabilities.value?.document_price_formatted
      ?? clientConfig.pricing?.free_per_document_formatted
      ?? '$0.99',
  );

  const proMonthlyFormatted = computed(
    () =>
      capabilities.value?.pro_monthly_formatted
      ?? clientConfig.pricing?.pro_monthly_formatted
      ?? '$5.99',
  );

  const showAds = computed(() => {
    if (capabilities.value?.show_ads !== undefined) {
      return Boolean(capabilities.value.show_ads);
    }
    return !hasProAccess.value;
  });

  return {
    capabilities,
    plan,
    hasProAccess,
    isFreePlan,
    requiresPaymentPerDocument,
    canCustomizeApa,
    showAds,
    canShowAds: showAds,
    subscriptionExpiresAt,
    subscriptionNotice,
    documentPriceFormatted,
    proMonthlyFormatted,
  };
});
