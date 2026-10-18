import React from 'react'
import type { DetailsBlock } from '@/payload-types'
import { Section, SectionHeading } from '@/components/Section'
import { Img } from '@/components/Img'
import { RichText } from '@/components/RichText'
import { asMedia } from '@/lib/utils'

export function DetailsBlockComponent({ block }: { block: DetailsBlock }) {
  return (
    <Section anchor={block.anchor} theme={block.theme}>
      <SectionHeading heading={block.heading} intro={block.intro} />
      <ul className="mx-auto grid max-w-5xl gap-x-10 gap-y-16 text-center sm:grid-cols-2 lg:grid-cols-3">
        {block.cards?.map((card, i) => {
          const image = asMedia(card.image)
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
              <h3 className="display text-3xl">{card.title}</h3>
              <RichText data={card.body} className="mt-4 max-w-sm text-(--fg-soft)" />
              {card.linkUrl && (
                <a
                  href={card.linkUrl}
                  target={card.linkUrl.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  className="mt-4 underline"
                >
                  {card.linkLabel || card.linkUrl}
                </a>
              )}
            </li>
          )
        })}
      </ul>
    </Section>
  )
}
