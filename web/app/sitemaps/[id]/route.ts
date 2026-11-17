import { getSitemapEntries, urlsetXml, SITEMAP_CHUNK_SIZE, SITEMAP_HEADERS } from '@/lib/sitemapEntries';

export const dynamic = 'force-dynamic';

// /sitemaps/<n>.xml: the n-th block of SITEMAP_CHUNK_SIZE URLs. Listed by /sitemap.xml.
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const n = Number(id.replace(/\.xml$/, ''));
  if (!Number.isInteger(n) || n < 0) return new Response('Not found', { status: 404 });
  const entries = await getSitemapEntries();
  const chunk = entries.slice(n * SITEMAP_CHUNK_SIZE, (n + 1) * SITEMAP_CHUNK_SIZE);
  if (chunk.length === 0 && n !== 0) return new Response('Not found', { status: 404 });
  return new Response(urlsetXml(chunk), { headers: SITEMAP_HEADERS });
}
