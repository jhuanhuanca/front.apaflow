import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import http from '@/services/api';

/** Valores por defecto (paridad con config/saas.php del backend). */
const DEFAULTS = {
  guestMaxUploads: 1,
  guestMaxFreeDownloads: 1,
  demoCheckoutEnabled: false,
  paymentProvider: 'none',
  schemaReady: true,
};

/**
 * Configuración pública del backend (GET /api/config).
 * Fuente única para límites invitado y flags de pago demo.
 */
export const useClientConfigStore = defineStore('clientConfig', () => {
  const loaded = ref(false);
  const loading = ref(false);
  const error = ref(null);
  const apiReachable = ref(true);

  const guestMaxUploads = ref(DEFAULTS.guestMaxUploads);
  const guestMaxFreeDownloads = ref(DEFAULTS.guestMaxFreeDownloads);
  const demoCheckoutEnabled = ref(DEFAULTS.demoCheckoutEnabled);
  const paymentProvider = ref(DEFAULTS.paymentProvider);
  const paddle = ref({
    enabled: false,
    client_token: null,
    environment: 'sandbox',
  });
  const guestSchemaReady = ref(DEFAULTS.schemaReady);
  const brand = ref({ name: 'APA Flow', tagline: '' });

  const uploadDefaults = ref({
    university: 'General',
    career: 'Formateo APA 7',
  });

  const pricing = ref({
    currency: 'USD',
    free_per_document_cents: 99,
    free_per_document_formatted: '$0.99',
    pro_monthly_cents: 599,
    pro_monthly_formatted: '$5.99',
  });

  const apaDefaults = ref(null);

  const ads = ref({
    enabled: true,
    provider: 'placeholder',
    lazy_load: true,
    slots: {},
    inline_interval: 3,
    blocked_paths: [],
  });

  let inflight = null;

  async function bootstrap() {
    if (loaded.value) {
      return;
    }
    if (inflight) {
      return inflight;
    }

    loading.value = true;
    error.value = null;

    inflight = http
      .get('/api/config')
      .then(({ data }) => {
        if (data?.brand) {
          brand.value = data.brand;
        }
        if (data?.guest) {
          guestMaxUploads.value = Number(data.guest.max_uploads) || DEFAULTS.guestMaxUploads;
          guestMaxFreeDownloads.value =
            Number(data.guest.max_free_downloads) || DEFAULTS.guestMaxFreeDownloads;
          guestSchemaReady.value = data.guest.schema_ready !== false;
        }
        if (data?.defaults) {
          uploadDefaults.value = {
            university: data.defaults.university || uploadDefaults.value.university,
            career: data.defaults.career || uploadDefaults.value.career,
          };
        }
        if (data?.payments) {
          demoCheckoutEnabled.value = Boolean(data.payments.demo_checkout_enabled);
          paymentProvider.value = data.payments.provider || DEFAULTS.paymentProvider;
          if (data.payments.paddle) {
            paddle.value = {
              enabled: Boolean(data.payments.paddle.enabled),
              client_token: data.payments.paddle.client_token || null,
              environment: data.payments.paddle.environment || 'sandbox',
            };
          }
        }
        if (data?.pricing) {
          pricing.value = { ...pricing.value, ...data.pricing };
        }
        if (data?.apa_defaults) {
          apaDefaults.value = data.apa_defaults;
        }
        if (data?.ads) {
          ads.value = { ...ads.value, ...data.ads };
        }
        apiReachable.value = true;
        loaded.value = true;
      })
      .catch((e) => {
        apiReachable.value = false;
        error.value = e?.response?.data?.message || 'No se pudo conectar con la API.';
        if (import.meta.env.DEV) {
          // eslint-disable-next-line no-console
          console.warn('[API] GET /api/config falló; usando valores por defecto.', error.value);
        }
      })
      .finally(() => {
        loading.value = false;
        inflight = null;
      });

    return inflight;
  }

  const needsMigration = computed(() => loaded.value && !guestSchemaReady.value);

  return {
    loaded,
    loading,
    error,
    apiReachable,
    guestMaxUploads,
    guestMaxFreeDownloads,
    demoCheckoutEnabled,
    paymentProvider,
    paddle,
    guestSchemaReady,
    brand,
    uploadDefaults,
    pricing,
    apaDefaults,
    ads,
    needsMigration,
    bootstrap,
  };
});
