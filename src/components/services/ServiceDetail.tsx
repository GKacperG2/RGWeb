import Image from "next/image"
import Link from "next/link"
import type { Service } from "@/lib/types"
import { ServiceJsonLd } from "@/components/seo/JsonLd"
import { PHONE_HREF } from "@/lib/constants"
import { optimizeImage } from "@/lib/cloudinary"

interface ServiceDetailProps {
  service: Service
  related: Service[]
}

export default function ServiceDetail({ service, related }: ServiceDetailProps) {
  return (
    <>
      <ServiceJsonLd service={service} />

      {/* Hero banner */}
      <section className="relative h-64 md:h-80 overflow-hidden">
        <Image
          src={optimizeImage(service.image, { width: 1400 })}
          alt={service.name}
          fill
          className="object-cover"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="absolute inset-0 flex flex-col justify-end pb-8 px-5 md:px-8 max-w-7xl mx-auto w-full">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-white/50 text-xs font-body mb-3" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Strona główna</Link>
            <span>/</span>
            <Link href="/uslugi/" className="hover:text-white transition-colors">Usługi</Link>
            <span>/</span>
            <span className="text-white/80">{service.name}</span>
          </nav>
          <h1 className="font-heading font-black text-white text-3xl md:text-5xl tracking-tight">
            {service.name}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main content */}
            <div className="lg:col-span-2">
              <span className="section-label">{service.name}</span>
              <p className="text-[var(--color-dark)] text-lg leading-relaxed mb-8 font-body">
                {service.full_description}
              </p>

              <h2 className="font-heading font-black text-[var(--color-dark)] text-xl mb-5">
                Cechy i zalety
              </h2>
              <ul className="space-y-3 mb-10">
                {service.features.map((f) => (
                  <li key={f} className="flex items-center gap-3">
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: "rgba(227,0,121,0.1)", border: "1px solid rgba(227,0,121,0.3)" }}
                    >
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span className="text-[var(--color-dark)] font-body">{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/#realizacje"
                className="inline-flex items-center gap-2 text-[var(--color-primary)] font-heading font-semibold text-sm hover:underline"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
                </svg>
                Zobacz nasze realizacje
              </Link>
            </div>

            {/* Sidebar CTA */}
            <div className="lg:col-span-1">
              <div
                className="rounded-2xl p-7 sticky top-24"
                style={{
                  background: "var(--color-dark-bg)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <span className="section-label">Zapytaj o wycenę</span>
                <h3 className="font-heading font-black text-white text-xl mb-3">
                  Zainteresowany?
                </h3>
                <p className="text-white/60 text-sm font-body mb-6 leading-relaxed">
                  Zadzwoń lub napisz – przygotujemy bezpłatną wycenę i doradzimy najlepsze rozwiązanie.
                </p>

                <div className="space-y-3">
                  <a
                    href={PHONE_HREF}
                    className="flex items-center justify-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-heading font-semibold rounded-full py-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg text-sm"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                    </svg>
                    Zadzwoń teraz
                  </a>
                  <Link
                    href="/kontakt/"
                    className="flex items-center justify-center gap-2 glass hover:bg-white/10 text-white font-heading font-semibold rounded-full py-3.5 transition-all duration-200 text-sm"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                    Napisz wiadomość
                  </Link>
                </div>

                <div className="mt-6 pt-6 border-t border-white/8 flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: "rgba(227,0,121,0.15)" }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                  <p className="text-white/50 text-xs font-body">Bezpłatny pomiar i wycena</p>
                </div>
              </div>
            </div>
          </div>

          {/* Related services */}
          {related.length > 0 && (
            <div className="mt-16 pt-16 border-t border-gray-100">
              <h2 className="font-heading font-black text-[var(--color-dark)] text-2xl mb-8">
                Inne nasze usługi
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {related.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/uslugi/${s.slug}/`}
                    className="group flex items-center gap-4 p-4 rounded-2xl border border-gray-100 hover:border-[var(--color-primary)]/30 hover:bg-gray-50 transition-all duration-200"
                  >
                    <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
                      <img
                        src={optimizeImage(s.image, { width: 200 })}
                        alt={s.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-[var(--color-dark)] text-sm group-hover:text-[var(--color-primary)] transition-colors">
                        {s.name}
                      </h3>
                      <p className="text-[var(--color-dark-muted)] text-xs mt-0.5 font-body line-clamp-1">
                        {s.short_description}
                      </p>
                    </div>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="ml-auto shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="mt-10">
            <Link
              href="/uslugi/"
              className="inline-flex items-center gap-2 text-[var(--color-dark-muted)] font-heading font-medium text-sm hover:text-[var(--color-primary)] transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Wróć do wszystkich usług
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
