/**
 * Cloudinary image optimization helper.
 *
 * Strategy:
 * - Images uploaded via Decap CMS Cloudinary widget → already Cloudinary URLs
 *   → we inject f_auto,q_auto,w_XXX transformations
 * - Local images (/images/...) → served directly (no Cloudinary proxy)
 *   → these work on any domain without configuration
 *
 * Free tier: 25GB storage + 25GB bandwidth/month
 */

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || ""
/**
 * Optimize image URL.
 *
 * - Cloudinary upload URLs → add transformations (f_auto, q_auto, w_XXX)
 * - Local /images/ paths → returned as-is so Decap uploads are served by Netlify
 * - External URLs → returned as-is
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

  // Already a Cloudinary upload URL → inject transformations
  if (src.includes("res.cloudinary.com") && src.includes("/upload/")) {
    return src.replace("/upload/", `/upload/${transformStr}/`)
  }

  // Local images uploaded via Decap are already copied to /images by Next export.
  // Cloudinary fetch can cache a not-yet-deployed upload as missing, making new
  // gallery images appear invisible even though the file exists on Netlify.
  return src
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
