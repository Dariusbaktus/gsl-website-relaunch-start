'use client'

import React, { useState, useEffect } from 'react'
import { useAdmin } from './AdminContext'

export function InlineEditDrawer() {
  const {
    activeOverlay,
    closeOverlay,
    liveDocState,
    updateLiveField,
    saveDoc,
  } = useAdmin()

  const [isSaving, setIsSaving] = useState(false)
  const [dirty, setDirty] = useState(false)
  const [activeTab, setActiveTab] = useState<'content' | 'showcase' | 'meta'>('content')

  const docId = activeOverlay?.id ? String(activeOverlay.id) : null
  const currentDoc = docId ? liveDocState[docId] || activeOverlay?.initialData || {} : {}

  useEffect(() => {
    setDirty(false)
    setActiveTab('content')
  }, [activeOverlay?.id])

  // Hotkey support inside drawer: Cmd+S / Ctrl+S to save, Esc to close
  useEffect(() => {
    if (!activeOverlay) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 's') {
        e.preventDefault()
        handleSave(false)
      } else if (e.key === 'Escape') {
        e.preventDefault()
        handleClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeOverlay, currentDoc])

  if (!activeOverlay) return null

  const handleFieldChange = (field: string, val: any) => {
    setDirty(true)
    updateLiveField(field, val, activeOverlay.id)
  }

  const handleSave = async (draft = false) => {
    if (!activeOverlay) return
    setIsSaving(true)
    const success = await saveDoc(
      activeOverlay.collection,
      activeOverlay.id,
      currentDoc,
      draft
    )
    setIsSaving(false)
    if (success) {
      setDirty(false)
    }
  }

  const handleClose = () => {
    if (dirty) {
      if (
        !confirm(
          'Sie haben ungespeicherte Änderungen im Overlay. Möchten Sie das Overlay wirklich schließen?'
        )
      ) {
        return
      }
    }
    closeOverlay()
  }

  const cmsEditUrl = `/admin/collections/${activeOverlay.collection}/${activeOverlay.id}`
  const collection = activeOverlay.collection

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={handleClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(13, 34, 53, 0.45)',
          backdropFilter: 'blur(3px)',
          WebkitBackdropFilter: 'blur(3px)',
          zIndex: 100010,
          transition: 'opacity 0.25s ease',
        }}
      />

      {/* Slide-over Drawer Panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          maxWidth: 480,
          background: '#FFFFFF',
          boxShadow: '-10px 0 40px rgba(13, 34, 53, 0.25)',
          zIndex: 100020,
          display: 'flex',
          flexDirection: 'column',
          fontFamily: 'var(--font-sans, system-ui, -apple-system, sans-serif)',
          color: '#0D2235',
          animation: 'slideInRight 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <style>{`
          @keyframes slideInRight {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
          }
          .drawer-input:focus, .drawer-textarea:focus {
            outline: none;
            border-color: #C8102E !important;
            box-shadow: 0 0 0 3px rgba(200, 16, 46, 0.15) !important;
          }
          .drawer-tab-btn {
            border: none;
            background: none;
            padding: 8px 14px;
            font-size: 13px;
            font-weight: 600;
            color: #6C7D8B;
            border-bottom: 2px solid transparent;
            cursor: pointer;
            transition: all 0.15s ease;
          }
          .drawer-tab-btn.active {
            color: #C8102E;
            border-bottom-color: #C8102E;
          }
        `}</style>

        {/* Header */}
        <div
          style={{
            padding: '16px 20px',
            borderBottom: '1px solid #E2E8F0',
            background: '#F8FAFC',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '.06em',
                textTransform: 'uppercase',
                color: '#C8102E',
                marginBottom: 2,
              }}
            >
              <span>⚡ Inline Overlay-Editor</span>
              <span
                style={{
                  background: '#E2E8F0',
                  color: '#475569',
                  padding: '1px 6px',
                  borderRadius: 4,
                  fontSize: 10,
                }}
              >
                {collection}
              </span>
              {dirty && (
                <span
                  style={{
                    background: '#FEF3C7',
                    color: '#92400E',
                    padding: '1px 6px',
                    borderRadius: 4,
                    fontSize: 10,
                  }}
                >
                  Ungespeichert
                </span>
              )}
            </div>
            <h3
              id="drawer-title"
              style={{
                margin: 0,
                fontSize: 17,
                fontWeight: 700,
                color: '#0D2235',
              }}
            >
              {activeOverlay.title || currentDoc.title || currentDoc.name || 'Inhalte bearbeiten'}
            </h3>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <a
              href={cmsEditUrl}
              target="_blank"
              rel="noreferrer"
              title="Vollständiges Dokument in Payload CMS öffnen"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
                padding: '6px 10px',
                borderRadius: 6,
                background: '#FFFFFF',
                border: '1px solid #CBD5E1',
                color: '#475569',
                fontSize: 12,
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              CMS ↗
            </a>
            <button
              onClick={handleClose}
              title="Overlay schließen (Esc)"
              style={{
                border: 'none',
                background: '#E2E8F0',
                color: '#0D2235',
                width: 30,
                height: 30,
                borderRadius: '50%',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 15,
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              ✕
            </button>
          </div>
        </div>

        {/* Tab Bar (for pages with showcase or meta) */}
        {collection === 'pages' && (
          <div
            style={{
              display: 'flex',
              borderBottom: '1px solid #E2E8F0',
              padding: '0 16px',
              background: '#FFFFFF',
            }}
          >
            <button
              className={`drawer-tab-btn ${activeTab === 'content' ? 'active' : ''}`}
              onClick={() => setActiveTab('content')}
            >
              Texte & Hero
            </button>
            {currentDoc.slug === 'home' && (
              <button
                className={`drawer-tab-btn ${activeTab === 'showcase' ? 'active' : ''}`}
                onClick={() => setActiveTab('showcase')}
              >
                Ladungen ({currentDoc.homeShowcase?.length || 0})
              </button>
            )}
            <button
              className={`drawer-tab-btn ${activeTab === 'meta' ? 'active' : ''}`}
              onClick={() => setActiveTab('meta')}
            >
              SEO & Meta
            </button>
          </div>
        )}

        {/* Body / Scrollable Form */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: 18,
          }}
        >
          {/* Collection: Pages */}
          {collection === 'pages' && (
            <>
              {activeTab === 'content' && (
                <>
                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontSize: 12,
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '.05em',
                        color: '#475569',
                        marginBottom: 6,
                      }}
                    >
                      Kategorie / Eyebrow (Hero Tag)
                    </label>
                    <input
                      type="text"
                      className="drawer-input"
                      value={currentDoc.heroTag || ''}
                      placeholder="z. B. Linienagentur · Bremen"
                      onChange={(e) => handleFieldChange('heroTag', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '9px 12px',
                        borderRadius: 6,
                        border: '1px solid #CBD5E1',
                        fontSize: 14,
                        color: '#0D2235',
                      }}
                    />
                    <span style={{ fontSize: 11, color: '#64748B', marginTop: 4, display: 'block' }}>
                      Erscheint oberhalb der Hauptüberschrift.
                    </span>
                  </div>

                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontSize: 12,
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '.05em',
                        color: '#475569',
                        marginBottom: 6,
                      }}
                    >
                      Hauptüberschrift (Hero Title) *
                    </label>
                    <textarea
                      className="drawer-textarea"
                      rows={3}
                      value={currentDoc.heroTitle || currentDoc.title || ''}
                      placeholder="Überschrift eingeben..."
                      onChange={(e) => handleFieldChange('heroTitle', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '9px 12px',
                        borderRadius: 6,
                        border: '1px solid #CBD5E1',
                        fontSize: 14,
                        lineHeight: 1.4,
                        color: '#0D2235',
                        fontFamily: 'inherit',
                        resize: 'vertical',
                      }}
                    />
                  </div>

                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontSize: 12,
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '.05em',
                        color: '#475569',
                        marginBottom: 6,
                      }}
                    >
                      Untertitel / Beschreibung (Hero Subtitle)
                    </label>
                    <textarea
                      className="drawer-textarea"
                      rows={4}
                      value={currentDoc.heroSubtitle || ''}
                      placeholder="Begleittext eingeben..."
                      onChange={(e) => handleFieldChange('heroSubtitle', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '9px 12px',
                        borderRadius: 6,
                        border: '1px solid #CBD5E1',
                        fontSize: 14,
                        lineHeight: 1.4,
                        color: '#0D2235',
                        fontFamily: 'inherit',
                        resize: 'vertical',
                      }}
                    />
                  </div>

                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontSize: 12,
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '.05em',
                        color: '#475569',
                        marginBottom: 6,
                      }}
                    >
                      Interner Seitentitel
                    </label>
                    <input
                      type="text"
                      className="drawer-input"
                      value={currentDoc.title || ''}
                      onChange={(e) => handleFieldChange('title', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '9px 12px',
                        borderRadius: 6,
                        border: '1px solid #CBD5E1',
                        fontSize: 14,
                        color: '#0D2235',
                      }}
                    />
                  </div>
                </>
              )}

              {activeTab === 'showcase' && currentDoc.homeShowcase && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={{ fontSize: 13, color: '#64748B' }}>
                    Kacheln der Startseite („Was wir bewegen“). Änderungen aktualisieren die Seite live im Hintergrund.
                  </div>
                  {currentDoc.homeShowcase.map((item: any, idx: number) => (
                    <div
                      key={idx}
                      style={{
                        padding: 14,
                        borderRadius: 8,
                        border: '1px solid #E2E8F0',
                        background: '#F8FAFC',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 10,
                      }}
                    >
                      <div style={{ fontWeight: 700, fontSize: 13, color: '#C8102E' }}>
                        Kachel #{idx + 1}
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#475569' }}>
                          Titel
                        </label>
                        <input
                          type="text"
                          className="drawer-input"
                          value={item.title || ''}
                          onChange={(e) => {
                            const updated = [...currentDoc.homeShowcase]
                            updated[idx] = { ...updated[idx], title: e.target.value }
                            handleFieldChange('homeShowcase', updated)
                          }}
                          style={{
                            width: '100%',
                            padding: '6px 10px',
                            borderRadius: 4,
                            border: '1px solid #CBD5E1',
                            fontSize: 13,
                          }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#475569' }}>
                          Untertitel / Kennzahl
                        </label>
                        <input
                          type="text"
                          className="drawer-input"
                          value={item.subtitle || ''}
                          onChange={(e) => {
                            const updated = [...currentDoc.homeShowcase]
                            updated[idx] = { ...updated[idx], subtitle: e.target.value }
                            handleFieldChange('homeShowcase', updated)
                          }}
                          style={{
                            width: '100%',
                            padding: '6px 10px',
                            borderRadius: 4,
                            border: '1px solid #CBD5E1',
                            fontSize: 13,
                          }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#475569' }}>
                          Ziellink
                        </label>
                        <input
                          type="text"
                          className="drawer-input"
                          value={item.link || '/ladungen'}
                          onChange={(e) => {
                            const updated = [...currentDoc.homeShowcase]
                            updated[idx] = { ...updated[idx], link: e.target.value }
                            handleFieldChange('homeShowcase', updated)
                          }}
                          style={{
                            width: '100%',
                            padding: '6px 10px',
                            borderRadius: 4,
                            border: '1px solid #CBD5E1',
                            fontSize: 13,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'meta' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontSize: 12,
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        color: '#475569',
                        marginBottom: 6,
                      }}
                    >
                      Meta Titel (Suchmaschinen)
                    </label>
                    <input
                      type="text"
                      className="drawer-input"
                      value={currentDoc.meta?.title || ''}
                      onChange={(e) =>
                        handleFieldChange('meta', {
                          ...(currentDoc.meta || {}),
                          title: e.target.value,
                        })
                      }
                      style={{
                        width: '100%',
                        padding: '9px 12px',
                        borderRadius: 6,
                        border: '1px solid #CBD5E1',
                        fontSize: 14,
                      }}
                    />
                  </div>
                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontSize: 12,
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        color: '#475569',
                        marginBottom: 6,
                      }}
                    >
                      Meta Beschreibung (Google Snippet)
                    </label>
                    <textarea
                      className="drawer-textarea"
                      rows={3}
                      value={currentDoc.meta?.description || ''}
                      onChange={(e) =>
                        handleFieldChange('meta', {
                          ...(currentDoc.meta || {}),
                          description: e.target.value,
                        })
                      }
                      style={{
                        width: '100%',
                        padding: '9px 12px',
                        borderRadius: 6,
                        border: '1px solid #CBD5E1',
                        fontSize: 14,
                        resize: 'vertical',
                      }}
                    />
                  </div>
                </div>
              )}
            </>
          )}

          {/* Collection: Posts */}
          {collection === 'posts' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#475569', marginBottom: 6 }}>
                  Titel *
                </label>
                <input
                  type="text"
                  className="drawer-input"
                  value={currentDoc.title || ''}
                  onChange={(e) => handleFieldChange('title', e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: 6, border: '1px solid #CBD5E1', fontSize: 14 }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#475569', marginBottom: 6 }}>
                  Kategorie
                </label>
                <input
                  type="text"
                  className="drawer-input"
                  value={currentDoc.category || ''}
                  onChange={(e) => handleFieldChange('category', e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: 6, border: '1px solid #CBD5E1', fontSize: 14 }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#475569', marginBottom: 6 }}>
                  Monat / Veröffentlichungsdatum
                </label>
                <input
                  type="text"
                  className="drawer-input"
                  value={currentDoc.month || ''}
                  placeholder="z. B. August 2026"
                  onChange={(e) => handleFieldChange('month', e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: 6, border: '1px solid #CBD5E1', fontSize: 14 }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#475569', marginBottom: 6 }}>
                  Teaser / Zusammenfassung
                </label>
                <textarea
                  className="drawer-textarea"
                  rows={4}
                  value={currentDoc.teaser || ''}
                  onChange={(e) => handleFieldChange('teaser', e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: 6, border: '1px solid #CBD5E1', fontSize: 14, resize: 'vertical' }}
                />
              </div>
            </div>
          )}

          {/* Collection: Team Members */}
          {collection === 'team-members' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#475569', marginBottom: 6 }}>
                  Name *
                </label>
                <input
                  type="text"
                  className="drawer-input"
                  value={currentDoc.name || ''}
                  onChange={(e) => handleFieldChange('name', e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: 6, border: '1px solid #CBD5E1', fontSize: 14 }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#475569', marginBottom: 6 }}>
                  Position / Rolle *
                </label>
                <input
                  type="text"
                  className="drawer-input"
                  value={currentDoc.role || ''}
                  onChange={(e) => handleFieldChange('role', e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: 6, border: '1px solid #CBD5E1', fontSize: 14 }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#475569', marginBottom: 6 }}>
                  Telefon
                </label>
                <input
                  type="text"
                  className="drawer-input"
                  value={currentDoc.phone || ''}
                  onChange={(e) => handleFieldChange('phone', e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: 6, border: '1px solid #CBD5E1', fontSize: 14 }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#475569', marginBottom: 6 }}>
                  Mobiltelefon
                </label>
                <input
                  type="text"
                  className="drawer-input"
                  value={currentDoc.mobile || ''}
                  onChange={(e) => handleFieldChange('mobile', e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: 6, border: '1px solid #CBD5E1', fontSize: 14 }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#475569', marginBottom: 6 }}>
                  E-Mail
                </label>
                <input
                  type="email"
                  className="drawer-input"
                  value={currentDoc.email || ''}
                  onChange={(e) => handleFieldChange('email', e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: 6, border: '1px solid #CBD5E1', fontSize: 14 }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div
          style={{
            padding: '16px 20px',
            borderTop: '1px solid #E2E8F0',
            background: '#F8FAFC',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
          }}
        >
          <button
            type="button"
            onClick={() => handleSave(true)}
            disabled={isSaving}
            style={{
              padding: '9px 14px',
              borderRadius: 6,
              background: '#FFFFFF',
              border: '1px solid #CBD5E1',
              color: '#334155',
              fontSize: 13,
              fontWeight: 600,
              cursor: isSaving ? 'not-allowed' : 'pointer',
              opacity: isSaving ? 0.6 : 1,
            }}
          >
            {isSaving ? 'Speichern...' : 'Als Entwurf'}
          </button>

          <div style={{ display: 'flex', gap: 8 }}>
            <button
              type="button"
              onClick={handleClose}
              style={{
                padding: '9px 14px',
                borderRadius: 6,
                background: 'transparent',
                border: 'none',
                color: '#64748B',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Schließen
            </button>

            <button
              type="button"
              onClick={() => handleSave(false)}
              disabled={isSaving}
              style={{
                padding: '9px 18px',
                borderRadius: 6,
                background: '#C8102E',
                border: 'none',
                color: '#FFFFFF',
                fontSize: 13,
                fontWeight: 700,
                boxShadow: '0 2px 8px rgba(200, 16, 46, 0.3)',
                cursor: isSaving ? 'not-allowed' : 'pointer',
                opacity: isSaving ? 0.6 : 1,
              }}
            >
              {isSaving ? 'Veröffentlichen...' : 'Veröffentlichen ✓'}
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}
