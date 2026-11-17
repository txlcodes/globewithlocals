export interface ItineraryDay {
  day: number;
  base: string;
  heading: string;
  narrative: string;
  tours: string[];
  travel: string | null;
  tip: string;
  friday_note?: string | null;
}

export interface ItineraryLogisticsBlock {
  heading: string;
  content: string;
}

export interface ItineraryData {
  days: number;
  quickAnswer?: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  routeSummary: string;
  intro: string;
  bestFor: string;
  days_detail: ItineraryDay[];
  logistics: ItineraryLogisticsBlock[];
  faqs: { question: string; answer: string }[];
}

export const ITINERARY_SLUGS: string[] = [];

// No bundled itineraries.
const BY_COUNTRY: Record<string, Record<string, ItineraryData>> = {};

export const ITINERARY_COUNTRIES = Object.keys(BY_COUNTRY);

export function getItinerary(country: string, slug: string): ItineraryData | null {
  return BY_COUNTRY[country.toLowerCase()]?.[slug] ?? null;
}

export function getItinerarySlugs(country: string): string[] {
  const set = BY_COUNTRY[country.toLowerCase()];
  if (!set) return [];
  return ITINERARY_SLUGS.filter(s => set[s]);
}
