<script setup>
import { Building2 } from 'lucide-vue-next';

defineProps({
  universities: { type: Array, default: () => [] },
  selectedId: { type: [Number, String, null], default: null },
  loading: { type: Boolean, default: false },
});

const emit = defineEmits(['select']);

function onSelect(u) {
  emit('select', u.id);
}
</script>

<template>
  <section class="space-y-4">
    <div class="flex items-end justify-between gap-4 flex-wrap">
      <div>
        <h2 class="font-display text-xl text-ink">Universidades</h2>
        <p class="text-sm text-ink-muted">Elige tu institución para ver carreras disponibles según tu plan.</p>
      </div>
      <p v-if="loading" class="text-xs text-ink-faint">Cargando catálogo…</p>
    </div>

    <div
      v-if="!loading && !universities.length"
      class="rounded-2xl border border-line bg-white/[0.03] px-4 py-6 text-sm text-ink-muted text-center"
    >
      No hay universidades activas visibles con tu plan actual.
    </div>

    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <button
        v-for="u in universities"
        :key="u.id"
        type="button"
        class="group text-left rounded-2xl border bg-white/[0.03] p-4 transition card-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-ink"
        :class="
          selectedId === u.id
            ? 'border-ink ring-1 ring-ink/40 bg-neutral-50'
            : 'border-line hover:border-line-strong'
        "
        @click="onSelect(u)"
      >
        <div class="flex items-start gap-3">
          <div
            class="w-14 h-14 rounded-xl border border-line bg-deep/80 flex items-center justify-center overflow-hidden shrink-0"
          >
            <img v-if="u.logo_url" :src="u.logo_url" :alt="u.name" class="w-full h-full object-cover" />
            <Building2 v-else class="w-7 h-7 text-ink-faint" />
          </div>
          <div class="min-w-0 flex-1">
            <p class="font-medium text-ink truncate group-hover:text-ink-secondary transition">{{ u.name }}</p>
            <p class="text-xs text-ink-faint mt-0.5">{{ u.country || '—' }} · {{ u.institution_type }}</p>
            <div class="mt-2 flex flex-wrap gap-1.5">
              <span
                v-if="u.plan_access === 'pro'"
                class="text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-200 border border-amber-500/25"
              >
                Pro
              </span>
              <span
                v-else-if="u.plan_access === 'free'"
                class="text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-200 border border-emerald-500/25"
              >
                Free
              </span>
              <span
                v-else
                class="text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full bg-neutral-100 text-ink-secondary border border-line-strong"
              >
                Free + Pro
              </span>
            </div>
          </div>
        </div>
      </button>
    </div>
  </section>
</template>
