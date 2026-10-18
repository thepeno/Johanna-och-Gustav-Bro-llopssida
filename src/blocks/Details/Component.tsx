import React from 'react'
import type { DetailsBlock } from '@/payload-types'
import { Section, SectionHeading } from '@/components/Section'
import { Img } from '@/components/Img'
import { RichText } from '@/components/RichText'
import { asMedia } from '@/lib/utils'

// Like Morais's Travel: heading, a paragraph, then each place as an underlined
// name (linked when there is a URL) with its address below.
export function DetailsBlockComponent({ block }: { block: DetailsBlock }) {
  const cards = block.cards ?? []
  return (
    <Section anchor={block.anchor} theme={block.theme}>
      <SectionHeading heading={block.heading} intro={block.intro} />
      <ul className={`mx-auto grid max-w-4xl gap-x-16 gap-y-14 text-center ${cards.length > 1 ? 'sm:grid-cols-2' : ''} ${cards.length > 2 ? 'lg:grid-cols-3' : ''}`}>
        {cards.map((card, i) => {
          const image = asMedia(card.image)
          const external = card.linkUrl?.startsWith('http')
          return (
            <li key={card.id ?? i} className="flex flex-col items-center">
              {image && (
                <div className="mb-8 aspect-[4/5] w-full overflow-hidden">
                  <Img
                    media={image}
                    size="card"
                    sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 90vw"
                    className="h-full w-full object-cover grayscale"
                  />
                </div>
              )}
              {card.linkUrl ? (
                <a href={card.linkUrl} target={external ? '_blank' : undefined} rel="noreferrer" className="underline">
                  {card.title}
                </a>
              ) : (
                <p className="underline">{card.title}</p>
              )}
              <RichText data={card.body} className="max-w-sm" />
              {card.linkLabel && card.linkUrl && (
                <a href={card.linkUrl} target={external ? '_blank' : undefined} rel="noreferrer" className="mt-3 underline">
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
