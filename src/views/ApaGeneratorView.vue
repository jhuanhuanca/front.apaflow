<script setup>
import { RouterLink } from 'vue-router';
import { Settings } from 'lucide-vue-next';
import ApaConverterView from '@/views/app/ApaConverterView.vue';
import {
  localizedSoftwareJsonLd,
  useLocalizedPageSeo,
} from '@/composables/useLocalizedPageSeo';
import { useI18n } from '@/composables/useI18n';
import { useSubscriptionStore } from '@/stores/subscription';

const subscription = useSubscriptionStore();
const { t } = useI18n();

useLocalizedPageSeo({
  titleKey: 'generator.seo.title',
  descriptionKey: 'generator.seo.description',
  path: '/apa-generator',
  jsonLd: () => localizedSoftwareJsonLd(t('generator.seo.description')),
});
</script>

<template>
  <div>
    <div class="border-b border-line bg-deep/50">
      <div class="page-shell py-8 sm:py-10 max-w-5xl mx-auto flex flex-wrap items-end justify-between gap-4">
        <div>
          <p class="text-xs uppercase tracking-wider text-accent font-medium mb-2">{{ t('generator.hero.badge') }}</p>
          <h1 class="font-display text-2xl sm:text-3xl text-ink">{{ t('generator.hero.title') }}</h1>
          <p class="text-sm text-ink-muted mt-2 max-w-xl">
            {{ t('generator.hero.subtitle') }}
          </p>
        </div>
        <RouterLink
          v-if="subscription.canCustomizeApa"
          to="/app/configuracion-apa"
          class="btn-ghost text-sm inline-flex items-center gap-2"
        >
          <Settings class="w-4 h-4" />
          {{ t('generator.hero.proSettings') }}
        </RouterLink>
      </div>
    </div>

    <div class="bg-midnight">
      <ApaConverterView embedded />
    </div>
  </div>
</template>
