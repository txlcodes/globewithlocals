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
  topRated?: boolean; // rank by rating (min review count) instead of review volume
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
    intro: ["Rome sits in a wine region of its own, Lazio, and the best wine day trip from the city goes to the Castelli Romani hills south-east of Rome, home of Frascati. You can also do a tasting in the city itself, in a wine bar or on a food-and-wine walk.", "This page explains the two main options, what you will taste, and how to choose a tour that suits your day."],
    sections: [
      { h: "Frascati and the Castelli Romani", p: ["Frascati is a hill town about 25 to 30 minutes from Rome by train, in the Castelli Romani area known for its white wines. Tours here usually combine a vineyard or cellar tasting with a walk through the old town and lunch at a local osteria. It is an easy half-day, and many tours depart from Rome."] },
      { h: "What you will taste", p: ["Frascati is known mainly for white wines, including Frascati Superiore, and a sweet style called Cannellino. A typical tasting covers three or so wines, usually with cheese, cured meats or bread, and sometimes a light lunch."] },
      { h: "Wine tasting inside Rome", p: ["If you prefer to stay in the city, many food walks include wine stops, and wine bars in neighbourhoods such as Trastevere and Testaccio offer tastings. This is an easy choice for an evening and needs no transport."] },
      { h: "Private or group", p: ["A small group tour is more sociable and costs less per person. A private tour with hotel pickup suits couples and families, and lets you set the pace and the stops."] },
      { h: "Tuscany and Chianti", p: ["Tuscany's wine country is a long drive from Rome. Full-day trips exist, but they are long days with several hours in a vehicle. For a relaxed experience from Rome, Frascati is usually the better choice."] },
    ],
    choose: ["Check how many wines you taste and whether food or lunch is included.", "Confirm whether transport from Rome is included.", "Choose a half-day in Frascati for an easy trip, a full-day only if you want Tuscany.", "Tell the operator about dietary needs and whether anyone in the group does not drink."],
    faqs: [
      { q: "What is the best wine tour near Rome?", a: "A half-day in Frascati and the Castelli Romani is the easiest and most popular, about 25 to 30 minutes from Rome." },
      { q: "What wine is Rome famous for?", a: "The Lazio region around Rome is known for white wines such as Frascati, and for the sweet Cannellino style." },
      { q: "Can I do a wine tasting in Rome itself?", a: "Yes. Many food walks include wine stops, and wine bars in Trastevere and Testaccio offer tastings." },
      { q: "Is a wine tour suitable for non-drinkers?", a: "Often yes, because tours also include the town walk and a meal. Tell the operator beforehand." },
    ],
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
    intro: ["Rome's famous sights are crowded, but a short walk away are quiet streets, small churches and viewpoints most visitors miss. Trastevere, across the Tiber, is the best-known of these neighbourhoods, with ivy-covered lanes, a lively evening scene and one of Rome's finest medieval churches.", "A local-led walk helps here more than almost anywhere in Rome, because the best of these places are hard to find from a map. This page covers where to look and how to choose a tour."],
    sections: [
      { h: "Trastevere", p: ["Trastevere is a neighbourhood of narrow lanes and small piazzas on the west bank of the Tiber. Its anchor is the church of Santa Maria in Trastevere, said to be among the oldest churches in Rome dedicated to the Virgin Mary, with glittering 12th-century mosaics inside. It is lovely by day, and livelier in the evening, when restaurants fill the squares."] },
      { h: "Villa Farnesina and the Janiculum", p: ["Villa Farnesina, a Renaissance villa in Trastevere, holds frescoes by Raphael and is often cited as one of the most overlooked sights in Rome. Higher up, the Janiculum Hill has broad views over the city and is a good place to end the day."] },
      { h: "The Jewish Ghetto and Tiber Island", p: ["Tiber Island links Trastevere to the Jewish Ghetto, one of the oldest Jewish quarters in Europe, with ancient ruins, small bakeries and long-established restaurants. A walk through both areas together is an easy way to see a quieter side of the centre."] },
      { h: "Monti and Campo de' Fiori", p: ["Monti, behind the Colosseum, has independent shops, wine bars and a village feel. Campo de' Fiori hosts a daily morning market and turns into a busy square at night. Both reward an unhurried visit."] },
      { h: "Local guide or self-guided", p: ["You can wander these areas alone, but a local guide explains the history behind the streets and takes you to places you would not find on your own, and they often add food stops. For an evening, a food-and-walk combination in Trastevere is one of the most popular choices."] },
    ],
    choose: ["Choose a small group so you can move through narrow streets.", "Pick an evening tour for atmosphere, or a morning one for fewer crowds.", "Check whether food tastings are included.", "Confirm the meeting point, since the lanes are hard to navigate."],
    faqs: [
      { q: "What is Trastevere known for?", a: "Its medieval lanes, the church of Santa Maria in Trastevere with 12th-century mosaics, and a lively evening dining scene." },
      { q: "Is Trastevere good at night?", a: "Yes, it is one of the liveliest areas of Rome in the evening, though it can be noisy and crowded on weekends." },
      { q: "What is there to see near the Jewish Ghetto?", a: "Ancient ruins, small bakeries and old restaurants. Tiber Island connects it to Trastevere." },
      { q: "Is a hidden-gems tour worth it?", a: "Usually yes, because the best places are hard to find alone and a local guide adds the stories behind them." },
    ],
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
    intro: ["Tivoli sits in the hills east of Rome and holds two of the best day-trip sights in Italy within a few kilometres of each other: Villa d'Este, a Renaissance garden of fountains, and Hadrian's Villa, the vast ruined retreat of the emperor Hadrian. Both are UNESCO World Heritage sites.", "You can reach Tivoli on your own cheaply, but the two villas are on opposite sides of town, so a guided day trip that links them removes most of the logistics. This page explains both options and what each villa is actually like."],
    sections: [
      { h: "Villa d'Este: the fountain garden", p: ["Villa d'Este is a 16th-century villa built for a cardinal, and its fame is the garden: terraces of fountains, water organs and long avenues of jets, all powered by gravity with no pumps. It is best seen at a slow pace, walking down the terraces and back up.", "It is mostly outdoors and on slopes and steps, so wear flat shoes. In summer the shade of the garden makes it a pleasant escape from Rome's heat."] },
      { h: "Hadrian's Villa: an emperor's retreat", p: ["Hadrian's Villa is a sprawling archaeological site of baths, pools, theatres and pavilions built by the emperor in the 2nd century. It is far larger than most visitors expect and has little shade, so allow time and bring water. A guide or an audio guide helps a great deal, because the ruins are spread out and mostly unlabelled."] },
      { h: "Getting to Tivoli on your own", p: ["Blue COTRAL buses to Tivoli leave from Ponte Mammolo, which is on Metro line B, and regional trains also run to Tivoli. Journey times vary with traffic and the timetable, so check Trenitalia or the bus operator on the day.", "Once in Tivoli, Villa d'Este is about a ten-minute walk from the train station, and local buses link the town to Hadrian's Villa. If you take a bus that stops on the main road, you may have a walk of roughly two kilometres to the Hadrian's Villa entrance."] },
      { h: "Guided trip or independent", p: ["Doing it yourself is the cheapest way and works if you are comfortable with local buses. A guided half-day or day trip handles the transport between the two sites, includes entry in many cases, and explains what you are looking at. Choose a guided trip if you want to see both villas in a single day without losing time to connections."] },
      { h: "How long to allow", p: ["Plan around two hours for each villa at a relaxed pace, plus travel. A full day covers both comfortably. If you only have a half-day, choose one: Villa d'Este for gardens and fountains, Hadrian's Villa for archaeology."] },
    ],
    choose: ["Check whether both villas are included, and whether entry tickets are in the price.", "Confirm the pickup point and the return time to Rome.", "Choose a guide if you want context at Hadrian's Villa, where little is labelled.", "Check opening days on the official sites, since both villas close on certain days."],
    faqs: [
      { q: "How far is Tivoli from Rome?", a: "Around an hour each way by bus or train, depending on traffic and the timetable." },
      { q: "Can I see both Villa d'Este and Hadrian's Villa in one day?", a: "Yes, comfortably in a full day. A guided trip makes it easier because the villas are on opposite sides of town." },
      { q: "Which is better, Villa d'Este or Hadrian's Villa?", a: "They suit different tastes. Villa d'Este is a garden of fountains, and Hadrian's Villa is a large ancient ruin. Most visitors enjoy seeing both." },
      { q: "Are the ticket prices included in tours?", a: "Many guided trips include entry, and the tour page states what is covered. For independent visits, check current prices on the official sites." },
    ],
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
    intro: ["Cruise ships dock at Civitavecchia, around 80 kilometres from Rome. A port day in Rome is tight, because the journey into the city eats a large part of your time on shore. The key to a good day is planning around the all-aboard time and choosing a short list of sights.", "This page explains how the transfer works, how many hours you really get, and the main ways to do it: by train on your own, with a shuttle, or on an organised excursion."],
    sections: [
      { h: "How many hours you really get", p: ["Allow about two hours door to door each way between the ship and central Rome, and plan to be back in Civitavecchia at least two hours before the all-aboard time. On an eight-hour port call, that leaves roughly three hours in the city. That is enough for one or two major sights, not for everything."] },
      { h: "By train on your own", p: ["A free port shuttle runs from the berths to the passenger hub at Largo della Pace, about every twenty minutes, and from there you walk or ride to the Civitavecchia station. Regional trains to Rome cost only a few euros and take roughly 70 to 80 minutes, while faster Intercity services take around 45 to 50 minutes at a higher fare. Regional trains can wait up to half an hour, and they get crowded when several ships are in port.", "This is the cheapest option and works well if you are confident with timetables, but it has the most timing risk."] },
      { h: "Shuttle bus and private transfer", p: ["Shuttle buses and private transfers run direct from the port to Rome. A taxi or private car costs far more than the train, and it is the fastest door to door. Agree the fare before you get in, since some drivers try to negotiate it up."] },
      { h: "Organised shore excursions", p: ["An organised excursion carries the transfer in the price and is scheduled around your all-aboard time, which removes the biggest risk of the day. Most pick one or two highlights, for example the Colosseum with the Forum, or the Vatican Museums, rather than trying to cover Rome. Choose one that states the return time to the ship."] },
      { h: "What to pick for a port day", p: ["Pick one anchor sight and a walk. The Colosseum and Forum, or the Vatican Museums and St. Peter's, are the two natural anchors, but not both. If you have been to Rome before, an old-town walk or a food tour fits more easily into the gaps."] },
    ],
    choose: ["Confirm the tour returns you to the ship well before all-aboard.", "Choose one or two sights, not a long list.", "Check whether the transfer from Civitavecchia is included.", "Plan to be back at the port at least two hours before departure."],
    faqs: [
      { q: "Can I see Rome from a cruise ship in one day?", a: "You can see highlights, not the whole city. With about three hours in the city on a typical eight-hour call, pick one or two sights." },
      { q: "How do I get from Civitavecchia to Rome?", a: "By regional or Intercity train, by shuttle bus, by taxi or private transfer, or on an organised excursion that includes transport." },
      { q: "How long is the journey?", a: "Around 45 to 80 minutes depending on the train, and roughly two hours door to door including the shuttle and station." },
      { q: "Is it safe to go independently?", a: "Yes, but the main risk is timing. Leave a generous margin before all-aboard, and consider an organised excursion if you are nervous about it." },
    ],
    terms: ['cruise', 'civitavecchia', 'shore', 'port'], related: ['best-airport-transfers-and-private-driver-rome', 'best-colosseum-tours-rome', 'best-vatican-tours-rome', 'best-tours-in-rome'],
  },
  {
    ...R, slug: 'best-orvieto-assisi-umbria-day-trips', title: 'Best Orvieto, Assisi and Umbria Day Trips from Rome', seoTitle: 'Best Orvieto, Assisi and Umbria Day Trips from Rome',
    description: 'Day trips from Rome to Orvieto, Assisi and Civita di Bagnoregio: what each offers and how long to allow.',
    intro: ["Umbria and northern Lazio put several remarkable hill towns within a day's reach of Rome. Orvieto is the easiest, a cathedral town on a rock above the valley. Civita di Bagnoregio is a tiny medieval village reached by a footbridge, and Assisi is a longer day with a major pilgrimage site.", "The right choice depends on how much of the day you want to spend travelling. This page compares the three and explains the trade-off between a single-town day and a multi-stop tour."],
    sections: [
      { h: "Orvieto: the easy one", p: ["Orvieto is the simplest hill town from Rome, reachable by regional train or by road, and a good pick if you want one relaxed destination. It is known for its striking cathedral and for the old town on top of a volcanic rock. Check Trenitalia for current journey times and the funicular up to the old town."] },
      { h: "Civita di Bagnoregio: the village on the edge", p: ["Civita is a very small medieval village on an eroding hilltop, reached on foot by a long pedestrian bridge. It is photogenic and quiet, and a visit takes an hour or two. Access to the village is charged, so check the current fee, and the walk up the bridge is steep enough that comfortable shoes matter."] },
      { h: "Assisi: a longer day", p: ["Assisi is a pilgrimage town and the home of Saint Francis, with a major basilica. It is about two hours from Rome by regional train, which makes it a long day trip if you travel independently. A day that combines Assisi with other stops is long, and guided tours that cover several towns run roughly twelve to fourteen hours."] },
      { h: "One town or several", p: ["A multi-stop tour sees more but spends most of the day in a vehicle, with short visits at each stop. If you would rather see one place properly, a single-town trip, especially Orvieto, leaves time to wander, eat lunch and take your time. Most visitors find fewer stops more enjoyable."] },
      { h: "When to go", p: ["Spring and autumn are the most comfortable. In summer the hill towns are hot in the middle of the day, so start early. In winter the days are short and some places keep reduced hours."] },
    ],
    choose: ["Choose one town for a relaxed day, or a multi-stop tour only if you accept a very long day.", "Check total travel time and the return time to Rome.", "Wear comfortable shoes for cobbles, hills and the Civita footbridge.", "Check access fees and opening days for each stop."],
    faqs: [
      { q: "Which is the easiest hill town trip from Rome?", a: "Orvieto, by regional train or road, is the simplest." },
      { q: "How long is Assisi from Rome?", a: "About two hours each way by regional train, so it is a long day trip." },
      { q: "Is Civita di Bagnoregio worth the trip?", a: "Yes if you like quiet, photogenic medieval villages. It takes an hour or two to visit, and access to the village is charged." },
      { q: "Can I see Orvieto, Civita and Assisi in one day?", a: "Guided tours do it in about twelve to fourteen hours, but most of the day is spent travelling. Fewer stops is usually more enjoyable." },
    ],
    terms: ['orvieto', 'assisi', 'civita', 'umbria', 'bagnoregio'], related: ['best-day-trips-from-rome', 'best-tivoli-tours-from-rome', 'best-wine-tours-and-tastings-rome', 'best-tours-in-rome'],
  },
];

export const AUTH_BY_CITY: Record<string, { name: string; slug: string; image: string }[]> = {
  rome: AUTHORITY_PAGES.map((p) => ({ name: p.title, slug: p.slug, image: '' })),
};

export function getAuthorityPage(city: string, slug: string): AuthorityPage | null {
  return AUTHORITY_PAGES.find((p) => p.city === city.toLowerCase() && p.slug === slug) || null;
}
