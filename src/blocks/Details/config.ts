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
    { name: 'intro', type: 'textarea' },
    {
      name: 'cards',
      type: 'array',
      minRows: 1,
      labels: { singular: 'Card', plural: 'Cards' },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'body', type: 'richText' },
        { name: 'image', type: 'upload', relationTo: 'media' },
        {
          type: 'row',
          fields: [
            { name: 'linkLabel', type: 'text', admin: { width: '40%', description: 'e.g. "Visa på karta"' } },
            { name: 'linkUrl', type: 'text', admin: { width: '60%' } },
          ],
        },
      ],
    },
  ],
}
