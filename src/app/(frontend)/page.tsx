'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { DepartureCards } from '@/components/DepartureCards'

export default function HomePage() {
  const [heroTag, setHeroTag] = useState('Aktuelle Abfahrten ab Brake — siehe Fahrpläne')

  return (
    <div className="page on" id="p-home">
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
          <DepartureCards onUpdateTag={setHeroTag} />
          <Link href="/fahrplaene" className="btn" style={{ marginTop: 28, display: 'inline-block' }}>
            Alle Abfahrten ansehen
          </Link>
        </div>
      </section>

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
            <Link
              href="/news/warum-ich-als-neue-hier-schreibe"
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
                Menschen
              </div>
              <div style={{ fontSize: 13.5, color: 'var(--muted)', marginBottom: 8 }}>
                September 2026
              </div>
              <h3>Warum ich als Neue hier schreibe</h3>
              <p style={{ fontSize: 15, color: '#41505C', margin: 0 }}>
                Auftakt der Serie: was ein Schiffsmakler eigentlich den ganzen Tag macht — erklärt
                von jemandem, der es selbst erst lernt.
              </p>
            </Link>
            <Link
              href="/news/zellstoff-die-stille-hauptladung"
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
                Ladung
              </div>
              <div style={{ fontSize: 13.5, color: 'var(--muted)', marginBottom: 8 }}>
                Oktober 2026
              </div>
              <h3>Zellstoff — die stille Hauptladung</h3>
              <p style={{ fontSize: 15, color: '#41505C', margin: 0 }}>
                868.146 Tonnen gingen 2024 über Brake. Warum ausgerechnet Zellstoff, und was das für
                die Stauung bedeutet.
              </p>
            </Link>
            <Link
              href="/news/warum-baltimore-und-wilmington"
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
                Routen
              </div>
              <div style={{ fontSize: 13.5, color: 'var(--muted)', marginBottom: 8 }}>
                November 2026
              </div>
              <h3>Warum Baltimore und Wilmington</h3>
              <p style={{ fontSize: 15, color: '#41505C', margin: 0 }}>
                Zwei Häfen, die auf keiner Containerkarte auffallen — und für Break Bulk trotzdem
                die erste Wahl sind.
              </p>
            </Link>
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
