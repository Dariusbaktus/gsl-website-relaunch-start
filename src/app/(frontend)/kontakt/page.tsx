'use client'

import React from 'react'



export default function KontaktPage() {
  return (
    <div className="page on" id="p-kontakt">
      <section className="phead">
        <div className="wrap">
          <h1>Kontakt</h1>
          <p>Schüsselkorb 3, 28195 Bremen. Telefon +49 421 36060.</p>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="grid2" style={{ gap: 36, alignItems: 'start' }}>
            <div>
              <h3>Anfrage stellen</h3>
              <div className="rule"></div>
              <form className="form" onSubmit={(e) => e.preventDefault()}>
                <div className="row">
                  <div>
                    <label>Name</label>
                    <input type="text" placeholder="Vor- und Nachname" />
                  </div>
                  <div>
                    <label>Firma</label>
                    <input type="text" placeholder="Firmenname" />
                  </div>
                </div>
                <div className="row">
                  <div>
                    <label>E-Mail</label>
                    <input type="email" placeholder="name@firma.de" />
                  </div>
                  <div>
                    <label>Telefon</label>
                    <input type="tel" placeholder="optional" />
                  </div>
                </div>
                <label>Worum geht es?</label>
                <select defaultValue="Bitte wählen">
                  <option>Bitte wählen</option>
                  <option>Buchungsanfrage Break Bulk</option>
                  <option>Projektladung / Schwergut</option>
                  <option>Schüttgut</option>
                  <option>Vor- und Nachlauf, Zoll, Lager</option>
                  <option>Allgemeine Anfrage</option>
                </select>
                <div className="row">
                  <div>
                    <label>Ladehafen</label>
                    <input type="text" placeholder="z. B. Brake" />
                  </div>
                  <div>
                    <label>Zielhafen</label>
                    <input type="text" placeholder="z. B. Wilmington, NC" />
                  </div>
                </div>
                <label>Ihre Nachricht</label>
                <textarea placeholder="Ladungsart, Gewicht, Maße, Wunschtermin — je konkreter, desto schneller die Antwort."></textarea>
                <div className="chk">
                  <input type="checkbox" id="ds-chk" />
                  <label htmlFor="ds-chk" style={{ fontWeight: 'normal', fontSize: 'inherit' }}>
                    Ich habe den Datenschutzhinweis gelesen und stimme der Verarbeitung meiner
                    Daten zur Bearbeitung dieser Anfrage zu.
                  </label>
                </div>
                <button type="submit" className="btn" style={{ border: 0, cursor: 'pointer' }}>
                  Anfrage absenden
                </button>
              </form>
            </div>
            <div>
              <h3>Direkt zur richtigen Person</h3>
              <div className="rule"></div>
              <div className="card" style={{ marginBottom: 14 }}>
                <h4>Buchungen Break Bulk</h4>
                <p style={{ fontSize: 15, color: '#41505C', marginBottom: 6 }}>
                  Kai Jühdes · Senior Chartering Manager
                </p>
                <p style={{ marginBottom: 0 }}>
                  <b>+49 421 3606 341</b>
                  <br />
                  <a href="mailto:UBbooking@gsl-germany.com">UBbooking@gsl-germany.com</a>
                </p>
              </div>
              <div className="card" style={{ marginBottom: 14 }}>
                <h4>Vor Ort in Brake</h4>
                <p style={{ fontSize: 15, color: '#41505C', marginBottom: 6 }}>
                  Uwe M. Albrecht · Port Services
                </p>
                <p style={{ marginBottom: 0 }}>
                  <b>+49 421 3606 243</b>
                  <br />
                  <a href="mailto:uwe.albrecht@gsl-germany.com">uwe.albrecht@gsl-germany.com</a>
                </p>
              </div>
              <div className="card" style={{ marginBottom: 14 }}>
                <h4>Allgemein</h4>
                <p style={{ marginBottom: 0 }}>
                  Global Shipping &amp; Logistics GmbH
                  <br />
                  Schüsselkorb 3 · 28195 Bremen
                  <br />
                  Telefon <b>+49 421 36060</b> · Fax +49 421 3606222
                  <br />
                  <a href="mailto:bremen@gsl-germany.com">bremen@gsl-germany.com</a>
                </p>
              </div>
              <div className="ph" style={{ aspectRatio: '16/9' }}>
                <span className="phnote">Karte fehlt</span>
                <div className="cap">
                  <b>Schüsselkorb 3, 28195 Bremen</b>
                  <span>Karte ohne Google — datenschutzfreundliche Einbindung</span>
                </div>
              </div>
            </div>
          </div>

          <div className="okbox" style={{ marginTop: 36 }}>
            <h4>Warum das Formular so aufgebaut ist</h4>
            <p style={{ marginBottom: 0 }}>
              Ladehafen, Zielhafen und Ladungsart als eigene Felder bedeuten: Maureen und Sabine
              bekommen eine Anfrage, mit der sie sofort arbeiten können, statt dreimal nachzufragen.
              Das spart pro Anfrage zwei E-Mails. Die Karte wird ohne Google eingebunden, damit ihr
              weiterhin ohne Cookie-Banner auskommt.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
