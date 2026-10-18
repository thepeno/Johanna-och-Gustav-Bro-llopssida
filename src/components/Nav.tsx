'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import type { SiteSetting } from '@/payload-types'
import { t } from '@/lib/i18n'
import type { NavLink } from '@/lib/links'

/** Morais's header: the names on the left, one outlined reply button on the right; a menu on phones. */
export function Nav({ items, settings, rsvp }: { items: NavLink[]; settings: SiteSetting; rsvp?: NavLink }) {
  const [open, setOpen] = useState(false)
  const ui = t(settings.locale)

  return (
    <header className="theme-ivory relative z-50 bg-cream text-ink">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-6 md:px-10 md:py-8" aria-label={ui.menu}>
        <Link href="/" className="max-w-[12rem] font-sans text-[1.0625rem] leading-snug tracking-[-0.02em] uppercase md:max-w-none" onClick={() => setOpen(false)}>
          {settings.partnerOne} &amp; {settings.partnerTwo}
        </Link>

        {rsvp && (
          <a
            href={rsvp.href}
            className="hidden min-h-12 items-center border border-ink px-6 font-sans text-[1.0625rem] uppercase tracking-[0.05em] transition-colors hover:bg-ink hover:text-cream md:inline-flex"
          >
            {rsvp.label}
          </a>
        )}

        <button
          type="button"
          className="-mr-2 flex size-12 flex-col items-center justify-center gap-[9px] md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? ui.close : ui.menu}
          onClick={() => setOpen((v) => !v)}
        >
          <span aria-hidden className={`block h-px w-9 bg-ink transition-transform ${open ? 'translate-y-[5px] rotate-45' : ''}`} />
          <span aria-hidden className={`block h-px w-9 bg-ink transition-transform ${open ? '-translate-y-[5px] -rotate-45' : ''}`} />
        </button>
      </nav>

      {open && (
        <ul
          id="mobile-menu"
          className="absolute inset-x-0 top-full flex h-[calc(100svh-6rem)] flex-col items-center justify-center gap-6 bg-cream pb-20 md:hidden"
        >
          {items.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="statement" onClick={() => setOpen(false)}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
