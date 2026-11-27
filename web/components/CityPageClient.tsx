'use client';
import { PLACEHOLDER_IMG } from '@/lib/placeholder';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { imageLoader } from '@/lib/imageLoader';
import { sitePhoto } from '@/lib/sitePhotos';
import { tagsForTitle, tagCounts } from '@/lib/tourTags';
import { BALI_GUIDES } from '@/lib/guides';
import { JAPAN_GUIDES } from '@/lib/guides';
import { EUROPE_GUIDES } from '@/lib/guides';

// Data-driven Essential Guides: every authority page of the city, one source of truth.
const CITY_GUIDES: Record<string, { name: string; slug: string; image: string }[]> = { ...BALI_GUIDES, ...JAPAN_GUIDES, ...EUROPE_GUIDES };
import {
  MapPin, Star, Clock, Users, Search, Filter, Heart, User, Globe, ChevronDown, Calendar, ChevronUp, Mail,
  HelpCircle,
  HelpCircle as HelpIcon, ArrowLeft, Ticket, Info, ChevronRight, Home
} from 'lucide-react';
import LanguageSwitcher, { useLanguage } from '@/components/LanguageSwitcher';
import Breadcrumbs from '@/components/Breadcrumbs';

interface CityPageClientProps {
  tours: any[];
  moreLinks?: { slug: string; title: string }[];
  country: string;
  city: string;
}

// City descriptions for SEO - Battle-tested structure
const CITY_DESCRIPTIONS: Record<string, {
  title: string;
  description: string;
  intro: string[];
  whyBook: string[];
  topAttractions: string[];
  bestTime: string;
  faqs: { question: string; answer: string }[];
}> = {
  // Per-city editorial content. Empty on GlobeWithLocals until each European
  // city gets its own copy; unknown cities fall back to the generic block below.
};

// Things to Do Section Component (OTA-style)
interface ThingsToDoSectionProps {
  city: string;
}

