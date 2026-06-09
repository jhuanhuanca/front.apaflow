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
  { key: 'name', label: 'Nombre' },
  { key: 'email', label: 'Email' },
  { key: 'plan', label: 'Plan' },
  { key: 'subscription_status', label: 'Suscripción' },
  { key: 'is_blocked', label: 'Bloqueado' },
];

onMounted(async () => {
  loading.value = true;
  try {
    const { data } = await adminHttp.get('/admin/users');
    rows.value = data.data || [];
  } catch (e) {
    err.value = e?.response?.data?.message || 'Error al cargar usuarios.';
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div>
    <PsPageHeader title="Usuarios" subtitle="Planes, estado de suscripción y bloqueo (edición vía API PATCH)." />
    <p v-if="err" class="text-sm text-red-300 mb-4">{{ err }}</p>
    <PsDataTable :columns="columns" :rows="rows" :loading="loading" />
  </div>
</template>
