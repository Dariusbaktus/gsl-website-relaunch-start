'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { DepartureCards, DepartureItem } from '@/components/DepartureCards'

export function HomeHeroSection({ departures }: { departures?: DepartureItem[] }) {
  const [heroTag, setHeroTag] = useState('Aktuelle Abfahrten ab Brake — siehe Fahrpläne')

  return (
    <>
      <section className="hero">
        <video autoPlay muted loop playsInline poster="">
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        <div className="ov"></div>
        <div className="wrap">
          <div className="tag">
            <span className="dot"></span> {heroTag}
          </div>
          <h1>Zuverlässige und professionelle Logistiklösungen weltweit</h1>
          <p>Unkonventionelles Denken zur Optimierung von Versand- und Logistiklösungen.</p>
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
