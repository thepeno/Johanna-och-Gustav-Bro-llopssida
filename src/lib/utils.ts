import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { Media } from '@/payload-types'

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

/** The reply form has its own page, like Morais's /rsvp. */
export const RSVP_PATH = '/osa'

/** Where a button pointing at a section should go: the RSVP page for the reply block, otherwise the anchor. */
export const sectionHref = (anchor: string, rsvpAnchor?: string) => (anchor === rsvpAnchor ? RSVP_PATH : `#${anchor}`)

/** Upload fields are `string | Media`; only populated docs are renderable. */
export const asMedia = (value: unknown): Media | null =>
  value && typeof value === 'object' && 'url' in (value as Media) ? (value as Media) : null

export type Theme = 'ivory' | 'espresso' | 'olive'

// Stored values kept from earlier designs; every section is now the same card paper
export const themeClass: Record<Theme, string> = {
  ivory: 'theme-ivory',
  espresso: 'theme-espresso',
  olive: 'theme-olive',
}

export const formatDate = (iso: string, locale = 'sv-SE', opts?: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat(locale, opts ?? { day: 'numeric', month: 'long', year: 'numeric' }).format(
    new Date(iso),
  )
