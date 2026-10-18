import React from 'react'
import type { FaqBlock } from '@/payload-types'
import { Section, SectionHeading } from '@/components/Section'
import { RichText } from '@/components/RichText'

export function FaqBlockComponent({ block }: { block: FaqBlock }) {
  return (
    <Section anchor={block.anchor} theme={block.theme}>
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading label={block.label} heading={block.heading} />
        </div>
        <div className="lg:col-span-8">
          {block.items?.map((item, i) => (
            <details key={item.id ?? i} className="group border-t border-(--line) last:border-b">
              <summary className="flex cursor-pointer items-start justify-between gap-6 py-6 font-serif text-xl md:text-2xl">
                <span>{item.question}</span>
                <span aria-hidden className="faq-icon mt-1 shrink-0 text-2xl leading-none transition-transform duration-300">
                  +
                </span>
              </summary>
              <RichText data={item.answer} className="max-w-2xl pb-8 text-(--fg-soft)" />
            </details>
          ))}
        </div>
      </div>
    </Section>
  )
}
