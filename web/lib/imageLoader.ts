// Pre-resized WebP files are stored as .../<key>/<width>.webp on the image host.
const WIDTHS = [128, 384, 640, 1600] as const;

export const IMAGE_HOST = (process.env.NEXT_PUBLIC_IMAGE_HOST || 'https://images.globewithlocals.com').replace(/\/$/, '');

function ladderWidth(width: number): number {
  return WIDTHS.find((w) => w >= width) ?? WIDTHS[WIDTHS.length - 1];
}

// Only rewrite real ladder files (128/384/640/1600.webp). Gallery photos are named 1.webp, 2.webp ... and must pass through untouched.
const NATIVE = /^(https?:\/\/.+)\/(128|384|640|1600)\.webp$/;

export function imageLoader({ src, width }: { src: string; width: number; quality?: number }): string {
  const m = typeof src === 'string' && src.startsWith(IMAGE_HOST) ? src.match(NATIVE) : null;
  if (m) return `${m[1]}/${ladderWidth(width)}.webp`;
  return src;
}
