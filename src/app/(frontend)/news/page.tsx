import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import articlesData from '@/data/articles.json'
import { NewsListClient, PostItem } from '@/components/NewsListClient'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'News · Global Shipping & Logistics GmbH',
  description:
    'Handelsrouten, Ladung, Fachwissen und ein bisschen Hafengeschichte — geschrieben von Menschen, die den Kai kennen.',
}

export default async function NewsPage() {
  let posts: PostItem[] = articlesData.map((a) => ({
    slug: a.slug,
    title: a.titel,
    category: a.kat,
    month: a.monat,
    teaser: a.teaser,
    thumb: a.thumb,
    alt: a.alt,
  }))

  try {
    const payload = await getPayload({ config })
    const res = await payload.find({
      collection: 'posts',
      where: { _status: { equals: 'published' } },
      sort: '-createdAt',
    })

    if (res.docs && res.docs.length > 0) {
      posts = res.docs.map((doc: any, idx: number) => ({
        slug: doc.slug,
        title: doc.title,
        category: doc.category,
        month: doc.month,
        teaser: doc.teaser,
        thumb:
          typeof doc.thumbnail === 'object' &&
          (doc.thumbnail?.sizes?.card?.url || doc.thumbnail?.url)
            ? doc.thumbnail.sizes?.card?.url || doc.thumbnail.url
            : `/media/news-${(idx % 6) + 1}.jpg`,
        alt:
          (typeof doc.thumbnail === 'object' && doc.thumbnail?.alt) ||
          doc.thumbnailAlt ||
          doc.title,
      }))
    }
  } catch (e) {
    console.error('Failed to fetch posts from Payload CMS:', e)
  }

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
          <NewsListClient initialPosts={posts} />

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
