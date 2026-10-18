import React from 'react'
import type { SiteSetting } from '@/payload-types'
import { formatDate } from '@/lib/utils'

export function Footer({ settings }: { settings: SiteSetting }) {
  return (
    <footer className="theme-espresso bg-espresso text-ivory">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-10 px-5 py-20 text-center md:px-10">
        <p className="display text-5xl md:text-7xl">
          {settings.partnerOne} <span className="font-serif italic normal-case tracking-normal">&amp;</span>{' '}
          {settings.partnerTwo}
        </p>
        <p className="label">
          {formatDate(settings.weddingDate, settings.locale || 'sv-SE')}
          {settings.venueShort ? ` · ${settings.venueShort}` : ''}
        </p>
        {settings.footerNote && <p className="max-w-md font-serif text-2xl italic">{settings.footerNote}</p>}
        <div className="label flex flex-wrap items-center justify-center gap-x-8 gap-y-3 opacity-70">
          {settings.hashtag && <span>{settings.hashtag}</span>}
          {settings.contactEmail && (
            <a href={`mailto:${settings.contactEmail}`} className="underline underline-offset-4">
              {settings.contactEmail}
            </a>
          )}
        </div>
      </div>
    </footer>
  )
}
