import React from 'react'

export const metadata = {
  title: 'Global Shipping & Logistics GmbH',
  description: 'Ihr Partner für weltweite Seetransporte, Breakbulk und Projektladung.',
}

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  )
}
