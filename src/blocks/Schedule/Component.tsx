import React from 'react'
import type { ScheduleBlock } from '@/payload-types'
import { Section, SectionHeading } from '@/components/Section'

export function ScheduleBlockComponent({ block }: { block: ScheduleBlock }) {
  return (
    <Section anchor={block.anchor} theme={block.theme}>
      <SectionHeading label={block.label} heading={block.heading} intro={block.intro} align="center" />
      <ol className="mx-auto max-w-4xl">
        {block.events?.map((event, i) => (
          <li
            key={event.id ?? i}
            className="grid gap-3 border-t border-(--line) py-8 md:grid-cols-12 md:gap-8 md:py-10 last:border-b"
          >
            <div className="md:col-span-3">
              <span className="display text-3xl md:text-4xl">{event.time}</span>
            </div>
            <div className="md:col-span-9">
              <h3 className="display text-2xl md:text-3xl">{event.title}</h3>
              {event.location && <p className="mt-2 font-serif text-xl italic text-(--fg-soft)">{event.location}</p>}
              {event.description && <p className="mt-3 max-w-xl text-(--fg-soft)">{event.description}</p>}
            </div>
          </li>
        ))}
      </ol>
    </Section>
  )
}
