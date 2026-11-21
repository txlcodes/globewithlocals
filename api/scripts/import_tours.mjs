// Import a prepared tour file into the database.
//
//   node scripts/import_tours.mjs <tours.json> --dry-run
//   DATABASE_URL=... node scripts/import_tours.mjs <tours.json> [--limit N] [--status approved|draft]
//
// Idempotent: tours are upserted by slug, so re-running never duplicates.
// Needs only DATABASE_URL (never commit it). Dry run needs no database.
import { readFileSync } from 'node:fs';
import { randomBytes } from 'node:crypto';

const args = process.argv.slice(2);
const file = args.find((a) => !a.startsWith('--') && a.endsWith('.json'));
const dry = args.includes('--dry-run');
const flag = (name, dflt) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : dflt;
};
const limit = parseInt(flag('limit', '0'), 10) || 0;
const status = flag('status', 'approved');
if (!file) { console.error('usage: import_tours.mjs <tours.json> [--dry-run] [--limit N] [--status approved|draft]'); process.exit(1); }
if (!['approved', 'draft'].includes(status)) { console.error('status must be approved or draft'); process.exit(1); }

const arr = (v) => {
  if (Array.isArray(v)) return v.map(String).map((s) => s.trim()).filter(Boolean);
  if (typeof v === 'string') {
    try { const p = JSON.parse(v); if (Array.isArray(p)) return arr(p); } catch { /* plain text */ }
    return v.split('\n').map((s) => s.trim()).filter(Boolean);
  }
  return [];
};
const objs = (v) => {
  if (Array.isArray(v)) return v;
  if (typeof v === 'string') { try { const p = JSON.parse(v); return Array.isArray(p) ? p : []; } catch { return []; } }
  return [];
};
const fmtHours = (h) => {
  const n = Number(h);
  return `${Number.isInteger(n) ? n : n.toFixed(1).replace(/\.0$/, '')} ${n === 1 ? 'hour' : 'hours'}`;
};
const category = (t) => (/\b(ticket|tickets|entry|skip-the-line|admission|pass)\b/i.test(t.title) ? 'Entry Ticket' : 'Guided Tour');

const toRow = (t) => {
  const faqs = objs(t.faqs).filter((f) => f && f.question && f.answer);
  const itinerary = objs(t.itinerary);
  return {
    title: t.title,
    slug: t.slug,
    country: t.country,
    city: t.city,
    category: category(t),
    locations: JSON.stringify([t.city]),
    duration: fmtHours(t.durationHours),
    pricePerPerson: Number(t.priceFromUSD),
    groupPricingTiers: Array.isArray(t.groupPricingTiers) && t.groupPricingTiers.length ? JSON.stringify(t.groupPricingTiers) : null,
    currency: 'USD',
    shortDescription: t.shortDescription,
    fullDescription: t.description,
    highlights: JSON.stringify(arr(t.highlights)),
    included: JSON.stringify(arr(t.inclusions)),
    notIncluded: JSON.stringify(arr(t.exclusions)),
    meetingPoint: t.meetingPoint || null,
    guideType: 'Local Guide',
    tourTypes: JSON.stringify([]),
    images: JSON.stringify(Array.isArray(t.images) ? t.images : []),
    languages: JSON.stringify(['English']),
    itineraryItems: itinerary.length ? JSON.stringify(itinerary) : null,
    faqs: faqs.length ? JSON.stringify(faqs) : null,
    pickupIncluded: false,
  };
};

let tours = JSON.parse(readFileSync(file, 'utf8'));
if (limit) tours = tours.slice(0, limit);
const rows = tours.map((t) => ({ ref: t.ref, hours: Number(t.durationHours), row: toRow(t) }));

// Sanity checks that hold for dry-run and real runs.
const problems = [];
const slugs = new Set();
for (const { ref, hours, row } of rows) {
  if (!row.title || !row.slug || !row.fullDescription) problems.push(`${ref}: missing title/slug/description`);
  if (!(row.pricePerPerson > 0)) problems.push(`${ref}: bad price`);
  if (!(hours > 0)) problems.push(`${ref}: bad duration`);
  if (slugs.has(row.slug)) problems.push(`${ref}: duplicate slug ${row.slug}`);
  slugs.add(row.slug);
}
const cats = rows.reduce((m, r) => ((m[r.row.category] = (m[r.row.category] || 0) + 1), m), {});
console.log(`${rows.length} tours, categories:`, cats, `status=${status}`);
if (problems.length) { console.error('PROBLEMS:\n' + problems.join('\n')); process.exit(1); }

if (dry) {
  const s = rows[0].row;
  console.log('dry run OK. sample:', JSON.stringify({ ...s, fullDescription: s.fullDescription.slice(0, 80) + '...' }, null, 1).slice(0, 1200));
  process.exit(0);
}

if (!process.env.DATABASE_URL) { console.error('DATABASE_URL is not set'); process.exit(1); }
const { PrismaClient } = await import('@prisma/client');
const prisma = new PrismaClient();

try {
  const email = 'info@globewithlocals.com';
  let supplier = await prisma.supplier.findUnique({ where: { email } });
  if (!supplier) {
    supplier = await prisma.supplier.create({
      data: {
        businessType: 'company',
        fullName: 'GlobeWithLocals',
        companyName: 'GlobeWithLocals',
        email,
        passwordHash: randomBytes(32).toString('hex'), // not a usable login
        emailVerified: true,
        status: 'approved',
      },
    });
    console.log('created supplier', supplier.id);
  }

  let created = 0, updated = 0;
  for (const { hours, row } of rows) {
    const imgCount = JSON.parse(row.images).length;
    const st = imgCount < 4 ? 'draft' : status; // never publish a tour with a thin gallery
    const data = { ...row, supplierId: supplier.id, status: st, approvedAt: st === 'approved' ? new Date() : null };
    const existing = await prisma.tour.findUnique({ where: { slug: row.slug }, select: { id: true } });
    const tour = existing
      ? await prisma.tour.update({ where: { id: existing.id }, data })
      : await prisma.tour.create({ data });
    existing ? updated++ : created++;
    const opt = {
      optionTitle: row.title,
      optionDescription: row.shortDescription || row.title,
      durationHours: hours,
      price: row.pricePerPerson,
      groupPricingTiers: row.groupPricingTiers,
      currency: 'USD',
      language: 'English',
      guideIncluded: true,
      sortOrder: 0,
    };
    const hasOpt = await prisma.tourOption.findFirst({ where: { tourId: tour.id }, select: { id: true } });
    if (hasOpt) await prisma.tourOption.update({ where: { id: hasOpt.id }, data: opt });
    else await prisma.tourOption.create({ data: { ...opt, tourId: tour.id } });
  }
  console.log(`done: ${created} created, ${updated} updated`);
} finally {
  await prisma.$disconnect();
}
