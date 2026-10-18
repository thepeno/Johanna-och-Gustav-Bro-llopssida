import React from 'react'
import type { StoryBlock } from '@/payload-types'
import { Section, SectionHeading } from '@/components/Section'
import { Img } from '@/components/Img'
import { RichText } from '@/components/RichText'
import { asMedia } from '@/lib/utils'

export function StoryBlockComponent({ block }: { block: StoryBlock }) {
  const image = asMedia(block.image)
  const second = asMedia(block.imageSecondary)

  return (
    <Section anchor={block.anchor} theme={block.theme}>
      <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <SectionHeading label={block.label} heading={block.heading} />
          <RichText data={block.body} className="max-w-xl text-lg text-(--fg-soft) md:text-xl" />
        </div>

        {(image || second) && (
          <div className="relative grid grid-cols-6 gap-4 lg:col-span-6">
            {image && (
              <div className="col-span-4 aspect-[4/5] overflow-hidden">
                <Img media={image} size="card" sizes="(min-width:1024px) 40vw, 70vw" className="h-full w-full object-cover" />
              </div>
            )}
            {second && (
              <div className="col-span-2 mt-24 aspect-[3/4] overflow-hidden">
                <Img media={second} size="card" sizes="(min-width:1024px) 20vw, 30vw" className="h-full w-full object-cover" />
              </div>
            )}
          </div>
        )}
      </div>

      {block.milestones && block.milestones.length > 0 && (
        <ol className="mt-24 grid gap-10 border-t border-(--line) pt-16 md:grid-cols-3 md:gap-8">
          {block.milestones.map((m, i) => (
            <li key={m.id ?? i} className="flex flex-col">
              <span className="label">
                {String(i + 1).padStart(2, '0')}.{m.date ? ` ${m.date}` : ''}
              </span>
              <h3 className="display mt-4 text-3xl md:text-4xl">{m.title}</h3>
              {m.text && <p className="mt-4 max-w-sm text-(--fg-soft)">{m.text}</p>}
            </li>
          ))}
        </ol>
      )}
    </Section>
  )
}
