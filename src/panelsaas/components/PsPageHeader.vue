<script setup>
defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
});
</script>

<template>
  <header class="mb-6 sm:mb-8">
    <h1 class="font-display text-2xl sm:text-3xl text-ink">{{ title }}</h1>
    <p v-if="subtitle" class="text-ink-muted text-sm mt-1">{{ subtitle }}</p>
    <div v-if="$slots.actions" class="mt-4 flex flex-wrap gap-2">
      <slot name="actions" />
    </div>
  </header>
</template>
