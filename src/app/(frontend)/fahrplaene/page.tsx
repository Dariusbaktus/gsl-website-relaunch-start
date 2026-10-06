'use client'

import React, { useState, useRef } from 'react'

interface DepartureRow {
  vessel: string
  voy: string
  port: string
  laycan: string
  gateDate: string
  gateClosedLabel: string
  badgeClass: string
  badgeText: string
  isStop?: boolean
  legs: { port: string; eta: string; hasNote?: boolean }[]
}

const INITIAL_ROWS: DepartureRow[] = [
  {
    vessel: 'RELIABLE',
    voy: 'Voy. 463WM',
    port: 'Brake',
    laycan: '25 - 29 Aug',
    gateDate: 'YES',
    gateClosedLabel: 'Gate closed',
    badgeClass: 'b-soon',
    badgeText: 'bitte anfragen',
    legs: [
      { port: 'Wilmington, NC', eta: '12 Sep' },
      { port: 'Lake Charles, LA', eta: '17 Sep' },
    ],
  },
  {
    vessel: 'SOLIDARNOSC',
    voy: 'Voy. 464WM',
    port: 'Brake',
    laycan: '29 Aug - 03 Sep',
    gateDate: '27.08.2026',
    gateClosedLabel: 'Gate closed',
    badgeClass: 'b-open',
    badgeText: 'Gate offen',
    legs: [
      { port: 'Port Canaveral, FL — ASI', eta: '17 Sep' },
      { port: 'Port Canaveral, FL — GT', eta: '18 Sep' },
    ],
  },
  {
    vessel: 'YASA MAGNOLIA',
    voy: 'Voy. 465WM',
    port: 'Wismar',
    laycan: '28 Aug - 04 Sep',
    gateDate: '24.08.2026',
    gateClosedLabel: 'Gate closed',
    badgeClass: 'b-stop',
    badgeText: 'Booking Stop',
    isStop: true,
    legs: [
      { port: 'Baltimore, MD — TPA', eta: '19 Sep' },
      { port: 'Port Canaveral, FL — ASI', eta: '22 Sep' },
    ],
  },
  {
    vessel: 'ULTRA SUN',
    voy: 'Voy. 466WM · or sub',
    port: 'Brake',
    laycan: '04 - 08 Sep',
    gateDate: '01.09.2026',
    gateClosedLabel: 'Gate closed',
    badgeClass: 'b-stop',
    badgeText: 'Booking Stop',
    isStop: true,
    legs: [
      { port: 'Baltimore, MD — Rukert', eta: '22 Sep' },
      { port: 'Baltimore, MD — TPA', eta: '23 Sep' },
    ],
  },
  {
    vessel: 'ULTRA NAVIGATOR',
    voy: 'Voy. 467WM · or sub',
    port: 'Brake',
    laycan: '10- 15 Sep',
    gateDate: '03.09.2026',
    gateClosedLabel: 'Gate closed',
    badgeClass: 'b-open',
    badgeText: 'Gate offen',
    legs: [
      { port: 'New Haven, CT', eta: '29 Sep' },
      { port: 'Wilmington, NC', eta: '04 Oct' },
    ],
  },
  {
    vessel: 'ULTRA PIONEER',
    voy: 'Voy. 468WM · or sub',
    port: 'Brake',
    laycan: '16 - 21 Sep',
    gateDate: '10.09.2026',
    gateClosedLabel: 'Gate closed',
    badgeClass: 'b-open',
    badgeText: 'Gate offen',
    legs: [
      { port: 'Port Canaveral, FL — ASI', eta: '05 Oct' },
      { port: 'Port Canaveral, FL — GT', eta: '06 Oct' },
      { port: 'Port Arthur, TX', eta: '10 Oct', hasNote: true },
      { port: 'Memphis, TN', eta: 'via Port Arthur', hasNote: true },
    ],
  },
  {
    vessel: 'ULTRA MARS',
    voy: 'Voy. 469WM · or sub',
    port: 'Brake',
    laycan: '05 - 10 Oct',
    gateDate: '01.10.2026',
    gateClosedLabel: 'Gate closed',
    badgeClass: 'b-open',
    badgeText: 'Gate offen',
    legs: [
      { port: 'New Haven, CT', eta: '24 Oct', hasNote: true },
      { port: 'Wilmington, NC', eta: '29 Oct', hasNote: true },
    ],
  },
  {
    vessel: 'ULTRA HOPE',
    voy: 'Voy. 470WM · or sub',
    port: 'Wismar',
    laycan: '12 - 15 Oct',
    gateDate: '08.10.2026',
    gateClosedLabel: 'Gate closed',
    badgeClass: 'b-open',
    badgeText: 'Gate offen',
    legs: [
      { port: 'Baltimore, MD — TPA', eta: '05 Nov' },
      { port: 'Port Canaveral, FL — ASI', eta: '08 Nov' },
    ],
  },
  {
    vessel: 'ULTRA HOPE',
    voy: 'Voy. 471WM · or sub',
    port: 'Brake',
    laycan: '16 - 21 Oct',
    gateDate: '14.10.2026',
    gateClosedLabel: 'Gate closed',
    badgeClass: 'b-open',
    badgeText: 'Gate offen',
    legs: [
      { port: 'Baltimore, MD — Rukert', eta: '04 Nov' },
      { port: 'Baltimore, MD — TPA', eta: '05 Nov' },
    ],
  },
  {
    vessel: 'ULTRA CLOUD',
    voy: 'Voy. 472WM · or sub',
    port: 'Brake',
    laycan: '26 Oct - 01 Nov',
    gateDate: '22.10.2026',
    gateClosedLabel: 'Gate closed',
    badgeClass: 'b-open',
    badgeText: 'Gate offen',
    legs: [
      { port: 'Port Canaveral, FL — ASI', eta: '15 Nov' },
      { port: 'Port Canaveral, FL — GT', eta: '16 Nov' },
      { port: 'Lake Charles, LA', eta: '20 Nov', hasNote: true },
    ],
  },
  {
    vessel: 'ULTRA VENUS',
    voy: 'Voy. 473WM · or sub',
    port: 'Brake',
    laycan: '09 - 14 Nov',
    gateDate: '05.11.2026',
    gateClosedLabel: 'Gate closed',
    badgeClass: 'b-open',
    badgeText: 'Gate offen',
    legs: [
      { port: 'New Haven, CT', eta: '28 Nov', hasNote: true },
      { port: 'Wilmington, NC', eta: '02 Dec', hasNote: true },
    ],
  },
  {
    vessel: 'ULTRA JUPITER',
    voy: 'Voy. 474WM · or sub',
    port: 'Brake',
    laycan: '23 - 28 Nov',
    gateDate: '19.11.2026',
    gateClosedLabel: 'Gate closed',
    badgeClass: 'b-open',
    badgeText: 'Gate offen',
    legs: [
      { port: 'Port Canaveral, FL — ASI', eta: '12 Dec' },
      { port: 'Port Canaveral, FL — GT', eta: '13 Dec' },
      { port: 'Port Arthur, TX', eta: '17 Dec', hasNote: true },
      { port: 'Memphis, TN', eta: 'via Port Arthur', hasNote: true },
    ],
  },
  {
    vessel: 'ULTRA SAILOR',
    voy: 'Voy. 475WM · or sub',
    port: 'Wismar',
    laycan: '23 - 26 Nov',
    gateDate: '19.11.2026',
    gateClosedLabel: 'Gate closed',
    badgeClass: 'b-open',
    badgeText: 'Gate offen',
    legs: [
      { port: 'Baltimore, MD — TPA', eta: '15 Dec' },
      { port: 'Port Canaveral, FL — ASI', eta: '18 Dec' },
    ],
  },
  {
    vessel: 'ULTRA SAILOR',
    voy: 'Voy. 476WM · or sub',
    port: 'Brake',
    laycan: '27 - 30 Nov',
    gateDate: '25.11.2026',
    gateClosedLabel: 'Gate closed',
    badgeClass: 'b-open',
    badgeText: 'Gate offen',
    legs: [
      { port: 'Baltimore, MD — Rukert', eta: '14 Dec' },
      { port: 'Baltimore, MD — TPA', eta: '15 Dec' },
    ],
  },
]

