/**
 * Cloudinary image optimization helper.
 *
 * Uses Cloudinary's "fetch" mode — any image URL (local or external)
 * gets proxied through Cloudinary CDN with automatic:
 *   - WebP/AVIF conversion (f_auto)
 *   - Quality optimization (q_auto)
 *   - Responsive resizing (w_XXX)
 *   - Lazy CDN caching worldwide
 *
 * For images uploaded via Decap CMS Cloudinary widget,
 * URLs are already Cloudinary URLs — we just ensure transformations are applied.
 *
 * Free tier: 25GB storage + 25GB bandwidth/month (plenty for small business)
 */

// Set your Cloudinary cloud name here after creating account
const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || ""

const SITE_URL = "https://rozyckiglass.pl"

/**
 * Check if Cloudinary is configured
 */
export function isCloudinaryConfigured(): boolean {
  return CLOUD_NAME.length > 0
}

/**
 * Optimize any image URL through Cloudinary fetch CDN.
 *
 * @param src - Image source (can be /images/..., https://res.cloudinary.com/..., or full URL)
 * @param options - Width and quality settings
 * @returns Optimized Cloudinary URL, or original src if Cloudinary not configured
 *
 * @example
 * optimizeImage("/images/hero.jpg", { width: 1200 })
 * // → "https://res.cloudinary.com/xxx/image/fetch/f_auto,q_auto,w_1200/https://rozyckiglass.pl/images/hero.jpg"
 *
 * optimizeImage("https://res.cloudinary.com/xxx/image/upload/v123/photo.jpg", { width: 800 })
 * // → "https://res.cloudinary.com/xxx/image/upload/f_auto,q_auto,w_800/v123/photo.jpg"
 */
export function optimizeImage(
  src: string,
  options: { width?: number; quality?: string } = {}
): string {
  if (!CLOUD_NAME) return src

  const { width, quality = "auto" } = options

  // Build transformation string
  const transforms = [`f_auto`, `q_${quality}`]
  if (width) transforms.push(`w_${width}`)
  const transformStr = transforms.join(",")

  // Already a Cloudinary upload URL — inject transformations
  if (src.includes("res.cloudinary.com") && src.includes("/upload/")) {
    return src.replace("/upload/", `/upload/${transformStr}/`)
  }

  // Local path → convert to full URL for fetch mode
  let fetchUrl = src
  if (src.startsWith("/")) {
    fetchUrl = `${SITE_URL}${src}`
  }

  return `https://res.cloudinary.com/${CLOUD_NAME}/image/fetch/${transformStr}/${fetchUrl}`
}

/**
 * Generate srcSet for responsive images
 */
export function optimizeSrcSet(
  src: string,
  widths: number[] = [400, 800, 1200]
): string {
  if (!CLOUD_NAME) return ""

  return widths
    .map((w) => `${optimizeImage(src, { width: w })} ${w}w`)
    .join(", ")
}
