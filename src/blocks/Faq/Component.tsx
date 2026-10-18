import React from 'react'
import type { FaqBlock } from '@/payload-types'
import { Section, SectionHeading } from '@/components/Section'
import { RichText } from '@/components/RichText'

export function FaqBlockComponent({ block }: { block: FaqBlock }) {
  return (
    <Section anchor={block.anchor} theme={block.theme}>
      <SectionHeading heading={block.heading} />
      <div className="mx-auto max-w-2xl">
        {block.items?.map((item, i) => (
          <details key={item.id ?? i} className="border-t border-(--line) last:border-b">
            <summary className="flex cursor-pointer items-baseline justify-between gap-6 py-5 font-sans text-lg tracking-[-0.01em] md:text-xl">
              <span>{item.question}</span>
              <svg aria-hidden viewBox="0 0 16 16" className="faq-icon size-4 shrink-0 transition-transform duration-200">
                <path d="M8 1v14M1 8h14" stroke="currentColor" strokeWidth="1" fill="none" />
              </svg>
            </summary>
            <RichText data={item.answer} className="pb-7 text-(--fg-soft)" />
          </details>
        ))}
      </div>
    </Section>
  )
}
