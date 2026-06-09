<script setup>
defineProps({
  label: { type: String, default: 'Ejemplo' },
});
</script>

<template>
  <div class="rounded-xl border border-line bg-deep/80 p-4 font-mono text-xs sm:text-sm text-ink-secondary overflow-x-auto">
    <p class="text-[10px] uppercase tracking-wider text-ink-faint mb-2">{{ label }}</p>
    <slot />
  </div>
</template>
