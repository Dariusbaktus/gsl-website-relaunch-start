'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import articlesData from '@/data/articles.json'

const CATEGORIES = ['Alle', 'Ladung', 'Routen', 'Menschen', 'Fachwissen', 'Historie']

export default function NewsPage() {
  const [activeCat, setActiveCat] = useState('Alle')

  const filteredArticles = articlesData.filter((art) => {
    if (activeCat === 'Alle') return true
    return art.kat.toLowerCase() === activeCat.toLowerCase()
  })

  return (
    <div className="page on" id="p-news">
      <section className="phead">
        <div className="wrap">
          <h1>News</h1>
          <p>
            Handelsrouten, Ladung, Fachwissen und ein bisschen Hafengeschichte — geschrieben von
            Menschen, die den Kai kennen.
          </p>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="controls">
            <div className="seg">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  className={activeCat === cat ? 'on' : ''}
                  onClick={() => setActiveCat(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            {filteredArticles.map((article) => (
              <Link
                key={article.slug}
                href={`/news/${article.slug}`}
                className="post link"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div className="thumb hb">
                  <img
                    src={article.thumb}
                    alt={article.alt}
                    width={700}
                    height={525}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div>
                  <span className="cat">{article.kat}</span>
                  <div className="date">{article.monat}</div>
                  <h3>{article.titel}</h3>
                  <p>{article.teaser}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="okbox" style={{ marginTop: 32 }}>
            <h4>Diese sechs Beiträge sind keine Erfindung</h4>
            <p style={{ marginBottom: 0 }}>
              Alle sechs sind ausgeschrieben und lassen sich anklicken — der vollständige Text
              steht dahinter. Sie stammen aus dem Content-Plan, der als Word-Datei im
              Projektordner liegt: fünf Säulen — Ladung, Routen, Menschen, Fachwissen, Historie —
              mit einem Beitrag pro Monat ab September 2026, zwölf Themen fürs erste Jahr. Der
              Beitrag vom Dezember ist als Rohfassung gekennzeichnet, weil dafür noch ein Tag in
              Brake begleitet werden muss.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
