"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { PHONE, PHONE_HREF } from "@/lib/constants"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [mobileOpen])

  const close = () => setMobileOpen(false)

  const navLinks = [
    { href: "/uslugi/", label: "Usługi" },
    { href: "/#realizacje", label: "Realizacje" },
    { href: "/kontakt/", label: "Kontakt" },
  ]

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-black/5"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0" onClick={close}>
            <Image
              src="/images/logo.png"
              alt="Różycki Glass"
              width={48}
              height={48}
              className="w-10 h-10 md:w-12 md:h-12 object-contain"
              unoptimized
            />
            <span
              className={`font-heading font-black text-sm md:text-base uppercase tracking-widest transition-colors ${
                scrolled ? "text-[var(--color-dark)]" : "text-white"
              }`}
            >
              Różycki Glass
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`font-heading font-medium text-sm uppercase tracking-widest transition-colors hover:text-[var(--color-primary)] ${
                    scrolled ? "text-[var(--color-dark)]" : "text-white/90"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Phone CTA */}
          <a
            href={PHONE_HREF}
            className={`hidden md:flex items-center gap-2 font-heading font-semibold text-sm rounded-full px-5 py-2.5 transition-all duration-200 hover:-translate-y-0.5 ${
              scrolled
                ? "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)]"
                : "glass text-white hover:bg-white/15"
            }`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
            </svg>
            {PHONE}
          </a>

          {/* Mobile toggle */}
          <button
            className={`md:hidden flex flex-col gap-1.5 p-2 rounded transition-colors ${
              scrolled ? "text-[var(--color-dark)]" : "text-white"
            }`}
            onClick={() => setMobileOpen(true)}
            aria-label="Otwórz menu"
          >
            <span className="block w-5 h-0.5 bg-current rounded" />
            <span className="block w-5 h-0.5 bg-current rounded" />
            <span className="block w-4 h-0.5 bg-current rounded" />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={close}
      />

      {/* Mobile drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-50 w-72 bg-[var(--color-dark-bg)] flex flex-col md:hidden transition-transform duration-300 ease-out ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 h-16 border-b border-white/8">
          <span className="font-heading font-black text-sm uppercase tracking-widest text-white">Menu</span>
          <button
            onClick={close}
            className="w-8 h-8 flex items-center justify-center rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors text-xl"
            aria-label="Zamknij menu"
          >
            ×
          </button>
        </div>
        <ul className="flex flex-col gap-1 p-4 flex-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={close}
                className="block font-heading font-medium text-white/80 hover:text-white hover:bg-white/5 px-4 py-3 rounded-xl uppercase tracking-widest text-sm transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="p-6 border-t border-white/8">
          <a
            href={PHONE_HREF}
            className="flex items-center justify-center gap-2 bg-[var(--color-primary)] text-white font-heading font-semibold rounded-full px-6 py-3.5 hover:bg-[var(--color-primary-dark)] transition-colors"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
            </svg>
            {PHONE}
          </a>
        </div>
      </div>
    </>
  )
}
