<script setup>
import { onMounted, ref } from 'vue';
import adminHttp from '@/services/adminApi';
import PsPageHeader from '@panelsaas/components/PsPageHeader.vue';
import PsCard from '@panelsaas/components/PsCard.vue';
import PsBarChart from '@panelsaas/charts/PsBarChart.vue';

const kpi = ref(null);
const err = ref('');

onMounted(async () => {
  try {
    const { data } = await adminHttp.get('/admin/analytics/kpi');
    kpi.value = data;
  } catch (e) {
    err.value = e?.response?.data?.message || 'No se pudieron cargar los KPI.';
  }
});

const planSeries = () => {
  if (!kpi.value?.users_by_plan) return [];
  return Object.entries(kpi.value.users_by_plan).map(([label, value]) => ({ label, value: Number(value) }));
};
</script>

<template>
  <div>
    <PsPageHeader title="Dashboard" subtitle="Métricas de negocio y actividad (base para gráficos)." />
    <p v-if="err" class="text-sm text-red-300 mb-4">{{ err }}</p>
    <div v-if="kpi" class="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
      <PsCard title="Usuarios">
        <dl class="space-y-2 text-sm">
          <div class="flex justify-between"><dt class="text-ink-muted">Total</dt><dd>{{ kpi.users_total }}</dd></div>
          <div class="flex justify-between"><dt class="text-ink-muted">Activos</dt><dd>{{ kpi.users_active }}</dd></div>
          <div class="flex justify-between">
            <dt class="text-ink-muted">Free → Pro</dt>
            <dd>{{ kpi.conversion_free_to_pro_pct }}%</dd>
          </div>
        </dl>
      </PsCard>
      <PsCard title="Ingresos (pagos marcados paid)">
        <p class="text-2xl font-display text-ink-secondary">
          {{ (kpi.revenue_paid_cents / 100).toLocaleString(undefined, { style: 'currency', currency: 'USD' }) }}
        </p>
        <p class="text-xs text-ink-faint mt-2">Configurable por moneda en pagos.</p>
      </PsCard>
      <PsCard title="Usuarios por plan">
        <PsBarChart :series="planSeries()" />
      </PsCard>
    </div>
    <p v-else-if="!err" class="text-ink-faint text-sm">Cargando métricas…</p>
  </div>
</template>
