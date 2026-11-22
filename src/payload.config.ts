import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { resendAdapter } from '@payloadcms/email-resend'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Rsvps } from './collections/Rsvps'
import { SiteSettings } from './globals/SiteSettings'

const dirname = path.dirname(fileURLToPath(import.meta.url))

// Resend in production; without a key Payload falls back to its console adapter,
// so local dev logs emails instead of sending them.
const email = process.env.RESEND_API_KEY
  ? resendAdapter({
      apiKey: process.env.RESEND_API_KEY,
      defaultFromAddress: process.env.EMAIL_FROM_ADDRESS || 'noreply@example.com',
      defaultFromName: process.env.EMAIL_FROM_NAME || 'Johanna & Gustav',
    })
  : undefined

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: { titleSuffix: ' · Bröllopssida' },
  },
  collections: [Pages, Rsvps, Media, Users],
  globals: [SiteSettings],
  editor: lexicalEditor(),
  // Swedish first; English for guests who don't speak Swedish. Anything not yet
  // translated falls back to the Swedish text.
  localization: {
    locales: [
      { code: 'sv', label: 'Svenska' },
      { code: 'en', label: 'English' },
    ],
    defaultLocale: 'sv',
    fallback: true,
  },
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  db: mongooseAdapter({ url: process.env.DATABASE_URL || '' }),
  email,
  sharp,
  plugins: [
    // Photos go to Vercel Blob when its token is set (on Vercel, where the disk is
    // thrown away on every deploy). Locally they stay in media/. Files are still
    // served through /api/media/file/…, so URLs don't change between the two.
    vercelBlobStorage({
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      collections: { media: true },
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
})
