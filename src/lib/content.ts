import path from "path"
import fs from "fs"
import type { Service, GalleryData, SiteSettings } from "./types"

const contentDir = path.join(process.cwd(), "content")

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
  return JSON.parse(
    fs.readFileSync(path.join(contentDir, "gallery", "images.json"), "utf-8")
  ) as GalleryData
}

export function getSettings(): SiteSettings {
  return JSON.parse(
    fs.readFileSync(path.join(contentDir, "settings", "general.json"), "utf-8")
  ) as SiteSettings
}
