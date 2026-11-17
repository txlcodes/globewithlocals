import { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { CITY_URL_MAP } from '@/lib/cityCountryMap';
import { getCityInfoContent } from '@/lib/cityInfoContent';
import { EUROPE_GUIDES } from '@/lib/guides';
import { getTourSpecificFAQs } from '@/lib/tourFaqs';
import { getTourReviews } from '@/lib/tourReviews';
import Link from 'next/link';
import TourDetailClient from '@/components/TourDetailClient';
import CityInfoClient from '@/components/CityInfoClient';
import { countryDisplayName } from '@/lib/countryName';
import { imageLoader } from '@/lib/imageLoader';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:3001';

export const revalidate = 60;

interface Props {
  params: Promise<{ country: string; city: string; slug: string }>;
}

function capitalize(str: string) {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Detect supplier-written personal text that shouldn't be used as meta description
function isValidSeoDescription(text: string | null | undefined): boolean {
  if (!text || text.length < 30) return false;
  const lower = text.toLowerCase();
  // Reject personal/promotional supplier messages
  const badPatterns = [
    /\b(i will|with me|book your tour with|my tour|contact me|whatsapp|call me)\b/i,
    /\b(i ensure|i guarantee|i promise|book with me)\b/i,
  ];
  return !badPatterns.some(p => p.test(lower));
}

// Shorten a long tour title for meta tag (keep under 45 chars before " in City | Brand")
function shortenTitleForMeta(title: string): string {
  if (title.length <= 45) return title;
  // Remove common filler patterns that inflate tour titles
  let short = title
    .replace(/\s*–\s*.*/g, '') // Remove everything after em-dash
    .replace(/\s*—\s*.*/g, '') // Remove everything after em-dash
    .replace(/\s*\|\s*.*/g, '') // Remove everything after pipe
    .replace(/\s*\(.*?\)\s*/g, ' ') // Remove parenthetical text
    .replace(/\s+/g, ' ').trim();
  if (short.length <= 45) return short;
  // Truncate at last word boundary before 45 chars
  let truncated = short.substring(0, 45).replace(/\s+\S*$/, '').trim();
  // Remove dangling prepositions/conjunctions that make no sense at the end
  truncated = truncated.replace(/\s+(with|from|by|for|and|in|of|the|a|an|to|at|on|&)$/i, '').trim();
  return truncated;
}

// Use the tour's real description — Google already associates these keywords with the page
function buildMetaDescription(tour: any, cityName: string): string {
  // Use shortDescription directly — content-rich descriptions rank better than templated ones
  if (tour.shortDescription && tour.shortDescription.length > 30) {
    let desc = tour.shortDescription.replace(/\s+/g, ' ').trim();
    if (desc.length > 155) desc = desc.substring(0, 152).replace(/\s+\S*$/, '').trim() + '...';
    return desc;
  }
  // Fallback only for tours with no/bad description
  return `${tour.title} in ${cityName}. Book with a licensed local guide on GlobeWithLocals.`;
}

// Strip markdown (links, bold) from text for clean JSON-LD output
function stripMarkdown(text: string): string {
  return text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/\*\*/g, '');
}

// SEO title overrides — when the database title doesn't match the target keyword
// These override ONLY the meta title tag, not the on-page H1 (H1 comes from tour.title)
const DUPLICATE_CANONICAL_MAP: Record<string, string> = {};

const SEO_TITLE_OVERRIDES: Record<string, string> = {};

const SEO_DESCRIPTION_OVERRIDES: Record<string, string> = {};

function isInfoSlug(city: string, slug: string): boolean {
  const c = city.toLowerCase();
  if (EUROPE_GUIDES[c]) return EUROPE_GUIDES[c].some(g => g.slug === slug);
  return false;
}

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country, city, slug } = await params;
  const cityName = capitalize(city);

  if (isInfoSlug(city, slug)) {
    const infoContent = getCityInfoContent(slug);
    const fallbackTitle = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    const title = infoContent?.title || fallbackTitle;
    // Meta title is deliberately separate from the H1: it has ~60 chars before
    // Google truncates, and it needs to lead with the query, not the prose.
    const metaTitle = infoContent?.seoTitle || title;
    const description = infoContent?.description || `Essential guide: ${fallbackTitle}. Everything you need to know before visiting ${cityName}.`;
    return {
      title: `${metaTitle} | GlobeWithLocals`,
      description,
      alternates: {
        canonical: `https://globewithlocals.com/${country.toLowerCase()}/${city.toLowerCase()}/${slug}`,
      },
      openGraph: {
        title: `${metaTitle} | GlobeWithLocals`,
        description,
        url: `https://globewithlocals.com/${country.toLowerCase()}/${city.toLowerCase()}/${slug}`,
        siteName: 'GlobeWithLocals',
        type: 'article',
        // Social cards never need the untouched 0.73 MB original, and Next
        // preloads this URL, so pointing it at the original downloaded the full
        // file on every visit and threw it away.
        ...(infoContent?.heroImage
          ? { images: [{ url: imageLoader({ src: infoContent.heroImage, width: 1200 }) }] }
          : {}),
      },
    };
  }

  // Tour detail page — fetch tour for metadata
  try {
    const res = await fetch(`${API_URL}/api/public/tours/by-slug/${encodeURIComponent(slug)}`, {
      next: { revalidate: 60 },  // Tour payload is ~9KB; ISR-cache it instead of forcing the route dynamic
    });
    if (res.ok) {
      const data = await res.json();
      const tour = (data.success && data.tour) ? data.tour : (data.title ? data : null);
      if (tour) {
        // Always use CTR-optimized description with trust signals
        const description = SEO_DESCRIPTION_OVERRIDES[slug] || buildMetaDescription(tour, cityName);
        // Use SEO override title if available, otherwise shorten the database title
        const seoTitle = SEO_TITLE_OVERRIDES[slug];
        const shortTitle = seoTitle || shortenTitleForMeta(tour.title);
        // Avoid "Jaipur Tour in Jaipur" duplication
        const titleTag = seoTitle
          ? `${seoTitle} | GlobeWithLocals`
          : shortTitle.toLowerCase().includes(cityName.toLowerCase())
            ? `${shortTitle} | GlobeWithLocals`
            : `${shortTitle} in ${cityName} | GlobeWithLocals`;
        // Canonicalise to the tour's real country, not whatever country segment
        // the request used — otherwise a wrong-country URL declares itself canonical.
        const canonicalCountry = tour.country
          ? String(tour.country).toLowerCase().replace(/\s+/g, '-')
          : country.toLowerCase();
        // Duplicate-intent pages canonicalise to their champion slug (see map above)
        const canonicalSlug = DUPLICATE_CANONICAL_MAP[slug] || slug;
        return {
          title: titleTag,
          description,
          alternates: {
            canonical: `https://globewithlocals.com/${canonicalCountry}/${city.toLowerCase()}/${canonicalSlug}`,
          },
          openGraph: {
            title: titleTag,
            description,
            images: tour.images?.[0] ? [{ url: tour.images[0], width: 1200, height: 630, alt: tour.title }] : [],
          },
        };
      }
    }
  } catch (e) {}

  // Fallback (tour fetch failed or tour deleted): still honor the duplicate map —
  // without this, a deleted duplicate (a deleted duplicate) self-canonicalised and kept competing.
  return {
    title: `${cityName} Tour | GlobeWithLocals`,
    description: `Book tours in ${cityName} with licensed local guides.`,
    alternates: {
      canonical: `https://globewithlocals.com/${country.toLowerCase()}/${city.toLowerCase()}/${DUPLICATE_CANONICAL_MAP[slug] || slug}`,
    },
  };
}

