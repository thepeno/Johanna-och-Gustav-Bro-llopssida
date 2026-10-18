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

/** Centred 43px heading with an optional intro, as in Morais's Travel section. */
export function SectionHeading({ heading, intro, as: Tag = 'h2' }: { heading: string; intro?: string | null; as?: 'h1' | 'h2' }) {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center md:mb-14">
      <Tag className="statement">{heading}</Tag>
      {intro && <p className="mx-auto mt-6 max-w-xl whitespace-pre-line">{intro}</p>}
    </div>
  )
}
