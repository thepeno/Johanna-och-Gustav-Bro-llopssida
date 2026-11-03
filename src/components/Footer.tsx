import React from 'react'
import type { SiteSetting } from '@/payload-types'
import type { NavLink } from '@/lib/links'
import { PencilLoop } from '@/components/PencilLoop'

/** The close: a line of thanks, then "OSA" written large and circled in pencil, then the small print. */
export function Footer({ settings, rsvp }: { settings: SiteSetting; rsvp?: NavLink }) {
  return (
    <footer className="theme-ivory">
      <div className="mx-auto flex max-w-4xl flex-col items-center px-5 pt-20 pb-16 text-center md:px-10 md:pt-28 md:pb-20">
        {settings.footerNote && <p className="max-w-[30rem] text-balance">{settings.footerNote}</p>}
        {rsvp && (
          <a
            href={rsvp.href}
            className="loop-hover title relative mt-14 px-4 text-(--fg) no-underline md:mt-16"
          >
            <PencilLoop className="-inset-x-[0.55em] -inset-y-[0.2em] h-[calc(100%+0.4em)] w-[calc(100%+1.1em)]" />
            <span className="relative">{rsvp.label}</span>
          </a>
        )}
        {(settings.hashtag || settings.contactEmail) && (
          <div className="label mt-20 flex flex-col items-center gap-1 md:mt-24">
            {settings.hashtag && <p>{settings.hashtag}</p>}
            {settings.contactEmail && (
              // the hand has no @, so the whole address is set in the plain face rather than mixing the two
              <a
                href={`mailto:${settings.contactEmail}`}
                className="font-plain tracking-normal text-(--fg-soft)"
              >
                {settings.contactEmail}
              </a>
            )}
          </div>
        )}
      </div>
    </footer>
  )
}
