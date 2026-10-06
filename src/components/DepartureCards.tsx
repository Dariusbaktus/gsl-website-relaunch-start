'use client'

import React, { useEffect, useState } from 'react'

interface Departure {
  vessel: string
  voy: string
  loadWindow: string
  cutoffDate: string
  destinations: { port: string; date: string }[]
}

const DEPARTURES: Departure[] = [
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

export function DepartureCards({ onUpdateTag }: { onUpdateTag?: (text: string) => void }) {
  const [cardsStatus, setCardsStatus] = useState<
    { statusClass: string; cutLabel: string; cutDate: string }[]
  >([])

  useEffect(() => {
    const heute = new Date()
    heute.setHours(0, 0, 0, 0)
    const TAG = 86400000
    const offene: { fenster: string; bis: string }[] = []

    const statusList = DEPARTURES.map((dep) => {
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
  }, [onUpdateTag])

  return (
    <div className="grid3">
      {DEPARTURES.map((dep, idx) => {
        const info = cardsStatus[idx] || {
          statusClass: '',
          cutLabel: 'Buchbar bis',
          cutDate: dep.cutoffDate,
        }
        return (
          <div key={dep.vessel + idx} className={`sail ${info.statusClass}`}>
            <div className="v">{dep.vessel}</div>
            <div className="m">{dep.voy}</div>
            <div className="lbl">Ladefenster</div>
            <div className="big">{dep.loadWindow}</div>
            <div className="to">
              {dep.destinations.map((dst, dIdx) => (
                <React.Fragment key={dst.port + dIdx}>
                  nach <b>{dst.port}</b> · {dst.date}
                  {dIdx < dep.destinations.length - 1 && <br />}
                </React.Fragment>
              ))}
            </div>
            <div className="cut">
              <span>{info.cutLabel}</span>
              <b>{info.cutDate}</b>
            </div>
          </div>
        )
      })}
    </div>
  )
}
