<script setup>
import { onMounted, reactive, ref } from 'vue';
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
  type: 'apa',
  status: 'active',
  plan_access: 'both',
  description: '',
  version: 1,
  settingsJson: '{}',
});

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Nombre' },
  { key: 'type', label: 'Tipo' },
  { key: 'plan_access', label: 'Plan' },
  { key: 'status', label: 'Estado' },
  { key: 'version', label: 'Versión' },
  { key: 'actions', label: '' },
];

function resetForm() {
  editingId.value = null;
  form.name = '';
  form.type = 'apa';
  form.status = 'active';
  form.plan_access = 'both';
  form.description = '';
  form.version = 1;
  form.settingsJson = JSON.stringify(
    {
      margins_cm: { top: 2.5, bottom: 2.5, left: 3, right: 2.5 },
      line_height: 1.5,
      citations: 'apa7_author_date',
      tentative_index: true,
    },
    null,
    2,
  );
}

async function load(page = 1) {
  loading.value = true;
  err.value = '';
  try {
    const { data } = await adminHttp.get('/admin/document-templates', { params: { page, per_page: 25 } });
    rows.value = data.data || [];
    meta.value = {
      current_page: data.current_page || 1,
      last_page: data.last_page || 1,
    };
  } catch (e) {
    err.value = e?.response?.data?.message || 'Error al cargar plantillas.';
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
    const { data } = await adminHttp.get(`/admin/document-templates/${row.id}`);
    form.name = data.name || '';
    form.type = data.type || 'apa';
    form.status = data.status || 'active';
    form.plan_access = data.plan_access || 'both';
    form.description = data.description || '';
    form.version = data.version || 1;
    form.settingsJson = JSON.stringify(data.settings && typeof data.settings === 'object' ? data.settings : {}, null, 2);
    modalOpen.value = true;
  } catch (e) {
    err.value = e?.response?.data?.message || 'No se pudo cargar la plantilla.';
  } finally {
    saving.value = false;
  }
}

function parseSettings() {
  const raw = form.settingsJson.trim() || '{}';
  return JSON.parse(raw);
}

async function submit() {
  saving.value = true;
  err.value = '';
  let settings;
  try {
    settings = parseSettings();
    if (typeof settings !== 'object' || settings === null || Array.isArray(settings)) {
      throw new Error('Settings debe ser un objeto JSON.');
    }
  } catch (e) {
    err.value = e?.message || 'JSON de settings inválido.';
    saving.value = false;
    return;
  }
  try {
    const payload = {
      name: form.name,
      type: form.type,
      status: form.status,
      plan_access: form.plan_access,
      description: form.description || null,
      version: Number(form.version) || 1,
      settings,
    };
    if (editingId.value) {
      await adminHttp.put(`/admin/document-templates/${editingId.value}`, payload);
    } else {
      await adminHttp.post('/admin/document-templates', payload);
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
  if (!window.confirm(`¿Eliminar plantilla «${row.name}»?`)) return;
  saving.value = true;
  try {
    await adminHttp.delete(`/admin/document-templates/${row.id}`);
    await load(meta.value.current_page);
  } catch (e) {
    err.value = e?.response?.data?.message || 'No se pudo eliminar.';
  } finally {
    saving.value = false;
  }
}

onMounted(() => {
  resetForm();
  load(1);
});
</script>

<template>
  <div>
    <PsPageHeader
      title="Plantillas de documento"
      subtitle="APA / Vancouver / custom. Settings JSON (márgenes, citas, índice tentativo) listos para motor e IA."
    />
    <div class="flex flex-wrap items-center gap-3 mb-4">
      <button
        type="button"
        class="rounded-full bg-accent px-4 py-2 text-sm font-medium text-ink hover:bg-brand-dark disabled:opacity-50"
        :disabled="saving"
        @click="openCreate"
      >
        Nueva plantilla
      </button>
      <button type="button" class="text-sm text-ink-muted hover:text-ink underline" @click="load(meta.current_page)">
        Actualizar
      </button>
    </div>
    <p v-if="err" class="text-sm text-red-300 mb-4">{{ err }}</p>
    <PsDataTable :columns="columns" :rows="rows" :loading="loading">
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
        class="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-line bg-midnight p-6 text-ink shadow-xl"
        @click.stop
      >
        <h2 class="font-semibold text-lg mb-4">{{ editingId ? 'Editar plantilla' : 'Nueva plantilla' }}</h2>
        <form class="space-y-4" @submit.prevent="submit">
          <div class="grid sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs text-ink-muted mb-1">Nombre</label>
              <input v-model="form.name" required class="w-full rounded-lg border border-line bg-black/30 px-3 py-2 text-sm" />
            </div>
            <div>
              <label class="block text-xs text-ink-muted mb-1">Tipo</label>
              <select v-model="form.type" class="w-full rounded-lg border border-line bg-black/30 px-3 py-2 text-sm">
                <option value="apa">APA</option>
                <option value="vancouver">Vancouver</option>
                <option value="custom">Custom</option>
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
              <label class="block text-xs text-ink-muted mb-1">Versión</label>
              <input v-model.number="form.version" type="number" min="1" class="w-full rounded-lg border border-line bg-black/30 px-3 py-2 text-sm" />
            </div>
          </div>
          <div>
            <label class="block text-xs text-ink-muted mb-1">Descripción</label>
            <textarea v-model="form.description" rows="2" class="w-full rounded-lg border border-line bg-black/30 px-3 py-2 text-sm" />
          </div>
          <div>
            <label class="block text-xs text-ink-muted mb-1">Settings (JSON)</label>
            <textarea
              v-model="form.settingsJson"
              rows="14"
              class="w-full rounded-lg border border-line bg-black/30 px-3 py-2 text-xs font-mono leading-relaxed"
            />
            <p class="text-[11px] text-ink-faint mt-1">
              Para tipo custom: márgenes, interlineado, sangría, citas, tablas, imágenes, índice tentativo, etc.
            </p>
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
