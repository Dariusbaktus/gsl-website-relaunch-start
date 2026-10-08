'use client'

import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react'

export interface AdminUser {
  id: string
  email: string
  name?: string
}

export interface ToastMessage {
  id: string
  message: string
  type: 'success' | 'error' | 'info'
}

export interface OverlayOptions {
  collection: string
  id: string | number
  title?: string
  initialData?: any
  fields?: string[] // optional subset of fields to edit
}

interface AdminContextType {
  user: AdminUser | null
  isLoading: boolean
  isLivePreview: boolean
  editMode: boolean
  setEditMode: (enabled: boolean | ((prev: boolean) => boolean)) => void
  activeOverlay: OverlayOptions | null
  openOverlay: (options: OverlayOptions) => void
  closeOverlay: () => void
  liveDocState: Record<string, any>
  updateLiveField: (field: string, value: any, id?: string | number) => void
  saveDoc: (collection: string, id: string | number, data: any, draft?: boolean) => Promise<boolean>
  toasts: ToastMessage[]
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void
  dismissToast: (id: string) => void
  registerLiveDoc: (id: string | number, initialData: any, onExternalUpdate?: (data: any) => void) => () => void
}

const AdminContext = createContext<AdminContextType>({
  user: null,
  isLoading: true,
  isLivePreview: false,
  editMode: true,
  setEditMode: () => {},
  activeOverlay: null,
  openOverlay: () => {},
  closeOverlay: () => {},
  liveDocState: {},
  updateLiveField: () => {},
  saveDoc: async () => false,
  toasts: [],
  showToast: () => {},
  dismissToast: () => {},
  registerLiveDoc: () => () => {},
})

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isLivePreview, setIsLivePreview] = useState(false)
  const [editMode, setEditMode] = useState(true)
  const [activeOverlay, setActiveOverlay] = useState<OverlayOptions | null>(null)
  const [toasts, setToasts] = useState<ToastMessage[]>([])
  const [liveDocs, setLiveDocs] = useState<Record<string, any>>({})
  const subscribersRef = useRef<Record<string, Set<(data: any) => void>>>({})

  // Toast helper
  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9)
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 4500)
  }, [])

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  // Check user session
  useEffect(() => {
    const inIframe = typeof window !== 'undefined' && window.self !== window.top
    setIsLivePreview(inIframe)

    fetch('/api/users/me', { credentials: 'include' })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.user) {
          setUser(data.user)
        } else {
          setUser(null)
        }
      })
      .catch(() => setUser(null))
      .finally(() => setIsLoading(false))
  }, [])

  // Global hotkey: Cmd+E or Ctrl+E to toggle Edit Mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'e') {
        // Only if not inside an input/textarea
        const tag = (e.target as HTMLElement)?.tagName?.toLowerCase()
        if (tag !== 'input' && tag !== 'textarea') {
          e.preventDefault()
          setEditMode((prev) => {
            const next = !prev
            showToast(
              next ? '⚡ Inline-Bearbeitungsmodus aktiviert (⌘E)' : 'Inline-Bearbeitung deaktiviert',
              'info'
            )
            return next
          })
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [showToast])

  // Register live document subscriber
  const registerLiveDoc = useCallback(
    (id: string | number, initialData: any, onExternalUpdate?: (data: any) => void) => {
      const key = String(id)
      setLiveDocs((prev) => ({
        ...prev,
        [key]: { ...(prev[key] || initialData || {}) },
      }))

      if (onExternalUpdate) {
        if (!subscribersRef.current[key]) {
          subscribersRef.current[key] = new Set()
        }
        subscribersRef.current[key].add(onExternalUpdate)
      }

      return () => {
        if (onExternalUpdate && subscribersRef.current[key]) {
          subscribersRef.current[key].delete(onExternalUpdate)
        }
      }
    },
    []
  )

  // Update a live field in real time
  const updateLiveField = useCallback(
    (field: string, value: any, docId?: string | number) => {
      const targetId = docId ? String(docId) : activeOverlay ? String(activeOverlay.id) : null
      if (!targetId) return

      setLiveDocs((prev) => {
        const currentDoc = prev[targetId] || {}
        const updatedDoc = { ...currentDoc, [field]: value }

        // Notify subscribers
        if (subscribersRef.current[targetId]) {
          subscribersRef.current[targetId].forEach((callback) => callback(updatedDoc))
        }

        return {
          ...prev,
          [targetId]: updatedDoc,
        }
      })
    },
    [activeOverlay]
  )

  // Save document to backend
  const saveDoc = useCallback(
    async (
      collection: string,
      id: string | number,
      data: any,
      draft: boolean = false
    ): Promise<boolean> => {
      try {
        const res = await fetch('/api/inline-edit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ collection, id, data, draft }),
        })

        const result = await res.json()

        if (!res.ok || result.error) {
          throw new Error(result.error || 'Fehler beim Speichern.')
        }

        const key = String(id)
        setLiveDocs((prev) => ({
          ...prev,
          [key]: { ...(prev[key] || {}), ...(result.doc || data) },
        }))

        // Notify subscribers
        if (subscribersRef.current[key]) {
          subscribersRef.current[key].forEach((callback) =>
            callback({ ...(liveDocs[key] || {}), ...(result.doc || data) })
          )
        }

        showToast(
          draft
            ? '✓ Entwurf erfolgreich gespeichert!'
            : '✓ Änderungen erfolgreich veröffentlicht!',
          'success'
        )
        return true
      } catch (err: any) {
        showToast(`❌ ${err.message || 'Fehler beim Speichern'}`, 'error')
        return false
      }
    },
    [liveDocs, showToast]
  )

  const openOverlay = useCallback((options: OverlayOptions) => {
    setActiveOverlay(options)
    const key = String(options.id)
    if (options.initialData) {
      setLiveDocs((prev) => ({
        ...prev,
        [key]: { ...(prev[key] || {}), ...options.initialData },
      }))
    }
  }, [])

  const closeOverlay = useCallback(() => {
    setActiveOverlay(null)
  }, [])

  return (
    <AdminContext.Provider
      value={{
        user,
        isLoading,
        isLivePreview,
        editMode,
        setEditMode,
        activeOverlay,
        openOverlay,
        closeOverlay,
        liveDocState: liveDocs,
        updateLiveField,
        saveDoc,
        toasts,
        showToast,
        dismissToast,
        registerLiveDoc,
      }}
    >
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  return useContext(AdminContext)
}
