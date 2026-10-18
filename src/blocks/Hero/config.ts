import type { Block } from 'payload'
import { sectionFields } from '@/fields/section'

export const Hero: Block = {
  slug: 'hero',
  interfaceName: 'HeroBlock',
  labels: { singular: 'Hero', plural: 'Heroes' },
  fields: [
    ...sectionFields,
    { name: 'image', type: 'upload', relationTo: 'media', required: true },
    { name: 'eyebrow', type: 'text', admin: { description: 'Small text above the names, e.g. "Vi gifter oss"' } },
    {
      name: 'tagline',
      type: 'text',
      admin: { description: 'Italic line under the names. Leave empty to show the date and venue from Site settings.' },
    },
    {
      type: 'row',
      fields: [
        { name: 'showCountdown', type: 'checkbox', defaultValue: true, admin: { width: '50%' } },
        { name: 'showScrollHint', type: 'checkbox', defaultValue: true, admin: { width: '50%' } },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'ctaLabel', type: 'text', admin: { width: '50%', description: 'Button text, e.g. "OSA"' } },
        { name: 'ctaAnchor', type: 'text', admin: { width: '50%', description: 'Anchor of the section to scroll to, e.g. "osa"' } },
      ],
    },
  ],
}
