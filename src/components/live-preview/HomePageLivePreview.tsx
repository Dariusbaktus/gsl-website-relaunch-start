'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import { useLivePreview } from '@payloadcms/live-preview-react'
import { HomeHeroSection } from '@/components/HomeHeroSection'
import { DepartureItem } from '@/components/DepartureCards'
import { EditableSection } from '@/components/admin/EditableSection'
import { FrontendAdminBar } from '@/components/admin/FrontendAdminBar'
import { useAdmin } from '@/components/admin/AdminContext'

export interface HomePost {
  slug: string
  category: string
  month: string
  title: string
  teaser: string
}

export interface HomeShowcaseItem {
  title: string
  subtitle: string
  link: string
  imageUrl: string
  imageAlt: string
}

interface HomePageLivePreviewProps {
  initialPage: any
  departures: DepartureItem[]
  posts: HomePost[]
  showcase: HomeShowcaseItem[]
  videoUrl?: string
}

export function HomePageLivePreview({
  initialPage,
  departures,
  posts,
  showcase: initialShowcase,
  videoUrl,
}: HomePageLivePreviewProps) {
  const { data: page } = useLivePreview<any>({
    initialData: initialPage,
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3002',
    depth: 2,
  })

  const { registerLiveDoc, liveDocState } = useAdmin()

  useEffect(() => {
    if (page?.id) {
      return registerLiveDoc(page.id, page)
    }
  }, [page, registerLiveDoc])

  const docId = page?.id ? String(page.id) : null
  const currentLive = docId && liveDocState[docId] ? { ...page, ...liveDocState[docId] } : page

  // Derive showcase items from page live data if homeShowcase is updated
  let showcase = initialShowcase
  if (currentLive?.homeShowcase?.length) {
    showcase = currentLive.homeShowcase.map((item: any) => ({
      title: item.title,
      subtitle: item.subtitle,
      link: item.link || '/ladungen',
      imageUrl:
        typeof item.image === 'object' && (item.image?.sizes?.card?.url || item.image?.url)
          ? item.image.sizes?.card?.url || item.image.url
          : '/media/home-1.jpg',
      imageAlt: (typeof item.image === 'object' && item.image?.alt) || item.title,
    }))
  }

  return (
    <>
      <FrontendAdminBar
        collection="pages"
        id={currentLive?.id}
        title={currentLive?.title || 'Startseite'}
        status={currentLive?._status || 'published'}
      />

      <div className="page on" id="p-home">
        <EditableSection
          collection="pages"
          id={currentLive?.id}
          title="Hero-Bereich"
          initialData={currentLive}
        >
          <HomeHeroSection
            departures={departures}
            videoUrl={videoUrl}
            pageId={currentLive?.id}
            heroTitle={currentLive?.heroTitle || 'Zuverlässige und professionelle Logistiklösungen weltweit'}
            heroSubtitle={currentLive?.heroSubtitle || 'Unkonventionelles Denken zur Optimierung von Versand- und Logistiklösungen.'}
            initialHeroTag={currentLive?.heroTag || 'Aktuelle Abfahrten ab Brake — siehe Fahrpläne'}
          />
        </EditableSection>

        <EditableSection
          collection="pages"
          id={currentLive?.id}
          title="Unternehmensprofil"
          initialData={currentLive}
        >
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
        </EditableSection>

        <EditableSection
          collection="pages"
          id={currentLive?.id}
          title="Ladungsgalerie"
          initialData={currentLive}
        >
          <section className="sec grey">
            <div className="wrap">
              <div className="eyebrow">Ladungen</div>
              <h2>Was wir bewegen</h2>
              <div className="rule"></div>
              <p className="lead" style={{ marginBottom: 32 }}>
                Schüttgut, Break Bulk und Projektladung — ab Brake und Wismar.
              </p>
              <div className="grid4">
                {showcase.map((item, idx) => (
                  <Link key={idx} href={item.link} className="ph hb" style={{ textDecoration: 'none' }}>
                    <img
                      src={item.imageUrl}
                      alt={item.imageAlt}
                      width={1000}
                      height={750}
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="cap">
                      <b>{item.title}</b>
                      <span>{item.subtitle}</span>
                    </div>
                  </Link>
                ))}
              </div>
              <Link href="/ladungen" className="btn" style={{ marginTop: 28, display: 'inline-block' }}>
                Zur Mediathek
              </Link>
            </div>
          </section>
        </EditableSection>

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

        <EditableSection
          collection="pages"
          id={currentLive?.id}
          title="CTA-Bereich"
          initialData={currentLive}
        >
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
        </EditableSection>
      </div>
    </>
  )
}
