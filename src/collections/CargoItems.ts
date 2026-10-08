import type { CollectionConfig } from 'payload'

export const CargoItems: CollectionConfig = {
  slug: 'cargo-items',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'location', 'order'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'location',
      type: 'text',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'imagePath',
      type: 'text',
      admin: {
        description: 'Fallback path to static media file (e.g. /media/cargo-1.jpg)',
      },
    },
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
    },
  ],
}
