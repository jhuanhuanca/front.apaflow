<script setup>
import { GraduationCap, Lock } from 'lucide-vue-next';

const props = defineProps({
  careers: { type: Array, default: () => [] },
  selectedCareerId: { type: [Number, null], default: null },
  loading: { type: Boolean, default: false },
  selecting: { type: Boolean, default: false },
  isProUser: { type: Boolean, default: false },
});

const emit = defineEmits(['select']);

function badgeFor(planAccess) {
  if (planAccess === 'pro') {
    return { label: 'PRO', class: 'bg-amber-500/15 text-amber-200 border-amber-500/25' };
  }
  if (planAccess === 'free') {
    return { label: 'FREE', class: 'bg-emerald-500/15 text-emerald-200 border-emerald-500/25' };
  }
  return { label: 'FREE · PRO', class: 'bg-neutral-100 text-ink-secondary border-line-strong' };
}

function locked(c) {
  return c?.plan_access === 'pro' && !props.isProUser;
}

function onPick(c) {
  emit('select', c);
}
</script>

<template>
  <section class="space-y-4">
    <div class="flex items-end justify-between gap-4 flex-wrap">
      <div>
        <h2 class="font-display text-xl text-ink">Carreras</h2>
        <p class="text-sm text-ink-muted">Un clic aplica universidad, carrera y plantilla asociada.</p>
      </div>
      <p v-if="loading" class="text-xs text-ink-faint">Cargando carreras…</p>
    </div>

    <div
      v-if="!loading && !careers.length"
      class="rounded-2xl border border-dashed border-line-strong bg-white/[0.02] px-4 py-8 text-center text-sm text-ink-muted"
    >
      Selecciona una universidad para listar carreras.
    </div>

    <div class="grid sm:grid-cols-2 xl:grid-cols-3 gap-3">
      <button
        v-for="c in careers"
        :key="c.id"
        type="button"
        class="relative flex items-center gap-3 rounded-2xl border px-4 py-3 text-left transition card-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-ink disabled:opacity-60"
        :class="
          selectedCareerId === c.id
            ? 'border-accent/70 bg-neutral-50 ring-1 ring-ink/20'
            : locked(c)
              ? 'border-line bg-white/[0.02] hover:border-amber-500/30'
              : 'border-line bg-white/[0.04] hover:border-accent/35'
        "
        :disabled="selecting"
        @click="onPick(c)"
      >
        <div
          class="w-12 h-12 rounded-xl border border-line bg-deep/80 flex items-center justify-center overflow-hidden shrink-0"
        >
          <img v-if="c.logo_url" :src="c.logo_url" :alt="c.name" class="w-full h-full object-cover" />
          <GraduationCap v-else class="w-6 h-6 text-ink-faint" />
        </div>
        <div class="min-w-0 flex-1">
          <p class="text-sm font-medium text-ink truncate">{{ c.name }}</p>
          <p v-if="c.category" class="text-[11px] text-ink-faint truncate">{{ c.category }}</p>
          <span
            class="inline-block mt-1.5 text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full border"
            :class="badgeFor(c.plan_access).class"
          >
            {{ badgeFor(c.plan_access).label }}
          </span>
        </div>
        <Lock v-if="locked(c)" class="w-4 h-4 text-amber-300/80 shrink-0" />
      </button>
    </div>
  </section>
</template>
