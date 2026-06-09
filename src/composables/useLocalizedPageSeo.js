import { watchEffect } from 'vue';
import { useHead } from '@unhead/vue';
import { useI18n } from '@/composables/useI18n';
import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from '@/constants/siteSeo';

export function useLocalizedPageSeo({
  titleKey,
  descriptionKey,
  path = '/',
  ogType = 'website',
  jsonLd = null,
  noIndex = false,
}) {
  const { t, locale } = useI18n();

  watchEffect(() => {
    const title = t(titleKey);
    const description = t(descriptionKey);
    const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
    const canonical = `${SITE_URL.replace(/\/$/, '')}${path.startsWith('/') ? path : `/${path}`}`;
    const ogLocale = locale.value === 'en' ? 'en_US' : 'es_ES';
    const ld = typeof jsonLd === 'function' ? jsonLd() : jsonLd?.value ?? jsonLd;

    useHead({
      title: fullTitle,
      meta: [
        { name: 'description', content: description },
        { name: 'robots', content: noIndex ? 'noindex, nofollow' : 'index, follow' },
        { property: 'og:type', content: ogType },
        { property: 'og:site_name', content: SITE_NAME },
        { property: 'og:title', content: fullTitle },
        { property: 'og:description', content: description },
        { property: 'og:url', content: canonical },
        { property: 'og:image', content: DEFAULT_OG_IMAGE },
        { property: 'og:locale', content: ogLocale },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: fullTitle },
        { name: 'twitter:description', content: description },
        { name: 'twitter:image', content: DEFAULT_OG_IMAGE },
      ],
      link: [{ rel: 'canonical', href: canonical }],
      script: ld ? [{ type: 'application/ld+json', innerHTML: JSON.stringify(ld) }] : [],
    });
  });
}

export function localizedArticleJsonLd({ title, description, path, datePublished = '2026-01-01' }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url: `${SITE_URL.replace(/\/$/, '')}${path}`,
    datePublished,
    author: { '@type': 'Organization', name: SITE_NAME },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: { '@type': 'ImageObject', url: DEFAULT_OG_IMAGE },
    },
  };
}

export function localizedFaqJsonLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}

export function localizedSoftwareJsonLd(description) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'APA Format Generator — APA Flow',
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description,
  };
}
