/**
 * Resolución de URLs: build (VITE_*), runtime (window.__APA_FLOW__) o dominio apaflow.shop.
 * Evita que un build sin .env.production siga llamando a localhost:8000 en producción.
 */

const PROD_API_BASE = 'https://api.apaflow.shop';
const PROD_SITE_URL = 'https://apaflow.shop';
const PRODUCTION_HOSTS = new Set(['apaflow.shop', 'www.apaflow.shop', 'admin.apaflow.shop']);

function readRuntime(key) {
  if (typeof window === 'undefined') {
    return undefined;
  }
  const value = window.__APA_FLOW__?.[key];
  return value ? String(value).trim() : undefined;
}

function stripTrailingSlash(url) {
  return String(url).replace(/\/$/, '');
}

function isLocalHostname(hostname) {
  return hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1';
}

function isLocalUrl(url) {
  try {
    return isLocalHostname(new URL(url).hostname);
  } catch {
    return true;
  }
}

function isProductionHost() {
  if (typeof window === 'undefined') {
    return false;
  }
  return PRODUCTION_HOSTS.has(window.location.hostname);
}

export function resolveApiBaseUrl() {
  const runtime = readRuntime('apiBaseUrl');
  if (runtime) {
    return stripTrailingSlash(runtime);
  }

  const fromEnv = import.meta.env.VITE_API_BASE_URL;
  const onProdHost = import.meta.env.PROD && isProductionHost();

  if (onProdHost && (!fromEnv || isLocalUrl(fromEnv))) {
    return PROD_API_BASE;
  }

  if (fromEnv) {
    return stripTrailingSlash(fromEnv);
  }

  return 'http://localhost:8000';
}

export function resolveSiteUrl() {
  const runtime = readRuntime('siteUrl');
  if (runtime) {
    return stripTrailingSlash(runtime);
  }

  const fromEnv = import.meta.env.VITE_SITE_URL;
  const onProdHost = import.meta.env.PROD && isProductionHost();

  if (onProdHost && (!fromEnv || isLocalUrl(fromEnv))) {
    return PROD_SITE_URL;
  }

  if (fromEnv) {
    return stripTrailingSlash(fromEnv);
  }

  return import.meta.env.DEV ? 'http://localhost:5173' : PROD_SITE_URL;
}

/** Base URL de Laravel (sin /api). */
export const apiBaseURL = resolveApiBaseUrl();

/** URL pública del sitio (SEO, canonical). */
export const siteUrl = resolveSiteUrl();

if (import.meta.env.PROD && typeof window !== 'undefined' && isProductionHost()) {
  const envApi = import.meta.env.VITE_API_BASE_URL;
  if (!envApi || isLocalUrl(envApi)) {
    // eslint-disable-next-line no-console
    console.info('[APA Flow] API de producción:', apiBaseURL);
  }
}
