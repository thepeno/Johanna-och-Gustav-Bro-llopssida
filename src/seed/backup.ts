// Dump the raw content (pages, media, site settings, RSVPs) to backups/ before an
// operation that rewrites stored data. backups/ is git-ignored: it holds guest data.
// Run: npx tsx --env-file=.env src/seed/backup.ts <label>
import fs from 'fs/promises'
import path from 'path'
import { getPayload } from 'payload'
import config from '../payload.config'

const label = process.argv[2] || 'manual'
const payload = await getPayload({ config })

const dump: Record<string, unknown> = {}
for (const slug of ['pages', 'media', 'rsvps'] as const) {
  dump[slug] = await payload.db.collections[slug].find({}).lean()
}
dump.globals = await payload.db.globals.find({}).lean()

const root = path.resolve(process.cwd(), 'backups')
await fs.mkdir(root, { recursive: true })
const file = path.join(root, `${new Date().toISOString().slice(0, 10)}-${label}.json`)
await fs.writeFile(file, JSON.stringify(dump, null, 2))
console.log(`Backed up ${Object.entries(dump).map(([k, v]) => `${(v as unknown[]).length} ${k}`).join(', ')} to ${file}`)
process.exit(0)
