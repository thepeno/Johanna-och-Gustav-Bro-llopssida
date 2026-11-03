// One-off: copy the invitation card's facts and copy from seed/content.ts into the
// live content (Site settings, and the home page's hero, schedule, details and RSVP
// intro). Only those fields change; the photo and everything else stay.
// Run: npx tsx --env-file=.env src/seed/apply-card.ts
import { getPayload } from 'payload'
import config from '../payload.config'
import { layout as seedLayout, siteSettings } from './content'

const payload = await getPayload({ config })
const context = { disableRevalidate: true }

await payload.updateGlobal({
  slug: 'site-settings',
  data: {
    partnerOne: siteSettings.partnerOne,
    partnerTwo: siteSettings.partnerTwo,
    weddingDate: siteSettings.weddingDate,
    venueShort: siteSettings.venueShort,
    hashtag: siteSettings.hashtag,
    contactEmail: siteSettings.contactEmail,
  },
  context,
})

const { docs } = await payload.find({ collection: 'pages', where: { slug: { equals: 'home' } }, depth: 0 })
const page = docs[0]
if (!page) throw new Error('No home page')

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const seed = seedLayout({ hero: '' }) as any[]
const from = (type: string) => seed.find((b) => b.blockType === type)

const layout = page.layout.map((block) => {
  if (block.blockType === 'hero') {
    const h = from('hero')
    return { ...block, heading: null, tagline: h.tagline, cornerNote: h.cornerNote, ctaLabel: h.ctaLabel, ctaAnchor: h.ctaAnchor }
  }
  if (block.blockType === 'schedule') {
    const s = from('schedule')
    return { ...block, events: (block.events ?? []).map((e, i) => ({ ...e, ...s.events[i] })) }
  }
  if (block.blockType === 'details') {
    const d = from('details')
    // the schedule already says Blekinge, so the travel list is just the two places
    const cards = d.cards.map((c: { title: string }) => {
      const kept = (block.cards ?? []).find((k) => k.title === c.title)
      return { ...kept, ...c, body: null }
    })
    return { ...block, intro: d.intro, cards }
  }
  if (block.blockType === 'rsvp') {
    return { ...block, intro: null }
  }
  return block
})

await payload.update({ collection: 'pages', id: page.id, data: { layout }, context })
console.log('Updated Site settings and the home page from the invitation card.')
process.exit(0)
