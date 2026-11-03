import React from 'react'
import type { FaqBlock } from '@/payload-types'
import { Section, SectionHeading } from '@/components/Section'
import { RichText } from '@/components/RichText'

export function FaqBlockComponent({ block }: { block: FaqBlock }) {
  return (
    <Section anchor={block.anchor} theme={block.theme}>
      <SectionHeading heading={block.heading} />
      <div className="mx-auto max-w-[36rem]">
        {block.items?.map((item, i) => (
          <details key={item.id ?? i} className="border-t-[1.5px] border-(--line) last:border-b-[1.5px]">
            <summary className="flex min-h-14 cursor-pointer items-baseline justify-between gap-6 py-4">
              <span>{item.question}</span>
              {/* the plus from Gustav's hand, turned into a cross when open */}
              <span aria-hidden className="faq-icon shrink-0 transition-transform duration-300 ease-(--ease-pencil)">
                +
              </span>
            </summary>
            <RichText data={item.answer} className="pb-7 text-(--fg-soft)" />
          </details>
        ))}
      </div>
    </Section>
  )
}
