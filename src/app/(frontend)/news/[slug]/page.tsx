import React from 'react'
import { notFound } from 'next/navigation'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import config from '@/payload.config'
import articlesData from '@/data/articles.json'
import { NewsDetailLivePreview } from '@/components/live-preview/NewsDetailLivePreview'

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
      draft: true,
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
  const { isEnabled: isDraftMode } = await draftMode()

  let post: any = null
  let allPosts: any[] = []

  try {
    const payload = await getPayload({ config })
    const res = await payload.find({
      collection: 'posts',
      where: { slug: { equals: slug } },
      draft: isDraftMode,
    })
    if (res.docs && res.docs.length > 0) {
      post = res.docs[0]
    }

    const allRes = await payload.find({
      collection: 'posts',
      where: isDraftMode ? {} : { _status: { equals: 'published' } },
      sort: '-createdAt',
      limit: 10,
      draft: isDraftMode,
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

  return <NewsDetailLivePreview initialPost={post} relatedPosts={related} />
}
