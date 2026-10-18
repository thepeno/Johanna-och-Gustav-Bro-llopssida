import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: { group: 'Content', description: 'Photos used in the hero, story and gallery blocks.' },
  access: { read: () => true },
  upload: {
    mimeTypes: ['image/*'],
    focalPoint: true,
    imageSizes: [
      { name: 'thumbnail', width: 480, withoutEnlargement: true },
      { name: 'card', width: 1000, withoutEnlargement: true },
      { name: 'large', width: 1920, withoutEnlargement: true },
    ],
    adminThumbnail: 'thumbnail',
  },
  fields: [
    { name: 'alt', type: 'text', required: true, admin: { description: 'Short description for screen readers.' } },
  ],
}
