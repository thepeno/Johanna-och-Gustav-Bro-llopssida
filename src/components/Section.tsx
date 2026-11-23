import React from 'react'
import { WithCodes } from './InlineCode'
import { cn, themeClass, type Theme } from '@/lib/utils'

type Props = {
  anchor: string
  theme?: Theme | null
  className?: string
  children: React.ReactNode
}

/** Shared wrapper: the scroll anchor and the card's narrow column. Every section is the same paper. */
export function Section({ anchor, theme, className, children }: Props) {
  return (
    <section id={anchor} className={cn('scroll-mt-6', themeClass[theme ?? 'ivory'], className)}>
      <div className="mx-auto max-w-4xl px-5 py-20 md:px-10 md:py-28">{children}</div>
    </section>
  )
}

/** A heading set like the names on the card, centred, with an optional intro below. */
export function SectionHeading({ heading, intro, as: Tag = 'h2' }: { heading: string; intro?: string | null; as?: 'h1' | 'h2' }) {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
      <Tag className="statement">{heading}</Tag>
      {intro && (
        <p className="mx-auto mt-6 max-w-[26rem] text-left whitespace-pre-line">
          <WithCodes text={intro} />
        </p>
      )}
    </div>
  )
}
