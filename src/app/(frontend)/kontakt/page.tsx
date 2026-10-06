'use client'

import React, { useState } from 'react'

export default function KontaktPage() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    inquiryType: 'Bitte wählen',
    loadPort: '',
    destinationPort: '',
    message: '',
    gdprConsent: false,
  })

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.gdprConsent) {
      setStatus('error')
      setErrorMessage('Bitte Name, E-Mail ausfüllen und dem Datenschutzhinweis zustimmen.')
      return
    }

    setStatus('loading')
    setErrorMessage('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || 'Fehler beim Senden.')
      }

      setStatus('success')
    } catch (err: any) {
      setStatus('error')
      setErrorMessage(err.message || 'Die Anfrage konnte nicht gesendet werden.')
    }
  }

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

              {status === 'success' ? (
                <div
                  className="okbox"
                  style={{
                    background: '#EDF7F2',
                    borderColor: '#247A53',
                    padding: '24px 20px',
                    borderRadius: '8px',
                  }}
                >
                  <h4 style={{ color: '#247A53', marginBottom: 8 }}>Vielen Dank für Ihre Anfrage!</h4>
                  <p style={{ margin: 0, color: '#1B4D36' }}>
                    Ihre Nachricht ist bei uns eingegangen. Unser Team in Bremen wird sich schnellstmöglich bei Ihnen melden.
                  </p>
                </div>
              ) : (
                <form className="form" onSubmit={handleSubmit}>
                  {status === 'error' && (
                    <div
                      style={{
                        padding: '12px 16px',
                        background: '#FDF3F3',
                        color: '#9E242B',
                        border: '1px solid #F0D4D5',
                        borderRadius: 6,
                        marginBottom: 16,
                        fontSize: 14,
                      }}
                    >
                      {errorMessage}
                    </div>
                  )}

                  <div className="row">
                    <div>
                      <label>Name *</label>
                      <input
                        type="text"
                        placeholder="Vor- und Nachname"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label>Firma</label>
                      <input
                        type="text"
                        placeholder="Firmenname"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div>
                      <label>E-Mail *</label>
                      <input
                        type="email"
                        placeholder="name@firma.de"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <label>Telefon</label>
                      <input
                        type="tel"
                        placeholder="optional"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </div>
                  <label>Worum geht es?</label>
                  <select
                    value={formData.inquiryType}
                    onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                  >
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
                      <input
                        type="text"
                        placeholder="z. B. Brake"
                        value={formData.loadPort}
                        onChange={(e) => setFormData({ ...formData, loadPort: e.target.value })}
                      />
                    </div>
                    <div>
                      <label>Zielhafen</label>
                      <input
                        type="text"
                        placeholder="z. B. Wilmington, NC"
                        value={formData.destinationPort}
                        onChange={(e) =>
                          setFormData({ ...formData, destinationPort: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <label>Ihre Nachricht</label>
                  <textarea
                    placeholder="Ladungsart, Gewicht, Maße, Wunschtermin — je konkreter, desto schneller die Antwort."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  ></textarea>
                  <div className="chk">
                    <input
                      type="checkbox"
                      id="ds-chk"
                      checked={formData.gdprConsent}
                      onChange={(e) =>
                        setFormData({ ...formData, gdprConsent: e.target.checked })
                      }
                    />
                    <label htmlFor="ds-chk" style={{ fontWeight: 'normal', fontSize: 'inherit' }}>
                      Ich habe den Datenschutzhinweis gelesen und stimme der Verarbeitung meiner
                      Daten zur Bearbeitung dieser Anfrage zu. *
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="btn"
                    disabled={status === 'loading'}
                    style={{ border: 0, cursor: status === 'loading' ? 'wait' : 'pointer' }}
                  >
                    {status === 'loading' ? 'Wird gesendet...' : 'Anfrage absenden'}
                  </button>
                </form>
              )}
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
