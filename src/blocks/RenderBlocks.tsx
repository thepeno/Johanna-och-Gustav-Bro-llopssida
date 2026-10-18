import React from 'react'
import type { Page, SiteSetting } from '@/payload-types'
import { HeroBlockComponent } from './Hero/Component'
import { StoryBlockComponent } from './Story/Component'
import { ScheduleBlockComponent } from './Schedule/Component'
import { DetailsBlockComponent } from './Details/Component'
import { GalleryBlockComponent } from './Gallery/Component'
import { RsvpBlockComponent } from './Rsvp/Component'
import { FaqBlockComponent } from './Faq/Component'

type Block = Page['layout'][number]

export function RenderBlocks({ blocks, settings }: { blocks: Block[]; settings: SiteSetting }) {
  return (
    <>
      {blocks.map((block, i) => {
        const key = block.id ?? `${block.blockType}-${i}`
        switch (block.blockType) {
          case 'hero':
            return <HeroBlockComponent key={key} block={block} settings={settings} />
          case 'story':
            return <StoryBlockComponent key={key} block={block} />
          case 'schedule':
            return <ScheduleBlockComponent key={key} block={block} />
          case 'details':
            return <DetailsBlockComponent key={key} block={block} />
          case 'gallery':
            return <GalleryBlockComponent key={key} block={block} />
          case 'rsvp':
            return <RsvpBlockComponent key={key} block={block} settings={settings} />
          case 'faq':
            return <FaqBlockComponent key={key} block={block} />
          default:
            return null
        }
      })}
    </>
  )
}
