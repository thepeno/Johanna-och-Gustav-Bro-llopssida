// Content in Swedish for Johanna & Gustav, laid out section for section like
// Squarespace's Morais demo. Date and venue are real; times, texts and links
// are placeholders to edit in /admin.

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
  weddingDate: '2027-08-14T13:00:00.000Z', // 15:00 Swedish summer time
  locale: 'sv-SE' as const,
  venueShort: 'Agdatorps gård, Blekinge',
  hashtag: '#JG140827',
  contactEmail: 'brollop@example.com',
  footerNote: 'Vi ser fram emot att fira med er!',
  countdownLabels: { days: 'dagar', hours: 'timmar', minutes: 'minuter', seconds: 'sekunder' },
}

export const images = {
  hero: { width: 2000, height: 1333, palette: 'dusk', alt: 'Johanna och Gustav' },
} as const

export type ImageKey = keyof typeof images

export const layout = (img: Record<ImageKey, string>) => [
  // Save the date, headline, photo, date, paragraph
  {
    blockType: 'hero',
    anchor: 'start',
    theme: 'ivory',
    image: img.hero,
    eyebrow: 'Spara datumet',
    heading: 'Vi gifter oss!',
    tagline:
      'Bröllopet hålls lördagen den 14 augusti 2027 på Agdatorps gård i Blekinge. Vi börjar med vigsel och fortsätter sedan med middag och fest.',
    showCountdown: false,
    showScrollHint: false,
  },
  // Ceremony / Reception, then the reply button
  {
    blockType: 'schedule',
    anchor: 'dagen',
    theme: 'ivory',
    events: [
      { title: 'Vigsel', location: 'Agdatorps gård', description: 'Blekinge', time: '15.00 — 16.00' },
      { title: 'Fest', location: 'Agdatorps gård', description: 'Blekinge', time: '17.00 — 01.00' },
    ],
    ctaLabel: 'OSA',
    ctaAnchor: 'osa',
  },
  // The reply form (Morais links to a separate page; here it sits on the page)
  {
    blockType: 'rsvp',
    anchor: 'osa',
    navLabel: 'OSA',
    theme: 'espresso',
    heading: 'OSA',
    intro: rich('Svara gärna så snart du kan.'),
    deadline: '2027-06-15T12:00:00.000Z',
    maxPartySize: 2,
    askDietary: true,
    askSong: false,
    askMessage: true,
    successMessage: 'Tack för ditt svar! Vi ses den 14 augusti.',
    closedMessage: 'Sista svarsdag har passerat. Hör av dig direkt till oss om något ändrats.',
  },
  // Travel: a cream panel on white
  {
    blockType: 'details',
    anchor: 'resa',
    theme: 'olive',
    heading: 'Resa och boende',
    intro: 'Agdatorps gård ligger i Blekinge. Vi återkommer med tips om hur ni tar er hit och var ni kan bo i närheten.',
    cards: [{ title: 'Agdatorps gård', body: rich('Blekinge'), linkUrl: 'https://www.google.com/maps/search/?api=1&query=Agdatorps+g%C3%A5rd+Blekinge' }],
  },
  // Registry
  {
    blockType: 'text',
    anchor: 'onskelista',
    theme: 'espresso',
    label: 'Önskelista',
    text: 'Det finaste ni kan ge oss är att komma och fira med oss. Vill ni ändå ge något, lägger vi upp en önskelista här längre fram.',
  },
]
