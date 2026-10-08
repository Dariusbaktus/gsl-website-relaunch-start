import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      defaultValue: 'Global Shipping & Logistics GmbH',
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Main website logo (used in Header and Footer)',
      },
    },
    {
      name: 'heroVideo',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Background video for homepage hero section',
      },
    },
  ],
}
