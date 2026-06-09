<script setup>
import { Sparkles, X } from 'lucide-vue-next';
import { RouterLink } from 'vue-router';

defineProps({
  open: { type: Boolean, default: false },
});

const emit = defineEmits(['close']);
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="open"
        class="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
        role="dialog"
        aria-modal="true"
        @click.self="emit('close')"
      >
        <div
          class="relative max-w-md w-full rounded-2xl border border-line bg-midnight shadow-soft p-6 text-ink"
        >
          <button
            type="button"
            class="absolute top-4 right-4 p-1 rounded-lg text-ink-muted hover:text-ink hover:bg-neutral-100"
            aria-label="Cerrar"
            @click="emit('close')"
          >
            <X class="w-5 h-5" />
          </button>
          <div class="w-12 h-12 rounded-xl bg-neutral-100 flex items-center justify-center mb-4">
            <Sparkles class="w-6 h-6 text-ink-secondary" />
          </div>
          <h2 class="font-display text-2xl mb-2">Contenido Pro</h2>
          <p class="text-sm text-ink-muted leading-relaxed mb-6">
            Esta universidad, carrera o plantilla está reservada para suscriptores Pro. Actualiza tu plan para desbloquear
            todo el catálogo y plantillas avanzadas.
          </p>
          <div class="flex flex-col sm:flex-row gap-3">
            <RouterLink
              to="/register"
              class="inline-flex justify-center items-center gap-2 rounded-full bg-accent hover:bg-brand-dark transition px-5 py-2.5 text-sm font-medium"
              @click="emit('close')"
            >
              Actualizar a Pro
            </RouterLink>
            <button
              type="button"
              class="inline-flex justify-center items-center rounded-full border border-line-strong px-5 py-2.5 text-sm text-ink-secondary hover:bg-neutral-50"
              @click="emit('close')"
            >
              Seguir explorando
            </button>
          </div>
        </div>
      </div>
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
</style>
