import { getPayload } from 'payload'
import React from 'react'
import config from '@/payload.config'
import HomeClient from './HomeClient'
import './styles.css'

export default async function HomePage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  
  // Fetch packages from Payload CMS
  const { docs: packages } = await payload.find({
    collection: 'packages',
    limit: 100,
  })

  // Fetch homepage settings
  const homepage = await payload.findGlobal({
    slug: 'homepage',
  })

  return <HomeClient initialPackages={packages} homepage={homepage} />
}
