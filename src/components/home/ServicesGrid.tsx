import Link from "next/link"
import type { Service } from "@/lib/types"
import ServiceCard from "@/components/services/ServiceCard"
import SectionHeader from "@/components/ui/SectionHeader"

interface ServicesGridProps {
  services: Service[]
}

export default function ServicesGrid({ services }: ServicesGridProps) {
  return (
    <section className="bg-[var(--color-dark-bg)] py-24 md:py-32 relative overflow-hidden" id="uslugi">
      {/* Decorative blur orb */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, var(--color-primary) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="max-w-7xl mx-auto px-5 md:px-8 relative z-10">
        <SectionHeader
          label="Nasze usługi"
          title="Czym się zajmujemy"
          description="Kompleksowe usługi szklarskie – od projektu po montaż. Każde zamówienie realizujemy na indywidualne wymiary."
          light
          center
        />

        {/* Grid: 3 cols desktop, 2 tablet, 1 mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {services.map((service, i) => (
            <ServiceCard key={service.slug} service={service} index={i} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/uslugi/"
            className="inline-flex items-center gap-2 glass hover:bg-white/10 text-white font-heading font-semibold rounded-full px-8 py-3.5 transition-all duration-200 hover:-translate-y-0.5 border border-white/15 text-sm uppercase tracking-wider"
          >
            Zobacz wszystkie usługi
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
