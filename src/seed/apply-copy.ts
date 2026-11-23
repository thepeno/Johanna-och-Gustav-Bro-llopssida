// Copy text changes from seed/content.ts into the live page without touching
// anything else: the schedule events' descriptions (matched by title) and the
// travel section's intro, in Swedish, then rewrite English from english.ts.
// Run: npx tsx --env-file=.env src/seed/apply-copy.ts
import { getPayload } from 'payload'
import config from '../payload.config'
import { HOME_SLUG } from '@/collections/Pages'
import { layout as seedLayout } from './content'
import { applyEnglish } from './english'

const payload = await getPayload({ config })
const context = { disableRevalidate: true }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const seed = seedLayout({ hero: '' }) as any[]
const from = (type: string) => seed.find((b) => b.blockType === type)

const { docs } = await payload.find({ collection: 'pages', where: { slug: { equals: HOME_SLUG } }, locale: 'sv', depth: 0, limit: 1 })
const page = docs[0]
if (!page) throw new Error('No home page')

const layout = page.layout.map((block) => {
  if (block.blockType === 'schedule') {
    const events = from('schedule').events as { title: string; description?: string }[]
    return {
      ...block,
      events: (block.events ?? []).map((e) => {
        const s = events.find((x) => x.title === e.title)
        return s ? { ...e, description: s.description ?? e.description } : e
      }),
    }
  }
  if (block.blockType === 'details') return { ...block, intro: from('details').intro }
  return block
})

await payload.update({ collection: 'pages', id: page.id, locale: 'sv', data: { layout }, context })
await applyEnglish(payload)
console.log('Updated the schedule and travel texts in Swedish and English.')
process.exit(0)
