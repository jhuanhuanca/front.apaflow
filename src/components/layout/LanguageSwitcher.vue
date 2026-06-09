<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useI18n } from '@/composables/useI18n';
import { ChevronDown } from 'lucide-vue-next';

defineProps({
  variant: {
    type: String,
    default: 'pill',
    validator: (v) => ['pill', 'topbar'].includes(v),
  },
});

const { locale, setLocale, t } = useI18n();
const open = ref(false);
const root = ref(null);

function switchTo(next) {
  setLocale(next);
  open.value = false;
}

function onDocumentClick(e) {
  if (!root.value?.contains(e.target)) {
    open.value = false;
  }
}

onMounted(() => document.addEventListener('click', onDocumentClick));
onUnmounted(() => document.removeEventListener('click', onDocumentClick));
</script>

<template>
  <!-- Barra superior oscura (estilo corporate) -->
  <div
    v-if="variant === 'topbar'"
    ref="root"
    class="relative"
  >
    <button
      type="button"
      class="inline-flex items-center gap-1.5 text-xs font-medium text-cream/90 hover:text-cream transition"
      :aria-label="t('nav.topbar.language')"
      :aria-expanded="open"
      @click.stop="open = !open"
    >
      <span class="inline-flex h-4 w-5 items-center justify-center rounded-sm bg-white/10 text-[10px] font-bold uppercase">
        {{ locale }}
      </span>
      <span class="uppercase tracking-wide">{{ locale }}</span>
      <ChevronDown class="w-3.5 h-3.5 opacity-80" :class="open ? 'rotate-180' : ''" />
    </button>

    <div
      v-if="open"
      class="absolute right-0 top-full z-50 mt-1 min-w-[7rem] overflow-hidden rounded-lg border border-line bg-white py-1 shadow-lift"
    >
      <button
        type="button"
        class="flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition hover:bg-brand-50"
        :class="locale === 'es' ? 'text-brand font-semibold' : 'text-ink-secondary'"
        @click="switchTo('es')"
      >
        Español
      </button>
      <button
        type="button"
        class="flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition hover:bg-brand-50"
        :class="locale === 'en' ? 'text-brand font-semibold' : 'text-ink-secondary'"
        @click="switchTo('en')"
      >
        English
      </button>
    </div>
  </div>

  <!-- Variante compacta (login, móvil, panel) -->
  <div
    v-else
    class="inline-flex items-center rounded-full border border-line bg-white/80 p-0.5 text-xs font-medium"
    role="group"
    :aria-label="t('nav.topbar.language')"
  >
    <button
      type="button"
      class="px-2.5 py-1 rounded-full transition"
      :class="locale === 'es' ? 'bg-brand text-cream shadow-sm' : 'text-ink-muted hover:text-brand'"
      @click="switchTo('es')"
    >
      ES
    </button>
    <button
      type="button"
      class="px-2.5 py-1 rounded-full transition"
      :class="locale === 'en' ? 'bg-brand text-cream shadow-sm' : 'text-ink-muted hover:text-brand'"
      @click="switchTo('en')"
    >
      EN
    </button>
  </div>
</template>
