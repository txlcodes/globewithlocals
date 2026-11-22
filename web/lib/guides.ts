export type GuideLink = { name: string; slug: string; image: string };

// No bundled guide content. Populate from the API when guides exist.
export const BALI_GUIDES: Record<string, GuideLink[]> = {};
export const JAPAN_GUIDES: Record<string, GuideLink[]> = {};
import { AUTH_BY_CITY } from '@/lib/authority';
export const EUROPE_GUIDES: Record<string, GuideLink[]> = AUTH_BY_CITY;
