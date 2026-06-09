<script setup>
import { inject } from 'vue';
import AdInline from '@/components/ads/AdInline.vue';
import { AD_LOCATIONS } from '@/constants/ads';
import { useClientConfigStore } from '@/stores/clientConfig';

defineProps({
  title: { type: String, required: true },
  id: { type: String, default: '' },
});

const sectionCounter = inject('guideSectionCounter', null);
const clientConfig = useClientConfigStore();
const sectionIndex = sectionCounter ? sectionCounter.value++ : -1;

const inlineInterval = clientConfig.ads?.inline_interval ?? 3;
const showInlineAd =
  sectionIndex >= 0
  && sectionIndex > 0
  && (sectionIndex + 1) % inlineInterval === 0;
</script>

<template>
  <section :id="id" class="rounded-3xl border border-line/80 bg-white/70 p-5 sm:p-6 space-y-4 scroll-anchor shadow-card">
    <h2 class="font-display text-lg sm:text-xl text-ink">{{ title }}</h2>
    <slot />
  </section>
  <AdInline v-if="showInlineAd" :location="AD_LOCATIONS.GUIDE_INLINE" />
</template>
