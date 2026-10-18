import type { Block } from 'payload'
import { headingFields, sectionFields } from '@/fields/section'

export const Schedule: Block = {
  slug: 'schedule',
  interfaceName: 'ScheduleBlock',
  labels: { singular: 'Schedule', plural: 'Schedules' },
  fields: [
    ...sectionFields,
    ...headingFields,
    { name: 'intro', type: 'textarea' },
    {
      name: 'events',
      type: 'array',
      minRows: 1,
      labels: { singular: 'Event', plural: 'Events' },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'time', type: 'text', required: true, admin: { width: '25%', description: 'e.g. "14.00"' } },
            { name: 'title', type: 'text', required: true, admin: { width: '40%' } },
            { name: 'location', type: 'text', admin: { width: '35%' } },
          ],
        },
        { name: 'description', type: 'textarea' },
      ],
    },
  ],
}
