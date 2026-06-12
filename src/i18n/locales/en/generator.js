export default {
  seo: {
    title: 'APA Format Generator',
    description:
      'Upload your Word document and convert it to APA 7 format automatically. Preview, download, and choose Free or Pro plans.',
  },
  hero: {
    badge: 'SaaS tool',
    title: 'APA Format Generator',
    subtitle:
      'Upload your .docx, apply APA 7 rules, and download the result. Works with a free account, guest mode, or Pro plan.',
    proSettings: 'APA settings (Pro)',
  },
  converter: {
    title: 'APA 7 Converter',
    subtitle:
      'Upload your Word document (.docx) and the engine will apply APA 7 formatting: margins, Times New Roman 12 typography, double spacing, heading hierarchy, and pagination.',
  },
  modules: {
    apaGenerator: {
      label: 'APA Generator',
      shortLabel: 'Generator',
      description: 'Upload your .docx and receive it formatted with APA 7 rules.',
    },
    guiaApa7: {
      label: 'APA 7 Guide',
      shortLabel: 'APA 7 Guide',
      description: 'General formatting: margins, typography, headings, and line spacing.',
    },
    referenciasApa: {
      label: 'References guide',
      shortLabel: 'References',
      description: 'In-text citations and the reference list at the end.',
    },
    tablasFiguras: {
      label: 'Tables and figures',
      shortLabel: 'Tables & figures',
      description: 'Numbering, titles, notes, and figures according to APA 7.',
    },
    apaSettings: {
      label: 'APA settings',
      shortLabel: 'APA config',
      description: 'Customize margins, line spacing, and headers (Pro plan).',
    },
  },
  account: {
    label: 'Your account',
    proActive: 'Unlimited conversions with active Pro plan.',
    trialActive: 'Trial period: full access to the APA 7 converter.',
    payPerDoc: 'Each conversion costs {price}.',
    upgrade: 'Upgrade to Pro ({price}/month)',
  },
  plans: {
    pro: 'Pro plan',
    trial: 'Trial plan',
    free: 'Free plan',
  },
  guest: {
    label: 'Guest mode:',
    trialLeft: ' you have 1 free conversion without an account.',
    trialUsedBefore: ' you already used your free trial. On your next attempt we will take you to',
    trialUsedAfter: ' to choose {docPrice} per document or Pro {proPrice}/month.',
    register: 'sign up',
    docPrice: '$0.99',
    proPrice: '$5.99/month',
  },
  upload: {
    title: 'Upload file',
    drag: 'Drag your .docx here',
    click: 'or click to select',
    converting: 'Converting…',
    convertFree: 'Convert to APA 7 (1 free)',
    convert: 'Convert to APA 7',
    docxOnly: 'Only .docx files are allowed',
    selectFile: 'Select a .docx file.',
  },
  documents: {
    titleAuth: 'Your documents',
    titleGuest: 'Your conversions',
    refresh: 'Refresh',
    empty: 'No converted documents yet.',
    pay: 'Pay {price}',
    downloadPaid: 'Download — $0.99',
    download: 'Download .docx',
    retry: 'Retry conversion',
  },
  status: {
    waitingPayment: 'Waiting for payment',
    queued: 'Queued',
    processing: 'Processing',
    ready: 'Ready',
    error: 'Error',
  },
  billing: {
    pending: 'Payment pending',
    paid: 'Paid',
    includedPro: 'Included in Pro',
  },
  messages: {
    migration: 'The server needs to run migrations (php artisan migrate with PHP 8.2+).',
    loadFailed: 'Could not load documents.',
    payToConvert: 'Document received. Pay {price} to start conversion.',
    processing: 'Document sent. Processing in the background…',
    completePayment: 'Complete payment of {price}.',
    uploadFailed: 'Error uploading file.',
    proActivated: 'Pro plan activated successfully.',
    accountActivated: 'Account activated successfully.',
    paidProcessing: 'Payment confirmed. Processing document…',
    retryQueued: 'Conversion re-queued. Wait a few seconds and tap Refresh.',
    retryFailed: 'Could not retry conversion.',
    downloadFailed: 'Could not download file.',
  },
};
