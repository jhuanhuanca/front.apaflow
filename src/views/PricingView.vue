<script setup>
import { RouterLink } from 'vue-router';
import { Check, Crown, Zap } from 'lucide-vue-next';
import CtaBanner from '@/components/marketing/CtaBanner.vue';
import { useLocalizedPageSeo } from '@/composables/useLocalizedPageSeo';
import { useI18n } from '@/composables/useI18n';
import { useClientConfigStore } from '@/stores/clientConfig';

const clientConfig = useClientConfigStore();
const { t, tm } = useI18n();
const docPrice = clientConfig.pricing?.free_per_document_formatted ?? '$0.99';
const proPrice = clientConfig.pricing?.pro_monthly_formatted ?? '$5.99';

useLocalizedPageSeo({
  titleKey: 'pricing.seo.title',
  descriptionKey: 'pricing.seo.description',
  path: '/precios',
});
</script>

<template>
  <div class="page-shell py-10 sm:py-14 max-w-4xl mx-auto">
      <header class="text-center mb-12">
        <h1 class="font-display text-3xl sm:text-4xl text-ink mb-4">{{ t('pricing.title') }}</h1>
        <p class="text-ink-muted max-w-xl mx-auto">{{ t('pricing.subtitle') }}</p>
      </header>

      <div class="grid md:grid-cols-2 gap-6 mb-12">
        <article class="rounded-2xl border border-line bg-surface/40 p-8 flex flex-col">
          <div class="flex items-center gap-2 mb-2">
            <Zap class="w-5 h-5 text-flow" />
            <h2 class="font-display text-xl">{{ t('common.plans.free') }}</h2>
          </div>
          <p class="text-3xl font-display text-ink mb-1">{{ docPrice }}</p>
          <p class="text-sm text-ink-muted mb-6">{{ t('common.plans.perDocument') }}</p>
          <ul class="space-y-3 text-sm text-ink-secondary flex-1 mb-8">
            <li v-for="(item, i) in tm('pricing.freeBullets')" :key="i" class="flex gap-2">
              <Check class="w-4 h-4 text-accent shrink-0 mt-0.5" /> {{ item }}
            </li>
          </ul>
          <RouterLink to="/register" class="btn-ghost w-full justify-center inline-flex">
            {{ t('pricing.registerFree') }}
          </RouterLink>
        </article>

        <article class="rounded-2xl border-2 border-accent bg-accent/5 p-8 flex flex-col relative">
          <span class="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-wide bg-accent text-cream px-3 py-1 rounded-full">
            {{ t('common.actions.mostPopular') }}
          </span>
          <div class="flex items-center gap-2 mb-2">
            <Crown class="w-5 h-5 text-accent" />
            <h2 class="font-display text-xl">{{ t('common.plans.pro') }}</h2>
          </div>
          <p class="text-3xl font-display text-ink mb-1">{{ proPrice }}</p>
          <p class="text-sm text-ink-muted mb-6">{{ t('common.plans.monthlySubscription') }}</p>
          <ul class="space-y-3 text-sm text-ink-secondary flex-1 mb-8">
            <li v-for="(item, i) in tm('pricing.proBullets')" :key="i" class="flex gap-2">
              <Check class="w-4 h-4 text-accent shrink-0 mt-0.5" /> {{ item }}
            </li>
          </ul>
          <RouterLink to="/apa-generator" class="btn-primary w-full justify-center inline-flex">
            {{ t('pricing.upgradeInGenerator') }}
          </RouterLink>
        </article>
      </div>

      <CtaBanner
        :title="t('pricing.ctaTitle')"
        :text="t('pricing.ctaText')"
        :button-label="t('common.actions.goToGenerator')"
      />
    </div>
</template>
