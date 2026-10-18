import React from 'react'
import type { Page, SiteSetting } from '@/payload-types'
import { HeroBlockComponent } from './Hero/Component'
import { StoryBlockComponent } from './Story/Component'
import { ScheduleBlockComponent } from './Schedule/Component'
import { DetailsBlockComponent } from './Details/Component'
import { GalleryBlockComponent } from './Gallery/Component'
import { RsvpBlockComponent } from './Rsvp/Component'
import { FaqBlockComponent } from './Faq/Component'
import { TextBlockComponent } from './Text/Component'

type Block = Page['layout'][number]

export function RenderBlocks({ blocks, settings, rsvpAnchor }: { blocks: Block[]; settings: SiteSetting; rsvpAnchor?: string }) {
  return (
    <>
      {blocks.map((block, i) => {
        const key = block.id ?? `${block.blockType}-${i}`
        switch (block.blockType) {
          case 'hero':
            return <HeroBlockComponent key={key} block={block} settings={settings} rsvpAnchor={rsvpAnchor} />
          case 'story':
            return <StoryBlockComponent key={key} block={block} />
          case 'schedule':
            return <ScheduleBlockComponent key={key} block={block} rsvpAnchor={rsvpAnchor} />
          case 'details':
            return <DetailsBlockComponent key={key} block={block} />
          case 'gallery':
            return <GalleryBlockComponent key={key} block={block} />
          case 'rsvp':
            return <RsvpBlockComponent key={key} block={block} settings={settings} />
          case 'faq':
            return <FaqBlockComponent key={key} block={block} />
          case 'text':
            return <TextBlockComponent key={key} block={block} />
          default:
            return null
        }
      })}
    </>
  )
}
