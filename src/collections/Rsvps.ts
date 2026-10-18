import type { CollectionConfig } from 'payload'

// Guest replies. Guests never talk to this collection directly: the public form
// goes through a server action (src/actions/rsvp.ts) that validates and writes
// with the Local API, so every access rule here is "logged-in admins only".
export const Rsvps: CollectionConfig = {
  slug: 'rsvps',
  labels: { singular: 'RSVP', plural: 'RSVPs' },
  admin: {
    group: 'Guests',
    useAsTitle: 'name',
    defaultColumns: ['name', 'attending', 'partySize', 'email', 'createdAt'],
    listSearchableFields: ['name', 'email', 'guestNames'],
  },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'name', type: 'text', required: true, admin: { width: '50%' } },
        { name: 'email', type: 'email', required: true, admin: { width: '50%' } },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'attending',
          type: 'select',
          required: true,
          options: [
            { label: 'Kommer', value: 'yes' },
            { label: 'Kommer inte', value: 'no' },
          ],
          admin: { width: '50%' },
        },
        { name: 'partySize', type: 'number', min: 1, defaultValue: 1, admin: { width: '50%' } },
      ],
    },
    { name: 'guestNames', type: 'textarea', admin: { description: 'Names of everyone covered by this reply' } },
    { name: 'dietary', type: 'textarea', label: 'Dietary requirements / allergies' },
    { name: 'song', type: 'text', label: 'Song request' },
    { name: 'message', type: 'textarea' },
    {
      name: 'source',
      type: 'text',
      admin: { position: 'sidebar', readOnly: true, description: 'IP hash of the submission' },
    },
  ],
  timestamps: true,
}
