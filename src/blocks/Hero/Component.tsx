import React from 'react'
import type { HeroBlock, SiteSetting } from '@/payload-types'
import { Img } from '@/components/Img'
import { DaysLeft } from '@/components/Countdown'
import { Button } from '@/components/ui/Button'
import { asMedia, formatDate } from '@/lib/utils'
import { t } from '@/lib/i18n'

// Morais's opening: the announcement set large (the names are already in the
// header), a photograph, then the date. Without an announcement the names lead.
export function HeroBlockComponent({ block, settings }: { block: HeroBlock; settings: SiteSetting }) {
  const media = asMedia(block.image)
  const locale = settings.locale || 'sv-SE'
  const ui = t(locale)
  const date = formatDate(settings.weddingDate, locale, { day: 'numeric', month: 'long', year: 'numeric' })
  const weekday = formatDate(settings.weddingDate, locale, { weekday: 'long' })

  return (
    <section id={block.anchor} className="theme-ivory scroll-mt-4 bg-cream text-ink">
      <span id="top" className="sr-only" />
      <div className="mx-auto flex max-w-6xl flex-col items-center px-5 pt-10 pb-20 text-center md:px-10 md:pt-16 md:pb-28">
        <h1 className="display text-[clamp(3.25rem,10vw,6rem)] leading-[1.02]">
          {block.eyebrow || `${settings.partnerOne} & ${settings.partnerTwo}`}
        </h1>

        {media && (
          <div className="relative mt-14 aspect-[4/5] w-full max-w-3xl overflow-hidden sm:aspect-[3/2] md:mt-20">
            <Img media={media} size="large" fill priority sizes="(min-width: 768px) 768px, 100vw" className="grayscale" />
          </div>
        )}

        <p className="display mt-16 text-5xl md:mt-24 md:text-7xl">{date}</p>
        <p className="mt-6 max-w-lg text-(--fg-soft)">
          {block.tagline || [weekday[0].toUpperCase() + weekday.slice(1), settings.venueShort].filter(Boolean).join(' · ')}
          {block.showCountdown && (
            <>
              <br />
              <DaysLeft date={settings.weddingDate} days={settings.countdownLabels?.days || 'dagar'} suffix={ui.daysLeft} />
            </>
          )}
        </p>

        {block.ctaLabel && block.ctaAnchor && (
          <Button href={`#${block.ctaAnchor}`} className="mt-10">
            {block.ctaLabel}
          </Button>
        )}
      </div>
    </section>
  )
}
