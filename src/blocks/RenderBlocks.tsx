import React from 'react'
import { sectionHref } from '@/lib/utils'
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
  // The hero's reply and dress-code notes are shown under the schedule when there is one
  const hero = blocks.find((b) => b.blockType === 'hero')
  const hasSchedule = blocks.some((b) => b.blockType === 'schedule')
  const notes =
    hero && hasSchedule && (hero.ctaLabel || hero.cornerNote)
      ? { label: hero.ctaLabel, href: hero.ctaAnchor ? sectionHref(hero.ctaAnchor, rsvpAnchor) : null, note: hero.cornerNote }
      : undefined

  return (
    <>
      {blocks.map((block, i) => {
        const key = block.id ?? `${block.blockType}-${i}`
        switch (block.blockType) {
          case 'hero':
            return <HeroBlockComponent key={key} block={block} settings={settings} rsvpAnchor={rsvpAnchor} showNotes={!notes} />
          case 'story':
            return <StoryBlockComponent key={key} block={block} />
          case 'schedule':
            return <ScheduleBlockComponent key={key} block={block} rsvpAnchor={rsvpAnchor} notes={notes} />
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
