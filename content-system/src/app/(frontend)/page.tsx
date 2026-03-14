import { getPayload } from 'payload'
import React from 'react'
import config from '@/payload.config'
import HomeClient from './HomeClient'
import './styles.css'

export const dynamic = 'force-dynamic'
export const revalidate = 0

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
    console.error('Build Error: Database table probably does not exist yet.', error)
  }

  return <HomeClient initialPackages={packages} homepage={homepage} />
}
