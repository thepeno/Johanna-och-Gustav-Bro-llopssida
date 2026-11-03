import React from 'react'
import type { StoryBlock } from '@/payload-types'
import { Section, SectionHeading } from '@/components/Section'
import { Img } from '@/components/Img'
import { RichText } from '@/components/RichText'
import { asMedia } from '@/lib/utils'

export function StoryBlockComponent({ block }: { block: StoryBlock }) {
  const images = [asMedia(block.image), asMedia(block.imageSecondary)].filter((m) => m !== null)

  return (
    <Section anchor={block.anchor} theme={block.theme}>
      <SectionHeading heading={block.heading} />
      <RichText data={block.body} className="mx-auto max-w-[34rem]" />

      {images.length > 0 && (
        <div className="mx-auto mt-16 flex max-w-3xl flex-wrap justify-center gap-8 md:mt-20 md:gap-12">
          {images.map((image, i) => (
            <figure key={image.id} className={`w-[min(70vw,17rem)] ${i % 2 ? 'mt-10' : ''}`}>
              <div className="relative aspect-[4/5] overflow-hidden">
                <Img media={image} size="card" fill sizes="17rem" />
              </div>
            </figure>
          ))}
        </div>
      )}

      {block.milestones && block.milestones.length > 0 && (
        <ol className="mx-auto mt-20 grid w-fit max-w-full gap-12 md:mt-24 md:grid-cols-3 md:gap-16">
          {block.milestones.map((m, i) => (
            <li key={m.id ?? i} className="max-w-[16rem]">
              {m.date && <p className="label">{m.date}</p>}
              <h3 className="mt-1 text-[1.15em]">{m.title}</h3>
              {m.text && <p className="mt-2 text-(--fg-soft)">{m.text}</p>}
            </li>
          ))}
        </ol>
      )}
    </Section>
  )
}
