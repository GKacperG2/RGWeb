import path from "path"
import fs from "fs"
import type { Service, GalleryData, SiteSettings } from "./types"

const contentDir = path.join(process.cwd(), "content")
const publicImagesDir = path.join(process.cwd(), "public", "images")
const galleryImageExts = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".avif",
  ".gif",
  ".jfif",
])

export function getAllServices(): Service[] {
  const dir = path.join(contentDir, "services")
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json"))
  const services = files.map(
    (f) => JSON.parse(fs.readFileSync(path.join(dir, f), "utf-8")) as Service
  )
  return services.sort((a, b) => a.order - b.order)
}

export function getService(slug: string): Service {
  const filePath = path.join(contentDir, "services", `${slug}.json`)
  return JSON.parse(fs.readFileSync(filePath, "utf-8")) as Service
}

export function getGalleryData(): GalleryData {
  const data = JSON.parse(
    fs.readFileSync(path.join(contentDir, "gallery", "images.json"), "utf-8")
  ) as GalleryData

  const services = getAllServices()
  const settings = getSettings()
  const reservedImages = new Set([
    "/images/logo.png",
    settings.hero_image,
    ...services.map((service) => service.image),
  ])
  const listedImages = new Set(data.images.map((image) => image.src))

  if (!fs.existsSync(publicImagesDir)) {
    return data
  }

  const uploadedImages = fs
    .readdirSync(publicImagesDir)
    .filter((file) => galleryImageExts.has(path.extname(file).toLowerCase()))
    .map((file) => `/images/${file}`)
    .filter((src) => !listedImages.has(src))
    .filter((src) => !reservedImages.has(src))
    .sort()
    .map((src) => ({
      src,
      alt: filenameToAlt(src),
      category: "inne",
    }))

  return {
    images: [...data.images, ...uploadedImages],
  }
}

export function getSettings(): SiteSettings {
  return JSON.parse(
    fs.readFileSync(path.join(contentDir, "settings", "general.json"), "utf-8")
  ) as SiteSettings
}

function filenameToAlt(src: string): string {
  const name = path.basename(src, path.extname(src))
  return name
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}
