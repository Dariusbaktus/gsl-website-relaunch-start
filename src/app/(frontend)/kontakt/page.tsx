import React from 'react'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { PageLivePreview } from '@/components/live-preview/PageLivePreview'
import { KontaktClient } from '@/components/KontaktClient'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Kontakt · Global Shipping & Logistics GmbH',
  description: 'Schüsselkorb 3, 28195 Bremen. Telefon +49 421 36060.',
}

export default async function KontaktPage() {
  const { isEnabled: isDraftMode } = await draftMode()
  let pageDoc: any = null

  try {
    const payload = await getPayload({ config })
    const pageRes = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'kontakt' } },
      draft: isDraftMode,
    })
    if (pageRes.docs?.[0]) {
      pageDoc = pageRes.docs[0]
    }
  } catch (e) {
    console.warn('Could not fetch kontakt page from Payload:', e)
  }

  if (!pageDoc) {
    pageDoc = {
      title: 'Kontakt',
      slug: 'kontakt',
      heroTag: 'Kontakt',
      heroTitle: 'Kontakt',
      heroSubtitle: 'Schüsselkorb 3, 28195 Bremen. Telefon +49 421 36060.',
    }
  }

  return (
    <PageLivePreview
      initialPage={pageDoc}
      fallbackTitle="Kontakt"
      fallbackSubtitle="Schüsselkorb 3, 28195 Bremen. Telefon +49 421 36060."
      pageId="p-kontakt"
    >
      <KontaktClient />
    </PageLivePreview>
  )
}
