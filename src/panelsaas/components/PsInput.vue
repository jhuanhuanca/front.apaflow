<script setup>
const model = defineModel({ type: String, default: '' });

defineProps({
  label: { type: String, default: '' },
  id: { type: String, required: true },
  type: { type: String, default: 'text' },
  autocomplete: { type: String, default: 'off' },
});
</script>

<template>
  <div>
    <label v-if="label" :for="id" class="block text-sm text-ink-muted mb-1.5">{{ label }}</label>
    <input
      :id="id"
      v-model="model"
      :type="type"
      :autocomplete="autocomplete"
      class="w-full bg-deep border border-line rounded-xl px-4 py-3 text-sm text-ink placeholder:text-ink-faint"
    />
  </div>
</template>
