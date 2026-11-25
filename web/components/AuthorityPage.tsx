import Link from 'next/link';
import type { AuthorityPage } from '@/lib/authority';
import { AUTHORITY_PAGES } from '@/lib/authority';
import { imageLoader } from '@/lib/imageLoader';
import { WA_NUMBER, waLink } from '@/lib/whatsapp';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:3001';
const SITE = 'https://www.globewithlocals.com';

async function fetchTours(terms: string[]) {
  try {
    const q = terms.length ? `&q=${encodeURIComponent(terms.join(','))}` : '';
    const res = await fetch(`${API_URL}/api/public/tours?country=Italy&city=Rome&limit=24${q}`, { next: { revalidate: 1800 } });
    if (!res.ok) return [];
    const d = await res.json();
    return Array.isArray(d.tours) ? d.tours : [];
  } catch { return []; }
}

const money = (n: number, c: string) => (c === 'USD' ? '$' : c + ' ') + Math.round(n);

export default async function AuthorityPageView({ page }: { page: AuthorityPage }) {
  const tours = await fetchTours(page.terms);
  const url = `${SITE}/${page.country}/${page.city}/${page.slug}`;
  const wa = waLink(`Hi, I am looking at "${page.title}" on GlobeWithLocals and need help choosing a tour.`);
  const related = page.related.map((s) => AUTHORITY_PAGES.find((p) => p.slug === s)).filter(Boolean) as AuthorityPage[];
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Article', headline: page.title, description: page.description, url, inLanguage: 'en', dateModified: new Date().toISOString().slice(0, 10), author: { '@type': 'Organization', name: 'GlobeWithLocals' }, publisher: { '@type': 'Organization', name: 'GlobeWithLocals', url: SITE } },
      { '@type': 'FAQPage', mainEntity: page.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
      { '@type': 'ItemList', name: page.title, numberOfItems: tours.length, itemListElement: tours.map((t: any, i: number) => ({ '@type': 'ListItem', position: i + 1, name: t.title, url: `${SITE}/italy/rome/${t.slug}` })) },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
        { '@type': 'ListItem', position: 2, name: 'Italy', item: `${SITE}/italy` },
        { '@type': 'ListItem', position: 3, name: 'Rome', item: `${SITE}/italy/rome` },
        { '@type': 'ListItem', position: 4, name: page.title, item: url },
      ] },
    ],
  };
  const Cta = ({ label }: { label?: string }) => (
    <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-bold text-white shadow hover:brightness-95">
      {label || 'Ask us on WhatsApp'}
    </a>
  );
  return (
    <main className="mx-auto max-w-5xl px-4 pb-24 pt-24 text-[#001A33]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <nav className="mb-4 text-xs text-slate-500"><Link href="/">Home</Link> / <Link href="/italy">Italy</Link> / <Link href="/italy/rome">Rome</Link> / {page.title}</nav>
      <h1 className="text-3xl font-black md:text-4xl">{page.title}</h1>
      <p className="mt-2 text-sm text-slate-500">Updated {new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}. Tours and prices below are live.</p>
      <div className="mt-5 space-y-4 text-base leading-relaxed text-slate-700">{page.intro.map((p, i) => <p key={i}>{p}</p>)}</div>
      <div className="mt-5 flex flex-wrap gap-3"><Cta label="Chat with us on WhatsApp" /><a href="#tours" className="rounded-full border border-slate-300 px-5 py-3 text-sm font-bold">See {tours.length || ''} tours</a></div>

      {page.guide ? (<>
      {page.sections.map((s, i) => (
        <section key={i} className="mt-10">
          <h2 className="text-2xl font-black">{s.h}</h2>
          <div className="mt-3 space-y-4 leading-relaxed text-slate-700">{s.p.map((p, j) => <p key={j}>{p}</p>)}</div>
        </section>
      ))}

      <section id="tours" className="mt-10">
        <h2 className="text-2xl font-black">{page.guide ? 'Tours that fit this trip' : 'Most-reviewed tours'}</h2>
        <p className="mt-1 text-sm text-slate-500">Ordered by number of guest reviews. Reviews shown on tour pages are for the same tour on another booking platform. Prices are per person.</p>
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tours.map((t: any) => (
            <Link key={t.id} href={`/italy/rome/${t.slug}`} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md">
              {t.images?.[0] && <img src={imageLoader({ src: t.images[0], width: 640 })} alt={t.title} loading="lazy" className="h-44 w-full object-cover" />}
              <div className="p-4">
                <div className="line-clamp-2 text-sm font-bold group-hover:underline">{t.title}</div>
                <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
                  <span>{t.duration || ''}</span>
                  {t.reviewCount > 0 && <span>{Number(t.reviewAvg).toFixed(1)} ★ ({t.reviewCount} on another platform)</span>}
                </div>
                <div className="mt-2 text-base font-black">from {money(t.pricePerPerson, t.currency || 'USD')}</div>
              </div>
            </Link>
          ))}
        </div>
        {tours.length === 0 && <p className="mt-4 text-slate-500">Tours load shortly. Message us on WhatsApp and we will send options.</p>}
        <div className="mt-6"><Cta label="Not sure which one? Message us on WhatsApp" /></div>
      </section>

      </>) : (<>
      <section id="tours" className="mt-10">
        <h2 className="text-2xl font-black">{page.guide ? 'Tours that fit this trip' : 'Most-reviewed tours'}</h2>
        <p className="mt-1 text-sm text-slate-500">Ordered by number of guest reviews. Reviews shown on tour pages are for the same tour on another booking platform. Prices are per person.</p>
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tours.map((t: any) => (
            <Link key={t.id} href={`/italy/rome/${t.slug}`} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md">
              {t.images?.[0] && <img src={imageLoader({ src: t.images[0], width: 640 })} alt={t.title} loading="lazy" className="h-44 w-full object-cover" />}
              <div className="p-4">
                <div className="line-clamp-2 text-sm font-bold group-hover:underline">{t.title}</div>
                <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
                  <span>{t.duration || ''}</span>
                  {t.reviewCount > 0 && <span>{Number(t.reviewAvg).toFixed(1)} ★ ({t.reviewCount} on another platform)</span>}
                </div>
                <div className="mt-2 text-base font-black">from {money(t.pricePerPerson, t.currency || 'USD')}</div>
              </div>
            </Link>
          ))}
        </div>
        {tours.length === 0 && <p className="mt-4 text-slate-500">Tours load shortly. Message us on WhatsApp and we will send options.</p>}
        <div className="mt-6"><Cta label="Not sure which one? Message us on WhatsApp" /></div>
      </section>

      {page.sections.map((s, i) => (
        <section key={i} className="mt-10">
          <h2 className="text-2xl font-black">{s.h}</h2>
          <div className="mt-3 space-y-4 leading-relaxed text-slate-700">{s.p.map((p, j) => <p key={j}>{p}</p>)}</div>
        </section>
      ))}

      </>)}

      <section className="mt-10 rounded-2xl bg-slate-50 p-6">
        <h2 className="text-xl font-black">How to choose</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-700">{page.choose.map((c, i) => <li key={i}>{c}</li>)}</ul>
        <div className="mt-5"><Cta label="Get help choosing on WhatsApp" /></div>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-black">Frequently asked questions</h2>
        <div className="mt-4 space-y-5">{page.faqs.map((f, i) => (<div key={i}><h3 className="font-bold">{f.q}</h3><p className="mt-1 text-slate-700">{f.a}</p></div>))}</div>
      </section>

      {related.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-black">More Rome guides</h2>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">{related.map((r) => (<li key={r.slug}><Link className="font-semibold text-blue-700 hover:underline" href={`/${r.country}/${r.city}/${r.slug}`}>{r.title}</Link></li>))}</ul>
        </section>
      )}
      <div className="mt-10 text-sm text-slate-500">Questions before booking? WhatsApp us at +{WA_NUMBER}, or email info@globewithlocals.com.</div>
    </main>
  );
}