export default async function SlugPage({ params }: Props) {
  const { country, city, slug } = await params;
  const cityName = capitalize(city);
  const countryName = countryDisplayName(country);
  const countrySlug = country.toLowerCase();
  const citySlug = city.toLowerCase();

  // City info page
  if (isInfoSlug(city, slug)) {
    // Build server-side JSON-LD from static info content
    const infoContent = getCityInfoContent(slug);
    // Pages that define their own jsonLd keep it; the rest (Bali, Japan round 2)
    // get an Article + FAQPage graph built from their faqs, so every guide
    // carries FAQ schema without hand-writing it per page.
    const infoJsonLd = infoContent?.jsonLd
      || (infoContent
        ? {
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'Article',
                headline: infoContent.title,
                description: infoContent.description,
                image: infoContent.heroImage,
                author: { '@type': 'Organization', name: 'GlobeWithLocals' },
                publisher: { '@type': 'Organization', name: 'GlobeWithLocals', url: 'https://globewithlocals.com' },
                mainEntityOfPage: `https://globewithlocals.com/${countrySlug}/${citySlug}/${slug}`,
              },
              ...(infoContent.faqs && infoContent.faqs.length > 0
                ? [{
                    '@type': 'FAQPage',
                    mainEntity: infoContent.faqs.slice(0, 8).map((f) => ({
                      '@type': 'Question',
                      name: f.q,
                      acceptedAnswer: { '@type': 'Answer', text: f.a },
                    })),
                  }]
                : []),
            ],
          }
        : null);

    return (
      <>
        {/* Server-rendered JSON-LD — guaranteed in raw HTML for crawlers & AI engines */}
        {infoJsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(infoJsonLd) }}
          />
        )}
        {/* BreadcrumbList JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://globewithlocals.com' },
              { '@type': 'ListItem', position: 2, name: countryName, item: `https://globewithlocals.com/${countrySlug}` },
              { '@type': 'ListItem', position: 3, name: cityName, item: `https://globewithlocals.com/${countrySlug}/${citySlug}` },
              { '@type': 'ListItem', position: 4, name: infoContent?.title || slug, item: `https://globewithlocals.com/${countrySlug}/${citySlug}/${slug}` },
            ],
          }) }}
        />
        <CityInfoClient country={countryName} city={cityName} slug={slug} data={infoContent} />
      </>
    );
  }

  // Tour detail page
  let tour = null;
  try {
    const res = await fetch(`${API_URL}/api/public/tours/by-slug/${encodeURIComponent(slug)}`, {
      next: { revalidate: 60 },  // Tour payload is ~9KB; ISR-cache it instead of forcing the route dynamic
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.tour) {
        tour = data.tour;
      } else if (data.title) {
        tour = data;
      }
      // Strip base64 images to keep response cacheable
      if (tour && Array.isArray(tour.images)) {
        tour.images = tour.images
          .map((img: any) => (typeof img === 'string' && img.startsWith('data:') ? '' : img))
          .filter(Boolean);
      }
    }
  } catch (e) {
    console.error('Failed to fetch tour:', e);
  }

  if (!tour) {
    notFound();
  }

  // The route accepts any country segment, so /india/pattaya/<slug> served the
  // same tour as /thailand/pattaya/<slug> — and self-canonicalised, giving Google
  // two "canonical" copies of every tour. Send the wrong-country variant to the
  // real one instead of serving a duplicate.
  // Same for the city: <city> used to bounce between
  // (this redirect) and middleware fixing the
  // country for a known city) — a loop GSC reported as "Redirect error".
  // Sending straight to the tour's own country AND city ends it.
  if (tour.country) {
    const realCountry = String(tour.country).toLowerCase().replace(/\s+/g, '-');
    const slugged = tour.city ? String(tour.city).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') : '';
    // Only trust the slugified city when it is a URL we actually serve.
    const realCity = slugged && CITY_URL_MAP[slugged] ? slugged : citySlug;
    if ((realCountry && realCountry !== countrySlug) || realCity !== citySlug) {
      // 308, not 307 — Google must retire the wrong URL, not keep it indexed.
      permanentRedirect(`/${realCountry || countrySlug}/${realCity || citySlug}/${slug}`);
    }
  }

  // ---------- SERVER-SIDE JSON-LD for Tour Detail (guaranteed in raw HTML) ----------
  const tourUrl = `https://globewithlocals.com/${countrySlug}/${citySlug}/${slug}`;
  const todayISO = new Date().toISOString().split('T')[0];

  // Build real itinerary from tour data
  const itineraryItems = Array.isArray(tour?.itineraryItems) && tour.itineraryItems.length > 0
    ? tour.itineraryItems
    : null;
  const itinerarySchema = itineraryItems
    ? {
        '@type': 'ItemList',
        description: `Guided tour itinerary in ${cityName}, ${countryName}`,
        numberOfItems: itineraryItems.length,
        itemListElement: itineraryItems.map((item: any, idx: number) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: item.title || `Stop ${idx + 1}`,
          ...(item.description ? { description: item.description } : {}),
        })),
      }
    : {
        '@type': 'ItemList',
        description: `Guided tour in ${cityName}, ${countryName}`,
        numberOfItems: 1,
        itemListElement: [{ '@type': 'ListItem', position: 1, name: tour?.title || 'Tour Experience' }],
      };

  // Get FAQs for this tour (from extracted lib/tourFaqs.ts)
  const tourFaqs = getTourSpecificFAQs(tour?.title || '', slug);
  const faqSchema = tourFaqs && tourFaqs.length > 0
    ? {
        '@type': 'FAQPage',
        mainEntity: tourFaqs.slice(0, 8).map((faq: { question: string; answer: string }) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: stripMarkdown(faq.answer),
          },
        })),
      }
    : null;

  // Get real reviews for this tour (for rich snippet review schema)
  // Hardcoded per-slug maps cover the older tours; everything imported later carries its
  // reviews in the tours.reviews column, exposed by the API as `reviewData`.
  const tourReviewData = getTourReviews(slug) || ((tour as any)?.reviewData ?? null);
  const reviewSchemas = tourReviewData && tourReviewData.reviews.length > 0
    ? tourReviewData.reviews.slice(0, 3).map((review) => ({
        '@type': 'Review',
        author: { '@type': 'Person', name: review.author },
        datePublished: review.date,
        reviewRating: { '@type': 'Rating', ratingValue: review.rating, bestRating: '5' },
        reviewBody: review.text,
      }))
    : undefined;

  // Build highlights as amenityFeature
  const highlights = Array.isArray(tour?.highlights) && tour.highlights.length > 0 ? tour.highlights : null;
  const amenityFeatures = highlights
    ? highlights.map((h: string) => ({ '@type': 'LocationFeatureSpecification', name: h, value: true }))
    : undefined;

  const tourJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      // Product schema — enables rich results with price + star ratings in Google SERPs
      {
        '@type': 'Product',
        name: tour?.title || 'Tour',
        description: tour?.shortDescription || '',
        image: tour?.images?.[0] || '',
        url: tourUrl,
        datePublished: '2025-01-01',
        dateModified: todayISO,
        brand: { '@type': 'Brand', name: 'GlobeWithLocals' },
        offers: {
          '@type': 'AggregateOffer',
          lowPrice: tour?.pricePerPerson || 0,
          highPrice: tour?.pricePerPerson || 0,
          offerCount: Array.isArray(tour?.options) && tour.options.length > 0 ? tour.options.length : 1,
          priceCurrency: tour?.currency || 'USD',
          availability: 'https://schema.org/InStock',
          url: tourUrl,
          priceValidUntil: '2026-12-31',
          seller: { '@type': 'TravelAgency', name: 'GlobeWithLocals', url: 'https://globewithlocals.com' },
        },
        // Real reviews only. A rating derived from the tour id is fabricated markup
        // (a structured-data policy violation), so no reviews means no aggregateRating.
        ...(tourReviewData && tourReviewData.totalReviews > 0
          ? {
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: tourReviewData.averageRating.toFixed(1),
                reviewCount: tourReviewData.totalReviews,
                bestRating: '5',
              },
            }
          : {}),
        ...(reviewSchemas ? { review: reviewSchemas } : {}),
      },
      // TouristTrip schema — enriched with real tour data for AI engines and Google
      {
        '@type': 'TouristTrip',
        name: tour?.title || 'Tour',
        description: tour?.fullDescription || tour?.shortDescription || '',
        image: tour?.images?.[0] || '',
        url: tourUrl,
        datePublished: '2025-01-01',
        dateModified: todayISO,
        touristType: tour?.category || 'Cultural Tourism',
        ...(tour?.duration ? { duration: tour.duration } : {}),
        ...(tour?.maxGroupSize ? { maximumAttendeeCapacity: tour.maxGroupSize } : {}),
        ...(Array.isArray(tour?.languages) && tour.languages.length > 0 ? { availableLanguage: tour.languages } : {}),
        ...(amenityFeatures ? { amenityFeature: amenityFeatures } : {}),
        itinerary: itinerarySchema,
        offers: {
          '@type': 'Offer',
          price: tour?.pricePerPerson || 0,
          priceCurrency: tour?.currency || 'USD',
          availability: 'https://schema.org/InStock',
          url: tourUrl,
          seller: { '@type': 'TravelAgency', name: 'GlobeWithLocals', url: 'https://globewithlocals.com' },
        },
        provider: {
          '@type': 'TravelAgency',
          name: 'GlobeWithLocals',
          url: 'https://globewithlocals.com',
          '@id': 'https://globewithlocals.com/#organization',
        },
        contentLocation: {
          '@type': 'City',
          name: cityName,
          containedInPlace: { '@type': 'Country', name: countryName },
        },
      },
      // BreadcrumbList
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://globewithlocals.com' },
          { '@type': 'ListItem', position: 2, name: countryName, item: `https://globewithlocals.com/${countrySlug}` },
          { '@type': 'ListItem', position: 3, name: cityName, item: `https://globewithlocals.com/${countrySlug}/${citySlug}` },
          { '@type': 'ListItem', position: 4, name: tour?.title || 'Tour', item: tourUrl },
        ],
      },
      // Organization with ContactPoint — trust signals competitors carry (X-Ray 2026-08)
      {
        '@type': 'Organization',
        '@id': 'https://globewithlocals.com/#organization',
        name: 'GlobeWithLocals',
        url: 'https://globewithlocals.com',
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer service',
          email: 'support@globewithlocals.com',
          availableLanguage: ['English'],
        },
      },
      // TouristAttraction — the destination itself, tied to the trip
      {
        '@type': 'TouristAttraction',
        name: `${cityName} — ${tour?.title || 'Tour'}`,
        touristType: tour?.category || 'Cultural Tourism',
        address: {
          '@type': 'PostalAddress',
          addressLocality: cityName,
          addressCountry: countryName,
        },
      },
      // ImageObject for the cover image
      ...(tour?.images?.[0]
        ? [{
            '@type': 'ImageObject',
            contentUrl: tour.images[0],
            url: tour.images[0],
            name: tour?.title || 'Tour',
            creditText: 'GlobeWithLocals',
          }]
        : []),
      // FAQPage schema — triggers FAQ accordion rich results in Google SERPs
      ...(faqSchema ? [faqSchema] : []),
    ],
  };

  // Server-rendered internal links — guaranteed in raw HTML for Google crawler
  // (RelatedTours component is client-side API-fetched, which crawlers may skip)
  const CITY_TOUR_LINKS: Record<string, { slug: string; title: string }[]> = {};

  const cityTourLinks = CITY_TOUR_LINKS[citySlug] || [];
  // Filter out the current tour from internal links
  const otherTourLinks = cityTourLinks.filter(t => t.slug !== slug);

  // Info page cross-links — two-way linking between tour pages and info pages
  const CITY_INFO_LINKS: Record<string, { slug: string; title: string }[]> = {};

  const cityInfoLinks = CITY_INFO_LINKS[citySlug] || [];
  // Filter out current slug if it's an info page being viewed from tour context
  const otherInfoLinks = cityInfoLinks.filter(t => t.slug !== slug);

  return (
    <>
      {/* Server-rendered JSON-LD — guaranteed in raw HTML for crawlers & AI engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(tourJsonLd) }}
      />
      {/* SEO: visible H1 with city name is rendered by TourDetailClient. No duplicate hidden H1. */}
      <TourDetailClient tour={tour} city={cityName} country={countryName} specificFaqs={tourFaqs || []} hardcodedReviews={tourReviewData} />

      {/* Server-rendered internal links — visible to Google crawler in raw HTML */}
      {otherTourLinks.length > 0 && (
        <nav aria-label={`More ${cityName} tours`} className="max-w-7xl mx-auto px-6 pb-12">
          <h2 className="text-2xl font-black text-[#001A33] mb-6">More {cityName} Tours</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherTourLinks.map((t) => (
              <Link
                key={t.slug}
                href={`/${countrySlug}/${citySlug}/${t.slug}`}
                className="p-4 rounded-xl border border-gray-200 hover:border-[#10B981] hover:shadow-md transition-all group"
              >
                <span className="text-[15px] font-black text-[#001A33] group-hover:text-[#10B981] transition-colors">
                  {t.title}
                </span>
              </Link>
            ))}
          </div>
        </nav>
      )}

      {/* Server-rendered info page cross-links — two-way linking for SEO */}
      {otherInfoLinks.length > 0 && (
        <nav aria-label={`${cityName} travel guides`} className="max-w-7xl mx-auto px-6 pb-12">
          <h2 className="text-2xl font-black text-[#001A33] mb-6">{cityName} Travel Guides</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherInfoLinks.map((t) => (
              <Link
                key={t.slug}
                href={`/${countrySlug}/${citySlug}/${t.slug}`}
                className="p-4 rounded-xl border border-gray-200 hover:border-[#10B981] hover:shadow-md transition-all group"
              >
                <span className="text-[15px] font-black text-[#001A33] group-hover:text-[#10B981] transition-colors">
                  {t.title}
                </span>
              </Link>
            ))}
          </div>
        </nav>
      )}
    </>
  );
}
