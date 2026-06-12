/**
 * Utilidades compartidas para checkout Paddle (redirect hosted checkout).
 */

export function parsePaddleInitiateResponse(data) {
  const checkoutUrl = data?.checkout_url ?? data?.checkout?.checkout_url ?? null;
  const success = data?.success === true || (data?.success !== false && Boolean(checkoutUrl));
  const error = data?.error ?? data?.message ?? null;

  return {
    success,
    checkoutUrl,
    error,
    paymentId: data?.payment?.id ?? null,
    raw: data,
  };
}

export function extractPaddleTransactionId(checkoutUrl) {
  if (!checkoutUrl || typeof checkoutUrl !== 'string') {
    return null;
  }
  try {
    const url = new URL(checkoutUrl, window.location.origin);
    return url.searchParams.get('_ptxn');
  } catch {
    const match = checkoutUrl.match(/[?&]_ptxn=([^&]+)/);
    return match ? decodeURIComponent(match[1]) : null;
  }
}

export function redirectToPaddleCheckout(checkoutUrl) {
  if (!checkoutUrl || typeof checkoutUrl !== 'string') {
    throw new Error('No se recibió checkout_url de Paddle.');
  }

  const ptxn = extractPaddleTransactionId(checkoutUrl);
  if (ptxn) {
    const target = new URL(checkoutUrl, window.location.origin);
    if (target.origin === window.location.origin) {
      window.location.href = `${target.pathname}${target.search}${target.hash}`;
      return;
    }
  }

  window.location.href = checkoutUrl;
}

/**
 * Espera a que un documento esté listo para descargar (post-pago).
 */
export async function waitForDocumentDownloadReady(http, documentId, {
  intervalMs = 2500,
  maxAttempts = 60,
  onTick,
} = {}) {
  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    await new Promise((resolve) => {
      setTimeout(resolve, intervalMs);
    });

    const { data } = await http.get('/api/documents');
    const docs = Array.isArray(data) ? data : [];
    const doc = docs.find((d) => String(d.id) === String(documentId));
    onTick?.(doc);

    if (!doc) {
      continue;
    }

    if (doc.billing_status === 'paid' || doc.billing_status === 'included_in_pro') {
      if (doc.status === 'completed') {
        return doc;
      }
    }
  }

  throw new Error('El documento aún se está procesando. Vuelve a intentar la descarga en unos minutos.');
}
