'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import type { SiteSetting } from '@/payload-types'
import { t } from '@/lib/i18n'
import type { NavLink } from '@/lib/links'
import { LanguageSwitch } from './LanguageSwitch'

/**
 * Nothing sits over the card but a quiet line of handwritten links at the top
 * right (one "Meny" word on phones that opens the same list on the paper).
 */
export function Nav({ items, settings }: { items: NavLink[]; settings: SiteSetting; rsvp?: NavLink }) {
  const [open, setOpen] = useState(false)
  const ui = t(settings.locale)

  return (
    <header className="theme-ivory absolute inset-x-0 top-0 z-50">
      <nav className="mx-auto flex max-w-5xl items-center justify-between gap-6 px-5 py-5 md:px-10 md:py-7" aria-label={ui.menu}>
        <Link href="/" className="label -ml-2 inline-flex min-h-12 items-center px-2 text-(--fg) no-underline" onClick={() => setOpen(false)}>
          {settings.partnerOne[0]} + {settings.partnerTwo[0]}
        </Link>

        <div className="flex items-center gap-2 md:gap-8">
          <ul className="label hidden items-center gap-8 md:flex">
            {items.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="text-(--fg) no-underline hover:underline">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <LanguageSwitch locale={settings.locale} />

          <button
          type="button"
          className="label -mr-2 min-h-12 cursor-pointer px-2 text-(--fg) md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
            {open ? ui.close : ui.menu}
          </button>
        </div>
      </nav>

      {open && (
        <ul
          id="mobile-menu"
          className="fixed inset-x-0 top-[4.5rem] bottom-0 flex flex-col items-center justify-center gap-7 paper-ground pb-24 md:hidden"
        >
          {items.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="statement no-underline" onClick={() => setOpen(false)}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
