<script setup>
import { onMounted, ref } from 'vue';
import adminHttp from '@/services/adminApi';
import PsPageHeader from '@panelsaas/components/PsPageHeader.vue';
import PsDataTable from '@panelsaas/components/PsDataTable.vue';

const rows = ref([]);
const loading = ref(true);
const err = ref('');

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Categoría' },
  { key: 'slug', label: 'Slug' },
  { key: 'university_id', label: 'Univ.' },
  { key: 'parent_id', label: 'Padre' },
  { key: 'status', label: 'Estado' },
];

onMounted(async () => {
  loading.value = true;
  try {
    const { data } = await adminHttp.get('/admin/content-categories');
    rows.value = data.data || [];
  } catch (e) {
    err.value = e?.response?.data?.message || 'Error al cargar categorías.';
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div>
    <PsPageHeader title="Categorías de contenido" subtitle="Árbol por universidad (parent_id)." />
    <p v-if="err" class="text-sm text-red-300 mb-4">{{ err }}</p>
    <PsDataTable :columns="columns" :rows="rows" :loading="loading" />
  </div>
</template>
