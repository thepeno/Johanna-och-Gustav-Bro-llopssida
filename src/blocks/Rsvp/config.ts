import type { Block } from 'payload'
import { headingFields, sectionFields } from '@/fields/section'

export const Rsvp: Block = {
  slug: 'rsvp',
  interfaceName: 'RsvpBlock',
  labels: { singular: 'RSVP form', plural: 'RSVP forms' },
  fields: [
    ...sectionFields,
    ...headingFields,
    { name: 'intro', type: 'richText' },
    {
      type: 'row',
      fields: [
        {
          name: 'deadline',
          type: 'date',
          admin: { width: '50%', date: { pickerAppearance: 'dayOnly' }, description: 'Form closes after this day' },
        },
        {
          name: 'maxPartySize',
          type: 'number',
          defaultValue: 2,
          min: 1,
          max: 10,
          admin: { width: '50%', description: 'How many people one reply may cover' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'askDietary', type: 'checkbox', defaultValue: true, admin: { width: '33%' } },
        { name: 'askSong', type: 'checkbox', defaultValue: true, admin: { width: '33%' } },
        { name: 'askMessage', type: 'checkbox', defaultValue: true, admin: { width: '33%' } },
      ],
    },
    {
      name: 'successMessage',
      type: 'textarea',
      defaultValue: 'Tack! Vi har tagit emot ditt svar.',
    },
    {
      name: 'closedMessage',
      type: 'textarea',
      defaultValue: 'Sista svarsdag har passerat. Hör av dig direkt till oss om något ändrats.',
    },
  ],
}
