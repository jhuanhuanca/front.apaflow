<script setup>
import AdSlot from '@/components/ads/AdSlot.vue';

defineProps({
  location: { type: String, required: true },
  label: { type: String, default: '' },
  compact: { type: Boolean, default: false },
});
</script>

<template>
  <AdSlot :location="location" format="banner" :label="label" :compact="compact" />
</template>
