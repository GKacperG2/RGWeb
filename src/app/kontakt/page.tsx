import type { Metadata } from "next"
import Link from "next/link"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import ContactForm from "@/components/contact/ContactForm"
import { PHONE, PHONE_HREF, ADDRESS, FACEBOOK } from "@/lib/constants"
import { getSettings } from "@/lib/content"

export const metadata: Metadata = {
  title: "Kontakt – Szklarz Leżajsk",
  description:
    "Skontaktuj się z Różycki Glass – zakładem szklarskim w Leżajsku. Tel: 604 595 378, Email: rozyckiglass@gmail.com. Stare Miasto 515, 37-300 Leżajsk.",
  alternates: { canonical: "https://rozyckiglass.pl/kontakt/" },
}

export default function KontaktPage() {
  const settings = getSettings()

  return (
    <>
      <Navbar />
      <main>
        {/* ── Header ── */}
        <section className="bg-[var(--color-dark-bg)] pt-32 pb-16 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          {/* Magenta glow */}
          <div
            className="absolute -top-20 right-1/4 w-[400px] h-[300px] opacity-10 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse, var(--color-primary) 0%, transparent 65%)",
              filter: "blur(60px)",
            }}
          />
          <div className="max-w-7xl mx-auto px-5 md:px-8 relative z-10">
            <nav
              className="flex items-center gap-2 text-white/40 text-xs font-body mb-6"
              aria-label="Breadcrumb"
            >
              <Link
                href="/"
                className="hover:text-white/70 transition-colors"
              >
                Strona główna
              </Link>
              <span>/</span>
              <span className="text-white/70">Kontakt</span>
            </nav>
            <span className="section-label">Jesteśmy do dyspozycji</span>
            <h1 className="font-heading font-black text-white text-4xl md:text-6xl tracking-tight mb-4">
              Skontaktuj się{" "}
              <span className="text-[var(--color-primary)]">z nami</span>
            </h1>
            <p className="text-white/55 text-lg max-w-xl font-body">
              Zadzwoń, napisz lub wyślij wiadomość przez formularz — chętnie
              pomożemy dobrać idealne rozwiązanie szklane dla Twojego projektu.
            </p>
          </div>
        </section>

        {/* ── Quick-contact cards row ── */}
        <section className="bg-[var(--color-dark-surface)] pt-12 pb-0">
          <div className="max-w-7xl mx-auto px-5 md:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Phone */}
              <a
                href={PHONE_HREF}
                className="glass rounded-2xl p-5 flex items-center gap-4 hover:bg-white/[0.08] transition-colors group"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    background: "rgba(227,0,121,0.12)",
                    border: "1px solid rgba(227,0,121,0.25)",
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--color-primary)"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="font-heading font-semibold text-white/40 text-[10px] uppercase tracking-[0.15em] mb-0.5">
                    Telefon
                  </p>
                  <p className="font-heading font-bold text-white text-base group-hover:text-[var(--color-primary)] transition-colors">
                    {PHONE}
                  </p>
                  <p className="text-white/35 text-xs font-body">
                    Pon.–Sob. 8:00–18:00
                  </p>
                </div>
              </a>

              {/* Email — links to form below */}
              <button
                type="button"
                onClick={undefined}
                className="glass rounded-2xl p-5 flex items-center gap-4 hover:bg-white/[0.08] transition-colors group text-left cursor-default"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    background: "rgba(227,0,121,0.12)",
                    border: "1px solid rgba(227,0,121,0.25)",
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--color-primary)"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="font-heading font-semibold text-white/40 text-[10px] uppercase tracking-[0.15em] mb-0.5">
                    Email
                  </p>
                  <p className="font-heading font-bold text-white text-base">
                    Formularz poniżej
                  </p>
                  <p className="text-white/35 text-xs font-body">
                    Odpowiadamy w ciągu 24h
                  </p>
                </div>
              </button>

              {/* Address */}
              <div className="glass rounded-2xl p-5 flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    background: "rgba(227,0,121,0.12)",
                    border: "1px solid rgba(227,0,121,0.25)",
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--color-primary)"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="font-heading font-semibold text-white/40 text-[10px] uppercase tracking-[0.15em] mb-0.5">
                    Adres
                  </p>
                  <p className="font-heading font-bold text-white text-sm leading-tight">
                    {ADDRESS}
                  </p>
                  <p className="text-white/35 text-xs font-body">
                    Leżajsk, Podkarpacie
                  </p>
                </div>
              </div>

              {/* Facebook */}
              <a
                href={FACEBOOK}
                target="_blank"
                rel="noopener noreferrer"
                className="glass rounded-2xl p-5 flex items-center gap-4 hover:bg-white/[0.08] transition-colors group"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    background: "rgba(0,139,208,0.12)",
                    border: "1px solid rgba(0,139,208,0.25)",
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 32 32"
                    fill="var(--color-secondary)"
                    aria-hidden="true"
                  >
                    <path d="M31.997 15.999c0-8.836-7.163-15.999-15.999-15.999s-15.999 7.163-15.999 15.999c0 7.985 5.851 14.604 13.499 15.804v-11.18h-4.062v-4.625h4.062v-3.525c0-4.010 2.389-6.225 6.043-6.225 1.75 0 3.581 0.313 3.581 0.313v3.937h-2.017c-1.987 0-2.607 1.233-2.607 2.498v3.001h4.437l-0.709 4.625h-3.728v11.18c7.649-1.2 13.499-7.819 13.499-15.804z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="font-heading font-semibold text-white/40 text-[10px] uppercase tracking-[0.15em] mb-0.5">
                    Facebook
                  </p>
                  <p className="font-heading font-bold text-white text-sm group-hover:text-[var(--color-secondary)] transition-colors">
                    Szklarz Leżajsk
                  </p>
                  <p className="text-white/35 text-xs font-body truncate">
                    facebook.com/SzklarzLezajsk
                  </p>
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* ── Contact Form — full width below cards ── */}
        <section className="bg-[var(--color-dark-surface)] py-12">
          <div className="max-w-3xl mx-auto px-5 md:px-8">
            <ContactForm />
          </div>
        </section>

        {/* ── Map ── */}
        <section className="bg-[var(--color-dark-bg)] pb-16">
          <div className="max-w-7xl mx-auto px-5 md:px-8">
            <div
              className="rounded-2xl overflow-hidden border border-white/[0.06]"
              style={{ height: "400px" }}
            >
              <iframe
                src={settings.maps_embed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokalizacja Różycki Glass"
              />
            </div>
          </div>
        </section>
      </main>

      {/* Hidden form for Netlify bot detection at build time */}
      <form
        name="contact"
        data-netlify="true"
        netlify-honeypot="bot-field"
        hidden
      >
        <input type="text" name="name" />
        <input type="email" name="email" />
        <input type="tel" name="phone" />
        <textarea name="message" />
      </form>

      <Footer />
    </>
  )
}
