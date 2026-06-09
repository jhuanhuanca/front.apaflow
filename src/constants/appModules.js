/** Módulos del panel de cliente y accesos rápidos del generador. */
export const APP_MODULES = [
  {
    name: 'apa-generator',
    path: '/apa-generator',
    label: 'Generador APA',
    shortLabel: 'Generador',
    description: 'Sube tu .docx y recíbelo formateado con reglas APA 7.',
  },
  {
    name: 'guia-apa-7',
    path: '/guia-apa-7',
    label: 'Guía APA 7',
    shortLabel: 'Guía APA 7',
    description: 'Formato general: márgenes, tipografía, títulos e interlineado.',
  },
  {
    name: 'referencias-apa',
    path: '/referencias-apa',
    label: 'Guía de referencias',
    shortLabel: 'Referencias',
    description: 'Citas en el texto y lista de referencias al final.',
  },
  {
    name: 'tablas-figuras',
    path: '/tablas-figuras',
    label: 'Tablas e imágenes',
    shortLabel: 'Tablas e imágenes',
    description: 'Numeración, títulos, notas y figuras según APA 7.',
  },
  {
    name: 'app-apa-settings',
    path: '/app/configuracion-apa',
    label: 'Configuración APA',
    shortLabel: 'Config APA',
    description: 'Personaliza márgenes, interlineado y encabezados (plan Pro).',
    premium: true,
  },
];

export const DEFAULT_UPLOAD_UNIVERSITY = 'General';
export const DEFAULT_UPLOAD_CAREER = 'Formateo APA 7';
