import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@/payload.config'
import articlesData from '@/data/articles.json'

export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  let title = 'News · Global Shipping & Logistics GmbH'
  let description = ''

  try {
    const payload = await getPayload({ config })
    const res = await payload.find({
      collection: 'posts',
      where: { slug: { equals: slug } },
    })
    if (res.docs && res.docs.length > 0) {
      title = `${res.docs[0].title} · GSL News`
      description = res.docs[0].teaser
    }
  } catch {
    const found = articlesData.find((a) => a.slug === slug)
    if (found) {
      title = `${found.titel} · GSL News`
      description = found.teaser
    }
  }

  return { title, description }
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params

  let post: any = null
  let allPosts: any[] = []

  try {
    const payload = await getPayload({ config })
    const res = await payload.find({
      collection: 'posts',
      where: { slug: { equals: slug } },
    })
    if (res.docs && res.docs.length > 0) {
      post = res.docs[0]
    }

    const allRes = await payload.find({
      collection: 'posts',
      where: { _status: { equals: 'published' } },
      sort: '-createdAt',
      limit: 10,
    })
    allPosts = allRes.docs
  } catch (e) {
    console.error('Payload fetch error:', e)
  }

  if (!post) {
    const found = articlesData.find((a) => a.slug === slug)
    if (!found) {
      notFound()
    }
    post = {
      title: found.titel,
      slug: found.slug,
      category: found.kat,
      month: found.monat,
      teaser: found.teaser,
      statusTag: found.roh ? 'roh' : 'entwurf',
      body: found.body,
    }
    allPosts = articlesData.map((a) => ({
      title: a.titel,
      slug: a.slug,
      category: a.kat,
      month: a.monat,
      teaser: a.teaser,
    }))
  }

  const related = allPosts.filter((p: any) => p.slug !== slug).slice(0, 3)

  return (
    <div className="page on" id="p-beitrag">
      <section className="phead">
        <div className="wrap">
          <Link href="/news" className="back">
            ← Zurück zur Übersicht
          </Link>
          <span className="bkat">{post.category}</span>
          <h1 className="btitel">{post.title}</h1>
          <div className="bmeta">
            <span>{post.month}</span>
            <span>·</span>
            <span>Global Shipping &amp; Logistics GmbH</span>
            <span>·</span>
            <span>Lesezeit ca. 3 Minuten</span>
          </div>
          {post.statusTag === 'roh' ? (
            <div className="bhinweis" style={{ background: '#FDF7E8', borderColor: '#E5C158', color: '#6E520A' }}>
              <b>Stand: Rohfassung</b> — Vor-Ort-Recherche in Brake und Begleitung der Schicht stehen noch aus.
            </div>
          ) : (
            <div className="bhinweis">
              <b>Stand: Entwurf</b> — Text aus dem Redaktionsplan zur Abstimmung. Fachliche Prüfung steht noch aus.
            </div>
          )}
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="bbody">
            <p className="lead">{post.teaser}</p>

            {Array.isArray(post.body) &&
              post.body.map((block: [string, string], index: number) => {
                const [type, content] = block
                if (type === 'h') {
                  return <h3 key={index}>{content}</h3>
                }
                if (type === 'p') {
                  return <p key={index}>{content}</p>
                }
                if (type === 'b') {
                  const items = content.split(' | ')
                  return (
                    <ul key={index}>
                      {items.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  )
                }
                if (type === 'q') {
                  return (
                    <blockquote key={index} style={{ borderLeft: '3px solid var(--red)', paddingLeft: 16, margin: '20px 0', fontStyle: 'italic', color: 'var(--navy)' }}>
                      {content}
                    </blockquote>
                  )
                }
                return null
              })}
          </div>

          <div className="bweiter">
            <h3>Weitere Beiträge</h3>
            <div className="grid3" style={{ gap: 18 }}>
              {related.map((rel: any) => (
                <Link
                  key={rel.slug}
                  href={`/news/${rel.slug}`}
                  className="card link"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <span className="cat" style={{ display: 'inline-block', fontSize: '11.5px', fontWeight: 700, letterSpacing: '.07em', textTransform: 'uppercase', color: 'var(--red)', marginBottom: 8 }}>
                    {rel.category || rel.kat}
                  </span>
                  <div style={{ fontSize: '13.5px', color: 'var(--muted)', marginBottom: 6 }}>
                    {rel.month || rel.monat}
                  </div>
                  <h4 style={{ margin: 0, color: 'var(--navy)' }}>{rel.title || rel.titel}</h4>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
