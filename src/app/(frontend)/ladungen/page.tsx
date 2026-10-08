import React from 'react'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { PageLivePreview } from '@/components/live-preview/PageLivePreview'
import { EditableSection } from '@/components/admin/EditableSection'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Ladungen & Flotte · Global Shipping & Logistics GmbH',
  description:
    'Neun Aufnahmen aus dem laufenden Umschlag. Alle Fotos zeigen reale Verladungen an unseren Ladeplätzen.',
}

interface CargoItemData {
  id?: string | number
  imagePath?: string
  image?: any
  title: string
  location: string
  alt: string
}

const FALLBACK_ITEMS: CargoItemData[] = [
  {
    imagePath: '/media/cargo-1.jpg',
    title: 'Stückgut · Kistenladung',
    location: 'Brake',
    alt: 'Verladung von Kistenladung im Hafen Brake',
  },
  {
    imagePath: '/media/cargo-2.jpg',
    title: 'Handysize · Break Bulk',
    location: 'Brake',
    alt: 'Frachtschiff am Kai in Brake bei der Beladung',
  },
  {
    imagePath: '/media/cargo-3.jpg',
    title: 'Projektladung · Großkomponenten',
    location: 'Brake',
    alt: 'Verladung schwerer Industrieanlagen mit bordeigenem Geschirr',
  },
  {
    imagePath: '/media/cargo-4.jpg',
    title: 'Stahlträger und Profile',
    location: 'Brake',
    alt: 'Stahlprofile werden im Laderaum eines Frachters gestaut',
  },
  {
    imagePath: '/media/cargo-5.jpg',
    title: 'Schüttgut · Verladung Kai',
    location: 'Brake',
    alt: 'Schüttgutumschlag an der Weser',
  },
  {
    imagePath: '/media/cargo-6.jpg',
    title: 'Kranarbeit · Bordskräne im Einsatz',
    location: 'Brake',
    alt: 'Schiffskräne beim Heben schwerer Kolli',
  },
  {
    imagePath: '/media/cargo-7.jpg',
    title: 'Hafen Wismar · Ostseeanbindung',
    location: 'Wismar',
    alt: 'Zweiter Ladehafen von GSL an der Ostsee',
  },
  {
    imagePath: '/media/cargo-8.jpg',
    title: 'Laderaum · Vorbereitung Stauung',
    location: 'Brake',
    alt: 'Blick in den geöffneten Laderaum vor der Beladung',
  },
  {
    imagePath: '/media/cargo-9.jpg',
    title: 'Abends am Pier · Weser',
    location: 'Brake',
    alt: 'Frachter am Pier in Brake im Abendlicht',
  },
]

export default async function LadungenPage() {
  const { isEnabled: isDraftMode } = await draftMode()
  let items: CargoItemData[] = FALLBACK_ITEMS
  let pageDoc: any = null

  try {
    const payload = await getPayload({ config })

    const pageRes = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'ladungen' } },
      draft: isDraftMode,
    })
    if (pageRes.docs?.[0]) {
      pageDoc = pageRes.docs[0]
    }

    const res = await payload.find({
      collection: 'cargo-items',
      sort: 'order',
    })
    if (res.docs && res.docs.length > 0) {
      items = res.docs as any
    }
  } catch (e) {
    console.error('Failed to fetch cargo items from Payload:', e)
  }

  if (!pageDoc) {
    pageDoc = {
      title: 'Ladungen & Flotte',
      slug: 'ladungen',
      heroTag: 'Ladungen & Flotte',
      heroTitle: 'Ladungen & Flotte',
      heroSubtitle:
        'Neun Aufnahmen aus dem laufenden Umschlag. Alle Fotos zeigen reale Verladungen an unseren Ladeplätzen.',
    }
  }

  return (
    <PageLivePreview
      initialPage={pageDoc}
      fallbackTitle="Ladungen & Flotte"
      fallbackSubtitle="Neun Aufnahmen aus dem laufenden Umschlag. Alle Fotos zeigen reale Verladungen an unseren Ladeplätzen."
      pageId="p-ladungen"
    >
      <section className="sec">
        <div className="wrap">
          <div className="grid3" style={{ gap: 18 }}>
            {items.map((item, idx) => {
              const imgSrc =
                typeof item.image === 'object' && (item.image?.sizes?.card?.url || item.image?.url)
                  ? item.image.sizes?.card?.url || item.image.url
                  : item.imagePath || `/media/cargo-${idx + 1}.jpg`

              const imgAlt =
                (typeof item.image === 'object' && item.image?.alt) || item.alt || item.title

              return (
                <EditableSection
                  key={item.title}
                  collection="cargo-items"
                  id={item.id}
                  title={`${item.title} bearbeiten`}
                >
                  <div className="ph hb" style={{ aspectRatio: '4/3' }}>
                    <img
                      src={imgSrc}
                      alt={imgAlt}
                      width={800}
                      height={600}
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="cap">
                      <b>{item.title}</b>
                      <span>{item.location}</span>
                    </div>
                  </div>
                </EditableSection>
              )
            })}
          </div>
        </div>
      </section>
    </PageLivePreview>
  )
}
