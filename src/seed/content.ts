// Demo content in Swedish for Johanna & Gustav. Everything here is editable in
// /admin afterwards; the seed only gives editors a complete page to start from.

type RichText = { root: { type: string; children: unknown[]; direction: 'ltr'; format: ''; indent: 0; version: 1 }; [k: string]: unknown }

export const rich = (...paragraphs: string[]): RichText => ({
  root: {
    type: 'root',
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
    children: paragraphs.map((text) => ({
      type: 'paragraph',
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
      textFormat: 0,
      textStyle: '',
      children: [{ type: 'text', text, detail: 0, format: 0, mode: 'normal', style: '', version: 1 }],
    })),
  },
})

export const siteSettings = {
  partnerOne: 'Johanna',
  partnerTwo: 'Gustav',
  weddingDate: '2027-06-19T12:00:00.000Z', // 14:00 Swedish summer time
  locale: 'sv-SE' as const,
  venueShort: 'Ekebyhovs slott, Ekerö',
  hashtag: '#johannaochgustav',
  contactEmail: 'brollop@example.com',
  footerNote: 'Vi längtar tills vi får fira med er.',
  countdownLabels: { days: 'dagar', hours: 'timmar', minutes: 'minuter', seconds: 'sekunder' },
}

export const images = {
  hero: { width: 2000, height: 1333, palette: 'dusk', alt: 'Johanna och Gustav på en äng i kvällsljus' },
  storyOne: { width: 1200, height: 1500, palette: 'cocoa', alt: 'Johanna och Gustav vid köksbordet' },
  storyTwo: { width: 900, height: 1200, palette: 'linen', alt: 'Händer med förlovningsring' },
  venue: { width: 1200, height: 1500, palette: 'moss', alt: 'Ekebyhovs slott sett från parken' },
  hotel: { width: 1200, height: 1500, palette: 'stone', alt: 'Hotellrum med utsikt över Mälaren' },
  g1: { width: 1200, height: 1500, palette: 'blush', alt: 'Porträtt i motljus' },
  g2: { width: 1200, height: 900, palette: 'moss', alt: 'Promenad genom skogen' },
  g3: { width: 1200, height: 1500, palette: 'dusk', alt: 'Skratt på bryggan' },
  g4: { width: 1200, height: 1200, palette: 'linen', alt: 'Detalj av bukett' },
  g5: { width: 1200, height: 1500, palette: 'cocoa', alt: 'Dans i köket' },
  g6: { width: 1200, height: 900, palette: 'stone', alt: 'Solnedgång över Mälaren' },
} as const

export type ImageKey = keyof typeof images

