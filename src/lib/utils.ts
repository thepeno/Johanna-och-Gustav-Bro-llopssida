import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { Media } from '@/payload-types'

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

/** Upload fields are `string | Media`; only populated docs are renderable. */
export const asMedia = (value: unknown): Media | null =>
  value && typeof value === 'object' && 'url' in (value as Media) ? (value as Media) : null

export type Theme = 'ivory' | 'espresso' | 'olive'

export const themeClass: Record<Theme, string> = {
  ivory: 'theme-ivory bg-ivory text-ink',
  espresso: 'theme-espresso bg-espresso text-ivory',
  olive: 'theme-olive bg-olive text-ivory',
}

export const formatDate = (iso: string, locale = 'sv-SE', opts?: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat(locale, opts ?? { day: 'numeric', month: 'long', year: 'numeric' }).format(
    new Date(iso),
  )
