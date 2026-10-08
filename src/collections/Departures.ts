import type { CollectionConfig } from 'payload'

export const Departures: CollectionConfig = {
  slug: 'departures',
  admin: {
    useAsTitle: 'vessel',
    defaultColumns: ['vessel', 'voy', 'port', 'laycan', 'status', 'gateDate'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'vessel',
      type: 'text',
      required: true,
    },
    {
      name: 'voy',
      type: 'text',
      required: true,
    },
    {
      name: 'port',
      type: 'select',
      defaultValue: 'Brake',
      required: true,
      options: [
        { label: 'Brake', value: 'Brake' },
        { label: 'Wismar', value: 'Wismar' },
        { label: 'Other', value: 'Other' },
      ],
    },
    {
      name: 'laycan',
      type: 'text',
      required: true,
    },
    {
      name: 'gateDate',
      type: 'text',
      required: true,
      admin: {
        description: 'Cutoff date (e.g. 27.08.2026) or YES',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'open',
      required: true,
      options: [
        { label: 'Gate offen', value: 'open' },
        { label: 'Bitte anfragen', value: 'soon' },
        { label: 'Booking Stop', value: 'stop' },
      ],
    },
    {
      name: 'destinations',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'port',
          type: 'text',
          required: true,
        },
        {
          name: 'eta',
          type: 'text',
          required: true,
        },
        {
          name: 'hasNote',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
    },
  ],
}
