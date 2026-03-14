import { getPayload } from 'payload'
import React from 'react'
import config from '@/payload.config'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  try {
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })
    const { docs: packages } = await payload.find({
      collection: 'packages',
      limit: 100,
    })

    return packages.map((pkg) => ({
      id: pkg.pid || pkg.id.toString(),
    }))
  } catch (error) {
    console.error('Failed to generate static params (Database might be inaccessible during build):', error)
    return []
  }
}

export default async function PackageDetailPage({ params }: { params: { id: string } }) {
  const { id } = params
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs: packages } = await payload.find({
    collection: 'packages',
    where: {
      pid: {
        equals: id,
      },
    },
  })

  if (packages.length === 0) {
    return notFound()
  }

  const pkg = packages[0]

  return (
    <div style={{ backgroundColor: 'var(--clr-bg)' }}>
      {/* Basic Navbar for Details Page */}
      <nav className="navbar scrolled">
        <div className="container" style={{ paddingInline: '30px' }}>
          <Link href="/" className="nav-logo-link">
            <img 
              src="/images/logo.png" 
              alt="Cussy Tourism Logo" 
              className="nav-logo-img"
              style={{ filter: 'none' }}
            />
          </Link>
          <div className="nav-links">
            <Link href="/" style={{ color: 'var(--clr-text-muted)' }}>Back to Home</Link>
          </div>
        </div>
      </nav>

      {/* Hero / Detail Content */}
      <div style={{ padding: '150px 20px 80px', minHeight: '100vh', textAlign: 'center', backgroundColor: 'var(--clr-bg-secondary)' }}>
        <span className="package-badge" style={{ position: 'static', marginBottom: '1rem', display: 'inline-block' }}>{pkg.badge}</span>
        <h1 className="section-title">Exploring {pkg.title}</h1>
        <p className="package-dest" style={{ marginBottom: '1rem' }}>{pkg.dest}</p>
        
        <div style={{ maxWidth: '800px', margin: '0 auto', marginBottom: '3rem' }}>
           <img 
             src={pkg.img} 
             alt={pkg.title} 
             style={{ borderRadius: '20px', boxShadow: 'var(--shadow-lg)', marginBottom: '2rem', width: '100%' }} 
           />
           <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '2rem' }}>
              <div style={{ textAlign: 'left' }}>
                <p style={{ fontWeight: 800, color: 'var(--clr-primary)' }}>PRICE</p>
                <p style={{ fontSize: '1.5rem', fontWeight: 800 }}>{pkg.price}</p>
              </div>
              <div style={{ textAlign: 'left' }}>
                <p style={{ fontWeight: 800, color: 'var(--clr-primary)' }}>DURATION</p>
                <p style={{ fontSize: '1.5rem', fontWeight: 800 }}>{pkg.duration}</p>
              </div>
              <div style={{ textAlign: 'left' }}>
                <p style={{ fontWeight: 800, color: 'var(--clr-primary)' }}>TOUR TYPE</p>
                <p style={{ fontSize: '1.5rem', fontWeight: 800 }}>{pkg.tour_type}</p>
              </div>
           </div>
           <p className="section-subtitle" style={{ margin: '0 auto' }}>
             This is a dynamic detail page powered by Payload CMS. You can edit all this content directly from your admin panel at /admin!
           </p>
        </div>

        <Link href="/" className="btn btn-primary" style={{ textDecoration: 'none' }}>
           Return to Destinations
        </Link>
      </div>
    </div>
  )
}
