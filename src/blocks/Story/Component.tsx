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
      <RichText data={block.body} className="mx-auto max-w-xl text-center" />

      {images.length > 0 && (
        <div className={`mx-auto mt-16 grid max-w-4xl gap-4 md:mt-20 md:gap-6 ${images.length > 1 ? 'grid-cols-2' : ''}`}>
          {images.map((image) => (
            <div key={image.id} className="aspect-[4/5] overflow-hidden">
              <Img media={image} size="card" sizes="(min-width: 768px) 440px, 50vw" className="h-full w-full object-cover grayscale" />
            </div>
          ))}
        </div>
      )}

      {block.milestones && block.milestones.length > 0 && (
        <ol className="mx-auto mt-20 grid max-w-4xl gap-12 text-center md:mt-24 md:grid-cols-3 md:gap-10">
          {block.milestones.map((m, i) => (
            <li key={m.id ?? i}>
              {m.date && <p className="label">{m.date}</p>}
              <h3 className="display mt-1 text-2xl">{m.title}</h3>
              {m.text && <p className="mx-auto mt-3 max-w-xs text-(--fg-soft)">{m.text}</p>}
            </li>
          ))}
        </ol>
      )}
    </Section>
  )
}
