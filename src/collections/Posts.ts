import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'month', '_status', 'updatedAt'],
    livePreview: {
      url: ({ data }) => {
        const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3002'
        return `${serverURL}/news/${data?.slug || ''}`
      },
    },
    preview: (data) => {
      const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3002'
      return `${serverURL}/api/draft?url=${encodeURIComponent(`/news/${data?.slug || ''}`)}`
    },
  },
  versions: {
    drafts: true,
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
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Ladung', value: 'Ladung' },
        { label: 'Routen', value: 'Routen' },
        { label: 'Menschen', value: 'Menschen' },
        { label: 'Fachwissen', value: 'Fachwissen' },
        { label: 'Historie', value: 'Historie' },
      ],
    },
    {
      name: 'month',
      type: 'text',
      required: true,
    },
    {
      name: 'teaser',
      type: 'textarea',
      required: true,
    },
    {
      name: 'statusTag',
      type: 'select',
      defaultValue: 'entwurf',
      options: [
        { label: 'Entwurf liegt vor', value: 'entwurf' },
        { label: 'Rohfassung — Besuch in Brake steht aus', value: 'roh' },
      ],
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'thumbnailAlt',
      type: 'text',
    },
    {
      name: 'body',
      type: 'json',
      required: false,
      defaultValue: [],
      admin: {
        description: 'Structured array of content tuples [type, text]',
      },
    },
  ],
}
