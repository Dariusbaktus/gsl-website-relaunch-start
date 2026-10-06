import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import articlesData from '@/data/articles.json'

export function generateStaticParams() {
  return articlesData.map((art) => ({
    slug: art.slug,
  }))
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  // Synchronous resolution of params in App Router if needed, or await
  // Next.js 15: params is a Promise
  return params.then(({ slug }) => {
    const article = articlesData.find((a) => a.slug === slug)
    if (!article) return { title: 'Beitrag nicht gefunden' }
    return {
      title: `${article.titel} · Global Shipping & Logistics`,
      description: article.teaser,
    }
  })
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = articlesData.find((a) => a.slug === slug)
  if (!article) {
    notFound()
  }

  const otherArticles = articlesData
    .filter((a) => a.slug !== slug)
    .slice(0, 3)

  // Group contiguous 'b' elements into a single <ul>
  const renderedElements: React.ReactNode[] = []
  let currentBullets: string[] = []

  const flushBullets = (key: number) => {
    if (currentBullets.length > 0) {
      renderedElements.push(
        <ul key={`ul-${key}`}>
          {currentBullets.map((bText, bIdx) => (
            <li key={bIdx}>{bText}</li>
          ))}
        </ul>
      )
      currentBullets = []
    }
  }

  article.body.forEach((item, idx) => {
    const [type, text] = item as [string, string]
    if (type === 'q' || type === 'warn') return

    if (type === 'b') {
      currentBullets.push(text)
    } else {
      flushBullets(idx)
      if (type === 'h') {
        renderedElements.push(<h2 key={idx}>{text}</h2>)
      } else {
        renderedElements.push(<p key={idx}>{text}</p>)
      }
    }
  })
  flushBullets(article.body.length)

  return (
    <div className="page on" id="p-beitrag">
      <section className="sec">
        <div className="wrap">
          <div className="artikel">
            <Link href="/news" className="zurueck">
              &larr; Alle Beiträge
            </Link>
            <div className="eyebrow">{article.kat}</div>
            <h1>{article.titel}</h1>
            <div className="meta">
              {article.monat} &middot; Global Shipping and Logistics
            </div>
            <span className={`stand ${article.roh ? 'roh' : 'entwurf'}`}>
              {article.roh
                ? 'Rohfassung — Besuch in Brake steht aus'
                : 'Entwurf liegt vor'}
            </span>
            <p className="lead">{article.teaser}</p>
            <div className="txt">{renderedElements}</div>

            <div className="weiter">
              <h4>Weitere Beiträge</h4>
              <div className="grid3">
                {otherArticles.map((other) => (
                  <Link
                    key={other.slug}
                    href={`/news/${other.slug}`}
                    className="card link"
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <div className="eyebrow" style={{ marginBottom: 6 }}>
                      {other.kat}
                    </div>
                    <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 6 }}>
                      {other.monat}
                    </div>
                    <h3>{other.titel}</h3>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
