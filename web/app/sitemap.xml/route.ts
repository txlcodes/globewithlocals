import { getSitemapEntries, sitemapIndexXml, SITEMAP_CHUNK_SIZE, SITEMAP_HEADERS } from '@/lib/sitemapEntries';

// Always rebuilt from the live API: Next's fetch data cache survives Render's
// build cache between deploys, which left this sitemap frozen at an old tour
// list (whole cities at 0 tours) for days.
export const dynamic = 'force-dynamic';

// /sitemap.xml is an index. The URLs live in /sitemaps/<n>.xml (see ../sitemaps/[id]/route.ts),
// so the catalogue can grow past the protocol's 50,000-URL limit without truncating.
export async function GET() {
  const entries = await getSitemapEntries();
  const chunks = Math.max(1, Math.ceil(entries.length / SITEMAP_CHUNK_SIZE));
  return new Response(sitemapIndexXml(chunks), { headers: SITEMAP_HEADERS });
}
