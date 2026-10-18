import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { Media } from '@/payload-types'

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

/** Upload fields are `string | Media`; only populated docs are renderable. */
export const asMedia = (value: unknown): Media | null =>
  value && typeof value === 'object' && 'url' in (value as Media) ? (value as Media) : null

export type Theme = 'ivory' | 'espresso' | 'olive'

// Stored values kept from the first design; they now mean cream, white, and a cream panel on white
export const themeClass: Record<Theme, string> = {
  ivory: 'theme-ivory bg-cream text-ink',
  espresso: 'theme-espresso bg-white text-ink',
  olive: 'theme-olive bg-white text-ink',
}

export const formatDate = (iso: string, locale = 'sv-SE', opts?: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat(locale, opts ?? { day: 'numeric', month: 'long', year: 'numeric' }).format(
    new Date(iso),
  )
