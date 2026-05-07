"use client"

import { useState, useCallback } from "react"
import type { GalleryImage } from "@/lib/types"
import { GALLERY_CATEGORIES } from "@/lib/constants"
import Lightbox from "@/components/ui/Lightbox"

interface GallerySectionProps {
  images: GalleryImage[]
}

export default function GallerySection({ images }: GallerySectionProps) {
  const [activeCategory, setActiveCategory] = useState("all")
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const filtered =
    activeCategory === "all"
      ? images
      : images.filter((img) => img.category === activeCategory)

  const openLightbox = (i: number) => setLightboxIndex(i)
  const closeLightbox = () => setLightboxIndex(null)
  const prevImage = useCallback(
    () =>
      setLightboxIndex((p) =>
        p === null ? null : p > 0 ? p - 1 : filtered.length - 1
      ),
    [filtered.length]
  )
  const nextImage = useCallback(
    () =>
      setLightboxIndex((p) =>
        p === null ? null : p < filtered.length - 1 ? p + 1 : 0
      ),
    [filtered.length]
  )

  const getCategoryCount = (id: string) =>
    id === "all"
      ? images.length
      : images.filter((i) => i.category === id).length

  return (
    <>
      <section
        className="relative py-24 md:py-32 overflow-hidden"
        id="realizacje"
        style={{ background: "var(--color-dark-bg)" }}
      >
        {/* Diagonal texture */}
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, rgba(255,255,255,0.5) 0px, rgba(255,255,255,0.5) 1px, transparent 1px, transparent 40px)",
          }}
        />

        {/* Blue glow */}
        <div
          className="absolute -bottom-32 -right-32 w-[500px] h-[500px] opacity-10 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, var(--color-secondary) 0%, transparent 60%)",
            filter: "blur(80px)",
          }}
        />

        <div className="max-w-7xl mx-auto px-5 md:px-8 relative z-10">
          {/* Editorial header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <span className="section-label">Portfolio</span>
              <h2 className="font-heading font-black text-white text-4xl md:text-6xl leading-tight tracking-tight max-w-lg">
                Nasze{" "}
                <span className="text-[var(--color-primary)]">realizacje</span>
              </h2>
            </div>
            <p className="text-white/45 text-base font-body max-w-xs leading-relaxed">
              Każdy projekt realizujemy z najwyższą dbałością o szczegóły —
              zobacz efekty naszej pracy.
            </p>
          </div>

          {/* Filter pills — single line, horizontal scroll */}
          <div className="flex flex-nowrap gap-2 mb-10 overflow-x-auto pb-2 scrollbar-hide -mx-5 px-5 md:mx-0 md:px-0">
            {GALLERY_CATEGORIES.map((cat) => {
              const count = getCategoryCount(cat.id)
              if (cat.id !== "all" && count === 0) return null
              const isActive = activeCategory === cat.id
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`relative inline-flex items-center gap-2 font-heading font-semibold text-[11px] uppercase tracking-[0.15em] rounded-full px-5 py-2.5 transition-all duration-300 border shrink-0 ${
                    isActive
                      ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-[0_0_20px_rgba(227,0,121,0.3)]"
                      : "bg-transparent text-white/40 border-white/10 hover:border-white/25 hover:text-white/70"
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] font-bold tabular-nums ${
                      isActive ? "text-white/60" : "text-white/25"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Clean 3-col grid — uniform aspect, no bento complexity */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {filtered.map((img, i) => (
              <button
                key={`${activeCategory}-${img.src}-${i}`}
                onClick={() => openLightbox(i)}
                className="group relative rounded-2xl overflow-hidden cursor-pointer aspect-[4/3]"
              >
                {/* Image */}
                <img
                  src={img.src}
                  alt={img.alt}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                  loading="lazy"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent" />

                {/* Hover warm overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#200010]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Left magenta accent */}
                <div className="absolute top-0 left-0 w-[3px] h-0 bg-[var(--color-primary)] group-hover:h-full transition-[height] duration-500 ease-out z-20" />

                {/* Bottom info */}
                <div className="absolute inset-x-0 bottom-0 p-4 z-10">
                  <span className="inline-block font-heading font-semibold text-[9px] uppercase tracking-[0.2em] text-[var(--color-primary)] mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {GALLERY_CATEGORIES.find((c) => c.id === img.category)
                      ?.label || "Realizacja"}
                  </span>
                  <p className="font-heading font-bold text-white text-sm leading-snug tracking-tight">
                    {img.alt}
                  </p>
                </div>

                {/* Zoom icon center */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                  <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.35-4.35M11 8v6M8 11h6" />
                    </svg>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20">
              <p className="text-white/40 text-base font-body">
                Brak zdjęć w tej kategorii.
              </p>
            </div>
          )}

          {/* Bottom bar */}
          <div className="flex items-center justify-between mt-10 pt-8 border-t border-white/[0.06]">
            <p className="text-white/25 text-sm font-body">
              <span className="text-[var(--color-primary)] font-heading font-bold">
                {filtered.length}
              </span>{" "}
              {activeCategory === "all" ? "realizacji" : "w kategorii"}
            </p>
          </div>
        </div>
      </section>

      {lightboxIndex !== null && (
        <Lightbox
          images={filtered}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}
    </>
  )
}
