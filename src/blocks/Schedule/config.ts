import type { Block } from 'payload'
import { sectionFields } from '@/fields/section'

export const Schedule: Block = {
  slug: 'schedule',
  interfaceName: 'ScheduleBlock',
  labels: { singular: 'Schedule', plural: 'Schedules' },
  fields: [
    ...sectionFields,
    {
      type: 'row',
      fields: [
        { name: 'label', type: 'text', localized: true, admin: { width: '40%', description: 'Not shown on the page (kept for older content)' } },
        { name: 'heading', type: 'text', localized: true, admin: { width: '60%', description: 'Optional. Leave empty to continue straight from the hero, like Morais.' } },
      ],
    },
    { name: 'intro', type: 'textarea', localized: true },
    {
      name: 'events',
      type: 'array',
      minRows: 1,
      labels: { singular: 'Event', plural: 'Events' },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'time', type: 'text', localized: true, required: true, admin: { width: '25%', description: 'e.g. "14.00"' } },
            { name: 'title', type: 'text', localized: true, required: true, admin: { width: '40%' } },
            { name: 'location', type: 'text', localized: true, admin: { width: '35%' } },
          ],
        },
        { name: 'description', type: 'textarea', localized: true, admin: { description: 'e.g. the address. Line breaks are kept.' } },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'ctaLabel', type: 'text', localized: true, admin: { width: '50%', description: 'Button under the schedule, e.g. "OSA"' } },
        { name: 'ctaAnchor', type: 'text', admin: { width: '50%', description: 'Anchor to scroll to, e.g. "osa"' } },
      ],
    },
  ],
}
