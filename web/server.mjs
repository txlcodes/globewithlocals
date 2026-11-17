// Combined server for GlobeWithLocals: one Node process serving both the
// Express API (../api/server.js, unchanged) and the built Next.js app, so
// Render only needs ONE paid web service instead of two (frontend + backend)
// See deployment notes.
//
// Express registers all its routes (API, MCP, agent API, webhooks) exactly as
// it does standalone; this file just adds Next.js's page handler as the final
// catch-all after every Express route, then does the single app.listen().
//
// Must run after `next build` has produced web/.next (same requirement as
// `next start`).

import { createServer } from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import next from 'next';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dev = process.env.NODE_ENV !== 'production';
const port = parseInt(process.env.PORT || '3000', 10);

// Must be set before importing ../api/server.js: it reads this at module-load
// time to skip its own app.listen() and background-job start (we call
// startBackgroundJobs() ourselves below, once, after Next is ready).
process.env.EMBEDDED = 'true';

const nextApp = next({ dev, dir: __dirname });
const handleNextRequest = nextApp.getRequestHandler();

async function main() {
  await nextApp.prepare();

  const { default: apiApp, startBackgroundJobs } = await import('../api/server.js');

  // Every Express route (app.use/app.get/... for /api/*, /mcp/*, /sitemap.xml,
  // webhooks, etc.) is already registered on apiApp by the import above — this
  // module runs its route-registration code top-to-bottom as a side effect of
  // being imported. Adding the Next.js handler as a wildcard LAST means it only
  // ever sees requests Express didn't already match.
  apiApp.all('*', (req, res) => handleNextRequest(req, res));

  const server = createServer(apiApp);
  server.listen(port, () => {
    console.log(`> GlobeWithLocals combined server ready on port ${port} (${dev ? 'dev' : 'production'})`);
    startBackgroundJobs();
  });
}

main().catch((err) => {
  console.error('Failed to start combined GlobeWithLocals server:', err);
  process.exit(1);
});
