// Topic tags for the city listing filter chips, derived from the tour title.
// Order here is display priority when counts tie. A tag only shows on a city
// page when at least MIN_TAG_COUNT tours carry it, so small cities stay clean.
export const MIN_TAG_COUNT = 4;

const RULES: [string, string[]][] = [
  ['Skip-the-line tickets', ['skip the line', 'skip-the-line', 'fast track', 'priority access', 'entry ticket', 'admission', 'tickets']],
  ['Museums & galleries', ['museum', 'gallery', 'galleries', 'vatican', 'uffizi', 'louvre', 'prado', 'accademia', 'borghese', 'orsay', 'hermitage']],
  ['Churches & cathedrals', ['cathedral', 'basilica', 'church', 'sagrada', 'duomo', 'chapel', 'mosque', 'hagia sophia', 'blue mosque', 'monastery']],
  ['Ancient sites', ['colosseum', 'roman forum', 'pompeii', 'acropolis', 'ancient', 'catacomb', 'ruins', 'palatine', 'ephesus', 'parthenon', 'underground city']],
  ['Palaces & castles', ['palace', 'castle', 'alhambra', 'alcazar', 'versailles', 'castello', 'royal', 'fortress']],
  ['Food & wine', ['food', 'wine', 'tasting', 'cooking', 'culinary', 'gelato', 'pizza', 'pasta', 'tapas', 'market', 'olive', 'truffle', 'dinner', 'lunch', 'brewery', 'winery', 'vineyard', 'port ', 'coffee', 'tea ']],
  ['Cruises & boat trips', ['cruise', 'boat', 'catamaran', 'sailing', 'gondola', 'yacht', 'ferry', 'bosphorus', 'seine', 'river tagus', 'douro']],
  ['Day trips', ['day trip', 'excursion', 'from rome', 'from florence', 'from venice', 'from milan', 'from madrid', 'from barcelona', 'from seville', 'from valencia', 'from granada', 'from paris', 'from lisbon', 'from porto', 'from istanbul', 'from athens', 'from santorini', 'sintra', 'amalfi', 'tuscany', 'toledo']],
  ['Walking tours', ['walking tour', 'walk ', 'old town', 'historic center', 'historic centre', 'neighborhood', 'neighbourhood', 'free tour']],
  ['Bike & scooter', ['bike', 'cycling', 'e-bike', 'segway', 'scooter', 'vespa', 'tuk tuk', 'tuk-tuk']],
  ['Shows & music', ['flamenco', 'show', 'concert', 'opera', 'fado', 'cabaret', 'theatre', 'theater', 'dance', 'whirling', 'dervish', 'moulin rouge']],
  ['Hot air balloon', ['balloon']],
  ['Night & sunset', ['night', 'ghost', 'evening', 'sunset', 'illuminat']],
  ['Beaches & islands', ['island', 'beach', 'volcano', 'caldera', 'mykonos']],
  ['Hiking & nature', ['hike', 'hiking', 'trek', 'canyon', 'valley', 'wildlife', 'waterfall', 'nature']],
  ['Spa & hammam', ['hammam', 'spa ', 'massage', 'thermal']],
  ['Classes & workshops', ['class', 'workshop', 'lesson', 'pottery', 'craft']],
  ['Kids & families', ['family', 'kids', 'children', 'disney', 'theme park', 'zoo']],
  ['Private tours', ['private', 'customiz', 'customis', 'full-day', 'full day']],
  ['Multi-day', ['2-day', '3-day', '4-day', 'multi-day', '2 day', '3 day', 'days ']],
  ['Transfers & drivers', ['transfer', 'airport', 'driver', 'shuttle', 'charter', 'taxi']],
];

export function tagsForTitle(title: string): string[] {
  const t = (title || '').toLowerCase();
  const out: string[] = [];
  for (const [tag, keys] of RULES) {
    if (keys.some((k) => t.includes(k))) out.push(tag);
  }
  return out;
}

/** Tags worth showing for a list of tours: [tag, count], most common first. */
export function tagCounts(tours: { title: string }[]): [string, number][] {
  const counts = new Map<string, number>();
  for (const tour of tours) for (const tag of tagsForTitle(tour.title)) counts.set(tag, (counts.get(tag) || 0) + 1);
  return [...counts.entries()].filter(([, n]) => n >= MIN_TAG_COUNT).sort((a, b) => b[1] - a[1]);
}
