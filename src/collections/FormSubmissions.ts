import type { CollectionConfig } from 'payload'

export const FormSubmissions: CollectionConfig = {
  slug: 'form-submissions',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'company', 'email', 'inquiryType', 'createdAt'],
  },
  access: {
    create: () => true, // Allows submissions from public frontend
    read: ({ req: { user } }) => Boolean(user), // Authenticated users only
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'company',
      type: 'text',
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'inquiryType',
      type: 'text',
    },
    {
      name: 'loadPort',
      type: 'text',
    },
    {
      name: 'destinationPort',
      type: 'text',
    },
    {
      name: 'message',
      type: 'textarea',
    },
    {
      name: 'gdprConsent',
      type: 'checkbox',
      defaultValue: false,
      required: true,
    },
  ],
}
