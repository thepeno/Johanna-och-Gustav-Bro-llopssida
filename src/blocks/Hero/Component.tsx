import React from 'react'
import type { HeroBlock, SiteSetting } from '@/payload-types'
import { Img } from '@/components/Img'
import { Countdown } from '@/components/Countdown'
import { Button } from '@/components/ui/Button'
import { asMedia, formatDate } from '@/lib/utils'
import { t } from '@/lib/i18n'

export function HeroBlockComponent({ block, settings }: { block: HeroBlock; settings: SiteSetting }) {
  const media = asMedia(block.image)
  const locale = settings.locale || 'sv-SE'
  const ui = t(locale)
  const dateLine = formatDate(settings.weddingDate, locale, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  const labels = {
    days: settings.countdownLabels?.days || 'dagar',
    hours: settings.countdownLabels?.hours || 'timmar',
    minutes: settings.countdownLabels?.minutes || 'minuter',
    seconds: settings.countdownLabels?.seconds || 'sekunder',
  }

  return (
    <section id={block.anchor} className="theme-espresso relative flex min-h-svh flex-col justify-end overflow-hidden bg-espresso text-ivory">
      <span id="top" className="absolute top-0" />
      {media && (
        <div className="absolute inset-0">
          <Img media={media} size="large" fill priority sizes="100vw" />
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-espresso/55 via-espresso/25 to-espresso/85" aria-hidden />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-10 px-5 pt-40 pb-14 md:px-10 md:pb-20">
        <div className="animate-fade-up">
          {block.eyebrow && <p className="label mb-6 text-ivory/80">{block.eyebrow}</p>}
          <h1 className="display text-[15vw] leading-[0.95] md:text-[9.5vw]">
            {settings.partnerOne}
            <span className="font-serif italic font-normal normal-case tracking-normal"> &amp; </span>
            {settings.partnerTwo}
          </h1>
          <p className="mt-6 max-w-xl font-serif text-2xl italic text-ivory/90 md:text-3xl">
            {block.tagline || `${dateLine}${settings.venueShort ? ` · ${settings.venueShort}` : ''}`}
          </p>
        </div>

        <div className="flex flex-col gap-8 border-t border-ivory/25 pt-8 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-wrap items-center gap-5">
            {block.ctaLabel && block.ctaAnchor && (
              <Button href={`#${block.ctaAnchor}`} className="[--fg:var(--color-ivory)] [--bg:var(--color-espresso)]">
                {block.ctaLabel}
              </Button>
            )}
            {block.showScrollHint && (
              <span className="label hidden items-center gap-3 text-ivory/70 md:inline-flex">
                {ui.scroll}
                <span aria-hidden className="block h-10 w-px bg-ivory/50" />
              </span>
            )}
          </div>
          {block.showCountdown && <Countdown date={settings.weddingDate} labels={labels} />}
        </div>
      </div>
    </section>
  )
}
