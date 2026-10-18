import type { CollectionConfig } from 'payload'
import { Hero } from '@/blocks/Hero/config'
import { Story } from '@/blocks/Story/config'
import { Schedule } from '@/blocks/Schedule/config'
import { Details } from '@/blocks/Details/config'
import { Gallery } from '@/blocks/Gallery/config'
import { Rsvp } from '@/blocks/Rsvp/config'
import { Faq } from '@/blocks/Faq/config'
import { revalidateHomeAfterCollectionChange } from '@/hooks/revalidate'

export const HOME_SLUG = 'home'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    group: 'Content',
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    description: 'The page with slug "home" is the one-pager shown at /. Build it from blocks.',
  },
  access: { read: () => true },
  hooks: { afterChange: [revalidateHomeAfterCollectionChange] },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      defaultValue: HOME_SLUG,
      admin: { position: 'sidebar' },
    },
    {
      name: 'layout',
      type: 'blocks',
      required: true,
      blocks: [Hero, Story, Schedule, Details, Gallery, Rsvp, Faq],
    },
    {
      name: 'meta',
      type: 'group',
      label: 'SEO',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
        { name: 'image', type: 'upload', relationTo: 'media' },
      ],
    },
  ],
}
