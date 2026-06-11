<script setup>
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import {
  ArrowRight,
  BookOpen,
  Check,
  Sparkles,
  Upload,
  Wand2,
  Download,
  Zap,
  Crown,
} from 'lucide-vue-next';
import FaqAccordion from '@/components/marketing/FaqAccordion.vue';
import CtaBanner from '@/components/marketing/CtaBanner.vue';
import DemoVideoPlayer from '@/components/site/DemoVideoPlayer.vue';
import {
  localizedFaqJsonLd,
  localizedSoftwareJsonLd,
  useLocalizedPageSeo,
} from '@/composables/useLocalizedPageSeo';
import { useI18n } from '@/composables/useI18n';
import { useClientConfigStore } from '@/stores/clientConfig';

const clientConfig = useClientConfigStore();
const { t, tm, locale } = useI18n();

const docPrice = computed(() => clientConfig.pricing?.free_per_document_formatted ?? '$0.99');
const proPrice = computed(() => clientConfig.pricing?.pro_monthly_formatted ?? '$5.99');

const homeFaq = computed(() => {
  locale.value;
  return tm('home.faq.items');
});
const homeFeatures = computed(() => {
  locale.value;
  return tm('home.benefits.items');
});
const homeSteps = computed(() => {
  locale.value;
  return tm('home.steps.items');
});
const homeTestimonials = computed(() => {
  locale.value;
  return tm('home.testimonials.items');
});

useLocalizedPageSeo({
  titleKey: 'home.seo.title',
  descriptionKey: 'common.seo.siteDescription',
  path: '/',
  jsonLd: () => ({
    '@context': 'https://schema.org',
    '@graph': [
      localizedSoftwareJsonLd(t('common.seo.siteDescription')),
      localizedFaqJsonLd(homeFaq.value),
    ],
  }),
});
</script>

