import React from 'react'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import config from '@/payload.config'
import articlesData from '@/data/articles.json'
import { NewsListClient, PostItem } from '@/components/NewsListClient'
import { PageLivePreview } from '@/components/live-preview/PageLivePreview'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'News · Global Shipping & Logistics GmbH',
  description:
    'Handelsrouten, Ladung, Fachwissen und ein bisschen Hafengeschichte — geschrieben von Menschen, die den Kai kennen.',
}

export default async function NewsPage() {
  const { isEnabled: isDraftMode } = await draftMode()
  let posts: PostItem[] = articlesData.map((a) => ({
    slug: a.slug,
    title: a.titel,
    category: a.kat,
    month: a.monat,
    teaser: a.teaser,
    thumb: a.thumb,
    alt: a.alt,
  }))
  let pageDoc: any = null

  try {
    const payload = await getPayload({ config })

    const pageRes = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'news' } },
      draft: isDraftMode,
    })
    if (pageRes.docs?.[0]) {
      pageDoc = pageRes.docs[0]
    }

    const res = await payload.find({
      collection: 'posts',
      where: isDraftMode ? {} : { _status: { equals: 'published' } },
      sort: '-createdAt',
      draft: isDraftMode,
    })

    if (res.docs && res.docs.length > 0) {
      posts = res.docs.map((doc: any, idx: number) => ({
        id: doc.id,
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

  if (!pageDoc) {
    pageDoc = {
      title: 'News',
      slug: 'news',
      heroTag: 'News & Einblicke',
      heroTitle: 'News',
      heroSubtitle:
        'Handelsrouten, Ladung, Fachwissen und ein bisschen Hafengeschichte — geschrieben von Menschen, die den Kai kennen.',
    }
  }

  return (
    <PageLivePreview
      initialPage={pageDoc}
      fallbackTitle="News"
      fallbackSubtitle="Handelsrouten, Ladung, Fachwissen und ein bisschen Hafengeschichte — geschrieben von Menschen, die den Kai kennen."
      pageId="p-news"
    >
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
    </PageLivePreview>
  )
}
