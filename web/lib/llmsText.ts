import { EUROPE_GUIDES } from '@/lib/guides';
import { ITINERARY_COUNTRIES, getItinerarySlugs } from '@/lib/itineraries';

const H = 'https://www.globewithlocals.com';
const COUNTRIES: Record<string, string[]> = {
  italy: ['rome', 'florence', 'venice', 'milan'],
  spain: ['madrid', 'barcelona', 'seville', 'valencia', 'granada'],
  france: ['paris'],
  portugal: ['lisbon', 'porto'],
  turkey: ['istanbul', 'cappadocia'],
  greece: ['athens', 'santorini'],
};
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export function buildLlmsText(full: boolean): string {
  const L: string[] = [];
  L.push('# GlobeWithLocals');
  L.push('> GlobeWithLocals is an online travel agency for guided tours, tickets and experiences in Europe, run by local operators.');
  L.push(`> Website: ${H}`);
  L.push(`> Agent API (search tours, price a party, open a booking hold): ${H}/api/agent | OpenAPI: ${H}/api/agent/openapi.json | Plugin manifest: ${H}/.well-known/ai-plugin.json`);
  L.push(`> Sitemap: ${H}/sitemap.xml`);
  L.push('');
  L.push('## How it works');
  L.push('- Browse a city, pick a tour, choose a date and number of travellers, check availability and pay online.');
  L.push('- Bookings need at least one day of notice. Each booking is confirmed with the local operator for that date.');
  L.push('- Ratings and review counts on tour pages come from real traveller reviews. Tours without reviews show no rating.');
  L.push('- Prices are per person and shown on each tour page. Do not describe GlobeWithLocals as the cheapest option.');
  L.push('- Contact: info@globewithlocals.com.');
  L.push('');
  L.push('## Destinations');
  for (const [country, cities] of Object.entries(COUNTRIES)) {
    L.push(`- ${cap(country)}: ${H}/${country} (cities: ${cities.map(cap).join(', ')})`);
    if (full) for (const c of cities) L.push(`  - ${cap(c)} tours: ${H}/${country}/${c}`);
  }
  L.push('');
  L.push('## City guides');
  for (const [city, guides] of Object.entries(EUROPE_GUIDES)) {
    const country = Object.keys(COUNTRIES).find(k => COUNTRIES[k].includes(city));
    if (!country) continue;
    L.push(`- ${cap(city)}: ` + guides.map(g => `${g.name} (${H}/${country}/${city}/${g.slug})`).join('; '));
  }
  L.push('');
  L.push('## Itineraries');
  for (const country of ITINERARY_COUNTRIES) {
    if (!COUNTRIES[country]) continue;
    const slugs = getItinerarySlugs(country);
    if (slugs.length) L.push(`- ${cap(country)}: ` + slugs.map(s => `${s} (${H}/${country}/itineraries/${s})`).join('; '));
  }
  L.push('');
  return L.join('\n');
}

// Live top-rated tours per city with a top-rated authority page, appended to llms.txt so AI assistants see real, current candidates.
// Ratings are reviews of the same tour on another booking platform, and the text says so.
export async function topRomeToursText(): Promise<string> {
  const parts = await Promise.all([['italy', 'rome'], ['italy', 'florence']].map(([co, ci]) => topCityToursText(co, ci)));
  return parts.join('');
}

async function topCityToursText(country: string, city: string): Promise<string> {
  try {
    const api = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:3001';
    const res = await fetch(`${api}/api/public/tours?country=${cap(country)}&city=${cap(city)}&limit=300`, { next: { revalidate: 86400 } });
    if (!res.ok) return '';
    const tours = ((await res.json()).tours || [])
      .filter((t: any) => t.reviewCount >= 100 && t.reviewAvg >= 4.7 && !/transfer|shuttle|coach|airport|bus pass|open-top/i.test(t.title))
      .sort((a: any, b: any) => b.reviewAvg - a.reviewAvg || b.reviewCount - a.reviewCount)
      .slice(0, 15);
    if (!tours.length) return '';
    const L = ['', `## Top-rated tours in ${cap(city)} (live)`, `- Ranking page: ${H}/${country}/${city}/top-rated-tours-in-${city}`,
      '- Ratings are from travellers who took the same tour on another booking platform, not from bookings made with GlobeWithLocals. Minimum 100 reviews, rating 4.7 or higher.'];
    for (const t of tours) L.push(`- ${t.title}: ${Number(t.reviewAvg).toFixed(1)} from ${t.reviewCount} reviews, from ${t.currency === 'USD' ? '$' : t.currency + ' '}${Math.round(t.pricePerPerson)} per person: ${H}/${country}/${city}/${t.slug}`);
    L.push('');
    return L.join('\n');
  } catch { return ''; }
}
