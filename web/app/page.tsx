import { Metadata } from 'next';
import HomepageClient from '@/components/HomepageClient';

// The homepage was fully static with no revalidate, so it shipped a build-time
// prerender served under `s-maxage=31536000` and never regenerated at runtime.
// That left production serving pre-language-switcher HTML long after the switcher
// was deployed. An hourly revalidate keeps the route regenerating.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'GlobeWithLocals - Authentic Local Tours & Experiences Worldwide | Verified Local Guides',
  description: 'Discover authentic local tours and experiences around the world. Book with verified local guides in Italy, Spain, Greece, Turkey, Portugal, France and more. Skip-the-line landmarks, food and wine walks, old-town walking tours and private day trips.',
  alternates: {
    canonical: 'https://www.globewithlocals.com',
  },
};

export default function HomePage() {
  // Server-side JSON-LD — guaranteed in raw HTML for all crawlers (Googlebot, ChatGPT, Perplexity, Gemini)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://www.globewithlocals.com/#organization',
        name: 'GlobeWithLocals',
        url: 'https://www.globewithlocals.com',
        description: 'GlobeWithLocals connects travelers with verified, licensed local guides around the world. Book skip-the-line landmark tours, food and wine walks, old-town walking tours and private day trips in Italy, Spain, Greece, Turkey, Portugal, France and more.',
        foundingDate: '2024',
        areaServed: [
    { '@type': 'Country', name: 'Italy' },
    { '@type': 'Country', name: 'Spain' },
    { '@type': 'Country', name: 'Greece' },
    { '@type': 'Country', name: 'Turkey' },
    { '@type': 'Country', name: 'Portugal' },
    { '@type': 'Country', name: 'France' },
    { '@type': 'Country', name: 'Netherlands' },
    { '@type': 'Country', name: 'Czechia' },
    { '@type': 'Country', name: 'United Kingdom' },
    { '@type': 'Country', name: 'Croatia' },
    { '@type': 'Country', name: 'Austria' },
    { '@type': 'Country', name: 'Hungary' },
    { '@type': 'Country', name: 'Germany' },
  ],
        knowsAbout: ['Guided Tours', 'Cultural Experiences', 'Heritage Walks', 'Food Tours', 'Local Guides', 'Europe Travel', 'World Travel'],
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer service',
          availableLanguage: ['English'],
        },
      },
      {
        '@type': 'WebSite',
        '@id': 'https://www.globewithlocals.com/#website',
        name: 'GlobeWithLocals',
        url: 'https://www.globewithlocals.com',
        description: 'Discover authentic local tours and experiences worldwide with verified local guides.',
        publisher: { '@id': 'https://www.globewithlocals.com/#organization' },
        // No SearchAction: the site has no /search route, and the template URL
        // sat in GSC as a 404 for months.
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomepageClient />
    </>
  );
}
