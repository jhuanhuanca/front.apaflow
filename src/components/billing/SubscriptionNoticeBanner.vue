<script setup>
import { computed, ref, watch } from 'vue';
import { AlertTriangle, Info } from 'lucide-vue-next';
import { useI18n } from '@/composables/useI18n';
import { useSubscriptionStore } from '@/stores/subscription';

const subscription = useSubscriptionStore();
const { t, locale } = useI18n();
const dismissed = ref(false);

const notice = computed(() => subscription.subscriptionNotice);

const dateLocale = computed(() => (locale.value === 'en' ? 'en-US' : 'es-ES'));

const toneClass = computed(() => {
  const code = notice.value?.code ?? '';
  if (code === 'pro_expired') {
    return 'border-amber-300/60 bg-amber-50 text-amber-950';
  }
  if (code === 'pro_expiring_3d') {
    return 'border-red-300/60 bg-red-50 text-red-950';
  }
  return 'border-brand-200 bg-brand-50 text-ink-secondary';
});

watch(
  () => notice.value?.code,
  () => {
    dismissed.value = false;
  },
);
</script>

<template>
  <div
    v-if="notice && !dismissed"
    class="rounded-2xl border px-4 py-3 flex items-start gap-3 text-sm"
    :class="toneClass"
    role="status"
  >
    <AlertTriangle v-if="notice.code?.includes('expir')" class="w-5 h-5 shrink-0 mt-0.5" />
    <Info v-else class="w-5 h-5 shrink-0 mt-0.5" />
    <div class="flex-1 min-w-0">
      <p>{{ notice.message }}</p>
      <p v-if="subscription.subscriptionExpiresAt && notice.code !== 'pro_expired'" class="text-xs opacity-80 mt-1">
        {{ t('billing.subscription.expires') }}
        {{ new Date(subscription.subscriptionExpiresAt).toLocaleDateString(dateLocale) }}
      </p>
    </div>
    <button
      type="button"
      class="text-xs underline opacity-80 shrink-0"
      @click="dismissed = true"
    >
      {{ t('common.actions.close') }}
    </button>
  </div>
</template>
