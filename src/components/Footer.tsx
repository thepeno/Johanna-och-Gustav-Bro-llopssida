import React from 'react'
import type { SiteSetting } from '@/payload-types'

/** Closing note, a dash, a big link to the reply form, then the small print. */
export function Footer({ settings, rsvp }: { settings: SiteSetting; rsvp?: { anchor: string; label: string } }) {
  return (
    <footer className="theme-ivory bg-cream text-ink">
      <div className="mx-auto flex max-w-6xl flex-col items-center px-5 py-24 text-center md:px-10 md:py-32">
        {settings.footerNote && <p className="max-w-md">{settings.footerNote}</p>}
        <span aria-hidden className="mt-4 block">
          —
        </span>
        {rsvp && (
          <a href={`#${rsvp.anchor}`} className="display mt-8 border-b border-ink pb-1 text-6xl md:text-7xl">
            {rsvp.label}
          </a>
        )}
        <div className="mt-16 flex flex-col items-center gap-2 font-sans text-[0.9375rem]">
          {settings.hashtag && <span>{settings.hashtag}</span>}
          {settings.contactEmail && (
            <a href={`mailto:${settings.contactEmail}`} className="label underline">
              {settings.contactEmail}
            </a>
          )}
        </div>
      </div>
    </footer>
  )
}
