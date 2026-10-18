import React from 'react'
import { cn, themeClass, type Theme } from '@/lib/utils'

type Props = {
  anchor: string
  theme?: Theme | null
  className?: string
  children: React.ReactNode
}

/** Shared wrapper: background theme, scroll anchor, and the centred Morais column. */
export function Section({ anchor, theme, className, children }: Props) {
  return (
    <section id={anchor} className={cn('scroll-mt-4', themeClass[theme ?? 'ivory'], className)}>
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-10 md:py-28">
        {theme === 'olive' ? <div className="bg-cream px-6 py-16 md:px-16 md:py-24">{children}</div> : children}
      </div>
    </section>
  )
}

/** Centred heading with an optional intro. No eyebrow: the heading carries itself. */
export function SectionHeading({ heading, intro }: { heading: string; intro?: string | null }) {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
      <h2 className="display text-4xl md:text-5xl">{heading}</h2>
      {intro && <p className="mx-auto mt-6 max-w-xl text-(--fg-soft)">{intro}</p>}
    </div>
  )
}
