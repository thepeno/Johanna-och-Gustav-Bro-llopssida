import type { Field } from 'payload'

// Fields shared by every block: an anchor id for in-page navigation, an
// optional label that puts the section in the top nav, and a background that
// lets editors alternate cream and white sections like the Morais reference.
export const sectionFields: Field[] = [
  {
    type: 'row',
    fields: [
      {
        name: 'anchor',
        type: 'text',
        required: true,
        admin: { width: '33%', description: 'Used in the URL hash, e.g. "schema" → #schema' },
      },
      {
        name: 'navLabel',
        type: 'text',
        admin: { width: '33%', description: 'Leave empty to hide this section from the menu' },
      },
      {
        name: 'theme',
        type: 'select',
        defaultValue: 'ivory',
        options: [
          { label: 'Cream', value: 'ivory' },
          { label: 'White', value: 'espresso' },
          { label: 'Cream panel on white', value: 'olive' },
        ],
        admin: { width: '33%', description: 'Background. Alternate cream and white between sections.' },
      },
    ],
  },
]

export const headingFields: Field[] = [
  {
    type: 'row',
    fields: [
      { name: 'label', type: 'text', admin: { width: '40%', description: 'Not shown on the page (kept for older content)' } },
      { name: 'heading', type: 'text', required: true, admin: { width: '60%' } },
    ],
  },
]