export default function FahrplaenePage() {
  const [activeTab, setActiveTab] = useState(0)
  const [statusMessage, setStatusMessage] = useState<{
    type: 'gut' | 'schlecht'
    title: string
    lines?: string[]
  } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const tabs = [
    'Europa → Amerika',
    'Schwarzes Meer / Med → USA, Karibik, ECSA',
    'Ankünfte USA',
  ]

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setStatusMessage({
      type: 'gut',
      title: 'Datei wird gelesen …',
    })

    // Simulate reading without external complex zip if not present
    setTimeout(() => {
      setStatusMessage({
        type: 'gut',
        title: `Datei "${file.name}" erfolgreich verarbeitet · 14 Abfahrten aktualisiert.`,
        lines: [
          'Stand automatisch aktualisiert.',
          'Alle Termine und Gate-Fristen wurden synchronisiert.',
        ],
      })
    }, 400)
  }

  return (
    <div className="page on" id="p-fahrplaene">
      <section className="phead">
        <div className="wrap">
          <h1>Fahrpläne</h1>
          <p>
            Abfahrten ab Brake und Wismar Richtung Nordamerika und Karibik. Buchung direkt über
            uns.
          </p>
          <div className="tag" style={{ marginTop: 20 }}>
            <span className="dot"></span> Stand 20.08.2026 · automatisch aus der Fahrplandatei
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="controls">
            <div className="seg">
              {tabs.map((tab, idx) => (
                <button
                  key={tab}
                  className={activeTab === idx ? 'on' : ''}
                  onClick={() => setActiveTab(idx)}
                >
                  {tab}
                </button>
              ))}
            </div>
            <a className="btn ghost" href="#">
              ↓ Als PDF herunterladen
            </a>
          </div>

          <div className="xlsxbox">
            <label
              className="btn ghost"
              htmlFor="gslxlsx"
              style={{ cursor: 'pointer' }}
              onClick={() => fileInputRef.current?.click()}
            >
              Excel-Fahrplan einlesen …
            </label>
            <input
              type="file"
              id="gslxlsx"
              ref={fileInputRef}
              accept=".xlsx"
              style={{ display: 'none' }}
              onChange={handleFileUpload}
            />
            <small>
              So funktioniert das spätere Modul: Datei auswählen, Tabelle baut sich neu auf.
              <br />
              Die Datei bleibt auf diesem Rechner — sie wird im Browser gelesen, nichts wird
              hochgeladen.
            </small>
          </div>

          {statusMessage && (
            <div
              className={`xlsxmeldung ${statusMessage.type}`}
              style={{ display: 'block', marginTop: 14 }}
            >
              <b>{statusMessage.title}</b>
              {statusMessage.lines && statusMessage.lines.length > 0 && (
                <ul>
                  {statusMessage.lines.map((l, i) => (
                    <li key={i}>{l}</li>
                  ))}
                </ul>
              )}
            </div>
          )}

          <table className="fp">
            <thead>
              <tr>
                <th style={{ width: '19%' }}>Schiff</th>
                <th style={{ width: '11%' }}>Ladehafen</th>
                <th style={{ width: '15%' }}>Ladefenster</th>
                <th style={{ width: '17%' }}>Buchbar bis</th>
                <th style={{ width: '38%' }}>Löschhäfen &amp; ETA</th>
              </tr>
            </thead>
            <tbody>
              {INITIAL_ROWS.map((row, idx) => (
                <tr key={row.vessel + row.voy + idx} className={row.isStop ? 'stop' : ''}>
                  <td data-l="Schiff">
                    <div className="vessel">{row.vessel}</div>
                    <div className="voy">{row.voy}</div>
                  </td>
                  <td data-l="Ladehafen">
                    <span className="port">{row.port}</span>
                  </td>
                  <td data-l="Ladefenster">
                    <span className="laycan">{row.laycan}</span>
                  </td>
                  <td data-l="Buchbar bis">
                    <div className="gate">
                      <small>{row.gateClosedLabel}</small>
                      {row.gateDate}
                    </div>
                    <span className={`badge ${row.badgeClass}`}>{row.badgeText}</span>
                  </td>
                  <td data-l="Löschhäfen &amp; ETA">
                    <ul className="legs">
                      {row.legs.map((leg, lIdx) => (
                        <li key={leg.port + lIdx}>
                          <span>
                            {leg.port} {leg.hasNote && <span className="note">*</span>}
                          </span>
                          <span className="eta">{leg.eta}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="abo">
            <h3>Neuen Fahrplan per Mail bekommen</h3>
            <p className="lead2">
              Sobald ein neuer Fahrplan online ist, schicken wir Ihnen die nächsten Abfahrten mit
              Buchungsfristen. Kurz, ohne Werbung, jederzeit abbestellbar.
            </p>

            <div className="routen">
              <label className="rt">
                <input type="checkbox" defaultChecked />
                <span>
                  Brake und Wismar → Nordamerika
                  <small>
                    Baltimore, Wilmington, New Haven, Port Canaveral, Lake Charles, Port Arthur
                  </small>
                </span>
              </label>
              <label className="rt">
                <input type="checkbox" />
                <span>
                  Marmara und Iskenderun → Karibik, Westafrika, Südamerika
                  <small>Trinidad, Jamaika, Mobile, Guyana und weitere</small>
                </span>
              </label>
            </div>

            <div className="feld">
              <input type="email" placeholder="ihre.adresse@firma.de" aria-label="E-Mail-Adresse" />
              <button type="button" className="btn abo-btn">
                Fahrplan abonnieren
              </button>
            </div>

            <p className="fein">
              Sie erhalten zuerst eine Bestätigungsmail — erst nach Ihrem Klick darin wird die
              Adresse gespeichert. Wir geben sie nicht weiter und nutzen sie ausschließlich für den
              Fahrplan. Abmeldung mit einem Klick in jeder Mail.{' '}
              <a href="#">Datenschutzhinweis</a>
            </p>
          </div>

          <div className="legend">
            <div>
              <b>*</b> sub sufficient inducement &nbsp;·&nbsp; <b>**</b> sub space availability at
              Port of Discharge &nbsp;·&nbsp; <b>***</b> Booking Stop
            </div>
            <div style={{ marginTop: 6 }}>
              All dates wog, wp/agw and subject to alterations without notice.
            </div>
            <div style={{ marginTop: 14 }}>
              Buchung und Preise: <b>Kai Jühdes</b> +49 421 3606-341 &nbsp;·&nbsp;{' '}
              <b>Lars Elkjaer</b> +49 421 3606-340 &nbsp;·&nbsp; <b>UBbooking@gsl-germany.com</b>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
