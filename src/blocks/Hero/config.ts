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
      admin: { description: 'Photo shown under the invitation' },
    },
    {
      name: 'heading',
      type: 'text', localized: true,
      admin: { description: 'The names line under the sheep. Empty shows "Partner one + Partner two".' },
    },
    {
      name: 'tagline',
      type: 'textarea', localized: true,
      admin: {
        description:
          'The invitation text, written as on the card: one line per line, and an empty line between groups. Leave empty to show the date and venue from Site settings.',
      },
    },
    {
      name: 'cornerNote',
      type: 'textarea', localized: true,
      admin: { description: 'Dress code note, e.g. "Klädsel:" and "Mörk kostym" on two lines. Shown under the schedule, next to the reply link (in the opening if there is no schedule).' },
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
        { name: 'ctaLabel', type: 'text', localized: true, admin: { width: '50%', description: 'Reply link, e.g. "OSA senast 15 juni". Shown under the schedule next to the dress code (in the opening if there is no schedule).' } },
        { name: 'ctaAnchor', type: 'text', admin: { width: '50%', description: 'Where it goes: "osa" opens the reply page, any other anchor scrolls to that section' } },
      ],
    },
  ],
}
