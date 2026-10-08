import React from 'react'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { HomePageLivePreview, HomePost, HomeShowcaseItem } from '@/components/live-preview/HomePageLivePreview'
import { DepartureItem } from '@/components/DepartureCards'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Global Shipping & Logistics GmbH · Linienagentur Bremen',
  description:
    'Linienagentur für Break Bulk, Projektladung und Massengut ab Brake und Wismar nach Nordamerika und in die Karibik.',
}

const FALLBACK_DEPARTURES: DepartureItem[] = [
  {
    vessel: 'SOLIDARNOSC',
    voy: 'Voy. 464WM · ab Brake',
    loadWindow: '29 Aug - 03 Sep',
    cutoffDate: '27.08.2026',
    destinations: [
      { port: 'Port Canaveral, FL — ASI', date: '17 Sep' },
      { port: 'Port Canaveral, FL — GT', date: '18 Sep' },
    ],
  },
  {
    vessel: 'ULTRA NAVIGATOR',
    voy: 'Voy. 467WM · ab Brake',
    loadWindow: '10- 15 Sep',
    cutoffDate: '03.09.2026',
    destinations: [
      { port: 'New Haven, CT', date: '29 Sep' },
      { port: 'Wilmington, NC', date: '04 Oct' },
    ],
  },
  {
    vessel: 'ULTRA PIONEER',
    voy: 'Voy. 468WM · ab Brake',
    loadWindow: '25- 30 Sep',
    cutoffDate: '18.09.2026',
    destinations: [
      { port: 'San Juan, PR', date: '14 Oct' },
      { port: 'Rio Haina, DO', date: '17 Oct' },
    ],
  },
]

const FALLBACK_POSTS: HomePost[] = [
  {
    slug: 'zellstoff-brake-rekordmonat',
    category: 'Hafen Brake',
    month: 'August 2026',
    title: '868.000 Tonnen Zellstoff: Wie Brake zum Drehkreuz für die Papierindustrie wurde',
    teaser:
      'Vor- und Nachlauf per Binnenschiff, gedeckte Lagerung direkt an der Kante und Umschlag ohne Witterungsrisiko. Ein Blick hinter die Kulissen des Zellstoff-Umschlags.',
  },
  {
    slug: 'karibik-linie-ausbau',
    category: 'Linienverkehr',
    month: 'Juli 2026',
    title: 'Zusätzliche Abfahrten Richtung San Juan und Rio Haina ab Herbst 2026',
    teaser:
      'Die Nachfrage nach verlässlichen Stückgutverbindungen in die Karibik wächst. GSL verdichtet den Takt ab Brake — mit festen Liegeplätzen und garantierten Ladefenstern.',
  },
  {
    slug: 'stahl-breakbulk-vs-container',
    category: 'Fachbeitrag',
    month: 'Juni 2026',
    title: 'Warum Break Bulk für Stahl und Rohre wieder wirtschaftlicher ist als der Container',
    teaser:
      'Verfügbarkeit von Spezialcontainern, Überhang-Zuschläge und Handling-Kosten: Wann sich der klassische Stückguttransport auf Handysize-Bulkern rechnet.',
  },
]

const FALLBACK_SHOWCASE: HomeShowcaseItem[] = [
  {
    title: 'Zellstoff',
    subtitle: '868.146 t in Brake, 2024',
    link: '/ladungen',
    imageUrl: '/media/home-1.jpg',
    imageAlt: 'Zwei Hafenarbeiter führen ein in Folie verpacktes Zellstoffpaket, das ein Kran an Bord hebt',
  },
  {
    title: 'Stahl & Rohre',
    subtitle: 'Break Bulk auf Handysize',
    link: '/ladungen',
    imageUrl: '/media/home-2.jpg',
    imageAlt: 'Vier Stahlrohre hängen an Hebegurten über dem geöffneten Laderaum',
  },
  {
    title: 'Projektladung',
    subtitle: 'Schwergut, unteilbar',
    link: '/ladungen',
    imageUrl: '/media/home-3.jpg',
    imageAlt: 'Ein zylindrisches Schwergutteil steht mit Ketten und Zurrgurten gesichert an Deck',
  },
  {
    title: 'Metalle',
    subtitle: 'Kupferkathoden und Stückgut',
    link: '/ladungen',
    imageUrl: '/media/home-4.jpg',
    imageAlt: 'Gestapelte Kupferkathoden auf Paletten am Kai',
  },
]

