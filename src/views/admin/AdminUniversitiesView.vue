<script setup>
import { onMounted, reactive, ref } from 'vue';
import adminHttp from '@/services/adminApi';
import PsPageHeader from '@panelsaas/components/PsPageHeader.vue';
import PsDataTable from '@panelsaas/components/PsDataTable.vue';

const base = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000').replace(/\/$/, '');

function storageUrl(path) {
  if (!path) return '';
  if (String(path).startsWith('http')) return path;
  return `${base}/storage/${String(path).replace(/^\/+/, '')}`;
}

const rows = ref([]);
const meta = ref({ current_page: 1, last_page: 1 });
const loading = ref(true);
const err = ref('');
const saving = ref(false);
const modalOpen = ref(false);
const editingId = ref(null);

const form = reactive({
  name: '',
  country: '',
  institution_type: 'public',
  status: 'active',
  plan_access: 'both',
  tenant_id: '',
  logo: null,
});

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'logo_path', label: 'Logo' },
  { key: 'name', label: 'Nombre' },
  { key: 'country', label: 'País' },
  { key: 'institution_type', label: 'Tipo' },
  { key: 'status', label: 'Estado' },
  { key: 'plan_access', label: 'Plan' },
  { key: 'actions', label: '' },
];

function resetForm() {
  editingId.value = null;
  form.name = '';
  form.country = '';
  form.institution_type = 'public';
  form.status = 'active';
  form.plan_access = 'both';
  form.tenant_id = '';
  form.logo = null;
}

async function load(page = 1) {
  loading.value = true;
  err.value = '';
  try {
    const { data } = await adminHttp.get('/admin/universities', { params: { page, per_page: 25 } });
    rows.value = data.data || [];
    meta.value = {
      current_page: data.current_page || 1,
      last_page: data.last_page || 1,
    };
  } catch (e) {
    err.value = e?.response?.data?.message || 'Error al cargar universidades.';
    rows.value = [];
  } finally {
    loading.value = false;
  }
}

function openCreate() {
  resetForm();
  modalOpen.value = true;
}

async function openEdit(row) {
  resetForm();
  editingId.value = row.id;
  saving.value = true;
  try {
    const { data } = await adminHttp.get(`/admin/universities/${row.id}`);
    form.name = data.name || '';
    form.country = data.country || '';
    form.institution_type = data.institution_type || 'public';
    form.status = data.status || 'active';
    form.plan_access = data.plan_access || 'both';
    form.tenant_id = data.tenant_id != null ? String(data.tenant_id) : '';
    modalOpen.value = true;
  } catch (e) {
    err.value = e?.response?.data?.message || 'No se pudo cargar la universidad.';
  } finally {
    saving.value = false;
  }
}

function onLogo(e) {
  const f = e.target.files?.[0];
  form.logo = f || null;
}

function appendFormData(fd) {
  fd.append('name', form.name);
  if (form.country) {
    fd.append('country', form.country.slice(0, 2).toUpperCase());
  }
  fd.append('institution_type', form.institution_type);
  fd.append('status', form.status);
  fd.append('plan_access', form.plan_access);
  if (form.tenant_id !== '') {
    fd.append('tenant_id', form.tenant_id);
  }
  if (form.logo) {
    fd.append('logo', form.logo);
  }
}

