import Link from "next/link"
import Image from "next/image"
import type { Service } from "@/lib/types"

interface ServiceCardProps {
  service: Service
  index?: number
  variant?: "grid" | "featured"
}

export default function ServiceCard({
  service,
  index = 0,
  variant = "grid",
}: ServiceCardProps) {
  return (
    <Link
      href={`/uslugi/${service.slug}/`}
      className="group relative block rounded-2xl overflow-hidden bg-[var(--color-dark-surface)]"
      style={{ aspectRatio: variant === "featured" ? "4/3" : "3/4" }}
    >
      {/* Background image */}
      <Image
        src={service.image}
        alt={service.name}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        unoptimized
      />

      {/* Shimmer effect */}
      <div className="card-shimmer absolute inset-0 z-10" />

      {/* Default gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent transition-opacity duration-300 group-hover:opacity-90" />

      {/* Hover magenta tint */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary)]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6 z-20">
        <div className="transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="font-heading font-black text-white text-lg md:text-xl leading-tight mb-1">
            {service.name}
          </h3>
          <p className="text-white/70 text-sm leading-relaxed mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 max-h-0 group-hover:max-h-20 overflow-hidden">
            {service.short_description}
          </p>
          <span className="inline-flex items-center gap-1.5 text-[var(--color-primary)] font-heading font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Dowiedz się więcej
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  )
}
