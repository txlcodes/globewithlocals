// Rome information guides. Unlike the "best tours" pages in authority.ts, these answer a planning
// question first (when to go, where to stay, what an entry rule is) and show matching tours after.
// Facts were checked against official sources in November 2026. Anything that changes often
// (ticket prices, fees) is described with a pointer to the official page rather than hardcoded
// where sources disagreed. Tour prices and ratings always come from the API.

import type { AuthorityPage } from './authority';

const R = { country: 'italy', city: 'rome', guide: true };

export const GUIDE_PAGES: AuthorityPage[] = [
  {
    ...R, slug: 'best-time-to-visit-rome', title: 'Best Time to Visit Rome: Month by Month',
    seoTitle: 'Best Time to Visit Rome: Weather, Crowds and Month-by-Month Guide',
    description: 'When to visit Rome: temperatures, rain, crowds and closures by season, with the months that work best for walking, the Vatican and the Colosseum.',
    intro: [
      'Rome works in every month, but the experience changes more than most cities. The short answer is April to early June and September to October: warm enough for long days outside, not yet or no longer oppressive.',
      'The longer answer depends on what you want to do. Rome is a walking city with a lot of unshaded stone, so heat matters more than the calendar suggests. Below is what each season is actually like, and how to plan around the weak spots.',
    ],
    sections: [
      { h: 'Spring: April to early June', p: [
        'Spring is the most reliable stretch. Days are mild, the light is good for the ancient sites, and the evenings are comfortable enough to eat outside. It is also busy. Easter week brings very large crowds to the Vatican and the centre, so book timed entries early if your dates include it.',
        'Late May and early June are a good compromise: nearly summer weather before the peak heat arrives.',
      ] },
      { h: 'Summer: late June to August', p: [
        'August is the hottest month, with an average high of around 31 degrees Celsius and lows near 18. It also feels humid. The Colosseum and the Roman Forum have very little shade, so a midday visit in July or August is tiring. Go at opening time or late in the day, carry water, and use the free drinking fountains found across the city.',
        'Mid-August is the Ferragosto holiday. Many Romans leave, some neighbourhood restaurants close for a week or two, and the Pantheon is closed on 15 August. The big sights stay open and the centre is less crowded with locals, but not less crowded with visitors.',
      ] },
      { h: 'Autumn: September to October', p: [
        'September and October match spring for comfort and often beat it for light. The heat of August eases, and the crowds thin from their summer peak. Rain starts to return, so keep a light jacket in your bag. November is the wettest month, with roughly 90 millimetres of rain on average, so it is a better time for museums than for long walks.',
      ] },
      { h: 'Winter: November to February', p: [
        'Winter is the quietest and cheapest time. January is the coldest month, with average highs around 12 degrees and lows near 3. Queues at the Colosseum and the Vatican are shorter, and you can see a lot in a day without heat. Some sights close on 25 December and 1 January, so check before you plan around those dates.',
        'Short days mean you have fewer daylight hours for the outdoor sights, so start early.',
      ] },
      { h: 'How to beat the crowds in any month', p: [
        'Book timed entry for the Colosseum and the Vatican Museums as soon as your dates are fixed, and choose the first slot of the day. The Vatican Museums are free on the last Sunday of each month, but that is also the most crowded day of the month, so most visitors are better off paying and going on a quieter day.',
        'In the busiest months, spend the early morning on the ancient centre, keep the middle of the day for museums and churches, and save the open-air walks for the evening.',
      ] },
    ],
    choose: [
      'Pick April to June or September to October if you want the easiest weather for walking.',
      'In July and August, plan outdoor sights for early morning and late afternoon.',
      'In winter, book the Vatican and the Colosseum for the morning to use the short daylight well.',
      'Check closures on 1 January, 15 August and 25 December before you build your plan around them.',
    ],
    faqs: [
      { q: 'What is the best month to visit Rome?', a: 'May, June, September and October are the most comfortable for sightseeing. Spring and early autumn combine mild weather with long days.' },
      { q: 'What is the cheapest time to visit Rome?', a: 'November to February, apart from the Christmas and New Year period, is usually the quietest and the lowest priced for flights and hotels.' },
      { q: 'Is Rome too hot in August?', a: 'It is hot, with highs around 31 degrees and humid air. It is workable if you start early, rest in the afternoon and carry water, but many visitors find spring or autumn easier.' },
      { q: 'Which month has the most rain in Rome?', a: 'November is the wettest on average, and July is the driest.' },
    ],
    terms: [], related: ['rome-3-day-itinerary', 'where-to-stay-in-rome', 'best-tours-in-rome', 'is-rome-safe-scams-and-pickpockets'],
  },
  {
    ...R, slug: 'rome-3-day-itinerary', title: 'Rome in 3 Days: A Realistic Itinerary',
    seoTitle: 'Rome 3-Day Itinerary: Ancient Rome, the Vatican and the Historic Centre',
    description: 'A realistic 3-day Rome itinerary: ancient Rome on day one, the Vatican on day two and the historic centre and Trastevere on day three, with timing and booking tips.',
    intro: [
      'Three days is enough to see the essentials of Rome without running. The trick is to group sights by area, book the two timed entries first, and leave the afternoons loose. Rome rewards wandering as much as ticking off monuments.',
      'This plan is built around geography, so you spend your time looking and not crossing the city on the metro.',
    ],
    sections: [
      { h: 'Day 1: Ancient Rome', p: [
        'Start at the Colosseum at opening time, then walk straight into the Roman Forum and up Palatine Hill. Allow three to four hours for all three. A guided visit helps here, because the Forum is a field of fragments until someone explains what each one was.',
        'After lunch, walk up to Capitoline Hill for the view over the Forum, then wander Monti, the neighbourhood behind the Colosseum, for dinner.',
      ] },
      { h: 'Day 2: The Vatican and Prati', p: [
        'Book the Vatican Museums for the first slot of the day. The route runs through the museums to the Sistine Chapel and exits near St. Peter\'s Basilica, so one visit covers both. Shoulders and knees must be covered, and large bags are not allowed in.',
        'In the afternoon, walk along the river to Castel Sant\'Angelo, then eat in Prati, the residential area north of the Vatican, where lunch is usually better value than around the museums.',
        'In the evening, cross the river to Trastevere for dinner and an unhurried walk.',
      ] },
      { h: 'Day 3: The historic centre', p: [
        'Begin at the Pantheon, which has timed ticketed entry, then walk to Piazza Navona and on to the Trevi Fountain. Go to the Trevi early or late: the basin has a paid entry in the daytime, and the piazza above it is free to stand in at any hour.',
        'Continue to the Spanish Steps and, if you have energy, up to the Villa Borghese gardens for the sunset view. If you would rather leave the centre, the Appian Way and the catacombs make a quiet half-day alternative.',
      ] },
      { h: 'How to pace it', p: [
        'Rome is far more tiring than the map suggests, because most of the walking is on cobbles and a lot of it is uphill. Plan one big sight per morning and keep the afternoon free. If you have only two days, combine days 1 and 3 and keep the Vatican as its own day.',
      ] },
    ],
    choose: [
      'Book the Colosseum and the Vatican before anything else, for the first slot of the day.',
      'Group sights by area so you walk instead of commuting.',
      'Do not schedule more than one major ticketed sight before lunch.',
      'Add a guided visit for the Forum and the Vatican, where context makes the biggest difference.',
    ],
    faqs: [
      { q: 'Is 3 days enough for Rome?', a: 'Yes for the main sights: the Colosseum and Forum, the Vatican and the historic centre. You will not see everything, but you will cover the essentials at a comfortable pace.' },
      { q: 'What should I book in advance?', a: 'The Colosseum and the Vatican Museums, which use timed entry and sell out in busy months. The Pantheon also uses ticketed entry.' },
      { q: 'Can I do Rome in 2 days?', a: 'Yes. Keep the Vatican as one day, and combine ancient Rome with the historic centre into the other, with an early start and a lot of walking.' },
      { q: 'How do I get around between sights?', a: 'Most of the centre is walkable. Use the metro or a bus for the longer links, for example to the Vatican, and see our guide to getting around Rome.' },
    ],
    terms: [], related: ['best-time-to-visit-rome', 'colosseum-tickets-explained-rome', 'vatican-museums-visiting-guide-rome', 'trevi-fountain-rome-guide', 'getting-around-rome-guide'],
  },
  {
    ...R, slug: 'where-to-stay-in-rome', title: 'Where to Stay in Rome: Best Neighbourhoods',
    seoTitle: 'Where to Stay in Rome: Best Neighbourhoods for First-Time Visitors',
    description: 'Where to stay in Rome: how the historic centre, Monti, Trastevere, Prati and Termini compare, plus how the city tourist tax works.',
    intro: [
      'Rome is spread out, so your base matters more than in a compact city. Most first-time visitors are happiest in or near the historic centre, where the Pantheon, Piazza Navona and the Trevi Fountain are within walking distance.',
      'These are the main areas, with an honest note on what each is good for and where it falls short.',
    ],
    sections: [
      { h: 'Historic centre (Centro Storico)', p: [
        'This is the default choice for a first visit. You can walk to the Pantheon, Piazza Navona, the Trevi Fountain and the Spanish Steps, and the Colosseum is a reasonable walk or a short ride away. The trade-offs are higher prices and noise at night on the busy squares.',
      ] },
      { h: 'Monti', p: [
        'Monti sits between Termini and the Colosseum. It has a village feel, good restaurants and wine bars, and it puts the ancient sites on your doorstep. It suits visitors who want to be close to the Colosseum without staying in the busiest tourist streets.',
      ] },
      { h: 'Trastevere', p: [
        'Across the river, Trastevere is the most atmospheric area, with ivy-covered lanes and a strong evening scene. It is less convenient for a short stay because it is a walk or a tram ride from most big sights, and it can be loud late into the night.',
      ] },
      { h: 'Prati', p: [
        'Prati is a quieter, residential district next to the Vatican, with wide streets and local restaurants. It is a good base if the Vatican is your priority, and it connects to the centre by metro and on foot across the river.',
      ] },
      { h: 'Around Termini station', p: [
        'The area around Termini has the best transport links, with the airport train and metro lines A and B, and hotels there tend to be cheaper. The streets right around the station can feel rough at night and are a known spot for pickpockets, so choose your exact street carefully and check recent reviews.',
      ] },
      { h: 'Rome\'s tourist tax', p: [
        'Rome charges a city tax per person per night, on top of your room price. Rates depend on the type of accommodation, from a few euros up to around ten euros per person per night for the top hotel category, and the tax applies for a limited number of consecutive nights, generally up to ten. It is usually collected at the property, and since sources differ on the exact current rates, confirm the amount with your hotel before you arrive.',
      ] },
    ],
    choose: [
      'Choose the historic centre or Monti for a first visit and short stay.',
      'Choose Prati if the Vatican is your main reason to visit.',
      'Choose Trastevere if evenings matter more than convenience.',
      'Check air conditioning in summer and heating in winter, which older Roman buildings do not always have.',
    ],
    faqs: [
      { q: 'What is the best area to stay in Rome for first-timers?', a: 'The historic centre, because most major sights are within walking distance. Monti is a close second if you want to be near the Colosseum.' },
      { q: 'Is it safe to stay near Termini station?', a: 'Rome is generally safe, but the area around Termini has more petty crime and pickpockets than most. It is convenient for transport, so pick your street and read recent reviews.' },
      { q: 'How many nights should I stay in Rome?', a: 'Three nights covers the main sights at a comfortable pace. See our 3-day Rome itinerary for a plan.' },
      { q: 'Is the tourist tax included in my booking?', a: 'Often not. It is commonly charged separately at the property, so check at booking.' },
    ],
    terms: [], related: ['rome-3-day-itinerary', 'best-time-to-visit-rome', 'rome-airport-to-city-centre-guide', 'best-hidden-gems-and-trastevere-tours-rome'],
  },
  {
    ...R, slug: 'trevi-fountain-rome-guide', title: 'Trevi Fountain: Entry Fee and How to Visit',
    seoTitle: 'Trevi Fountain Entry Fee 2026: How It Works and When to Go',
    description: 'The Trevi Fountain now has a paid entry for the basin area. How the fee works, who is exempt, when it is free and the best times to visit.',
    intro: [
      'In 2026 Rome began charging visitors to enter the area right next to the Trevi Fountain. The aim is to control the crowds that fill the small piazza all day. Standing and looking from the piazza above the basin is still free, so the fee only matters if you want to go down to the water.',
    ],
    sections: [
      { h: 'How the Trevi fee works', p: [
        'The charge is two euros and applies to the basin area closest to the fountain. According to the Rome tourism office, it applies every day from 9 in the morning to 10 at night and runs until the end of 2027. Tickets are sold online on the official site, at civic museums and information points, and at the entrance, where only card payment is accepted.',
        'Entry is free after 10 in the evening. Rome residents, children under five and people with disabilities and their carers are exempt. Dates and rules can change, so check the official Rome tourism site before you go.',
      ] },
      { h: 'Is it worth paying?', p: [
        'For a photograph and a look at the sculpture, the free view from above is enough. The paid area gets you closer to the water and the traditional place to toss a coin, and it is a more comfortable way to see it because the number of people in the basin is limited. Coins thrown in are collected and donated to charity.',
      ] },
      { h: 'Best time to see it', p: [
        'The piazza is quietest early in the morning and late at night. After 10 in the evening there is no fee and the lit fountain is at its best. Midday in the high season is the most crowded and the hardest to enjoy.',
      ] },
      { h: 'Pickpockets', p: [
        'Crowds around the Trevi attract pickpockets. Keep your bag zipped and in front of you, and be cautious with phones when you are taking photographs.',
      ] },
    ],
    choose: [
      'Go early morning or after 10 in the evening for fewer people and, at night, no fee.',
      'Bring a card, since cash is not accepted at the entrance.',
      'Combine it with the Pantheon and Piazza Navona on foot.',
      'Keep valuables secure in the crowd.',
    ],
    faqs: [
      { q: 'How much does it cost to enter the Trevi Fountain area?', a: 'Two euros for the basin area, according to the Rome tourism office. Viewing from the piazza above remains free.' },
      { q: 'Is the Trevi Fountain free at night?', a: 'Yes. The fee applies from 9 in the morning to 10 at night, and access is free after 10.' },
      { q: 'Who does not have to pay?', a: 'Rome residents, children under five, and people with disabilities and their carers.' },
      { q: 'Can I still throw a coin in?', a: 'Yes, from the paid basin area. The coins are collected and donated to charity.' },
    ],
    terms: ['trevi'], related: ['best-pantheon-trevi-and-piazza-navona-tours', 'rome-3-day-itinerary', 'is-rome-safe-scams-and-pickpockets', 'best-night-tours-rome'],
  },
  {
    ...R, slug: 'colosseum-tickets-explained-rome', title: 'Colosseum Tickets Explained',
    seoTitle: 'Colosseum Tickets Explained: Forum, Palatine, Arena and Underground',
    description: 'How Colosseum tickets work: the combined Colosseum, Forum and Palatine entry, why the Forum Pass SUPER is not valid for the Colosseum, and when to book.',
    intro: [
      'Colosseum ticketing confuses a lot of visitors, because several products with similar names exist and not all of them let you in. The Colosseum, the Roman Forum and Palatine Hill are managed as one archaeological park, and the ticket you choose decides what you can enter.',
    ],
    sections: [
      { h: 'The standard Colosseum ticket', p: [
        'The standard ticket covers the Colosseum together with the Roman Forum and Palatine Hill, valid for 24 hours. Entry to the Colosseum is at a fixed time slot, so you must choose a time when you book. You can use the Forum and Palatine at any point in the same 24 hours.',
      ] },
      { h: 'The Forum Pass SUPER is not a Colosseum ticket', p: [
        'The Forum Pass SUPER covers the Roman Forum, Palatine Hill and a set of additional sites, but the official ticket page states that it does not give access to the Colosseum. If you want to enter the Colosseum, you need a ticket that includes it.',
      ] },
      { h: 'Arena floor and underground', p: [
        'Higher-tier options add access to the arena floor and the underground chambers, and some include the upper levels. These are limited, timed and sell out first, and they usually run as guided visits. Choose one if the chambers under the arena are the part you most want to see.',
      ] },
      { h: 'Prices and who gets in free', p: [
        'Prices differ between the official site and resellers, and the official figures change, so use the official ticketing site of the Colosseum archaeological park for the current price. Under-18s generally enter free with proof of age, and reduced prices exist for some young EU visitors.',
        'Ticket names are personal: the name on your booking must match your ID at the gate, so book in the name of the person who will use it.',
      ] },
      { h: 'Guided tour or ticket only', p: [
        'A ticket-only visit is cheapest and suits travellers who read up in advance. A guided tour adds a fixed entry time, a guide who knows the entry routes and an explanation of the Forum, which is the part most people find hardest to follow alone.',
      ] },
    ],
    choose: [
      'Check that your ticket explicitly includes the Colosseum, not only the Forum.',
      'Decide in advance if you want the arena floor or underground.',
      'Book the first or last slot of the day to avoid midday heat and crowds.',
      'Make sure the name on the booking matches the ID of the visitor.',
    ],
    faqs: [
      { q: 'Does the Colosseum ticket include the Roman Forum?', a: 'The standard Colosseum ticket covers the Forum and Palatine Hill as well, valid for 24 hours.' },
      { q: 'Can I use the Forum Pass SUPER for the Colosseum?', a: 'No. The official page says the Forum Pass SUPER is not valid for access to the Colosseum.' },
      { q: 'Do I need to book the Colosseum in advance?', a: 'Yes. Entry is timed and busy dates sell out, so book as soon as your dates are fixed.' },
      { q: 'Is there a dress code at the Colosseum?', a: 'No formal dress code. Wear comfortable shoes, because the ground is uneven, and bring water and sun protection in summer.' },
    ],
    terms: ['colosseum'], related: ['best-colosseum-tours-rome', 'best-skip-the-line-tickets-rome', 'rome-3-day-itinerary', 'best-time-to-visit-rome'],
  },
  {
    ...R, slug: 'vatican-museums-visiting-guide-rome', title: 'Vatican Museums: A Practical Visiting Guide',
    seoTitle: 'Vatican Museums Visiting Guide: Tickets, Free Sunday, Dress Code and Crowds',
    description: 'How to visit the Vatican Museums and the Sistine Chapel: ticket and booking fee, the free last Sunday, dress code, opening days and how to avoid the crowds.',
    intro: [
      'The Vatican Museums are among the biggest museum complexes in the world, and the route ends at the Sistine Chapel. Most of the difficulty is practical: timed entry, a strict dress code and heavy crowds. Sorting those out in advance makes the visit far easier.',
    ],
    sections: [
      { h: 'Tickets and booking', p: [
        'The official full-price ticket is 20 euros. Booking online through the official site adds a booking fee of 5 euros, and it is worth paying because it lets you choose a time and skip the ticket queue. Reduced tickets exist for some visitors, and young children enter free. Check the official Vatican Museums site for the current prices before you buy.',
      ] },
      { h: 'The free last Sunday', p: [
        'On the last Sunday of each month the museums are free, from 9 in the morning to 2 in the afternoon, with last entry at 12:30. It is tempting, but it is also the most crowded day of the month, and queues of several hours are common. Unless the price matters most, a paid visit on a weekday is a much better experience.',
      ] },
      { h: 'Dress code', p: [
        'Shoulders and knees must be covered for the museums and for St. Peter\'s Basilica. In summer, carry a light scarf or cover-up. Large bags and backpacks are not allowed in and must be left at the cloakroom.',
      ] },
      { h: 'Opening days', p: [
        'The museums are normally closed on Sundays except the free last Sunday, and on several religious holidays. Check the official calendar for your dates before you plan the day.',
      ] },
      { h: 'Avoiding the crowds', p: [
        'Choose the first slot of the day or an early-entry option, and go on a weekday. Many visitors head to the Sistine Chapel first, so a guide who takes a different route through the museums can reach it later when it is calmer. St. Peter\'s Basilica is free to enter but has its own security queue, and it is quietest in the early morning.',
      ] },
    ],
    choose: [
      'Book a timed slot online rather than queuing on the day.',
      'Dress with covered shoulders and knees.',
      'Avoid the free last Sunday unless you accept very long queues.',
      'Decide whether you want St. Peter\'s Basilica on the same day, and check the tour includes it.',
    ],
    faqs: [
      { q: 'How much are Vatican Museums tickets?', a: 'The official full price is 20 euros, plus a 5 euro online booking fee. Check the official site for current prices.' },
      { q: 'When are the Vatican Museums free?', a: 'On the last Sunday of each month, from 9 to 2, with last entry at 12:30. It is the busiest day, so many visitors avoid it.' },
      { q: 'What should I wear to the Vatican?', a: 'Cover your shoulders and knees. Bring a light scarf in summer.' },
      { q: 'Is St. Peter\'s Basilica included in the museums ticket?', a: 'Entry to the basilica is free but separate. Many guided tours include it, and the tour page states which.' },
    ],
    terms: ['vatican', 'sistine'], related: ['best-vatican-tours-rome', 'best-st-peters-basilica-tours-rome', 'rome-3-day-itinerary', 'best-skip-the-line-tickets-rome'],
  },
  {
    ...R, slug: 'pantheon-rome-visiting-guide', title: 'Pantheon Rome: Tickets and Visiting Guide',
    seoTitle: 'Pantheon Rome Tickets and Visiting Guide: Entry Fee, Free Days and Hours',
    description: 'Visiting the Pantheon in Rome: the paid entry since 2023, who enters free, the first-Sunday rule, opening hours and what to look for inside.',
    intro: [
      'The Pantheon is one of the best-preserved buildings of ancient Rome and still an active church. Entry has been ticketed since July 2023, so you can no longer simply walk in. A few details about tickets and free days are worth knowing before you go.',
    ],
    sections: [
      { h: 'Tickets and free entry', p: [
        'Entry has been paid since 3 July 2023. The price has changed since then, and the Ministry of Culture notes a revised fee from July 2026, so check the official page for the current amount. Entry is free for under-18s, Rome residents and on the first Sunday of each month, and worshippers attending services also enter free.',
        'Tickets are personal. The name on the ticket must match your ID at the entrance or you can be refused. You can buy online through the national museums platform or at the ticket desk in front of the monument.',
      ] },
      { h: 'Opening hours and closures', p: [
        'The Pantheon is generally open from 9 in the morning to the early evening, with last entry shortly before closing. It is closed on 1 January, 15 August and 25 December, and hours can change around religious services, so check the official site for your date.',
      ] },
      { h: 'What to look for', p: [
        'The dome was the largest in the world for centuries and still the largest unreinforced concrete dome. The opening at its top, the oculus, lets in light and, on a rainy day, rain, which drains through holes in the floor. Raphael is buried here, along with Italy\'s first kings. Look for the coffered ceiling and the sunbeam moving across the floor.',
      ] },
      { h: 'When to go', p: [
        'Early morning, or the last hour before closing, is the least crowded. Visit on a bright day, when the light from the oculus is the most striking.',
      ] },
    ],
    choose: [
      'Book a timed ticket if your dates are busy, and carry your ID.',
      'Use the first Sunday of the month only if you accept queues.',
      'Combine the Pantheon with Piazza Navona and the Trevi Fountain on foot.',
    ],
    faqs: [
      { q: 'Is the Pantheon free?', a: 'Not for most visitors. Entry is free for under-18s, Rome residents, worshippers at services and on the first Sunday of each month.' },
      { q: 'How much is Pantheon entry?', a: 'The fee has been revised since entry became paid in July 2023, so check the official Pantheon page for the current amount.' },
      { q: 'Do I need to book the Pantheon in advance?', a: 'It is recommended for busy periods. Tickets are nominal and must match the ID you carry.' },
      { q: 'How long does a Pantheon visit take?', a: 'Plan around 30 to 45 minutes inside, longer with a guide.' },
    ],
    terms: ['pantheon'], related: ['best-pantheon-trevi-and-piazza-navona-tours', 'trevi-fountain-rome-guide', 'rome-3-day-itinerary', 'best-walking-tours-rome'],
  },
  {
    ...R, slug: 'rome-airport-to-city-centre-guide', title: 'Rome Airport to the City Centre',
    seoTitle: 'Rome Airport to City Centre: Leonardo Express, Taxi and Private Transfer',
    description: 'How to get from Fiumicino and Ciampino to central Rome: the Leonardo Express train, taxis, private transfers and what each costs and takes.',
    intro: [
      'Rome has two airports, Fiumicino (FCO) and Ciampino (CIA). Fiumicino is the main international airport and has a direct train into the city. The right option depends on your arrival time, your luggage and how much hassle you want.',
    ],
    sections: [
      { h: 'Leonardo Express train from Fiumicino', p: [
        'The Leonardo Express runs non-stop between Fiumicino and Rome Termini in about 32 minutes, with a train roughly every 15 minutes. A single ticket is 14 euros according to Trenitalia, and a group fare for four people together is cheaper per person. It is a separate ticket from the city transport passes, which are not valid on it. It is the most predictable option for a daytime arrival.',
      ] },
      { h: 'Taxi', p: [
        'Rome has a regulated fixed fare for official taxis between the airports and the centre. Use the official white taxis at the rank outside arrivals, ask the driver to confirm the fixed fare before you set off, and avoid anyone who approaches you inside the terminal. Taking a taxi flagged on the street or unofficial drivers is the classic Rome scam.',
      ] },
      { h: 'Private transfer', p: [
        'A pre-booked private transfer gives you a fixed price and a driver waiting at arrivals, tracking your flight if it is delayed. It costs more than the train but suits families, heavy luggage and late-night arrivals. Share your flight number when you book.',
      ] },
      { h: 'Ciampino', p: [
        'Ciampino is smaller and serves many budget airlines, south-east of the city. Shuttle buses link it to Termini, and taxis and private transfers also run. Allow extra time, as the road into the city can be slow.',
      ] },
    ],
    choose: [
      'Take the Leonardo Express for a simple daytime arrival at Termini.',
      'Pre-book a transfer for late arrivals, families or heavy luggage.',
      'Use only official taxis from the rank, and confirm the fare first.',
      'Check the train timetable on the day, since service can be suspended on some dates.',
    ],
    faqs: [
      { q: 'How much is the Leonardo Express?', a: 'The ticket is 14 euros one way according to Trenitalia, and the journey takes about 32 minutes.' },
      { q: 'How far is Fiumicino from central Rome?', a: 'Around 30 to 60 minutes depending on the transport and the traffic.' },
      { q: 'Is a private airport transfer worth it?', a: 'It gives a fixed price and removes queues for taxis, especially after a late arrival.' },
      { q: 'Are city transport passes valid on the Leonardo Express?', a: 'No. It needs its own ticket.' },
    ],
    terms: ['transfer', 'airport', 'driver', 'shuttle'], related: ['best-airport-transfers-and-private-driver-rome', 'getting-around-rome-guide', 'where-to-stay-in-rome', 'best-cruise-shore-excursions-rome-civitavecchia'],
  },
  {
    ...R, slug: 'getting-around-rome-guide', title: 'Getting Around Rome: Metro, Bus, Taxi and Walking',
    seoTitle: 'Getting Around Rome: Metro, Buses, Tickets and Passes Explained',
    description: 'How to get around Rome: the three metro lines, buses and trams, ticket and pass prices, taxis and when walking is quicker.',
    intro: [
      'The centre of Rome is compact enough to walk, and you will probably walk more than you expect. For longer links, such as the Vatican or the Appian Way, the metro, buses and taxis fill the gaps.',
    ],
    sections: [
      { h: 'Metro', p: [
        'Rome has three metro lines: A, B (with the B1 branch) and C. Line A runs by the Vatican area, the Spanish Steps and Termini, and line B serves the Colosseum. The metro is quick but covers little of the historic centre, because the ancient ground made digging difficult.',
      ] },
      { h: 'Tickets and passes', p: [
        'A single ticket (BIT) costs 1.50 euros and is valid for 100 minutes, with unlimited buses and trams and one metro entry, though a rise has been planned, so check the machine or the ATAC app. A 24-hour pass is 8.50 euros, 48 hours is 15, 72 hours is 22 and a 7-day pass is 29, according to the transport operator. Contactless card payment at the gates works on the metro, and the fare caps at the day pass if you tap many times in a day.',
        'The 72-hour transport ticket is not the same as a sightseeing card. Sightseeing cards bundle museum entries, so work out whether you will use enough of them before you buy one.',
      ] },
      { h: 'Buses and trams', p: [
        'Buses reach places the metro does not, but they can be slow and crowded. The bus between Termini and St. Peter\'s is popular with pickpockets, so keep your bag in front of you.',
      ] },
      { h: 'Taxis', p: [
        'Use official white taxis from a rank or booked by phone or app. Do not flag taxis on the street, and agree the fare for airport trips before you start.',
      ] },
      { h: 'Walking', p: [
        'Between the Pantheon, Piazza Navona, the Trevi Fountain and the Spanish Steps, walking is quicker than any transport. Wear comfortable shoes, since the cobblestones and hills are hard on feet.',
      ] },
    ],
    choose: [
      'Walk within the historic centre and use the metro for longer links.',
      'Buy a day pass only if you expect several rides.',
      'Use official taxis only, from a rank or an app.',
      'Keep bags closed and in front of you on buses and metro line A.',
    ],
    faqs: [
      { q: 'How much is a Rome metro ticket?', a: 'A single BIT ticket is 1.50 euros and valid for 100 minutes, though check for any fare change. Day and multi-day passes cost more.' },
      { q: 'Is the Rome metro good for sightseeing?', a: 'It helps for the Vatican, Termini and the Colosseum, but it misses most of the historic centre, which is best on foot.' },
      { q: 'Can I pay by contactless card on the metro?', a: 'Yes, contactless payment works at the gates. Check the current rules on the transport operator site.' },
      { q: 'Are Rome taxis safe?', a: 'Official white taxis are. Use a rank or an app and avoid unofficial drivers.' },
    ],
    terms: [], related: ['rome-airport-to-city-centre-guide', 'rome-3-day-itinerary', 'is-rome-safe-scams-and-pickpockets', 'where-to-stay-in-rome'],
  },
  {
    ...R, slug: 'is-rome-safe-scams-and-pickpockets', title: 'Is Rome Safe? Scams and Pickpockets to Know',
    seoTitle: 'Is Rome Safe for Tourists? Pickpockets, Scams and Practical Tips',
    description: 'Is Rome safe? Where pickpockets operate, the common scams around taxis and restaurants, and simple habits that keep your trip trouble-free.',
    intro: [
      'Rome is generally a safe city for visitors. Violent crime against tourists is rare. The real risk is petty theft: pickpocketing is a long-standing problem in crowded places and on public transport, and a few well-known scams target new arrivals.',
      'Most of it is avoidable with ordinary habits.',
    ],
    sections: [
      { h: 'Where pickpockets operate', p: [
        'Crowded tourist sites and transport are the usual spots. Termini station and the area around it are heavily trafficked and a known hotspot. Metro line A, especially between the Vatican and Termini, and bus 64 between Termini and St. Peter\'s are frequently named as the busiest routes for theft. The Trevi Fountain, the Colosseum and the Spanish Steps also draw crowds that suit pickpockets.',
      ] },
      { h: 'How they work', p: [
        'The most common method is distraction: someone bumps you, asks for help with a map or holds up a petition while a second person takes your phone or wallet. Do not stop to study a map or phone in a crowd, and do not carry large amounts of cash.',
      ] },
      { h: 'Taxi and restaurant scams', p: [
        'Unofficial taxis are a known issue. Use official white Roma taxis from a rank and avoid anyone offering a ride in the terminal. In tourist-heavy streets, restaurants sometimes upsell, so check the menu prices and ask about the cover charge before you sit down.',
      ] },
      { h: 'Simple habits that work', p: [
        'Wear your bag across your body and keep it in front of you. Keep your phone in an inside pocket in crowds. Carry one card and a little cash, and leave the rest in the hotel safe. Be extra alert at transport hubs and on crowded buses.',
      ] },
    ],
    choose: [
      'Carry only what you need, with your bag zipped and in front of you.',
      'Use official taxis from ranks or an app.',
      'Check prices and the cover charge before sitting down to eat in tourist areas.',
      'Stay alert at Termini, on line A and on the busiest buses.',
    ],
    faqs: [
      { q: 'Is Rome safe for tourists?', a: 'Yes, in general. Petty theft is the main concern, not violent crime.' },
      { q: 'Where are pickpockets worst in Rome?', a: 'Termini, metro line A, the Termini to St. Peter\'s bus and the busiest sights such as the Trevi Fountain.' },
      { q: 'Is Rome safe at night?', a: 'The central areas are lively and generally fine in the evening. Use the same care you would in any big city, and pay attention around transport hubs.' },
      { q: 'How do I avoid taxi scams in Rome?', a: 'Use official white taxis from a rank, confirm the fare first, and avoid drivers who approach you inside the terminal.' },
    ],
    terms: [], related: ['getting-around-rome-guide', 'where-to-stay-in-rome', 'trevi-fountain-rome-guide', 'best-tours-in-rome'],
  },
];
