import React from 'react'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { ScheduleClient, DepartureRow } from '@/components/ScheduleClient'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Fahrpläne · Global Shipping & Logistics GmbH',
  description:
    'Abfahrten ab Brake und Wismar Richtung Nordamerika und Karibik. Buchung direkt über uns.',
}

export default async function FahrplaenePage() {
  const { isEnabled: isDraftMode } = await draftMode()
  let rows: DepartureRow[] | undefined = undefined
  let pageDoc: any = null

  try {
    const payload = await getPayload({ config })

    const pageRes = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'fahrplaene' } },
      draft: isDraftMode,
    })
    if (pageRes.docs?.[0]) {
      pageDoc = pageRes.docs[0]
    }

    const depRes = await payload.find({
      collection: 'departures',
      limit: 50,
      sort: 'order',
    })

    if (depRes.docs && depRes.docs.length > 0) {
      rows = depRes.docs.map((doc: any) => {
        const isStop = doc.status === 'stop'
        let badgeClass = 'b-open'
        let badgeText = 'Gate offen'

        if (doc.status === 'soon') {
          badgeClass = 'b-soon'
          badgeText = 'bitte anfragen'
        } else if (doc.status === 'stop') {
          badgeClass = 'b-stop'
          badgeText = 'Booking Stop'
        }

        return {
          vessel: doc.vessel,
          voy: doc.voy,
          port: doc.port,
          laycan: doc.laycan,
          gateDate: doc.gateDate,
          gateClosedLabel: 'Gate closed',
          badgeClass,
          badgeText,
          isStop,
          legs: (doc.destinations || []).map((leg: any) => ({
            port: leg.port,
            eta: leg.eta,
            hasNote: Boolean(leg.hasNote),
          })),
        }
      })
    }
  } catch (err) {
    console.error('Failed to load departures from Payload:', err)
  }

  if (!pageDoc) {
    pageDoc = {
      title: 'Fahrpläne',
      slug: 'fahrplaene',
      heroTag: 'Fahrpläne',
      heroTitle: 'Fahrpläne',
      heroSubtitle:
        'Abfahrten ab Brake und Wismar Richtung Nordamerika und Karibik. Buchung direkt über uns.',
    }
  }

  return <ScheduleClient initialRows={rows} initialPage={pageDoc} />
}
