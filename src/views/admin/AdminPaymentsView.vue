<script setup>
import { computed, onMounted, reactive, ref } from 'vue';
import adminHttp from '@/services/adminApi';
import PsPageHeader from '@panelsaas/components/PsPageHeader.vue';
import PsDataTable from '@panelsaas/components/PsDataTable.vue';

const rows = ref([]);
const meta = ref({ current_page: 1, last_page: 1 });
const gatewayList = ref([]);
const channelCatalog = ref([]);
const loading = ref(true);
const err = ref('');
const saving = ref(false);
const modalOpen = ref(false);

const form = reactive({
  user_id: '',
  amount_cents: '',
  currency: 'USD',
  status: 'paid',
  provider: 'manual',
  channel: 'card',
  external_id: '',
});

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'user_id', label: 'Usuario' },
  { key: 'amount_cents', label: 'Monto (¢)' },
  { key: 'currency', label: 'Moneda' },
  { key: 'status', label: 'Estado' },
  { key: 'provider', label: 'Pasarela' },
  { key: 'channel', label: 'Canal' },
];

const gatewayLabel = computed(() => {
  const m = new Map(gatewayList.value.map((g) => [g.code, g.label]));
  return (code) => m.get(code) || code || '—';
});

const channelLabel = (code) => {
  const row = channelCatalog.value.find((c) => c.code === code);
  return row?.label || (code === 'qr' ? 'QR' : 'Tarjeta');
};

const channelsForGateway = computed(() => {
  const g = gatewayList.value.find((x) => x.code === form.provider);
  return g?.channels?.length ? g.channels : ['card', 'qr'];
});

async function loadOptions() {
  try {
    const { data } = await adminHttp.get('/payment-options');
    gatewayList.value = data.data || [];
    channelCatalog.value = data.channels || [];
    if (gatewayList.value.length && !gatewayList.value.some((g) => g.code === form.provider)) {
      form.provider = gatewayList.value[0].code;
    }
  } catch {
    gatewayList.value = [];
    channelCatalog.value = [
      { code: 'card', label: 'Tarjeta' },
      { code: 'qr', label: 'QR' },
    ];
  }
}

function syncChannelToGateway() {
  const allowed = channelsForGateway.value;
  if (!allowed.includes(form.channel)) {
    form.channel = allowed[0] || 'card';
  }
}

async function load(page = 1) {
  loading.value = true;
  err.value = '';
  try {
    const { data } = await adminHttp.get('/admin/payments', { params: { page, per_page: 25 } });
    rows.value = data.data || [];
    meta.value = {
      current_page: data.current_page || 1,
      last_page: data.last_page || 1,
    };
  } catch (e) {
    err.value = e?.response?.data?.message || 'Error al cargar pagos.';
    rows.value = [];
  } finally {
    loading.value = false;
  }
}

function openCreate() {
  form.user_id = '';
  form.amount_cents = '';
  form.currency = 'USD';
  form.status = 'paid';
  form.provider = gatewayList.value[0]?.code || 'manual';
  form.channel = 'card';
  form.external_id = '';
  syncChannelToGateway();
  modalOpen.value = true;
}

async function submit() {
  saving.value = true;
  err.value = '';
  syncChannelToGateway();
  try {
    await adminHttp.post('/admin/payments', {
      user_id: Number(form.user_id),
      amount_cents: Number(form.amount_cents),
      currency: form.currency.trim().toUpperCase().slice(0, 3),
      status: form.status,
      provider: form.provider,
      channel: form.channel,
      external_id: form.external_id || null,
    });
    modalOpen.value = false;
    await load(meta.value.current_page);
  } catch (e) {
    err.value = e?.response?.data?.message || 'Error al registrar el pago.';
  } finally {
    saving.value = false;
  }
}

onMounted(async () => {
  await loadOptions();
  await load(1);
});
</script>

<template>
  <div>
    <PsPageHeader
      title="Pagos"
      subtitle="Historial, alta manual y pasarela + canal (tarjeta o QR). Opciones desde config/payments.php y /api/payment-options."
    />
    <div class="flex flex-wrap items-center gap-3 mb-4">
      <button
        type="button"
        class="rounded-full bg-accent px-4 py-2 text-sm font-medium text-ink hover:bg-brand-dark disabled:opacity-50"
        :disabled="saving || !gatewayList.length"
        @click="openCreate"
      >
        Registrar pago manual
      </button>
      <button type="button" class="text-sm text-ink-muted hover:text-ink underline" @click="load(meta.current_page)">
        Actualizar lista
      </button>
    </div>
    <p v-if="err" class="text-sm text-red-300 mb-4">{{ err }}</p>
    <PsDataTable :columns="columns" :rows="rows" :loading="loading">
      <template #cell-provider="{ value }">
        {{ gatewayLabel(value) }}
      </template>
      <template #cell-channel="{ value }">
        {{ channelLabel(value) }}
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
        class="w-full max-w-md rounded-2xl border border-line bg-midnight p-6 text-ink shadow-xl"
        @click.stop
      >
        <h2 class="font-semibold text-lg mb-4">Registrar pago</h2>
        <form class="space-y-4" @submit.prevent="submit">
          <div>
            <label class="block text-xs text-ink-muted mb-1">ID usuario</label>
            <input
              v-model="form.user_id"
              type="number"
              required
              min="1"
              class="w-full rounded-lg border border-line bg-black/30 px-3 py-2 text-sm"
            />
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs text-ink-muted mb-1">Monto (centavos)</label>
              <input
                v-model="form.amount_cents"
                type="number"
                required
                min="0"
                class="w-full rounded-lg border border-line bg-black/30 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label class="block text-xs text-ink-muted mb-1">Moneda (ISO3)</label>
              <input v-model="form.currency" maxlength="3" class="w-full rounded-lg border border-line bg-black/30 px-3 py-2 text-sm uppercase" />
            </div>
          </div>
          <div>
            <label class="block text-xs text-ink-muted mb-1">Estado</label>
            <select v-model="form.status" class="w-full rounded-lg border border-line bg-black/30 px-3 py-2 text-sm">
              <option value="pending">Pendiente</option>
              <option value="paid">Pagado</option>
              <option value="failed">Fallido</option>
              <option value="refunded">Reembolsado</option>
            </select>
          </div>
          <div>
            <label class="block text-xs text-ink-muted mb-1">Pasarela</label>
            <select
              v-model="form.provider"
              class="w-full rounded-lg border border-line bg-black/30 px-3 py-2 text-sm"
              @change="syncChannelToGateway"
            >
              <option v-for="g in gatewayList" :key="g.code" :value="g.code">{{ g.label }}</option>
            </select>
          </div>
          <div>
            <label class="block text-xs text-ink-muted mb-1">Canal de cobro</label>
            <select v-model="form.channel" class="w-full rounded-lg border border-line bg-black/30 px-3 py-2 text-sm">
              <option v-for="c in channelsForGateway" :key="c" :value="c">
                {{ c === 'card' ? 'Tarjeta (crédito / débito)' : 'QR / billetera / código' }}
              </option>
            </select>
          </div>
          <div>
            <label class="block text-xs text-ink-muted mb-1">ID externo (opcional)</label>
            <input v-model="form.external_id" class="w-full rounded-lg border border-line bg-black/30 px-3 py-2 text-sm" />
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
