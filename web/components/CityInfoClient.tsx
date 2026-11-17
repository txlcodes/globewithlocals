'use client';
import { PLACEHOLDER_IMG } from '@/lib/placeholder';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    Clock,
    Ticket,
    Info,
    CheckCircle2,
    AlertTriangle,
    Star,
    History,
    ShieldCheck,
    Map,
    Wallet,
    Landmark, CalendarDays, Calendar, Sun, MapPin, Footprints, Train, TrainFront, Sunrise,
    Flower, Leaf, Gift, Mountain, Users, Ruler, Home, Car, Waves, Utensils, Droplet,
    Shield, Ship, Moon, Camera, Route, Bike
} from 'lucide-react';
import type { CityInfoData } from '@/lib/cityInfoContent';
import { fmt } from '@/lib/i18n';
import Breadcrumbs from '@/components/Breadcrumbs';
import LanguageSwitcher, { useLanguage } from '@/components/LanguageSwitcher';
import { imageLoader } from '@/lib/imageLoader';
import { BALI_GUIDES } from '@/lib/guides';
import { JAPAN_GUIDES } from '@/lib/guides';
import { EUROPE_GUIDES } from '@/lib/guides';

interface Props {
    country: string;
    city: string;
    slug: string;
    /** Looked up on the server: the content tables for every city are ~4MB of TS. */
    data?: CityInfoData | null;
}

const AGRA_SIDEBAR = [];

const DELHI_SIDEBAR = [];

const JAIPUR_SIDEBAR = [];

// Recommended tour links for internal linking from authority pages to tour pages (SEO: pass link juice)
const CITY_RECOMMENDED_TOURS: Record<string, { title: string; slug: string; description: string; image?: string; price?: string; rating?: string }[]> = {};

const BANGKOK_SIDEBAR = [];

const PHUKET_SIDEBAR = [];

const CHIANG_MAI_SIDEBAR = [];

const PATTAYA_SIDEBAR = [];

const KRABI_SIDEBAR = [];

/** "Sri Lanka" -> "sri-lanka". toLowerCase() alone leaves the space in the URL. */
const urlSlug = (s: string) => s.toLowerCase().trim().replace(/\s+/g, '-');


const COLOMBO_SIDEBAR = [];

const SIGIRIYA_SIDEBAR = [];

const ELLA_SIDEBAR = [];

const GALLE_SIDEBAR = [];

const NEGOMBO_SIDEBAR = [];

const NUWARA_ELIYA_SIDEBAR = [];

const BENTOTA_SIDEBAR = [];

const MIRISSA_SIDEBAR = [];

const KANDY_SIDEBAR = [];

const OSAKA_SIDEBAR = [];

const HIROSHIMA_SIDEBAR = [];

const NARA_SIDEBAR = [];

const NAGOYA_SIDEBAR = [];

const HAKONE_SIDEBAR = [];

const HA_LONG_SIDEBAR = [];

const HANOI_SIDEBAR = [];

const SAPA_SIDEBAR = [];

const HOI_AN_SIDEBAR = [];

const DA_NANG_SIDEBAR = [];

const HO_CHI_MINH_CITY_SIDEBAR = [];

const DUBAI_SIDEBAR = [];

const ABU_DHABI_SIDEBAR = [];

const MOUNT_FUJI_SIDEBAR = [];

const SAPPORO_SIDEBAR = [];


const ICONS: Record<string, React.ComponentType<{ size?: number }>> = {};

function renderIcon(name: string) {
    // Content files use both 'AlertTriangle' and 'alert-triangle'; normalise before lookup.
    const Icon = ICONS[String(name || '').toLowerCase().replace(/[^a-z0-9]/g, '')] || Info;
    return <Icon size={20} />;
}

function renderMarkdownText(text: string) {
    const parts = text.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\))/g);
    return parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={i} className="font-black text-[#001A33]">{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith('[') && part.includes('](')) {
            const match = part.match(/\[(.*?)\]\((.*?)\)/);
            if (match) {
                return (
                    <Link key={i} href={match[2]} className="text-[#10B981] font-black border-b border-[#10B981]/30 hover:border-[#10B981] transition-all">
                        {match[1]}
                    </Link>
                );
            }
        }
        return part;
    });
}

