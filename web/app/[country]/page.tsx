import { PLACEHOLDER_IMG } from '@/lib/placeholder';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CountryPageClient from '@/components/CountryPageClient';
import { countryDisplayName } from '@/lib/countryName';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:3001';

export const revalidate = 60;

interface Props {
  params: Promise<{ country: string }>;
}

function capitalize(str: string) {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

const COUNTRY_META: Record<string, {
  title: string;
  description: string;
  cities: { name: string; slug: string; image: string; tagline: string }[];
}> = {
  italy: {
    title: 'Italy Tours & Experiences | Rome, Florence, Venice & Milan | GlobeWithLocals',
    description: 'Book Italy tours and tickets in Rome, Florence, Venice and Milan: skip-the-line Colosseum and Vatican entry, Uffizi and Duomo visits, gondola and lagoon trips, Last Supper tours and Tuscan day trips.',
    cities: [
      { name: 'Rome', slug: 'rome', image: 'https://images.globewithlocals.com/site/city-rome/1600.webp', tagline: 'The Colosseum, the Vatican and the Roman Forum' },
      { name: 'Florence', slug: 'florence', image: 'https://images.globewithlocals.com/site/city-florence/1600.webp', tagline: 'The Uffizi, the Duomo and Tuscan day trips' },
      { name: 'Venice', slug: 'venice', image: 'https://images.globewithlocals.com/site/city-venice/1600.webp', tagline: 'Gondolas, the lagoon islands and St Mark\'s' },
      { name: 'Milan', slug: 'milan', image: 'https://images.globewithlocals.com/site/city-milan/1600.webp', tagline: 'The Duomo, The Last Supper and Lake Como' },
      { name: 'Naples', slug: 'naples', image: 'https://images.globewithlocals.com/site/city-naples/1600.webp', tagline: 'Pompeii and Vesuvius day trips, pizza and the old centre' },
      { name: 'Sorrento', slug: 'sorrento', image: PLACEHOLDER_IMG, tagline: 'Amalfi Coast boat trips, Capri crossings and lemon groves' },
      { name: 'Catania', slug: 'catania', image: PLACEHOLDER_IMG, tagline: 'Mount Etna excursions and Sicilian street food' },
      { name: 'Palermo', slug: 'palermo', image: PLACEHOLDER_IMG, tagline: 'Street food markets, Monreale and the Norman palaces' },
      { name: 'Taormina', slug: 'taormina', image: PLACEHOLDER_IMG, tagline: 'The Greek theatre, Etna views and Isola Bella' },
      { name: 'Syracuse', slug: 'syracuse', image: PLACEHOLDER_IMG, tagline: 'Ortigia island, the Greek theatre and sea caves' },
      { name: 'Turin', slug: 'turin', image: PLACEHOLDER_IMG, tagline: 'Royal palaces, the Egyptian Museum and Piedmont wine' },
      { name: 'Bologna', slug: 'bologna', image: PLACEHOLDER_IMG, tagline: 'Food tours, medieval towers and Ferrari country' },
      { name: 'Verona', slug: 'verona', image: PLACEHOLDER_IMG, tagline: 'Romeo and Juliet, the Arena and Lake Garda trips' },
      { name: 'Siena', slug: 'siena', image: PLACEHOLDER_IMG, tagline: 'The Piazza del Campo, Chianti wine and Tuscan hill towns' },
      { name: 'Positano', slug: 'positano', image: PLACEHOLDER_IMG, tagline: 'Cliffside views, Amalfi boat tours and beach days' },
      { name: 'Amalfi Coast', slug: 'amalfi-coast', image: PLACEHOLDER_IMG, tagline: 'Boat tours, Ravello gardens and coastal drives' },
      { name: 'Tuscany', slug: 'tuscany', image: PLACEHOLDER_IMG, tagline: 'Wine estates, cooking classes and hill-town day trips' },
      { name: 'Bari', slug: 'bari', image: PLACEHOLDER_IMG, tagline: 'Alberobello, Polignano a Mare and Puglia day trips' },
      { name: 'Lecce', slug: 'lecce', image: PLACEHOLDER_IMG, tagline: 'The baroque old town and the beaches of Salento' },
      { name: 'Matera', slug: 'matera', image: PLACEHOLDER_IMG, tagline: 'The ancient Sassi cave district and Puglia day trips' },
      { name: 'Pisa', slug: 'pisa', image: PLACEHOLDER_IMG, tagline: 'The Leaning Tower and Tuscan day trips' },
      { name: 'Cagliari', slug: 'cagliari', image: PLACEHOLDER_IMG, tagline: 'Sardinian beaches, boat trips and the old Castello district' },
    ],
  },
  spain: {
    title: 'Spain Tours & Experiences | Madrid, Barcelona, Seville, Valencia & Granada | GlobeWithLocals',
    description: 'Book Spain tours and tickets in Madrid, Barcelona, Seville, Valencia and Granada: Sagrada Familia and Park Guell, the Alhambra, the Alcazar, flamenco nights, tapas walks and Andalusian day trips.',
    cities: [
      { name: 'Madrid', slug: 'madrid', image: PLACEHOLDER_IMG, tagline: 'The Prado, the Royal Palace and Toledo day trips' },
      { name: 'Barcelona', slug: 'barcelona', image: PLACEHOLDER_IMG, tagline: 'Sagrada Familia, Park Guell and the Gothic Quarter' },
      { name: 'Seville', slug: 'seville', image: PLACEHOLDER_IMG, tagline: 'The Alcazar, flamenco and the cathedral' },
      { name: 'Valencia', slug: 'valencia', image: PLACEHOLDER_IMG, tagline: 'The old town, paella and the City of Arts and Sciences' },
      { name: 'Granada', slug: 'granada', image: PLACEHOLDER_IMG, tagline: 'The Alhambra, the Albaicin and the Sierra Nevada' },
      { name: 'Mallorca', slug: 'mallorca', image: PLACEHOLDER_IMG, tagline: 'Beach coves, Tramuntana drives and boat trips' },
      { name: 'Malaga', slug: 'malaga', image: PLACEHOLDER_IMG, tagline: 'Costa del Sol, Alhambra and Ronda day trips' },
      { name: 'Tenerife', slug: 'tenerife', image: PLACEHOLDER_IMG, tagline: 'Mount Teide, whale watching and volcanic coastline' },
      { name: 'Alicante', slug: 'alicante', image: PLACEHOLDER_IMG, tagline: 'Costa Blanca beaches, castle views and boat trips' },
      { name: 'Gran Canaria', slug: 'gran-canaria', image: PLACEHOLDER_IMG, tagline: 'Maspalomas dunes, mountain villages and island tours' },
      { name: 'Ibiza', slug: 'ibiza', image: PLACEHOLDER_IMG, tagline: 'Boat trips, beach days and the old town Dalt Vila' },
      { name: 'Lanzarote', slug: 'lanzarote', image: PLACEHOLDER_IMG, tagline: 'Timanfaya volcano tours, caves and snorkelling' },
      { name: 'Marbella', slug: 'marbella', image: PLACEHOLDER_IMG, tagline: 'Sailing, Puerto Banus and Costa del Sol day trips' },
      { name: 'Cordoba', slug: 'cordoba', image: PLACEHOLDER_IMG, tagline: 'The Mezquita, flower patios and Andalusian day trips' },
      { name: 'Bilbao', slug: 'bilbao', image: PLACEHOLDER_IMG, tagline: 'The Guggenheim, pintxos tours and Basque coast trips' },
      { name: 'Toledo', slug: 'toledo', image: PLACEHOLDER_IMG, tagline: 'The medieval old town and Madrid day trips' },
      { name: 'Cadiz', slug: 'cadiz', image: PLACEHOLDER_IMG, tagline: 'Sherry bodegas, white villages and Atlantic beaches' },
      { name: 'San Sebastian', slug: 'san-sebastian', image: PLACEHOLDER_IMG, tagline: 'Pintxos crawls, La Concha bay and Basque trips' },
      { name: 'Fuerteventura', slug: 'fuerteventura', image: PLACEHOLDER_IMG, tagline: 'Wide beaches, surf lessons and desert dunes' },
    ],
  },
  greece: {
    title: 'Greece Tours & Experiences | Athens & Santorini | GlobeWithLocals',
    description: 'Book Greece tours and tickets in Athens and Santorini: Acropolis and ancient site visits, Plaka food walks, caldera cruises, Oia sunsets and wine tastings.',
    cities: [
      { name: 'Athens', slug: 'athens', image: PLACEHOLDER_IMG, tagline: 'The Acropolis, the Plaka and ancient sites' },
      { name: 'Santorini', slug: 'santorini', image: PLACEHOLDER_IMG, tagline: 'Caldera cruises, Oia sunsets and wine tasting' },
      { name: 'Heraklion', slug: 'heraklion', image: PLACEHOLDER_IMG, tagline: 'Knossos palace, the old harbour and Crete day trips' },
      { name: 'Chania', slug: 'chania', image: PLACEHOLDER_IMG, tagline: 'The Venetian harbour, Samaria Gorge and Elafonisi beach' },
      { name: 'Crete', slug: 'crete', image: PLACEHOLDER_IMG, tagline: 'Gorges, beaches and island-wide excursions' },
      { name: 'Thessaloniki', slug: 'thessaloniki', image: PLACEHOLDER_IMG, tagline: 'Byzantine churches, food tours and the waterfront' },
      { name: 'Rhodes', slug: 'rhodes', image: PLACEHOLDER_IMG, tagline: 'The medieval old town, Lindos and boat trips' },
      { name: 'Rethymno', slug: 'rethymno', image: PLACEHOLDER_IMG, tagline: 'The Venetian old town, villages and beach days' },
      { name: 'Nafplio', slug: 'nafplio', image: PLACEHOLDER_IMG, tagline: 'Fortresses, Mycenae and Epidaurus day trips' },
      { name: 'Mykonos', slug: 'mykonos', image: PLACEHOLDER_IMG, tagline: 'Delos island, sailing and the old town windmills' },
      { name: 'Corfu', slug: 'corfu', image: PLACEHOLDER_IMG, tagline: 'The old town, beaches and boat trips' },
    ],
  },
  netherlands: {
    title: 'Netherlands Tours & Experiences | Amsterdam, Rotterdam, Giethoorn & Keukenhof | GlobeWithLocals',
    description: 'Book Netherlands tours and tickets run by local operators: Amsterdam canal cruises and museum tickets, Giethoorn boat tours, Keukenhof tulip trips, Zaanse Schans windmills and day trips from Amsterdam.',
    cities: [
      { name: 'Amsterdam', slug: 'amsterdam', image: PLACEHOLDER_IMG, tagline: 'Canals, the Van Gogh Museum and day trips to windmills' },
      { name: 'Rotterdam', slug: 'rotterdam', image: PLACEHOLDER_IMG, tagline: 'Harbour cruises, modern architecture and Markthal' },
      { name: 'The Hague', slug: 'the-hague', image: PLACEHOLDER_IMG, tagline: 'Canal cruises, Peace Palace and the Dutch coast' },
      { name: 'Utrecht', slug: 'utrecht', image: PLACEHOLDER_IMG, tagline: 'Canal wharves, Dom Tower and a compact old town' },
      { name: 'Giethoorn', slug: 'giethoorn', image: PLACEHOLDER_IMG, tagline: 'The village without roads and whisper boats' },
      { name: 'Lisse', slug: 'lisse', image: PLACEHOLDER_IMG, tagline: 'Keukenhof tulip gardens and flower fields' },
      { name: 'Haarlem', slug: 'haarlem', image: PLACEHOLDER_IMG, tagline: 'Canal cruises and the historic Grote Markt' },
      { name: 'Delft', slug: 'delft', image: PLACEHOLDER_IMG, tagline: 'Blue pottery, canals and Vermeer history' },
      { name: 'Groningen', slug: 'groningen', image: PLACEHOLDER_IMG, tagline: 'Canal cruises and a lively student city' },
      { name: 'Maastricht', slug: 'maastricht', image: PLACEHOLDER_IMG, tagline: 'Cave tours, Burgundian charm and the Vrijthof' },
    ],
  },
  germany: {
    title: 'Germany Tours & Experiences | Berlin, Munich, Hamburg & the Rhine | GlobeWithLocals',
    description: 'Book Germany tours and tickets run by local operators: Berlin history walks, Neuschwanstein day trips from Munich, Hamburg harbour cruises, Rhine Valley tours and Christmas market visits.',
    cities: [
      { name: 'Berlin', slug: 'berlin', image: PLACEHOLDER_IMG, tagline: 'The Wall, Museum Island and Brandenburg Gate' },
      { name: 'Munich', slug: 'munich', image: PLACEHOLDER_IMG, tagline: 'Beer halls, Neuschwanstein day trips and old-town walks' },
      { name: 'Hamburg', slug: 'hamburg', image: PLACEHOLDER_IMG, tagline: 'Harbour cruises, Speicherstadt and the Elbphilharmonie' },
      { name: 'Cologne', slug: 'cologne', image: PLACEHOLDER_IMG, tagline: 'The cathedral, Rhine cruises and Altstadt breweries' },
      { name: 'Dresden', slug: 'dresden', image: PLACEHOLDER_IMG, tagline: 'Baroque old town, Saxon Switzerland and the Frauenkirche' },
      { name: 'Frankfurt', slug: 'frankfurt', image: PLACEHOLDER_IMG, tagline: 'Skyline views, Romerberg and Rhine Valley trips' },
      { name: 'Heidelberg', slug: 'heidelberg', image: PLACEHOLDER_IMG, tagline: 'Castle ruins, the old bridge and Neckar river walks' },
      { name: 'Nuremberg', slug: 'nuremberg', image: PLACEHOLDER_IMG, tagline: 'Medieval old town, Christmas market and history tours' },
      { name: 'Leipzig', slug: 'leipzig', image: PLACEHOLDER_IMG, tagline: 'Music history, Bach sites and the Battle of Nations monument' },
      { name: 'Stuttgart', slug: 'stuttgart', image: PLACEHOLDER_IMG, tagline: 'Wine hills, Mercedes and Porsche museums, and Black Forest trips' },
    ],
  },
  turkey: {
    title: 'Turkey Tours & Experiences | Istanbul & Cappadocia | GlobeWithLocals',
    description: 'Book Turkey tours and tickets in Istanbul and Cappadocia: Hagia Sophia and Bosphorus tours, Grand Bazaar food walks, hot air balloon flights and Goreme valley day trips.',
    cities: [
      { name: 'Istanbul', slug: 'istanbul', image: PLACEHOLDER_IMG, tagline: 'Hagia Sophia, the Bosphorus and the Grand Bazaar' },
      { name: 'Cappadocia', slug: 'cappadocia', image: PLACEHOLDER_IMG, tagline: 'Hot air balloons, fairy chimneys and cave valleys' },
      { name: 'Alanya', slug: 'alanya', image: PLACEHOLDER_IMG, tagline: 'Castle views, boat trips and Mediterranean beaches' },
      { name: 'Antalya', slug: 'antalya', image: PLACEHOLDER_IMG, tagline: 'The Kaleici old town, waterfalls and Taurus mountain tours' },
      { name: 'Side', slug: 'side', image: PLACEHOLDER_IMG, tagline: 'Ancient ruins, Manavgat waterfall and boat trips' },
      { name: 'Fethiye', slug: 'fethiye', image: PLACEHOLDER_IMG, tagline: 'Oludeniz, Butterfly Valley and boat tours' },
      { name: 'Kusadasi', slug: 'kusadasi', image: PLACEHOLDER_IMG, tagline: 'Ephesus, the House of the Virgin Mary and cruise-port tours' },
      { name: 'Selcuk', slug: 'selcuk', image: PLACEHOLDER_IMG, tagline: 'The Ephesus ruins, the Temple of Artemis and local villages' },
      { name: 'Kemer', slug: 'kemer', image: PLACEHOLDER_IMG, tagline: 'Mountains, boat tours and Olympos day trips' },
      { name: 'Marmaris', slug: 'marmaris', image: PLACEHOLDER_IMG, tagline: 'Boat trips, Dalyan mud baths and bay cruises' },
      { name: 'Bodrum', slug: 'bodrum', image: PLACEHOLDER_IMG, tagline: 'The castle, gulet cruises and the Aegean coast' },
    ],
  },
  portugal: {
    title: 'Portugal Tours & Experiences | Lisbon & Porto | GlobeWithLocals',
    description: 'Book Portugal tours and tickets in Lisbon and Porto: Sintra day trips, tram and tuk-tuk tours, Douro Valley wine tastings, fado nights and river cruises.',
    cities: [
      { name: 'Lisbon', slug: 'lisbon', image: PLACEHOLDER_IMG, tagline: 'Sintra, Belem and the old tram neighbourhoods' },
      { name: 'Porto', slug: 'porto', image: PLACEHOLDER_IMG, tagline: 'Port cellars, the Douro Valley and river cruises' },
      { name: 'Madeira', slug: 'madeira', image: PLACEHOLDER_IMG, tagline: 'Levada hikes, Funchal and dramatic coastal cliffs' },
      { name: 'Algarve', slug: 'algarve', image: PLACEHOLDER_IMG, tagline: 'Benagil caves, boat trips and golden cliff beaches' },
      { name: 'Sintra', slug: 'sintra', image: PLACEHOLDER_IMG, tagline: 'Fairytale palaces, the Pena castle and Cabo da Roca' },
      { name: 'Fatima', slug: 'fatima', image: PLACEHOLDER_IMG, tagline: 'The sanctuary and day trips from Lisbon' },
      { name: 'Evora', slug: 'evora', image: PLACEHOLDER_IMG, tagline: 'The Roman temple, the bone chapel and Alentejo wine' },
      { name: 'Cascais', slug: 'cascais', image: PLACEHOLDER_IMG, tagline: 'Seaside villas, the surf coast and Lisbon day trips' },
      { name: 'Azores', slug: 'azores', image: PLACEHOLDER_IMG, tagline: 'Crater lakes, whale watching and hot springs' },
      { name: 'Douro Valley', slug: 'douro-valley', image: PLACEHOLDER_IMG, tagline: 'Wine estates, river cruises and terraced vineyards' },
      { name: 'Coimbra', slug: 'coimbra', image: PLACEHOLDER_IMG, tagline: 'The old university and medieval streets' },
    ],
  },
  france: {
    title: 'France Tours & Experiences | Paris | GlobeWithLocals',
    description: 'Book Paris tours and tickets: Eiffel Tower and Louvre entry, Seine cruises, Versailles and Giverny day trips, Montmartre walks and food tours.',
    cities: [
      { name: 'Paris', slug: 'paris', image: PLACEHOLDER_IMG, tagline: 'The Eiffel Tower, the Louvre and Versailles day trips' },
      { name: 'Nice', slug: 'nice', image: PLACEHOLDER_IMG, tagline: 'The Promenade des Anglais, Monaco and Riviera day trips' },
      { name: 'Bordeaux', slug: 'bordeaux', image: PLACEHOLDER_IMG, tagline: 'Wine tastings, Saint-Emilion and the old port' },
      { name: 'Marseille', slug: 'marseille', image: PLACEHOLDER_IMG, tagline: 'The old port, Calanques boat trips and Cassis' },
      { name: 'Lyon', slug: 'lyon', image: PLACEHOLDER_IMG, tagline: 'Bouchon food tours, Vieux Lyon and the traboules' },
      { name: 'Strasbourg', slug: 'strasbourg', image: PLACEHOLDER_IMG, tagline: 'The cathedral, canals and the Alsace wine route' },
      { name: 'Cannes', slug: 'cannes', image: PLACEHOLDER_IMG, tagline: 'Riviera beaches, the Lerins islands and Grasse' },
      { name: 'Reims', slug: 'reims', image: PLACEHOLDER_IMG, tagline: 'Champagne houses, cellars and the cathedral' },
      { name: 'Normandy', slug: 'normandy', image: PLACEHOLDER_IMG, tagline: 'D-Day beaches, Mont-Saint-Michel and Etretat' },
      { name: 'Aix-en-Provence', slug: 'aix-en-provence', image: PLACEHOLDER_IMG, tagline: 'Cezanne trails, markets and Provence day trips' },
      { name: 'Antibes', slug: 'antibes', image: PLACEHOLDER_IMG, tagline: 'The old town and Riviera boat trips' },
      { name: 'Colmar', slug: 'colmar', image: PLACEHOLDER_IMG, tagline: 'Half-timbered streets, canals and Alsace villages' },
      { name: 'Avignon', slug: 'avignon', image: PLACEHOLDER_IMG, tagline: 'The Popes Palace, Provence villages and lavender day trips' },
    ],
  },
  'united-kingdom': {
    title: 'United Kingdom Tours & Experiences | London, Edinburgh & Belfast | GlobeWithLocals',
    description: 'Book United Kingdom tours and tickets: London Eye and Tower of London entry, Edinburgh Castle and Highland tours, Oxford, Bath and Stonehenge day trips, Belfast and Giants Causeway trips, plus walking and food tours.',
    cities: [
      { name: 'London', slug: 'london', image: PLACEHOLDER_IMG, tagline: 'The London Eye, the Tower of London and day trips beyond' },
      { name: 'Edinburgh', slug: 'edinburgh', image: PLACEHOLDER_IMG, tagline: 'The Royal Mile, the castle and Highland day trips' },
      { name: 'Belfast', slug: 'belfast', image: PLACEHOLDER_IMG, tagline: 'Titanic Belfast, the Causeway Coast and Game of Thrones trips' },
      { name: 'Liverpool', slug: 'liverpool', image: PLACEHOLDER_IMG, tagline: 'Beatles tours, the waterfront and football stadiums' },
      { name: 'Glasgow', slug: 'glasgow', image: PLACEHOLDER_IMG, tagline: 'Street art, whisky tours and Loch Lomond day trips' },
      { name: 'Oxford', slug: 'oxford', image: PLACEHOLDER_IMG, tagline: 'The colleges, film locations and Cotswolds trips' },
      { name: 'Manchester', slug: 'manchester', image: PLACEHOLDER_IMG, tagline: 'Football tours, music history and the Peak District' },
      { name: 'York', slug: 'york', image: PLACEHOLDER_IMG, tagline: 'The Minster, the Shambles and the city walls' },
      { name: 'Bath', slug: 'bath', image: PLACEHOLDER_IMG, tagline: 'The Roman Baths, Stonehenge day trips and the Cotswolds' },
      { name: 'Inverness', slug: 'inverness', image: PLACEHOLDER_IMG, tagline: 'Loch Ness cruises, Highland tours and Culloden' },
      { name: 'Cardiff', slug: 'cardiff', image: PLACEHOLDER_IMG, tagline: 'The castle, the Brecon Beacons and Welsh coast trips' },
      { name: 'Brighton', slug: 'brighton', image: PLACEHOLDER_IMG, tagline: 'The pier, the Seven Sisters cliffs and coastal walks' },
      { name: 'Stirling', slug: 'stirling', image: PLACEHOLDER_IMG, tagline: 'Stirling Castle, Wallace history and Trossachs trips' },
      { name: 'Canterbury', slug: 'canterbury', image: PLACEHOLDER_IMG, tagline: 'The cathedral, punting and Kent day trips' },
      { name: 'Windsor', slug: 'windsor', image: PLACEHOLDER_IMG, tagline: 'Windsor Castle and Thames-side day trips from London' },
      { name: 'Lake District', slug: 'lake-district', image: PLACEHOLDER_IMG, tagline: 'Lake cruises, fell walks and Beatrix Potter trails' },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country } = await params;
  const c = country.toLowerCase();
  const meta = COUNTRY_META[c];

  if (!meta) {
    return {
      title: `Tours in ${capitalize(country)} | GlobeWithLocals`,
      description: `Discover the best tours in ${capitalize(country)} with licensed local guides.`,
      robots: { index: false, follow: true },
    };
  }

  const ogImage: string | undefined = undefined;

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `https://www.globewithlocals.com/${c}`,
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `https://www.globewithlocals.com/${c}`,
      siteName: 'GlobeWithLocals',
      type: 'website',
      
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
    },
  };
}

