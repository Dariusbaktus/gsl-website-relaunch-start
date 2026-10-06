'use client'

import React, { useEffect, useState } from 'react'

export interface DepartureItem {
  vessel: string
  voy: string
  loadWindow: string
  cutoffDate: string
  destinations: { port: string; date: string }[]
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

export function DepartureCards({
  items,
  onUpdateTag,
}: {
  items?: DepartureItem[]
  onUpdateTag?: (text: string) => void
}) {
  const departures = items && items.length > 0 ? items : FALLBACK_DEPARTURES
  const [cardsStatus, setCardsStatus] = useState<
    { statusClass: string; cutLabel: string; cutDate: string }[]
  >([])

  useEffect(() => {
    const heute = new Date()
    heute.setHours(0, 0, 0, 0)
    const TAG = 86400000
    const offene: { fenster: string; bis: string }[] = []

    const statusList = departures.map((dep) => {
      const t = dep.cutoffDate.match(/^(\d{2})\.(\d{2})\.(\d{4})$/)
      if (!t) return { statusClass: '', cutLabel: 'Buchbar bis', cutDate: dep.cutoffDate }

      const cutTime = new Date(+t[3], +t[2] - 1, +t[1]).getTime()
      const rest = Math.round((cutTime - heute.getTime()) / TAG)

      if (rest < 0) {
        return {
          statusClass: 'stop',
          cutLabel: 'Buchung geschlossen seit',
          cutDate: dep.cutoffDate,
        }
      }

      if (rest <= 3) {
        return {
          statusClass: 'bald',
          cutLabel: rest === 0 ? 'Buchbar nur noch heute' : 'Buchung schließt am',
          cutDate: rest === 0 ? '' : dep.cutoffDate,
        }
      }

      offene.push({
        fenster: dep.loadWindow.replace(/\s*[-–]\s*/g, ' – ').replace(/\s+/g, ' ').trim(),
        bis: dep.cutoffDate,
      })

      return {
        statusClass: '',
        cutLabel: 'Buchbar bis',
        cutDate: dep.cutoffDate,
      }
    })

    setCardsStatus(statusList)

    if (onUpdateTag) {
      if (offene.length > 0) {
        onUpdateTag(
          `Nächste buchbare Abfahrt ab Brake: ${offene[0].fenster} · buchbar bis ${offene[0].bis}`
        )
      } else {
        onUpdateTag('Aktuelle Abfahrten ab Brake — siehe Fahrpläne')
      }
    }
  }, [departures, onUpdateTag])

  return (
    <div className="grid3">
      {departures.map((dep, idx) => {
        const info = cardsStatus[idx] || {
          statusClass: '',
          cutLabel: 'Buchbar bis',
          cutDate: dep.cutoffDate,
        }

        return (
          <div key={dep.vessel + idx} className={`dep-card ${info.statusClass}`}>
            <div className="vessel">{dep.vessel}</div>
            <div className="voy">{dep.voy}</div>
            <div className="meta">
              <span className="k">Ladefenster</span>
              <span className="v">{dep.loadWindow}</span>
              <span className="k">Ladeschluss</span>
              <span className="v">{dep.cutoffDate}</span>
            </div>
            <div className="dest-title">Bestimmungshäfen &amp; Vorläufige Ankunft</div>
            <div className="dests">
              {dep.destinations.map((d, dIdx) => (
                <div key={dIdx} className="d-row">
                  <span className="dp">{d.port}</span>
                  <span className="da">{d.date}</span>
                </div>
              ))}
            </div>
            <div className="cut-info">
              {info.cutLabel} {info.cutDate}
            </div>
          </div>
        )
      })}
    </div>
  )
}
