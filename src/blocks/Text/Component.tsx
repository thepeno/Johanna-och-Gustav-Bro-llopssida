import React from 'react'
import type { TextBlock } from '@/payload-types'
import { Section } from '@/components/Section'
import { Button } from '@/components/ui/Button'

/** A short note: its label as the heading, a few lines of text, an optional underlined link. */
export function TextBlockComponent({ block }: { block: TextBlock }) {
  return (
    <Section anchor={block.anchor} theme={block.theme}>
      <div className="mx-auto flex max-w-[26rem] flex-col items-center">
        {block.label && <h2 className="statement text-center">{block.label}</h2>}
        <p className={block.label ? 'mt-8' : undefined}>{block.text}</p>
        {block.linkLabel && block.linkUrl && (
          <Button
            href={block.linkUrl}
            target={block.linkUrl.startsWith('http') ? '_blank' : undefined}
            rel="noreferrer"
            className="mt-12"
          >
            {block.linkLabel}
          </Button>
        )}
      </div>
    </Section>
  )
}
