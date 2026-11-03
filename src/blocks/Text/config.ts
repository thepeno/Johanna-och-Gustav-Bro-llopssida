import type { Block } from 'payload'
import { sectionFields } from '@/fields/section'

// A short statement in large type with an optional button, like Morais's Registry section.
export const Text: Block = {
  slug: 'text',
  interfaceName: 'TextBlock',
  labels: { singular: 'Text', plural: 'Texts' },
  fields: [
    ...sectionFields,
    { name: 'label', type: 'text', admin: { description: 'Heading above the text, e.g. "Önskelista"' } },
    { name: 'text', type: 'textarea', required: true, admin: { description: 'Shown in large type' } },
    {
      type: 'row',
      fields: [
        { name: 'linkLabel', type: 'text', admin: { width: '40%', description: 'Button text' } },
        { name: 'linkUrl', type: 'text', admin: { width: '60%', description: 'Button link. No link, no button.' } },
      ],
    },
  ],
}
