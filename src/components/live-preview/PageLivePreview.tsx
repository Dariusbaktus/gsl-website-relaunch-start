'use client'

import React, { useEffect } from 'react'
import { useLivePreview } from '@payloadcms/live-preview-react'
import { FrontendAdminBar } from '@/components/admin/FrontendAdminBar'
import { EditableSection } from '@/components/admin/EditableSection'
import { InlineText } from '@/components/admin/InlineText'
import { useAdmin } from '@/components/admin/AdminContext'

interface PageLivePreviewProps {
  initialPage: any
  fallbackTitle: string
  fallbackSubtitle?: string
  fallbackTag?: string
  pageId?: string
  children?: React.ReactNode | ((page: any) => React.ReactNode)
}

export function PageLivePreview({
  initialPage,
  fallbackTitle,
  fallbackSubtitle,
  fallbackTag,
  pageId,
  children,
}: PageLivePreviewProps) {
  const { data: page } = useLivePreview<any>({
    initialData: initialPage,
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3002',
    depth: 2,
  })

  const { registerLiveDoc, liveDocState } = useAdmin()

  useEffect(() => {
    if (page?.id) {
      return registerLiveDoc(page.id, page)
    }
  }, [page, registerLiveDoc])

  const docId = page?.id ? String(page.id) : null
  const currentLive = docId && liveDocState[docId] ? { ...page, ...liveDocState[docId] } : page

  const title = currentLive?.heroTitle || currentLive?.title || fallbackTitle
  const subtitle = currentLive?.heroSubtitle || fallbackSubtitle
  const tag = currentLive?.heroTag || fallbackTag

  return (
    <>
      <FrontendAdminBar
        collection="pages"
        id={currentLive?.id}
        title={currentLive?.title || fallbackTitle}
        status={currentLive?._status || 'published'}
      />
      <div className="page on" id={pageId}>
        <EditableSection
          collection="pages"
          id={currentLive?.id}
          title="Seitenkopf"
          initialData={currentLive}
        >
          <section className="phead">
            <div className="wrap">
              {(tag || currentLive?.heroTag) && (
                <span className="bkat">
                  <InlineText
                    collection="pages"
                    id={currentLive?.id}
                    field="heroTag"
                    value={tag}
                    label="Kategorie / Tagline"
                    fallback={fallbackTag || 'Kategorie'}
                  />
                </span>
              )}
              <h1>
                <InlineText
                  collection="pages"
                  id={currentLive?.id}
                  field="heroTitle"
                  value={title}
                  label="Seitenüberschrift"
                  fallback={fallbackTitle}
                />
              </h1>
              {(subtitle || currentLive?.heroSubtitle) && (
                <p>
                  <InlineText
                    collection="pages"
                    id={currentLive?.id}
                    field="heroSubtitle"
                    value={subtitle}
                    label="Untertitel"
                    multiline
                    fallback={fallbackSubtitle || ''}
                  />
                </p>
              )}
            </div>
          </section>
        </EditableSection>

        {typeof children === 'function' ? children(currentLive) : children}
      </div>
    </>
  )
}
