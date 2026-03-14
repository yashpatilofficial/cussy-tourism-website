import { getPayload } from 'payload'
import config from '../payload.config'

const packages = [
  {
    pid: 'kashmir',
    title: 'Magical Kashmir — Srinagar, Gulmarg & Pahalgam',
    category: 'india',
    img: '/images/destination-kashmir.png',
    dest: 'India · Kashmir',
    duration: '5 Nights / 6 Days',
    tour_type: 'Group Tour',
    price: '₹32,999',
    badge: 'Bestseller',
  },
  {
    pid: 'kerala',
    title: 'Wonders of Kerala — Munnar, Alleppey & Cochin',
    category: 'india honeymoon',
    img: '/images/destination-kerala.png',
    dest: 'India · Kerala',
    duration: '4 Nights / 5 Days',
    tour_type: 'Family Tour',
    price: '₹24,999',
    badge: 'Popular',
  },
  {
    pid: 'europe',
    title: 'Best of Europe — Paris, Swiss Alps & Santorini',
    category: 'international honeymoon',
    img: '/images/destination-europe.png',
    dest: 'International · Europe',
    duration: '10 Nights / 11 Days',
    tour_type: 'All Inclusive',
    price: '₹1,49,999',
    badge: 'Premium',
  },
  {
    pid: 'rajasthan',
    title: 'Royal Rajasthan — Jaipur, Udaipur & Jaisalmer',
    category: 'india family',
    img: '/images/destination-rajasthan.png',
    dest: 'India · Rajasthan',
    duration: '6 Nights / 7 Days',
    tour_type: 'Family Tour',
    price: '₹28,999',
    badge: 'Royal',
  },
  {
    pid: 'dubai',
    title: 'Dazzling Dubai — Burj Khalifa, Safari & Marina',
    category: 'international',
    img: '/images/destination-dubai.png',
    dest: 'International · Dubai',
    duration: '5 Nights / 6 Days',
    tour_type: 'Group Tour',
    price: '₹59,999',
    badge: 'Luxury',
  },
  {
    pid: 'ladakh',
    title: 'Ladakh Explorer — Pangong, Nubra & Khardungla',
    category: 'india adventure',
    img: '/images/destination-ladakh.png',
    dest: 'India · Ladakh',
    duration: '7 Nights / 8 Days',
    tour_type: 'Adventure Tour',
    price: '₹35,999',
    badge: 'Adventure',
  },
]

async function seed() {
  const payload = await getPayload({ config })

  console.log('Starting seed...')

  for (const pkg of packages) {
    // Check if it already exists
    const existing = await payload.find({
      collection: 'packages',
      where: {
        pid: {
          equals: pkg.pid,
        },
      },
    })

    if (existing.docs.length > 0) {
      console.log(`Package ${pkg.pid} already exists, updating...`)
      await payload.update({
        collection: 'packages',
        id: existing.docs[0].id,
        data: pkg,
      })
    } else {
      console.log(`Creating package ${pkg.pid}...`)
      await payload.create({
        collection: 'packages',
        data: pkg,
      })
    }
  }

  console.log('Seed complete!')
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
