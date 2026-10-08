'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { DepartureCards, DepartureItem } from '@/components/DepartureCards'
import { InlineText } from '@/components/admin/InlineText'

export function HomeHeroSection({
  departures,
  videoUrl = '/videos/hero.mp4',
  heroTitle = 'Zuverlässige und professionelle Logistiklösungen weltweit',
  heroSubtitle = 'Unkonventionelles Denken zur Optimierung von Versand- und Logistiklösungen.',
  initialHeroTag = 'Aktuelle Abfahrten ab Brake — siehe Fahrpläne',
  pageId,
}: {
  departures?: DepartureItem[]
  videoUrl?: string
  heroTitle?: string
  heroSubtitle?: string
  initialHeroTag?: string
  pageId?: string | number
}) {
  const [heroTag, setHeroTag] = useState(initialHeroTag)

  return (
    <>
      <section className="hero">
        <video autoPlay muted loop playsInline poster="">
          <source src={videoUrl} type="video/mp4" />
        </video>
        <div className="ov"></div>
        <div className="wrap">
          <div className="tag">
            <span className="dot"></span>{' '}
            <InlineText
              collection="pages"
              id={pageId}
              field="heroTag"
              value={heroTag}
              label="Kategorie / Tagline"
              fallback="Aktuelle Abfahrten ab Brake — siehe Fahrpläne"
            />
          </div>
          <h1>
            <InlineText
              collection="pages"
              id={pageId}
              field="heroTitle"
              value={heroTitle}
              label="Hauptüberschrift (Hero Title)"
              fallback="Zuverlässige und professionelle Logistiklösungen weltweit"
            />
          </h1>
          <p>
            <InlineText
              collection="pages"
              id={pageId}
              field="heroSubtitle"
              value={heroSubtitle}
              label="Untertitel / Beschreibung"
              multiline
              fallback="Unkonventionelles Denken zur Optimierung von Versand- und Logistiklösungen."
            />
          </p>
          <div className="acts">
            <Link href="/fahrplaene" className="btn onDark">
              Fahrpläne ansehen
            </Link>
            <Link href="/kontakt" className="btn ghostDark">
              Kontakt aufnehmen
            </Link>
          </div>
        </div>
      </section>

      <section className="sec grey">
        <div className="wrap">
          <div className="eyebrow">Aktuelle Abfahrten</div>
          <h2>Die nächsten Schiffe ab Brake</h2>
          <div className="rule"></div>
          <p className="lead" style={{ marginBottom: 32 }}>
            Automatisch aus der Fahrplandatei. Stand 20.08.2026.
          </p>
          <DepartureCards items={departures} onUpdateTag={setHeroTag} />
          <Link href="/fahrplaene" className="btn" style={{ marginTop: 28, display: 'inline-block' }}>
            Alle Abfahrten ansehen
          </Link>
        </div>
      </section>
    </>
  )
}
