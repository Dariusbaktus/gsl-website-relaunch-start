import React from 'react'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { HomeHeroSection } from '@/components/HomeHeroSection'
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
    loadWindow: '16 - 21 Sep',
    cutoffDate: '10.09.2026',
    destinations: [
      { port: 'Port Canaveral, FL — ASI', date: '05 Oct' },
      { port: 'Port Canaveral, FL — GT', date: '06 Oct' },
    ],
  },
]

interface HomePost {
  slug: string
  category: string
  month: string
  title: string
  teaser: string
}

const FALLBACK_POSTS: HomePost[] = [
  {
    slug: 'warum-ich-als-neue-hier-schreibe',
    category: 'Menschen',
    month: 'September 2026',
    title: 'Warum ich als Neue hier schreibe',
    teaser:
      'Auftakt der Serie: was ein Schiffsmakler eigentlich den ganzen Tag macht — erklärt von jemandem, der es selbst erst lernt.',
  },
  {
    slug: 'zellstoff-die-stille-hauptladung',
    category: 'Ladung',
    month: 'Oktober 2026',
    title: 'Zellstoff — die stille Hauptladung',
    teaser:
      '868.146 Tonnen gingen 2024 über Brake. Warum ausgerechnet Zellstoff, und was das für die Stauung bedeutet.',
  },
  {
    slug: 'warum-baltimore-und-wilmington',
    category: 'Routen',
    month: 'November 2026',
    title: 'Warum Baltimore und Wilmington',
    teaser:
      'Zwei Häfen, die auf keiner Containerkarte auffallen — und für Break Bulk trotzdem die erste Wahl sind.',
  },
]

