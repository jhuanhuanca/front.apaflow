<script setup>
import { ref } from 'vue';
import { ChevronDown } from 'lucide-vue-next';

defineProps({
  items: { type: Array, required: true },
});

const open = ref({});

function toggle(id) {
  open.value = { ...open.value, [id]: !open.value[id] };
}
</script>

<template>
  <div class="space-y-3">
    <div
      v-for="item in items"
      :key="item.id"
      class="rounded-3xl border border-line/80 bg-white/75 overflow-hidden shadow-card"
    >
      <button
        type="button"
        class="w-full flex items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium text-ink hover:bg-deep/50 transition"
        @click="toggle(item.id)"
      >
        {{ item.q }}
        <ChevronDown
          class="w-5 h-5 shrink-0 text-ink-muted transition-transform"
          :class="{ 'rotate-180': open[item.id] }"
        />
      </button>
      <div v-show="open[item.id]" class="px-5 pb-4 text-sm text-ink-muted leading-relaxed border-t border-line pt-3">
        {{ item.a }}
      </div>
    </div>
  </div>
</template>
