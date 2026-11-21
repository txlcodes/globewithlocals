'use client';
import { PLACEHOLDER_IMG } from '@/lib/placeholder';
import { sitePhoto } from '@/lib/sitePhotos';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Globe,
  Search,
  User,
  Star,
  MapPin,
  ChevronRight,
  ChevronLeft,
  Award,
  ShieldCheck,
  X,
  Quote
} from 'lucide-react';
import LanguageSwitcher, { useLanguage } from '@/components/LanguageSwitcher';
import { CITIES, ATTRACTIONS, getCityUrl } from '@/lib/constants';
import { WORLD_CITIES_DATABASE } from '@/lib/citiesDatabase';
import { CITY_URL_MAP } from '@/lib/cityCountryMap';
import { imageLoader } from '@/lib/imageLoader';

// ── Exploration Footer Data & Component ──────────────────────────────

interface ExploreItem {
  name: string;
  count: string;
  image: string;
}

const EXPLORATION_DATA: Record<string, ExploreItem[]> = {
  attractions: [
    { name: "Colosseum, Rome", count: "Rome", image: sitePhoto('poi-colosseum') },
    { name: "Sagrada Familia, Barcelona", count: "Barcelona", image: sitePhoto('poi-sagrada') },
    { name: "Acropolis, Athens", count: "Athens", image: sitePhoto('poi-acropolis') },
    { name: "Hagia Sophia, Istanbul", count: "Istanbul", image: sitePhoto('poi-hagia-sophia') },
    { name: "Uffizi Gallery, Florence", count: "Florence", image: sitePhoto('poi-uffizi') },
    { name: "Grand Canal, Venice", count: "Venice", image: sitePhoto('poi-grand-canal') },
    { name: "Eiffel Tower, Paris", count: "Paris", image: sitePhoto('poi-eiffel') },
    { name: "Belem Tower, Lisbon", count: "Lisbon", image: sitePhoto('poi-belem') },
    { name: "Charles Bridge, Prague", count: "Prague", image: sitePhoto('poi-charles-bridge') },
    { name: "Old Town Walls, Dubrovnik", count: "Dubrovnik", image: sitePhoto('poi-dubrovnik-walls') },
    { name: "St Peter's Basilica, Vatican City", count: "Rome", image: sitePhoto('poi-vatican') },
    { name: "Oia Sunset, Santorini", count: "Santorini", image: sitePhoto('poi-oia') }
  ],
  destinations: [
    { name: "Rome, Italy", count: "Italy", image: sitePhoto('city-rome') },
    { name: "Barcelona, Spain", count: "Spain", image: sitePhoto('city-barcelona') },
    { name: "Athens, Greece", count: "Greece", image: sitePhoto('city-athens') },
    { name: "Istanbul, Turkey", count: "Turkey", image: sitePhoto('city-istanbul') },
    { name: "Lisbon, Portugal", count: "Portugal", image: sitePhoto('city-lisbon') },
    { name: "Paris, France", count: "France", image: sitePhoto('city-paris') }
  ],
  countries: [
    { name: "Italy", count: "Rome · Florence · Venice", image: sitePhoto('city-florence') },
    { name: "Spain", count: "Barcelona · Madrid · Seville", image: sitePhoto('city-seville') },
    { name: "Greece", count: "Athens · Santorini", image: sitePhoto('city-santorini') },
    { name: "Turkey", count: "Istanbul", image: sitePhoto('city-istanbul') }
  ],
  categories: [
    { name: "Skip-the-line Landmarks", count: "Guided tours", image: sitePhoto('poi-vatican') },
    { name: "Food & Wine Walks", count: "Guided tours", image: sitePhoto('city-porto') },
    { name: "Day Trips", count: "Guided tours", image: sitePhoto('city-naples') },
    { name: "Old Town Walking Tours", count: "Guided tours", image: sitePhoto('city-prague') }
  ]
};

