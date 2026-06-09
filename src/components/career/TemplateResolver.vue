<script setup>
import { computed } from 'vue';
import { FileStack } from 'lucide-vue-next';

const props = defineProps({
  selection: { type: Object, default: null },
});

const template = computed(() => props.selection?.template);
const settings = computed(() => props.selection?.template_settings ?? null);
const university = computed(() => props.selection?.university);
const career = computed(() => props.selection?.career);

const settingsPreview = computed(() => {
  if (!settings.value || typeof settings.value !== 'object') return [];
  return Object.entries(settings.value).slice(0, 8);
});
</script>

<template>
  <section v-if="selection" class="rounded-2xl border border-line bg-surface/40 p-6 space-y-4">
    <div class="flex items-start gap-3">
      <div class="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center shrink-0">
        <FileStack class="w-5 h-5 text-ink-secondary" />
      </div>
      <div>
        <h3 class="font-display text-lg text-ink">Resolución de plantilla</h3>
        <p class="text-xs text-ink-muted mt-0.5">
          {{ university?.name }} · {{ career?.name }}
        </p>
      </div>
    </div>

    <div v-if="template" class="rounded-xl border border-line bg-deep/40 p-4 text-sm space-y-2">
      <div class="flex flex-wrap items-center gap-2">
        <span class="font-medium text-ink">{{ template.name }}</span>
        <span class="text-[11px] uppercase tracking-wide px-2 py-0.5 rounded-full border border-line-strong text-ink-muted">
          {{ template.type }}
        </span>
        <span
          class="text-[11px] uppercase tracking-wide px-2 py-0.5 rounded-full border"
          :class="
            template.plan_access === 'pro'
              ? 'border-amber-500/30 text-amber-200 bg-amber-500/10'
              : 'border-emerald-500/30 text-emerald-200 bg-emerald-500/10'
          "
        >
          {{ template.plan_access }}
        </span>
      </div>
      <p class="text-xs text-ink-faint">Versión {{ template.version }}</p>
    </div>

    <div v-else class="text-sm text-amber-200/90 border border-amber-500/20 rounded-xl px-4 py-3 bg-amber-500/5">
      Esta carrera no tiene plantilla activa asignada. Contacta al administrador o elige otra carrera.
    </div>

    <div v-if="settings && Object.keys(settings).length" class="space-y-2">
      <p class="text-xs text-ink-muted uppercase tracking-wide">Settings (JSON)</p>
      <ul class="text-xs text-ink-muted space-y-1 font-mono">
        <li v-for="([k, v], idx) in settingsPreview" :key="idx" class="flex gap-2">
          <span class="text-ink-secondary/80 shrink-0">{{ k }}:</span>
          <span class="truncate">{{ typeof v === 'object' ? JSON.stringify(v) : v }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>
