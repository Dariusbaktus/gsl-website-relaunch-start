'use client'

import React from 'react'
import { useAdmin } from './AdminContext'

export function ToastContainer() {
  const { toasts, dismissToast } = useAdmin()

  if (!toasts.length) return null

  return (
    <div
      aria-live="polite"
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 999999,
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        maxWidth: 380,
        pointerEvents: 'none',
      }}
    >
      {toasts.map((toast) => {
        const bg =
          toast.type === 'success'
            ? '#0D2235'
            : toast.type === 'error'
            ? '#991B1B'
            : '#1E293B'
        const borderColor =
          toast.type === 'success'
            ? '#22C55E'
            : toast.type === 'error'
            ? '#EF4444'
            : '#38BDF8'

        return (
          <div
            key={toast.id}
            role="status"
            style={{
              pointerEvents: 'auto',
              background: bg,
              color: '#FFFFFF',
              borderLeft: `4px solid ${borderColor}`,
              borderRadius: 6,
              padding: '12px 16px',
              fontSize: 13.5,
              fontWeight: 500,
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 12,
              animation: 'slideInUp 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <style>{`
              @keyframes slideInUp {
                from { transform: translateY(16px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
              }
            `}</style>
            <span>{toast.message}</span>
            <button
              onClick={() => dismissToast(toast.id)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#94A3B8',
                fontSize: 14,
                cursor: 'pointer',
                padding: '2px 4px',
              }}
            >
              ✕
            </button>
          </div>
        )
      })}
    </div>
  )
}
