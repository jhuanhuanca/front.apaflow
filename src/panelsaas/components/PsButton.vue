<script setup>
defineProps({
  variant: { type: String, default: 'primary' },
  type: { type: String, default: 'button' },
  disabled: { type: Boolean, default: false },
});
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    class="inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition disabled:opacity-50"
    :class="
      variant === 'ghost'
        ? 'bg-neutral-100 text-ink hover:bg-neutral-100'
        : 'bg-accent text-cream hover:bg-brand-dark'
    "
  >
    <slot />
  </button>
</template>
