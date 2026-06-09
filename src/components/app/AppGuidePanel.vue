<script setup>
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { useI18n } from '@/composables/useI18n';
import ApaGuideArticle from '@/components/app/ApaGuideArticle.vue';

const props = defineProps({
  guideKey: { type: String, required: true },
});

const { tm, locale } = useI18n();
const guide = computed(() => {
  locale.value;
  return tm(`app.${props.guideKey}`) || {};
});
const sections = computed(() => Object.entries(guide.value.sections || {}));
</script>

<template>
  <ApaGuideArticle :title="guide.title" :subtitle="guide.subtitle">
    <section
      v-for="[id, section] in sections"
      :key="`${locale}-${id}`"
      class="rounded-2xl border border-line bg-surface/40 p-4 sm:p-6 space-y-4"
    >
      <h2 class="font-display text-lg text-ink">{{ section.title }}</h2>
      <ul class="list-disc pl-5 space-y-2 text-ink-secondary">
        <li v-for="(item, idx) in section.content" :key="idx">{{ item }}</li>
      </ul>
    </section>

    <section v-if="guide.footer" class="rounded-2xl border border-accent/20 bg-accent/5 p-6">
      <p class="text-ink-secondary">
        {{ guide.footer }}
        <RouterLink v-if="guide.footerLink" to="/apa-generator" class="text-accent hover:underline">
          {{ guide.footerLink }}
        </RouterLink>
      </p>
    </section>
  </ApaGuideArticle>
</template>
