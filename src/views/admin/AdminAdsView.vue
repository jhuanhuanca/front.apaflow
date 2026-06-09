<script setup>
import { computed, onMounted, reactive, ref } from 'vue';
import adminHttp from '@/services/adminApi';
import PsPageHeader from '@panelsaas/components/PsPageHeader.vue';
import PsDataTable from '@panelsaas/components/PsDataTable.vue';

const rows = ref([]);
const meta = ref({ current_page: 1, last_page: 1 });
const loading = ref(true);
const err = ref('');
const saving = ref(false);
const modalOpen = ref(false);
const editingId = ref(null);

const form = reactive({
  name: '',
  location: 'home_top',
  format: 'banner',
  status: 'active',
  priority: 100,
  audience: 'non_pro',
  provider: 'placeholder',
  slot_id: '',
  label: 'Publicidad',
  starts_at: '',
  ends_at: '',
});

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Nombre' },
  { key: 'location', label: 'Ubicación' },
  { key: 'format', label: 'Formato' },
  { key: 'status', label: 'Estado' },
  { key: 'priority', label: 'Prioridad' },
  { key: 'audience', label: 'Audiencia' },
];

const locationOptions = [
  'home_top',
  'home_mid',
  'home_pre_footer',
  'guide_top',
  'guide_inline',
  'guide_bottom',
  'guide_sidebar',
  'footer',
  'dashboard',
];

const modalTitle = computed(() => (editingId.value ? 'Editar placement' : 'Nuevo placement'));

function resetForm() {
  editingId.value = null;
  Object.assign(form, {
    name: '',
    location: 'home_top',
    format: 'banner',
    status: 'active',
    priority: 100,
    audience: 'non_pro',
    provider: 'placeholder',
    slot_id: '',
    label: 'Publicidad',
    starts_at: '',
    ends_at: '',
  });
}

function openCreate() {
  resetForm();
  modalOpen.value = true;
}

function openEdit(row) {
  editingId.value = row.id;
  Object.assign(form, {
    name: row.name ?? '',
    location: row.location ?? 'home_top',
    format: row.format ?? 'banner',
    status: row.status ?? 'active',
    priority: row.priority ?? 100,
    audience: row.audience ?? 'non_pro',
    provider: row.provider ?? 'placeholder',
    slot_id: row.slot_id ?? '',
    label: row.label ?? 'Publicidad',
    starts_at: row.starts_at ? String(row.starts_at).slice(0, 10) : '',
    ends_at: row.ends_at ? String(row.ends_at).slice(0, 10) : '',
  });
  modalOpen.value = true;
}

async function load(page = 1) {
  loading.value = true;
  err.value = '';
  try {
    const { data } = await adminHttp.get('/admin/ad-placements', { params: { page, per_page: 25 } });
    rows.value = data.data || [];
    meta.value = {
      current_page: data.current_page ?? page,
      last_page: data.last_page ?? 1,
    };
  } catch (e) {
    err.value = e?.response?.data?.message || 'No se pudieron cargar los placements.';
    rows.value = [];
  } finally {
    loading.value = false;
  }
}

async function save() {
  saving.value = true;
  err.value = '';
  const payload = {
    name: form.name,
    location: form.location,
    format: form.format,
    status: form.status,
    priority: Number(form.priority),
    audience: form.audience,
    provider: form.provider || 'placeholder',
    slot_id: form.slot_id || null,
    label: form.label || null,
    starts_at: form.starts_at || null,
    ends_at: form.ends_at || null,
  };

  try {
    if (editingId.value) {
      await adminHttp.put(`/admin/ad-placements/${editingId.value}`, payload);
    } else {
      await adminHttp.post('/admin/ad-placements', payload);
    }
    modalOpen.value = false;
    resetForm();
    await load(meta.value.current_page);
  } catch (e) {
    err.value = e?.response?.data?.message || 'Error al guardar.';
  } finally {
    saving.value = false;
  }
}

async function remove(row) {
  if (!window.confirm(`¿Eliminar "${row.name}"?`)) {
    return;
  }
  try {
    await adminHttp.delete(`/admin/ad-placements/${row.id}`);
    await load(meta.value.current_page);
  } catch (e) {
    err.value = e?.response?.data?.message || 'No se pudo eliminar.';
  }
}

onMounted(() => load());
</script>

