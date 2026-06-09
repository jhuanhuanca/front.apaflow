<script setup>
import { provide, ref } from 'vue';
import { RouterLink } from 'vue-router';
import AdBanner from '@/components/ads/AdBanner.vue';
import AdSidebar from '@/components/ads/AdSidebar.vue';
import AdFooter from '@/components/ads/AdFooter.vue';
import { useI18n } from '@/composables/useI18n';
import { AD_LOCATIONS } from '@/constants/ads';

defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  intro: { type: String, default: '' },
  showGeneratorCta: { type: Boolean, default: true },
  showAds: { type: Boolean, default: true },
});

const { t } = useI18n();
const sectionCounter = ref(0);
provide('guideSectionCounter', sectionCounter);
</script>

<template>
  <article class="page-shell max-w-6xl mx-auto">
    <AdBanner v-if="showAds" :location="AD_LOCATIONS.GUIDE_TOP" class="!mt-0" />

    <header class="mb-8 sm:mb-10 max-w-3xl">
      <p v-if="subtitle" class="text-accent text-sm font-medium mb-2">{{ subtitle }}</p>
      <h1 class="font-display text-3xl sm:text-4xl text-ink mb-4">{{ title }}</h1>
      <p class="text-ink-muted text-sm sm:text-base leading-relaxed">
        {{ intro || t('guides.layout.introFallback') }}
      </p>
    </header>

    <div class="lg:grid lg:grid-cols-[minmax(0,1fr)_17.5rem] lg:gap-10 items-start">
      <div class="space-y-8 text-sm sm:text-[0.9375rem] text-ink-secondary leading-relaxed max-w-3xl">
        <slot />
        <AdBanner v-if="showAds" :location="AD_LOCATIONS.GUIDE_BOTTOM" />
      </div>

      <aside v-if="showAds" class="hidden lg:block lg:sticky lg:top-24">
        <AdSidebar :location="AD_LOCATIONS.GUIDE_SIDEBAR" />
      </aside>
    </div>

    <aside
      v-if="showGeneratorCta"
      class="mt-10 max-w-3xl rounded-2xl border border-accent/20 bg-accent/5 p-6 sm:p-8"
    >
      <h2 class="font-display text-lg text-ink mb-2">{{ t('guides.layout.ctaTitle') }}</h2>
      <p class="text-ink-muted mb-4">{{ t('guides.layout.ctaText') }}</p>
      <RouterLink to="/apa-generator" class="btn-primary inline-flex">
        {{ t('guides.layout.ctaButton') }}
      </RouterLink>
    </aside>

    <AdFooter v-if="showAds" :location="AD_LOCATIONS.FOOTER" />
  </article>
</template>
