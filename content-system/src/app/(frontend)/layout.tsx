import React from 'react'
import './styles.css'

export const metadata = {
  description: 'Premium Tour Packages with Cussy Tourism Pvt. Ltd.',
  title: 'Cussy Tourism — Your Dream Vacation Starts Here',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
