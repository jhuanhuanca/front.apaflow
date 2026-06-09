<script setup>
import { useI18n } from '@/composables/useI18n';

defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
});

const { t } = useI18n();
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-10 w-full min-w-0 pb-[max(2rem,env(safe-area-inset-bottom))]">
    <header class="mb-6 sm:mb-8">
      <p v-if="subtitle" class="text-accent text-sm font-medium mb-2">{{ subtitle }}</p>
      <h1 class="font-display text-2xl sm:text-3xl md:text-4xl mb-3">{{ title }}</h1>
      <p class="text-ink-muted text-sm leading-relaxed">
        {{ t('app.guideArticle.disclaimer') }}
      </p>
    </header>
    <div class="space-y-8 text-sm text-ink-secondary leading-relaxed">
      <slot />
    </div>
  </div>
</template>
