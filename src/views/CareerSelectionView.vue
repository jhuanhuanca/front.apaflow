<script setup>
import { onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import { ArrowLeft, Loader2 } from 'lucide-vue-next';
import { storeToRefs } from 'pinia';
import UniversitySelector from '@/components/career/UniversitySelector.vue';
import CareerSelector from '@/components/career/CareerSelector.vue';
import TemplateResolver from '@/components/career/TemplateResolver.vue';
import UpgradeModal from '@/components/career/UpgradeModal.vue';
import { useCareerSelectionStore } from '@/stores/careerSelection';

const store = useCareerSelectionStore();
const {
  universities,
  careers,
  selectedUniversityId,
  selection,
  loadingUniversities,
  loadingCareers,
  selectingCareer,
  upgradeModalOpen,
  error,
  isProUser,
} = storeToRefs(store);

onMounted(async () => {
  store.hydrateFromStorage();
  await store.fetchUniversities();
  if (selectedUniversityId.value) {
    await store.loadCareersForUniversity(selectedUniversityId.value, { resetSelection: false });
    await store.refreshSelectionFromServer();
  }
});

async function onUniversity(id) {
  await store.loadCareersForUniversity(id, { resetSelection: true });
}

function onCareer(c) {
  store.selectCareer(c);
}
</script>

<template>
  <div class="min-h-full bg-midnight text-ink">
    <nav class="border-b border-line bg-midnight/80 backdrop-blur-md">
      <div class="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
        <div class="flex items-center gap-3 min-w-0">
          <RouterLink
            to="/app"
            class="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-ink shrink-0"
          >
            <ArrowLeft class="w-4 h-4" />
            Panel
          </RouterLink>
          <div class="h-4 w-px bg-neutral-100 hidden sm:block" />
          <div class="min-w-0">
            <p class="font-display text-lg leading-none truncate">Selecciona tu carrera</p>
            <p class="text-xs text-ink-faint truncate">Catálogo multi-universidad · control Free / Pro en servidor</p>
          </div>
        </div>
        <RouterLink to="/" class="text-sm text-ink-muted hover:text-ink hidden sm:inline">Sitio</RouterLink>
      </div>
    </nav>

    <main class="max-w-6xl mx-auto px-6 py-10 space-y-10">
      <header class="space-y-2">
        <h1 class="font-display text-3xl sm:text-4xl">Elige universidad y carrera</h1>
        <p class="text-ink-muted text-sm max-w-2xl">
          La selección confirma en backend acceso por plan y devuelve universidad, carrera, plantilla y settings listos
          para el motor de documentos.
        </p>
      </header>

      <div v-if="error" class="rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm text-red-100">
        {{ error }}
      </div>

      <div v-if="loadingUniversities && !universities.length" class="flex items-center gap-2 text-sm text-ink-muted">
        <Loader2 class="w-4 h-4 animate-spin" />
        Cargando universidades…
      </div>

      <UniversitySelector
        :universities="universities"
        :selected-id="selectedUniversityId"
        :loading="loadingUniversities"
        @select="onUniversity"
      />

      <CareerSelector
        v-if="selectedUniversityId"
        :careers="careers"
        :selected-career-id="selection?.career?.id ?? null"
        :loading="loadingCareers"
        :selecting="selectingCareer"
        :is-pro-user="isProUser"
        @select="onCareer"
      />

      <TemplateResolver :selection="selection" />

      <div class="flex flex-wrap gap-3">
        <button
          type="button"
          class="text-xs text-ink-muted hover:text-ink underline-offset-2 hover:underline"
          @click="store.clearSelection()"
        >
          Limpiar selección guardada
        </button>
      </div>
    </main>

    <UpgradeModal :open="upgradeModalOpen" @close="store.closeUpgradeModal()" />
  </div>
</template>
