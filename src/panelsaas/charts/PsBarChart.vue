<script setup>
/**
 * Gráfico de barras ligero sin dependencias (preparado para sustituir por Chart.js / vue-chartjs).
 */
const props = defineProps({
  title: { type: String, default: '' },
  /** @type {{ label: string, value: number, max?: number }[]} */
  series: { type: Array, default: () => [] },
});

function barWidth(s) {
  const vals = props.series.map((x) => Number(x.value) || 0);
  const max = Math.max(1, ...vals, s.max || 0);
  return `${Math.min(100, ((Number(s.value) || 0) / max) * 100)}%`;
}
</script>

<template>
  <div class="space-y-3">
    <p v-if="title" class="text-sm text-ink-muted">{{ title }}</p>
    <div v-for="(s, i) in series" :key="i" class="space-y-1">
      <div class="flex justify-between text-xs text-ink-muted">
        <span>{{ s.label }}</span>
        <span>{{ s.value }}</span>
      </div>
      <div class="h-2 rounded-full bg-neutral-100 overflow-hidden">
        <div class="h-full rounded-full bg-accent transition-all" :style="{ width: barWidth(s) }" />
      </div>
    </div>
  </div>
</template>
