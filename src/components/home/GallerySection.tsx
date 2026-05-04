"use client"

import { useState, useCallback } from "react"
import type { GalleryImage } from "@/lib/types"
import { GALLERY_CATEGORIES } from "@/lib/constants"
import SectionHeader from "@/components/ui/SectionHeader"
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
    () => setLightboxIndex((p) => (p === null ? null : p > 0 ? p - 1 : filtered.length - 1)),
    [filtered.length]
  )
  const nextImage = useCallback(
    () => setLightboxIndex((p) => (p === null ? null : p < filtered.length - 1 ? p + 1 : 0)),
    [filtered.length]
  )

  const getCategoryCount = (id: string) =>
    id === "all" ? images.length : images.filter((i) => i.category === id).length

  return (
    <>
      <section className="bg-white py-24 md:py-32" id="realizacje">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <SectionHeader
            label="Portfolio"
            title="Nasze realizacje"
            description="Zobacz przykłady naszych prac – każdy projekt realizujemy z najwyższą dbałością o szczegóły."
            light={false}
            center
          />

          {/* Category filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {GALLERY_CATEGORIES.map((cat) => {
              const count = getCategoryCount(cat.id)
              if (cat.id !== "all" && count === 0) return null
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`inline-flex items-center gap-1.5 font-heading font-medium text-xs rounded-full px-4 py-2 transition-all duration-200 border ${
                    activeCategory === cat.id
                      ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)]"
                      : "bg-transparent text-[var(--color-dark-muted)] border-gray-200 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                  }`}
                >
                  {cat.label}
                  {activeCategory === cat.id && (
                    <span className="bg-white/20 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                      {count}
                    </span>
                  )}
                </button>
              )
            })}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {filtered.map((img, i) => (
              <button
                key={`${activeCategory}-${i}`}
                onClick={() => openLightbox(i)}
                className="group relative rounded-xl overflow-hidden bg-gray-100 cursor-pointer"
                style={{ aspectRatio: i % 5 === 0 ? "4/3" : "1/1" }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                  <span className="text-white text-xs font-body line-clamp-2 text-left">
                    {img.alt}
                  </span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-10 h-10 rounded-full glass flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35M11 8v6M8 11h6" />
                    </svg>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-[var(--color-dark-muted)] py-16">
              Brak zdjęć w tej kategorii. Wkrótce dodamy więcej realizacji.
            </p>
          )}
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
