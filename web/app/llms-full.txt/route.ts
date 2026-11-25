import { buildLlmsText, topRomeToursText } from '@/lib/llmsText';
export const revalidate = 86400;
export async function GET() {
  const body = buildLlmsText(true) + (await topRomeToursText());
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } });
}
