export interface Service {
  slug: string
  name: string
  order: number
  short_description: string
  full_description: string
  features: string[]
  image: string
  seo_title: string
  seo_description: string
}

export interface GalleryImage {
  src: string
  alt: string
  category: string
}

export interface GalleryData {
  images: GalleryImage[]
}

export interface SiteSettings {
  site_name: string
  phone: string
  phone_href: string
  email: string
  address: string
  nip: string
  founded_year: string
  facebook_url: string
  google_reviews_url: string
  hero_title: string
  hero_subtitle: string
  hero_image: string
  about_text: string
  maps_embed: string
}
