import React from 'react'
import Link from 'next/link'

export function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="cols">
          <div className="logoF">
            <Link href="/">
              <img src="/images/logo.png" alt="GSL" />
            </Link>
            <p style={{ margin: 0 }}>
              Global Shipping &amp; Logistics GmbH
              <br />
              Schüsselkorb 3 · 28195 Bremen
              <br />
              Deutschland
            </p>
          </div>
          <div>
            <h4>Leistungen</h4>
            <Link href="/leistungen">Break Bulk &amp; Schwergut</Link>
            <Link href="/leistungen">Projektladung</Link>
            <Link href="/leistungen">Schüttgut</Link>
            <Link href="/leistungen">Multimodal</Link>
          </div>
          <div>
            <h4>Service</h4>
            <Link href="/fahrplaene">Fahrpläne</Link>
            <Link href="/ladungen">Ladungen</Link>
            <Link href="/news">News</Link>
            <Link href="/team">Team</Link>
            <Link href="/kontakt">Kontakt</Link>
          </div>
          <div>
            <h4>Kontakt</h4>
            <a href="tel:+4942136060">+49 421 36060</a>
            <a href="mailto:bremen@gsl-germany.com">bremen@gsl-germany.com</a>
            <a href="mailto:UBbooking@gsl-germany.com">Buchungen: UBbooking@gsl-germany.com</a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </div>
        </div>
        <div className="bottom">
          <div>Impressum · Datenschutzhinweis · AGB nach ZVDS und ADSp</div>
          <div>Entwurf vom 01.09.2026 — keine veröffentlichte Seite</div>
        </div>
      </div>
    </footer>
  )
}
