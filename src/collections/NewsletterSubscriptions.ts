import type { CollectionConfig } from 'payload'

export const NewsletterSubscriptions: CollectionConfig = {
  slug: 'newsletter-subscriptions',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'confirmed', 'createdAt'],
  },
  access: {
    create: () => true,
    read: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
    },
    {
      name: 'routes',
      type: 'json',
      admin: {
        description: 'Selected trade routes',
      },
    },
    {
      name: 'confirmed',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
}
