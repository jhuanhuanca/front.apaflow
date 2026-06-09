<script setup>
import { watch } from 'vue';
import { X } from 'lucide-vue-next';

const props = defineProps({
  open: { type: Boolean, default: false },
  title: { type: String, default: 'Menú' },
});

const emit = defineEmits(['close']);

watch(
  () => props.open,
  (isOpen) => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
  },
);
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="open"
        class="fixed inset-0 z-[100] bg-ink/40 backdrop-blur-sm lg:hidden"
        aria-hidden="true"
        @click="emit('close')"
      />
    </Transition>
    <Transition name="slide-panel">
      <aside
        v-if="open"
        class="fixed top-0 right-0 z-[101] h-full w-[min(100vw,20rem)] bg-midnight border-l border-line shadow-lift flex flex-col lg:hidden"
        role="dialog"
        aria-modal="true"
        :aria-label="title"
      >
        <div class="flex items-center justify-between px-4 py-4 border-b border-line">
          <p class="font-semibold text-sm">{{ title }}</p>
          <button
            type="button"
            class="p-2 rounded-lg hover:bg-deep text-ink-muted"
            aria-label="Cerrar menú"
            @click="emit('close')"
          >
            <X class="w-5 h-5" />
          </button>
        </div>
        <nav class="flex-1 overflow-y-auto p-4 space-y-1">
          <slot />
        </nav>
        <div v-if="$slots.footer" class="p-4 border-t border-line">
          <slot name="footer" />
        </div>
      </aside>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.slide-panel-enter-active,
.slide-panel-leave-active {
  transition: transform 0.25s ease;
}
.slide-panel-enter-from,
.slide-panel-leave-to {
  transform: translateX(100%);
}
</style>
