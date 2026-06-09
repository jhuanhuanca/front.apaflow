<script setup>
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { BRAND } from '@/constants/brand';

const props = defineProps({
  static: { type: Boolean, default: false },
  size: { type: String, default: 'md' },
  to: { type: [String, Object], default: '/' },
});

/**
 * Logo horizontal: escalamos por altura (w-auto) para que icono + texto + eslogan
 * crezcan proporcionalmente y se lean bien en la barra.
 */
const sizeClasses = {
  sm: 'h-11 sm:h-12 w-auto',
  md: 'h-12 sm:h-14 w-auto',
  lg: 'h-14 sm:h-16 md:h-[4.25rem] w-auto',
  xl: 'h-16 sm:h-[4.5rem] md:h-20 w-auto',
  /** Barra principal — logo legible */
  nav: 'h-12 sm:h-14 md:h-16 lg:h-[4.5rem] w-auto max-w-[min(100%,14rem)] sm:max-w-none',
  hero: 'h-20 sm:h-24 md:h-28 lg:h-32 w-auto',
};

const imgClass = computed(() => sizeClasses[props.size] || sizeClasses.md);
</script>

<template>
  <component
    :is="static || !to ? 'div' : RouterLink"
    :to="static || !to ? undefined : to"
    class="inline-flex items-center shrink-0"
  >
    <img
      :src="BRAND.logo"
      :alt="BRAND.logoAlt"
      class="object-contain object-left block"
      :class="imgClass"
      decoding="async"
    />
  </component>
</template>
