import axios, { AxiosHeaders } from 'axios';
import { apiBaseURL } from '@/config/appConfig';

/**
 * URL base de Laravel (sin /api).
 * Ver src/config/appConfig.js (VITE_*, runtime-config.js, fallback apaflow.shop).
 */
export { apiBaseURL };

const laravelBaseURL = apiBaseURL;

if (import.meta.env.DEV && typeof window !== 'undefined') {
  const page = window.location.hostname;
  const apiHost = (() => {
    try {
      return new URL(laravelBaseURL).hostname;
    } catch {
      return '';
    }
  })();
  if (
    (page === 'localhost' && apiHost === '127.0.0.1') ||
    (page === '127.0.0.1' && apiHost === 'localhost')
  ) {
    // eslint-disable-next-line no-console
    console.warn(
      '[API] No mezcles localhost y 127.0.0.1: abre la SPA y define VITE_API_BASE_URL con el mismo host (p. ej. todo localhost:8000).',
    );
  }
}

/**
 * Lee la cookie XSRF (nombre con guiones seguro para RegExp).
 */
function readXsrfCookieValue(cookieName) {
  try {
    const safe = String(cookieName).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const m = typeof document !== 'undefined' && document.cookie.match(new RegExp(`(?:^|;\\s*)${safe}=([^;]*)`));
    return m ? decodeURIComponent(m[1].trim()) : null;
  } catch {
    return null;
  }
}

/**
 * Cliente HTTP único: Sanctum SPA (cookies + CSRF).
 * withXSRFToken: true → Axios envía X-XSRF-TOKEN cuando el puerto del API difiere del de la página (p. ej. :5173 → :8000 mismo host).
 * Interceptor: refuerzo si la cookie aún no está (carreras HMR / orden de peticiones).
 */
export const http = axios.create({
  baseURL: laravelBaseURL,
  withCredentials: true,
  withXSRFToken: true,
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  headers: {
    Accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
});

let sanctumReady = false;
let inflightCsrf = null;

export function resetSanctumSpaBootstrap() {
  sanctumReady = false;
  inflightCsrf = null;
}

/**
 * GET /sanctum/csrf-cookie deduplicado: una sola petición en vuelo y reutilización hasta reset/logout/forzar.
 * @param {{ force?: boolean }} options force=true invalida el estado y vuelve a pedir la cookie (p. ej. tras logout).
 */
export async function initSanctumSpaOnce(options = {}) {
  if (options.force) {
    resetSanctumSpaBootstrap();
  }
  if (sanctumReady) {
    return;
  }
  if (!inflightCsrf) {
    inflightCsrf = http
      .get('/sanctum/csrf-cookie')
      .then(() => {
        sanctumReady = true;
      })
      .finally(() => {
        inflightCsrf = null;
      });
  }
  await inflightCsrf;
}

/** @deprecated Usar initSanctumSpaOnce (misma semántica sin forzar). */
export async function fetchSanctumCsrfCookie() {
  return initSanctumSpaOnce();
}

http.interceptors.request.use(async (config) => {
  const method = (config.method || 'get').toLowerCase();
  if (!['post', 'put', 'patch', 'delete'].includes(method)) {
    return config;
  }

  const rel = String(config.url || '');
  if (rel.includes('/sanctum/csrf-cookie')) {
    return config;
  }

  const cookieName = config.xsrfCookieName ?? http.defaults.xsrfCookieName;
  const headerName = config.xsrfHeaderName ?? http.defaults.xsrfHeaderName;

  let token = readXsrfCookieValue(cookieName);
  if (!token) {
    await initSanctumSpaOnce({ force: false });
    token = readXsrfCookieValue(cookieName);
  }
  if (!token) {
    await initSanctumSpaOnce({ force: true });
    token = readXsrfCookieValue(cookieName);
  }

  if (token) {
    const headers = AxiosHeaders.from(config.headers);
    headers.set(headerName, token);
    config.headers = headers;
  }

  return config;
});

http.interceptors.response.use(
  (response) => response,
  async (error) => {
    const cfg = error?.config;
    const status = error?.response?.status;
    const method = (cfg?.method || 'get').toLowerCase();
    if (
      status === 419 &&
      cfg &&
      !cfg.__sanctumCsrfRetried &&
      ['post', 'put', 'patch', 'delete'].includes(method) &&
      !(cfg.data instanceof FormData)
    ) {
      cfg.__sanctumCsrfRetried = true;
      await initSanctumSpaOnce({ force: true });
      return http(cfg);
    }
    return Promise.reject(error);
  },
);

export default http;
