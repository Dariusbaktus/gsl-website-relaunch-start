'use client'

import React, { useState } from 'react'
import { useAdmin } from '@/components/admin/AdminContext'

interface EditableSectionProps {
  children: React.ReactNode
  collection?: string
  id?: string | number
  title?: string
  initialData?: any
  fields?: string[]
  style?: React.CSSProperties
  className?: string
}

export function EditableSection({
  children,
  collection = 'pages',
  id,
  title = 'Abschnitt bearbeiten',
  initialData,
  fields,
  style,
  className = '',
}: EditableSectionProps) {
  const { user, isLivePreview, editMode, openOverlay } = useAdmin()
  const [isHovered, setIsHovered] = useState(false)

  const showControls = !!user && editMode && !isLivePreview && !!id
  const adminEditUrl = `/admin/collections/${collection}/${id}`

  const handleOpenOverlay = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!id) return
    openOverlay({
      collection,
      id,
      title,
      initialData,
      fields,
    })
  }

  return (
    <div
      className={`editable-section-wrap ${className}`}
      style={{
        position: 'relative',
        outline: showControls && isHovered ? '2px dashed #C8102E' : 'none',
        outlineOffset: '-2px',
        transition: 'outline 0.15s ease-in-out',
        ...style,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {showControls && isHovered && (
        <div
          style={{
            position: 'absolute',
            top: 12,
            right: 14,
            zIndex: 9999,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            background: '#0D2235',
            color: '#FFFFFF',
            padding: '3px 4px',
            borderRadius: 8,
            boxShadow: '0 4px 16px rgba(13, 34, 53, 0.35)',
            border: '1px solid rgba(255, 255, 255, 0.25)',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Main Action: Open Inline Edit Overlay */}
          <button
            type="button"
            onClick={handleOpenOverlay}
            title={`Im Overlay bearbeiten: ${title}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              background: '#C8102E',
              color: '#FFFFFF',
              border: 'none',
              padding: '6px 12px',
              borderRadius: 5,
              fontSize: 12.5,
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'background 0.15s ease',
            }}
          >
            <span>✏️</span>
            <span>{title} im Overlay</span>
          </button>

          {/* Secondary Action: Jump to CMS Admin */}
          <a
            href={adminEditUrl}
            target="_blank"
            rel="noreferrer"
            title="In Payload CMS öffnen"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '6px 8px',
              color: 'rgba(255, 255, 255, 0.75)',
              textDecoration: 'none',
              fontSize: 12,
              borderRadius: 4,
              transition: 'color 0.15s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.75)')}
          >
            CMS ↗
          </a>
        </div>
      )}
      {children}
    </div>
  )
}