export default async function HomePage() {
  let departures: DepartureItem[] = FALLBACK_DEPARTURES
  let posts: HomePost[] = FALLBACK_POSTS

  try {
    const payload = await getPayload({ config })

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
      sort: 'id',
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

  return (
    <div className="page on" id="p-home">
      <HomeHeroSection departures={departures} />

      <section className="sec">
        <div className="wrap">
          <div className="eyebrow">Just. Good. Service!</div>
          <h2>Wer wir sind</h2>
          <div className="rule"></div>
          <div className="grid2" style={{ gap: 44, alignItems: 'start' }}>
            <div>
              <p className="lead">
                Ansässig im Herzen von Bremen, verfolgt unser erfahrenes und engagiertes Team aus
                Schifffahrts- und Logistikexperten einen zukunftsorientierten Ansatz. Als Teil eines
                starken internationalen Netzwerks erbringt das Unternehmen seine Dienstleistungen
                weltweit.
              </p>
              <p style={{ color: '#41505C' }}>
                Vom Vor- und Nachlauf über die Zollabwicklung, Lagerhaltung und Logistiklösungen bis
                hin zum kombinierten Schienen-, Straßen- und Binnenschiffstransport sowie der
                Seefracht: wir koordinieren bei Bedarf den gesamten Tür-zu-Tür-Transport.
              </p>
              <Link href="/team" className="btn ghost" style={{ marginTop: 8, display: 'inline-block' }}>
                Das Team kennenlernen
              </Link>
            </div>
            <div className="grid2" style={{ gap: 16 }}>
              <div className="card">
                <div className="num">01</div>
                <h4>Multimodaler Transport</h4>
                <p style={{ fontSize: 15, color: '#41505C' }}>
                  Schienen-, Straßen- und Binnenschiffstransport sowie Seefracht — wir organisieren die
                  effizienteste Lösung.
                </p>
              </div>
              <div className="card">
                <div className="num">02</div>
                <h4>Expertise für komplexe Herausforderungen</h4>
                <p style={{ fontSize: 15, color: '#41505C' }}>
                  Spezialisierung auf Stückgut- und Schwerlasttransporte, Gefahrgut, Projektladung,
                  FCL und LCL.
                </p>
              </div>
              <div className="card" style={{ gridColumn: '1/-1' }}>
                <div className="num">03</div>
                <h4>Ein Ansprechpartner</h4>
                <p style={{ fontSize: 15, color: '#41505C' }}>
                  Von der Anfrage bis zur Ablieferung ein fester Ansprechpartner — keine Warteschleife,
                  keine Weiterleitung.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sec grey">
        <div className="wrap">
          <div className="eyebrow">Ladungen</div>
          <h2>Was wir bewegen</h2>
          <div className="rule"></div>
          <p className="lead" style={{ marginBottom: 32 }}>
            Schüttgut, Break Bulk und Projektladung — ab Brake und Wismar.
          </p>
          <div className="grid4">
            <Link href="/ladungen" className="ph hb" style={{ textDecoration: 'none' }}>
              <img
                src="/media/home-1.jpg"
                alt="Zwei Hafenarbeiter führen ein in Folie verpacktes Zellstoffpaket, das ein Kran an Bord hebt"
                width={1000}
                height={750}
                loading="lazy"
                decoding="async"
              />
              <div className="cap">
                <b>Zellstoff</b>
                <span>868.146 t in Brake, 2024</span>
              </div>
            </Link>
            <Link href="/ladungen" className="ph hb" style={{ textDecoration: 'none' }}>
              <img
                src="/media/home-2.jpg"
                alt="Vier Stahlrohre hängen an Hebegurten über dem geöffneten Laderaum"
                width={1000}
                height={750}
                loading="lazy"
                decoding="async"
              />
              <div className="cap">
                <b>Stahl &amp; Rohre</b>
                <span>Break Bulk auf Handysize</span>
              </div>
            </Link>
            <Link href="/ladungen" className="ph hb" style={{ textDecoration: 'none' }}>
              <img
                src="/media/home-3.jpg"
                alt="Ein zylindrisches Schwergutteil steht mit Ketten und Zurrgurten gesichert an Deck"
                width={1000}
                height={750}
                loading="lazy"
                decoding="async"
              />
              <div className="cap">
                <b>Projektladung</b>
                <span>Schwergut, unteilbar</span>
              </div>
            </Link>
            <Link href="/ladungen" className="ph hb" style={{ textDecoration: 'none' }}>
              <img
                src="/media/home-4.jpg"
                alt="Gestapelte Kupferkathoden auf Paletten am Kai"
                width={1000}
                height={750}
                loading="lazy"
                decoding="async"
              />
              <div className="cap">
                <b>Metalle</b>
                <span>Kupferkathoden und Stückgut</span>
              </div>
            </Link>
          </div>
          <Link href="/ladungen" className="btn" style={{ marginTop: 28, display: 'inline-block' }}>
            Zur Mediathek
          </Link>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="eyebrow">Aktuelles</div>
          <h2>Aus dem Hafen</h2>
          <div className="rule"></div>
          <div className="grid3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/news/${post.slug}`}
                className="card link"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div
                  style={{
                    fontSize: 11.5,
                    fontWeight: 700,
                    letterSpacing: '.07em',
                    textTransform: 'uppercase',
                    color: 'var(--red)',
                    marginBottom: 8,
                  }}
                >
                  {post.category}
                </div>
                <div style={{ fontSize: 13.5, color: 'var(--muted)', marginBottom: 8 }}>
                  {post.month}
                </div>
                <h3>{post.title}</h3>
                <p style={{ fontSize: 15, color: '#41505C', margin: 0 }}>{post.teaser}</p>
              </Link>
            ))}
          </div>
          <Link href="/news" className="btn ghost" style={{ marginTop: 28, display: 'inline-block' }}>
            Alle Beiträge
          </Link>
        </div>
      </section>

      <section className="sec" style={{ background: 'var(--navy)', color: '#fff' }}>
        <div className="wrap" style={{ textAlign: 'center' }}>
          <h2 style={{ color: '#fff' }}>Eine Anfrage, ein Ansprechpartner</h2>
          <div className="rule" style={{ margin: '0 auto 24px' }}></div>
          <p
            style={{
              color: '#C3D2DC',
              maxWidth: 620,
              margin: '0 auto 28px',
              fontSize: 18,
            }}
          >
            Rufen Sie durch oder schreiben Sie uns. Sie landen direkt bei der Person, die Ihre
            Ladung betreut — nicht in einer Warteschleife.
          </p>
          <Link href="/kontakt" className="btn onDark" style={{ display: 'inline-block' }}>
            Kontakt aufnehmen
          </Link>
        </div>
      </section>
    </div>
  )
}
