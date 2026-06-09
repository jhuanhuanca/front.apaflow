<script setup>
import { onMounted, reactive, ref } from 'vue';
import adminHttp from '@/services/adminApi';
import PsPageHeader from '@panelsaas/components/PsPageHeader.vue';
import PsDataTable from '@panelsaas/components/PsDataTable.vue';

import { apiBaseURL } from '@/config/appConfig';

const base = apiBaseURL;

function storageUrl(path) {
  if (!path) return '';
  if (String(path).startsWith('http')) return path;
  return `${base}/storage/${String(path).replace(/^\/+/, '')}`;
}

const rows = ref([]);
const meta = ref({ current_page: 1, last_page: 1 });
const universities = ref([]);
const templates = ref([]);
const loading = ref(true);
const err = ref('');
const saving = ref(false);
const modalOpen = ref(false);
const editingId = ref(null);

const form = reactive({
  university_id: '',
  document_template_id: '',
  name: '',
  category: '',
  description: '',
  status: 'active',
  plan_access: 'both',
  logo: null,
});

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'logo_path', label: 'Logo' },
  { key: 'name', label: 'Carrera' },
  { key: 'university', label: 'Universidad' },
  { key: 'plan_access', label: 'Plan' },
  { key: 'status', label: 'Estado' },
  { key: 'actions', label: '' },
];

function resetForm() {
  editingId.value = null;
  form.university_id = universities.value[0]?.id ? String(universities.value[0].id) : '';
  form.document_template_id = '';
  form.name = '';
  form.category = '';
  form.description = '';
  form.status = 'active';
  form.plan_access = 'both';
  form.logo = null;
}

async function loadRefs() {
  const [uRes, tRes] = await Promise.all([
    adminHttp.get('/admin/universities', { params: { per_page: 200 } }),
    adminHttp.get('/admin/document-templates', { params: { per_page: 200 } }),
  ]);
  universities.value = uRes.data.data || [];
  templates.value = tRes.data.data || [];
}

async function load(page = 1) {
  loading.value = true;
  err.value = '';
  try {
    const { data } = await adminHttp.get('/admin/careers', { params: { page, per_page: 25 } });
    rows.value = (data.data || []).map((r) => ({
      ...r,
      university: r.university?.name || r.university_id,
    }));
    meta.value = {
      current_page: data.current_page || 1,
      last_page: data.last_page || 1,
    };
  } catch (e) {
    err.value = e?.response?.data?.message || 'Error al cargar carreras.';
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
    const { data } = await adminHttp.get(`/admin/careers/${row.id}`);
    form.university_id = String(data.university_id);
    form.document_template_id = data.document_template_id ? String(data.document_template_id) : '';
    form.name = data.name || '';
    form.category = data.category || '';
    form.description = data.description || '';
    form.status = data.status || 'active';
    form.plan_access = data.plan_access || 'both';
    modalOpen.value = true;
  } catch (e) {
    err.value = e?.response?.data?.message || 'No se pudo cargar la carrera.';
  } finally {
    saving.value = false;
  }
}

function onLogo(e) {
  const f = e.target.files?.[0];
  form.logo = f || null;
}

function appendFormData(fd) {
  fd.append('university_id', form.university_id);
  fd.append('name', form.name);
  fd.append('status', form.status);
  fd.append('plan_access', form.plan_access);
  if (form.category) {
    fd.append('category', form.category);
  }
  if (form.description) {
    fd.append('description', form.description);
  }
  if (form.document_template_id) {
    fd.append('document_template_id', form.document_template_id);
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
      await adminHttp.put(`/admin/careers/${editingId.value}`, fd);
    } else {
      await adminHttp.post('/admin/careers', fd);
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
  if (!window.confirm(`¿Eliminar carrera «${row.name}»?`)) return;
  saving.value = true;
  try {
    await adminHttp.delete(`/admin/careers/${row.id}`);
    await load(meta.value.current_page);
  } catch (e) {
    err.value = e?.response?.data?.message || 'No se pudo eliminar.';
  } finally {
    saving.value = false;
  }
}

onMounted(async () => {
  await loadRefs();
  resetForm();
  await load(1);
});
</script>

<template>
  <div>
    <PsPageHeader
      title="Carreras"
      subtitle="CRUD con universidad, plantilla por defecto, logo y plan de acceso."
    />
    <div class="flex flex-wrap items-center gap-3 mb-4">
      <button
        type="button"
        class="rounded-full bg-accent px-4 py-2 text-sm font-medium text-ink hover:bg-brand-dark disabled:opacity-50"
        :disabled="saving || !universities.length"
        @click="openCreate"
      >
        Nueva carrera
      </button>
      <button type="button" class="text-sm text-ink-muted hover:text-ink underline" @click="load(meta.current_page)">
        Actualizar
      </button>
    </div>
    <p v-if="!universities.length" class="text-sm text-amber-200/90 mb-2">
      Crea al menos una universidad antes de registrar carreras.
    </p>
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
        <h2 class="font-semibold text-lg mb-4">{{ editingId ? 'Editar carrera' : 'Nueva carrera' }}</h2>
        <form class="space-y-4" @submit.prevent="submit">
          <div>
            <label class="block text-xs text-ink-muted mb-1">Universidad</label>
            <select
              v-model="form.university_id"
              required
              class="w-full rounded-lg border border-line bg-black/30 px-3 py-2 text-sm"
            >
              <option v-for="u in universities" :key="u.id" :value="String(u.id)">{{ u.name }}</option>
            </select>
          </div>
          <div>
            <label class="block text-xs text-ink-muted mb-1">Plantilla por defecto</label>
            <select v-model="form.document_template_id" class="w-full rounded-lg border border-line bg-black/30 px-3 py-2 text-sm">
              <option value="">— Ninguna —</option>
              <option v-for="t in templates" :key="t.id" :value="String(t.id)">{{ t.name }} ({{ t.type }})</option>
            </select>
          </div>
          <div>
            <label class="block text-xs text-ink-muted mb-1">Nombre</label>
            <input v-model="form.name" required class="w-full rounded-lg border border-line bg-black/30 px-3 py-2 text-sm" />
          </div>
          <div>
            <label class="block text-xs text-ink-muted mb-1">Categoría</label>
            <input v-model="form.category" class="w-full rounded-lg border border-line bg-black/30 px-3 py-2 text-sm" />
          </div>
          <div>
            <label class="block text-xs text-ink-muted mb-1">Descripción</label>
            <textarea v-model="form.description" rows="3" class="w-full rounded-lg border border-line bg-black/30 px-3 py-2 text-sm" />
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
