import React from 'react'
import type { DetailsBlock } from '@/payload-types'
import { Section, SectionHeading } from '@/components/Section'
import { Img } from '@/components/Img'
import { RichText } from '@/components/RichText'
import { asMedia } from '@/lib/utils'

// Travel and stay: each place as an underlined name (a map link when there is
// one) with its details below, left-aligned like the card's lines.
export function DetailsBlockComponent({ block }: { block: DetailsBlock }) {
  const cards = block.cards ?? []
  return (
    <Section anchor={block.anchor} theme={block.theme}>
      <SectionHeading heading={block.heading} intro={block.intro} />
      <ul className={`mx-auto grid w-fit max-w-full gap-x-24 gap-y-12 ${cards.length > 1 ? 'sm:grid-cols-2' : ''} ${cards.length > 2 ? 'lg:grid-cols-3' : ''}`}>
        {cards.map((card, i) => {
          const image = asMedia(card.image)
          const external = card.linkUrl?.startsWith('http')
          return (
            <li key={card.id ?? i} className="max-w-[22rem]">
              {image && (
                <div className="print mb-8 -rotate-1">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Img media={image} size="card" fill sizes="(min-width:640px) 22rem, 80vw" className="grayscale" />
                  </div>
                </div>
              )}
              {card.linkUrl ? (
                <a href={card.linkUrl} target={external ? '_blank' : undefined} rel="noreferrer">
                  {card.title}
                </a>
              ) : (
                <p>{card.title}</p>
              )}
              <RichText data={card.body} className="text-(--fg-soft)" />
              {card.linkLabel && card.linkUrl && (
                <a href={card.linkUrl} target={external ? '_blank' : undefined} rel="noreferrer" className="mt-2 inline-block">
                  {card.linkLabel}
                </a>
              )}
            </li>
          )
        })}
      </ul>
    </Section>
  )
}
