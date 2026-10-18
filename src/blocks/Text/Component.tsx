import React from 'react'
import type { TextBlock } from '@/payload-types'
import { Section } from '@/components/Section'
import { Button } from '@/components/ui/Button'

export function TextBlockComponent({ block }: { block: TextBlock }) {
  return (
    <Section anchor={block.anchor} theme={block.theme}>
      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        {block.label && <p className="eyebrow">{block.label}</p>}
        <p className="statement mt-6">{block.text}</p>
        {block.linkLabel && block.linkUrl && (
          <Button
            href={block.linkUrl}
            target={block.linkUrl.startsWith('http') ? '_blank' : undefined}
            rel="noreferrer"
            className="mt-10"
          >
            {block.linkLabel}
          </Button>
        )}
      </div>
    </Section>
  )
}
