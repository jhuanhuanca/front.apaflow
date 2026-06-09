import { storeToRefs } from 'pinia';
import { useLocaleStore } from '@/stores/locale';

/**
 * Traducciones reactivas: t/tm son computed en el store y se recrean al cambiar locale.
 */
export function useI18n() {
  const store = useLocaleStore();
  const { locale, isEn, isEs, t: tFn, tm: tmFn } = storeToRefs(store);

  function t(key, params) {
    return tFn.value(key, params);
  }

  function tm(key) {
    return tmFn.value(key);
  }

  return {
    locale,
    isEn,
    isEs,
    t,
    tm,
    setLocale: store.setLocale,
  };
}
