/**
 * Post-build image optimization script.
 *
 * Runs AFTER `next build` on the `out/images/` directory.
 * Original files in `public/images/` stay untouched.
 *
 * Aggressive compression:
 * - JPEG: quality 55, progressive, mozjpeg, max 1600px wide
 * - PNG: quality 60, palette mode, max 1600px wide
 * - Skips files < 5KB (already tiny)
 */

import sharp from "sharp"
import { readdir, stat, readFile, writeFile } from "fs/promises"
import { join, extname } from "path"

const IMAGES_DIR = "out/images"
const MAX_WIDTH = 1600
const JPEG_QUALITY = 78
const PNG_COMPRESSION = 9

async function optimizeImages() {
  console.log("\n🖼️  Optymalizacja obrazków...\n")

  let files
  try {
    files = await readdir(IMAGES_DIR)
  } catch {
    console.log("⚠️  Brak katalogu out/images/ — pomiń")
    return
  }

  const imageFiles = files.filter((f) => {
    const ext = extname(f).toLowerCase()
    return [".jpg", ".jpeg", ".png", ".webp"].includes(ext)
  })

  let totalBefore = 0
  let totalAfter = 0

  for (const file of imageFiles) {
    const filePath = join(IMAGES_DIR, file)
    const ext = extname(file).toLowerCase()

    const before = (await stat(filePath)).size

    if (before < 5 * 1024) {
      totalBefore += before
      totalAfter += before
      console.log(`  ⏭️  ${file} (${fmtSize(before)}) — za mały, pomiń`)
      continue
    }

    try {
      // Read entire file into buffer first (avoids file lock issues)
      const inputBuffer = await readFile(filePath)

      let pipeline = sharp(inputBuffer).resize({
        width: MAX_WIDTH,
        withoutEnlargement: true,
      })

      if (ext === ".jpg" || ext === ".jpeg") {
        pipeline = pipeline.jpeg({
          quality: JPEG_QUALITY,
          progressive: true,
          mozjpeg: true,
        })
      } else if (ext === ".png") {
        pipeline = pipeline.png({
          compressionLevel: PNG_COMPRESSION,
          palette: true,
          quality: 80,
          effort: 10,
        })
      } else if (ext === ".webp") {
        pipeline = pipeline.webp({
          quality: 55,
          effort: 6,
        })
      }

      const outputBuffer = await pipeline.toBuffer()

      if (outputBuffer.length < before) {
        await writeFile(filePath, outputBuffer)
        totalBefore += before
        totalAfter += outputBuffer.length
        const pct = Math.round((1 - outputBuffer.length / before) * 100)
        console.log(`  ✅ ${file}: ${fmtSize(before)} → ${fmtSize(outputBuffer.length)} (-${pct}%)`)
      } else {
        totalBefore += before
        totalAfter += before
        console.log(`  ⏭️  ${file} (${fmtSize(before)}) — już optymalny`)
      }
    } catch (err) {
      totalBefore += before
      totalAfter += before
      console.log(`  ❌ ${file}: ${err.message}`)
    }
  }

  const savedPct = totalBefore > 0 ? Math.round((1 - totalAfter / totalBefore) * 100) : 0
  console.log(`\n📊 Razem: ${fmtSize(totalBefore)} → ${fmtSize(totalAfter)} (-${savedPct}%)`)
  console.log(`💾 Zaoszczędzono: ${fmtSize(totalBefore - totalAfter)}\n`)
}

function fmtSize(bytes) {
  if (bytes < 1024) return `${bytes} B`
  return `${Math.round(bytes / 1024)} KB`
}

optimizeImages().catch(console.error)
