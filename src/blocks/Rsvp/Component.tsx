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
      <SectionHeading heading={block.heading} />
      <div className="mx-auto max-w-xl">
        <RichText data={block.intro} className="text-center" />
        {block.deadline && (
          <p className="mt-4 text-center">
            {ui.deadline} {formatDate(block.deadline, locale)}.
          </p>
        )}
        <div className="mt-12">
          {open ? (
            <RsvpForm
              ui={ui}
              maxPartySize={block.maxPartySize ?? 2}
              askDietary={block.askDietary ?? true}
              askSong={block.askSong ?? true}
              askMessage={block.askMessage ?? true}
            />
          ) : (
            <p className="text-center text-xl">{block.closedMessage || ui.closed}</p>
          )}
        </div>
      </div>
    </Section>
  )
}
