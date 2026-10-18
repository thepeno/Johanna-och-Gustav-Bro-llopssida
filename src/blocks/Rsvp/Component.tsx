import React from 'react'
import type { RsvpBlock, SiteSetting } from '@/payload-types'
import { Section, SectionHeading } from '@/components/Section'
import { RichText } from '@/components/RichText'
import { RsvpForm } from './Form'
import { rsvpIsOpen } from './shared'
import { formatDate } from '@/lib/utils'
import { t } from '@/lib/i18n'

/** The reply section. On the RSVP page (`standalone`) it sits on cream with the heading as the page's h1. */
export function RsvpBlockComponent({ block, settings, standalone }: { block: RsvpBlock; settings: SiteSetting; standalone?: boolean }) {
  const locale = settings.locale || 'sv-SE'
  const ui = t(locale)
  const open = rsvpIsOpen(block.deadline)

  return (
    <Section anchor={block.anchor} theme={standalone ? 'ivory' : block.theme} className={standalone ? '[&>div]:pt-10 md:[&>div]:pt-14' : undefined}>
      <SectionHeading heading={block.heading} as={standalone ? 'h1' : 'h2'} />
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
