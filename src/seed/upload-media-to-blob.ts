// One-off before the first Vercel deploy: copy the photos already in media/ (the
// original and every generated size) to Vercel Blob under the same names, so the
// Blob storage adapter finds them. Needs BLOB_READ_WRITE_TOKEN in .env.
// Run: npx tsx --env-file=.env src/seed/upload-media-to-blob.ts
import fs from 'fs/promises'
import path from 'path'
import { put } from '@vercel/blob'
import { getPayload } from 'payload'
import config from '../payload.config'

const token = process.env.BLOB_READ_WRITE_TOKEN
if (!token) throw new Error('Set BLOB_READ_WRITE_TOKEN in .env (Vercel → Storage → your Blob store → .env.local tab)')

const payload = await getPayload({ config })
const { docs } = await payload.find({ collection: 'media', limit: 0, pagination: false, depth: 0 })

let uploaded = 0
const missing: string[] = []
for (const doc of docs) {
  const names = [doc.filename, ...Object.values(doc.sizes ?? {}).map((s) => s?.filename)].filter((n): n is string => Boolean(n))
  for (const name of names) {
    const file = path.resolve(process.cwd(), 'media', name)
    const data = await fs.readFile(file).catch(() => null)
    if (!data) {
      missing.push(name)
      continue
    }
    await put(name, data, { access: 'public', addRandomSuffix: false, allowOverwrite: true, contentType: doc.mimeType ?? undefined, token })
    uploaded++
  }
}

console.log(`Uploaded ${uploaded} files to Vercel Blob.${missing.length ? ` Not found in media/: ${missing.join(', ')}` : ''}`)
process.exit(0)
