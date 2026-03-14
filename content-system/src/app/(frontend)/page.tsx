import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import React from 'react'
import config from '@/payload.config'
import HomeClient from './HomeClient'
import './styles.css'

export default async function HomePage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  
  let packages: any[] = []
  let homepage: any = null

  try {
    // Fetch packages from Payload CMS
    const packagesRes = await payload.find({
      collection: 'packages',
      limit: 100,
    })
    packages = packagesRes.docs

    // Fetch homepage settings
    homepage = await payload.findGlobal({
      slug: 'homepage',
    })
  } catch (error) {
    console.error('Data fetch failed during build (this is expected if DB is remote):', error)
  }

  return <HomeClient initialPackages={packages} homepage={homepage} />
}
