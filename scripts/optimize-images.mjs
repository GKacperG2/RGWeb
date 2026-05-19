/**
 * Post-build image optimization script.
 *
 * Runs AFTER `next build` on the `out/images/` directory.
 * Original files in `public/images/` stay untouched.
 *
 * Features:
 * - Converts exotic formats (.jfif, .bmp, .tiff, .gif) → .jpg
 * - Updates HTML references to match new filenames
 * - JPEG: quality 78, progressive, mozjpeg, max 1600px
 * - PNG: quality 80, palette mode, max 1600px
 * - Skips files < 5KB
 */

import sharp from "sharp"
import { readdir, stat, readFile, writeFile, unlink } from "fs/promises"
import { join, extname, basename } from "path"

const IMAGES_DIR = "out/images"
const MAX_WIDTH = 1600
const JPEG_QUALITY = 78
const PNG_COMPRESSION = 9

// Formats that need conversion to .jpg (browsers may not support them)
const CONVERT_TO_JPG = [".jfif", ".bmp", ".tiff", ".tif"]

async function optimizeImages() {
  console.log("\n🖼️  Optymalizacja obrazków...\n")

  let files
  try {
    files = await readdir(IMAGES_DIR)
  } catch {
    console.log("⚠️  Brak katalogu out/images/ — pomiń")
    return
  }

  const supportedExts = [".jpg", ".jpeg", ".png", ".webp", ".jfif", ".gif", ".bmp", ".tiff", ".tif", ".avif"]
  const imageFiles = files.filter((f) => supportedExts.includes(extname(f).toLowerCase()))

  let totalBefore = 0
  let totalAfter = 0
  const renames = [] // track file renames for HTML updates

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
      const inputBuffer = await readFile(filePath)

      let pipeline = sharp(inputBuffer).resize({
        width: MAX_WIDTH,
        withoutEnlargement: true,
      })

      let outputPath = filePath
      let outputName = file

      if (CONVERT_TO_JPG.includes(ext)) {
        // Convert exotic format → .jpg
        pipeline = pipeline.jpeg({
          quality: JPEG_QUALITY,
          progressive: true,
          mozjpeg: true,
        })
        const base = basename(file, extname(file))
        outputName = `${base}.jpg`
        outputPath = join(IMAGES_DIR, outputName)
        renames.push({ from: file, to: outputName })
      } else if (ext === ".jpg" || ext === ".jpeg") {
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
          quality: 75,
          effort: 6,
        })
      } else if (ext === ".avif") {
        pipeline = pipeline.avif({
          quality: 75,
          effort: 6,
        })
      } else if (ext === ".gif") {
        // Convert GIF → jpg (loses animation but saves space)
        pipeline = pipeline.jpeg({
          quality: JPEG_QUALITY,
          progressive: true,
          mozjpeg: true,
        })
        const base = basename(file, extname(file))
        outputName = `${base}.jpg`
        outputPath = join(IMAGES_DIR, outputName)
        renames.push({ from: file, to: outputName })
      }

      const outputBuffer = await pipeline.toBuffer()

      if (outputBuffer.length < before || outputPath !== filePath) {
        await writeFile(outputPath, outputBuffer)
        // Remove old file if converted to new name
        if (outputPath !== filePath) {
          await unlink(filePath)
        }
        totalBefore += before
        totalAfter += outputBuffer.length
        const pct = Math.round((1 - outputBuffer.length / before) * 100)
        if (outputName !== file) {
          console.log(`  ✅ ${file} → ${outputName}: ${fmtSize(before)} → ${fmtSize(outputBuffer.length)} (-${pct}%)`)
        } else {
          console.log(`  ✅ ${file}: ${fmtSize(before)} → ${fmtSize(outputBuffer.length)} (-${pct}%)`)
        }
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

  // Update HTML/JSON files if any images were renamed
  if (renames.length > 0) {
    console.log("\n📝 Aktualizacja referencji w HTML...")
    await updateReferences(renames)
  }

  const savedPct = totalBefore > 0 ? Math.round((1 - totalAfter / totalBefore) * 100) : 0
  console.log(`\n📊 Razem: ${fmtSize(totalBefore)} → ${fmtSize(totalAfter)} (-${savedPct}%)`)
  console.log(`💾 Zaoszczędzono: ${fmtSize(totalBefore - totalAfter)}\n`)
}

/**
 * Update all HTML files in out/ to use new image filenames
 */
async function updateReferences(renames) {
  const htmlFiles = await findFiles("out", [".html", ".json", ".txt"])

  for (const htmlFile of htmlFiles) {
    let content = await readFile(htmlFile, "utf-8")
    let changed = false

    for (const { from, to } of renames) {
      const oldRef = `/images/${from}`
      const newRef = `/images/${to}`
      if (content.includes(oldRef)) {
        content = content.replaceAll(oldRef, newRef)
        changed = true
      }
    }

    if (changed) {
      await writeFile(htmlFile, content, "utf-8")
      console.log(`  📄 ${htmlFile}`)
    }
  }
}

/**
 * Recursively find files with given extensions
 */
async function findFiles(dir, extensions) {
  const results = []
  const entries = await readdir(dir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = join(dir, entry.name)
    if (entry.isDirectory()) {
      results.push(...await findFiles(fullPath, extensions))
    } else if (extensions.includes(extname(entry.name).toLowerCase())) {
      results.push(fullPath)
    }
  }

  return results
}

function fmtSize(bytes) {
  if (bytes < 1024) return `${bytes} B`
  return `${Math.round(bytes / 1024)} KB`
}

optimizeImages().catch(console.error)
