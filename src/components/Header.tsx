'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface HeaderProps {
  logoUrl?: string
  logoAlt?: string
}

export function Header({
  logoUrl = '/images/logo.png',
  logoAlt = 'Global Shipping & Logistics GmbH',
}: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const navLinks = [
    { href: '/ueberblick', label: 'Überblick' },
    { href: '/', label: 'Startseite' },
    { href: '/leistungen', label: 'Leistungen' },
    { href: '/fahrplaene', label: 'Fahrpläne' },
    { href: '/ladungen', label: 'Ladungen' },
    { href: '/news', label: 'News' },
    { href: '/team', label: 'Team' },
    { href: '/kontakt', label: 'Kontakt' },
  ]

  const isActive = (href: string) => {
    if (href === '/' && pathname === '/') return true
    if (href !== '/' && pathname.startsWith(href)) return true
    return false
  }

  return (
    <header className="site">
      <div className="wrap">
        <div className="logo">
          <Link href="/">
            <img src={logoUrl} alt={logoAlt} />
          </Link>
        </div>
        <button
          className="burger"
          id="burger"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menü"
        >
          ☰
        </button>
        <nav id="nav" className={isOpen ? 'open' : ''}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={isActive(link.href) ? 'on' : ''}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <span className="lang">
            <b>DE</b> · EN
          </span>
        </nav>
      </div>
    </header>
  )
}
