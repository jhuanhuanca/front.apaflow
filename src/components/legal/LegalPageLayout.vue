<script setup>
import { computed } from 'vue';
import { useI18n } from '@/composables/useI18n';

const props = defineProps({
  title: { type: String, required: true },
  lastUpdated: { type: String, required: true },
  intro: { type: String, default: '' },
  sections: { type: Array, default: () => [] },
});

const { t } = useI18n();

const lastUpdatedLabel = computed(() => t('legal.common.lastUpdated'));
</script>

<template>
  <article class="page-shell max-w-3xl mx-auto py-10 sm:py-14">
    <header class="mb-8 sm:mb-10">
      <p class="text-xs uppercase tracking-wider text-accent font-medium mb-2">
        {{ t('legal.common.badge') }}
      </p>
      <h1 class="font-display text-3xl sm:text-4xl text-ink mb-3">{{ title }}</h1>
      <p class="text-sm text-ink-muted">
        {{ lastUpdatedLabel }}: {{ lastUpdated }}
      </p>
      <p v-if="intro" class="mt-4 text-ink-secondary leading-relaxed">{{ intro }}</p>
    </header>

    <div class="space-y-8 text-sm sm:text-[0.9375rem] text-ink-secondary leading-relaxed">
      <section
        v-for="(section, index) in sections"
        :key="index"
        class="scroll-mt-28"
      >
        <h2 class="font-display text-lg sm:text-xl text-ink mb-3">{{ section.title }}</h2>

        <p
          v-for="(paragraph, pIndex) in section.paragraphs || []"
          :key="`p-${pIndex}`"
          class="mb-3"
        >
          {{ paragraph }}
        </p>

        <ul
          v-if="section.list?.length"
          class="list-disc pl-5 space-y-2 mb-3"
        >
          <li v-for="(item, lIndex) in section.list" :key="`l-${lIndex}`">{{ item }}</li>
        </ul>

        <p
          v-for="(paragraph, aIndex) in section.paragraphsAfterList || []"
          :key="`a-${aIndex}`"
          class="mb-3"
        >
          {{ paragraph }}
        </p>

        <div
          v-for="(subsection, sIndex) in section.subsections || []"
          :key="`s-${sIndex}`"
          class="mt-4 ml-0 sm:ml-2"
        >
          <h3 v-if="subsection.title" class="font-semibold text-ink mb-2">{{ subsection.title }}</h3>
          <p
            v-for="(paragraph, spIndex) in subsection.paragraphs || []"
            :key="`sp-${spIndex}`"
            class="mb-2"
          >
            {{ paragraph }}
          </p>
          <ul v-if="subsection.list?.length" class="list-disc pl-5 space-y-2">
            <li v-for="(item, slIndex) in subsection.list" :key="`sl-${slIndex}`">{{ item }}</li>
          </ul>
        </div>
      </section>
    </div>
  </article>
</template>
