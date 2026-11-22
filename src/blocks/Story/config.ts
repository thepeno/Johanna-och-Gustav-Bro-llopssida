import type { Block } from 'payload'
import { headingFields, sectionFields } from '@/fields/section'

export const Story: Block = {
  slug: 'story',
  interfaceName: 'StoryBlock',
  labels: { singular: 'Our story', plural: 'Our story' },
  fields: [
    ...sectionFields,
    ...headingFields,
    { name: 'body', type: 'richText', localized: true },
    {
      type: 'row',
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', admin: { width: '50%' } },
        { name: 'imageSecondary', type: 'upload', relationTo: 'media', admin: { width: '50%' } },
      ],
    },
    {
      name: 'milestones',
      type: 'array',
      labels: { singular: 'Milestone', plural: 'Milestones' },
      admin: { description: 'Shown as a numbered list: 01. 02. 03.' },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'date', type: 'text', localized: true, admin: { width: '30%', description: 'e.g. "Sommaren 2019"' } },
            { name: 'title', type: 'text', localized: true, required: true, admin: { width: '70%' } },
          ],
        },
        { name: 'text', type: 'textarea', localized: true },
      ],
    },
  ],
}
