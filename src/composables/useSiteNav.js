import { computed } from 'vue';
import { useI18n } from '@/composables/useI18n';

export function useSiteNav() {
  const { t, locale } = useI18n();

  const mainNav = computed(() => {
    locale.value;
    return [
    { label: t('nav.main.home'), to: '/', name: 'home' },
    { label: t('nav.main.guide'), to: '/guia-apa-7', name: 'guia-apa-7' },
    { label: t('nav.main.citations'), to: '/citas-apa', name: 'citas-apa' },
    { label: t('nav.main.references'), to: '/referencias-apa', name: 'referencias-apa' },
    { label: t('nav.main.examples'), to: '/ejemplos-apa', name: 'ejemplos-apa' },
    { label: t('nav.main.generator'), to: '/apa-generator', name: 'apa-generator', highlight: true },
    { label: t('nav.main.pricing'), to: '/precios', name: 'precios' },
    ];
  });

  const footerGuides = computed(() => {
    locale.value;
    return [
    { label: t('nav.main.guide'), to: '/guia-apa-7' },
    { label: t('nav.footer.cover'), to: '/portada-apa' },
    { label: t('nav.main.citations'), to: '/citas-apa' },
    { label: t('nav.main.references'), to: '/referencias-apa' },
    { label: t('nav.footer.tables'), to: '/tablas-figuras' },
    { label: t('nav.main.examples'), to: '/ejemplos-apa' },
    ];
  });

  const footerProduct = computed(() => {
    locale.value;
    return [
    { label: t('nav.footer.generatorFull'), to: '/apa-generator' },
    { label: t('nav.main.pricing'), to: '/precios' },
    { label: t('nav.footer.login'), to: '/login' },
    { label: t('nav.footer.register'), to: '/register' },
    ];
  });

  const footerLegal = computed(() => {
    locale.value;
    return [
    { label: t('nav.footer.privacy'), to: '/politica-privacidad' },
    { label: t('nav.footer.terms'), to: '/terminos-y-condiciones' },
    { label: t('nav.footer.subscriptions'), to: '/politica-suscripciones' },
    { label: t('nav.footer.cookies'), to: '/politica-cookies' },
    ];
  });

  const appModules = computed(() => {
    locale.value;
    return [
    {
      name: 'apa-generator',
      path: '/apa-generator',
      label: t('nav.modules.generator'),
      shortLabel: t('nav.modules.generatorShort'),
      description: t('nav.modules.generatorDesc'),
    },
    {
      name: 'guia-apa-7',
      path: '/guia-apa-7',
      label: t('nav.modules.guide'),
      shortLabel: t('nav.modules.guideShort'),
      description: t('nav.modules.guideDesc'),
    },
    {
      name: 'referencias-apa',
      path: '/referencias-apa',
      label: t('nav.modules.references'),
      shortLabel: t('nav.modules.referencesShort'),
      description: t('nav.modules.referencesDesc'),
    },
    {
      name: 'tablas-figuras',
      path: '/tablas-figuras',
      label: t('nav.modules.tables'),
      shortLabel: t('nav.modules.tablesShort'),
      description: t('nav.modules.tablesDesc'),
    },
    {
      name: 'app-apa-settings',
      path: '/app/configuracion-apa',
      label: t('nav.modules.settings'),
      shortLabel: t('nav.modules.settingsShort'),
      description: t('nav.modules.settingsDesc'),
    },
    ];
  });

  return { mainNav, footerGuides, footerProduct, footerLegal, appModules };
}
