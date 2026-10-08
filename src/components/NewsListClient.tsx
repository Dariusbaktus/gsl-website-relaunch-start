'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { EditableSection } from '@/components/admin/EditableSection'

const CATEGORIES = ['Alle', 'Ladung', 'Routen', 'Menschen', 'Fachwissen', 'Historie']

export interface PostItem {
  id?: string | number
  slug: string
  title: string
  category: string
  month: string
  teaser: string
  thumb?: string
  alt?: string
}

export function NewsListClient({ initialPosts }: { initialPosts: PostItem[] }) {
  const [activeCat, setActiveCat] = useState('Alle')

  const filtered = initialPosts.filter((art) => {
    if (activeCat === 'Alle') return true
    return art.category?.toLowerCase() === activeCat.toLowerCase()
  })

  return (
    <>
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
        {filtered.map((article) => (
          <EditableSection
            key={article.slug}
            collection="posts"
            id={article.id}
            title={`${article.title} bearbeiten`}
            style={{ marginBottom: 16 }}
          >
            <Link
              href={`/news/${article.slug}`}
              className="post link"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div className="thumb hb">
                <img
                  src={article.thumb || '/media/news-1.jpg'}
                  alt={article.alt || article.title}
                  width={700}
                  height={525}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div>
                <span className="cat">{article.category}</span>
                <div className="date">{article.month}</div>
                <h3>{article.title}</h3>
                <p>{article.teaser}</p>
              </div>
            </Link>
          </EditableSection>
        ))}
      </div>
    </>
  )
}
