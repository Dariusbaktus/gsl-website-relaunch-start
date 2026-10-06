import React from 'react'
import '@/styles/global.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { DraftBanner } from '@/components/DraftBanner'

import { getPayload } from 'payload'
import config from '@/payload.config'

export const metadata = {
  title: 'Global Shipping & Logistics GmbH',
  description: 'Ihr Partner für weltweite Seetransporte, Breakbulk und Projektladung.',
}

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  let logoUrl = '/images/logo.png'
  let logoAlt = 'Global Shipping & Logistics GmbH'

  try {
    const payload = await getPayload({ config })
    const settings = await payload.findGlobal({
      slug: 'site-settings',
      depth: 1,
    })

    if (settings?.logo && typeof settings.logo === 'object' && settings.logo.url) {
      logoUrl = settings.logo.url
      if (settings.logo.alt) {
        logoAlt = settings.logo.alt
      }
    }
  } catch (err) {
    console.error('Error fetching site-settings in layout:', err)
  }

  return (
    <html lang="de">
      <body>
        <DraftBanner />
        <Header logoUrl={logoUrl} logoAlt={logoAlt} />
        {children}
        <Footer logoUrl={logoUrl} logoAlt={logoAlt} />
      </body>
    </html>
  )
}
