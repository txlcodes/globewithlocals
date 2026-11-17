'use client';

import React from 'react';
import Link from 'next/link';
import { Globe2, UserCheck, CalendarCheck, BookOpen, Languages, Wallet, MapPin } from 'lucide-react';
import StaticPageHeader from './StaticPageHeader';

const STATS = [
  { value: '40,000+', label: 'tours to choose from' },
  { value: '7', label: 'countries across Europe' },
  { value: '200+', label: 'cities and regions' },
  { value: '7', label: 'interface languages' },
];

const STRENGTHS = [
  {
    icon: Globe2,
    title: 'Depth, not a short list',
    text: 'We list the full range in each city: classic walks and museum entry, food and wine, boat trips, private guides, day trips and unusual local experiences, in Italy, Spain, Portugal, France, Greece, Turkey and the United Kingdom.',
  },
  {
    icon: UserCheck,
    title: 'A real person, before you book',
    text: 'Ask us anything about any tour and a person answers. No chatbot, no need to book first. Dates, meeting points, languages, access, group size: just ask.',
    href: '/talk-to-a-human',
    cta: 'How it works',
  },
  {
    icon: CalendarCheck,
    title: 'Local operators confirm your place',
    text: 'Each tour is run by a local operator. Outside India we need at least one day of notice so the operator can confirm your place.',
  },
  {
    icon: BookOpen,
    title: 'Planning help for every city',
    text: 'Our city guides cover what to do first, the best time to visit and how many days you need, with real tours attached to each tip so you can go from idea to plan in one place.',
    href: '/explore',
    cta: 'Explore destinations',
  },
  {
    icon: Languages,
    title: 'Made for travellers from everywhere',
    text: 'The site interface is available in 7 languages, including Arabic and Hindi, and prices can be shown in 10 currencies.',
  },
];

export default function WhyGlobeWithLocalsClient() {
  return (
    <div className="min-h-screen bg-white">
      <StaticPageHeader />

      <section className="bg-[#001A33]">
        <div className="max-w-4xl mx-auto px-6 py-14 text-center">
          <div className="w-16 h-16 bg-[#10B981]/20 rounded-full flex items-center justify-center mx-auto mb-5">
            <MapPin className="text-[#10B981]" size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">What we do best</h1>
          <p className="text-gray-300 text-lg font-semibold max-w-2xl mx-auto">
            GlobeWithLocals is a marketplace for tours and experiences run by local operators. Here is what makes it worth booking with.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          {STATS.map((s) => (
            <div key={s.label} className="bg-gray-50 border border-gray-200 rounded-2xl p-5 text-center">
              <div className="text-3xl font-black text-[#10B981]">{s.value}</div>
              <div className="text-sm font-semibold text-gray-600 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {STRENGTHS.map(({ icon: Icon, title, text, href, cta }) => (
            <div key={title} className="border border-gray-200 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-[#10B981]/10 flex items-center justify-center">
                  <Icon className="text-[#10B981]" size={20} />
                </div>
                <h2 className="font-black text-[#001A33] text-lg">{title}</h2>
              </div>
              <p className="text-gray-600 font-semibold">{text}</p>
              {href && (
                <Link href={href} className="inline-block mt-3 text-[#10B981] font-black hover:underline">
                  {cta}
                </Link>
              )}
            </div>
          ))}
        </div>

        <div className="mt-14 bg-gray-50 border border-gray-200 rounded-2xl p-8 text-center">
          <Wallet className="text-[#10B981] mx-auto mb-3" size={28} />
          <h2 className="text-2xl font-black text-[#001A33] mb-2">How we are different from a tour company</h2>
          <p className="text-gray-600 font-semibold max-w-2xl mx-auto">
            We do not run the tours ourselves. Local operators do, and we make them easy to find, compare and book, with a person on our side if you need help. Each tour page lists what is included and the activity provider.
          </p>
        </div>

        <div className="text-center mt-12">
          <Link href="/" className="inline-block bg-[#10B981] hover:bg-[#0E9F6E] text-white font-black rounded-full px-8 py-4 transition-all">
            Browse tours
          </Link>
        </div>
      </div>
    </div>
  );
}
