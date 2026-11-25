// Italy (Rome) authority pages. Each page pairs practical, checkable information with a live,
// server-fetched list of our own tours matching `terms` (title keywords), so the page both informs
// and sells. No prices, ratings or opening hours are hardcoded here: those come from the API.

export interface AuthorityPage {
  slug: string;
  country: string;
  city: string;
  title: string;      // H1
  seoTitle: string;   // <title> lead (brand appended)
  description: string;
  intro: string[];
  sections: { h: string; p: string[] }[];
  choose: string[];   // "How to choose" bullets
  faqs: { q: string; a: string }[];
  terms: string[];    // title keywords for the tour list; empty = all top tours
  related: string[];  // other slugs
  guide?: boolean;    // information guide: show the guide text first, tours after
}

import { GUIDE_PAGES } from './authorityGuides';

const R = { country: 'italy', city: 'rome' };

export const AUTHORITY_PAGES: AuthorityPage[] = [
  ...GUIDE_PAGES,
  {
    ...R, slug: 'best-tours-in-rome', title: 'Best Tours in Rome', seoTitle: 'Best Tours in Rome: Top-Reviewed Guided Tours and Tickets',
    description: 'How to pick the best tours in Rome: what is worth booking, what to book ahead, and the most-reviewed guided tours, tickets and day trips from local operators.',
    intro: [
      'Rome rewards planning more than most cities. The big sights, the Colosseum, the Vatican Museums and the Sistine Chapel, run on timed entry, and the difference between a good day and a frustrating one is usually how you booked them.',
      'This page ranks the tours on GlobeWithLocals by how many travellers have reviewed them on another booking platform, then explains how to choose between them. Every tour below is run by a local operator who confirms your date before you pay in full.',
    ],
    sections: [
      { h: 'What to book first in Rome', p: ['Book the Colosseum with the Roman Forum and Palatine Hill, and the Vatican Museums with the Sistine Chapel, before anything else. Both use timed slots and both sell out in peak months. Everything else, from food walks to day trips, is easier to fit around them.', 'A guided visit is worth it at the Colosseum and Forum because the ruins are hard to read without context, and at the Vatican because the museums are very large and a good guide saves you from wandering.'] },
      { h: 'Guided tour, ticket only, or private', p: ['A group guided tour gives you a licensed guide and a fixed entry time at a sensible price. A ticket-only option suits travellers who already know what they want to see. A private tour costs more per person for a small party but lets you set the pace, which suits families, mobility needs and anyone with specific interests.'] },
      { h: 'How many days in Rome', p: ['Three full days covers the ancient centre, the Vatican and one or two neighbourhoods at an easy pace. With two days, pick the ancient centre and the Vatican and skip the rest. With four or more, add a day trip such as Tivoli, Ostia Antica or Orvieto.'] },
    ],
    choose: ['Check the duration against your day, not just the highlights list.', 'Look at what the entry ticket includes and what is extra.', 'Prefer a stated meeting point and group size.', 'Message us if you want help matching a tour to your dates.'],
    faqs: [
      { q: 'What are the best tours in Rome?', a: 'The most-booked are the Colosseum with the Roman Forum and Palatine Hill, the Vatican Museums with the Sistine Chapel and St. Peter\'s Basilica, plus food walks and day trips to Tivoli and Orvieto. The list on this page is ordered by review count.' },
      { q: 'Should I book Rome tours in advance?', a: 'Yes for the Colosseum and the Vatican, which use timed entry and sell out in busy months. Walking and food tours are more flexible, but popular dates still fill.' },
      { q: 'Are the reviews on these tours from GlobeWithLocals customers?', a: 'No. GlobeWithLocals is new. Where a tour shows reviews, they are guest reviews of this same tour from another booking platform, and each page says so. Reviews from guests who book with us are added as they come in.' },
      { q: 'Can I talk to someone before booking?', a: 'Yes. Message us on WhatsApp and we will help you choose a tour and date.' },
    ],
    terms: [], related: ['best-colosseum-tours-rome', 'best-vatican-tours-rome', 'best-day-trips-from-rome', 'best-food-tours-rome', 'rome-3-day-itinerary', 'best-time-to-visit-rome', 'where-to-stay-in-rome'],
  },
  {
    ...R, slug: 'best-colosseum-tours-rome', title: 'Best Colosseum Tours in Rome', seoTitle: 'Best Colosseum Tours in Rome: Guided, Arena Floor and Underground',
    description: 'Compare Colosseum tours in Rome: guided visits with the Roman Forum and Palatine Hill, arena floor and underground access, and how to choose a time slot.',
    intro: ['The Colosseum is Rome\'s most visited monument and entry is by timed ticket. A guided tour solves the two real problems, getting in at a fixed time and understanding what you are looking at.', 'Most Colosseum tours also cover the Roman Forum and Palatine Hill, which sit beside it and are normally covered by the same ticket.'],
    sections: [
      { h: 'Standard, arena floor and underground', p: ['A standard visit covers the tiers and the arcades. Some options add access to the arena floor, and some include the underground chambers where animals and gladiators were held. These extras are separate options and are limited in number, so choose them early.'] },
      { h: 'Best time to go', p: ['Early morning and late afternoon are quieter and cooler. Midday in summer is hot and crowded, and there is little shade inside. Bring water and a hat in summer.'] },
      { h: 'Forum and Palatine Hill', p: ['The Forum was the civic centre of ancient Rome and Palatine Hill is where emperors lived. Seen with a guide, the scattered stones become a readable city. Without one, many visitors find the Forum confusing.'] },
    ],
    choose: ['Decide whether you want the arena floor or underground before you pick a date.', 'Check how long the tour runs and whether the Forum and Palatine are included.', 'Wear comfortable shoes: the ground is uneven.'],
    faqs: [
      { q: 'Is the Roman Forum included with a Colosseum ticket?', a: 'The standard Colosseum ticket normally covers the Roman Forum and Palatine Hill too. Each tour page lists exactly what its entry includes.' },
      { q: 'How long does a Colosseum tour take?', a: 'A combined Colosseum, Forum and Palatine Hill tour usually runs between two and three hours, depending on the option.' },
      { q: 'Do I need to book the Colosseum in advance?', a: 'Yes. Entry is timed and busy dates sell out, so book as soon as your dates are fixed.' },
    ],
    terms: ['colosseum'], related: ['best-tours-in-rome', 'best-skip-the-line-tickets-rome', 'best-walking-tours-rome', 'best-catacombs-and-underground-rome-tours', 'colosseum-tickets-explained-rome'],
  },
  {
    ...R, slug: 'best-vatican-tours-rome', title: 'Best Vatican Tours in Rome', seoTitle: 'Best Vatican Museums and Sistine Chapel Tours in Rome',
    description: 'Compare Vatican tours in Rome: Vatican Museums, Sistine Chapel and St. Peter\'s Basilica, early entry, small groups and how to avoid the crowds.',
    intro: ['The Vatican Museums are among the largest in the world and the route ends at the Sistine Chapel. It gets crowded, so how you enter and who guides you matters more here than almost anywhere in Rome.', 'Most Vatican tours cover the museums, the Sistine Chapel and often St. Peter\'s Basilica.'],
    sections: [
      { h: 'Why a guide helps', p: ['The museums stretch for kilometres. A guide picks a route through the highlights, explains the Raphael Rooms and the Sistine ceiling, and keeps you moving through the busiest corridors.'] },
      { h: 'Dress code and practical rules', p: ['Shoulders and knees must be covered for the museums and St. Peter\'s Basilica. Large bags are not allowed in. The museums are normally closed on Sundays except one free-entry Sunday a month, which is extremely crowded, so most visitors avoid it.'] },
      { h: 'Early entry and small groups', p: ['Early-entry and small-group options cost more but reach the Sistine Chapel when it is calmer. They suit anyone who dislikes crowds.'] },
    ],
    choose: ['Confirm whether St. Peter\'s Basilica is included.', 'Check the start time: earlier is calmer.', 'Check group size and whether headsets are provided.'],
    faqs: [
      { q: 'Is St. Peter\'s Basilica included in Vatican Museums tours?', a: 'Many tours include it, some do not. The tour page states which.' },
      { q: 'What should I wear to the Vatican?', a: 'Cover shoulders and knees. Bring a light scarf in summer.' },
      { q: 'How long does a Vatican tour take?', a: 'Most run between two and four hours depending on whether the Basilica is included.' },
    ],
    terms: ['vatican', 'sistine'], related: ['best-st-peters-basilica-tours-rome', 'best-tours-in-rome', 'best-skip-the-line-tickets-rome', 'best-private-tours-rome', 'vatican-museums-visiting-guide-rome'],
  },
  {
    ...R, slug: 'best-food-tours-rome', title: 'Best Food Tours in Rome', seoTitle: 'Best Food Tours in Rome: Pasta, Pizza, Gelato and Markets',
    description: 'The best food tours in Rome: tastings across Trastevere, Testaccio and the markets, plus what Roman dishes to try and how to pick a food tour.',
    intro: ['Roman food is simple and specific: cacio e pepe, carbonara, amatriciana, supplì, pizza al taglio and artichokes. A good food tour walks you through the neighbourhoods where these are done properly.', 'The tours below range from market walks to multi-stop tastings with wine.'],
    sections: [
      { h: 'The dishes to try', p: ['Cacio e pepe, carbonara, gricia and amatriciana are the four classic Roman pastas. Supplì are fried rice croquettes, and pizza al taglio is sold by weight from bakeries. Carciofi alla romana and alla giudia are the artichoke dishes.'] },
      { h: 'Where food tours go', p: ['Testaccio is the traditional working-class food district with a famous market. Trastevere has the old streets and trattorias. Campo de\' Fiori and the Jewish Ghetto are known for fried artichokes and bakeries.'] },
      { h: 'Dietary needs', p: ['Tell the operator about allergies and dietary requirements when you book. Roman cooking is heavy on pork, cheese and eggs, so vegetarian and gluten-free options need to be arranged ahead.'] },
    ],
    choose: ['Count the tasting stops and whether a full meal is included.', 'Check whether drinks are included.', 'Pick evening for a relaxed dinner feel, morning for market walks.'],
    faqs: [
      { q: 'Is a food tour enough for lunch or dinner?', a: 'Many are designed to replace a meal. The tour page lists the number of tastings and what is included.' },
      { q: 'Can food tours handle dietary restrictions?', a: 'Often yes if you tell the operator in advance. Message us and we will check for your date.' },
    ],
    terms: ['food', 'pasta', 'gelato', 'pizza', 'tasting', 'trattoria', 'market'], related: ['best-cooking-classes-rome', 'best-wine-tours-and-tastings-rome', 'best-hidden-gems-and-trastevere-tours-rome', 'best-tours-in-rome'],
  },
  {
    ...R, slug: 'best-day-trips-from-rome', title: 'Best Day Trips from Rome', seoTitle: 'Best Day Trips from Rome: Pompeii, Tivoli, Orvieto, Florence and More',
    description: 'The best day trips from Rome: Pompeii, Tivoli, Orvieto, Florence, Tuscany and the Amalfi Coast, with travel times and how to choose.',
    intro: ['Rome sits in the middle of Italy, and the train and road network makes a long list of day trips realistic. The key is matching the distance to the time you have.', 'Closer trips such as Tivoli and Ostia Antica take about an hour each way. Pompeii, Florence and Orvieto are full days.'],
    sections: [
      { h: 'Near Rome: Tivoli and Ostia Antica', p: ['Tivoli, east of Rome, has Villa d\'Este with its fountains and Hadrian\'s Villa. Ostia Antica is Rome\'s ancient port, well preserved and quieter than the Forum.'] },
      { h: 'Full days: Pompeii, Florence, Orvieto', p: ['Pompeii and the Bay of Naples are about two and a half hours away by road. Florence is a long day trip by fast train. Orvieto, in Umbria, is a hill town with a famous cathedral, and is the easiest full-day escape.'] },
      { h: 'Guided day trip or do it yourself', p: ['Guided trips handle tickets and transfers, which matters at Pompeii and for combined itineraries. Independent train travel is cheaper but needs more planning.'] },
    ],
    choose: ['Check total travel time against tour time.', 'Check whether entry tickets and lunch are included.', 'Confirm the pickup point in Rome.'],
    faqs: [
      { q: 'What is the best day trip from Rome?', a: 'Orvieto and Tivoli are the easiest. Pompeii is the most famous but a long day.' },
      { q: 'Is Florence a realistic day trip from Rome?', a: 'It can be done by fast train, but it is a long day. Staying overnight is more comfortable.' },
    ],
    terms: ['day trip', 'pompeii', 'tivoli', 'orvieto', 'florence', 'tuscany', 'amalfi', 'naples', 'assisi', 'ostia'], related: ['best-tivoli-tours-from-rome', 'best-orvieto-assisi-umbria-day-trips', 'best-appian-way-and-ostia-antica-tours', 'best-tours-in-rome'],
  },
  {
    ...R, slug: 'best-private-tours-rome', title: 'Best Private Tours in Rome', seoTitle: 'Best Private Tours in Rome: Guides, Drivers and Custom Itineraries',
    description: 'Private tours in Rome for couples, families and groups: Colosseum, Vatican, city highlights and custom routes, with group pricing explained.',
    intro: ['A private tour gives you the guide to yourself. You set the pace, skip what does not interest you and ask questions without a group waiting.', 'Pricing on private tours is per group size, so the per-person cost drops as the party gets larger.'],
    sections: [
      { h: 'Who private tours suit', p: ['Families with children, travellers with limited mobility, couples who want a slower day and groups of friends. A private guide can adapt to a child\'s attention span or a slower walking pace.'] },
      { h: 'How private pricing works', p: ['The tour page shows a price for your group size. Solo travellers pay the most per head, and a party of four or six usually pays much less each.'] },
    ],
    choose: ['Enter your exact group size on the tour page to see the real price.', 'Check what entry tickets are included.', 'Message us for a custom route.'],
    faqs: [{ q: 'Can I customise a private tour?', a: 'Often yes within the operator\'s offer. Message us your interests and dates and we will ask.' }, { q: 'Is a private tour worth it for two people?', a: 'It can be, especially for the Vatican and the Colosseum where flexibility and timing matter.' }],
    terms: ['private'], related: ['best-tours-in-rome', 'best-rome-tours-for-families', 'best-vatican-tours-rome', 'best-colosseum-tours-rome'],
  },
  {
    ...R, slug: 'best-rome-tours-for-families', title: 'Best Rome Tours for Families', seoTitle: 'Best Rome Tours for Families and Kids',
    description: 'Family-friendly tours in Rome: short, interactive and kid-focused options, plus practical tips for visiting Rome with children.',
    intro: ['Rome works well with children if the day is short and varied. Long museum visits wear them out, but gladiator stories, underground tunnels and gelato stops keep them engaged.', 'These tours are designed for families or suit them well.'],
    sections: [
      { h: 'What works with kids', p: ['Short tours of two to three hours, hands-on activities such as pizza or gelato making, and sights with a story, like the Colosseum or the catacombs, work best. Avoid stacking several long museums in one day.'] },
      { h: 'Practical tips', p: ['Rome has little shade in summer, so plan indoor time at midday. Bring water, hats and a stroller that handles cobblestones, or a carrier for toddlers.'] },
    ],
    choose: ['Check the minimum age and child pricing on the tour page.', 'Prefer a private tour if children are very young.'],
    faqs: [{ q: 'Is Rome good for kids?', a: 'Yes, with short days and plenty of breaks. The Colosseum and a gelato stop are reliable favourites.' }, { q: 'Do children get a discount?', a: 'Many tours price children lower. The tour page shows the child price where it exists.' }],
    terms: ['family', 'kid', 'child'], related: ['best-private-tours-rome', 'best-cooking-classes-rome', 'best-colosseum-tours-rome', 'best-tours-in-rome'],
  },
  {
    ...R, slug: 'best-night-tours-rome', title: 'Best Night and Evening Tours in Rome', seoTitle: 'Best Rome Night Tours: Evening Walks, Sunset and Dinner',
    description: 'Evening and night tours in Rome: illuminated monuments, sunset walks, food and wine evenings, and tips for seeing Rome after dark.',
    intro: ['Rome after dark is cooler, quieter and beautifully lit. Evening tours are a good answer to hot summer days.', 'The options range from sunset walks to dinners and food tours.'],
    sections: [
      { h: 'What you can see at night', p: ['The Colosseum, the Forum area, Piazza Navona, the Trevi Fountain and the Pantheon are all lit and far less crowded in the evening. Interiors such as the Vatican close earlier in the day.'] },
      { h: 'Summer evenings', p: ['In July and August the day is too hot for walking at noon. An evening start gives comfortable temperatures and long light.'] },
    ],
    choose: ['Check the start time and end point so you can get home easily.', 'Check whether dinner or drinks are included.'],
    faqs: [{ q: 'Is Rome safe at night?', a: 'The central tourist areas are busy and generally comfortable in the evening. Take normal city precautions and watch for pickpockets in crowds.' }],
    terms: ['night', 'evening', 'sunset', 'dinner'], related: ['best-food-tours-rome', 'best-walking-tours-rome', 'best-pantheon-trevi-and-piazza-navona-tours', 'best-tours-in-rome'],
  },
  {
    ...R, slug: 'best-catacombs-and-underground-rome-tours', title: 'Best Catacombs and Underground Rome Tours', seoTitle: 'Best Catacombs and Underground Rome Tours',
    description: 'Catacombs, crypts and underground Rome: what to expect, which sites are worth visiting and how to book a guided tour.',
    intro: ['Beneath Rome are early Christian catacombs, crypts and layers of older buildings. Underground tours show a side of the city most visitors never see.', 'These tours combine the catacombs, the Capuchin crypt and underground ruins in different ways.'],
    sections: [
      { h: 'What to expect', p: ['Catacombs are narrow, cool corridors dug into soft rock. Visits are guided, group-based and usually forbid photography. Temperatures inside stay cool all year, so bring a light layer in summer.'] },
      { h: 'Other underground sites', p: ['Under the church of San Clemente are a fourth-century basilica and a first-century building, and the Colosseum has underground chambers on specific tickets.'] },
    ],
    choose: ['Check the walking and stairs involved.', 'Check whether transport to the Appian Way is included.'],
    faqs: [{ q: 'Are the catacombs suitable for children?', a: 'Generally yes for older children, but narrow and dim. Check the tour page.' }],
    terms: ['catacomb', 'crypt', 'bones', 'underground'], related: ['best-appian-way-and-ostia-antica-tours', 'best-colosseum-tours-rome', 'best-hidden-gems-and-trastevere-tours-rome', 'best-tours-in-rome'],
  },
  {
    ...R, slug: 'best-skip-the-line-tickets-rome', title: 'Best Skip-the-Line Tickets and Entry in Rome', seoTitle: 'Rome Skip-the-Line Tickets: What They Actually Skip',
    description: 'What skip-the-line means in Rome, which attractions need timed tickets, and the best tickets and entry tours to book ahead.',
    intro: ['"Skip the line" in Rome means a pre-booked, timed entry, so you avoid the ticket queue. You will still pass security.', 'Book ahead for the Colosseum and the Vatican Museums above all.'],
    sections: [
      { h: 'What it really means', p: ['A skip-the-line ticket lets you bypass the ticket-buying queue. Security screening still happens, and a short wait at the door is normal.'] },
      { h: 'What to book ahead', p: ['The Colosseum, Forum and Palatine Hill, the Vatican Museums, the Borghese Gallery and the Sistine Chapel all sell timed slots that run out in busy months.'] },
    ],
    choose: ['Compare ticket-only against guided entry.', 'Pick the earliest slot you can manage.'],
    faqs: [{ q: 'Is skip-the-line worth it?', a: 'Yes in the high season, when queues for tickets can be long.' }],
    terms: ['skip', 'ticket', 'entry', 'entrance', 'priority'], related: ['best-colosseum-tours-rome', 'best-vatican-tours-rome', 'best-tours-in-rome', 'best-walking-tours-rome'],
  },
  {
    ...R, slug: 'best-walking-tours-rome', title: 'Best Walking Tours in Rome', seoTitle: 'Best Walking Tours in Rome: Ancient Rome, Centre and Neighbourhoods',
    description: 'Walking tours in Rome: the historic centre, ancient sites and neighbourhoods, with tips on pace, shoes and group size.',
    intro: ['Rome\'s centre is compact and best seen on foot. A walking tour links the sights into a story you can follow.', 'Walks vary from two-hour highlights to full-day routes.'],
    sections: [
      { h: 'Typical routes', p: ['Popular walks join Piazza Navona, the Pantheon, the Trevi Fountain and the Spanish Steps, or cover the ancient core from the Colosseum to the Forum.'] },
      { h: 'Practical tips', p: ['Wear comfortable shoes for cobblestones. Carry water and sun protection in summer.'] },
    ],
    choose: ['Compare duration and distance.', 'Prefer smaller groups for easier listening.'],
    faqs: [{ q: 'How far do walking tours go?', a: 'Most cover three to six kilometres at a relaxed pace.' }],
    terms: ['walking', 'walk'], related: ['best-pantheon-trevi-and-piazza-navona-tours', 'best-hidden-gems-and-trastevere-tours-rome', 'best-night-tours-rome', 'best-tours-in-rome'],
  },
  {
    ...R, slug: 'best-vespa-bike-and-golf-cart-tours-rome', title: 'Best Vespa, Bike and Golf Cart Tours in Rome', seoTitle: 'Best Vespa, E-Bike and Golf Cart Tours in Rome',
    description: 'See Rome by Vespa, e-bike, golf cart or vintage car: what each covers, who it suits and what to know before booking.',
    intro: ['Rome has seven hills and a lot of ground to cover. Wheeled tours let you see more with less walking.', 'Choose by comfort: a golf cart or vintage car for ease, an e-bike for activity, a Vespa for the experience.'],
    sections: [
      { h: 'Which suits you', p: ['Golf carts and vintage cars suit families and anyone who tires on foot. E-bikes suit active travellers. Vespa tours are usually with a driver, so no riding experience is needed for passengers.'] },
      { h: 'Practical points', p: ['Wear closed shoes. Helmets are normally provided. Check age and weight limits on the tour page.'] },
    ],
    choose: ['Check the minimum age.', 'Check how many stops the route includes.'],
    faqs: [{ q: 'Do I need a licence for an e-bike or golf cart tour?', a: 'Usually no, because a guide leads or drives. Check the tour page for the requirements.' }],
    terms: ['vespa', 'golf cart', 'bike', 'e-bike', 'scooter', 'vintage'], related: ['best-walking-tours-rome', 'best-night-tours-rome', 'best-rome-tours-for-families', 'best-tours-in-rome'],
  },
  {
    ...R, slug: 'best-cooking-classes-rome', title: 'Best Cooking Classes in Rome', seoTitle: 'Best Cooking Classes in Rome: Pasta, Pizza and Tiramisu',
    description: 'Cooking classes in Rome: handmade pasta, pizza and tiramisu with local cooks, what to expect and how to choose.',
    intro: ['A cooking class is one of the best ways to take Rome home with you. You make the dish and then eat it.', 'Classes range from pasta-only sessions to full menus with wine.'],
    sections: [
      { h: 'What you will make', p: ['Fresh fettuccine and ravioli are common, as are Roman pasta sauces, pizza and tiramisu. Most classes end with a shared meal.'] },
      { h: 'Choosing a class', p: ['Look at the menu, the group size and whether wine is included. Smaller groups give more hands-on time.'] },
    ],
    choose: ['Check the menu.', 'Check duration and drinks.'],
    faqs: [{ q: 'Are cooking classes suitable for beginners?', a: 'Yes. Classes are designed for all levels.' }],
    terms: ['cooking', 'class', 'workshop', 'pasta making', 'pizza making'], related: ['best-food-tours-rome', 'best-wine-tours-and-tastings-rome', 'best-rome-tours-for-families', 'best-tours-in-rome'],
  },
  {
    ...R, slug: 'best-wine-tours-and-tastings-rome', title: 'Best Wine Tours and Tastings in Rome', seoTitle: 'Best Wine Tours and Tastings in Rome and Lazio',
    description: 'Wine tastings and wine tours from Rome: city wine bars, Castelli Romani vineyards and Tuscany day trips.',
    intro: ['Lazio produces good everyday wine and Tuscany lies a few hours north. Tastings in Rome range from wine-bar evenings to vineyard days out.'],
    sections: [{ h: 'Where to taste', p: ['In the city, wine bars pair tastings with cheeses and cured meats. Outside, the Castelli Romani hills south-east of Rome have vineyards and cellars close to the city.'] }],
    choose: ['Check how many wines are poured.', 'Check transport if the tasting is out of town.'],
    faqs: [{ q: 'Are wine tours suitable for non-drinkers?', a: 'Often there are food-focused alternatives. Ask before booking.' }],
    terms: ['wine', 'tuscany', 'chianti', 'vineyard'], related: ['best-food-tours-rome', 'best-cooking-classes-rome', 'best-day-trips-from-rome', 'best-tours-in-rome'],
  },
  {
    ...R, slug: 'best-st-peters-basilica-tours-rome', title: 'Best St. Peter\'s Basilica Tours in Rome', seoTitle: 'Best St. Peter\'s Basilica and Dome Tours in Rome',
    description: 'Tours of St. Peter\'s Basilica, the dome climb and the Vatican grottoes, with dress code and timing advice.',
    intro: ['St. Peter\'s Basilica is among the largest churches in the world. Entry to the basilica itself is free, but queues and security make a guided visit worthwhile.', 'Some tours add the dome climb or the papal tombs underneath.'],
    sections: [
      { h: 'Dome climb', p: ['The dome climb involves several hundred steps and narrow stairways, so it is not suitable for everyone. The view across Rome from the top is the reward.'] },
      { h: 'Dress code', p: ['Cover shoulders and knees, and expect bag checks at the entrance.'] },
    ],
    choose: ['Check whether the dome and the grottoes are included.', 'Check for early start times.'],
    faqs: [{ q: 'Is St. Peter\'s Basilica free?', a: 'Entering the basilica is free. Tours, the dome and other areas have separate costs.' }],
    terms: ['basilica', 'dome', 'st. peter', 'st peter'], related: ['best-vatican-tours-rome', 'best-private-tours-rome', 'best-skip-the-line-tickets-rome', 'best-tours-in-rome'],
  },
  {
    ...R, slug: 'best-hidden-gems-and-trastevere-tours-rome', title: 'Best Hidden Gems and Trastevere Tours in Rome', seoTitle: 'Best Hidden Gems, Trastevere and Jewish Ghetto Tours in Rome',
    description: 'Tours of Rome\'s lesser-known corners: Trastevere, the Jewish Ghetto, Monti and secret courtyards and churches.',
    intro: ['Beyond the big monuments, Rome\'s neighbourhoods carry the city\'s daily life. Trastevere, the Jewish Ghetto and Monti reward slower exploration.'],
    sections: [{ h: 'Neighbourhoods worth a walk', p: ['Trastevere is known for ivy-covered lanes and trattorias. The Jewish Ghetto is one of Europe\'s oldest, with ancient ruins at its edge. Monti is a bohemian district near the Colosseum.'] }],
    choose: ['Prefer a local guide for stories behind the streets.', 'Check the walking distance.'],
    faqs: [{ q: 'Is Trastevere worth visiting?', a: 'Yes, especially in the evening for dinner and a walk.' }],
    terms: ['hidden', 'secret', 'trastevere', 'ghetto', 'monti', 'local'], related: ['best-walking-tours-rome', 'best-food-tours-rome', 'best-night-tours-rome', 'best-tours-in-rome'],
  },
  {
    ...R, slug: 'best-pantheon-trevi-and-piazza-navona-tours', title: 'Best Pantheon, Trevi Fountain and Piazza Navona Tours', seoTitle: 'Best Pantheon, Trevi and Piazza Navona Tours in Rome',
    description: 'Tours of the Pantheon, Trevi Fountain, Piazza Navona and the Spanish Steps: what to see and how to avoid the crowds.',
    intro: ['These sights sit close together in the historic centre and are easy to combine on one walk.', 'Crowds are heaviest late morning to evening, so early or late visits are more pleasant.'],
    sections: [{ h: 'The Pantheon', p: ['The Pantheon is nearly two thousand years old and still has the world\'s largest unreinforced concrete dome. It is a working church and entry rules can change, so check the tour page.'] }, { h: 'Fountains and squares', p: ['Piazza Navona is built on a Roman stadium and has Bernini\'s Fountain of the Four Rivers. The Trevi Fountain is a short walk away.'] }],
    choose: ['Check the visit time.', 'Prefer small groups for narrow lanes.'],
    faqs: [{ q: 'How long to see these sights?', a: 'Allow two to three hours for a relaxed walk with stops.' }],
    terms: ['pantheon', 'trevi', 'piazza navona', 'spanish steps', 'fountain'], related: ['best-walking-tours-rome', 'best-night-tours-rome', 'best-hidden-gems-and-trastevere-tours-rome', 'best-tours-in-rome', 'pantheon-rome-visiting-guide', 'trevi-fountain-rome-guide'],
  },
  {
    ...R, slug: 'best-appian-way-and-ostia-antica-tours', title: 'Best Appian Way and Ostia Antica Tours', seoTitle: 'Best Appian Way, Catacombs and Ostia Antica Tours from Rome',
    description: 'Tours of the Appian Way, aqueducts and Ostia Antica, the ancient port of Rome, with timing and transport advice.',
    intro: ['South of the city, the Appian Way is one of the oldest Roman roads, lined with tombs and catacombs. West at the coast lies Ostia Antica, the ancient port.'],
    sections: [{ h: 'Appian Way', p: ['The road is cobbled, quiet and best by bike or with a guide. On quieter days it feels far from the city.'] }, { h: 'Ostia Antica', p: ['A well-preserved Roman town with shops, baths and a theatre. It is less crowded than the Forum and about half an hour from central Rome by train.'] }],
    choose: ['Check whether transport is included.', 'Wear sun protection.'],
    faqs: [{ q: 'Is Ostia Antica worth the trip?', a: 'Yes, especially for people who enjoy ruins without big crowds.' }],
    terms: ['ostia', 'appian', 'aqueduct', 'baths'], related: ['best-catacombs-and-underground-rome-tours', 'best-day-trips-from-rome', 'best-vespa-bike-and-golf-cart-tours-rome', 'best-tours-in-rome'],
  },
  {
    ...R, slug: 'best-tivoli-tours-from-rome', title: 'Best Tivoli Tours from Rome', seoTitle: 'Best Tivoli, Villa d\'Este and Hadrian\'s Villa Tours from Rome',
    description: 'Tivoli day trips from Rome: Villa d\'Este fountains and Hadrian\'s Villa, with travel times and tips.',
    intro: ['Tivoli lies east of Rome and combines two great sites, Villa d\'Este and Hadrian\'s Villa, both UNESCO-listed.'],
    sections: [{ h: 'What to see', p: ['Villa d\'Este is a Renaissance garden of fountains. Hadrian\'s Villa is the vast ruined retreat of the emperor Hadrian.'] }],
    choose: ['Check whether both sites are included.', 'Confirm the pickup point.'],
    faqs: [{ q: 'How long is Tivoli from Rome?', a: 'Around an hour each way, depending on traffic and transport.' }],
    terms: ['tivoli', 'villa'], related: ['best-day-trips-from-rome', 'best-appian-way-and-ostia-antica-tours', 'best-orvieto-assisi-umbria-day-trips', 'best-tours-in-rome'],
  },
  {
    ...R, slug: 'best-airport-transfers-and-private-driver-rome', title: 'Best Airport Transfers and Private Drivers in Rome', seoTitle: 'Rome Airport Transfers and Private Driver Tours',
    description: 'Airport transfers and private drivers in Rome: Fiumicino and Ciampino, what a fixed price covers and how to book.',
    intro: ['Rome has two main airports, Fiumicino (FCO) and Ciampino (CIA). A pre-booked transfer gives you a fixed price and a driver waiting on arrival.'],
    sections: [{ h: 'Fiumicino and Ciampino', p: ['Fiumicino is the main international airport west of the city. Ciampino, to the south-east, serves many budget airlines. Both are roughly 30 to 60 minutes from the centre depending on traffic.'] }],
    choose: ['Give your flight number so the driver can track delays.', 'Check luggage limits.'],
    faqs: [{ q: 'Is a pre-booked transfer worth it?', a: 'It gives a fixed price and removes queues for taxis, especially after a late arrival.' }],
    terms: ['transfer', 'airport', 'driver', 'shuttle'], related: ['best-private-tours-rome', 'best-cruise-shore-excursions-rome-civitavecchia', 'best-day-trips-from-rome', 'best-tours-in-rome', 'rome-airport-to-city-centre-guide'],
  },
  {
    ...R, slug: 'best-cruise-shore-excursions-rome-civitavecchia', title: 'Best Rome Shore Excursions from Civitavecchia', seoTitle: 'Best Rome Cruise Shore Excursions from Civitavecchia',
    description: 'Shore excursions from Civitavecchia to Rome: timing, transfer and the highlights you can realistically see in a port day.',
    intro: ['Cruise ships dock at Civitavecchia, around 80 km from Rome. A port day in Rome is tight, so plan the highlights and keep a margin before sailing time.'],
    sections: [{ h: 'Planning a port day', p: ['The transfer takes more than an hour each way. Most excursions pick a short list of highlights, such as the Colosseum or the Vatican, rather than trying to see everything.'] }],
    choose: ['Check that the tour returns you before the ship leaves.', 'Choose one or two sights rather than many.'],
    faqs: [{ q: 'Can I see Rome from a cruise ship in one day?', a: 'You can see highlights, but not the whole city. Pick a focused itinerary.' }],
    terms: ['cruise', 'civitavecchia', 'shore', 'port'], related: ['best-airport-transfers-and-private-driver-rome', 'best-colosseum-tours-rome', 'best-vatican-tours-rome', 'best-tours-in-rome'],
  },
  {
    ...R, slug: 'best-orvieto-assisi-umbria-day-trips', title: 'Best Orvieto, Assisi and Umbria Day Trips from Rome', seoTitle: 'Best Orvieto, Assisi and Umbria Day Trips from Rome',
    description: 'Day trips from Rome to Orvieto, Assisi and Civita di Bagnoregio: what each offers and how long to allow.',
    intro: ['Umbria and northern Lazio offer hill towns within a day\'s reach of Rome. Orvieto is the easiest, Assisi a longer day.'],
    sections: [{ h: 'Orvieto and Civita', p: ['Orvieto sits on a rock above the valley and is known for its cathedral. Civita di Bagnoregio is a tiny hill town reached by a footbridge.'] }, { h: 'Assisi', p: ['Assisi is a pilgrimage town with the Basilica of St. Francis. Expect a long day because of the travel time.'] }],
    choose: ['Check total travel time.', 'Choose one town for a relaxed day.'],
    faqs: [{ q: 'Which is the easiest hill town trip from Rome?', a: 'Orvieto, by road or train, is the simplest.' }],
    terms: ['orvieto', 'assisi', 'civita', 'umbria', 'bagnoregio'], related: ['best-day-trips-from-rome', 'best-tivoli-tours-from-rome', 'best-wine-tours-and-tastings-rome', 'best-tours-in-rome'],
  },
];

export const AUTH_BY_CITY: Record<string, { name: string; slug: string; image: string }[]> = {
  rome: AUTHORITY_PAGES.map((p) => ({ name: p.title, slug: p.slug, image: '' })),
};

export function getAuthorityPage(city: string, slug: string): AuthorityPage | null {
  return AUTHORITY_PAGES.find((p) => p.city === city.toLowerCase() && p.slug === slug) || null;
}
