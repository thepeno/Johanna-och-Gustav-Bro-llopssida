import React from 'react'
import type { DetailsBlock } from '@/payload-types'
import { Section, SectionHeading } from '@/components/Section'
import { Img } from '@/components/Img'
import { RichText } from '@/components/RichText'
import { asMedia, cn } from '@/lib/utils'

export function DetailsBlockComponent({ block }: { block: DetailsBlock }) {
  return (
    <Section anchor={block.anchor} theme={block.theme}>
      <SectionHeading label={block.label} heading={block.heading} intro={block.intro} />
      <ul className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
        {block.cards?.map((card, i) => {
          const image = asMedia(card.image)
          return (
            <li key={card.id ?? i} className={cn('flex flex-col', !image && 'justify-end')}>
              {image && (
                <div className="mb-8 aspect-[4/5] overflow-hidden">
                  <Img media={image} size="card" sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 90vw" className="h-full w-full object-cover" />
                </div>
              )}
              <span className="label">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="display mt-3 text-3xl">{card.title}</h3>
              <RichText data={card.body} className="mt-4 text-(--fg-soft)" />
              {card.linkUrl && (
                <a
                  href={card.linkUrl}
                  target={card.linkUrl.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  className="label mt-6 inline-flex w-fit items-center gap-2 border-b border-current pb-1 text-(--fg)"
                >
                  {card.linkLabel || card.linkUrl}
                  <span aria-hidden>↗</span>
                </a>
              )}
            </li>
          )
        })}
      </ul>
    </Section>
  )
}