<template>
  <div>
    <PsPageHeader
      title="Anuncios"
      subtitle="Placements por ubicación, audiencia y fechas. Compatible con AdSense / AdMob vía slot_id."
    />

    <div class="flex flex-wrap items-center gap-3 mb-4">
      <button type="button" class="btn-primary text-sm" @click="openCreate">
        Nuevo placement
      </button>
      <button type="button" class="btn-ghost text-sm" :disabled="loading" @click="load(meta.current_page)">
        Actualizar
      </button>
    </div>

    <p v-if="err" class="text-sm text-red-300 mb-4">{{ err }}</p>

    <PsDataTable
      :columns="columns"
      :rows="rows"
      :loading="loading"
      empty-label="Sin placements configurados."
    >
      <template #cell-status="{ row }">
        <span
          class="text-xs px-2 py-0.5 rounded-full"
          :class="row.status === 'active' ? 'bg-emerald-500/20 text-emerald-200' : 'bg-ink/20 text-ink-muted'"
        >
          {{ row.status }}
        </span>
      </template>
      <template #actions="{ row }">
        <button type="button" class="text-xs text-brand hover:underline mr-3" @click="openEdit(row)">
          Editar
        </button>
        <button type="button" class="text-xs text-red-300 hover:underline" @click="remove(row)">
          Eliminar
        </button>
      </template>
    </PsDataTable>

    <div v-if="meta.last_page > 1" class="mt-4 flex gap-2 text-sm text-ink-muted">
      <button
        type="button"
        class="btn-ghost text-xs"
        :disabled="meta.current_page <= 1 || loading"
        @click="load(meta.current_page - 1)"
      >
        Anterior
      </button>
      <span>Página {{ meta.current_page }} / {{ meta.last_page }}</span>
      <button
        type="button"
        class="btn-ghost text-xs"
        :disabled="meta.current_page >= meta.last_page || loading"
        @click="load(meta.current_page + 1)"
      >
        Siguiente
      </button>
    </div>

    <div
      v-if="modalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/50 backdrop-blur-sm"
      @click.self="modalOpen = false"
    >
      <form
        class="w-full max-w-lg rounded-2xl border border-line bg-deep p-6 space-y-4 max-h-[90vh] overflow-y-auto"
        @submit.prevent="save"
      >
        <h2 class="font-display text-lg">{{ modalTitle }}</h2>

        <label class="block text-xs text-ink-muted">
          Nombre
          <input v-model="form.name" required class="mt-1 w-full rounded-lg border border-line bg-midnight px-3 py-2 text-sm" />
        </label>

        <div class="grid grid-cols-2 gap-3">
          <label class="block text-xs text-ink-muted">
            Ubicación
            <select v-model="form.location" class="mt-1 w-full rounded-lg border border-line bg-midnight px-3 py-2 text-sm">
              <option v-for="loc in locationOptions" :key="loc" :value="loc">{{ loc }}</option>
            </select>
          </label>
          <label class="block text-xs text-ink-muted">
            Formato
            <select v-model="form.format" class="mt-1 w-full rounded-lg border border-line bg-midnight px-3 py-2 text-sm">
              <option value="banner">banner</option>
              <option value="sidebar">sidebar</option>
              <option value="inline">inline</option>
              <option value="footer">footer</option>
            </select>
          </label>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <label class="block text-xs text-ink-muted">
            Estado
            <select v-model="form.status" class="mt-1 w-full rounded-lg border border-line bg-midnight px-3 py-2 text-sm">
              <option value="active">active</option>
              <option value="inactive">inactive</option>
            </select>
          </label>
          <label class="block text-xs text-ink-muted">
            Prioridad
            <input v-model.number="form.priority" type="number" min="0" class="mt-1 w-full rounded-lg border border-line bg-midnight px-3 py-2 text-sm" />
          </label>
        </div>

        <label class="block text-xs text-ink-muted">
          Audiencia
          <select v-model="form.audience" class="mt-1 w-full rounded-lg border border-line bg-midnight px-3 py-2 text-sm">
            <option value="non_pro">non_pro (guest + free)</option>
            <option value="guest">guest</option>
            <option value="free">free</option>
            <option value="guest_and_free">guest_and_free</option>
            <option value="all">all</option>
          </select>
        </label>

        <div class="grid grid-cols-2 gap-3">
          <label class="block text-xs text-ink-muted">
            Proveedor
            <input v-model="form.provider" class="mt-1 w-full rounded-lg border border-line bg-midnight px-3 py-2 text-sm" placeholder="placeholder | adsense | admob" />
          </label>
          <label class="block text-xs text-ink-muted">
            Slot ID
            <input v-model="form.slot_id" class="mt-1 w-full rounded-lg border border-line bg-midnight px-3 py-2 text-sm" placeholder="ca-pub-xxx/yyy" />
          </label>
        </div>

        <label class="block text-xs text-ink-muted">
          Etiqueta demo
          <input v-model="form.label" class="mt-1 w-full rounded-lg border border-line bg-midnight px-3 py-2 text-sm" />
        </label>

        <div class="grid grid-cols-2 gap-3">
          <label class="block text-xs text-ink-muted">
            Inicio
            <input v-model="form.starts_at" type="date" class="mt-1 w-full rounded-lg border border-line bg-midnight px-3 py-2 text-sm" />
          </label>
          <label class="block text-xs text-ink-muted">
            Fin
            <input v-model="form.ends_at" type="date" class="mt-1 w-full rounded-lg border border-line bg-midnight px-3 py-2 text-sm" />
          </label>
        </div>

        <div class="flex justify-end gap-2 pt-2">
          <button type="button" class="btn-ghost text-sm" @click="modalOpen = false">Cancelar</button>
          <button type="submit" class="btn-primary text-sm" :disabled="saving">
            {{ saving ? 'Guardando…' : 'Guardar' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
