<script setup>
defineProps({
  title: { type: String, default: '' },
});
</script>

<template>
  <section class="rounded-2xl border border-line bg-surface/50 p-6">
    <h2 v-if="title" class="font-display text-lg mb-4 text-ink">{{ title }}</h2>
    <slot />
  </section>
</template>
