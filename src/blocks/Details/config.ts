import type { Block } from 'payload'
import { headingFields, sectionFields } from '@/fields/section'

// Practical information: venue, travel, accommodation, dress code, gifts…
export const Details: Block = {
  slug: 'details',
  interfaceName: 'DetailsBlock',
  labels: { singular: 'Details', plural: 'Details' },
  fields: [
    ...sectionFields,
    ...headingFields,
    {
      name: 'intro',
      type: 'textarea',
      localized: true,
      admin: { description: 'Wrap a booking code in `backticks` (e.g. `Wedding10`) to show it in plain letters, so upper and lower case are visible.' },
    },
    {
      name: 'cards',
      type: 'array',
      minRows: 1,
      labels: { singular: 'Card', plural: 'Cards' },
      fields: [
        { name: 'title', type: 'text', localized: true, required: true },
        { name: 'body', type: 'richText', localized: true },
        { name: 'image', type: 'upload', relationTo: 'media' },
        {
          type: 'row',
          fields: [
            { name: 'linkLabel', type: 'text', localized: true, admin: { width: '40%', description: 'e.g. "Visa på karta"' } },
            { name: 'linkUrl', type: 'text', admin: { width: '60%' } },
          ],
        },
      ],
    },
  ],
}
