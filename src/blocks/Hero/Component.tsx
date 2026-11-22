import React from 'react'
import Image from 'next/image'
import type { HeroBlock, SiteSetting } from '@/payload-types'
import { Img } from '@/components/Img'
import { CardNotes } from '@/components/CardNotes'
import { asMedia, formatDate, sectionHref } from '@/lib/utils'
import sheep from '../../../public/card/sheep.png'

// The invitation card as the first screen: the sheep, the names, the card's
// lines with its line breaks, and the two corner notes (reply on the left,
// dress code on the right). The photo follows below, plain.
export function HeroBlockComponent({
  block,
  settings,
  rsvpAnchor,
  showNotes = true,
}: {
  block: HeroBlock
  settings: SiteSetting
  rsvpAnchor?: string
  showNotes?: boolean
}) {
  const media = asMedia(block.image)
  const locale = settings.locale || 'sv-SE'
  const names = block.heading || `${settings.partnerOne} + ${settings.partnerTwo}`
  const fallback = [
    formatDate(settings.weddingDate, locale, { weekday: 'long', day: 'numeric', month: 'long' }),
    settings.venueShort,
  ]
    .filter(Boolean)
    .join('\n\n')
  // An empty line in the tagline starts a new group, as on the card
  const groups = (block.tagline || fallback).split(/\n\s*\n/).map((g) => g.trim()).filter(Boolean)

  return (
    <section id={block.anchor} className="theme-ivory scroll-mt-6">
      <span id="top" className="sr-only" />
      <div className="mx-auto flex min-h-svh max-w-5xl flex-col px-5 pt-20 pb-6 md:px-10 md:pt-16 md:pb-8">
        <div className="flex flex-1 flex-col items-center justify-center py-4">
          <Image
            src={sheep}
            alt=""
            priority
            sizes="(min-width: 768px) 21rem, 60vw"
            className="card-in h-auto w-[min(56vw,15rem,30svh)] md:w-[min(20rem,26svh)]"
            style={{ '--i': 0 } as React.CSSProperties}
          />
          <h1 className="names card-in mt-[min(2.5rem,4svh)] text-center" style={{ '--i': 1 } as React.CSSProperties}>
            {names}
          </h1>
          <div className="invitation mt-[min(2.5rem,4svh)] w-fit max-w-full">
            {groups.map((group, i) => (
              <p key={i} className="card-in mt-[0.75em] whitespace-pre-line first:mt-0" style={{ '--i': i + 2 } as React.CSSProperties}>
                {group}
              </p>
            ))}
          </div>
        </div>

        {/* Shown here only when the page has no schedule; otherwise they sit under it */}
        {showNotes && (
          <CardNotes
            label={block.ctaLabel}
            href={block.ctaAnchor ? sectionHref(block.ctaAnchor, rsvpAnchor) : null}
            note={block.cornerNote}
            className="card-in mt-8"
            style={{ '--i': groups.length + 2 } as React.CSSProperties}
          />
        )}
      </div>

      {media && (
        <div className="px-5 pt-12 pb-8 md:pt-20">
          <figure className="mx-auto w-[min(78vw,21rem)] md:w-[24rem]">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Img media={media} size="card" fill sizes="(min-width: 768px) 24rem, 78vw" />
            </div>
          </figure>
        </div>
      )}
    </section>
  )
}
