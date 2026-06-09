import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';
import http from '@/services/api';
import { useAuthStore } from '@/stores/auth';

const LS_KEY = 'careerSelection.v1';

export const useCareerSelectionStore = defineStore('careerSelection', () => {
  const universities = ref([]);
  const universityBanner = ref(null);
  const careers = ref([]);
  const selectedUniversityId = ref(null);
  const selection = ref(null);
  const loadingUniversities = ref(false);
  const loadingCareers = ref(false);
  const selectingCareer = ref(false);
  const upgradeModalOpen = ref(false);
  const error = ref('');

  const isProUser = computed(() => {
    const auth = useAuthStore();
    return Boolean(auth.user?.capabilities?.pro_active ?? auth.user?.capabilities?.unlimited_documents);
  });

  const careerIdForUpload = computed(() => selection.value?.career?.id ?? null);

  const hasSelection = computed(() => Boolean(selection.value?.career?.id));

  function careerIsProOnly(career) {
    return career?.plan_access === 'pro';
  }

  function canSelectCareerClient(career) {
    if (!career) return false;
    if (careerIsProOnly(career) && !isProUser.value) {
      return false;
    }
    return true;
  }

  function readPersisted() {
    try {
      const raw = typeof localStorage !== 'undefined' ? localStorage.getItem(LS_KEY) : null;
      if (!raw) return null;
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  function persist() {
    try {
      const payload = {
        selection: selection.value,
        selectedUniversityId: selectedUniversityId.value,
      };
      localStorage.setItem(LS_KEY, JSON.stringify(payload));
    } catch {
      /* noop */
    }
  }

  watch([selection, selectedUniversityId], persist, { deep: true });

  function hydrateFromStorage() {
    const parsed = readPersisted();
    if (!parsed) return;
    if (parsed.selectedUniversityId) {
      selectedUniversityId.value = parsed.selectedUniversityId;
    }
    if (parsed.selection) {
      selection.value = parsed.selection;
    }
  }

  function clearSelection() {
    universityBanner.value = null;
    careers.value = [];
    selectedUniversityId.value = null;
    selection.value = null;
    error.value = '';
    try {
      localStorage.removeItem(LS_KEY);
    } catch {
      /* noop */
    }
  }

  async function fetchUniversities() {
    loadingUniversities.value = true;
    error.value = '';
    try {
      const { data } = await http.get('/api/universities');
      universities.value = Array.isArray(data.data) ? data.data : [];
    } catch (e) {
      error.value = e?.response?.data?.message || 'No se pudo cargar el catálogo de universidades.';
      universities.value = [];
    } finally {
      loadingUniversities.value = false;
    }
  }

  /**
   * @param {number} id
   * @param {{ resetSelection?: boolean }} options
   */
  async function loadCareersForUniversity(id, options = {}) {
    const { resetSelection = true } = options;
    selectedUniversityId.value = id;
    if (resetSelection) {
      selection.value = null;
    }
    loadingCareers.value = true;
    error.value = '';
    try {
      const { data } = await http.get(`/api/universities/${id}/careers`);
      universityBanner.value = data.university || null;
      careers.value = Array.isArray(data.data) ? data.data : [];
    } catch (e) {
      careers.value = [];
      universityBanner.value = null;
      error.value = e?.response?.data?.message || 'No se pudieron cargar las carreras.';
    } finally {
      loadingCareers.value = false;
    }
  }

  async function refreshSelectionFromServer() {
    const id = selection.value?.career?.id;
    if (!id) return;
    try {
      const { data } = await http.get(`/api/careers/${id}/resolve`);
      selection.value = data;
    } catch {
      selection.value = null;
    }
  }

  async function selectCareer(career) {
    if (!career?.id) return;
    if (!canSelectCareerClient(career)) {
      upgradeModalOpen.value = true;
      return;
    }
    selectingCareer.value = true;
    error.value = '';
    try {
      const { data } = await http.post('/api/career/select', { career_id: career.id });
      selection.value = data;
    } catch (e) {
      const code = e?.response?.data?.code;
      if (e?.response?.status === 403 && code === 'UPGRADE_REQUIRED') {
        upgradeModalOpen.value = true;
      } else {
        error.value = e?.response?.data?.message || 'No se pudo confirmar la selección.';
      }
    } finally {
      selectingCareer.value = false;
    }
  }

  function closeUpgradeModal() {
    upgradeModalOpen.value = false;
  }

  return {
    universities,
    universityBanner,
    careers,
    selectedUniversityId,
    selection,
    loadingUniversities,
    loadingCareers,
    selectingCareer,
    upgradeModalOpen,
    error,
    isProUser,
    careerIdForUpload,
    hasSelection,
    careerIsProOnly,
    canSelectCareerClient,
    hydrateFromStorage,
    clearSelection,
    fetchUniversities,
    loadCareersForUniversity,
    refreshSelectionFromServer,
    selectCareer,
    closeUpgradeModal,
  };
});