const ThingsToDoSection: React.FC<ThingsToDoSectionProps> = ({ city }) => {
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());

  const toggleCard = (index: number) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedCards(newExpanded);
  };

  const thingsToDoData: Record<string, Array<{
    title: string;
    image: string;
    shortDescription: string;
    fullDescription: string;
    seoKeywords: string[];
    faqs?: Array<{ q: string; a: string }>;
  }>> = {
  };

  const thingsToDo = thingsToDoData[city] || [];

  return (
    <section className="mb-16">
      <h2 className="text-3xl font-black text-[#001A33] mb-8">
        Our Most Recommended Things to Do in {city}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
        {thingsToDo.map((item, index) => {
          const isExpanded = expandedCards.has(index);
          return (
            <div
              key={index}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col gap-0">
                {/* Image Section */}
                <div className="w-full shrink-0">
                  <Image
                    src={item.image} loader={imageLoader}
                    alt={`${item.title} in ${city} `}
                    width={400}
                    height={208}
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                    quality={72}
                    loading="lazy"
                    className="w-full h-36 md:h-44 object-cover"
                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                    onError={(e) => {
                      // Fallback to placeholder if image not found
                      const target = e.target as HTMLImageElement;
                      // Try .avif extension if .webp fails
                      if (target.src.endsWith('.webp')) {
                        target.src = target.src.replace('.webp', '.avif');
                      } else {
                        target.src = PLACEHOLDER_IMG;
                      }
                    }}
                  />
                </div>

                {/* Content Section */}
                <div className="p-4 md:p-5 flex flex-col">
                  <h3 className="text-lg md:text-xl font-black text-[#001A33] mb-2">
                    {item.title}
                  </h3>

                  <div className="text-[14px] md:text-[15px] text-gray-700 font-semibold leading-relaxed mb-3">
                    {/* Helper to render text with markdown-style links and bolding */}
                    {(() => {
                      const renderWithLinks = (text: string) => {
                        return text.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\))/g).map((part, i) => {
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
                      };

                      return isExpanded ? (
                        <div className="space-y-4">
                          <p className="text-gray-800">{renderWithLinks(item.shortDescription)}</p>
                          <p className="text-gray-600 border-l-4 border-[#10B981]/20 pl-4 italic">{renderWithLinks(item.fullDescription)}</p>

                          {item.faqs && item.faqs.length > 0 && (
                            <div className="mt-6 pt-6 border-t border-gray-100">
                              <h4 className="text-lg font-black text-[#001A33] mb-4 flex items-center gap-2">
                                <HelpCircle size={20} className="text-[#10B981]" />
                                Tactical Tour Intelligence (FAQs)
                              </h4>
                              <div className="space-y-4">
                                {item.faqs.map((faq, fIdx) => (
                                  <div key={fIdx} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                                    <p className="font-black text-[#001A33] mb-2">Q: {faq.q}</p>
                                    <div className="text-gray-700 font-medium text-[15px] leading-relaxed">
                                      {renderWithLinks(faq.a)}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <p>{renderWithLinks(item.shortDescription)}</p>
                      );
                    })()}
                  </div>

                  {/* See More/Less Button */}
                  <button
                    onClick={() => toggleCard(index)}
                    className="text-[#10B981] font-bold text-[14px] hover:text-[#059669] transition-colors flex items-center gap-1 self-start mt-auto"
                  >
                    {isExpanded ? (
                      <>
                        <ChevronUp size={16} />
                        See less
                      </>
                    ) : (
                      <>
                        <ChevronDown size={16} />
                        See more
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

// Email Signup Box Component
interface EmailSignupBoxProps {
  city: string;
  country: string;
}

const EmailSignupBox: React.FC<EmailSignupBoxProps> = ({ city, country }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:3001';
      const response = await fetch(`${API_URL}/api/email/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          city,
          country,
          subscriptionType: 'itinerary'
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess(true);
        setEmail('');
      } else {
        setError(data.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <section className="mb-12">
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="bg-[#10B981] p-8 text-center">
            <div className="text-4xl mb-4">✅</div>
            <h2 className="text-2xl font-black text-white mb-2">Check Your Email!</h2>
            <p className="text-white opacity-95">
              We've sent you a verification email. Click the link to receive your {city} itinerary.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mb-10">
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {/* Decorative panel */}
          <div className="md:col-span-2 relative h-52 md:h-56 overflow-hidden bg-gradient-to-br from-[#10B981] to-[#001A33]" aria-hidden="true">
            {/* City photo as a background layer over the gradient; if a city has no photo the gradient shows. */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${sitePhoto(`city-${city.toLowerCase().replace(/\s+/g, '-')}`)})` }}
            />
          </div>

          {/* Form Section */}
          <div className="md:col-span-1 bg-[#10B981]/10 p-4 md:p-5 flex flex-col justify-center relative z-20">
            <h2 className="text-xl md:text-2xl font-black text-[#001A33] mb-2">
              Your {city} itinerary is waiting
            </h2>
            <p className="text-[13px] md:text-[14px] text-[#001A33] mb-4 font-semibold">
              Receive a curated 48-hour itinerary featuring the most iconic experiences in {city}, straight to your inbox.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                  className="w-full px-3 py-2.5 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent text-[14px]"
                  disabled={loading}
                />
                <Mail size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#10B981] hover:bg-[#059669] text-white font-bold py-2.5 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-[14px]"
              >
                {loading ? 'Signing up...' : 'Sign up'}
              </button>

              {error && (
                <p className="text-red-600 text-xs font-semibold">{error}</p>
              )}
            </form>
          </div>
        </div>

        {/* Privacy Disclaimer */}
        <div className="p-3 bg-gray-50 border-t border-gray-200">
          <p className="text-[11px] text-gray-600 text-center">
            By signing up, you agree to receive promotional emails on activities and insider tips. You can unsubscribe or withdraw your consent at any time with future effect. For more information, read our{' '}
            <Link href="/privacy-policy" className="underline text-[#10B981] hover:text-[#059669]">
              Privacy statement
            </Link>.
          </p>
        </div>
      </div>
    </section>
  );
};

const formatDurationDisplay = (durationStr: string | null | undefined) => {
  if (!durationStr) return null;

  // Match days or hours
  const match = durationStr.match(/(\d+(?:\.\d+)?)\s*(days?|hours?|hrs?)/i);
  if (!match) return durationStr;

  const num = parseFloat(match[1]);
  const unit = match[2].toLowerCase();

  // Convert hours to days if multiples of 24
  if (unit.startsWith('h') && num >= 24 && num % 24 === 0) {
    const d = num / 24;
    return `${d} ${d === 1 ? 'day' : 'days'}`;
  }

  // Return as is (hours stay as hours, days stay as days)
  return durationStr;
};

export default function CityPageClient({ tours: initialTours, moreLinks = [], city, country }: CityPageClientProps) {
  const { t } = useLanguage();
  const tours = initialTours;
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<string>('recommended');
  // Topic chips (Mount Batur, Waterfalls, Surf...) and a paged grid. Ubud has
  // 600+ tours; rendering every card at once made a 7MB page.
  const [activeTag, setActiveTag] = useState<string>('all');
  const PAGE = 24;
  const [visibleCount, setVisibleCount] = useState(PAGE);
  const availableTags = useMemo(() => tagCounts(tours), [tours]);
  useEffect(() => { setVisibleCount(PAGE); }, [activeTag, filterCategory, searchQuery, sortBy]);

  // Get city info with defaults
  const cityInfo = CITY_DESCRIPTIONS[city] || {
    title: `${city} Tours & Things to Do | Guided Experiences by Locals`,
    description: `Discover the best tours in ${city} with licensed local guides.Book authentic experiences and cultural tours.`,
    intro: [
      `${city} offers rich cultural experiences and historical sites waiting to be explored.`,
      `At GlobeWithLocals, discover expert - led tours in ${city} hosted by licensed local guides.Explore authentic, locally curated experiences that showcase the best of ${city}.`
    ],
    whyBook: [
      'Licensed & experienced local experts',
      'Cultural and historical context you won\'t find in guidebooks',
      'Ethical, small-group experiences',
      'Direct support to local communities'
    ],
    topAttractions: [],
    bestTime: `The best time to visit ${city} is during the cooler months when weather is pleasant for sightseeing.`,
    faqs: []
  };

  // Filter tours
  const filteredTours = tours.filter(tour => {
    const matchesCategory = filterCategory === 'all' || tour.category === filterCategory;
    if (activeTag !== 'all' && !tagsForTitle(tour.title).includes(activeTag)) return false;
    const matchesSearch = searchQuery === '' ||
      tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (tour.shortDescription && tour.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Generate country slug
  const countrySlug = country.toLowerCase().replace(/\s+/g, '-');
  const citySlug = city.toLowerCase().replace(/\s+/g, '-');

  // Preferred top-rated tours to prioritize in the list (order = display order), per city
  const cityPreferred: Record<string, { titles: string[]; ratings: number[] }> = {};

  const currentCityPreferred = cityPreferred[citySlug] || { titles: [], ratings: [] };
  const preferredTitles = currentCityPreferred.titles;

  // Fixed ratings for preferred tours (matched by index above)
  const preferredRatings = currentCityPreferred.ratings;

  // Helper: exact title match (case-insensitive, trimmed)
  const matchPreferred = (tourTitle: string) => {
    const t = tourTitle?.toLowerCase().trim() || '';
    return preferredTitles.findIndex(pt => t === pt.toLowerCase().trim());
  };

  // Rating shown on the card: the real average from the review data when the
  // tour has reviews, the hand-set figure for the owned Agra/Delhi tours, and
  // otherwise nothing (the card says "New"). The old version derived a number
  // from the tour id, which is a fabricated rating.
  const calculateRating = (tour: any): number | null => {
    const prefIndex = matchPreferred(tour.title);
    if (prefIndex !== -1) return preferredRatings[prefIndex];
    if (typeof tour.rating === 'number' && tour.rating > 0) return tour.rating;
    // GlobeWithLocals launched after the real-or-nothing rule: no seeded fallback.
    return null;
  };

  const PINNED_SUPPLIERS: Record<string, string[]> = {};
  const pinnedRank = (t: any) => {
    const list = PINNED_SUPPLIERS[citySlug] || [];
    const i = list.indexOf(String(t.supplierId ?? ''));
    return i === -1 ? list.length : i;
  };

  // Sort tours
  const sortedTours = [...filteredTours].sort((a, b) => {
    if (sortBy === 'recommended') {
      const pa = pinnedRank(a), pb = pinnedRank(b);
      if (pa !== pb) return pa - pb;
      const aIndex = matchPreferred(a.title);
      const bIndex = matchPreferred(b.title);

      // Prioritize preferred tours first
      if (aIndex !== -1 && bIndex === -1) return -1;
      if (bIndex !== -1 && aIndex === -1) return 1;
      if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;

      // Sort by rating (descending)
      // A 5.0 from one review should not outrank a 4.8 from five thousand:
      // weight the rating by the log of the review count.
      const score = (t: any) => (calculateRating(t) ?? 0) * Math.log10((t.reviewCount || 0) + 2);
      return score(b) - score(a);
    } else if (sortBy === 'price-low') {
      return a.pricePerPerson - b.pricePerPerson;
    } else if (sortBy === 'price-high') {
      return b.pricePerPerson - a.pricePerPerson;
    }
    return 0;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* JSON-LD moved to server component (app/[country]/[city]/page.tsx) for guaranteed raw HTML rendering */}

      {/* Header Navigation */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="w-full h-24 sm:h-28 md:h-32 flex items-center justify-between px-3 sm:px-4 md:px-6">
          <div className="flex items-center gap-3 h-full">
            {/* Logo - Clickable to Homepage */}
            <Link href="/" className="flex items-center h-full cursor-pointer">
              <span className="flex items-center gap-2"><img src="/logo.png" alt="GlobeWithLocals logo" width="44" height="44" className="h-8 w-8 sm:h-11 sm:w-11 object-contain" /><span className="text-xl sm:text-3xl font-black tracking-tight text-[#001A33]">GlobeWithLocals</span></span>
            </Link>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 text-[13px] font-semibold text-[#001A33]">
            <div className="flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-5">
              <LanguageSwitcher />
              <button className="flex flex-col items-center gap-0.5 sm:gap-1 hover:text-[#10B981] p-1.5 sm:p-2 min-w-[44px] min-h-[44px] justify-center">
                <User size={18} className="sm:w-5 sm:h-5" />
                <span className="hidden lg:block text-[11px]">{t.profile}</span>
              </button>
            </div>
          </div>
        </div>
      </header>


      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Back Button */}
        <button
          onClick={() => {
            if (window.history.length > 1) {
              window.history.back();
            } else {
              window.location.href = '/';
            }
          }}
          className="flex items-center gap-2 text-[#10B981] hover:text-[#059669] font-semibold mb-4 transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back</span>
        </button>

        {/* Breadcrumbs with JSON-LD */}
        <Breadcrumbs country={country} city={city} />

        {/* H1 - SEO Gold (ONLY ONE H1) */}
        <h1 className="text-4xl md:text-5xl font-black text-[#001A33] mb-8">
          Guided Tours & Things to Do in {city}
        </h1>

        {/* Intro Content - 2-3 Paragraphs (Mandatory for SEO) */}
        <div className="mb-10 space-y-4 text-[16px] text-gray-700 font-semibold leading-relaxed max-w-4xl">
          {cityInfo.intro.map((paragraph, index) => (
            <p key={index} className={index > 0 ? 'hidden md:block' : ''}>
              {paragraph.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\))/g).map((part, i) => {
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
              })}
            </p>
          ))}
        </div>

        {/* Popular Tours & Experiences */}
        {sortedTours.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-black text-[#001A33] mb-6">
              Popular Tours & Experiences in {city}
            </h2>
            {availableTags.length >= 3 && (
              <div className="flex gap-2 overflow-x-auto pb-3 mb-5 -mx-1 px-1" role="tablist" aria-label="Filter tours by topic">
                {[['all', tours.length] as [string, number], ...availableTags].map(([tag, n]) => (
                  <button
                    key={tag}
                    type="button"
                    role="tab"
                    aria-selected={activeTag === tag}
                    onClick={() => setActiveTag(tag)}
                    className={`shrink-0 px-4 py-2 rounded-full text-[14px] font-semibold border transition-colors whitespace-nowrap ${activeTag === tag ? 'bg-[#10B981] text-white border-[#10B981]' : 'bg-white text-[#001A33] border-gray-300 hover:border-[#10B981] hover:text-[#10B981]'}`}
                  >
                    {tag === 'all' ? 'All' : tag} <span className={activeTag === tag ? 'text-white/80' : 'text-gray-500'}>{n}</span>
                  </button>
                ))}
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-8">
              {sortedTours.slice(0, visibleCount).map((tour, index) => {
                const tourSlug = tour.slug;
                if (!tourSlug) return null; // Skip tours without valid slugs
                const hasSkipLine = tour.included && tour.included.toLowerCase().includes('skip');
                const hasPickup = tour.meetingPoint || (tour.included && tour.included.toLowerCase().includes('pickup'));

                const rating = calculateRating(tour);
                const displayRating = rating === null ? '' : rating.toFixed(1);
                const isTopRated = rating !== null && rating >= 4.5 && (tour.reviewCount || 0) >= 10;

                // Parse duration to extract hours
                const durationMatch = tour.duration?.match(/(\d+)\s*hours?/i) || tour.duration?.match(/(\d+)\s*hrs?/i);
                const durationHours = durationMatch ? durationMatch[1] : null;

                // Get lowest price from first tier of groupPricingTiers (price for 1 person)
                let lowestPrice = 0;

                // PRIORITY 1: Check tour.groupPricingTiers directly (most reliable)
                if (tour.groupPricingTiers) {
                  try {
                    const tiers = typeof tour.groupPricingTiers === 'string'
                      ? JSON.parse(tour.groupPricingTiers)
                      : tour.groupPricingTiers;
                    if (Array.isArray(tiers) && tiers.length > 0 && tiers[0]?.price) {
                      lowestPrice = parseFloat(tiers[0].price) || 0;
                    }
                  } catch (e) {
                    console.error('Error parsing tour groupPricingTiers:', e);
                  }
                }

                // PRIORITY 2: Check tour options for groupPricingTiers
                if (lowestPrice === 0 && tour.options && Array.isArray(tour.options) && tour.options.length > 0) {
                  for (const opt of tour.options) {
                    if (opt.groupPricingTiers) {
                      try {
                        const tiers = typeof opt.groupPricingTiers === 'string'
                          ? JSON.parse(opt.groupPricingTiers)
                          : opt.groupPricingTiers;
                        if (Array.isArray(tiers) && tiers.length > 0 && tiers[0]?.price) {
                          const firstTierPrice = parseFloat(tiers[0].price) || 0;
                          if (firstTierPrice > 0) {
                            lowestPrice = lowestPrice === 0 ? firstTierPrice : Math.min(lowestPrice, firstTierPrice);
                          }
                        }
                      } catch (e) {
                        console.error('Error parsing option groupPricingTiers:', e);
                      }
                    }
                  }
                }

                // FALLBACK: Use pricePerPerson only if no tiers found
                if (lowestPrice === 0) {
                  lowestPrice = tour.pricePerPerson || 0;
                }

                return (
                  <Link
                    key={tour.id}
                    href={`/${countrySlug}/${citySlug}/${tourSlug}`}
                    className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all group flex flex-row md:flex-col"
                  >
                    {/* Image Section */}
                    <div className="relative h-32 w-36 min-w-[144px] md:h-56 md:w-full md:min-w-0 overflow-hidden">
                      {tour.images && tour.images.length > 0 ? (
                        <Image
                          src={tour.images[0]} loader={imageLoader}
                          alt={`${tour.title} — guided tour in ${city}`}
                          width={400}
                          height={208}
                          // Cards render ~144px wide on mobile, ~25vw in the 4-col desktop grid.
                          // Without sizes, Next serves one oversized variant to every device.
                          sizes="(max-width: 768px) 160px, (max-width: 1280px) 50vw, 25vw"
                          quality={72}
                          loading={index < 4 ? 'eager' : 'lazy'}
                          priority={index < 4}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#10B981]/20 to-[#1E3A5F]/20 flex items-center justify-center">
                          <span className="text-gray-400 text-sm font-medium">No image</span>
                        </div>
                      )}
                        {/* Brand Logo Overlay */}

                        {/* Top Rated Badge */}
                        {isTopRated && (
                          <div className="absolute top-2 left-2 md:top-3 md:left-3">
                            <span className="px-1.5 py-0.5 md:px-2.5 md:py-1 bg-[#10B981] text-white text-[8px] md:text-[10px] font-black rounded-md">
                              Top rated
                            </span>
                          </div>
                        )}
                        {/* Wishlist Heart */}
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                          }}
                          className="absolute top-2 right-2 p-1 md:top-3 md:right-3 md:p-2 bg-white/90 hover:bg-white rounded-full transition-colors"
                        >
                          <Heart size={18} className="text-gray-600" />
                        </button>
                      </div>

                    {/* Content Section */}
                    <div className="p-3 md:p-4 flex-1 flex flex-col justify-between">
                      {/* H3 - Tour Title (SEO Gold) */}
                      <h3 className="text-[13px] md:text-[16px] font-bold md:font-black text-[#001A33] mb-1 md:mb-3 line-clamp-2 group-hover:text-[#10B981] transition-colors leading-tight">
                        {tour.title}
                      </h3>

                      {/* Duration */}
                      {tour.duration && (
                        <div className="text-[11px] md:text-[12px] text-gray-500 font-semibold mb-1 md:mb-3">
                          {formatDurationDisplay(tour.duration)}
                        </div>
                      )}

                      {/* Tour Types */}
                      {tour.tourTypes && (() => {
                        try {
                          const tourTypesArray = typeof tour.tourTypes === 'string' ? JSON.parse(tour.tourTypes) : tour.tourTypes;
                          if (Array.isArray(tourTypesArray) && tourTypesArray.length > 0) {
                            // Display up to 2-3 tour types to avoid clutter
                            const displayCount = Math.min(tourTypesArray.length, 3);
                            return (
                              <div className="hidden md:flex flex-wrap gap-2 mb-3">
                                {tourTypesArray.slice(0, displayCount).map((type: string, idx: number) => (
                                  <span
                                    key={idx}
                                    className="px-2 py-1 bg-[#10B981]/10 text-[#10B981] text-[10px] font-semibold rounded-full border border-[#10B981]/20"
                                  >
                                    {type}
                                  </span>
                                ))}
                                {tourTypesArray.length > displayCount && (
                                  <span className="px-2 py-1 text-gray-500 text-[10px] font-semibold">
                                    +{tourTypesArray.length - displayCount}
                                  </span>
                                )}
                              </div>
                            );
                          }
                        } catch (e) {
                          console.error('Error parsing tourTypes:', e);
                        }
                        return null;
                      })()}

                      {/* Rating & Activity Provider Row */}
                      <div className="flex items-center justify-between mb-1 md:mb-3">
                        {/* Rating */}
                        {rating === null ? (
                          <span className="text-[12px] md:text-[13px] font-semibold text-gray-500">New on GlobeWithLocals</span>
                        ) : (
                        <div className="flex items-center gap-1.5">
                          <div className="flex items-center gap-0.5">
                            {[...Array(5)].map((_, i) => {
                              const starRating = parseFloat(displayRating);
                              const filled = i < Math.floor(starRating);
                              const halfFilled = i === Math.floor(starRating) && starRating % 1 >= 0.5;
                              return (
                                <div key={i} className="relative">
                                  <Star
                                    size={14}
                                    className="text-gray-300"
                                  />
                                  {(filled || halfFilled) && (
                                    <Star
                                      size={14}
                                      className={`absolute top-0 left-0 text-yellow-400 fill-yellow-400 ${halfFilled ? 'clip-path-half' : ''}`}
                                      style={halfFilled ? { clipPath: 'inset(0 50% 0 0)' } : {}}
                                    />
                                  )}
                                </div>
                              );
                            })}
                          </div>
                          <span className="text-[12px] md:text-[14px] font-black text-[#001A33]">{displayRating}</span>
                          {tour.reviewCount > 0 && <span className="text-[11px] md:text-[12px] text-gray-500">({tour.reviewCount})</span>}
                        </div>
                        )}
                      </div>

                      {/* Price Row */}
                      <div className="flex items-center justify-between pt-0 md:pt-2 border-t-0 md:border-t border-gray-100">
                        <div className="text-right w-full">
                          <div className="text-[14px] md:text-[18px] font-black text-[#001A33]">
                            Starting from {tour.currency === 'INR' ? '₹' : tour.currency === 'JPY' ? '¥' : tour.currency === 'IDR' ? 'Rp' : tour.currency === 'THB' ? '฿' : tour.currency === 'EUR' ? '€' : '$'}{lowestPrice.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
            {/* Every tour as a plain link, so crawlers (and screen readers) get the
                full inventory even though the card grid is paged. ~100 bytes a link. */}
            {(tours.length > visibleCount || moreLinks.length > 0) && (
              <details className="mb-8 text-[13px] text-gray-500">
                <summary className="cursor-pointer font-semibold text-[#001A33]">All {tours.length + moreLinks.length} tours in {city}, A to Z</summary>
                <ul className="mt-3 columns-1 sm:columns-2 lg:columns-3 gap-6 [&>li]:break-inside-avoid">
                  {[...tours, ...moreLinks].sort((a, b) => a.title.localeCompare(b.title)).map((t) => (
                    <li key={t.slug} className="py-0.5">
                      <Link href={`/${countrySlug}/${citySlug}/${t.slug}`} className="hover:text-[#10B981]">{t.title}</Link>
                    </li>
                  ))}
                </ul>
              </details>
            )}
            {sortedTours.length > visibleCount && (
              <div className="text-center mb-8">
                <button
                  type="button"
                  onClick={() => setVisibleCount((c) => c + PAGE)}
                  className="px-6 py-3 rounded-xl bg-[#10B981] text-white font-black text-[15px] hover:bg-[#0ea371] transition-colors shadow-sm"
                >
                  Show more ({sortedTours.length - visibleCount} left)
                </button>
              </div>
            )}
          </section>
        )}

        {/* No Tours Found Message */}
        {sortedTours.length === 0 && (
          <div className="mb-12 text-center py-12 bg-gray-50/50 rounded-2xl border border-gray-100">
            <div className="bg-white inline-flex p-4 rounded-full shadow-sm mb-4">
              <MapPin size={32} className="text-[#10B981]" />
            </div>
            <h3 className="text-xl font-black text-[#001A33] mb-2">No tours found in {city}</h3>
            <p className="text-gray-500 max-w-md mx-auto mb-6">
              We're currently expanding our offerings. Check back soon for new experiences!
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2.5 bg-[#10B981] text-white font-bold rounded-xl hover:bg-[#059669] transition-all"
            >
              Refresh Results
            </button>
          </div>
        )}

        {/* H2 #1: Things to Do Section */}
        <ThingsToDoSection city={city} />

        {/* H2 #2: Why Book with Local Guides */}
        <section className="mb-12">
          <h2 className="text-3xl font-black text-[#001A33] mb-6">
            Why Book {city} Tours with Local Guides?
          </h2>
          <ul className="space-y-3 max-w-3xl">
            {cityInfo.whyBook.map((reason, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#10B981] rounded-full mt-2 shrink-0"></div>
                <span className="text-[16px] text-gray-700 font-semibold">{reason}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* H2 #3: Top Attractions */}
        {cityInfo.topAttractions.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-black text-[#001A33] mb-6">
              Top Attractions Covered in {city} Tours
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl">
              {cityInfo.topAttractions.map((attraction, index) => (
                <div key={index} className="flex items-center gap-2 text-[16px] text-gray-700 font-semibold">
                  <MapPin size={16} className="text-[#10B981] shrink-0" />
                  <span>{attraction}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* H2 #4: Best Time to Visit */}
        <section className="mb-12">
          <h2 className="text-3xl font-black text-[#001A33] mb-4">
            Best Time to Visit {city}
          </h2>
          <p className="text-[16px] text-gray-700 font-semibold leading-relaxed max-w-3xl">
            {cityInfo.bestTime.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\))/g).map((part, i) => {
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
            })}
          </p>
        </section>

        {/* Bali + Japan cities: Essential Guides, data-driven from lib/baliGuides.ts and lib/japanGuides.ts */}
        {CITY_GUIDES[citySlug] && (
          <section className="mb-16">
            <h2 className="text-3xl font-black text-[#001A33] mb-3">
              Everything You Need to Know Before Visiting {city}
            </h2>
            <p className="text-gray-600 font-medium mb-8">
              Researched guides on timing, tides, queues and what each place is really like.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {CITY_GUIDES[citySlug].map((guide) => (
                <Link
                  key={guide.slug}
                  href={`/${countrySlug}/${citySlug}/${guide.slug}`}
                  className="flex items-center justify-between p-4 md:p-5 bg-white border border-gray-100 rounded-2xl hover:border-[#10B981]/30 hover:shadow-[0_20px_40px_-15px_rgba(16,185,129,0.15)] transition-all duration-300 group relative overflow-hidden active:scale-[0.98] hover:-translate-y-1.5"
                >
                  <div className="flex items-center gap-4 relative z-10">
                    <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 shadow-sm">
                      <img src={imageLoader({ src: guide.image, width: 128 })} alt={guide.name} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                    <span className="font-black text-[#001A33] group-hover:text-[#10B981] transition-colors text-[16px] tracking-tight">{guide.name}</span>
                  </div>
                  <div className="relative z-10 flex items-center justify-center w-8 h-8 rounded-full bg-gray-50 group-hover:bg-[#10B981]/10 transition-colors">
                    <ChevronRight size={18} className="text-gray-300 group-hover:text-[#10B981] transition-all duration-300 transform group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Email Signup Box - Only show for cities with itineraries */}
        <EmailSignupBox city={city} country={country} />

        {/* H2 #5: FAQs */}
        {cityInfo.faqs.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-black text-[#001A33] mb-6">
              FAQs About {city} Tours
            </h2>
            <div className="space-y-6 max-w-3xl">
              {cityInfo.faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 pb-4">
                  <h3 className="text-[18px] font-black text-[#001A33] mb-2">
                    {faq.question}
                  </h3>
                  <div className="text-[16px] text-gray-700 font-semibold leading-relaxed space-y-2">
                    {faq.answer.split('\n').map((line, lIdx) => (
                      <p key={lIdx}>
                        {line.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\))/g).map((part, pIdx) => {
                          if (part.startsWith('**') && part.endsWith('**')) {
                            return <strong key={pIdx} className="text-[#001A33] font-black">{part.slice(2, -2)}</strong>;
                          }
                          if (part.startsWith('[') && part.includes('](')) {
                            const match = part.match(/\[(.*?)\]\((.*?)\)/);
                            if (match) {
                              return (
                                <Link key={pIdx} href={match[2]} className="text-[#10B981] font-black border-b border-[#10B981]/30 hover:border-[#10B981] transition-all">
                                  {match[1]}
                                </Link>
                              );
                            }
                          }
                          return part;
                        })}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Filter Buttons Row - OTA-style */}
        {sortedTours.length > 0 && (
          <div className="mb-6 flex items-center gap-3 overflow-x-auto pb-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-[14px] font-semibold text-[#001A33] hover:bg-gray-50 transition-colors whitespace-nowrap">
              <Calendar size={16} />
              Dates
            </button>
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-[14px] font-semibold text-[#001A33] hover:bg-gray-50 transition-colors whitespace-nowrap">
              Day trips
            </button>
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-[14px] font-semibold text-[#001A33] hover:bg-gray-50 transition-colors whitespace-nowrap">
              Multi-day
            </button>
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-[14px] font-semibold text-[#001A33] hover:bg-gray-50 transition-colors whitespace-nowrap">
              Photography
            </button>
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-[14px] font-semibold text-[#001A33] hover:bg-gray-50 transition-colors whitespace-nowrap">
              Sunrise
            </button>
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-[14px] font-semibold text-[#001A33] hover:bg-gray-50 transition-colors whitespace-nowrap">
              Private tours
            </button>
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-[14px] font-semibold text-[#001A33] hover:bg-gray-50 transition-colors whitespace-nowrap">
              Walking tours
            </button>
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-[14px] font-semibold text-[#001A33] hover:bg-gray-50 transition-colors whitespace-nowrap">
              <Filter size={16} className="inline mr-1" />
              Filters
            </button>
          </div>
        )}

        {/* Results Summary & Sort - Only show if tours exist */}
        {sortedTours.length > 0 && (
          <div className="mb-6 flex items-center justify-between">
            <div className="text-[16px] font-black text-[#001A33]">
              {sortedTours.length} {sortedTours.length === 1 ? 'result' : 'results'}: {city}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[14px] font-semibold text-gray-600">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-[14px] font-semibold text-[#001A33] focus:ring-2 focus:ring-[#10B981] outline-none cursor-pointer"
              >
                <option value="recommended">Recommended</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        )}

        {/* Empty State - Only show if no tours after loading */}
        {sortedTours.length === 0 && tours.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-gray-200">
            <MapPin className="mx-auto text-gray-300 mb-4" size={48} />
            <h3 className="text-lg font-black text-[#001A33] mb-2">No tours available yet</h3>
            <p className="text-[14px] text-gray-500 font-semibold">
              {searchQuery || filterCategory !== 'all'
                ? 'Try adjusting your filters'
                : `Be the first to create a tour in ${city}!`
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
