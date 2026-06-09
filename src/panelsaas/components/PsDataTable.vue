<script setup>
defineProps({
  columns: { type: Array, default: () => [] },
  rows: { type: Array, default: () => [] },
  loading: { type: Boolean, default: false },
});
</script>

<template>
  <div class="overflow-x-auto rounded-xl border border-line">
    <table class="min-w-full text-left text-sm text-ink-secondary">
      <thead class="bg-neutral-50 text-ink-muted uppercase text-xs tracking-wide">
        <tr>
          <th v-for="col in columns" :key="col.key" class="px-4 py-3 font-medium">{{ col.label }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="loading">
          <td :colspan="columns.length || 1" class="px-4 py-8 text-center text-ink-faint">Cargando…</td>
        </tr>
        <tr v-else-if="!rows.length">
          <td :colspan="columns.length || 1" class="px-4 py-8 text-center text-ink-faint">Sin datos</td>
        </tr>
        <tr v-for="(row, i) in rows" :key="i" class="border-t border-line hover:bg-white/[0.02]">
          <td v-for="col in columns" :key="col.key" class="px-4 py-3">
            <slot :name="`cell-${col.key}`" :row="row" :value="row[col.key]">
              {{ row[col.key] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
