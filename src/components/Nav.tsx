'use client'

import React, { useState } from 'react'
import type { SiteSetting } from '@/payload-types'
import { t } from '@/lib/i18n'

type Item = { anchor: string; label: string }

/** Names on the left, sections and the reply button on the right; a plain overlay menu on phones. */
export function Nav({ items, settings, rsvpAnchor }: { items: Item[]; settings: SiteSetting; rsvpAnchor?: string }) {
  const [open, setOpen] = useState(false)
  const ui = t(settings.locale)
  const links = items.filter((item) => item.anchor !== rsvpAnchor)
  const rsvp = items.find((item) => item.anchor === rsvpAnchor)

  return (
    <header className="theme-ivory relative z-50 bg-cream text-ink">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-5 md:px-10 md:py-7" aria-label={ui.menu}>
        <a href="#top" className="font-sans text-lg tracking-[-0.01em]" onClick={() => setOpen(false)}>
          {settings.partnerOne} &amp; {settings.partnerTwo}
        </a>

        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-7 font-sans text-[0.9375rem]">
            {links.map((item) => (
              <li key={item.anchor}>
                <a href={`#${item.anchor}`} className="hover:underline">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          {rsvp && (
            <a
              href={`#${rsvp.anchor}`}
              className="border border-ink px-5 py-2 font-sans text-[0.9375rem] transition-colors hover:bg-ink hover:text-cream"
            >
              {rsvp.label}
            </a>
          )}
        </div>

        <button
          type="button"
          className="-mr-2 flex size-11 flex-col items-center justify-center gap-[7px] md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? ui.close : ui.menu}
          onClick={() => setOpen((v) => !v)}
        >
          <span aria-hidden className={`block h-px w-7 bg-ink transition-transform ${open ? 'translate-y-1 rotate-45' : ''}`} />
          <span aria-hidden className={`block h-px w-7 bg-ink transition-transform ${open ? '-translate-y-1 -rotate-45' : ''}`} />
        </button>
      </nav>

      {open && (
        <ul
          id="mobile-menu"
          className="absolute inset-x-0 top-full flex h-[calc(100svh-5.25rem)] flex-col items-center justify-center gap-6 bg-cream pb-20 md:hidden"
        >
          {items.map((item) => (
            <li key={item.anchor}>
              <a href={`#${item.anchor}`} className="display text-4xl" onClick={() => setOpen(false)}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
