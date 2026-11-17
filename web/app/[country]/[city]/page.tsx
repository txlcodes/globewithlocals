import { Metadata } from 'next';
import { imageLoader } from '@/lib/imageLoader';
import { notFound } from 'next/navigation';
import CityPageClient from '@/components/CityPageClient';
import { CITY_URL_MAP, VALID_COUNTRIES } from '@/lib/cityCountryMap';
import { countryDisplayName } from '@/lib/countryName';
import { getTourReviews } from '@/lib/tourReviews';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:3001';

// Cache the rendered page for 60s — bypasses the 2MB fetch cache limit
export const revalidate = 900;

interface Props {
  params: Promise<{ country: string; city: string }>;
}

function capitalize(str: string) {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// City-specific SEO titles and descriptions (must match client component)
const CITY_META: Record<string, { title: string; description: string }> = {};

// Pre-render priority city pages at build time for fastest TTFB
export async function generateStaticParams() {
  return [];
}

/** Number of approved tours for a city — drives whether the page is indexable. */
async function countApprovedTours(countryName: string, cityName: string): Promise<number> {
  try {
    const res = await fetch(
      // limit=1: only the total is needed here (the API's `count` is always the full total), and
      // the unbounded form pulled a whole city's list (3.8MB for Rome) on every metadata build.
      `${API_URL}/api/public/tours?country=${encodeURIComponent(countryName)}&city=${encodeURIComponent(cityName)}&status=approved&limit=1`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return 0;
    const data = await res.json();
    if (!data?.success) return 0;
    if (typeof data.count === 'number') return data.count;
    const list = Array.isArray(data.tours)
      ? data.tours
      : Array.isArray(data.tours?.tours)
        ? data.tours.tours
        : [];
    return list.length;
  } catch {
    // On a backend hiccup, fall through to "no tours" -> noindex rather than
    // publishing a page we cannot confirm has content.
    return 0;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country, city } = await params;
  const cityName = capitalize(city);
  const countryName = countryDisplayName(country);
  const meta = CITY_META[cityName];
  const title = meta?.title || `Guided Tours & Things to Do in ${cityName} | GlobeWithLocals`;
  const description = meta?.description || `Discover the best tours in ${cityName} with licensed local guides. Book authentic experiences in ${cityName}, ${countryName}.`;
  // Index a city page only if it actually has approved tours. This used to be a
  // hardcoded whitelist, which drifted badly as supply changed: 14 cities with
  // live tours (Udaipur, Jodhpur, Bengaluru, Jaisalmer, Varanasi...) were being
  // noindexed, while 9 empty cities stayed indexable as thin pages. Deriving it
  // from the live tour count keeps it correct on its own.
  //
  // 2026-08-26: the fail-closed catch (fetch hiccup -> 0 -> noindex) bit us: a
  // Render cold-start during render noindexed Kyoto and Osaka, and ISR cached
  // the bad verdict — GSC then dropped live cities from the index. Cities with
  // established supply must never be noindexed by a transient fetch failure;
  // the dynamic count still governs everything outside this floor.
  const ALWAYS_INDEX_CITIES = new Set<string>();
  const noIndex = ALWAYS_INDEX_CITIES.has(city.toLowerCase())
    ? false
    : (await countApprovedTours(countryName, cityName)) === 0;

  return {
    title,
    description,
    alternates: {
      canonical: `https://globewithlocals.com/${country.toLowerCase()}/${city.toLowerCase()}`,
    },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      title,
      description,
      url: `https://globewithlocals.com/${country.toLowerCase()}/${city.toLowerCase()}`,
      siteName: 'GlobeWithLocals',
      type: 'website',
    },
  };
}

const CITY_PAGE_TOUR_CAP = 200;

export default async function CityPage({ params }: Props) {
  const { country, city } = await params;

  // Without this the route rendered 200 for any /<anything>/<anything>, so every
  // city page was reachable under every country and a single spammed link could
  // mint a fresh indexable duplicate. Known cities under the wrong country are
  // 308-redirected in middleware.ts before they ever reach here; this catches
  // the rest. See lib/cityCountryMap.ts for the source of truth.
  if (!VALID_COUNTRIES.has(country.toLowerCase()) && !CITY_URL_MAP[city.toLowerCase()]) {
    notFound();
  }

  const cityName = capitalize(city);
  const countryName = countryDisplayName(country);

  let tours: any[] = [];
  try {
    const res = await fetch(
      // Capped page of the city (oldest first = its best-selling listings). A single city can hold
      // thousands of tours; rendering all of them in one server component exhausted the 512MB
      // instance and took the whole site down with 502s. `count` in the response is the true total.
      `${API_URL}/api/public/tours?country=${encodeURIComponent(countryName)}&city=${encodeURIComponent(cityName)}&status=approved&limit=${CITY_PAGE_TOUR_CAP}`,
      // 'no-store' here opted the whole route out of static rendering, so every
      // city page view hit the backend live (TTFB ~1.4s). Listings are ~70-140KB,
      // well under the 2MB fetch-cache limit, so ISR can cache them properly.
      { next: { revalidate: 900 } }
    );
    if (res.ok) {
      const data = await res.json();
      if (data.success) {
        let toursArray: any[] = [];
        if (Array.isArray(data.tours)) {
          toursArray = data.tours;
        } else if (data.tours && typeof data.tours === 'object') {
          if (Array.isArray(data.tours.tours)) {
            toursArray = data.tours.tours;
          }
        }
        // Only send fields the listing page actually uses — keeps payload small & ISR-cacheable
        tours = toursArray.map((tour: any) => {
          // Real review figures only. Cards and schema used to invent a rating
          // from the tour id, which is exactly the fake signal Google penalises.
          // Summary columns come with the list (tours.review_avg / review_count). The hardcoded
          // per-slug maps are only a fallback for rows that predate the columns.
          const dbCount = Number(tour.reviewCount) || 0;
          const rv = dbCount > 0 ? null : getTourReviews(tour.slug);
          return {
          id: tour.id,
          supplierId: tour.supplierId ? String(tour.supplierId) : null,
          rating: dbCount > 0 ? tour.reviewAvg : (rv && rv.totalReviews > 0 ? rv.averageRating : null),
          reviewCount: dbCount > 0 ? dbCount : (rv && rv.totalReviews > 0 ? rv.totalReviews : 0),
          title: tour.title,
          slug: tour.slug || `tour-${tour.id}`,
          city: tour.city,
          country: tour.country,
          category: tour.category,
          duration: tour.duration,
          pricePerPerson: tour.pricePerPerson,
          currency: tour.currency,
          status: tour.status,
          // The card only searches the description and only tests included for
          // "skip"/"pickup", so ship the short form. Ubud's 600 tours were a
          // 1.6MB RSC payload with the full fields.
          shortDescription: typeof tour.shortDescription === 'string' ? tour.shortDescription.slice(0, 160) : tour.shortDescription,
          included: typeof tour.included === 'string'
            ? [/skip/i.test(tour.included) ? 'skip' : '', /pickup/i.test(tour.included) ? 'pickup' : ''].filter(Boolean).join(' ')
            : tour.included,
          meetingPoint: tour.meetingPoint ? 'yes' : tour.meetingPoint,
          tourTypes: tour.tourTypes,
          // Drop base64 blobs
          images: Array.isArray(tour.images)
            ? tour.images
                .map((img: any) => (typeof img === 'string' && img.startsWith('data:') ? '' : img))
                .filter(Boolean)
                .slice(0, 2)
            : tour.images,
          // The card only needs the 1-person price: keep the first tier of each
          // option instead of the whole 20-row ladder (1KB per tour).
          options: Array.isArray(tour.options)
            ? tour.options.map((opt: any) => {
                let first: any = null;
                try {
                  const tiers = typeof opt.groupPricingTiers === 'string' ? JSON.parse(opt.groupPricingTiers) : opt.groupPricingTiers;
                  if (Array.isArray(tiers) && tiers.length) first = [tiers[0]];
                } catch {}
                return { title: opt.title, pricePerPerson: opt.pricePerPerson, groupPricingTiers: first };
              })
            : tour.options,
          };
        });
      }
    }
  } catch (e) {
    console.error('Failed to fetch tours:', e);
  }

  // ---------- SERVER-SIDE JSON-LD (guaranteed in raw HTML for SEO/AEO/GEO) ----------
  const citySlug = city.toLowerCase();
  const countrySlug = country.toLowerCase();
  const cityPageUrl = `https://globewithlocals.com/${countrySlug}/${citySlug}`;
  const metaInfo = CITY_META[cityName];
  const cityTitle = metaInfo?.title || `${cityName} Tours & Things to Do | Guided Experiences by Locals`;
  const cityDescription = metaInfo?.description || `Discover the best tours in ${cityName} with licensed local guides. Book authentic experiences in ${cityName}, ${countryName}.`;
  const cityOgImage = tours.find(t => t.images?.[0])?.images?.[0] || 'https://globewithlocals.com/favicon-96x96-v7.png';
  const todayISO = new Date().toISOString().split('T')[0];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        name: cityTitle,
        description: cityDescription,
        url: cityPageUrl,
        inLanguage: 'en',
        datePublished: '2025-01-01',
        dateModified: todayISO,
        isPartOf: { '@type': 'WebSite', name: 'GlobeWithLocals', url: 'https://globewithlocals.com' },
        publisher: { '@type': 'Organization', name: 'GlobeWithLocals', url: 'https://globewithlocals.com' },
        speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.space-y-4.text-gray-700', 'h2', 'h3'] },
        about: { '@type': 'City', name: cityName, containedIn: { '@type': 'Country', name: countryName } },
      },
      {
        '@type': 'TravelAgency',
        name: `GlobeWithLocals - ${cityName} Tours`,
        description: cityDescription,
        url: cityPageUrl,
        image: cityOgImage,
        address: { '@type': 'PostalAddress', addressLocality: cityName, addressCountry: countryName },
        areaServed: { '@type': 'City', name: cityName, containedIn: { '@type': 'Country', name: countryName } },
      },
      {
        '@type': 'TourOperator',
        name: 'GlobeWithLocals',
        url: 'https://globewithlocals.com',
        description: `Discover expert-led tours in ${cityName} with licensed local guides. Book authentic, small-group experiences with GlobeWithLocals.`,
        areaServed: { '@type': 'City', name: cityName, containedIn: { '@type': 'Country', name: countryName } },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: `${cityName} Tours & Experiences`,
          itemListElement: tours.slice(0, 10).map((tour: any, idx: number) => ({
            '@type': 'Offer',
            position: idx + 1,
            itemOffered: { '@type': 'TouristTrip', name: tour.title, url: `${cityPageUrl}/${tour.slug || `tour-${tour.id}`}` },
          })),
        },
      },
      // ItemList for tour rich results
      ...(tours.length > 0 ? [{
        '@type': 'ItemList',
        name: `Best Tours in ${cityName}`,
        description: `Top-rated guided tours in ${cityName} by licensed local experts`,
        url: cityPageUrl,
        numberOfItems: tours.length,
        itemListElement: tours.map((tour: any, idx: number) => ({
          '@type': 'ListItem',
          position: idx + 1,
          url: `${cityPageUrl}/${tour.slug || `tour-${tour.id}`}`,
          name: tour.title,
        })),
      }] : []),
      // Product schema for every tour, but lean: no description or image, which
      // is what made 616 of them 530KB. Impressions count merchant-listing rich
      // results, so capping this to 100 cost visibility (2026-09-18).
      ...tours.map((tour: any) => {
        return {
          '@type': 'Product',
          name: tour.title,
          url: `${cityPageUrl}/${tour.slug || `tour-${tour.id}`}`,
          // One image URL per product: GSC flags merchant listings without it
          // as critical ("Missing field 'image'", 2026-09-20). One string is cheap.
          ...(() => { const im = Array.isArray(tour.images) ? tour.images[0] : (typeof tour.images === 'string' && tour.images.startsWith('[') ? (() => { try { return JSON.parse(tour.images)[0]; } catch { return undefined; } })() : tour.images); return im ? { image: imageLoader({ src: im, width: 640 }) } : {}; })(),
          brand: { '@type': 'Brand', name: 'GlobeWithLocals' },
          offers: { '@type': 'Offer', price: tour.pricePerPerson, priceCurrency: tour.currency || 'USD', availability: tour.status === 'approved' ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock', url: `${cityPageUrl}/${tour.slug || `tour-${tour.id}`}` },
          ...(tour.rating && tour.reviewCount > 0
            ? { aggregateRating: { '@type': 'AggregateRating', ratingValue: tour.rating.toFixed(1), reviewCount: tour.reviewCount, bestRating: '5' } }
            : {}),
        };
      }),
      // BreadcrumbList
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://globewithlocals.com' },
          { '@type': 'ListItem', position: 2, name: countryName, item: `https://globewithlocals.com/${countrySlug}` },
          { '@type': 'ListItem', position: 3, name: cityName, item: cityPageUrl },
        ],
      },
    ],
  };

  // ---------- FAQ (visible section + matching FAQPage schema), built only from real data ----------
  const pricedTours = tours.filter((t: any) => Number(t.pricePerPerson) > 0);
  const minPrice = pricedTours.length ? Math.min(...pricedTours.map((t: any) => Number(t.pricePerPerson))) : 0;
  const currencies = new Set(pricedTours.map((t: any) => t.currency || 'USD'));
  const priceCurrency = currencies.size === 1 ? Array.from(currencies)[0] : null;
  const topTitles = tours.slice(0, 3).map((t: any) => t.title).filter(Boolean);
  const faqs: { q: string; a: string }[] = [];
  if (tours.length > 0) {
    faqs.push({
      q: `What are the best tours in ${cityName}?`,
      a: `GlobeWithLocals lists ${tours.length} tours and experiences in ${cityName}, ${countryName}. Popular picks include ${topTitles.join('; ')}. Open any tour to see the itinerary, what is included, and traveller reviews.`,
    });
    if (minPrice > 0 && priceCurrency) {
      faqs.push({
        q: `How much do tours in ${cityName} cost?`,
        a: `Tours in ${cityName} start from ${priceCurrency === 'USD' ? '$' : priceCurrency + ' '}${Math.ceil(minPrice)} per person. Prices vary by tour length, group size and what is included, and each tour page shows the exact price for your group.`,
      });
    }
    faqs.push({
      q: `How do I book a tour in ${cityName}?`,
      a: `Choose a tour, pick your date and number of travellers, and check availability. You then pay securely online to complete the booking. Bookings need at least one day of notice.`,
    });
    faqs.push({
      q: `Are the reviews on ${cityName} tours real?`,
      a: `Yes. Ratings and review counts come from verified traveller reviews of each experience. Tours that do not have reviews yet are marked New and show no rating.`,
    });
  }
  if (faqs.length) {
    (jsonLd['@graph'] as any[]).push({
      '@type': 'FAQPage',
      mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    });
  }

  return (
    <>
      {/* Server-rendered JSON-LD — guaranteed in raw HTML for crawlers, AI engines, and Googlebot */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CityPageClient tours={tours} city={cityName} country={countryName} />
      {faqs.length > 0 && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-10" aria-label={`${cityName} tours FAQ`}>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently asked questions about {cityName} tours</h2>
          <div className="divide-y divide-gray-200 border border-gray-200 rounded-xl bg-white">
            {faqs.map((f) => (
              <details key={f.q} className="p-4 group">
                <summary className="cursor-pointer font-semibold text-gray-900">{f.q}</summary>
                <p className="mt-2 text-gray-700">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
