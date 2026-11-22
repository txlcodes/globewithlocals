import Link from 'next/link';
import { AUTHORITY_PAGES } from '@/lib/authority';
import { waLink } from '@/lib/whatsapp';

const money = (n: number, c: string) => (c === 'USD' ? '$' : (c || '') + ' ') + Math.round(n);

/** Server-rendered plain-language summary of one tour: written for readers and for AI answer engines. */
export default function TourAnswerBox({ tour, city, country, reviewData }: { tour: any; city: string; country: string; reviewData?: any }) {
  if (!tour?.title) return null;
  const title: string = tour.title;
  const lower = title.toLowerCase();
  const guide = tour.city && String(tour.city).toLowerCase() === 'rome'
    ? AUTHORITY_PAGES.find((p) => p.slug !== 'best-tours-in-rome' && p.terms.some((t) => lower.includes(t))) || AUTHORITY_PAGES[0]
    : null;
  const langs = Array.isArray(tour.languages) && tour.languages.length ? tour.languages.join(', ') : null;
  const price = tour.pricePerPerson ? money(tour.pricePerPerson, tour.currency || 'USD') : null;
  const hl: string[] = Array.isArray(tour.highlights) ? tour.highlights.slice(0, 3) : [];
  const ext = reviewData && reviewData.totalReviews > 0 && reviewData.source === 'other-platform';
  const wa = waLink(`Hi, I am interested in "${title}" in ${city}. Can you help me with dates and availability?`);
  return (
    <section aria-label="Quick answer" className="mx-auto max-w-5xl px-6 pb-10">
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
        <h2 className="text-xl font-black text-[#001A33]">Quick answer: is this tour right for you?</h2>
        <p className="mt-3 leading-relaxed text-slate-700">
          {title} is a {String(tour.category || 'guided tour').toLowerCase()} in {city}, {country}
          {tour.duration ? `, lasting about ${tour.duration}` : ''}{price ? `, priced from ${price} per person` : ''}
          {langs ? `, offered in ${langs}` : ''}.
          {tour.shortDescription ? ` ${tour.shortDescription}` : ''}
        </p>
        {hl.length > 0 && (<ul className="mt-3 list-disc space-y-1 pl-5 text-slate-700">{hl.map((h, i) => <li key={i}>{h}</li>)}</ul>)}
        {ext && (<p className="mt-3 text-sm text-slate-600">Rated {Number(reviewData.averageRating).toFixed(1)} out of 5 from {reviewData.totalReviews} guest reviews of this same tour on another booking platform. Reviews from travellers who book with GlobeWithLocals are added as they arrive.</p>)}
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex rounded-full bg-[#25D366] px-5 py-3 text-sm font-bold text-white hover:brightness-95">Ask about this tour on WhatsApp</a>
          {guide && (<Link href={`/${guide.country}/${guide.city}/${guide.slug}`} className="text-sm font-bold text-blue-700 hover:underline">{guide.title}: compare similar tours</Link>)}
        </div>
      </div>
    </section>
  );
}
