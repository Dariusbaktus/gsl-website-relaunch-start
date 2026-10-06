import React from 'react'

export const metadata = {
  title: 'Leistungen · Global Shipping & Logistics GmbH',
  description: 'Schüttgut, Break Bulk und Projektladung ab der deutschen Küste — mit Vor- und Nachlauf, Zoll und Lagerung aus einer Hand.',
}

export default function LeistungenPage() {
  return (
    <div className="page on" id="p-leistungen">
      <section className="phead">
        <div className="wrap">
          <h1>Leistungen</h1>
          <p>
            Schüttgut, Break Bulk und Projektladung ab der deutschen Küste — mit Vor- und Nachlauf,
            Zoll und Lagerung aus einer Hand.
          </p>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="grid2" style={{ gap: 20 }}>
            <div className="card">
              <div className="num">Break Bulk</div>
              <h3>Break Bulk &amp; Schwergut</h3>
              <p style={{ color: '#41505C' }}>
                Stückgut, das nicht in einen Container passt: Stahl, Coils, Rohre, Maschinen, Kolli
                mit Übermaß. Wir buchen Handysize-Tonnage mit Bordkränen — damit Sie nicht auf
                Landkran-Kapazität angewiesen sind.
              </p>
              <p style={{ color: '#41505C', marginBottom: 0 }}>
                <b>Typische Ladehäfen:</b> Brake, Wismar
              </p>
            </div>
            <div className="card">
              <div className="num">Projekt</div>
              <h3>Projektladung</h3>
              <p style={{ color: '#41505C' }}>
                Unteilbare Einheiten, Schwerlast, Anlagenteile, Windkraftkomponenten. Von der
                Machbarkeit über Stauplanung und Laschung bis zur Ladungssicherung an Bord.
              </p>
              <p style={{ color: '#41505C', marginBottom: 0 }}>
                <b>Immer dabei:</b> Abstimmung mit Terminal und Reederei vor der Fixierung
              </p>
            </div>
            <div className="card">
              <div className="num">Bulk</div>
              <h3>Schüttgut</h3>
              <p style={{ color: '#41505C' }}>
                Getreide und Futtermittel, Zellstoff, Forstprodukte, Düngemittel. Brake ist einer der
                größten Getreideumschlagplätze Deutschlands — 2024 gingen dort rund 3 Millionen
                Tonnen Getreide und Futtermittel über die Kaikante.
              </p>
              <p style={{ color: '#41505C', marginBottom: 0 }}>
                <b>Terminaloperator vor Ort:</b> J. Müller AG
              </p>
            </div>
            <div className="card">
              <div className="num">Door to Door</div>
              <h3>Multimodal &amp; Vor-/Nachlauf</h3>
              <p style={{ color: '#41505C' }}>
                Schiene, Straße, Binnenschiff und Seefracht — kombiniert zur günstigsten Kette. Dazu
                Zollabwicklung, Lagerhaltung und die gesamte Dokumentation.
              </p>
              <p style={{ color: '#41505C', marginBottom: 0 }}>
                <b>Auch einzeln buchbar,</b> wenn Sie nur einen Teilabschnitt brauchen
              </p>
            </div>
          </div>

          <div className="okbox" style={{ marginTop: 24 }}>
            <h4>Zahlen in diesem Entwurf</h4>
            <p style={{ marginBottom: 0 }}>
              3 Mio t Getreide/Futter und 868.146 t Zellstoff sind Umschlagzahlen des{' '}
              <b>Hafens Brake für 2024</b>, nicht Zahlen von GSL. So sind sie hier auch formuliert.
              Vor dem Livegang werden sie gegen die aktuelle Hafenstatistik geprüft und mit
              Quellenangabe versehen.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
