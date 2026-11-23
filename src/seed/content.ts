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
  partnerOne: 'Gustav',
  partnerTwo: 'Johanna',
  weddingDate: '2027-08-14T11:00:00.000Z', // 13:00 Swedish summer time, "klockan ett" on the card
  locale: 'sv-SE' as const,
  venueShort: 'Förkärla kyrka, Blekinge',
  // No hashtag or contact email on the site, by the couple's choice
  hashtag: null,
  contactEmail: null,
  footerNote: 'Vi ser fram emot att fira med er!',
  countdownLabels: { days: 'dagar', hours: 'timmar', minutes: 'minuter', seconds: 'sekunder' },
}

export const images = {
  hero: { width: 2000, height: 1333, palette: 'dusk', alt: 'Johanna och Gustav' },
} as const

export type ImageKey = keyof typeof images

export const layout = (img: Record<ImageKey, string>) => [
  // The invitation card: sheep, names, the card's text line for line, corner notes
  {
    blockType: 'hero',
    anchor: 'start',
    theme: 'ivory',
    image: img.hero,
    tagline: [
      'Har nöjet att bjuda in er\nför att fira vår bröllopsdag',
      'Lördag den 14 augusti',
      'Klockan ett',
      'Vid Förkärla kyrka',
      'Blekinge',
      'Senare utlovas brakfest och\nmassor av kärlek på Agdatorps gård',
    ].join('\n\n'),
    cornerNote: 'Klädsel:\nMörk kostym',
    ctaLabel: 'OSA senast 15 juni',
    ctaAnchor: 'osa',
    showCountdown: false,
    showScrollHint: false,
  },
  // Ceremony / Reception, then the reply button
  {
    blockType: 'schedule',
    anchor: 'dagen',
    theme: 'ivory',
    events: [
      { title: 'Vigsel', location: 'Förkärla kyrka', description: 'Blekinge', time: 'Klockan 13.00' },
      { title: 'Fest', location: 'Agdatorps gård', description: 'Blekinge\nMer info kommer', time: 'Efter vigseln' },
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
    // No intro: the deadline line under the heading already asks guests to reply
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
    intro:
      'Vi har ordnat ett bröllopspris på Scandic Karlskrona: ange koden WEDDING10 när ni bokar. Vill ni hellre bo lite mer lantligt finns det fina Airbnb runt om i trakten.',
    cards: [
      { title: 'Förkärla kyrka', linkUrl: 'https://www.google.com/maps/search/?api=1&query=F%C3%B6rk%C3%A4rla+kyrka' },
      { title: 'Agdatorps gård', linkUrl: 'https://www.google.com/maps/search/?api=1&query=Agdatorps+g%C3%A5rd+Blekinge' },
    ],
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