const ExplorationFooter: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('attractions');
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    const timer = setTimeout(checkScroll, 100);
    window.addEventListener('resize', checkScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkScroll);
    };
  }, [activeTab]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.8;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const tabs = [
    { id: 'attractions', label: 'Top attractions in Europe' },
    { id: 'destinations', label: 'Top destinations' },
    { id: 'countries', label: 'Top countries to visit' },
    { id: 'categories', label: 'Top attraction categories' }
  ];

  return (
    <section className="max-w-[1200px] mx-auto px-6 py-12 border-t border-gray-100">
      <div className="flex gap-8 border-b border-gray-100 mb-8 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-4 text-[14px] font-bold transition-all whitespace-nowrap border-b-2 outline-none ${activeTab === tab.id
              ? 'text-[#0071EB] border-[#0071EB]'
              : 'text-gray-400 border-transparent hover:text-[#001A33]'
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="relative group/scroll">
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:shadow-md hover:bg-white transition-all border border-gray-100 items-center justify-center -ml-5"
            aria-label="Scroll left"
          >
            <ChevronLeft size={20} className="text-gray-400 group-hover/scroll:text-[#10B981] transition-colors" />
          </button>
        )}

        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:shadow-md hover:bg-white transition-all border border-gray-100 items-center justify-center -mr-5"
            aria-label="Scroll right"
          >
            <ChevronRight size={20} className="text-gray-400 group-hover/scroll:text-[#10B981] transition-colors" />
          </button>
        )}

        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-6 overflow-x-auto pb-8 no-scrollbar -mx-6 px-6 scroll-smooth snap-x snap-proximity"
        >
          {EXPLORATION_DATA[activeTab]?.map((item, idx) => {
            let href = "#";
            if (activeTab === 'countries') {
              href = `/${item.name.toLowerCase().replace(/\s+/g, '-')}`;
            } else if (activeTab === 'destinations') {
              const [city, country] = item.name.split(', ');
              if (city && country) {
                href = `/${country.toLowerCase().replace(/\s+/g, '-')}/${city.toLowerCase().replace(/\s+/g, '-')}`;
              }
            } else if (activeTab === 'attractions') {
              // "Landmark, City" → that city's page (CITY_URL_MAP owns the country)
              const cityName = item.name.split(', ')[1];
              const cityId = cityName ? cityName.toLowerCase().replace(/\s+/g, '-') : '';
              const mapping = cityId ? CITY_URL_MAP[cityId] : undefined;
              if (mapping) href = `/${mapping.country}/${mapping.city}`;
            }

            return (
              <Link
                key={`${activeTab}-${idx}`}
                href={href}
                className="relative flex-shrink-0 w-72 h-64 rounded-3xl overflow-hidden transition-all duration-700 bg-black group"
              >
                <div className="absolute inset-0">
                  <img
                    src={imageLoader({ src: item.image, width: 640 })}
                    alt={item.name}
                    className="w-full h-full object-cover grayscale-0 group-hover:scale-105 transition-all duration-1000 opacity-80 group-hover:opacity-100"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h6 className="text-white text-[18px] font-thin tracking-tight leading-tight group-hover:font-normal transition-all duration-500">
                    {item.name.split(',')[0]}
                  </h6>
                  <span className="text-white/60 text-[10px] font-medium tracking-[0.1em] uppercase mt-1 block group-hover:text-white transition-colors">
                    {item.count}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ── Hero Images ──────────────────────────────────────────────────────

const HERO_IMAGES = [
  { url: sitePhoto('city-rome'), city: 'Rome' },
  { url: sitePhoto('city-santorini'), city: 'Santorini' },
  { url: sitePhoto('city-istanbul'), city: 'Istanbul' },
  { url: sitePhoto('city-barcelona'), city: 'Barcelona' },
  { url: sitePhoto('city-lisbon'), city: 'Lisbon' },
  { url: sitePhoto('city-venice'), city: 'Venice' },
  { url: sitePhoto('city-florence'), city: 'Florence' },
  { url: sitePhoto('city-dubrovnik'), city: 'Dubrovnik' }
];

// ── City guides data for "Trip inspiration" dropdown ─────────────────

const CITY_GUIDES = [
  { name: 'Rome', image: sitePhoto('city-rome') },
  { name: 'Florence', image: sitePhoto('city-florence') },
  { name: 'Venice', image: sitePhoto('city-venice') },
  { name: 'Barcelona', image: sitePhoto('city-barcelona') },
  { name: 'Madrid', image: sitePhoto('city-madrid') },
  { name: 'Seville', image: sitePhoto('city-seville') },
  { name: 'Athens', image: sitePhoto('city-athens') },
  { name: 'Santorini', image: sitePhoto('city-santorini') },
  { name: 'Istanbul', image: sitePhoto('city-istanbul') },
  { name: 'Lisbon', image: sitePhoto('city-lisbon') },
  { name: 'Porto', image: sitePhoto('city-porto') },
  { name: 'Paris', image: sitePhoto('city-paris') },
  { name: 'Amsterdam', image: sitePhoto('city-amsterdam') },
  { name: 'Prague', image: sitePhoto('city-prague') },
  { name: 'London', image: sitePhoto('city-london') },
  { name: 'Dubrovnik', image: sitePhoto('city-dubrovnik') },
  { name: 'Vienna', image: sitePhoto('city-vienna') },
  { name: 'Budapest', image: sitePhoto('city-budapest') },
  { name: 'Berlin', image: sitePhoto('city-berlin') }
];

const CITY_GUIDE_ID_MAP: Record<string, string> = {
  'Rome': 'rome', 'Florence': 'florence', 'Venice': 'venice', 'Milan': 'milan', 'Naples': 'naples',
  'Barcelona': 'barcelona', 'Madrid': 'madrid', 'Seville': 'seville',
  'Athens': 'athens', 'Santorini': 'santorini', 'Istanbul': 'istanbul', 'Cappadocia': 'cappadocia',
  'Lisbon': 'lisbon', 'Porto': 'porto', 'Paris': 'paris', 'Amsterdam': 'amsterdam', 'Prague': 'prague',
  'London': 'london', 'Dubrovnik': 'dubrovnik', 'Vienna': 'vienna', 'Budapest': 'budapest', 'Berlin': 'berlin'
};

// ── Testimonials Data ────────────────────────────────────────────────

// Real traveller reviews only. Empty until GlobeWithLocals has its own verified
// reviews; the section below stays hidden while this is empty.
const TESTIMONIALS: { name: string; text: string; tour: string; link: string }[] = [
];

// ── Main Homepage Component ──────────────────────────────────────────

export default function HomepageClient() {
  const { t } = useLanguage();
  const router = useRouter();

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Mobile nav state
  const [showMobilePlacesDropdown, setShowMobilePlacesDropdown] = useState(false);
  const [showMobileInspirationDropdown, setShowMobileInspirationDropdown] = useState(false);

  // City scroll state
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Hero rotation — use deterministic order, random start index on client only
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Pick a random starting image on mount (client-only)
    setCurrentImageIndex(Math.floor(Math.random() * HERO_IMAGES.length));
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Cities scroll check
  useEffect(() => {
    const checkScroll = () => {
      const scrollContainer = document.getElementById('cities-scroll');
      if (scrollContainer) {
        setCanScrollLeft(scrollContainer.scrollLeft > 0);
        setCanScrollRight(scrollContainer.scrollLeft < scrollContainer.scrollWidth - scrollContainer.clientWidth - 10);
      }
    };
    checkScroll();
    const scrollContainer = document.getElementById('cities-scroll');
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
      return () => {
        scrollContainer.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, []);

  // Search suggestions
  const focusCities = useMemo(() => {
    return WORLD_CITIES_DATABASE.map(city => ({
      name: city.name,
      country: city.country,
      slug: city.name.toLowerCase().replace(/\s+/g, '-')
    }));
  }, []);

  const filteredSuggestions = useMemo(() => {
    if (!searchQuery) return [];
    const query = searchQuery.toLowerCase();
    return focusCities
      .filter(city => city.name.toLowerCase().includes(query) || city.country.toLowerCase().includes(query))
      .sort((a, b) => {
        const aStarts = a.name.toLowerCase().startsWith(query) || a.country.toLowerCase().startsWith(query);
        const bStarts = b.name.toLowerCase().startsWith(query) || b.country.toLowerCase().startsWith(query);
        if (aStarts && !bStarts) return -1;
        if (!aStarts && bStarts) return 1;
        return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
      });
  }, [searchQuery, focusCities]);

  const handleSearch = (cityName?: string) => {
    const query = cityName || searchQuery.trim();
    if (!query) return;

    if (query.toLowerCase().includes('taj mahal')) {
      router.push("/india/agra/taj-mahal");
      return;
    }

    const matchedCity = focusCities.find(city =>
      city.name.toLowerCase() === query.toLowerCase()
    );
    if (matchedCity) {
      const countrySlug = matchedCity.country.toLowerCase().replace(/\s+/g, '-');
      router.push(`/${countrySlug}/${matchedCity.slug}`);
    } else {
      const fuzzyMatch = focusCities.find(city =>
        city.name.toLowerCase().includes(query.toLowerCase()) ||
        city.country.toLowerCase().includes(query.toLowerCase())
      );
      if (fuzzyMatch) {
        const countrySlug = fuzzyMatch.country.toLowerCase().replace(/\s+/g, '-');
        router.push(`/${countrySlug}/${fuzzyMatch.slug}`);
      }
    }
    setShowSuggestions(false);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* JSON-LD moved to server component (app/page.tsx) — Organization + WebSite schema */}

      {/* Header Navigation */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="w-full h-24 sm:h-28 md:h-32 flex items-center justify-between px-3 sm:px-4 md:px-6">
          <div className="flex items-center gap-3 h-full">
            <Link href="/" className="cursor-pointer">
              <span className="text-2xl sm:text-3xl font-black tracking-tight text-[#001A33]">GlobeWithLocals</span>
            </Link>

            <nav className="hidden lg:flex items-center gap-6 text-[14px] font-semibold text-[#001A33]">
              {/* Places to see dropdown */}
              <div className="relative flex items-center gap-1 cursor-pointer hover:text-[#10B981] group/places">
                {t.placesToSee} <ChevronRight size={14} className="rotate-90 group-hover/places:rotate-[270deg] transition-transform duration-150" />
                <div className="absolute top-full left-0 pt-2 z-50 opacity-0 -translate-y-2 pointer-events-none group-hover/places:opacity-100 group-hover/places:translate-y-0 group-hover/places:pointer-events-auto transition-[opacity,transform] duration-100 ease-out">
                  <div className="bg-white rounded-xl shadow-2xl border border-gray-100 p-4 xl:p-5 w-[90vw] max-w-[800px] max-h-[70vh] overflow-y-auto no-scrollbar">
                    <div className="grid grid-cols-3 gap-1">
                      {CITIES.map((city) => {
                        const url = getCityUrl(city.name, city.id);
                        return (
                          <div key={city.id}>
                            <Link
                              href={url}
                              className="flex items-center gap-3 hover:bg-[#10B981]/10 p-2 rounded-lg group/item"
                            >
                              <img
                                src={imageLoader({ src: city.image, width: 128 })}
                                alt={`${city.name} tours and cultural experiences`}
                                className="w-11 h-11 rounded-lg object-cover flex-shrink-0"
                              />
                              <div className="flex-1 min-w-0">
                                <div className="font-bold text-[#001A33] text-sm group-hover/item:text-[#10B981]">{city.name} Tours</div>
                                <div className="text-gray-400 text-xs">{city.localAngle}</div>
                              </div>
                            </Link>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Trip inspiration dropdown */}
              <div className="relative flex items-center gap-1 cursor-pointer hover:text-[#10B981] group/inspiration">
                {t.tripInspiration} <ChevronRight size={14} className="rotate-90 group-hover/inspiration:rotate-[270deg] transition-transform duration-150" />
                <div className="absolute top-full left-0 pt-2 z-50 opacity-0 -translate-y-2 pointer-events-none group-hover/inspiration:opacity-100 group-hover/inspiration:translate-y-0 group-hover/inspiration:pointer-events-auto transition-[opacity,transform] duration-100 ease-out">
                  <div className="bg-white rounded-xl shadow-2xl border border-gray-100 p-4 w-[90vw] max-w-[750px]">
                    <div className="flex gap-6">
                      <div className="flex-shrink-0 w-[140px]">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></div>
                          <h3 className="font-bold text-[#001A33] text-sm">{t.cityGuides}</h3>
                        </div>
                        <p className="text-gray-500 text-xs mb-4">Explore all</p>
                      </div>
                      <div className="flex-1 grid grid-cols-3 gap-3 max-h-[400px] overflow-y-auto no-scrollbar">
                        {CITY_GUIDES.map((city, idx) => {
                          const cityId = CITY_GUIDE_ID_MAP[city.name] || city.name.toLowerCase().replace(/\s+/g, '-');
                          const url = getCityUrl(city.name, cityId);
                          return (
                            <Link key={idx} href={url} className="flex flex-col items-center gap-1.5 cursor-pointer p-1.5 rounded-lg hover:bg-[#10B981]/10 group/guide">
                              <img src={imageLoader({ src: city.image, width: 128 })} alt={city.name} className="w-12 h-12 rounded-full object-cover" loading="lazy" width={48} height={48} />
                              <div className="font-semibold text-[#001A33] text-[10px] text-center leading-tight group-hover/guide:text-[#10B981]">{city.name} Travel Guide</div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-gray-200">
                      <div className="flex items-center gap-2 text-[#001A33] font-semibold cursor-pointer hover:text-[#10B981] text-xs underline">
                        {t.exploreAll} <ChevronRight size={14} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
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

      {/* Mobile Navigation Bar */}
      <div className="lg:hidden sticky top-[72px] sm:top-[82px] md:top-[92px] z-40 bg-white border-b border-gray-100 shadow-sm">
        <div className="flex items-center gap-2 px-3 sm:px-4 pt-3 pb-2">
          <button
            onClick={() => {
              setShowMobilePlacesDropdown(!showMobilePlacesDropdown);
              setShowMobileInspirationDropdown(false);
            }}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all ${showMobilePlacesDropdown
              ? 'bg-[#10B981] text-white'
              : 'bg-gray-100 text-[#001A33] hover:bg-gray-200'
              }`}
          >
            <span>Places to see</span>
            <ChevronRight size={14} className={`transition-transform ${showMobilePlacesDropdown ? 'rotate-90' : 'rotate-0'}`} />
          </button>

          <button
            onClick={() => {
              setShowMobileInspirationDropdown(!showMobileInspirationDropdown);
              setShowMobilePlacesDropdown(false);
            }}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all ${showMobileInspirationDropdown
              ? 'bg-[#10B981] text-white'
              : 'bg-gray-100 text-[#001A33] hover:bg-gray-200'
              }`}
          >
            <span>{t.tripInspiration}</span>
            <ChevronRight size={14} className={`transition-transform ${showMobileInspirationDropdown ? 'rotate-90' : 'rotate-0'}`} />
          </button>
        </div>

        {/* City Chips Row - Hidden on small mobile */}
        <div className="hidden md:block px-3 sm:px-4 pb-3 overflow-x-auto scroll-smooth scrollbar-hide" style={{ WebkitOverflowScrolling: 'touch' }}>
          <div className="flex items-center gap-2 min-w-max">
            {CITIES.slice(0, 12).map((city) => {
              const url = getCityUrl(city.name, city.id);
              return (
                <Link
                  key={city.id}
                  href={url}
                  className="flex-shrink-0 px-4 py-1.5 rounded-full border border-gray-200 bg-white text-[#001A33] text-sm font-medium hover:border-[#10B981] hover:text-[#10B981] active:scale-95 transition-all whitespace-nowrap"
                >
                  {city.name}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Mobile Places Dropdown */}
        {showMobilePlacesDropdown && (
          <>
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-50 top-[72px] sm:top-[82px] md:top-[92px]"
              onClick={() => setShowMobilePlacesDropdown(false)}
            />
            <div className="fixed inset-x-0 bottom-0 bg-white rounded-t-2xl shadow-2xl z-50 max-h-[85vh] overflow-y-auto top-[72px] sm:top-[82px] md:top-[92px]">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
                <h3 className="text-lg font-bold text-[#001A33]">Places to see</h3>
                <button onClick={() => setShowMobilePlacesDropdown(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 gap-3">
                  {CITIES.map((city) => {
                    const url = getCityUrl(city.name, city.id);
                    return (
                      <div key={city.id} className="space-y-2">
                        <Link
                          href={url}
                          onClick={() => setShowMobilePlacesDropdown(false)}
                          className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left w-full min-h-[44px]"
                        >
                          <img
                            src={imageLoader({ src: city.image, width: 128 })}
                            alt={`${city.name} tours and cultural experiences`}
                            className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="font-bold text-[#001A33] text-sm mb-0.5">{city.name} Tours</div>
                            <div className="text-gray-500 text-xs">{city.localAngle}</div>
                          </div>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Mobile Inspiration Dropdown */}
        {showMobileInspirationDropdown && (
          <>
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-50 top-[72px] sm:top-[82px] md:top-[92px]"
              onClick={() => setShowMobileInspirationDropdown(false)}
            />
            <div className="fixed inset-x-0 bottom-0 bg-white rounded-t-2xl shadow-2xl z-50 max-h-[85vh] overflow-y-auto top-[72px] sm:top-[82px] md:top-[92px]">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
                <h3 className="text-lg font-bold text-[#001A33]">{t.tripInspiration}</h3>
                <button onClick={() => setShowMobileInspirationDropdown(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>
              <div className="p-4">
                <div className="mb-4 pb-4 border-b border-gray-200">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></div>
                    <h4 className="font-bold text-[#001A33] text-sm">{t.cityGuides}</h4>
                  </div>
                  <p className="text-gray-500 text-xs">Explore all</p>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {CITY_GUIDES.map((city, idx) => {
                    const cityId = CITY_GUIDE_ID_MAP[city.name] || city.name.toLowerCase().replace(/\s+/g, '-');
                    const url = getCityUrl(city.name, cityId);
                    return (
                      <Link
                        key={idx}
                        href={url}
                        onClick={() => setShowMobileInspirationDropdown(false)}
                        className="flex flex-col items-center gap-1.5 p-2 rounded-lg hover:bg-gray-50 transition-colors min-h-[44px]"
                      >
                        <img src={imageLoader({ src: city.image, width: 128 })} alt={city.name} className="w-12 h-12 rounded-full object-cover" loading="lazy" width={48} height={48} />
                        <div className="font-semibold text-[#001A33] text-[10px] text-center leading-tight">{city.name} Travel Guide</div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-x-clip">
        {HERO_IMAGES.map((hero, index) => {
          // Only render current slide and next slide (for smooth transition)
          const nextIndex = (currentImageIndex + 1) % HERO_IMAGES.length;
          const shouldRender = index === currentImageIndex || index === nextIndex;
          if (!shouldRender) return null;
          return (
            <img
              key={index}
              src={imageLoader({ src: hero.url, width: 1600 })}
              alt={`${hero.city} - Authentic local tours and cultural experiences in ${hero.city}`}
              className={`absolute inset-0 w-full h-full object-cover object-center brightness-[0.7] transition-opacity duration-1000 ${index === currentImageIndex ? 'opacity-100 z-0' : 'opacity-0 z-0'}`}
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
              loading={index === currentImageIndex ? 'eager' : 'lazy'}
              fetchPriority={index === currentImageIndex ? 'high' : 'low'}
            />
          );
        })}
        <div className="absolute inset-0 hero-overlay z-10"></div>

        <div className="relative z-10 w-full max-w-[800px] px-1 md:px-6 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-white mb-6 sm:mb-8 md:mb-10 tracking-tight leading-tight">
            {t.heroHeadline}
          </h1>

          <div className="bg-white p-1 md:p-2 rounded-full shadow-2xl flex flex-row flex-nowrap items-stretch gap-1 md:gap-2 relative w-full max-w-[600px] mx-auto">
            <div className="flex-1 flex items-center gap-1 md:gap-4 px-2 md:px-6 py-2 md:py-3 min-w-0 relative">
              <Search size={16} className="text-gray-400 shrink-0 md:w-5 md:h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(e.target.value.length > 0);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSearch();
                }}
                onFocus={() => setShowSuggestions(searchQuery.length > 0)}
                placeholder={t.searchPlaceholder}
                className="flex-1 outline-none border-none ring-0 focus:ring-0 focus:border-none bg-transparent text-[#001A33] font-bold text-sm sm:text-base md:text-lg placeholder:text-gray-400 placeholder:font-medium min-w-0"
              />

              {showSuggestions && filteredSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 max-h-[min(60vh,380px)] overflow-y-auto z-[60]">
                  {filteredSuggestions.slice(0, 8).map((city) => (
                    <button
                      key={city.slug}
                      onClick={() => handleSearch(city.name)}
                      className="w-full px-4 sm:px-6 py-3 sm:py-4 text-left hover:bg-gray-50 transition-colors flex items-center gap-3 min-h-[44px]"
                    >
                      <MapPin size={18} className="text-[#10B981] flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <div className="font-black text-[#001A33] text-sm sm:text-base truncate">{city.name}</div>
                        <div className="text-xs sm:text-sm text-gray-500 font-semibold truncate">{city.country}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={() => handleSearch()}
              className="bg-[#10B981] hover:bg-[#059669] text-white font-black px-4 sm:px-6 md:px-8 lg:px-12 py-2.5 sm:py-3 md:py-4 rounded-full text-sm sm:text-base md:text-lg transition-all shadow-lg active:scale-95 shrink-0 whitespace-nowrap min-h-[44px] flex items-center justify-center"
            >
              {t.search}
            </button>
          </div>
        </div>
      </section>

      <main className="flex-1">
        {/* Row 1: Things to do wherever you're going */}
        <section className="max-w-[1400px] mx-auto pt-4 sm:pt-6 md:pt-8 pb-8 sm:pb-12 md:pb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[28px] font-black text-[#001A33] mb-6 sm:mb-8 px-4 sm:px-6 lg:px-8">
            Things to do wherever you&apos;re going
          </h2>
          <div className="relative px-4 sm:px-6 lg:px-8">
            {canScrollLeft && (
              <button
                onClick={() => {
                  const scrollContainer = document.getElementById('cities-scroll');
                  if (scrollContainer) {
                    const cardWidth = window.innerWidth < 640 ? 170 : 200;
                    const gap = window.innerWidth < 640 ? 16 : 20;
                    scrollContainer.scrollTo({ left: Math.max(0, scrollContainer.scrollLeft - ((cardWidth + gap) * 3)), behavior: 'smooth' });
                  }
                }}
                className="hidden lg:flex absolute left-4 top-[40%] -translate-y-1/2 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:shadow-md hover:bg-white transition-all border border-gray-100 items-center justify-center"
              >
                <ChevronLeft className="text-gray-400" size={20} />
              </button>
            )}

            <div className="relative overflow-hidden">
              <div
                id="cities-scroll"
                className="flex gap-4 sm:gap-5 overflow-x-auto no-scrollbar pb-4 scroll-smooth snap-x snap-mandatory"
                onScroll={(e) => {
                  const container = e.currentTarget;
                  setCanScrollLeft(container.scrollLeft > 10);
                  setCanScrollRight(container.scrollLeft < container.scrollWidth - container.clientWidth - 10);
                }}
              >
                {CITIES.map((city) => {
                  const url = getCityUrl(city.name, city.id);
                  return (
                    <Link
                      key={city.id}
                      href={url}
                      className="flex-shrink-0 w-[170px] sm:w-[200px] md:w-[200px] lg:w-[calc((100%-100px)/6)] xl:w-[calc((100%-120px)/6)] group snap-start"
                    >
                      <div className="relative aspect-[4/5] lg:aspect-[3/4] rounded-2xl sm:rounded-3xl overflow-hidden mb-2 sm:mb-3 shadow-md hover:shadow-xl transition-all duration-300 bg-white border border-gray-100">
                        <div className="relative w-full h-full">
                          <img
                            src={imageLoader({ src: city.image, width: 640 })}
                            alt={`${city.name} tours and cultural experiences`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/25 to-transparent"></div>
                          <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                            <h3 className="text-white font-black text-lg sm:text-xl md:text-lg mb-1 drop-shadow-xl leading-tight">{city.name}</h3>
                            <p className="text-white/95 text-xs sm:text-sm md:text-[11px] font-semibold drop-shadow-md leading-snug">{city.localAngle}</p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {canScrollRight && (
              <button
                onClick={() => {
                  const scrollContainer = document.getElementById('cities-scroll');
                  if (scrollContainer) {
                    const cardWidth = window.innerWidth < 640 ? 280 : 200;
                    const gap = window.innerWidth < 640 ? 16 : 20;
                    scrollContainer.scrollTo({ left: scrollContainer.scrollLeft + ((cardWidth + gap) * 3), behavior: 'smooth' });
                  }
                }}
                className="hidden lg:flex absolute right-4 top-[40%] -translate-y-1/2 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:shadow-md hover:bg-white transition-all border border-gray-100 items-center justify-center"
              >
                <ChevronRight className="text-gray-400" size={20} />
              </button>
            )}
          </div>
        </section>

        {/* Attractions you can't miss */}
        <section className="max-w-[1200px] mx-auto px-6 py-16">
          <h2 className="text-2xl md:text-[28px] font-black text-[#001A33] mb-8">
            Attractions you can&apos;t miss
          </h2>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4">
            {ATTRACTIONS.map((attr) => (
              <div key={attr.id} className="group flex-shrink-0 w-72 md:w-[380px] h-48 rounded-2xl overflow-hidden relative cursor-pointer shadow-sm hover:shadow-lg transition-all">
                <img src={imageLoader({ src: attr.image, width: 640 })} alt={`${attr.title} - Top attraction in ${attr.location}`} className="absolute inset-0 w-full h-full object-cover brightness-75 group-hover:scale-105 transition-transform duration-700" loading="lazy" width={380} height={192} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h4 className="text-white font-black text-xl leading-tight mb-1">{attr.title}</h4>
                  <p className="text-green-400 text-[11px] font-black uppercase tracking-widest italic mb-2">
                    {attr.whyLocal}
                  </p>
                  {attr.experts > 0 && <p className="text-white/70 text-[12px] font-bold uppercase">{attr.experts} verified local experts</p>}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Exploration Footer */}
        <ExplorationFooter />

        {/* Testimonials Section */}
        {TESTIMONIALS.length > 0 && <section className="bg-white py-24 border-t border-gray-100">
          <div className="max-w-[1200px] mx-auto px-6">
            <h2 className="text-3xl font-black text-[#001A33] mb-16 text-center">What travellers say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {TESTIMONIALS.map((t, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-8 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.08)] border border-gray-50 flex flex-col items-center text-center group hover:border-[#67C1B0]/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl">
                  <div className="text-[#67C1B0] mb-6 transform group-hover:scale-110 transition-transform duration-500">
                    <Quote size={48} fill="currentColor" fillOpacity="0.1" />
                  </div>
                  <p className="text-gray-500 text-[14px] leading-relaxed italic mb-8 font-medium">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className="fill-[#FFB800] text-[#FFB800]" />
                    ))}
                  </div>
                  <div className="mb-8">
                    <span className="block font-black text-[#001A33] text-[15px]">{t.name}</span>
                    <span className="text-[12px] text-gray-400 font-bold uppercase tracking-widest">Traveller</span>
                  </div>
                  <Link
                    href={t.link}
                    className="mt-auto text-[13px] font-black text-[#001A33] border-b-2 border-gray-200 hover:border-[#67C1B0] transition-colors pb-0.5"
                  >
                    {t.tour}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>}

        {/* Immersive CTA Section */}
        <section className="relative w-full" style={{ height: '85vh', minHeight: '600px' }}>
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${imageLoader({ src: sitePhoto('city-santorini'), width: 1600 })})`,
            }}
          />
          {/* Top gradient: white fading into image */}
          <div
            className="absolute top-0 left-0 right-0"
            style={{
              height: '40%',
              background: 'linear-gradient(to bottom, #ffffff 0%, rgba(255,255,255,0.8) 30%, rgba(255,255,255,0) 100%)',
            }}
          />
          {/* Bottom gradient for text readability */}
          <div
            className="absolute bottom-0 left-0 right-0"
            style={{
              height: '60%',
              background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.7) 100%)',
            }}
          />
          {/* Content */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-5 leading-tight max-w-3xl" style={{ textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}>
              Experience the World Through<br />Local Eyes
            </h2>
            <p className="text-white/90 text-lg md:text-xl max-w-xl" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.3)' }}>
              Authentic cultural journeys crafted by the people who know their homeland best.
            </p>
          </div>
        </section>
      </main>

      {/* Scrollbar hide styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          .hero-overlay { background: linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.3) 100%); }
        `
      }} />
    </div>
  );
}
