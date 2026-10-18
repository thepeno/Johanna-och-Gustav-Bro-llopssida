'use client'

import React, { useEffect, useState } from 'react'
import type { SiteSetting } from '@/payload-types'
import { cn } from '@/lib/utils'

type Item = { anchor: string; label: string }

export function Nav({ items, settings }: { items: Item[]; settings: SiteSetting }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const monogram = `${settings.partnerOne[0] ?? ''} & ${settings.partnerTwo[0] ?? ''}`
  const solid = scrolled || open

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-500',
        solid ? 'theme-ivory bg-ivory/95 text-ink shadow-[0_1px_0_var(--line)] backdrop-blur' : 'text-ivory',
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-10" aria-label="Huvudmeny">
        <a href="#top" className="display text-xl tracking-[0.15em]" onClick={() => setOpen(false)}>
          {monogram}
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {items.map((item) => (
            <li key={item.anchor}>
              <a href={`#${item.anchor}`} className="label text-current/80 transition hover:text-current">
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="label flex items-center gap-2 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? 'Stäng' : 'Meny'}
          <span aria-hidden className="block h-px w-6 bg-current" />
        </button>
      </nav>

      {open && (
        <ul id="mobile-menu" className="flex flex-col gap-1 border-t border-(--line) px-5 pt-4 pb-8 md:hidden">
          {items.map((item) => (
            <li key={item.anchor}>
              <a
                href={`#${item.anchor}`}
                className="display block py-3 text-3xl"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
