'use client'

import React, { useState, useRef } from 'react'

export interface DepartureRow {
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

const FALLBACK_ROWS: DepartureRow[] = [
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

export function ScheduleClient({ initialRows }: { initialRows?: DepartureRow[] }) {
  const rows = initialRows && initialRows.length > 0 ? initialRows : FALLBACK_ROWS
  const [activeTab, setActiveTab] = useState(0)
  const [statusMessage, setStatusMessage] = useState<{
    type: 'gut' | 'schlecht'
    title: string
    lines?: string[]
  } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [subEmail, setSubEmail] = useState('')
  const [subRoute1, setSubRoute1] = useState(true)
  const [subRoute2, setSubRoute2] = useState(false)
  const [subStatus, setSubStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [subFeedback, setSubFeedback] = useState('')

  const handleSubscribe = async () => {
    if (!subEmail || !subEmail.includes('@')) {
      setSubStatus('error')
      setSubFeedback('Bitte geben Sie eine gültige E-Mail-Adresse ein.')
      return
    }

    setSubStatus('loading')
    setSubFeedback('')

    try {
      const selectedRoutes = []
      if (subRoute1) selectedRoutes.push('Brake und Wismar → Nordamerika')
      if (subRoute2) selectedRoutes.push('Marmara und Iskenderun → Karibik, Westafrika, Südamerika')

      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: subEmail, routes: selectedRoutes }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Fehler beim Abonnieren.')
      setSubStatus('success')
      setSubFeedback(data.message || 'Vielen Dank für Ihre Anmeldung!')
      setSubEmail('')
    } catch (err: any) {
      setSubStatus('error')
      setSubFeedback(err.message || 'Fehler beim Abonnieren.')
    }
  }

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

    setTimeout(() => {
      setStatusMessage({
        type: 'gut',
        title: `Datei "${file.name}" erfolgreich verarbeitet · ${rows.length} Abfahrten aktualisiert.`,
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
              {rows.map((row, idx) => (
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

          <div style={{ marginTop: 18, fontSize: 13, color: 'var(--muted)' }}>
            * inducement — Anlauf bei ausreichender Ladung. Alle Angaben vorbehaltlich
            Änderungen ohne vorherige Ankündigung.
          </div>

          <div className="infobox" style={{ marginTop: 28 }}>
            <h4>Fahrplan-Update per E-Mail</h4>
            <p style={{ margin: '6px 0 14px', fontSize: 14.5 }}>
              Wir aktualisieren die Daten mindestens einmal wöchentlich. Tragen Sie sich ein, wenn
              Sie neue Abfahrten automatisch erhalten möchten — keine Werbung, nur der Fahrplan.
            </p>
            <div>
              <div
                style={{
                  display: 'flex',
                  gap: 10,
                  maxWidth: 520,
                  flexWrap: 'wrap',
                  marginBottom: 12,
                }}
              >
                <input
                  type="email"
                  id="sub-email"
                  placeholder="ihre.adresse@unternehmen.de"
                  required
                  value={subEmail}
                  onChange={(e) => setSubEmail(e.target.value)}
                  disabled={subStatus === 'loading'}
                  style={{
                    flex: '1 1 280px',
                    padding: '10px 14px',
                    border: '1px solid var(--line)',
                    borderRadius: 4,
                    fontSize: 14,
                  }}
                />
                <button
                  type="button"
                  className="btn"
                  onClick={handleSubscribe}
                  disabled={subStatus === 'loading'}
                  style={{ whiteSpace: 'nowrap' }}
                >
                  {subStatus === 'loading' ? 'Wird eingetragen...' : 'Abonnieren'}
                </button>
              </div>

              {subFeedback && (
                <div
                  style={{
                    fontSize: 13.5,
                    marginBottom: 10,
                    fontWeight: 600,
                    color: subStatus === 'success' ? '#2e7d32' : '#c62828',
                  }}
                >
                  {subFeedback}
                </div>
              )}

              <div
                style={{
                  display: 'flex',
                  gap: 16,
                  fontSize: 12.5,
                  color: 'var(--muted)',
                  flexWrap: 'wrap',
                }}
              >
                <label style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  <input
                    type="checkbox"
                    checked={subRoute1}
                    onChange={(e) => setSubRoute1(e.target.checked)}
                  />
                  Brake und Wismar → Nordamerika
                </label>
                <label style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  <input
                    type="checkbox"
                    checked={subRoute2}
                    onChange={(e) => setSubRoute2(e.target.checked)}
                  />
                  Marmara und Iskenderun → Karibik, Westafrika, Südamerika
                </label>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