export const layout = (img: Record<ImageKey, string>) => [
  {
    blockType: 'hero',
    anchor: 'start',
    theme: 'espresso',
    image: img.hero,
    eyebrow: 'Vi gifter oss',
    showCountdown: true,
    showScrollHint: true,
    ctaLabel: 'OSA senast 30 april',
    ctaAnchor: 'osa',
  },
  {
    blockType: 'story',
    anchor: 'var-historia',
    navLabel: 'Vår historia',
    theme: 'espresso',
    label: '01 — Vår historia',
    heading: 'Från en kaffe på Söder till ett ja på Fårö',
    body: rich(
      'Det började med en kopp kaffe som blev tre, en septemberkväll 2018 på Hornsgatan. Johanna var sen, Gustav hade redan beställt fel, och ändå gick vi därifrån med känslan av att något precis hade börjat.',
      'Sedan dess har vi hunnit med en lägenhet med lutande golv, en hund som heter Majken, alldeles för många långa promenader och en förlovning på en klippa i blåsten. Nu vill vi fira allt det, och det som kommer, tillsammans med er.',
    ),
    image: img.storyOne,
    imageSecondary: img.storyTwo,
    milestones: [
      { date: 'September 2018', title: 'Första kaffet', text: 'Hornsgatan, regn, tre koppar och en bortglömd paraply.' },
      { date: 'Maj 2021', title: 'Nycklar till Midsommarkransen', text: 'Vårt första gemensamma hem, med utsikt över en parkeringsplats och ett körsbärsträd.' },
      { date: 'Augusti 2025', title: 'Frågan på Fårö', text: 'En solnedgång, en ring som nästan blåste bort och ett väldigt snabbt ja.' },
    ],
  },
  {
    blockType: 'schedule',
    anchor: 'dagen',
    navLabel: 'Dagen',
    theme: 'ivory',
    label: '02 — Lördagen den 19 juni',
    heading: 'Så här ser dagen ut',
    intro: 'Allt sker på Ekebyhovs slott och i Ekerö kyrka, med några minuters promenad emellan. Tiderna är ungefärliga, utom vigseln.',
    events: [
      { time: '14.00', title: 'Vigsel', location: 'Ekerö kyrka', description: 'Var gärna på plats kvart i två. Ceremonin tar ungefär 45 minuter.' },
      { time: '15.00', title: 'Brudskål & mingel', location: 'Slottsparken', description: 'Bubbel, tilltugg och krocket på gräsmattan om vädret tillåter.' },
      { time: '17.30', title: 'Middag', location: 'Orangeriet', description: 'Tre rätter, tal och förhoppningsvis en och annan sång.' },
      { time: '21.30', title: 'Första dansen', location: 'Stora salen', description: 'Därefter öppnar baren och dansgolvet.' },
      { time: '01.00', title: 'Nattamat & godnatt', location: 'Stora salen', description: 'Bussar går till hotellen 01.15 och 02.00.' },
    ],
  },
  {
    blockType: 'details',
    anchor: 'bra-att-veta',
    navLabel: 'Bra att veta',
    theme: 'olive',
    label: '03 — Praktiskt',
    heading: 'Bra att veta',
    intro: 'Det viktigaste om plats, resa, boende och klädsel. Saknar du något, hör av dig.',
    cards: [
      {
        title: 'Platsen',
        image: img.venue,
        body: rich('Ekebyhovs slott ligger på Ekerö, cirka 30 minuter från Stockholm city. Vigseln hålls i Ekerö kyrka, fem minuters promenad från slottet.'),
        linkLabel: 'Visa på karta',
        linkUrl: 'https://maps.google.com/?q=Ekebyhovs+slott',
      },
      {
        title: 'Ta dig hit',
        body: rich('Buss 176 och 177 från Brommaplan stannar vid Ekebyhov. Kommer du med bil finns parkering vid slottet. Efter festen går bussar till hotellen och till Brommaplan.'),
        linkLabel: 'Res med SL',
        linkUrl: 'https://sl.se',
      },
      {
        title: 'Boende',
        image: img.hotel,
        body: rich('Vi har reserverat rum på Ekerö Hotell till 15 maj. Uppge "Johanna & Gustav" när du bokar så får du vårt pris. I Stockholm finns gott om alternativ nära Brommaplan.'),
        linkLabel: 'Boka rum',
        linkUrl: 'https://example.com',
      },
      {
        title: 'Klädkod',
        body: rich('Kavaj. Det betyder mörk kostym eller festklänning, kort eller lång. Parken har grus och gräs, så tänk på skorna.'),
      },
      {
        title: 'Gåvor',
        body: rich('Er närvaro är den största gåvan. Vill ni ändå ge något blir vi glada för ett bidrag till vår bröllopsresa till Japan. Swish finns hos toastmasters under kvällen.'),
      },
      {
        title: 'Barn',
        body: rich('Vi älskar era barn, men den här kvällen hoppas vi att ni kan få en kväll för er själva. Ammande bebisar är såklart välkomna.'),
      },
    ],
  },
  {
    blockType: 'gallery',
    anchor: 'bilder',
    navLabel: 'Bilder',
    theme: 'ivory',
    label: '04 — Några ögonblick',
    heading: 'Bilder',
    intro: 'Ett urval från åren som gått. Fler kommer efter bröllopet, under samma hashtag.',
    images: [
      { image: img.g1, caption: 'Fårö, 2025' },
      { image: img.g2, caption: 'Tyresta, 2022' },
      { image: img.g3, caption: 'Sandhamn, 2023' },
      { image: img.g4 },
      { image: img.g5, caption: 'Midsommarkransen, 2021' },
      { image: img.g6, caption: 'Ekerö, 2026' },
    ],
  },
  {
    blockType: 'rsvp',
    anchor: 'osa',
    navLabel: 'OSA',
    theme: 'espresso',
    label: '05 — OSA',
    heading: 'Kommer du?',
    intro: rich('Svara gärna så snart du kan, och senast den 30 april. Har du frågor om maten, resan eller något annat, skriv det i meddelandet så hör vi av oss.'),
    deadline: '2027-04-30T12:00:00.000Z',
    maxPartySize: 2,
    askDietary: true,
    askSong: true,
    askMessage: true,
    successMessage: 'Tack för ditt svar! Vi hör av oss om vi undrar något, annars ses vi den 19 juni.',
    closedMessage: 'Sista svarsdag har passerat. Hör av dig direkt till oss om något ändrats.',
  },
  {
    blockType: 'faq',
    anchor: 'fragor',
    navLabel: 'Frågor',
    theme: 'ivory',
    label: '06 — Frågor & svar',
    heading: 'Vanliga frågor',
    items: [
      { question: 'Får jag ta med en plus one?', answer: rich('Om det står två namn på inbjudan, ja. Annars hoppas vi att du kommer själv, vi lovar att du kommer känna många.') },
      { question: 'Kan jag fotografera under vigseln?', answer: rich('Vi har en fotograf på plats och vill helst se era ansikten, inte era telefoner, under ceremonin. Under resten av dagen får ni fota hur mycket ni vill.') },
      { question: 'Vad gör jag om jag vill hålla tal?', answer: rich('Hör av dig till våra toastmasters Elin och Marcus på tal@example.com senast 1 juni. Håll det gärna under fem minuter.') },
      { question: 'Finns det vegetariska och veganska alternativ?', answer: rich('Självklart. Ange det i OSA-formuläret så ordnar köket resten.') },
      { question: 'Hur tar jag mig hem efter festen?', answer: rich('Bussar går från slottet till hotellen och Brommaplan klockan 01.15 och 02.00. Taxi tar cirka 30 minuter in till stan.') },
    ],
  },
]
