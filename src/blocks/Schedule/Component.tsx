import React from 'react'
import type { ScheduleBlock } from '@/payload-types'
import { Section, SectionHeading } from '@/components/Section'
import { Button } from '@/components/ui/Button'

// Morais's Ceremony / Reception: a 43px title over the place, its address and
// the time, side by side, with the reply button underneath.
export function ScheduleBlockComponent({ block }: { block: ScheduleBlock }) {
  const events = block.events ?? []
  return (
    <Section anchor={block.anchor} theme={block.theme} className={block.heading ? undefined : "[&>div]:pt-0 md:[&>div]:pt-0"}>
      {block.heading && <SectionHeading heading={block.heading} intro={block.intro} />}
      <ol
        className={`mx-auto grid max-w-4xl gap-x-16 gap-y-16 text-center ${events.length > 1 ? 'sm:grid-cols-2' : ''} ${events.length > 2 ? 'lg:grid-cols-3' : ''}`}
      >
        {events.map((event, i) => (
          <li key={event.id ?? i}>
            <h3 className="statement">{event.title}</h3>
            <div className="mt-6">
              {event.location && <p className="underline">{event.location}</p>}
              {event.description && <p className="whitespace-pre-line">{event.description}</p>}
              <p className="mt-7">{event.time}</p>
            </div>
          </li>
        ))}
      </ol>
      {block.ctaLabel && block.ctaAnchor && (
        <div className="mt-16 text-center">
          <Button href={`#${block.ctaAnchor}`}>{block.ctaLabel}</Button>
        </div>
      )}
    </Section>
  )
}
