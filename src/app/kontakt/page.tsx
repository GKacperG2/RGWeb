import type { Metadata } from "next"
import Link from "next/link"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import { PHONE, PHONE_HREF, EMAIL, ADDRESS, FACEBOOK } from "@/lib/constants"
import { getSettings } from "@/lib/content"

export const metadata: Metadata = {
  title: "Kontakt – Szklarz Leżajsk",
  description:
    "Skontaktuj się z Różycki Glass – zakładem szklarskim w Leżajsku. Tel: 604 595 378, Email: rozyckiglass@gmail.com. Stare Miasto 515, 37-300 Leżajsk.",
  alternates: { canonical: "https://rozyckiglass.pl/kontakt/" },
}

export default function KontaktPage() {
  const settings = getSettings()

  const contactCards = [
    {
      icon: "phone",
      label: "Telefon",
      value: PHONE,
      href: PHONE_HREF,
      hint: "Pon.–Sob. 8:00–18:00",
      cta: "Zadzwoń",
    },
    {
      icon: "mail",
      label: "Email",
      value: EMAIL,
      href: `mailto:${EMAIL}`,
      hint: "Odpowiadamy w ciągu 24 godzin",
      cta: "Napisz email",
    },
    {
      icon: "pin",
      label: "Adres",
      value: ADDRESS,
      href: undefined,
      hint: "Leżajsk, Podkarpacie",
      cta: undefined,
    },
  ]

  return (
    <>
      <Navbar />
      <main>
        {/* Header */}
        <section className="bg-[var(--color-dark-bg)] pt-32 pb-16 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <div className="max-w-7xl mx-auto px-5 md:px-8 relative z-10">
            <nav className="flex items-center gap-2 text-white/40 text-xs font-body mb-6" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-white/70 transition-colors">Strona główna</Link>
              <span>/</span>
              <span className="text-white/70">Kontakt</span>
            </nav>
            <span className="section-label">Jesteśmy do dyspozycji</span>
            <h1 className="font-heading font-black text-white text-4xl md:text-6xl tracking-tight mb-4">
              Skontaktuj się z nami
            </h1>
            <p className="text-white/60 text-lg max-w-xl font-body">
              Zadzwoń lub napisz – chętnie pomożemy dobrać idealne rozwiązanie szklane dla Twojego projektu.
            </p>
          </div>
        </section>

        {/* Contact cards */}
        <section className="bg-[var(--color-dark-surface)] py-16">
          <div className="max-w-7xl mx-auto px-5 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {contactCards.map(({ icon, label, value, href, hint, cta }) => (
                <div key={label} className="glass rounded-2xl p-8 flex flex-col gap-4">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center"
                    style={{ background: "rgba(227,0,121,0.12)", border: "1px solid rgba(227,0,121,0.25)" }}
                  >
                    {icon === "phone" && (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                      </svg>
                    )}
                    {icon === "mail" && (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    )}
                    {icon === "pin" && (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-heading font-semibold text-white/40 text-xs uppercase tracking-widest mb-1">
                      {label}
                    </p>
                    {href ? (
                      <a href={href} className="font-heading font-bold text-white text-lg hover:text-[var(--color-primary)] transition-colors block break-all">
                        {value}
                      </a>
                    ) : (
                      <p className="font-heading font-bold text-white text-lg">{value}</p>
                    )}
                    <p className="text-white/40 text-sm mt-1 font-body">{hint}</p>
                  </div>
                  {cta && href && (
                    <a
                      href={href}
                      className="inline-flex items-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-heading font-semibold rounded-full px-5 py-2.5 text-sm transition-all duration-200 self-start"
                    >
                      {cta}
                    </a>
                  )}
                </div>
              ))}
            </div>

            {/* Facebook */}
            <div className="mt-5">
              <a
                href={FACEBOOK}
                target="_blank"
                rel="noopener noreferrer"
                className="glass rounded-2xl p-6 flex items-center gap-4 hover:bg-white/5 transition-colors group"
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                  style={{ background: "rgba(0,139,208,0.12)", border: "1px solid rgba(0,139,208,0.25)" }}
                >
                  <svg width="20" height="20" viewBox="0 0 32 32" fill="var(--color-secondary)" aria-hidden="true">
                    <path d="M31.997 15.999c0-8.836-7.163-15.999-15.999-15.999s-15.999 7.163-15.999 15.999c0 7.985 5.851 14.604 13.499 15.804v-11.18h-4.062v-4.625h4.062v-3.525c0-4.010 2.389-6.225 6.043-6.225 1.75 0 3.581 0.313 3.581 0.313v3.937h-2.017c-1.987 0-2.607 1.233-2.607 2.498v3.001h4.437l-0.709 4.625h-3.728v11.18c7.649-1.2 13.499-7.819 13.499-15.804z" />
                  </svg>
                </div>
                <div>
                  <p className="font-heading font-bold text-white text-base group-hover:text-[var(--color-secondary)] transition-colors">
                    Facebook – Szklarz Leżajsk
                  </p>
                  <p className="text-white/40 text-sm font-body">facebook.com/SzklarzLezajsk</p>
                </div>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-secondary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity shrink-0" aria-hidden="true">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* Map */}
        <section className="bg-[var(--color-dark-bg)] pb-16">
          <div className="max-w-7xl mx-auto px-5 md:px-8">
            <div className="rounded-2xl overflow-hidden" style={{ height: "450px" }}>
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
      <Footer />
    </>
  )
}
