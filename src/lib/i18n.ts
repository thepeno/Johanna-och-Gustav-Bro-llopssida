// UI strings that are not editorial content (editors change content in the CMS;
// these follow Site settings → locale).
export const ui = {
  'sv-SE': {
    menu: 'Meny',
    close: 'Stäng',
    scroll: 'Scrolla',
    name: 'Namn',
    email: 'E-post',
    attending: 'Kommer du?',
    yes: 'Ja, jag kommer',
    no: 'Tyvärr, jag kan inte',
    partySize: 'Antal personer',
    guestNames: 'Namn på alla gäster i sällskapet',
    dietary: 'Allergier eller specialkost',
    song: 'En låt som får dig ut på dansgolvet',
    message: 'Hälsning till oss',
    send: 'Skicka svar',
    sending: 'Skickar…',
    deadline: 'Svara senast',
    optional: 'frivilligt',
    genericError: 'Något gick fel. Försök igen om en stund.',
    tooMany: 'För många försök. Vänta några minuter.',
    closed: 'Svarstiden har gått ut.',
    mapLink: 'Visa på karta',
  },
  'en-GB': {
    menu: 'Menu',
    close: 'Close',
    scroll: 'Scroll',
    name: 'Name',
    email: 'Email',
    attending: 'Will you be there?',
    yes: 'Yes, I will attend',
    no: "Sadly, I can't make it",
    partySize: 'Number of guests',
    guestNames: 'Names of everyone in your party',
    dietary: 'Allergies or dietary requirements',
    song: 'A song that gets you dancing',
    message: 'A note for us',
    send: 'Send reply',
    sending: 'Sending…',
    deadline: 'Reply by',
    optional: 'optional',
    genericError: 'Something went wrong. Please try again shortly.',
    tooMany: 'Too many attempts. Please wait a few minutes.',
    closed: 'Replies are closed.',
    mapLink: 'Open map',
  },
} as const

export type Locale = keyof typeof ui
export type Ui = (typeof ui)[Locale]

export const t = (locale?: string | null): Ui => ui[(locale && locale in ui ? locale : 'sv-SE') as Locale]
