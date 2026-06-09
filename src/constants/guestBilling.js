/**
 * Claves localStorage / sessionStorage del flujo invitado (frontend).
 * Los límites numéricos vienen de GET /api/config (store clientConfig).
 */
export const GUEST_PROCESS_KEY = 'guest_trial_process_v1';
export const GUEST_DOWNLOAD_KEY = 'guest_trial_download_v1';
export const PENDING_DOC_KEY = 'pending_guest_doc_id';
export const SELECTED_PLAN_KEY = 'register_selected_plan';

export const PLAN_PAY_PER_DOWNLOAD = 'pay-per-download';
export const PLAN_PREMIUM = 'premium';

/** Fallback si aún no cargó /api/config. */
export const GUEST_MAX_FREE_FALLBACK = 1;

export function readGuestProcessCount() {
  try {
    return parseInt(localStorage.getItem(GUEST_PROCESS_KEY) || '0', 10) || 0;
  } catch {
    return 0;
  }
}

export function readGuestDownloadCount() {
  try {
    return parseInt(localStorage.getItem(GUEST_DOWNLOAD_KEY) || '0', 10) || 0;
  } catch {
    return 0;
  }
}

/**
 * @param {number} maxDownloads Límite desde clientConfig.guestMaxFreeDownloads
 */
export function guestDownloadNeedsUpgrade(maxDownloads = GUEST_MAX_FREE_FALLBACK) {
  return readGuestDownloadCount() >= maxDownloads;
}

/**
 * @param {number} maxUploads Límite desde clientConfig.guestMaxUploads
 */
export function guestProcessNeedsPaywall(maxUploads = GUEST_MAX_FREE_FALLBACK) {
  return readGuestProcessCount() >= maxUploads;
}

export function savePendingDocId(id) {
  try {
    sessionStorage.setItem(PENDING_DOC_KEY, String(id));
  } catch {
    /* noop */
  }
}

export function readPendingDocId() {
  try {
    const v = sessionStorage.getItem(PENDING_DOC_KEY);
    return v != null && String(v).trim() !== '' ? String(v) : null;
  } catch {
    return null;
  }
}

export function clearPendingDocId() {
  try {
    sessionStorage.removeItem(PENDING_DOC_KEY);
  } catch {
    /* noop */
  }
}

/** @deprecated Usar guestMaxUploads del store clientConfig */
export const GUEST_MAX_FREE = GUEST_MAX_FREE_FALLBACK;

/** @deprecated Usar guestDownloadNeedsUpgrade(max) */
export function guestDownloadNeedsUpgradeLegacy() {
  return guestDownloadNeedsUpgrade(GUEST_MAX_FREE_FALLBACK);
}
