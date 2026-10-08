'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import { useLivePreview } from '@payloadcms/live-preview-react'
import { EditableSection } from '@/components/admin/EditableSection'
import { FrontendAdminBar } from '@/components/admin/FrontendAdminBar'
import { InlineText } from '@/components/admin/InlineText'
import { useAdmin } from '@/components/admin/AdminContext'

interface NewsDetailLivePreviewProps {
  initialPost: any
  relatedPosts: any[]
}

export function NewsDetailLivePreview({ initialPost, relatedPosts }: NewsDetailLivePreviewProps) {
  const { data: post } = useLivePreview<any>({
    initialData: initialPost,
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3002',
    depth: 2,
  })

  const { registerLiveDoc, liveDocState } = useAdmin()

  useEffect(() => {
    if (post?.id) {
      return registerLiveDoc(post.id, post)
    }
  }, [post, registerLiveDoc])

  const docId = post?.id ? String(post.id) : null
  const currentLive = docId && liveDocState[docId] ? { ...post, ...liveDocState[docId] } : post

  return (
    <>
      <FrontendAdminBar
        collection="posts"
        id={currentLive?.id}
        title={currentLive?.title}
        status={currentLive?._status || 'published'}
      />

      <div className="page on" id="p-beitrag">
        <EditableSection
          collection="posts"
          id={currentLive?.id}
          title="Kopfzeile"
          initialData={currentLive}
        >
          <section className="phead">
            <div className="wrap">
              <Link href="/news" className="back">
                ← Zurück zur Übersicht
              </Link>
              <span className="bkat">
                <InlineText
                  collection="posts"
                  id={currentLive?.id}
                  field="category"
                  value={currentLive.category}
                  label="Kategorie"
                  fallback="Aktuelles"
                />
              </span>
              <h1 className="btitel">
                <InlineText
                  collection="posts"
                  id={currentLive?.id}
                  field="title"
                  value={currentLive.title}
                  label="Artikeltitel"
                  fallback="Artikel"
                />
              </h1>
              <div className="bmeta">
                <span>{currentLive.month}</span>
                <span>·</span>
                <span>Global Shipping &amp; Logistics GmbH</span>
                <span>·</span>
                <span>Lesezeit ca. 3 Minuten</span>
              </div>
              {currentLive.statusTag === 'roh' ? (
                <div
                  className="bhinweis"
                  style={{ background: '#FDF7E8', borderColor: '#E5C158', color: '#6E520A' }}
                >
                  <b>Stand: Rohfassung</b> — Vor-Ort-Recherche in Brake und Begleitung der Schicht stehen noch aus.
                </div>
              ) : (
                <div className="bhinweis">
                  <b>Stand: Entwurf</b> — Text aus dem Redaktionsplan zur Abstimmung. Fachliche Prüfung steht noch aus.
                </div>
              )}
            </div>
          </section>
        </EditableSection>

        <section className="sec">
          <div className="wrap">
            <EditableSection
              collection="posts"
              id={currentLive?.id}
              title="Artikeltext"
              initialData={currentLive}
            >
              <div className="bbody">
                <p className="lead">
                  <InlineText
                    collection="posts"
                    id={currentLive?.id}
                    field="teaser"
                    value={currentLive.teaser}
                    label="Teaser / Einleitung"
                    multiline
                    fallback=""
                  />
                </p>

                {Array.isArray(currentLive.body) &&
                  currentLive.body.map((block: any, index: number) => {
                    const type = Array.isArray(block)
                      ? block[0]
                      : block?.[0] || block?.['0'] || block?.type
                    const content = Array.isArray(block)
                      ? block[1]
                      : block?.[1] || block?.['1'] || block?.content
                    if (typeof content !== 'string') return null

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
                          {items.map((item: string, i: number) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      )
                    }
                    if (type === 'q') {
                      return (
                        <blockquote
                          key={index}
                          style={{
                            borderLeft: '3px solid var(--red)',
                            paddingLeft: 16,
                            margin: '20px 0',
                            fontStyle: 'italic',
                            color: 'var(--navy)',
                          }}
                        >
                          {content}
                        </blockquote>
                      )
                    }
                    return null
                  })}
              </div>
            </EditableSection>

            <div className="bweiter">
              <h3>Weitere Beiträge</h3>
              <div className="grid3" style={{ gap: 18 }}>
                {relatedPosts.map((rel: any) => (
                  <Link
                    key={rel.slug}
                    href={`/news/${rel.slug}`}
                    className="card link"
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <span
                      className="cat"
                      style={{
                        display: 'inline-block',
                        fontSize: '11.5px',
                        fontWeight: 700,
                        letterSpacing: '.07em',
                        textTransform: 'uppercase',
                        color: 'var(--red)',
                        marginBottom: 8,
                      }}
                    >
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
    </>
  )
}
