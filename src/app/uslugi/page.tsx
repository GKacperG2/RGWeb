import type { Metadata } from "next"
import Link from "next/link"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import ServiceCard from "@/components/services/ServiceCard"
import { getAllServices } from "@/lib/content"
import { PHONE_HREF, PHONE } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Usługi szklarskie Leżajsk",
  description:
    "Kompleksowe usługi szklarskie w Leżajsku i okolicach. Kabiny prysznicowe, drzwi, balustrady, panele Lacobel, fototapety w szkle i więcej. Tel: 604 595 378.",
  alternates: { canonical: "https://rozyckiglass.pl/uslugi/" },
}

export default function UslugiPage() {
  const services = getAllServices()

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
              <span className="text-white/70">Usługi</span>
            </nav>
            <span className="section-label">Co oferujemy</span>
            <h1 className="font-heading font-black text-white text-4xl md:text-6xl tracking-tight mb-4">
              Usługi szklarskie
            </h1>
            <p className="text-white/60 text-lg max-w-xl font-body">
              Kompleksowe rozwiązania szklane – od projektu po montaż. Każde zamówienie na indywidualne wymiary.
            </p>
          </div>
        </section>

        {/* Services grid */}
        <section className="bg-[var(--color-dark-surface)] py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-5 md:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {services.map((service, i) => (
                <ServiceCard key={service.slug} service={service} index={i} variant="featured" />
              ))}
            </div>
          </div>
        </section>

        {/* CTA strip */}
        <section className="bg-[var(--color-primary)] py-16">
          <div className="max-w-7xl mx-auto px-5 md:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="font-heading font-black text-white text-2xl md:text-3xl mb-2">
                Nie widzisz szukanej usługi?
              </h2>
              <p className="text-white/80 font-body">
                Zadzwoń – realizujemy niestandardowe projekty szklane.
              </p>
            </div>
            <a
              href={PHONE_HREF}
              className="shrink-0 inline-flex items-center gap-2.5 bg-white text-[var(--color-primary)] font-heading font-bold rounded-full px-8 py-4 hover:bg-white/90 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg text-sm"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
              </svg>
              Zadzwoń po wycenę: {PHONE}
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
