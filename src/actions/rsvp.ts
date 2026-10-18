'use server'

import { createHash } from 'node:crypto'
import { headers } from 'next/headers'
import { z } from 'zod'
import { getHomePage, getPayloadClient, getSiteSettings } from '@/lib/data'
import { t } from '@/lib/i18n'
import { rsvpIsOpen } from '@/blocks/Rsvp/shared'

export type RsvpState =
  | { status: 'idle' }
  | { status: 'success'; message: string }
  | { status: 'error'; message: string; fieldErrors?: Record<string, string[] | undefined> }

const schema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.email().trim().max(200),
  attending: z.enum(['yes', 'no']),
  partySize: z.coerce.number().int().min(1).max(10).default(1),
  guestNames: z.string().trim().max(1000).optional(),
  dietary: z.string().trim().max(1000).optional(),
  song: z.string().trim().max(200).optional(),
  message: z.string().trim().max(2000).optional(),
  // Honeypot: real browsers leave it empty, bots fill it
  website: z.string().max(0).optional(),
})

// Tiny in-memory limiter (per server instance): 5 replies / 10 min / IP
const WINDOW_MS = 10 * 60_000
const LIMIT = 5
const hits = new Map<string, number[]>()
const tooMany = (key: string) => {
  const now = Date.now()
  const recent = (hits.get(key) ?? []).filter((ts) => now - ts < WINDOW_MS)
  recent.push(now)
  hits.set(key, recent)
  return recent.length > LIMIT
}

export async function submitRsvp(_prev: RsvpState, formData: FormData): Promise<RsvpState> {
  const settings = await getSiteSettings()
  const ui = t(settings?.locale)

  const raw = Object.fromEntries(formData.entries())
  const parsed = schema.safeParse(raw)
  if (!parsed.success) {
    return { status: 'error', message: ui.genericError, fieldErrors: z.flattenError(parsed.error).fieldErrors }
  }
  const data = parsed.data
  if (data.website) return { status: 'success', message: '' } // silently drop bots

  const page = await getHomePage()
  const block = page?.layout.find((b) => b.blockType === 'rsvp')
  if (!block || !rsvpIsOpen(block.deadline)) return { status: 'error', message: ui.closed }
  const maxParty = block.maxPartySize ?? 2
  const partySize = data.attending === 'yes' ? Math.min(data.partySize, maxParty) : 1

  const h = await headers()
  const ip = h.get('x-forwarded-for')?.split(',')[0]?.trim() || h.get('x-real-ip') || 'local'
  const ipHash = createHash('sha256').update(ip).digest('hex').slice(0, 16)
  if (tooMany(ipHash)) return { status: 'error', message: ui.tooMany }

  try {
    const payload = await getPayloadClient()
    await payload.create({
      collection: 'rsvps',
      data: {
        name: data.name,
        email: data.email,
        attending: data.attending,
        partySize,
        guestNames: partySize > 1 ? data.guestNames : undefined,
        dietary: block.askDietary ? data.dietary : undefined,
        song: block.askSong ? data.song : undefined,
        message: block.askMessage ? data.message : undefined,
        source: ipHash,
      },
    })
    return { status: 'success', message: block.successMessage || 'Tack!' }
  } catch (err) {
    console.error('RSVP create failed', err)
    return { status: 'error', message: ui.genericError }
  }
}
