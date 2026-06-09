<script setup>
import { computed } from 'vue';
import LegalPageLayout from '@/components/legal/LegalPageLayout.vue';
import { useI18n } from '@/composables/useI18n';
import { useLocalizedPageSeo } from '@/composables/useLocalizedPageSeo';

const props = defineProps({
  documentKey: { type: String, required: true },
  path: { type: String, required: true },
});

const { tm, locale } = useI18n();

const doc = computed(() => {
  locale.value;
  return tm(`legal.${props.documentKey}`) || {};
});

useLocalizedPageSeo({
  titleKey: `legal.${props.documentKey}.seo.title`,
  descriptionKey: `legal.${props.documentKey}.seo.description`,
  path: props.path,
});
</script>

<template>
  <LegalPageLayout
      :title="doc.title || ''"
      :last-updated="doc.lastUpdated || ''"
      :intro="doc.intro || ''"
      :sections="doc.sections || []"
    />
</template>