async function submit() {
  saving.value = true;
  err.value = '';
  try {
    const fd = new FormData();
    appendFormData(fd);
    if (editingId.value) {
      await adminHttp.put(`/admin/universities/${editingId.value}`, fd);
    } else {
      await adminHttp.post('/admin/universities', fd);
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
  if (!window.confirm(`¿Eliminar universidad «${row.name}»?`)) return;
  saving.value = true;
  try {
    await adminHttp.delete(`/admin/universities/${row.id}`);
    await load(meta.value.current_page);
  } catch (e) {
    err.value = e?.response?.data?.message || 'No se pudo eliminar.';
  } finally {
    saving.value = false;
  }
}

onMounted(() => load(1));
</script>

<template>
  <div>
    <PsPageHeader title="Universidades" subtitle="CRUD con logo, tipo de institución y plan de acceso (free / pro / both)." />
    <div class="flex flex-wrap items-center gap-3 mb-4">
      <button
        type="button"
        class="rounded-full bg-accent px-4 py-2 text-sm font-medium text-ink hover:bg-brand-dark disabled:opacity-50"
        :disabled="saving"
        @click="openCreate"
      >
        Nueva universidad
      </button>
      <button type="button" class="text-sm text-ink-muted hover:text-ink underline" @click="load(meta.current_page)">
        Actualizar
      </button>
    </div>
    <p v-if="err" class="text-sm text-red-300 mb-4">{{ err }}</p>
    <PsDataTable :columns="columns" :rows="rows" :loading="loading">
      <template #cell-logo_path="{ row }">
        <img
          v-if="row.logo_path"
          :src="storageUrl(row.logo_path)"
          alt=""
          class="h-9 w-9 rounded-lg object-cover border border-line"
        />
        <span v-else class="text-ink-faint text-xs">—</span>
      </template>
      <template #cell-actions="{ row }">
        <div class="flex flex-wrap gap-2 justify-end">
          <button type="button" class="text-xs text-accent hover:underline" @click="openEdit(row)">Editar</button>
          <button type="button" class="text-xs text-red-300 hover:underline" @click="remove(row)">Eliminar</button>
        </div>
      </template>
    </PsDataTable>
    <div v-if="meta.last_page > 1" class="mt-4 flex gap-2 text-sm text-ink-muted">
      <button
        type="button"
        class="disabled:opacity-40"
        :disabled="meta.current_page <= 1 || loading"
        @click="load(meta.current_page - 1)"
      >
        Anterior
      </button>
      <span>Página {{ meta.current_page }} / {{ meta.last_page }}</span>
      <button
        type="button"
        class="disabled:opacity-40"
        :disabled="meta.current_page >= meta.last_page || loading"
        @click="load(meta.current_page + 1)"
      >
        Siguiente
      </button>
    </div>

    <div
      v-if="modalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      role="dialog"
      aria-modal="true"
      @click.self="modalOpen = false"
    >
      <div
        class="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-line bg-midnight p-6 text-ink shadow-xl"
        @click.stop
      >
        <h2 class="font-semibold text-lg mb-4">{{ editingId ? 'Editar universidad' : 'Nueva universidad' }}</h2>
        <form class="space-y-4" @submit.prevent="submit">
          <div>
            <label class="block text-xs text-ink-muted mb-1">Nombre</label>
            <input v-model="form.name" required class="w-full rounded-lg border border-line bg-black/30 px-3 py-2 text-sm" />
          </div>
          <div>
            <label class="block text-xs text-ink-muted mb-1">País (ISO2)</label>
            <input
              v-model="form.country"
              maxlength="2"
              class="w-full rounded-lg border border-line bg-black/30 px-3 py-2 text-sm uppercase"
              placeholder="ES"
            />
          </div>
          <div>
            <label class="block text-xs text-ink-muted mb-1">Tipo</label>
            <select v-model="form.institution_type" class="w-full rounded-lg border border-line bg-black/30 px-3 py-2 text-sm">
              <option value="public">Pública</option>
              <option value="private">Privada</option>
              <option value="technical">Técnica</option>
            </select>
          </div>
          <div>
            <label class="block text-xs text-ink-muted mb-1">Estado</label>
            <select v-model="form.status" class="w-full rounded-lg border border-line bg-black/30 px-3 py-2 text-sm">
              <option value="active">Activa</option>
              <option value="inactive">Inactiva</option>
              <option value="draft">Borrador</option>
            </select>
          </div>
          <div>
            <label class="block text-xs text-ink-muted mb-1">Plan de acceso</label>
            <select v-model="form.plan_access" class="w-full rounded-lg border border-line bg-black/30 px-3 py-2 text-sm">
              <option value="free">Solo Free</option>
              <option value="pro">Solo Pro</option>
              <option value="both">Free y Pro</option>
            </select>
          </div>
          <div>
            <label class="block text-xs text-ink-muted mb-1">Tenant ID (opcional)</label>
            <input v-model="form.tenant_id" type="number" class="w-full rounded-lg border border-line bg-black/30 px-3 py-2 text-sm" />
          </div>
          <div>
            <label class="block text-xs text-ink-muted mb-1">Logo (imagen)</label>
            <input type="file" accept="image/*" class="text-sm text-ink-secondary" @change="onLogo" />
          </div>
          <div class="flex justify-end gap-2 pt-2">
            <button type="button" class="rounded-full px-4 py-2 text-sm text-ink-secondary hover:bg-neutral-50" @click="modalOpen = false">
              Cancelar
            </button>
            <button
              type="submit"
              class="rounded-full bg-accent px-5 py-2 text-sm font-medium text-ink disabled:opacity-50"
              :disabled="saving"
            >
              {{ saving ? 'Guardando…' : 'Guardar' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
