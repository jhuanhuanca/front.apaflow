import { useHead } from '@unhead/vue';
import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from '@/constants/siteSeo';

/**
 * Meta tags, Open Graph, canonical y JSON-LD por página.
 */
export function usePageSeo({
  title,
  description,
  path = '/',
  ogType = 'website',
  jsonLd = null,
  noIndex = false,
}) {
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const canonical = `${SITE_URL.replace(/\/$/, '')}${path.startsWith('/') ? path : `/${path}`}`;

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
      { property: 'og:locale', content: 'es_ES' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: fullTitle },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: DEFAULT_OG_IMAGE },
    ],
    link: [{ rel: 'canonical', href: canonical }],
    script: jsonLd
      ? [{ type: 'application/ld+json', innerHTML: JSON.stringify(jsonLd) }]
      : [],
  });
}

export function articleJsonLd({ title, description, path, datePublished = '2026-01-01' }) {
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

export function faqJsonLd(items) {
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

export function softwareJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Generador de Formato APA — APA Flow',
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description:
      'Herramienta web para aplicar formato APA 7 a documentos Word de forma automática.',
  };
}
