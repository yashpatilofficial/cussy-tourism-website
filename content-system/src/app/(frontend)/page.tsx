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
  
  const isBuild = process.env.NEXT_PHASE === 'phase-production-build'
  let packages: any[] = []
  let homepage: any = null

  if (!isBuild) {
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
      console.error('Data fetch failed (DB probably not ready):', error)
    }
  }

  return <HomeClient initialPackages={packages} homepage={homepage} />
}
