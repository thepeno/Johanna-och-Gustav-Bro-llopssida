import React from 'react'
import type { SiteSetting } from '@/payload-types'

/** Morais's closing: a line of thanks, a dash, a big underlined reply link, the hashtag. */
export function Footer({ settings, rsvp }: { settings: SiteSetting; rsvp?: { anchor: string; label: string } }) {
  return (
    <footer className="theme-ivory bg-cream text-ink">
      <div className="mx-auto flex max-w-6xl flex-col items-center px-5 py-24 text-center md:px-10 md:py-32">
        {settings.footerNote && <p className="max-w-md">{settings.footerNote}</p>}
        <span aria-hidden className="mt-3 block">
          —
        </span>
        {rsvp && (
          <a href={`#${rsvp.anchor}`} className="title mt-6 border-b border-ink">
            {rsvp.label}
          </a>
        )}
        {settings.hashtag && <p className="mt-16 font-sans text-[1.0625rem]">{settings.hashtag}</p>}
        {settings.contactEmail && (
          <a href={`mailto:${settings.contactEmail}`} className="mt-2 underline">
            {settings.contactEmail}
          </a>
        )}
      </div>
    </footer>
  )
}
