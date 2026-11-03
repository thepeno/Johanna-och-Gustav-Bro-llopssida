import type { Block } from 'payload'
import { sectionFields } from '@/fields/section'

export const Hero: Block = {
  slug: 'hero',
  interfaceName: 'HeroBlock',
  labels: { singular: 'Hero', plural: 'Heroes' },
  fields: [
    ...sectionFields,
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: { description: 'Photo shown under the invitation, like a print laid on the card' },
    },
    {
      name: 'heading',
      type: 'text',
      admin: { description: 'The names line under the sheep. Empty shows "Partner one + Partner two".' },
    },
    {
      name: 'tagline',
      type: 'textarea',
      admin: {
        description:
          'The invitation text, written as on the card: one line per line, and an empty line between groups. Leave empty to show the date and venue from Site settings.',
      },
    },
    {
      name: 'cornerNote',
      type: 'textarea',
      admin: { description: 'Small note in the bottom-right corner of the opening, e.g. "Klädsel:" and "Mörk kostym" on two lines' },
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
        { name: 'ctaLabel', type: 'text', admin: { width: '50%', description: 'Reply link in the bottom-left corner, e.g. "OSA senast 15 juni"' } },
        { name: 'ctaAnchor', type: 'text', admin: { width: '50%', description: 'Where it goes: "osa" opens the reply page, any other anchor scrolls to that section' } },
      ],
    },
  ],
}
