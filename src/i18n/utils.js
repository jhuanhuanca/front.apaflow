const LOCALE_STORAGE_KEY = 'apa-flow-locale';

export function resolvePath(messages, key) {
  return key.split('.').reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : undefined), messages);
}

export function interpolate(template, params = {}) {
  if (typeof template !== 'string') return template;
  return template.replace(/\{(\w+)\}/g, (_, name) => (params[name] !== undefined ? String(params[name]) : `{${name}}`));
}

/**
 * @deprecated Usar useLocaleStore().t (computed) vía useI18n().
 */
export function createTranslator(localeRef, messagesRef) {
  function t(key, params) {
    void localeRef.value;
    const value = resolvePath(messagesRef.value, key);
    if (typeof value === 'string') return interpolate(value, params);
    return key;
  }

  function tm(key) {
    void localeRef.value;
    const value = resolvePath(messagesRef.value, key);
    return value ?? {};
  }

  return { t, tm };
}

export function readStoredLocale() {
  try {
    const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
    if (stored === 'en' || stored === 'es') return stored;
  } catch {
    /* noop */
  }
  return 'es';
}

export function persistLocale(locale) {
  try {
    localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    /* noop */
  }
}

export function applyDocumentLocale(locale) {
  document.documentElement.lang = locale === 'en' ? 'en' : 'es';
}

export { LOCALE_STORAGE_KEY };
