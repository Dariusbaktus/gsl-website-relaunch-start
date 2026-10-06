import React from 'react'

export const metadata = {
  title: 'Ladungen · Global Shipping & Logistics GmbH',
  description: 'Was wirklich über die Kaikante geht. Fotos aus dem laufenden Betrieb in Brake und Wismar.',
}

const CARGO_ITEMS = [
  {
    src: '/media/cargo-1.jpg',
    alt: 'Blick in den geöffneten Laderaum eines Bulkers, gefüllt mit weiß verpackten Schnittholzpaketen',
    title: 'Schnittholz im Laderaum',
    location: 'Brake',
  },
  {
    src: '/media/cargo-2.jpg',
    alt: 'Stahlrohre an Hebegurten über dem geöffneten Laderaum',
    title: 'Stahlrohre an Bord',
    location: 'Brake',
  },
  {
    src: '/media/cargo-3.jpg',
    alt: 'Zwei Hafenkräne heben eine verpackte Ladungspartie über die Bordwand',
    title: 'Bordkran beim Heben',
    location: 'Handysize · Break Bulk',
  },
  {
    src: '/media/cargo-4.jpg',
    alt: 'Kupferkathoden in Stapeln auf Paletten vor einer Lagerhalle',
    title: 'Kupferkathoden am Kai',
    location: 'Brake',
  },
  {
    src: '/media/cargo-5.jpg',
    alt: 'Gestapeltes Rundholz auf dem Kai vor blauem Himmel',
    title: 'Rundholz am Kai',
    location: 'Brake',
  },
  {
    src: '/media/cargo-6.jpg',
    alt: 'In Folie verpackte Schnittholzpakete gestapelt am Kai',
    title: 'Schnittholz am Kai',
    location: 'Brake',
  },
  {
    src: '/media/cargo-7.jpg',
    alt: 'Ein zylindrisches Schwergutteil hängt an Ketten über gestautem und verzurrtem Schnittholz',
    title: 'Schwergut über der Holzpartie',
    location: 'Projektladung',
  },
  {
    src: '/media/cargo-8.jpg',
    alt: 'Grünes Laschmaterial liegt aufgerollt am Kai neben verpackter Ladung und einem Gabelstapler',
    title: 'Laschung und Ladungssicherung',
    location: 'Break Bulk',
  },
  {
    src: '/media/cargo-9.jpg',
    alt: 'Luftaufnahme eines Massengutfrachters längsseits am Kai',
    title: 'Niedersachsenkai von oben',
    location: 'Brake',
  },
]

export default function LadungenPage() {
  return (
    <div className="page on" id="p-ladungen">
      <section className="phead">
        <div className="wrap">
          <h1>Ladungen</h1>
          <p>
            Was wirklich über die Kaikante geht. Fotos aus dem laufenden Betrieb in Brake und
            Wismar.
          </p>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="grid3" style={{ gap: 18 }}>
            {CARGO_ITEMS.map((item, idx) => (
              <div key={idx} className="ph hb">
                <img
                  src={item.src}
                  alt={item.alt}
                  width={1000}
                  height={750}
                  loading="lazy"
                  decoding="async"
                />
                <div className="cap">
                  <b>{item.title}</b>
                  <span>{item.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
