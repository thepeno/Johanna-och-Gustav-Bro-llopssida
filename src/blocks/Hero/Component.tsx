import React from 'react'
import type { HeroBlock, SiteSetting } from '@/payload-types'
import { Img } from '@/components/Img'
import { DaysLeft } from '@/components/Countdown'
import { Button } from '@/components/ui/Button'
import { asMedia, formatDate } from '@/lib/utils'
import { t } from '@/lib/i18n'

// Morais's opening, in order: "Save the date", the headline, the photograph,
// the date set just as large, then a paragraph in the 43px sans.
export function HeroBlockComponent({ block, settings }: { block: HeroBlock; settings: SiteSetting }) {
  const media = asMedia(block.image)
  const locale = settings.locale || 'sv-SE'
  const ui = t(locale)
  const date = formatDate(settings.weddingDate, locale, { day: 'numeric', month: 'long', year: 'numeric' })
  const weekday = formatDate(settings.weddingDate, locale, { weekday: 'long' })

  return (
    <section id={block.anchor} className="theme-ivory scroll-mt-4 bg-cream text-ink">
      <span id="top" className="sr-only" />
      <div className="mx-auto flex max-w-6xl flex-col items-center px-5 pt-8 pb-20 text-center md:px-10 md:pt-12 md:pb-28">
        {block.eyebrow && <p className="eyebrow">{block.eyebrow}</p>}
        <h1 className="title mt-8 md:mt-12">{block.heading || `${settings.partnerOne} & ${settings.partnerTwo}`}</h1>

        {media && (
          <div className="relative mt-12 aspect-[4/5] w-full max-w-[42rem] overflow-hidden sm:aspect-[3/2] md:mt-16">
            <Img media={media} size="large" fill priority sizes="(min-width: 768px) 672px, 100vw" className="grayscale" />
          </div>
        )}

        <p className="title mt-20 md:mt-28">{date}</p>
        <p className="statement mx-auto mt-8 max-w-4xl whitespace-pre-line">
          {block.tagline || [weekday[0].toUpperCase() + weekday.slice(1), settings.venueShort].filter(Boolean).join(', ')}
        </p>
        {block.showCountdown && (
          <p className="mt-6">
            <DaysLeft date={settings.weddingDate} days={settings.countdownLabels?.days || 'dagar'} suffix={ui.daysLeft} />
          </p>
        )}

        {block.ctaLabel && block.ctaAnchor && (
          <Button href={`#${block.ctaAnchor}`} className="mt-12">
            {block.ctaLabel}
          </Button>
        )}
      </div>
    </section>
  )
}
