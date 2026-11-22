// English for every Swedish text on the site, keyed by the Swedish text itself.
// applyEnglish() writes the English locale for whatever matches; anything not
// listed stays empty in English and falls back to Swedish on the site.
// Run: npx tsx --env-file=.env src/seed/translate.ts
import type { Payload } from 'payload'
import { HOME_SLUG } from '@/collections/Pages'
import { mapLocalized } from './localized'

export const english: Record<string, string> = {
  // The invitation card (hero), line breaks as on the card
  'Har nöjet att bjuda in er\nför att fira vår bröllopsdag\n\nLördag den 14 augusti\n\nKlockan ett\n\nVid Förkärla kyrka\n\nBlekinge\n\nSenare utlovas brakfest och\nmassor av kärlek på Agdatorps gård':
    'Have the pleasure of inviting you\nto celebrate our wedding day\n\nSaturday 14 August\n\nAt one o’clock\n\nAt Förkärla Church\n\nBlekinge\n\nLater, a big party and\nlots of love at Agdatorps gård',
  'Klädsel:\nMörk kostym': 'Dress code:\nDark suit',
  'OSA senast 15 juni': 'RSVP by 15 June',
  'OSA': 'RSVP',

  // Schedule
  'Klockan 13.00': 'At 1 pm',
  'Efter vigseln': 'After the ceremony',
  'Vigsel': 'Ceremony',
  'Fest': 'Party',
  'Förkärla kyrka': 'Förkärla Church',
  // Names that stay the same, listed so required fields have an English value
  'Agdatorps gård': 'Agdatorps gård',
  Blekinge: 'Blekinge',

  // RSVP page
  'Tack för ditt svar! Vi ses den 14 augusti.': 'Thank you for your reply! See you on 14 August.',
  'Sista svarsdag har passerat. Hör av dig direkt till oss om något ändrats.':
    'The reply deadline has passed. Please get in touch with us directly if anything has changed.',
  'Svara gärna så snart du kan.': 'Please reply as soon as you can.',

  // Travel
  'Resa och boende': 'Travel and accommodation',
  'Vi återkommer med tips om hur ni tar er hit och var ni kan bo i närheten.':
    'We’ll be in touch with tips on how to get here and where to stay nearby.',

  // Wish list
  'Önskelista': 'Wish list',
  'Det finaste ni kan ge oss är att komma och fira med oss. Vill ni ändå ge något, lägger vi upp en önskelista här längre fram.':
    'The best gift you can give us is to come and celebrate with us. If you’d still like to give something, we’ll put a wish list here later on.',

  // Page title and description for link previews
  'Johanna & Gustav gifter sig 14 augusti 2027': 'Johanna & Gustav are getting married on 14 August 2027',
  'Lördag 14 augusti 2027 på Agdatorps gård i Blekinge. Tider, resa och OSA.':
    'Saturday 14 August 2027 at Agdatorps gård in Blekinge. Times, travel and RSVP.',

  // Site settings
  'Förkärla kyrka, Blekinge': 'Förkärla Church, Blekinge',
  'Vi ser fram emot att fira med er!': 'We look forward to celebrating with you!',
  dagar: 'days',
  timmar: 'hours',
  minuter: 'minutes',
  sekunder: 'seconds',

  // Photo descriptions
  'Johanna och Gustav': 'Johanna and Gustav',
  'vi två': 'the two of us',
  'j&g': 'j&g',
}

type Node = { type?: string; text?: string; children?: Node[] }

// Plain text is looked up whole; rich text is translated node by node, and only
// if every text node has a translation (otherwise it falls back to Swedish).
const translate = (value: unknown): unknown => {
  if (typeof value === 'string') return english[value] ?? null
  if (value && typeof value === 'object' && 'root' in value) {
    let complete = true
    const walk = (node: Node): Node => ({
      ...node,
      ...(node.type === 'text' && typeof node.text === 'string'
        ? { text: english[node.text] ?? ((complete = false), node.text) }
        : {}),
      ...(node.children ? { children: node.children.map(walk) } : {}),
    })
    const out = { ...(value as object), root: walk((value as { root: Node }).root) }
    return complete ? out : null
  }
  return null
}

export async function applyEnglish(payload: Payload) {
  const context = { disableRevalidate: true }
  const pageFields = payload.collections.pages.config.flattenedFields as never

  const { docs } = await payload.find({ collection: 'pages', where: { slug: { equals: HOME_SLUG } }, locale: 'sv', depth: 0, limit: 1 })
  const page = docs[0]
  if (page) {
    const en = mapLocalized(pageFields, { layout: page.layout, meta: page.meta }, translate) as Record<string, never>
    await payload.update({ collection: 'pages', id: page.id, locale: 'en', data: en, context })
  }

  const settings = await payload.findGlobal({ slug: 'site-settings', locale: 'sv', depth: 0 })
  const settingsFields = payload.config.globals.find((g) => g.slug === 'site-settings')!.flattenedFields as never
  const { venueShort, footerNote, countdownLabels } = mapLocalized(settingsFields, settings, translate) as typeof settings
  await payload.updateGlobal({ slug: 'site-settings', locale: 'en', data: { venueShort, footerNote, countdownLabels }, context })

  const media = await payload.find({ collection: 'media', locale: 'sv', depth: 0, limit: 0, pagination: false })
  for (const doc of media.docs) {
    const alt = english[doc.alt]
    if (alt) await payload.update({ collection: 'media', id: doc.id, locale: 'en', data: { alt }, context })
  }
}
