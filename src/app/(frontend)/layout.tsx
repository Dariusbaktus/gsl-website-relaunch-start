import React from 'react'
import '@/styles/global.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { DraftBanner } from '@/components/DraftBanner'

export const metadata = {
  title: 'Global Shipping & Logistics GmbH',
  description: 'Ihr Partner für weltweite Seetransporte, Breakbulk und Projektladung.',
}

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>
        <DraftBanner />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
