<script setup>
import AdSlot from '@/components/ads/AdSlot.vue';
import { AD_LOCATIONS } from '@/constants/ads';

defineProps({
  location: { type: String, default: AD_LOCATIONS.GUIDE_INLINE },
  label: { type: String, default: '' },
});
</script>

<template>
  <AdSlot :location="location" format="inline" :label="label" />
</template>
