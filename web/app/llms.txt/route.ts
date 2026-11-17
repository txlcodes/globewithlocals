import { buildLlmsText } from '@/lib/llmsText';
export const revalidate = 86400;
export function GET() {
  return new Response(buildLlmsText(false), { headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } });
}
