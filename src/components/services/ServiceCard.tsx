import Link from "next/link"
import Image from "next/image"
import type { Service } from "@/lib/types"
import { optimizeImage } from "@/lib/cloudinary"

interface ServiceCardProps {
  service: Service
  index?: number
  variant?: "grid" | "featured"
}

// Asymmetric editorial layout: 2+1 | 1+1+1 | 1+2 | 1+2
function getColSpan(i: number): 1 | 2 {
  if (i === 0 || i === 6 || i === 8) return 2
  return 1
}

function getAspect(i: number): string {
  if (i === 0 || i === 6 || i === 8) return "aspect-[16/9]"
  // Row 2 (all 1-col) can be taller; mixed rows need balanced height
  if (i >= 2 && i <= 4) return "aspect-[4/5]"
  return "aspect-square"
}

export default function ServiceCard({
  service,
  index = 0,
  variant = "grid",
}: ServiceCardProps) {
  const colSpan = variant === "grid" ? getColSpan(index) : 1
  const aspect = variant === "grid" ? getAspect(index) : "aspect-[4/3]"
  const num = String(index + 1).padStart(2, "0")
  const isFeatured = colSpan === 2

  return (
    <Link
      href={`/uslugi/${service.slug}/`}
      className={`group relative block rounded-2xl overflow-hidden bg-[var(--color-dark-surface)] ${
        variant === "grid" && colSpan === 2 ? "sm:col-span-2 lg:col-span-2" : ""
      } ${aspect}`}
    >
      {/* Image */}
      <Image
        src={optimizeImage(service.image, { width: isFeatured ? 1200 : 800 })}
        alt={service.name}
        fill
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        sizes={
          isFeatured
            ? "(max-width: 1024px) 100vw, 66vw"
            : "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        }
        unoptimized
      />

      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/15 to-black/5" />

      {/* Hover warm tint */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#200010]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Magenta sweep line at top */}
      <div className="absolute top-0 left-0 h-[2px] w-0 bg-[var(--color-primary)] group-hover:w-full transition-[width] duration-500 ease-out z-20" />

      {/* Ghost number */}
      <span
        className="absolute top-3 right-4 font-heading font-black leading-none select-none pointer-events-none z-10 transition-colors duration-500 group-hover:text-[var(--color-primary)]/25"
        style={{
          fontSize: isFeatured ? "96px" : "76px",
          color: "rgba(255,255,255,0.05)",
          lineHeight: 1,
        }}
        aria-hidden="true"
      >
        {num}
      </span>

      {/* Bottom content */}
      <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 z-10">
        <span className="block font-heading font-semibold text-[10px] uppercase tracking-[0.2em] text-[var(--color-primary)] mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Usługa szklarska
        </span>

        <h3
          className={`font-heading font-black text-white leading-tight tracking-tight mb-2 ${
            isFeatured ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"
          }`}
        >
          {service.name}
        </h3>

        <p className="text-white/65 text-sm font-body leading-relaxed overflow-hidden max-h-0 group-hover:max-h-16 transition-all duration-500 ease-out">
          {service.short_description}
        </p>

        <div className="flex items-center gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-[var(--color-primary)] font-heading font-semibold text-xs uppercase tracking-widest">
            Dowiedz się więcej
          </span>
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--color-primary)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="group-hover:translate-x-1 transition-transform duration-300"
            aria-hidden="true"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  )
}
