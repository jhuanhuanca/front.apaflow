<script setup>
import { computed } from 'vue';
import { useI18n } from '@/composables/useI18n';
import {
  localizedArticleJsonLd,
  useLocalizedPageSeo,
} from '@/composables/useLocalizedPageSeo';
import GuideArticleLayout from '@/components/guide/GuideArticleLayout.vue';
import GuideSection from '@/components/guide/GuideSection.vue';
import GuideExample from '@/components/guide/GuideExample.vue';

const props = defineProps({
  guideKey: { type: String, required: true },
});

const { tm, t, locale } = useI18n();

const guide = computed(() => {
  locale.value;
  return tm(`guides.${props.guideKey}`) || {};
});

const seoPath = computed(() => {
  const paths = {
    apa7: '/guia-apa-7',
    portada: '/portada-apa',
    citas: '/citas-apa',
    referencias: '/referencias-apa',
    tablas: '/tablas-figuras',
    ejemplos: '/ejemplos-apa',
  };
  return paths[props.guideKey] || '/';
});

useLocalizedPageSeo({
  titleKey: `guides.${props.guideKey}.seo.title`,
  descriptionKey: `guides.${props.guideKey}.seo.description`,
  path: seoPath.value,
  jsonLd: () =>
    localizedArticleJsonLd({
      title: guide.value.seo?.title || '',
      description: guide.value.seo?.description || '',
      path: seoPath.value,
    }),
});

const sections = computed(() => Object.entries(guide.value.sections || {}));

function renderAsList(section) {
  if (section.type === 'list' || section.type === 'ordered') return true;
  const items = section.content || [];
  if (items.length < 2) return false;
  return items.every((item) => typeof item === 'string' && item.length < 180);
}

function isOrdered(section) {
  return section.type === 'ordered' || props.guideKey === 'estructura' && section.title?.includes('Estructura');
}
</script>

<template>
  <GuideArticleLayout
      :title="guide.header?.title || ''"
      :subtitle="guide.header?.subtitle || ''"
      :intro="guide.header?.intro || ''"
    >
      <GuideSection
        v-for="[id, section] in sections"
        :id="id"
        :key="`${locale}-${id}`"
        :title="section.title"
      >
        <template v-if="section.type === 'example' || section.exampleLabel">
          <p v-if="section.intro" class="mb-3">{{ section.intro }}</p>
          <GuideExample :label="section.exampleLabel || t('common.actions.example')">
            <p
              v-for="(line, idx) in section.content"
              :key="idx"
              :class="idx < (section.content?.length || 0) - 1 ? 'mb-4' : ''"
            >
              {{ line }}
            </p>
          </GuideExample>
        </template>
        <template v-else-if="renderAsList(section)">
          <component
            :is="isOrdered(section) ? 'ol' : 'ul'"
            :class="isOrdered(section) ? 'list-decimal pl-5 space-y-2' : 'list-disc pl-5 space-y-2'"
          >
            <li v-for="(item, idx) in section.content" :key="idx">{{ item }}</li>
          </component>
          <p v-if="section.note" class="text-ink-muted text-sm mt-3">{{ section.note }}</p>
        </template>
        <template v-else>
          <p v-for="(paragraph, idx) in section.content" :key="idx" :class="idx > 0 ? 'mt-3' : ''">
            {{ paragraph }}
          </p>
          <p v-if="section.note" class="text-ink-muted text-sm mt-3">{{ section.note }}</p>
        </template>
      </GuideSection>
    </GuideArticleLayout>
</template>
