import sharp from 'sharp'
import fs from 'fs'
import path from 'path'

async function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) await walk(full, out)
    else if (/\.(jpe?g|png)$/i.test(entry.name)) out.push(full)
  }
  return out
}

const root = path.join(process.cwd(), 'public', 'images')
const files = await walk(root)
let saved = 0

for (const file of files) {
  const before = fs.statSync(file).size
  if (before < 180_000) continue

  const ext = path.extname(file).toLowerCase()
  const tmp = `${file}.tmp.webp`
  try {
    // Write optimized JPEG in-place (keep original extension for existing URLs)
    const outTmp = `${file}.tmp`
    const pipeline = sharp(file)
      .rotate()
      .resize({ width: 1920, height: 1920, fit: 'inside', withoutEnlargement: true })

    if (ext === '.png') {
      await pipeline.png({ compressionLevel: 9, palette: true }).toFile(outTmp)
    } else {
      await pipeline.jpeg({ quality: 78, mozjpeg: true }).toFile(outTmp)
    }

    const after = fs.statSync(outTmp).size
    if (after < before * 0.92) {
      fs.renameSync(outTmp, file)
      saved += before - after
      console.log(
        `${path.relative(root, file)}: ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB`
      )
    } else {
      fs.unlinkSync(outTmp)
    }
  } catch (err) {
    if (fs.existsSync(`${file}.tmp`)) fs.unlinkSync(`${file}.tmp`)
    if (fs.existsSync(tmp)) fs.unlinkSync(tmp)
    console.error(`fail ${file}:`, err.message)
  }
}

console.log(`Total saved: ${(saved / 1024 / 1024).toFixed(1)} MB`)
