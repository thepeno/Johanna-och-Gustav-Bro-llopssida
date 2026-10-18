import React from 'react'
import { cn, themeClass, type Theme } from '@/lib/utils'

type Props = {
  anchor: string
  theme?: Theme | null
  className?: string
  children: React.ReactNode
}

/** Shared wrapper: sets the colour theme and the scroll anchor for a block. */
export function Section({ anchor, theme, className, children }: Props) {
  return (
    <section id={anchor} className={cn('relative', themeClass[theme ?? 'ivory'], className)}>
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-36">{children}</div>
    </section>
  )
}

export function SectionHeading({
  label,
  heading,
  intro,
  align = 'left',
}: {
  label?: string | null
  heading: string
  intro?: string | null
  align?: 'left' | 'center'
}) {
  return (
    <div className={cn('mb-14 max-w-3xl md:mb-20', align === 'center' && 'mx-auto text-center')}>
      {label && <p className="label mb-5">{label}</p>}
      <h2 className="display text-4xl md:text-6xl">{heading}</h2>
      {intro && <p className="mt-6 max-w-xl text-lg text-(--fg-soft) md:text-xl">{intro}</p>}
    </div>
  )
}
