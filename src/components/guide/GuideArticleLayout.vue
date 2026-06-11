<script setup>
import { provide, ref } from 'vue';
import { RouterLink } from 'vue-router';
import { useI18n } from '@/composables/useI18n';

defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  intro: { type: String, default: '' },
  showGeneratorCta: { type: Boolean, default: true },
});

const { t } = useI18n();
const sectionCounter = ref(0);
provide('guideSectionCounter', sectionCounter);
</script>

<template>
  <article class="page-shell max-w-3xl mx-auto">
    <header class="mb-8 sm:mb-10">
      <p v-if="subtitle" class="text-accent text-sm font-medium mb-2">{{ subtitle }}</p>
      <h1 class="font-display text-3xl sm:text-4xl text-ink mb-4">{{ title }}</h1>
      <p class="text-ink-muted text-sm sm:text-base leading-relaxed">
        {{ intro || t('guides.layout.introFallback') }}
      </p>
    </header>

    <div class="space-y-8 text-sm sm:text-[0.9375rem] text-ink-secondary leading-relaxed">
      <slot />
    </div>

    <aside
      v-if="showGeneratorCta"
      class="mt-10 rounded-2xl border border-accent/20 bg-accent/5 p-6 sm:p-8"
    >
      <h2 class="font-display text-lg text-ink mb-2">{{ t('guides.layout.ctaTitle') }}</h2>
      <p class="text-ink-muted mb-4">{{ t('guides.layout.ctaText') }}</p>
      <RouterLink to="/apa-generator" class="btn-primary inline-flex">
        {{ t('guides.layout.ctaButton') }}
      </RouterLink>
    </aside>
  </article>
</template>
