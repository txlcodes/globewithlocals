import type { MetadataRoute } from 'next';
import { CITY_URL_MAP, VALID_COUNTRIES } from '@/lib/cityCountryMap';
import { EUROPE_GUIDES } from '@/lib/guides';
import { ITINERARY_COUNTRIES, getItinerarySlugs } from '@/lib/itineraries';

const BASE_URL = 'https://globewithlocals.com';
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:3001';

// One sitemap file may hold 50,000 URLs and 50 MB. We split well below that so a
// growing catalogue never truncates silently: /sitemap.xml is an index that
// lists /sitemaps/0.xml, /sitemaps/1.xml ... of this many URLs each.
export const SITEMAP_CHUNK_SIZE = Number(process.env.SITEMAP_CHUNK_SIZE) || 45000;

// Fresh-start rollout: only tours in these cities are submitted. A city is added here
// once its tours are rewritten and checked. Other cities stay live but leave the sitemap.
const SITEMAP_CITIES = new Set(
  (process.env.SITEMAP_CITIES || 'istanbul,cappadocia,antalya').split(',').map(c => c.trim().toLowerCase()).filter(Boolean),
);

// Everything below is derived from CITY_URL_MAP (or fetched from the API).
// Nothing is hardcoded per city: a hardcoded list is how whole cities used to
// ship live and stay out of the sitemap elsewhere.
async function buildEntries(): Promise<MetadataRoute.Sitemap> {
  const staticPages = [
    '', '/explore', '/about-us', '/privacy-policy', '/terms-and-conditions',
    '/safety-guidelines', '/support', '/supplier',
  ].map(path => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1.0 : 0.8,
  }));

  let countryPages = [...VALID_COUNTRIES].map(country => ({
    url: `${BASE_URL}/${country}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  let cityPages = Object.values(CITY_URL_MAP).map(({ country, city }) => ({
    url: `${BASE_URL}/${country}/${city}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Every approved tour from one slim endpoint (slug/city/country/updatedAt).
  // The per-city full-payload approach became unfetchable once cities held
  // thousands of tours.
  let tourPages: MetadataRoute.Sitemap = [];
  try {
    const res = await fetch(`${API_URL}/api/public/sitemap-tours`, { cache: 'no-store' });
    const data = res.ok ? await res.json() : { tours: [] };
    const allTours: any[] = data.tours || [];
    tourPages = allTours
      .filter((t: any) => t.slug && t.city && SITEMAP_CITIES.has(String(t.city).toLowerCase().replace(/\s+/g, '-')))
      .map((t: any) => {
        const cityKey = t.city.toLowerCase().replace(/\s+/g, '-');
        const mapping = CITY_URL_MAP[cityKey];
        // Fall back to the tour's own country, never a hardcoded one: an
        // unmapped city must not be submitted under the wrong country.
        const country = mapping
          ? mapping.country
          : (t.country ? String(t.country).toLowerCase().replace(/\s+/g, '-') : 'italy');
        const city = mapping ? mapping.city : cityKey;
        return {
          url: `${BASE_URL}/${country}/${city}/${t.slug}`,
          lastModified: new Date(t.updatedAt || Date.now()),
          changeFrequency: 'weekly' as const,
          priority: 0.7,
        };
      });
    // Only submit country and city hubs that have live tours. A hub with none is a
    // 404 (country) or a noindex page (city), and submitting either shows up in
    // Search Console as an error or a "submitted URL marked noindex" warning.
    const liveCountries = new Set<string>();
    const liveCities = new Set<string>();
    for (const tp of tourPages) {
      const parts = tp.url.replace(`${BASE_URL}/`, '').split('/');
      liveCountries.add(parts[0]);
      liveCities.add(`${parts[0]}/${parts[1]}`);
    }
    // Always filter, even when no tour is live: with zero tours every hub must drop out.
    countryPages = countryPages.filter(c => liveCountries.has(c.url.replace(`${BASE_URL}/`, '')));
    cityPages = cityPages.filter(c => liveCities.has(c.url.replace(`${BASE_URL}/`, '')));
  } catch (e) {
    console.error('Sitemap: failed to fetch tours', e);
    countryPages = [];
    cityPages = [];
  }

  // Authority guides, only for cities that are actually live (a guide for a city with no tours would be orphaned).
  const livePaths = new Set(cityPages.map(c => c.url.replace(`${BASE_URL}/`, '')));
  const guidePages = Object.entries(EUROPE_GUIDES).flatMap(([citySlug, guides]) => {
    const m = CITY_URL_MAP[citySlug];
    if (!m || !livePaths.has(`${m.country}/${m.city}`)) return [];
    return guides.map(g => ({
      url: `${BASE_URL}/${m.country}/${m.city}/${g.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }));
  });

  // Itinerary hubs and pages, only for countries that are live on this site.
  const liveCountryPaths = new Set(countryPages.map(c => c.url.replace(`${BASE_URL}/`, '')));
  const itineraryPages = ITINERARY_COUNTRIES.filter(c => liveCountryPaths.has(c)).flatMap(c => [
    { url: `${BASE_URL}/${c}/itineraries`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    ...getItinerarySlugs(c).map(slug => ({
      url: `${BASE_URL}/${c}/itineraries/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]);

  return [...staticPages, ...countryPages, ...cityPages, ...guidePages, ...itineraryPages, ...tourPages];
}

// The index and every chunk call this within seconds of each other, and each call
// pulls the whole tour list; a short in-memory cache keeps one crawl to one API fetch.
let cache: { at: number; entries: MetadataRoute.Sitemap } | null = null;
const CACHE_MS = 5 * 60 * 1000;

export async function getSitemapEntries(): Promise<MetadataRoute.Sitemap> {
  if (cache && Date.now() - cache.at < CACHE_MS) return cache.entries;
  const entries = await buildEntries();
  cache = { at: Date.now(), entries };
  return entries;
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export function urlsetXml(entries: MetadataRoute.Sitemap): string {
  const rows = entries.map(e => {
    const lm = e.lastModified ? new Date(e.lastModified).toISOString() : undefined;
    return `<url><loc>${esc(e.url)}</loc>${lm ? `<lastmod>${lm}</lastmod>` : ''}` +
      `${e.changeFrequency ? `<changefreq>${e.changeFrequency}</changefreq>` : ''}` +
      `${e.priority != null ? `<priority>${e.priority}</priority>` : ''}</url>`;
  });
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${rows.join('\n')}\n</urlset>\n`;
}

export function sitemapIndexXml(chunks: number): string {
  const now = new Date().toISOString();
  const rows = Array.from({ length: chunks }, (_, i) =>
    `<sitemap><loc>${BASE_URL}/sitemaps/${i}.xml</loc><lastmod>${now}</lastmod></sitemap>`);
  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${rows.join('\n')}\n</sitemapindex>\n`;
}

export const SITEMAP_HEADERS = {
  'Content-Type': 'application/xml; charset=utf-8',
  // Short edge cache: a crawl is a handful of requests, and a fresh tour list matters more than origin load.
  'Cache-Control': 'public, s-maxage=900',
};
