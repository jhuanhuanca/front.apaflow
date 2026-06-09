<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { Megaphone } from 'lucide-vue-next';
import { useAds } from '@/composables/useAds';
import { AD_DEMO_LABELS } from '@/constants/ads';

const props = defineProps({
  location: { type: String, required: true },
  format: { type: String, default: 'banner' },
  label: { type: String, default: '' },
  compact: { type: Boolean, default: false },
});

const { shouldRender, provider, lazyLoad, slotFor, isAdSenseReady } = useAds();

const root = ref(null);
const visible = ref(!lazyLoad.value);
let observer;

const displayLabel = computed(
  () => props.label || AD_DEMO_LABELS[props.format] || AD_DEMO_LABELS.banner,
);

const slotId = computed(() => slotFor(props.location));

const formatClasses = computed(() => {
  switch (props.format) {
    case 'sidebar':
      return 'min-h-[16rem] max-w-xs mx-auto lg:mx-0';
    case 'inline':
      return 'min-h-[7rem]';
    case 'footer':
      return 'min-h-[5.5rem]';
    default:
      return props.compact ? 'min-h-[5rem]' : 'min-h-[6.5rem] sm:min-h-[7.5rem]';
  }
});

function setupObserver() {
  if (!lazyLoad.value || visible.value || !root.value) {
    return;
  }
  observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        visible.value = true;
        observer?.disconnect();
      }
    },
    { rootMargin: '120px' },
  );
  observer.observe(root.value);
}

watch(shouldRender, (ok) => {
  if (ok) {
    setupObserver();
  }
});

onMounted(() => {
  if (shouldRender.value) {
    setupObserver();
  }
});

onUnmounted(() => {
  observer?.disconnect();
});
</script>

<template>
  <div v-if="shouldRender" ref="root" class="ad-slot my-6 sm:my-8" :data-ad-location="location">
    <div
      v-if="visible"
      class="ad-slot__inner rounded-2xl border border-dashed border-brand-200/80 bg-gradient-to-br from-brand-50/90 via-white to-flow-50/80 overflow-hidden shadow-card"
      :class="formatClasses"
      role="complementary"
      :aria-label="displayLabel"
    >
      <!-- Futuro Google AdSense -->
      <ins
        v-if="isAdSenseReady(location)"
        class="adsbygoogle block w-full h-full min-h-[inherit]"
        :data-ad-client="slotId"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />

      <!-- Placeholder demo -->
      <div
        v-else
        class="flex flex-col items-center justify-center gap-2 h-full min-h-[inherit] px-4 py-6 text-center"
      >
        <div
          class="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center text-brand"
        >
          <Megaphone class="w-5 h-5" />
        </div>
        <p class="text-xs uppercase tracking-wider font-semibold text-brand/80">
          {{ displayLabel }}
        </p>
        <p class="text-[11px] text-ink-faint max-w-xs">
          {{ provider === 'adsense' ? 'Configura ADS_SLOT_* en .env' : 'Demo — monetización APA Flow' }}
        </p>
      </div>
    </div>
    <div v-else class="min-h-[4rem] rounded-2xl bg-brand-50/30 animate-pulse" aria-hidden="true" />
  </div>
</template>
