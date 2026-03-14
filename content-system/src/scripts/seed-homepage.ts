import { getPayload } from 'payload'
import config from '../payload.config'

async function seed() {
  const payload = await getPayload({ config })

  console.log('Starting homepage seed...')

  await payload.updateGlobal({
    slug: 'homepage',
    data: {
      heroTitle: 'Your Gateway to Unforgettable Journeys',
      heroDescription: 'Experience the world like never before with Cussy Tourism.',
      stats: [
        { label: 'Destinations', value: 50, suffix: '+' },
        { label: 'Happy Travelers', value: 10000, suffix: '+' },
        { label: 'Expert Guides', value: 100, suffix: '+' },
      ],
      features: [
        {
          title: 'Curated Packages',
          description: 'Handpicked destinations for every type of traveler.',
          icon: '📍',
        },
        {
          title: 'Expert Support',
          description: '24/7 assistance throughout your journey.',
          icon: '🎧',
        },
        {
          title: 'Best Prices',
          description: 'Premium experiences at unbeatable rates.',
          icon: '💰',
        },
      ],
      testimonials: [
        {
          name: 'Rahul Sharma',
          initial: 'RS',
          tour: 'Family Traveler',
          quote: 'Cussy Tourism made our Kerala trip truly magical. Everything was perfectly organized!',
        },
        {
          name: 'Sarah Jonas',
          initial: 'SJ',
          tour: 'Adventure Enthusiast',
          quote: 'The Ladakh expedition was once-in-a-lifetime. Highly recommend their adventure tours.',
        },
      ],
      ctaTitle: 'Ready to Start Your Adventure?',
      ctaDescription: 'Join thousands of happy travelers and discover your next destination.',
    },
  })

  console.log('Homepage seed complete!')
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
