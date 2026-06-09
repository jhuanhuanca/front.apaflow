<script setup>
import { onMounted, ref } from 'vue';
import adminHttp from '@/services/adminApi';
import PsPageHeader from '@panelsaas/components/PsPageHeader.vue';
import PsCard from '@panelsaas/components/PsCard.vue';

const data = ref(null);
const err = ref('');

onMounted(async () => {
  try {
    const { data: d } = await adminHttp.get('/admin/ai/capabilities');
    data.value = d;
  } catch (e) {
    err.value = e?.response?.data?.message || 'No se pudo obtener la configuración de IA.';
  }
});
</script>

<template>
  <div>
    <PsPageHeader
      title="Integración IA (Python)"
      subtitle="Mapa de endpoints del microservicio; Laravel orquesta jobs y seguridad."
    />
    <p v-if="err" class="text-sm text-red-300 mb-4">{{ err }}</p>
    <PsCard v-if="data" title="Endpoints">
      <p class="text-xs text-ink-faint mb-2 break-all">{{ data.python_service_base_url }}</p>
      <ul class="text-sm space-y-2 text-ink-secondary">
        <li v-for="(url, key) in data.endpoints" :key="key"><span class="text-ink-muted">{{ key }}:</span> {{ url }}</li>
      </ul>
      <p v-if="data.notes" class="text-xs text-ink-faint mt-4">{{ data.notes }}</p>
    </PsCard>
  </div>
</template>
