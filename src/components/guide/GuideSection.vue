<script setup>
defineProps({
  title: { type: String, required: true },
  id: { type: String, default: '' },
});
</script>

<template>
  <section :id="id" class="rounded-3xl border border-line/80 bg-white/70 p-5 sm:p-6 space-y-4 scroll-anchor shadow-card">
    <h2 class="font-display text-lg sm:text-xl text-ink">{{ title }}</h2>
    <slot />
  </section>
</template>
