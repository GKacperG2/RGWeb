import Image from "next/image"
import Link from "next/link"
import { PHONE_HREF } from "@/lib/constants"

interface HeroSectionProps {
  title: string
  subtitle: string
  heroImage: string
}

export default function HeroSection({ title, subtitle, heroImage }: HeroSectionProps) {
  const [beforeGlass, afterGlass] = title.split("szklarskie")
  const hasGlassWord = title.includes("szklarskie")

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt="Różycki Glass – zakład szklarski"
          fill
          className="object-cover object-center"
          priority
          unoptimized
        />
        {/* Multi-layer overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
      </div>

      {/* Decorative glass pane accent */}
      <div
        className="absolute top-1/4 right-0 w-64 h-96 opacity-10 rounded-l-3xl"
        style={{
          background:
            "linear-gradient(135deg, rgba(227,0,121,0.3) 0%, rgba(0,139,208,0.2) 100%)",
          backdropFilter: "blur(2px)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 w-full py-32">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] animate-pulse" />
            <span className="font-heading font-semibold text-white/90 text-xs uppercase tracking-widest">
              Zakład szklarski od 1980 roku
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-heading font-black text-white leading-[1.05] tracking-tight mb-6">
            <span className="block text-5xl md:text-7xl xl:text-8xl">
              {hasGlassWord ? beforeGlass : title}
            </span>
            {hasGlassWord && (
              <span
                className="block text-5xl md:text-7xl xl:text-8xl text-[var(--color-primary)] glow-primary"
              >
                szklarskie
              </span>
            )}
          </h1>

          {/* Description */}
          <p className="text-white/70 text-lg md:text-xl leading-relaxed mb-10 max-w-xl font-body">
            {subtitle}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <a
              href={PHONE_HREF}
              className="inline-flex items-center gap-2.5 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-heading font-semibold rounded-full px-8 py-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(227,0,121,0.4)]"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
              </svg>
              Zadzwoń teraz
            </a>
            <Link
              href="/uslugi/"
              className="inline-flex items-center gap-2.5 glass hover:bg-white/15 text-white font-heading font-semibold rounded-full px-8 py-4 transition-all duration-200 hover:-translate-y-0.5"
            >
              Zobacz nasze usługi
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Stats bar */}
        <div className="absolute bottom-10 left-5 right-5 md:left-8 md:right-8">
          <div className="flex flex-wrap gap-6 md:gap-12">
            {[
              { value: "40+", label: "lat doświadczenia" },
              { value: "9", label: "rodzajów usług" },
              { value: "100%", label: "na wymiar" },
            ].map(({ value, label }) => (
              <div key={label} className="flex items-center gap-3">
                <span className="font-heading font-black text-2xl md:text-3xl text-[var(--color-primary)]">
                  {value}
                </span>
                <span className="text-white/50 text-xs md:text-sm font-body leading-tight max-w-[80px]">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <span className="text-white/60 text-xs font-heading uppercase tracking-widest">Przewiń</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/60 to-transparent" />
      </div>
    </section>
  )
}
