import type { Field } from 'payload'

// Fields shared by every block: an anchor id for in-page navigation, an
// optional label that puts the section in the top nav, and a colour theme that
// lets editors alternate light / dark / olive sections like the reference.
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
          { label: 'Ivory (light)', value: 'ivory' },
          { label: 'Espresso (dark)', value: 'espresso' },
          { label: 'Olive', value: 'olive' },
        ],
        admin: { width: '33%' },
      },
    ],
  },
]

export const headingFields: Field[] = [
  {
    type: 'row',
    fields: [
      { name: 'label', type: 'text', admin: { width: '40%', description: 'Small uppercase label, e.g. "01 — Vår historia"' } },
      { name: 'heading', type: 'text', required: true, admin: { width: '60%' } },
    ],
  },
]
