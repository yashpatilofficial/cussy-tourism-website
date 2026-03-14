import type { CollectionConfig } from 'payload'

export const Subscribers: CollectionConfig = {
  slug: 'subscribers',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'createdAt'],
  },
  access: {
    create: () => true, // Anyone can subscribe
    read: ({ req: { user } }) => !!user, // Only admins can see the list
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
    },
    {
      name: 'source',
      type: 'text',
      admin: {
        readOnly: true,
      },
      defaultValue: 'Homepage Newsletter',
    },
  ],
  timestamps: true,
}
