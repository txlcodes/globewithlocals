import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getItinerary, getItinerarySlugs, ITINERARY_COUNTRIES } from '@/lib/itineraries';
import ItineraryClient from '@/components/ItineraryClient';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:3001';

export const revalidate = 3600;

interface Props {
  params: Promise<{ country: string; slug: string }>;
}

// A literal "itineraries" segment beats the [city] catch-all at the same depth,
// so /japan/itineraries/7-days lands here and not on a city page for a city
// called "itineraries".
export async function generateStaticParams() {
  return ITINERARY_COUNTRIES.flatMap(country =>
    getItinerarySlugs(country).map(slug => ({ country, slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country, slug } = await params;
  const data = getItinerary(country, slug);
  if (!data) return { title: 'Itinerary Not Found | GlobeWithLocals' };

  const url = `https://globewithlocals.com/${country.toLowerCase()}/itineraries/${slug}`;
  return {
    title: data.metaTitle,
    description: data.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: data.metaTitle,
      description: data.metaDescription,
      url,
      type: 'article',
    },
  };
}

/**
 * Pull the tours this itinerary links to, so each day can show a real card.
 * One small request per linked tour: the old approach downloaded the whole
 * country's tour list (megabytes once a country has thousands of tours) on every
 * cache miss, which is what exhausts the 512 MB instance.
 */
async function fetchToursBySlug(_country: string, slugs: string[]) {
  const wanted = [...new Set(slugs.map(s => s.split('/').pop()).filter(Boolean))] as string[];
  const bySlug: Record<string, any> = {};
  await Promise.all(wanted.map(async slug => {
    try {
      const res = await fetch(`${API_URL}/api/public/tours/by-slug/${encodeURIComponent(slug)}`, {
        next: { revalidate: 3600 },
      });
      if (!res.ok) return;
      const t = (await res.json())?.tour;
      // A tour card failing to load must not take the whole guide down, and only
      // the fields the card renders are kept.
      if (t?.slug) bySlug[t.slug] = { slug: t.slug, title: t.title, duration: t.duration, pricePerPerson: t.pricePerPerson, images: t.images };
    } catch {}
  }));
  return bySlug;
}

export default async function ItineraryPage({ params }: Props) {
  const { country, slug } = await params;
  const data = getItinerary(country, slug);
  if (!data) notFound();

  const allTourUrls = data.days_detail.flatMap(d => d.tours);
  const tourMap = await fetchToursBySlug(country, allTourUrls);

  // TouristTrip is the type schema.org actually has for this, and it carries
  // the route as structured data rather than as prose an engine has to parse.
  // Article alone told a crawler nothing about the itinerary itself.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TouristTrip',
        name: data.title,
        description: data.quickAnswer || data.metaDescription,
        touristType: data.bestFor,
        itinerary: {
          '@type': 'ItemList',
          numberOfItems: data.days_detail.length,
          itemListElement: data.days_detail.map(d => ({
            '@type': 'ListItem',
            position: d.day,
            item: {
              '@type': 'TouristDestination',
              name: d.base,
              description: d.heading,
            },
          })),
        },
        provider: {
          '@type': 'Organization',
          name: 'GlobeWithLocals',
          url: 'https://globewithlocals.com',
        },
      },
      {
        '@type': 'Article',
        headline: data.title,
        description: data.metaDescription,
        author: { '@type': 'Organization', name: 'GlobeWithLocals' },
        publisher: { '@type': 'Organization', name: 'GlobeWithLocals' },
      },
      {
        '@type': 'FAQPage',
        mainEntity: data.faqs.map(f => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.answer },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ItineraryClient
        data={data}
        country={country}
        slug={slug}
        tourMap={tourMap}
        allSlugs={getItinerarySlugs(country)}
      />
    </>
  );
}
