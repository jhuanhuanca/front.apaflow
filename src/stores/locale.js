import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';
import es from '@/i18n/locales/es';
import en from '@/i18n/locales/en';
import {
  applyDocumentLocale,
  interpolate,
  persistLocale,
  readStoredLocale,
  resolvePath,
} from '@/i18n/utils';

const catalogs = { es, en };

export const useLocaleStore = defineStore('locale', () => {
  const locale = ref(readStoredLocale());

  const messages = computed(() => catalogs[locale.value] ?? catalogs.es);

  /** Funciones de traducción recreadas al cambiar locale → re-render instantáneo. */
  const t = computed(() => {
    const msgs = messages.value;
    return (key, params) => {
      const value = resolvePath(msgs, key);
      if (typeof value === 'string') return interpolate(value, params);
      return key;
    };
  });

  const tm = computed(() => {
    const msgs = messages.value;
    return (key) => resolvePath(msgs, key) ?? {};
  });

  function setLocale(next) {
    if (!catalogs[next] || locale.value === next) return;
    locale.value = next;
    persistLocale(next);
    applyDocumentLocale(next);
  }

  watch(
    locale,
    (value) => {
      applyDocumentLocale(value);
    },
    { immediate: true },
  );

  return {
    locale,
    messages,
    isEn: computed(() => locale.value === 'en'),
    isEs: computed(() => locale.value === 'es'),
    t,
    tm,
    setLocale,
  };
});
