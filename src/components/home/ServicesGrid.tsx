import Link from "next/link"
import type { Service } from "@/lib/types"
import ServiceCard from "@/components/services/ServiceCard"

interface ServicesGridProps {
  services: Service[]
}

export default function ServicesGrid({ services }: ServicesGridProps) {
  return (
    <section
      className="relative py-24 md:py-32 overflow-hidden"
      id="uslugi"
      style={{ background: "var(--color-dark-bg)" }}
    >
      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Magenta glow top-center */}
      <div
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[400px] opacity-15 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, var(--color-primary) 0%, transparent 65%)",
          filter: "blur(60px)",
        }}
      />

      <div className="max-w-7xl mx-auto px-5 md:px-8 relative z-10">
        {/* Editorial header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <span className="section-label">Nasze usługi</span>
            <h2 className="font-heading font-black text-white text-4xl md:text-6xl leading-tight tracking-tight max-w-md">
              Czym się{" "}
              <span className="text-[var(--color-primary)]">zajmujemy</span>
            </h2>
          </div>
          <p className="text-white/50 text-base font-body max-w-xs leading-relaxed">
            Kompleksowe usługi szklarskie – od projektu po montaż, każde
            zamówienie na indywidualne wymiary.
          </p>
        </div>

        {/* Asymmetric editorial grid */}
        {/* Layout: [0:2col][1:1col] | [2][3][4] | [5:1col][6:2col] | [7:1col][8:2col] */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {services.map((service, i) => (
            <ServiceCard key={service.slug} service={service} index={i} variant="grid" />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="flex items-center justify-between mt-12 pt-8 border-t border-white/[0.06]">
          <p className="text-white/30 text-sm font-body hidden md:block">
            {services.length} specjalizacji szklarskich
          </p>
          <Link
            href="/uslugi/"
            className="group inline-flex items-center gap-3 font-heading font-bold text-white text-sm uppercase tracking-widest hover:text-[var(--color-primary)] transition-colors duration-200"
          >
            <span>Wszystkie usługi</span>
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-white/20 group-hover:border-[var(--color-primary)] group-hover:bg-[var(--color-primary)] transition-all duration-300">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="group-hover:translate-x-0.5 transition-transform duration-300"
                aria-hidden="true"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}
