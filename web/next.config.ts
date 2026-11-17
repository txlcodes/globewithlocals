import type { NextConfig } from 'next';

const imageHost = (process.env.NEXT_PUBLIC_IMAGE_HOST || 'https://images.globewithlocals.com').replace(/\/$/, '');
const imageHostname = (() => {
  try { return new URL(imageHost).hostname; } catch { return 'images.globewithlocals.com'; }
})();

const nextConfig: NextConfig = {
  trailingSlash: false,

  images: {
    unoptimized: process.env.NODE_ENV === 'development',
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
    // Must match the WIDTHS ladder in lib/imageLoader.ts.
    deviceSizes: [640, 1600],
    imageSizes: [128, 384],
    remotePatterns: [
      { protocol: 'https', hostname: imageHostname },
      { protocol: 'https', hostname: 'globewithlocals.com' },
    ],
  },

  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:3001',
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
      {
        source: '/:path*.(webp|avif|png|jpg|jpeg|svg|ico)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
};

export default nextConfig;
