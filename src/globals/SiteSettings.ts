import type { GlobalConfig } from 'payload'
import { revalidateHomeAfterGlobalChange } from '@/hooks/revalidate'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site settings',
  admin: { group: 'Content' },
  access: { read: () => true },
  hooks: { afterChange: [revalidateHomeAfterGlobalChange] },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'partnerOne', type: 'text', required: true, defaultValue: 'Johanna', admin: { width: '50%' } },
        { name: 'partnerTwo', type: 'text', required: true, defaultValue: 'Gustav', admin: { width: '50%' } },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'weddingDate',
          type: 'date',
          required: true,
          admin: { width: '50%', date: { pickerAppearance: 'dayAndTime', timeFormat: 'HH:mm' } },
        },
        {
          name: 'locale',
          type: 'select',
          defaultValue: 'sv-SE',
          options: [
            { label: 'Svenska', value: 'sv-SE' },
            { label: 'English', value: 'en-GB' },
          ],
          admin: { width: '50%', description: 'Language for dates and the countdown' },
        },
      ],
    },
    { name: 'venueShort', type: 'text', admin: { description: 'Shown under the names in the hero, e.g. "Ekebyhovs slott, Ekerö"' } },
    { name: 'hashtag', type: 'text', admin: { description: 'e.g. #johannaochgustav2027' } },
    { name: 'contactEmail', type: 'email' },
    { name: 'footerNote', type: 'text', defaultValue: 'Vi ses i juni!' },
    {
      name: 'countdownLabels',
      type: 'group',
      admin: { description: 'Units shown in the countdown' },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'days', type: 'text', defaultValue: 'dagar', admin: { width: '25%' } },
            { name: 'hours', type: 'text', defaultValue: 'timmar', admin: { width: '25%' } },
            { name: 'minutes', type: 'text', defaultValue: 'minuter', admin: { width: '25%' } },
            { name: 'seconds', type: 'text', defaultValue: 'sekunder', admin: { width: '25%' } },
          ],
        },
      ],
    },
  ],
}