export default function CityInfoClient({ country, city, slug, data = null }: Props) {
    const { t } = useLanguage();
    const router = useRouter();

    if (!data) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center p-6 text-center">
                <div>
                    <h1 className="text-2xl font-black text-[#001A33] mb-4">Content Not Identified</h1>
                    <button onClick={() => router.back()} className="text-[#10B981] font-bold">{t.backToSearch}</button>
                </div>
            </div>
        );
    }

    const SIDEBAR_MAP: Record<string, typeof AGRA_SIDEBAR> = {
        ...BALI_GUIDES,
        ...JAPAN_GUIDES,
        ...EUROPE_GUIDES,
        'ha-long': HA_LONG_SIDEBAR,
        'hanoi': HANOI_SIDEBAR,
        'sapa': SAPA_SIDEBAR,
        'hoi-an': HOI_AN_SIDEBAR,
        'da-nang': DA_NANG_SIDEBAR,
        'ho-chi-minh-city': HO_CHI_MINH_CITY_SIDEBAR,
        agra: AGRA_SIDEBAR,
        delhi: DELHI_SIDEBAR,
        jaipur: JAIPUR_SIDEBAR,
        phuket: PHUKET_SIDEBAR,
        bangkok: BANGKOK_SIDEBAR,
        'chiang-mai': CHIANG_MAI_SIDEBAR,
        pattaya: PATTAYA_SIDEBAR,
        krabi: KRABI_SIDEBAR,
        colombo: COLOMBO_SIDEBAR,
        kandy: KANDY_SIDEBAR,
        sigiriya: SIGIRIYA_SIDEBAR,
        'ella': ELLA_SIDEBAR,
        galle: GALLE_SIDEBAR,
        negombo: NEGOMBO_SIDEBAR,
        'nuwara-eliya': NUWARA_ELIYA_SIDEBAR,
        bentota: BENTOTA_SIDEBAR,
        mirissa: MIRISSA_SIDEBAR,
        sapporo: SAPPORO_SIDEBAR,
        osaka: OSAKA_SIDEBAR,
        hiroshima: HIROSHIMA_SIDEBAR,
        nara: NARA_SIDEBAR,
        nagoya: NAGOYA_SIDEBAR,
        hakone: HAKONE_SIDEBAR,
        'mount-fuji': MOUNT_FUJI_SIDEBAR,
        dubai: DUBAI_SIDEBAR,
        'abu-dhabi': ABU_DHABI_SIDEBAR,
    };
    // No fallback to Agra: a Kandy page showing Taj Mahal links is worse than
    // a page with no sidebar. Cities without a map entry render none.
    // city arrives as a display name ('Mount Fuji'), not a slug, so it must be
    // slugified before any keyed lookup. Keying on toLowerCase() alone silently
    // dropped the sidebar on every two-word city: Chiang Mai, Nuwara Eliya,
    // Mount Fuji. Single-word cities hid the bug for months.
    const sidebarItems = SIDEBAR_MAP[urlSlug(city)] || [];

    return (
        <div className="min-h-screen bg-white">
            {/* JSON-LD moved to server component (app/[country]/[city]/[slug]/page.tsx) for guaranteed raw HTML rendering */}

            {/* Hero Section.
                The nav overlay sits OUTSIDE the clipping container: the hero itself needs
                overflow-hidden for the object-cover image, but the language dropdown opens
                downward and was being cut off by it (badly so on mobile, where the hero is
                only 40vh). Keeping the overlay as a sibling leaves the visuals identical. */}
            <div className="relative">
                <div className="relative h-[40vh] md:h-[60vh] overflow-hidden">
                    <img
                        /* Full-bleed hero, but never wider than a large screen.
                           Asking for the original pulled the untouched file. */
                        src={imageLoader({ src: data.heroImage, width: 1600 })}
                        alt={data.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#001A33] via-[#001A33]/40 to-transparent" />

                    <div className="absolute bottom-8 left-0 right-0 px-6 max-w-6xl mx-auto">
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-4 drop-shadow-2xl">
                            {data.title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-4 text-white/90">
                            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/10">
                                <span className="text-[13px] font-black">{t.minRead}</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/10">
                                <span className="text-[13px] font-black">{t.verifiedIntel}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation Overlays */}
                <div className="absolute top-0 left-0 right-0 z-30 p-5 flex justify-between items-center max-w-6xl mx-auto w-full">
                    <button
                        onClick={() => router.back()}
                        className="px-6 py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-all border border-white/20 font-black text-[12px] uppercase tracking-widest"
                    >
                        {t.back}
                    </button>
                    <div className="flex items-center gap-3 min-w-0">
                        {/* hidden on the narrowest screens: the badge is decorative, and at
                            375px it pushed the row wide enough to shove the language menu
                            off the right edge */}
                        <div className="hidden sm:block px-4 py-1.5 bg-[#10B981] rounded-full text-white text-[11px] font-black uppercase tracking-widest shadow-xl">
                            {fmt(t.authorityBadge, { city })}
                        </div>
                        <div className="text-white">
                            <LanguageSwitcher />
                        </div>
                    </div>
                </div>
            </div>

            {/* dir="ltr" is deliberate. The guide body is English (it comes from the
                content files, not the dictionary), and letting it inherit RTL from an
                Arabic <html dir> makes the bidi algorithm reorder mixed runs — "2 hours
                (฿130 bus)" was rendering as "hours (฿130 2 bus)". Pure-Arabic labels in
                here still shape correctly inside an LTR container. Revisit once the guide
                content itself is translated. */}
            <div dir="ltr" className="max-w-6xl mx-auto px-6 py-12">
                {/* Breadcrumbs with JSON-LD */}
                <Breadcrumbs country={country} city={city} tourTitle={data.title} slug={slug} />

                {/* Authority Header / AEO Box */}
                {data.fastFacts && (
                    <div className="mb-16 bg-[#F0FDF4] border border-[#DCFCE7] rounded-[2.5rem] p-8 md:p-12 shadow-sm border-b-4 border-b-[#10B981]">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10 pb-10 border-b border-[#DCFCE7]">
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 bg-[#10B981] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-[#10B981]/20 rotate-3">
                                    <ShieldCheck size={32} />
                                </div>
                                <div>
                                    <p className="text-[12px] font-black text-[#10B981] uppercase tracking-[0.3em] mb-1">{t.sourceAuthority}</p>
                                    <p className="text-[#064E3B] font-black text-2xl">{t.verifiedOfficialIntel}</p>
                                </div>
                            </div>
                            <div className="bg-white/60 backdrop-blur-md px-8 py-3 rounded-full border border-[#DCFCE7] flex items-center gap-3">
                                <div className="w-2 h-2 bg-[#10B981] rounded-full animate-pulse" />
                                <p className="text-[#064E3B] font-black text-[12px] uppercase tracking-widest">
                                    {t.lastUpdated}: {data.lastUpdated || 'Feb 2026'}
                                </p>
                            </div>
                        </div>

                        {/* Fast Facts Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {data.fastFacts.map((fact, idx) => (
                                <div key={idx} className="bg-white p-6 rounded-3xl shadow-sm border border-[#DCFCE7] hover:border-[#10B981] transition-all group hover:-translate-y-1">
                                    <div className="flex items-center gap-5">
                                        <div className="w-12 h-12 bg-[#F0FDF4] text-[#10B981] rounded-2xl flex items-center justify-center group-hover:bg-[#10B981] group-hover:text-white transition-all duration-300">
                                            {renderIcon(fact.icon)}
                                        </div>
                                        <div>
                                            <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">{fact.label}</p>
                                            <p className="text-[#001A33] font-black text-[16px]">{fact.value}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Content Column */}
                    <div className="flex-1">
                        {/* Lead Paragraph */}
                        <div className="mb-12">
                            <p className="text-xl md:text-2xl text-gray-600 font-bold leading-relaxed border-l-4 border-[#10B981] pl-6">
                                {data.description}
                            </p>
                        </div>

                        {/* Content Body */}
                        <div className="space-y-16">
                            {data.sections.map((section: any, index: number) => {
                                if (section.isCTA) {
                                    return (
                                        <div key={index} className="bg-gradient-to-br from-[#001A33] to-[#003366] rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group">
                                            <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                                                {section.image && (
                                                    <div className="w-full md:w-[280px] aspect-[4/3] shrink-0 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 group-hover:scale-[1.02] transition-transform duration-700">
                                                        <img src={imageLoader({ src: section.image, width: 640 })} alt={section.title} loading="lazy" decoding="async" className="w-full h-full object-cover" />
                                                    </div>
                                                )}
                                                <div className="flex-1 text-center md:text-left">
                                                    <h3 className="text-2xl md:text-4xl font-black mb-6 leading-tight">
                                                        {section.title}
                                                    </h3>
                                                    <p className="text-white/80 font-bold text-lg leading-relaxed max-w-xl mb-10">
                                                        {section.content}
                                                    </p>
                                                    {section.buttonLink && (
                                                        <Link
                                                            href={section.buttonLink}
                                                            className="inline-block px-10 py-5 bg-[#10B981] hover:bg-[#059669] text-white font-black rounded-2xl transition-all shadow-xl hover:scale-105 active:scale-95 text-[17px] whitespace-nowrap"
                                                        >
                                                            {section.buttonText}
                                                        </Link>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="absolute top-0 right-0 w-64 h-64 bg-[#10B981]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-1000" />
                                        </div>
                                    );
                                }

                                return (
                                    <article key={index} className="group">
                                        <header className="mb-6">
                                            <span className="text-[#10B981] text-[12px] font-black uppercase tracking-[0.2em] mb-2 block">{t.part} 0{index + 1}</span>
                                            <div className="flex items-center gap-4">
                                                {section.icon && (
                                                    <div className="w-10 h-10 md:w-12 md:h-12 bg-[#F0FDF4] text-[#10B981] rounded-xl flex items-center justify-center shrink-0 shadow-sm border border-[#DCFCE7]">
                                                        {renderIcon(section.icon)}
                                                    </div>
                                                )}
                                                <h2 className="text-2xl md:text-4xl font-black text-[#001A33] group-hover:text-[#10B981] transition-colors leading-tight">
                                                    {section.title}
                                                </h2>
                                            </div>
                                        </header>

                                        {section.image && (
                                            <div className="mb-8 rounded-2xl overflow-hidden shadow-lg border border-gray-100">
                                                <img
                                                    src={imageLoader({ src: section.image, width: 1080 })}
                                                    alt={section.title}
                                                    loading="lazy"
                                                    decoding="async"
                                                    className="w-full h-auto object-cover max-h-[400px]"
                                                />
                                            </div>
                                        )}

                                        <div className="text-[17px] md:text-[18px] text-gray-700 leading-[1.6] font-medium space-y-6">
                                            {section.content.split('\n').map((para: string, pIdx: number) => {
                                                if (!para.trim()) return null;

                                                if (para.startsWith('### ')) {
                                                    return (
                                                        <h3 key={pIdx} className="text-[22px] md:text-[24px] font-black text-[#001A33] mt-10 mb-4 first:mt-0">
                                                            {para.replace('### ', '')}
                                                        </h3>
                                                    );
                                                }

                                                return (
                                                    <p key={pIdx}>
                                                        {renderMarkdownText(para)}
                                                    </p>
                                                );
                                            })}
                                        </div>

                                        {section.table && (
                                            <div className="mt-8 overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
                                                <table className="w-full text-left border-collapse">
                                                    <thead>
                                                        <tr className="bg-gray-50">
                                                            {section.table.headers.map((header: string, hIdx: number) => (
                                                                <th key={hIdx} className="p-4 text-[13px] font-black text-[#001A33] uppercase tracking-wider border-b border-gray-100">{header}</th>
                                                            ))}
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {section.table.rows.map((row: string[], rIdx: number) => (
                                                            <tr key={rIdx} className="hover:bg-gray-50/50 transition-colors">
                                                                {row.map((cell: string, cIdx: number) => (
                                                                    <td key={cIdx} className="p-4 text-[15px] font-medium text-gray-600 border-b border-gray-50">{cell}</td>
                                                                ))}
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        )}

                                        {/* inline tour card */}
                                        {section.tourCard && (
                                            <Link
                                                href={`/${urlSlug(country)}/${urlSlug(city)}/${section.tourCard.slug}`}
                                                className="mt-10 flex flex-col sm:flex-row rounded-2xl border border-[#DCFCE7] overflow-hidden shadow-sm hover:shadow-xl hover:border-[#10B981]/50 transition-all duration-300 group/card"
                                            >
                                                <div className="sm:w-[220px] h-[160px] sm:h-auto shrink-0 overflow-hidden bg-gray-100">
                                                    <img
                                                        /* 220x160 card, so do not pull the original. */
                                                        src={imageLoader({ src: section.tourCard.image || section.image || PLACEHOLDER_IMG, width: 384 })}
                                                        alt={section.tourCard.title}
                                                        loading="lazy"
                                                        decoding="async" 
                                                        className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
                                                    />
                                                </div>
                                                <div className="flex-1 p-6 bg-[#F0FDF4] group-hover/card:bg-white transition-colors duration-300">
                                                    <div className="flex items-start justify-between gap-3 mb-2">
                                                        <span className="text-[11px] font-black text-[#10B981] uppercase tracking-[0.25em]">{t.featuredTour}</span>
                                                        {section.tourCard.rating && (
                                                            <div className="flex items-center gap-1 shrink-0">
                                                                <Star size={13} fill="#F59E0B" className="text-[#F59E0B]" />
                                                                <span className="text-[13px] font-black text-gray-700">{section.tourCard.rating}</span>
                                                                {section.tourCard.reviews && (
                                                                    <span className="text-[12px] text-gray-400 font-medium">({section.tourCard.reviews})</span>
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <h4 className="font-black text-[#001A33] text-[17px] mb-2 group-hover/card:text-[#10B981] transition-colors leading-snug">
                                                        {section.tourCard.title}
                                                    </h4>
                                                    <p className="text-gray-500 text-[14px] font-medium mb-5 leading-relaxed line-clamp-2">
                                                        {section.tourCard.description}
                                                    </p>
                                                    <div className="flex items-end justify-between gap-4">
                                                        <div>
                                                            {section.tourCard.price && (
                                                                <p className="text-[#001A33] font-black text-[18px]">{section.tourCard.price}</p>
                                                            )}
                                                            {section.tourCard.duration && (
                                                                <p className="text-gray-400 text-[13px] font-medium">{section.tourCard.duration}</p>
                                                            )}
                                                        </div>
                                                        <div className="px-6 py-3 bg-[#10B981] text-white font-black text-[14px] rounded-xl group-hover/card:bg-[#059669] transition-colors shadow-sm whitespace-nowrap">
                                                            Book Now →
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        )}
                                    </article>
                                );
                            })}
                        </div>

                        {/* FAQ Section */}
                        {data.faqs && data.faqs.length > 0 && (
                            <section className="mt-24">
                                <h2 className="text-3xl md:text-4xl font-black text-[#001A33] mb-12">
                                    Frequently Asked Questions
                                </h2>
                                <div className="space-y-6">
                                    {data.faqs.map((faq, fIdx) => (
                                        <div key={fIdx} className="bg-gray-50 rounded-3xl p-8 border border-gray-100 hover:border-[#10B981]/30 transition-all duration-300">
                                            <h3 className="text-xl font-black text-[#001A33] mb-4 flex gap-3">
                                                <span className="text-[#10B981]">Q.</span>
                                                {faq.q}
                                            </h3>
                                            <div className="text-gray-600 font-medium leading-relaxed pl-8 space-y-2">
                                                {faq.a.split('\n').map((line: string, lIdx: number) => (
                                                    <p key={lIdx}>
                                                        {renderMarkdownText(line)}
                                                    </p>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Recommended Tours — Internal linking from authority pages to tour pages */}
                        {CITY_RECOMMENDED_TOURS[urlSlug(city)] && (
                            <section className="mt-24">
                                <h2 className="text-3xl md:text-4xl font-black text-[#001A33] mb-4">
                                    {fmt(t.topRatedTours, { city })}
                                </h2>
                                <p className="text-gray-500 font-medium text-lg mb-10">
                                    Handpicked experiences with licensed local guides. Instant confirmation.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    {CITY_RECOMMENDED_TOURS[urlSlug(city)]!.map((tour, idx) => (
                                        <Link
                                            key={idx}
                                            href={`/${urlSlug(country)}/${urlSlug(city)}/${tour.slug}`}
                                            className="group rounded-2xl border border-gray-100 overflow-hidden hover:border-[#10B981]/40 hover:shadow-xl transition-all duration-300 bg-white"
                                        >
                                            {tour.image ? (
                                                <div className="relative h-[180px] overflow-hidden">
                                                    <img
                                                        src={imageLoader({ src: tour.image, width: 640 })}
                                                        alt={tour.title}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                        loading="lazy"
                                                    />
                                                    {tour.rating && (
                                                        <div className="absolute top-3 left-3 flex items-center gap-1 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-lg shadow-sm">
                                                            <Star size={12} fill="#F59E0B" className="text-[#F59E0B]" />
                                                            <span className="text-[13px] font-black text-gray-800">{tour.rating}</span>
                                                        </div>
                                                    )}
                                                    {tour.price && (
                                                        <div className="absolute bottom-3 right-3 bg-[#001A33]/80 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-[13px] font-black">
                                                            {tour.price}
                                                        </div>
                                                    )}
                                                </div>
                                            ) : (
                                                <div className="h-[60px] bg-gradient-to-r from-[#F0FDF4] to-[#DCFCE7] flex items-center px-5">
                                                    <Ticket size={18} className="text-[#10B981]" />
                                                </div>
                                            )}
                                            <div className="p-5">
                                                <h3 className="font-black text-[#001A33] text-[15px] group-hover:text-[#10B981] transition-colors mb-1.5 leading-snug line-clamp-2">
                                                    {tour.title}
                                                </h3>
                                                <p className="text-gray-500 text-[13px] font-medium line-clamp-2">{tour.description}</p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Bottom CTA */}
                        <section className="mt-24 p-1 bg-gradient-to-r from-[#10B981] to-[#059669] rounded-[40px]">
                            <div className="bg-[#001A33] rounded-[38px] p-8 md:p-12 text-white text-center">
                                <h2 className="text-3xl md:text-5xl font-black mb-4">{fmt(t.discoverTheReal, { city })}</h2>
                                <p className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl mx-auto font-medium">
                                    {t.localMastery}
                                </p>
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                                    <Link
                                        href={`/${urlSlug(country)}/${urlSlug(city)}`}
                                        className="w-full sm:w-auto px-10 py-5 bg-[#10B981] text-white font-black rounded-full hover:bg-white hover:text-[#10B981] transition-all duration-300 flex items-center justify-center text-xl shadow-xl hover:-translate-y-1 hover:scale-[1.05] active:scale-[0.95]"
                                    >
                                        {fmt(t.browseTours, { city: slug === 'taj-mahal' ? 'Taj Mahal' : city })}
                                    </Link>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Sidebar */}
                    <aside className="lg:w-[350px] shrink-0">
                        <div className="sticky top-32 space-y-8">
                            {/* Pillar Nav */}
                            <div className="bg-white rounded-[32px] border border-gray-100 p-8 shadow-md">
                                <h4 className="text-lg font-black text-[#001A33] mb-6">{fmt(t.guideHub, { city })}</h4>
                                <div className="space-y-2">
                                    {sidebarItems.map((item, idx) => (
                                        <Link
                                            key={idx}
                                            href={`/${urlSlug(country)}/${urlSlug(city)}/${item.slug}`}
                                            className={`flex items-center justify-between p-4 rounded-xl transition-all duration-300 group ${slug === item.slug
                                                ? 'bg-[#10B981] text-white shadow-lg shadow-[#10B981]/30 scale-[1.02] -translate-y-0.5'
                                                : 'bg-gray-50 hover:bg-white hover:shadow-md hover:border-[#10B981]/20 border border-transparent text-[#001A33] hover:-translate-y-1'
                                                }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                {slug === item.slug && <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />}
                                                <span className="font-black text-[14px] tracking-tight">{item.name}</span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Support Widget */}
                            <div className="bg-[#10B981] rounded-[32px] p-8 text-white shadow-xl shadow-[#10B981]/20 relative overflow-hidden group/support">
                                <div className="relative z-10">
                                    <h4 className="text-lg font-black mb-4">{t.needHelp}</h4>
                                    <p className="text-white/80 font-bold text-sm mb-6">
                                        {fmt(t.messageGuide, { city })}
                                    </p>
                                    <Link
                                        href={`/${urlSlug(country)}/${urlSlug(city)}`}
                                        className="w-full py-4 bg-white text-[#10B981] font-black rounded-xl hover:bg-gray-50 transition-all text-[15px] shadow-lg hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center"
                                    >
                                        {fmt(t.browseTours, { city: slug === 'taj-mahal' ? 'Taj Mahal' : city })}
                                    </Link>
                                </div>
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover/support:scale-150 transition-transform duration-700" />
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
