<script setup>
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { ArrowRight } from 'lucide-vue-next';
import { useI18n } from '@/composables/useI18n';

const props = defineProps({
  title: { type: String, required: true },
  text: { type: String, default: '' },
  buttonLabel: { type: String, default: '' },
  to: { type: String, default: '/apa-generator' },
});

const { t } = useI18n();

const resolvedButtonLabel = computed(
  () => props.buttonLabel || t('common.actions.useGeneratorFree'),
);
</script>

<template>
  <section
    class="rounded-[2rem] border border-brand-200/50 p-8 sm:p-12 text-center shadow-lift overflow-hidden relative"
    style="background: linear-gradient(135deg, #eef4ff 0%, #ffffff 45%, #ecfeff 100%)"
  >
    <div
      class="absolute -top-20 -right-20 w-56 h-56 rounded-full bg-flow/10 blur-3xl pointer-events-none"
      aria-hidden="true"
    />
    <div
      class="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-brand/10 blur-3xl pointer-events-none"
      aria-hidden="true"
    />
    <div class="relative">
      <h2 class="font-display text-2xl sm:text-3xl text-ink mb-3">{{ title }}</h2>
      <p v-if="text" class="text-ink-muted max-w-xl mx-auto mb-6">{{ text }}</p>
      <RouterLink :to="to" class="btn-primary inline-flex items-center gap-2">
        {{ resolvedButtonLabel }}
        <ArrowRight class="w-4 h-4" />
      </RouterLink>
    </div>
  </section>
</template>
