import type { GlobalConfig } from 'payload'

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  label: 'Homepage Settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero Section',
          fields: [
            {
              name: 'heroTitle',
              type: 'text',
              label: 'Main Title',
              defaultValue: 'Discover the World\'s Most Beautiful Places',
              required: true,
            },
            {
              name: 'heroDescription',
              type: 'textarea',
              label: 'Description',
              defaultValue: 'From the majestic Himalayas to pristine beaches, from royal palaces to exotic international getaways — your dream vacation starts here.',
              required: true,
            },
            {
              name: 'heroSlides',
              type: 'array',
              label: 'Slider Images',
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
                {
                  name: 'alt',
                  type: 'text',
                  label: 'Alt Text',
                },
              ],
              minRows: 1,
            },
          ],
        },
        {
          label: 'Stats Section',
          fields: [
            {
              name: 'stats',
              type: 'array',
              label: 'Stats',
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'value',
                  type: 'number',
                  required: true,
                },
                {
                  name: 'suffix',
                  type: 'text',
                  defaultValue: '+',
                },
              ],
              maxRows: 4,
            },
          ],
        },
        {
          label: 'Features',
          fields: [
            {
              name: 'features',
              type: 'array',
              label: 'Features List',
              fields: [
                {
                  name: 'icon',
                  type: 'text',
                  label: 'Emoji Icon',
                  required: true,
                },
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'textarea',
                  required: true,
                },
              ],
              minRows: 1,
            },
          ],
        },
        {
          label: 'Testimonials',
          fields: [
            {
              name: 'testimonials',
              type: 'array',
              label: 'Guest Reviews',
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'initial',
                  type: 'text',
                  label: 'Author Initials',
                  required: true,
                },
                {
                  name: 'tour',
                  type: 'text',
                  label: 'Tour Detail',
                  required: true,
                },
                {
                  name: 'quote',
                  type: 'textarea',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: 'Bottom CTA',
          fields: [
            {
              name: 'ctaTitle',
              type: 'text',
              label: 'CTA Title',
              defaultValue: 'Ready for Your Next Adventure?',
            },
            {
              name: 'ctaDescription',
              type: 'textarea',
              label: 'CTA Description',
            },
            {
              name: 'ctaImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Background Image',
            },
          ],
        },
      ],
    },
  ],
}
