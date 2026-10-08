import React from 'react'
import Link from 'next/link'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { PageLivePreview } from '@/components/live-preview/PageLivePreview'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Was der Neuaufbau löst · Global Shipping & Logistics GmbH',
  description: 'Fünf Punkte, die an der heutigen Seite technisch nicht stimmen — und was der Entwurf dahinter jeweils anders macht.',
}

export default async function UeberblickPage() {
  const { isEnabled: isDraftMode } = await draftMode()
  let pageDoc: any = null

  try {
    const payload = await getPayload({ config })
    const pageRes = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'ueberblick' } },
      draft: isDraftMode,
    })
    if (pageRes.docs?.[0]) {
      pageDoc = pageRes.docs[0]
    }
  } catch (e) {
    console.warn('Could not fetch ueberblick page from Payload:', e)
  }

  if (!pageDoc) {
    pageDoc = {
      title: 'Was der Neuaufbau löst',
      slug: 'ueberblick',
      heroTag: 'Überblick',
      heroTitle: 'Was der Neuaufbau löst',
      heroSubtitle:
        'Fünf Punkte, die an der heutigen Seite technisch nicht stimmen — und was der Entwurf dahinter jeweils anders macht. Alle Befunde sind an der laufenden Website gemessen.',
    }
  }

  return (
    <PageLivePreview
      initialPage={pageDoc}
      fallbackTitle="Was der Neuaufbau löst"
      fallbackSubtitle="Fünf Punkte, die an der heutigen Seite technisch nicht stimmen — und was der Entwurf dahinter jeweils anders macht. Alle Befunde sind an der laufenden Website gemessen."
      pageId="p-ueberblick"
    >

      <section className="sec grey" style={{ paddingTop: 34, paddingBottom: 34 }}>
        <div className="wrap">
          <div className="eyebrow">Auf einen Blick</div>
          <div className="kpleiste">
            <div className="kpk">
              <span className="kpknr">1</span>
              <span className="kpkfeld">Zweisprachigkeit</span>
              <span className="kpktxt">Englische Seiten sind für Suchmaschinen unsichtbar</span>
            </div>
            <div className="kpk">
              <span className="kpknr">2</span>
              <span className="kpkfeld">Fahrplan</span>
              <span className="kpktxt">Derselbe Fahrplan wird an zwei Stellen gepflegt</span>
            </div>
            <div className="kpk">
              <span className="kpknr">3</span>
              <span className="kpkfeld">Kontrolle</span>
              <span className="kpktxt">Zentrale Steuerdateien liegen beim Netzbetreiber</span>
            </div>
            <div className="kpk">
              <span className="kpknr">4</span>
              <span className="kpkfeld">Interne Seiten</span>
              <span className="kpktxt">Anmeldebereiche stehen in der öffentlichen Sitemap</span>
            </div>
            <div className="kpk">
              <span className="kpknr">5</span>
              <span className="kpkfeld">Auffindbarkeit</span>
              <span className="kpktxt">Keine Beschreibung, keine strukturierten Daten</span>
            </div>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="kp">
            <div className="kpkopf">
              <span className="kpnr">1</span>
              <div>
                <span className="kpfeld">Zweisprachigkeit</span>
                <h3>Zwei Sprachen, kein Signal an Suchmaschinen</h3>
              </div>
            </div>
            <div className="kpzwei">
              <div className="kpheute">
                <b>Heute</b>
                <p>
                  WPML ist aktiv, die englischen Seiten existieren — aber es gibt kein einziges
                  hreflang-Element, und in keiner Sitemap steht eine <code>/en/</code>-Adresse. Auf{' '}
                  <code>/fahrplaene/</code> zeigt das canonical auf die englische Fassung.
                </p>
                <p className="kpfolge">
                  Beide Sprachfassungen konkurrieren gegeneinander, die englische ist praktisch nicht
                  auffindbar.
                </p>
              </div>
              <div className="kpneu">
                <b>Im Neuaufbau</b>
                <p>
                  Jede Seite weist ihr Sprachpaar aus, beide Sprachen stehen in der Sitemap, jedes
                  canonical zeigt auf sich selbst.
                </p>
              </div>
            </div>
          </div>

          <div className="kp">
            <div className="kpkopf">
              <span className="kpnr">2</span>
              <div>
                <span className="kpfeld">Fahrplan</span>
                <h3>Der Fahrplan wird zweimal gepflegt</h3>
              </div>
            </div>
            <div className="kpzwei">
              <div className="kpheute">
                <b>Heute</b>
                <p>
                  Aus der Excel-Datei entsteht ein PDF, und die Website wird von Hand nachgezogen.
                </p>
                <p className="kpfolge">
                  Beim Stand vom 13. August stand auf der Website ein anderes Schiff als in der Datei.
                  Jede Änderung kostet zweimal Arbeit.
                </p>
              </div>
              <div className="kpneu">
                <b>Im Neuaufbau</b>
                <p>
                  Die Website liest die Excel-Datei unmittelbar aus. Eine Quelle, ein Stand, keine
                  Abschrift. Vorführbar unter „Fahrpläne“ — der Knopf über der Tabelle.
                </p>
              </div>
            </div>
          </div>

          <div className="kp">
            <div className="kpkopf">
              <span className="kpnr">3</span>
              <div>
                <span className="kpfeld">Kontrolle</span>
                <h3>Die technische Grundlage gehört nicht GSL</h3>
              </div>
            </div>
            <div className="kpzwei">
              <div className="kpheute">
                <b>Heute</b>
                <p>
                  Die <code>robots.txt</code> wird vom Netzwerk ausgeliefert und führt 15 Einträge
                  über 14 Domains. Auch die Sitemap-Struktur ist nicht in eigener Hand.
                </p>
                <p className="kpfolge">
                  Jede technische Änderung ist eine Anfrage beim Betreiber — mit dessen Zeitplan.
                </p>
              </div>
              <div className="kpneu">
                <b>Im Neuaufbau</b>
                <p>
                  Eigene Instanz mit eigener robots.txt und eigener Sitemap. Änderungen brauchen keine
                  Freigabe von außen.
                </p>
              </div>
            </div>
          </div>

          <div className="kp">
            <div className="kpkopf">
              <span className="kpnr">4</span>
              <div>
                <span className="kpfeld">Interne Seiten</span>
                <h3>Interne Seiten sind öffentlich auffindbar</h3>
              </div>
            </div>
            <div className="kpzwei">
              <div className="kpheute">
                <b>Heute</b>
                <p>
                  In der Sitemap stehen <code>/2fa/</code> und <code>/upload/</code> — die Anmeldung
                  zum Redaktionssystem. Dazu ein Autorenarchiv, das einen Benutzernamen preisgibt.
                </p>
                <p className="kpfolge">
                  Seiten, die niemand von außen sehen soll, werden Suchmaschinen aktiv angeboten.
                </p>
              </div>
              <div className="kpneu">
                <b>Im Neuaufbau</b>
                <p>
                  Anmeldebereiche auf noindex, Autorenarchiv abgeschaltet, in der Sitemap stehen nur
                  Seiten, die dort hingehören.
                </p>
              </div>
            </div>
          </div>

          <div className="kp">
            <div className="kpkopf">
              <span className="kpnr">5</span>
              <div>
                <span className="kpfeld">Auffindbarkeit</span>
                <h3>Für Auffindbarkeit ist nichts vorbereitet</h3>
              </div>
            </div>
            <div className="kpzwei">
              <div className="kpheute">
                <b>Heute</b>
                <p>Keine Meta-Beschreibung, keine strukturierten Daten, kein Eintrag zum Unternehmen.</p>
                <p className="kpfolge">
                  Im Suchergebnis erscheint zufällig zusammengesetzter Seitentext statt einer
                  Beschreibung, die zum Klicken einlädt.
                </p>
              </div>
              <div className="kpneu">
                <b>Im Neuaufbau</b>
                <p>
                  Beschreibungstext je Seite, strukturierte Daten zu Unternehmen, Standort und
                  Fahrplan — weiterhin ohne Google-Dienste, also ohne Cookie-Banner.
                </p>
              </div>
            </div>
          </div>

          <div className="okbox" style={{ marginTop: 36 }}>
            <h4>Zum Stand von Fotos und Texten</h4>
            <p>
              Alle Fotos sind <b>eigene GSL-Aufnahmen aus Brake und Wismar</b> — kein Bildmaterial
              der heutigen Website, kein Stockmaterial. Die sieben Porträts stammen aus derselben
              Aufnahme, gleiches Licht, gleicher Hintergrund.
            </p>
            <p style={{ marginBottom: 0 }}>
              Die Texte sind <b>Prototypen</b>. Sie zeigen Aufbau, Länge und Tonfall — Themenwahl und
              Ausformulierung werden noch überarbeitet. Auswahl der Motive, fachliche Freigabe und
              Bildrechte stehen ebenfalls noch aus.
            </p>
          </div>

          <Link href="/" className="btn" style={{ marginTop: 30, display: 'inline-block' }}>
            Zur Website
          </Link>
        </div>
      </section>
    </PageLivePreview>
  )
}
