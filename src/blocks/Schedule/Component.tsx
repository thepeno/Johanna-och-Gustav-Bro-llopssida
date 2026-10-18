import React from 'react'
import type { ScheduleBlock } from '@/payload-types'
import { Section, SectionHeading } from '@/components/Section'

// Like Morais's Ceremony / Reception: each part of the day as a small centred column.
export function ScheduleBlockComponent({ block }: { block: ScheduleBlock }) {
  return (
    <Section anchor={block.anchor} theme={block.theme}>
      <SectionHeading heading={block.heading} intro={block.intro} />
      <ol className="mx-auto grid max-w-5xl gap-x-10 gap-y-14 text-center sm:grid-cols-2 lg:grid-cols-3">
        {block.events?.map((event, i) => (
          <li key={event.id ?? i}>
            <h3 className="display text-3xl">{event.title}</h3>
            <p className="mt-3">{event.time}</p>
            {event.location && <p className="text-(--fg-soft)">{event.location}</p>}
            {event.description && <p className="mx-auto mt-3 max-w-xs text-(--fg-soft)">{event.description}</p>}
          </li>
        ))}
      </ol>
    </Section>
  )
}
