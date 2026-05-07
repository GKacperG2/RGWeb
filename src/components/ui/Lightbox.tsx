"use client"

import { useEffect, useCallback } from "react"
import Image from "next/image"
import type { GalleryImage } from "@/lib/types"
import { optimizeImage } from "@/lib/cloudinary"

interface LightboxProps {
  images: GalleryImage[]
  currentIndex: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

export default function Lightbox({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: LightboxProps) {
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") onPrev()
      if (e.key === "ArrowRight") onNext()
    },
    [onClose, onPrev, onNext]
  )

  useEffect(() => {
    document.addEventListener("keydown", handleKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", handleKey)
      document.body.style.overflow = ""
    }
  }, [handleKey])

  const current = images[currentIndex]

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Close */}
      <button
        className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center rounded-full glass text-white/80 hover:text-white hover:bg-white/10 transition-colors z-10 text-2xl leading-none"
        onClick={onClose}
        aria-label="Zamknij"
      >
        ×
      </button>

      {/* Prev */}
      <button
        className="absolute left-4 md:left-8 w-12 h-12 flex items-center justify-center rounded-full glass text-white/80 hover:text-white hover:bg-white/10 transition-colors z-10 text-3xl leading-none"
        onClick={(e) => { e.stopPropagation(); onPrev() }}
        aria-label="Poprzednie zdjęcie"
      >
        ‹
      </button>

      {/* Image */}
      <div
        className="relative max-w-5xl max-h-[85vh] w-full mx-16 flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full" style={{ maxHeight: "75vh" }}>
          <img
            src={optimizeImage(current.src, { width: 1600 })}
            alt={current.alt}
            className="w-full h-full object-contain rounded-xl"
            style={{ maxHeight: "75vh" }}
          />
        </div>
        <p className="mt-4 text-white/70 text-sm font-body text-center">
          {current.alt}
        </p>
        <p className="mt-1 text-white/40 text-xs font-body">
          {currentIndex + 1} / {images.length}
        </p>
      </div>

      {/* Next */}
      <button
        className="absolute right-4 md:right-8 w-12 h-12 flex items-center justify-center rounded-full glass text-white/80 hover:text-white hover:bg-white/10 transition-colors z-10 text-3xl leading-none"
        onClick={(e) => { e.stopPropagation(); onNext() }}
        aria-label="Następne zdjęcie"
      >
        ›
      </button>
    </div>
  )
}