<template>
  <div>
    <section class="relative overflow-hidden">
      <div class="absolute inset-0 bg-hero-glow pointer-events-none" aria-hidden="true" />
      <div class="page-shell relative pt-6 sm:pt-10 pb-14 sm:pb-18">
        <div class="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div>
            <p class="badge-soft mb-5">
              <Sparkles class="w-4 h-4 text-flow" />
              {{ t('home.hero.badge') }}
            </p>
            <h1 class="font-display text-3xl sm:text-4xl md:text-[2.75rem] text-ink leading-tight mb-5">
              {{ t('home.hero.title') }}
              <span class="brand-gradient-text">{{ t('home.hero.titleHighlight') }}</span>
            </h1>
            <p class="text-ink-secondary text-base sm:text-lg leading-relaxed mb-8 max-w-xl">
              {{ t('home.hero.subtitle') }}
            </p>
            <div class="flex flex-wrap gap-3">
              <RouterLink to="/guia-apa-7" class="btn-ghost inline-flex items-center gap-2">
                <BookOpen class="w-4 h-4 text-flow" />
                {{ t('home.hero.exploreGuide') }}
              </RouterLink>
              <RouterLink to="/apa-generator" class="btn-primary inline-flex items-center gap-2">
                {{ t('home.hero.generatorCta') }}
                <ArrowRight class="w-4 h-4" />
              </RouterLink>
            </div>
          </div>
          <div class="section-panel p-2 sm:p-3 ring-1 ring-flow/10">
            <DemoVideoPlayer />
          </div>
        </div>
      </div>
    </section>

    <section class="bg-section-brand border-y border-brand-100/60 py-14 sm:py-16">
      <div class="page-shell max-w-3xl">
        <h2 class="font-display text-2xl sm:text-3xl text-ink mb-4">{{ t('home.whatIs.title') }}</h2>
        <p class="text-ink-muted leading-relaxed mb-4">{{ t('home.whatIs.p1') }}</p>
        <p class="text-ink-muted leading-relaxed">{{ t('home.whatIs.p2') }}</p>
      </div>
    </section>

    <section id="beneficios" class="page-shell py-14 sm:py-16 scroll-anchor">
      <h2 class="font-display text-2xl sm:text-3xl text-ink mb-8 text-center">{{ t('home.benefits.title') }}</h2>
      <div class="grid sm:grid-cols-2 gap-5">
        <div
          v-for="(f, i) in homeFeatures"
          :key="i"
          class="rounded-3xl border border-line/80 bg-white/70 p-6 card-hover shadow-card"
          :class="i % 2 === 0 ? 'ring-1 ring-brand-100/50' : 'ring-1 ring-flow-100/50'"
        >
          <h3 class="font-display text-lg text-ink mb-2">{{ f.title }}</h3>
          <p class="text-sm text-ink-muted leading-relaxed">{{ f.text }}</p>
        </div>
      </div>
    </section>

    <section id="como-funciona" class="bg-section-flow border-y border-flow-100/60 py-14 sm:py-16 scroll-anchor">
      <div class="page-shell">
        <h2 class="font-display text-2xl sm:text-3xl text-ink mb-10 text-center">{{ t('home.steps.title') }}</h2>
        <div class="grid md:grid-cols-3 gap-6">
          <div
            v-for="(step, i) in homeSteps"
            :key="i"
            class="relative rounded-3xl border border-line/80 bg-white/80 p-6 shadow-card"
          >
            <span class="text-4xl font-display text-accent/20 absolute top-4 right-4">{{ i + 1 }}</span>
            <component :is="[BookOpen, Upload, Download][i]" class="w-8 h-8 text-accent mb-4" />
            <h3 class="font-display text-lg text-ink mb-2">{{ step.title }}</h3>
            <p class="text-sm text-ink-muted">{{ step.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="page-shell py-14 sm:py-16">
      <div class="grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <h2 class="font-display text-2xl sm:text-3xl text-ink mb-4">{{ t('home.manual.title') }}</h2>
          <ul class="space-y-3 text-ink-muted">
            <li v-for="(item, i) in tm('home.manual.bullets')" :key="i" class="flex gap-3">
              <Check class="w-5 h-5 text-accent shrink-0 mt-0.5" /> {{ item }}
            </li>
          </ul>
        </div>
        <div class="rounded-2xl border border-line bg-surface/50 p-6 space-y-4">
          <div class="flex items-center gap-3 text-ink-secondary">
            <Wand2 class="w-6 h-6 text-flow" />
            <p class="text-sm">{{ t('home.manual.note') }}</p>
          </div>
          <RouterLink to="/apa-generator" class="btn-primary w-full justify-center inline-flex">
            {{ t('common.actions.tryGenerator') }}
          </RouterLink>
        </div>
      </div>
    </section>

    <section id="planes" class="bg-section-brand border-y border-brand-100/60 py-14 sm:py-16 scroll-anchor">
      <div class="page-shell">
        <h2 class="font-display text-2xl sm:text-3xl text-ink mb-3 text-center">{{ t('home.pricing.title') }}</h2>
        <p class="text-center text-ink-muted mb-10 max-w-lg mx-auto">{{ t('home.pricing.subtitle') }}</p>
        <div class="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <div class="rounded-3xl border border-line/80 bg-white/80 p-6 sm:p-8 shadow-card">
            <div class="flex items-center gap-2 mb-4">
              <Zap class="w-5 h-5 text-flow" />
              <h3 class="font-display text-xl">{{ t('common.plans.planFree') }}</h3>
            </div>
            <ul class="space-y-2 text-sm text-ink-muted mb-6">
              <li v-for="(item, i) in tm('home.pricing.freeBullets')" :key="i" class="flex gap-2">
                <Check class="w-4 h-4 text-accent shrink-0" />
                {{ String(item).includes('{price}') ? String(item).replace('{price}', docPrice) : item }}
              </li>
            </ul>
            <RouterLink to="/register" class="btn-ghost w-full justify-center inline-flex">
              {{ t('home.pricing.createFree') }}
            </RouterLink>
          </div>
          <div class="rounded-3xl border-2 border-brand/30 bg-gradient-to-br from-brand-50 to-flow-50 p-6 sm:p-8 relative shadow-lift">
            <span class="absolute -top-3 right-6 text-[10px] uppercase tracking-wide bg-accent text-cream px-2 py-0.5 rounded-full">
              {{ t('common.actions.recommended') }}
            </span>
            <div class="flex items-center gap-2 mb-4">
              <Crown class="w-5 h-5 text-accent" />
              <h3 class="font-display text-xl">{{ t('common.plans.planPro') }}</h3>
            </div>
            <p class="text-2xl font-display text-ink mb-4">
              {{ proPrice }}<span class="text-sm text-ink-muted font-sans">{{ t('common.plans.perMonth') }}</span>
            </p>
            <ul class="space-y-2 text-sm text-ink-muted mb-6">
              <li v-for="(item, i) in tm('home.pricing.proBullets')" :key="i" class="flex gap-2">
                <Check class="w-4 h-4 text-accent shrink-0" /> {{ item }}
              </li>
            </ul>
            <RouterLink to="/precios" class="btn-primary w-full justify-center inline-flex">
              {{ t('home.pricing.viewPricing') }}
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <section class="page-shell py-14 sm:py-16">
      <h2 class="font-display text-2xl sm:text-3xl text-ink mb-8 text-center">{{ t('home.testimonials.title') }}</h2>
      <div class="grid md:grid-cols-3 gap-5">
        <blockquote
          v-for="item in homeTestimonials"
          :key="item.name"
          class="rounded-2xl border border-line bg-surface/40 p-6"
        >
          <p class="text-sm text-ink-secondary leading-relaxed mb-4">"{{ item.text }}"</p>
          <footer class="text-xs">
            <strong class="text-ink">{{ item.name }}</strong>
            <span class="text-ink-faint block mt-0.5">{{ item.role }}</span>
          </footer>
        </blockquote>
      </div>
    </section>

    <section id="faq" class="bg-section-flow border-y border-flow-100/60 py-14 sm:py-16 scroll-anchor">
      <div class="page-shell max-w-2xl">
        <h2 class="font-display text-2xl sm:text-3xl text-ink mb-8 text-center">{{ t('home.faq.title') }}</h2>
        <FaqAccordion :items="homeFaq" />
      </div>
    </section>

    <section class="page-shell py-14 sm:py-20">
      <CtaBanner
        :title="t('home.cta.title')"
        :text="t('home.cta.text')"
        :button-label="t('home.cta.button')"
      />
    </section>
  </div>
</template>
