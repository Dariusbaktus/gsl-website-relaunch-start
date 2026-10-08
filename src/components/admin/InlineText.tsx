'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useAdmin } from './AdminContext'

interface InlineTextProps {
  collection?: string
  id?: string | number
  field: string
  value?: string
  label?: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div'
  multiline?: boolean
  className?: string
  style?: React.CSSProperties
  fallback?: string
}

export function InlineText({
  collection = 'pages',
  id,
  field,
  value: initialValue = '',
  label,
  as: Component = 'span',
  multiline = false,
  className = '',
  style = {},
  fallback = '',
}: InlineTextProps) {
  const { user, isLivePreview, editMode, liveDocState, updateLiveField, saveDoc } = useAdmin()

  const docId = id ? String(id) : null
  const currentLiveVal = docId && liveDocState[docId]?.[field] !== undefined
    ? liveDocState[docId][field]
    : initialValue

  const [isEditing, setIsEditing] = useState(false)
  const [val, setVal] = useState(currentLiveVal || fallback)
  const [isSaving, setIsSaving] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null)

  // Keep local state in sync if external data updates
  useEffect(() => {
    if (!isEditing) {
      setVal(currentLiveVal || fallback)
    }
  }, [currentLiveVal, fallback, isEditing])

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      // Put cursor at end of text
      const len = inputRef.current.value.length
      if ('setSelectionRange' in inputRef.current) {
        inputRef.current.setSelectionRange(len, len)
      }
    }
  }, [isEditing])

  const canEdit = !!user && editMode && !isLivePreview && !!id

  if (!canEdit) {
    return <Component className={className} style={style}>{currentLiveVal || fallback}</Component>
  }

  const handleStartEdit = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsEditing(true)
  }

  const handleCancel = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    setVal(currentLiveVal || fallback)
    setIsEditing(false)
  }

  const handleSave = async (e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    if (!id) return
    setIsSaving(true)
    updateLiveField(field, val, id)
    const success = await saveDoc(collection, id, { [field]: val }, false)
    setIsSaving(false)
    if (success) {
      setIsEditing(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault()
      handleCancel()
    } else if (e.key === 'Enter') {
      if (!multiline || e.metaKey || e.ctrlKey) {
        e.preventDefault()
        handleSave()
      }
    }
  }

  return (
    <span
      className={`inline-edit-wrapper ${className}`}
      style={{
        position: 'relative',
        display: Component === 'div' || Component === 'p' || Component.startsWith('h') ? 'block' : 'inline-block',
        ...style,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Floating Action Pill when Editing */}
      {isEditing && (
        <span
          style={{
            position: 'absolute',
            bottom: 'calc(100% + 8px)',
            left: 0,
            zIndex: 99995,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            background: '#0D2235',
            color: '#FFFFFF',
            padding: '4px 8px',
            borderRadius: 6,
            boxShadow: '0 4px 16px rgba(13,34,53,0.35)',
            fontSize: 12,
            fontWeight: 600,
            whiteSpace: 'nowrap',
            pointerEvents: 'auto',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <span style={{ color: '#E2E8F0', marginRight: 4 }}>
            {label || field}
          </span>
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            title="Speichern (Enter)"
            style={{
              border: 'none',
              background: '#22C55E',
              color: '#FFFFFF',
              padding: '3px 8px',
              borderRadius: 4,
              fontSize: 11,
              fontWeight: 700,
              cursor: isSaving ? 'wait' : 'pointer',
            }}
          >
            {isSaving ? '...' : '✓ Speichern'}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            title="Abbrechen (Esc)"
            style={{
              border: 'none',
              background: 'rgba(255,255,255,0.2)',
              color: '#FFFFFF',
              padding: '3px 7px',
              borderRadius: 4,
              fontSize: 11,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            ✕
          </button>
        </span>
      )}

      {/* Hover Indicator Pencil */}
      {!isEditing && isHovered && (
        <span
          onClick={handleStartEdit}
          title={`Direkt bearbeiten: ${label || field}`}
          style={{
            position: 'absolute',
            top: -12,
            right: -12,
            zIndex: 9999,
            background: '#C8102E',
            color: '#FFFFFF',
            width: 24,
            height: 24,
            borderRadius: '50%',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 11,
            boxShadow: '0 2px 6px rgba(200, 16, 46, 0.4)',
            cursor: 'pointer',
            transform: 'scale(1)',
            transition: 'transform 0.15s ease',
          }}
        >
          ✏️
        </span>
      )}

      {/* Editing Input vs Rendered Text */}
      {isEditing ? (
        multiline ? (
          <textarea
            ref={inputRef as any}
            value={val}
            onChange={(e) => setVal(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{
              width: '100%',
              minHeight: 80,
              padding: '8px 10px',
              borderRadius: 6,
              border: '2px solid #C8102E',
              background: '#FFFFFF',
              color: '#0D2235',
              fontSize: 'inherit',
              fontFamily: 'inherit',
              fontWeight: 'inherit',
              lineHeight: 'inherit',
              boxShadow: '0 0 0 4px rgba(200, 16, 46, 0.15)',
              resize: 'vertical',
            }}
          />
        ) : (
          <input
            ref={inputRef as any}
            type="text"
            value={val}
            onChange={(e) => setVal(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{
              width: '100%',
              padding: '4px 8px',
              borderRadius: 4,
              border: '2px solid #C8102E',
              background: '#FFFFFF',
              color: '#0D2235',
              fontSize: 'inherit',
              fontFamily: 'inherit',
              fontWeight: 'inherit',
              lineHeight: 'inherit',
              boxShadow: '0 0 0 4px rgba(200, 16, 46, 0.15)',
            }}
          />
        )
      ) : (
        <Component
          onClick={handleStartEdit}
          style={{
            cursor: 'pointer',
            outline: isHovered ? '2px dashed rgba(200, 16, 46, 0.6)' : 'none',
            outlineOffset: '3px',
            borderRadius: 2,
            transition: 'outline 0.15s ease',
          }}
        >
          {currentLiveVal || fallback}
        </Component>
      )}
    </span>
  )
}
