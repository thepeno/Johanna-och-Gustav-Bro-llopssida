import React from 'react'
import type { RsvpBlock, SiteSetting } from '@/payload-types'
import { Section, SectionHeading } from '@/components/Section'
import { RichText } from '@/components/RichText'
import { RsvpForm } from './Form'
import { rsvpIsOpen } from './shared'
import { formatDate } from '@/lib/utils'
import { t } from '@/lib/i18n'

/** The reply section. On the RSVP page (`standalone`) the heading becomes the page's h1. */
export function RsvpBlockComponent({ block, settings, standalone }: { block: RsvpBlock; settings: SiteSetting; standalone?: boolean }) {
  const locale = settings.locale || 'sv-SE'
  const ui = t(locale)
  const open = rsvpIsOpen(block.deadline)

  return (
    <Section anchor={block.anchor} theme={standalone ? 'ivory' : block.theme} className={standalone ? '[&>div]:pt-28 md:[&>div]:pt-32' : undefined}>
      <SectionHeading heading={block.heading} as={standalone ? 'h1' : 'h2'} />
      <div className="mx-auto max-w-[36rem]">
        <RichText data={block.intro} />
        {block.deadline && (
          <p className="mt-3">
            {ui.deadline} {formatDate(block.deadline, locale)}.
          </p>
        )}
        <div className="mt-14">
          {open ? (
            <RsvpForm
              ui={ui}
              maxPartySize={block.maxPartySize ?? 2}
              askDietary={block.askDietary ?? true}
              askSong={block.askSong ?? true}
              askMessage={block.askMessage ?? true}
            />
          ) : (
            <p className="statement text-center">{block.closedMessage || ui.closed}</p>
          )}
        </div>
      </div>
    </Section>
  )
}
