import React from 'react'
import type { ScheduleBlock } from '@/payload-types'
import { Section, SectionHeading } from '@/components/Section'
import { Button } from '@/components/ui/Button'
import { sectionHref } from '@/lib/utils'
import { CardNotes, type CardNotesProps } from '@/components/CardNotes'

// The day, as more lines on the card: what, where, when, side by side on wide
// screens, then the reply circled in pencil.
export function ScheduleBlockComponent({ block, rsvpAnchor, notes }: { block: ScheduleBlock; rsvpAnchor?: string; notes?: CardNotesProps }) {
  const events = block.events ?? []
  // Without a section heading the items are the next level under the page's h1
  const Title = block.heading ? 'h3' : 'h2'
  return (
    <Section anchor={block.anchor} theme={block.theme}>
      {block.heading && <SectionHeading heading={block.heading} intro={block.intro} />}
      <ol className={`mx-auto grid w-fit max-w-full gap-x-24 gap-y-14 ${events.length > 1 ? 'sm:grid-cols-2' : ''} ${events.length > 2 ? 'lg:grid-cols-3' : ''}`}>
        {events.map((event, i) => (
          <li key={event.id ?? i}>
            <Title className="statement">{event.title}</Title>
            <div className="mt-4">
              <p>{event.time}</p>
              {event.location && <p>{event.location}</p>}
              {event.description && <p className="whitespace-pre-line text-(--fg-soft)">{event.description}</p>}
            </div>
          </li>
        ))}
      </ol>
      {/* The card's reply and dress-code notes (from the hero) replace the schedule's own button */}
      {notes ? (
        <CardNotes {...notes} className="mt-20" />
      ) : block.ctaLabel && block.ctaAnchor && (
        <div className="mt-20 text-center">
          <Button href={sectionHref(block.ctaAnchor, rsvpAnchor)}>{block.ctaLabel}</Button>
        </div>
      )}
    </Section>
  )
}