export default async function CountryPage({ params }: Props) {
  const { country } = await params;
  const c = country.toLowerCase();
  const meta = COUNTRY_META[c];

  if (!meta) {
    notFound();
  }

  // Only fetch tours for featured cities (first 3) to keep SSR fast
  const featuredCities = meta.cities.slice(0, 3);
  const cityTours: Record<string, any[]> = {};
  const cityTourCounts: Record<string, number> = {};
  try {
    const results = await Promise.all(
      featuredCities.map(city => {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 5000);
        return fetch(
          `${API_URL}/api/public/tours?country=${encodeURIComponent(capitalize(c))}&city=${encodeURIComponent(city.name)}&status=approved&limit=24`,
          { next: { revalidate: 60 }, signal: controller.signal }
        )
          .then(r => { clearTimeout(timeout); return r.ok ? r.json() : { success: false }; })
          .catch(() => { clearTimeout(timeout); return { success: false }; });
      })
    );

    featuredCities.forEach((city, i) => {
      const data = results[i];
      if (data?.success) {
        const toursArray = Array.isArray(data.tours) ? data.tours : (data.tours?.tours || []);
        cityTourCounts[city.slug] = typeof data.count === 'number' ? data.count : toursArray.length;
        cityTours[city.slug] = toursArray
          .filter((tour: any) => tour.slug)
          .map((tour: any) => ({
            id: tour.id,
            title: tour.title,
            slug: tour.slug,
            city: tour.city,
            country: tour.country,
            duration: tour.duration,
            pricePerPerson: tour.pricePerPerson,
            currency: tour.currency,
            images: Array.isArray(tour.images)
              ? tour.images.filter((img: any) => typeof img === 'string' && !img.startsWith('data:')).slice(0, 1)
              : [],
          }));
      } else {
        cityTours[city.slug] = [];
        cityTourCounts[city.slug] = 0;
      }
    });
  } catch (e) {
    console.error('Failed to fetch country tours:', e);
  }

  // ---------- SERVER-SIDE JSON-LD (guaranteed in raw HTML for SEO/AEO/GEO) ----------
  const countryName = countryDisplayName(c);

  const faqs: { question: string; answer: string }[] = [];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        name: `Tours in ${countryName}`,
        description: `Discover the best tours across ${countryName} with licensed local guides.`,
        url: `https://www.globewithlocals.com/${c}`,
        isPartOf: { '@type': 'WebSite', name: 'GlobeWithLocals', url: 'https://www.globewithlocals.com' },
      },
      {
        '@type': 'TravelAgency',
        name: 'GlobeWithLocals',
        description: `Book verified local guides and private tours across ${countryName}. Authentic cultural experiences, heritage walks, food tours & day trips.`,
        url: 'https://www.globewithlocals.com',
        areaServed: { '@type': 'Country', name: countryName },
      },
      ...(faqs.length > 0 ? [{
        '@type': 'FAQPage',
        mainEntity: faqs.map(faq => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })),
      }] : []),
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.globewithlocals.com' },
          { '@type': 'ListItem', position: 2, name: countryName, item: `https://www.globewithlocals.com/${c}` },
        ],
      },
    ],
  };

  return (
    <>
      {/* Server-rendered JSON-LD — guaranteed in raw HTML for crawlers, AI engines, and Googlebot */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CountryPageClient
        country={countryName}
        countrySlug={c}
        cities={meta.cities}
        cityTours={cityTours}
        cityTourCounts={cityTourCounts}
      />
    </>
  );
}
