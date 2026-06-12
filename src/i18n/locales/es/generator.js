export default {
  seo: {
    title: 'Generador de Formato APA',
    description:
      'Sube tu documento Word y conviértelo a formato APA 7 automáticamente. Vista previa, descarga y planes Free o Pro.',
  },
  hero: {
    badge: 'Herramienta SaaS',
    title: 'Generador de Formato APA',
    subtitle:
      'Sube tu .docx, aplica reglas APA 7 y descarga el resultado. Funciona con cuenta free, invitado o plan Pro.',
    proSettings: 'Config APA (Pro)',
  },
  converter: {
    title: 'Conversor APA 7',
    subtitle:
      'Sube tu documento Word (.docx) y el motor aplicará formato APA 7: márgenes, tipografía Times New Roman 12, interlineado doble, títulos jerárquicos y paginación.',
  },
  modules: {
    apaGenerator: {
      label: 'Generador APA',
      shortLabel: 'Generador',
      description: 'Sube tu .docx y recíbelo formateado con reglas APA 7.',
    },
    guiaApa7: {
      label: 'Guía APA 7',
      shortLabel: 'Guía APA 7',
      description: 'Formato general: márgenes, tipografía, títulos e interlineado.',
    },
    referenciasApa: {
      label: 'Guía de referencias',
      shortLabel: 'Referencias',
      description: 'Citas en el texto y lista de referencias al final.',
    },
    tablasFiguras: {
      label: 'Tablas e imágenes',
      shortLabel: 'Tablas e imágenes',
      description: 'Numeración, títulos, notas y figuras según APA 7.',
    },
    apaSettings: {
      label: 'Configuración APA',
      shortLabel: 'Config APA',
      description: 'Personaliza márgenes, interlineado y encabezados (plan Pro).',
    },
  },
  account: {
    label: 'Tu cuenta',
    proActive: 'Conversiones ilimitadas con plan Pro activo.',
    trialActive: 'Periodo de prueba: acceso completo al conversor APA 7.',
    payPerDoc: 'Cada conversión cuesta {price}.',
    upgrade: 'Mejorar a Pro ({price}/mes)',
  },
  plans: {
    pro: 'Plan Pro',
    trial: 'Plan en prueba',
    free: 'Plan gratuito',
  },
  guest: {
    label: 'Modo invitado:',
    trialLeft: ' tienes 1 conversión gratuita sin cuenta.',
    trialUsedBefore: ' ya usaste tu prueba gratis. Al intentar de nuevo te llevamos al',
    trialUsedAfter: ' para elegir {docPrice} por documento o Pro {proPrice}/mes.',
    register: 'registro',
    docPrice: '$0.99',
    proPrice: '$5.99/mes',
  },
  upload: {
    title: 'Subir archivo',
    drag: 'Arrastra tu .docx aquí',
    click: 'o haz clic para seleccionar',
    converting: 'Convirtiendo…',
    convertFree: 'Convertir a APA 7 (1 gratis)',
    convert: 'Convertir a APA 7',
    docxOnly: 'Solo se permiten archivos .docx',
    selectFile: 'Selecciona un archivo .docx.',
  },
  documents: {
    titleAuth: 'Tus documentos',
    titleGuest: 'Tus conversiones',
    refresh: 'Actualizar',
    empty: 'Aún no hay documentos convertidos.',
    pay: 'Pagar {price}',
    downloadPaid: 'Descargar — $0.99',
    download: 'Descargar .docx',
  },
  status: {
    waitingPayment: 'Esperando pago',
    queued: 'En cola',
    processing: 'Procesando',
    ready: 'Listo',
    error: 'Error',
  },
  billing: {
    pending: 'Pago pendiente',
    paid: 'Pagado',
    includedPro: 'Incluido en Pro',
  },
  messages: {
    migration: 'El servidor necesita ejecutar las migraciones (php artisan migrate con PHP 8.2+).',
    loadFailed: 'No se pudieron cargar los documentos.',
    payToConvert: 'Documento recibido. Paga {price} para iniciar la conversión.',
    processing: 'Documento enviado. Procesando en segundo plano…',
    completePayment: 'Completa el pago de {price}.',
    uploadFailed: 'Error al subir el archivo.',
    proActivated: 'Plan Pro activado correctamente.',
    accountActivated: 'Cuenta activada correctamente.',
    paidProcessing: 'Pago confirmado. Procesando documento…',
    downloadFailed: 'No se pudo descargar el archivo.',
  },
};