export default async function HomePage() {
  const { isEnabled: isDraftMode } = await draftMode()
  let departures: DepartureItem[] = FALLBACK_DEPARTURES
  let posts: HomePost[] = FALLBACK_POSTS
  let showcase: HomeShowcaseItem[] = FALLBACK_SHOWCASE
  let heroVideoUrl = '/videos/hero.mp4'
  let pageDoc: any = null

  try {
    const payload = await getPayload({ config })

    try {
      const siteSettings = await payload.findGlobal({
        slug: 'site-settings',
        depth: 1,
      })
      if (
        siteSettings?.heroVideo &&
        typeof siteSettings.heroVideo === 'object' &&
        siteSettings.heroVideo.url
      ) {
        heroVideoUrl = siteSettings.heroVideo.url
      }
    } catch (e) {
      console.warn('Could not load site-settings hero video:', e)
    }

    try {
      const pagesRes = await payload.find({
        collection: 'pages',
        where: { slug: { equals: 'home' } },
        depth: 2,
        draft: isDraftMode,
      })
      if (pagesRes.docs?.[0]) {
        pageDoc = pagesRes.docs[0]
        if (pagesRes.docs[0]?.homeShowcase?.length) {
          showcase = pagesRes.docs[0].homeShowcase.map((item: any) => ({
            title: item.title,
            subtitle: item.subtitle,
            link: item.link || '/ladungen',
            imageUrl:
              typeof item.image === 'object' && (item.image?.sizes?.card?.url || item.image?.url)
                ? item.image.sizes?.card?.url || item.image.url
                : '/media/home-1.jpg',
            imageAlt:
              (typeof item.image === 'object' && item.image?.alt) || item.title,
          }))
        }
      }
    } catch (e) {
      console.warn('Could not load home page from Payload:', e)
    }

    const depRes = await payload.find({
      collection: 'departures',
      where: {
        vessel: {
          in: ['SOLIDARNOSC', 'ULTRA NAVIGATOR', 'ULTRA PIONEER'],
        },
      },
      sort: 'order',
    })

    if (depRes.docs && depRes.docs.length > 0) {
      departures = depRes.docs.map((d: any) => ({
        vessel: d.vessel,
        voy: `${d.voy} · ab ${d.port}`,
        loadWindow: d.laycan,
        cutoffDate: d.gateDate,
        destinations: (d.destinations || []).map((dest: any) => ({
          port: dest.port,
          date: dest.eta,
        })),
      }))
    }

    const postRes = await payload.find({
      collection: 'posts',
      limit: 3,
      sort: '-createdAt',
      draft: isDraftMode,
    })

    if (postRes.docs && postRes.docs.length > 0) {
      posts = postRes.docs.map((p: any) => ({
        slug: p.slug,
        category: p.category,
        month: p.month,
        title: p.title,
        teaser: p.teaser,
      }))
    }
  } catch (e) {
    console.error('Failed to load dynamic data from Payload:', e)
  }

  if (!pageDoc) {
    pageDoc = {
      title: 'Startseite',
      slug: 'home',
      heroTag: 'Aktuelle Abfahrten ab Brake — siehe Fahrpläne',
      heroTitle: 'Zuverlässige und professionelle Logistiklösungen weltweit',
      heroSubtitle: 'Unkonventionelles Denken zur Optimierung von Versand- und Logistiklösungen.',
    }
  }

  return (
    <HomePageLivePreview
      initialPage={pageDoc}
      departures={departures}
      posts={posts}
      showcase={showcase}
      videoUrl={heroVideoUrl}
    />
  )
}
