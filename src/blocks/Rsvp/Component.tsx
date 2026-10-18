import React from 'react'
import type { RsvpBlock, SiteSetting } from '@/payload-types'
import { Section, SectionHeading } from '@/components/Section'
import { RichText } from '@/components/RichText'
import { RsvpForm } from './Form'
import { rsvpIsOpen } from './shared'
import { formatDate } from '@/lib/utils'
import { t } from '@/lib/i18n'

export function RsvpBlockComponent({ block, settings }: { block: RsvpBlock; settings: SiteSetting }) {
  const locale = settings.locale || 'sv-SE'
  const ui = t(locale)
  const open = rsvpIsOpen(block.deadline)

  return (
    <Section anchor={block.anchor} theme={block.theme}>
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <SectionHeading label={block.label} heading={block.heading} />
          <RichText data={block.intro} className="max-w-md text-lg text-(--fg-soft)" />
          {block.deadline && (
            <p className="label mt-10">
              {ui.deadline}: <span className="text-(--fg)">{formatDate(block.deadline, locale)}</span>
            </p>
          )}
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          {open ? (
            <RsvpForm
              ui={ui}
              maxPartySize={block.maxPartySize ?? 2}
              askDietary={block.askDietary ?? true}
              askSong={block.askSong ?? true}
              askMessage={block.askMessage ?? true}
            />
          ) : (
            <p className="font-serif text-2xl italic">{block.closedMessage || ui.closed}</p>
          )}
        </div>
      </div>
    </Section>
  )
}
