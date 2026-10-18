import React from 'react'
import type { GalleryBlock } from '@/payload-types'
import { Section, SectionHeading } from '@/components/Section'
import { Img } from '@/components/Img'
import { asMedia } from '@/lib/utils'

export function GalleryBlockComponent({ block }: { block: GalleryBlock }) {
  return (
    <Section anchor={block.anchor} theme={block.theme}>
      <SectionHeading label={block.label} heading={block.heading} intro={block.intro} align="center" />
      <div className="columns-2 gap-4 md:columns-3 md:gap-6">
        {block.images?.map((item, i) => {
          const image = asMedia(item.image)
          if (!image) return null
          return (
            <figure key={item.id ?? i} className="mb-4 break-inside-avoid md:mb-6">
              <Img media={image} size="card" sizes="(min-width:768px) 33vw, 50vw" className="w-full" />
              {item.caption && <figcaption className="label mt-3">{item.caption}</figcaption>}
            </figure>
          )
        })}
      </div>
    </Section>
  )
}
