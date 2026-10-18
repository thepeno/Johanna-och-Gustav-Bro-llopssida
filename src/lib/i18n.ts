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

const asLocale = (locale?: string | null): Locale => (locale && locale in ui ? locale : 'sv-SE') as Locale

export const t = (locale?: string | null): Ui => ui[asLocale(locale)]

// Confirmation sent to the guest right after they reply (plain text).
type RsvpEmailVars = { name: string; attending: boolean; couple: string; date: string; contact?: string | null }
const rsvpEmail: Record<Locale, (v: RsvpEmailVars) => { subject: string; text: string }> = {
  'sv-SE': ({ name, attending, couple, date, contact }) => ({
    subject: `Tack för ditt svar – ${couple}`,
    text: [
      `Hej ${name}!`,
      '',
      attending
        ? `Vad roligt att du kommer! Vi ses ${date}.`
        : `Tack för att du hörde av dig. Vi kommer att sakna dig ${date}.`,
      '',
      contact ? `Behöver du ändra något? Mejla oss på ${contact}.` : 'Behöver du ändra något? Svara på det här mejlet.',
      '',
      `Varma hälsningar,`,
      couple,
    ].join('\n'),
  }),
  'en-GB': ({ name, attending, couple, date, contact }) => ({
    subject: `Thank you for your reply – ${couple}`,
    text: [
      `Hi ${name}!`,
      '',
      attending
        ? `We're so glad you can make it! See you on ${date}.`
        : `Thank you for letting us know. We'll miss you on ${date}.`,
      '',
      contact ? `Need to change anything? Email us at ${contact}.` : 'Need to change anything? Just reply to this email.',
      '',
      'With love,',
      couple,
    ].join('\n'),
  }),
}

export const rsvpConfirmation = (locale: string | null | undefined, vars: RsvpEmailVars) =>
  rsvpEmail[asLocale(locale)](vars)
