// One-off migration for turning on localization: existing values were stored as
// plain values, and localized fields are stored as { sv, en }. This wraps every
// localized value that isn't already wrapped as Swedish, straight in MongoDB.
// Back up first: npx tsx --env-file=.env src/seed/backup.ts pre-localization
// Run: npx tsx --env-file=.env src/seed/localize.ts [--dry]
import { getPayload } from 'payload'
import config from '../payload.config'
import { mapLocalized } from './localized'

const dry = process.argv.includes('--dry')
const payload = await getPayload({ config })
const locales = ['sv', 'en']
const wrapped = (v: unknown) =>
  !!v && typeof v === 'object' && !Array.isArray(v) && Object.keys(v).length > 0 && Object.keys(v).every((k) => locales.includes(k))

let changed = 0
const wrap = (value: unknown) => {
  if (value === null || wrapped(value)) return value
  changed++
  return { sv: value }
}

for (const slug of ['pages', 'media'] as const) {
  const model = payload.db.collections[slug]
  const fields = payload.collections[slug].config.flattenedFields as never
  for (const doc of await model.find({}).lean()) {
    const before = changed
    const next = mapLocalized(fields, doc, wrap)
    if (changed > before && !dry) await model.replaceOne({ _id: doc._id }, next as never)
  }
}

const settings = payload.config.globals.find((g) => g.slug === 'site-settings')!
const doc = await payload.db.globals.findOne({ globalType: 'site-settings' }).lean()
if (doc) {
  const before = changed
  const next = mapLocalized(settings.flattenedFields as never, doc, wrap)
  if (changed > before && !dry) await payload.db.globals.replaceOne({ _id: doc._id }, next as never)
}

console.log(`${dry ? 'Would wrap' : 'Wrapped'} ${changed} values as Swedish.`)
process.exit(0)
