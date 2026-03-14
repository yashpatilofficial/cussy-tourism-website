import type { CollectionConfig } from 'payload'

export const Packages: CollectionConfig = {
  slug: 'packages',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true, // Make public for the frontend to read
  },
  fields: [
    {
      name: 'pid',
      label: 'Unique ID (e.g. kashmir)',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
    },
    {
      name: 'category',
      label: 'Category',
      type: 'text',
      required: true,
    },
    {
      name: 'img',
      label: 'Image URL',
      type: 'text',
      required: true,
    },
    {
      name: 'dest',
      label: 'Destination',
      type: 'text',
      required: true,
    },
    {
      name: 'duration',
      label: 'Duration',
      type: 'text',
      required: true,
    },
    {
      name: 'tour_type',
      label: 'Tour Type',
      type: 'text',
      required: true,
    },
    {
      name: 'price',
      label: 'Price',
      type: 'text',
      required: true,
    },
    {
      name: 'badge',
      label: 'Badge (Optional)',
      type: 'text',
    },
  ],
}
