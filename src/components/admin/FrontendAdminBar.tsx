'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAdmin } from '@/components/admin/AdminContext'
import { InlineEditDrawer } from '@/components/admin/InlineEditDrawer'
import { ToastContainer } from '@/components/admin/ToastContainer'

interface FrontendAdminBarProps {
  collection?: string
  id?: string | number
  title?: string
  status?: string
}

export function FrontendAdminBar({
  collection = 'pages',
  id,
  title,
  status,
}: FrontendAdminBarProps) {
  const { user, isLoading, isLivePreview, editMode, setEditMode, openOverlay } = useAdmin()
  const pathname = usePathname()
  const [isDraft, setIsDraft] = useState(false)

  // Detect draft mode cookie if set
  React.useEffect(() => {
    if (typeof document !== 'undefined') {
      setIsDraft(
        document.cookie.includes('__prerender_bypass') ||
          document.cookie.includes('__next_preview_data')
      )
    }
  }, [])

  if (isLoading || isLivePreview || !user) {
    return null
  }

  const editUrl = collection && id ? `/admin/collections/${collection}/${id}` : '/admin'

  const toggleDraftMode = () => {
    if (isDraft) {
      window.location.href = `/api/disable-draft?url=${encodeURIComponent(pathname)}`
    } else {
      window.location.href = `/api/draft?url=${encodeURIComponent(pathname)}`
    }
  }

  const handleOpenOverlay = () => {
    if (!id) return
    openOverlay({
      collection,
      id,
      title: title || 'Seite bearbeiten',
    })
  }

  return (
    <>
      <div
        id="gsl-admin-bar"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100000,
          background: '#071622',
          color: '#E0E8F0',
          fontFamily: 'var(--font-sans, system-ui, -apple-system, sans-serif)',
          fontSize: '13px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
        }}
      >
        <div
          style={{
            maxWidth: 1440,
            margin: '0 auto',
            padding: '7px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          {/* Left Side: Brand & Document Info */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Link
              href="/admin"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                color: '#FFFFFF',
                fontWeight: 700,
                textDecoration: 'none',
                padding: '3px 8px',
                borderRadius: 4,
                background: 'rgba(255, 255, 255, 0.08)',
                fontSize: '12px',
              }}
            >
              <span style={{ color: '#C8102E' }}>⚓</span> GSL Admin
            </Link>

            {title && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '13px' }}>
                <span style={{ color: '#8FA3B5' }}>Aktive Seite:</span>
                <span style={{ fontWeight: 600, color: '#FFFFFF' }}>{title}</span>
                {collection && (
                  <span
                    style={{
                      fontSize: '10.5px',
                      textTransform: 'uppercase',
                      letterSpacing: '.05em',
                      padding: '2px 6px',
                      borderRadius: 3,
                      background: 'rgba(200, 16, 46, 0.2)',
                      color: '#FF6B81',
                      fontWeight: 700,
                    }}
                  >
                    {collection}
                  </span>
                )}
              </div>
            )}

            {status && (
              <span
                style={{
                  fontSize: '11px',
                  padding: '2px 6px',
                  borderRadius: 3,
                  background:
                    status === 'published'
                      ? 'rgba(40, 167, 69, 0.2)'
                      : 'rgba(255, 193, 7, 0.2)',
                  color: status === 'published' ? '#5CD27B' : '#FFD24D',
                  fontWeight: 600,
                }}
              >
                {status === 'published' ? 'Veröffentlicht' : 'Entwurf'}
              </span>
            )}
          </div>

          {/* Right Side: Quick Action Buttons & Toggles */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {/* Primary Action: Open Edit Overlay Drawer */}
            {id && (
              <button
                type="button"
                onClick={handleOpenOverlay}
                title="Seite im Overlay-Editor öffnen (Sidebar mit Live-Vorschau)"
                style={{
                  background: '#C8102E',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '5px 12px',
                  borderRadius: 5,
                  fontSize: '12.5px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  boxShadow: '0 2px 6px rgba(200, 16, 46, 0.35)',
                }}
              >
                <span>✏️</span>
                <span>Seite im Overlay bearbeiten</span>
              </button>
            )}

            {/* Inline Edit Mode Toggle */}
            <button
              type="button"
              onClick={() => setEditMode((prev) => !prev)}
              title="Direkte Inline-Bearbeitung der Texte auf der Seite umschalten (Tastatur: ⌘E)"
              style={{
                background: editMode ? 'rgba(34, 197, 94, 0.2)' : 'rgba(255, 255, 255, 0.08)',
                color: editMode ? '#4ADE80' : '#8FA3B5',
                border: editMode
                  ? '1px solid rgba(74, 222, 128, 0.4)'
                  : '1px solid rgba(255, 255, 255, 0.1)',
                padding: '4px 10px',
                borderRadius: 5,
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <span>{editMode ? '⚡ Inline-Edit: An' : 'Inline-Edit: Aus'}</span>
              <kbd
                style={{
                  fontSize: '10px',
                  background: 'rgba(0,0,0,0.3)',
                  padding: '1px 4px',
                  borderRadius: 3,
                  color: '#E0E8F0',
                }}
              >
                ⌘E
              </kbd>
            </button>

            {/* Draft Mode Toggle */}
            <button
              type="button"
              onClick={toggleDraftMode}
              title={
                isDraft
                  ? 'Entwurfsmodus beenden'
                  : 'Entwurfsmodus aktivieren (zeigt unveröffentlichte Daten)'
              }
              style={{
                background: isDraft ? '#F59E0B' : 'rgba(255, 255, 255, 0.08)',
                color: '#FFFFFF',
                border: 'none',
                padding: '5px 10px',
                borderRadius: 5,
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5,
              }}
            >
              <span>{isDraft ? '👁️ Entwurf aktiv' : 'Entwurf: Aus'}</span>
            </button>

            {/* External Link to CMS */}
            <a
              href={editUrl}
              target="_blank"
              rel="noreferrer"
              title="Vollständiges Dokument in Payload CMS öffnen"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                color: '#CBD5E1',
                padding: '5px 10px',
                borderRadius: 5,
                fontSize: '12px',
                fontWeight: 600,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5,
              }}
            >
              <span>CMS ↗</span>
            </a>

            <span style={{ color: '#41556B', fontSize: '12px' }}>|</span>

            {/* User Info & Logout */}
            <span style={{ color: '#8FA3B5', fontSize: '12px' }}>{user.email}</span>
            <a
              href="/admin/logout"
              style={{
                color: '#8FA3B5',
                fontSize: '12px',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#8FA3B5')}
            >
              Abmelden
            </a>
          </div>
        </div>
      </div>

      {/* Global Slide-over Drawer for In-Context Editing */}
      <InlineEditDrawer />

      {/* Global Notifications */}
      <ToastContainer />
    </>
  )
}
