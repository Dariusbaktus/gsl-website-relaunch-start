import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data }) => {
        const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3002'
        const path = data?.slug === 'home' ? '' : `/${data?.slug || ''}`
        return `${serverURL}${path}`
      },
    },
    preview: (data) => {
      const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3002'
      const path = data?.slug === 'home' ? '' : `/${data?.slug || ''}`
      return `${serverURL}/api/draft?url=${encodeURIComponent(path || '/')}`
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
      name: 'meta',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'description',
          type: 'textarea',
        },
      ],
    },
    {
      name: 'heroTag',
      type: 'text',
    },
    {
      name: 'heroTitle',
      type: 'text',
    },
    {
      name: 'heroSubtitle',
      type: 'textarea',
    },
    {
      name: 'homeShowcase',
      type: 'array',
      admin: {
        description: 'Showcase tiles on the homepage (Was wir bewegen)',
        condition: (data) => data?.slug === 'home',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'subtitle',
          type: 'text',
          required: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'link',
          type: 'text',
          defaultValue: '/ladungen',
        },
      ],
    },
  ],
}
