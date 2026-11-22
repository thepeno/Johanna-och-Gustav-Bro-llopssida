import type { Field } from 'payload'

// Fields shared by every block: an anchor id for in-page navigation, an
// optional label that puts the section in the top nav, and a legacy background
// value (every section is now the same card paper).
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
        type: 'text', localized: true,
        admin: { width: '33%', description: 'Leave empty to hide this section from the menu' },
      },
      {
        name: 'theme',
        type: 'select',
        defaultValue: 'ivory',
        options: [
          { label: 'Paper', value: 'ivory' },
          { label: 'Paper (was White)', value: 'espresso' },
          { label: 'Paper (was Cream panel)', value: 'olive' },
        ],
        admin: { width: '33%', description: 'No longer changes anything: every section is the card paper.' },
      },
    ],
  },
]

export const headingFields: Field[] = [
  {
    type: 'row',
    fields: [
      { name: 'label', type: 'text', localized: true, admin: { width: '40%', description: 'Not shown on the page (kept for older content)' } },
      { name: 'heading', type: 'text', localized: true, required: true, admin: { width: '60%' } },
    ],
  },
]
