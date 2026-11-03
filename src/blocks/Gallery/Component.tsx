import React from 'react'
import type { GalleryBlock } from '@/payload-types'
import { Section, SectionHeading } from '@/components/Section'
import { Img } from '@/components/Img'
import { asMedia } from '@/lib/utils'

// Plain photos in columns, captions written underneath.
export function GalleryBlockComponent({ block }: { block: GalleryBlock }) {
  return (
    <Section anchor={block.anchor} theme={block.theme}>
      <SectionHeading heading={block.heading} intro={block.intro} />
      <div className="columns-2 gap-6 md:columns-3 md:gap-10">
        {block.images?.map((item, i) => {
          const image = asMedia(item.image)
          if (!image) return null
          return (
            <figure key={item.id ?? i} className="mb-8 break-inside-avoid md:mb-12">
              <Img media={image} size="card" sizes="(min-width:768px) 30vw, 45vw" className="w-full grayscale" />
              {item.caption && <figcaption className="label mt-2 text-center">{item.caption}</figcaption>}
            </figure>
          )
        })}
      </div>
    </Section>
  )
}
