/** Rutas donde NUNCA se muestran anuncios (experiencia limpia). */
export const ADS_BLOCKED_ROUTE_NAMES = new Set([
  'login',
  'register',
  'registration-checkout',
  'apa-generator',
  'app-apa-settings',
  'admin-login',
  'admin-dashboard',
  'admin-users',
  'admin-universities',
  'admin-careers',
  'admin-content-categories',
  'admin-document-templates',
  'admin-payments',
  'admin-ai',
  'admin-ads',
]);

/** Ubicaciones de placement (paridad backend). */
export const AD_LOCATIONS = {
  HOME_TOP: 'home_top',
  HOME_MID: 'home_mid',
  HOME_PRE_FOOTER: 'home_pre_footer',
  GUIDE_TOP: 'guide_top',
  GUIDE_INLINE: 'guide_inline',
  GUIDE_BOTTOM: 'guide_bottom',
  GUIDE_SIDEBAR: 'guide_sidebar',
  FOOTER: 'footer',
};

/** Etiquetas demo por defecto. */
export const AD_DEMO_LABELS = {
  banner: 'Espacio publicitario',
  inline: 'Anuncio patrocinado',
  sidebar: 'Publicidad',
  footer: 'Anuncio patrocinado',
};
