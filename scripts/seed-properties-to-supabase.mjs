/**
 * Bulk-upload plot photos + listings into Supabase (storage + properties table).
 *
 * Usage:
 *   1. Put photos in seed-media/plots/<CODE>/ (cover first alphabetically, or name cover.*)
 *   2. Edit seed-media/listings.json with all plot info
 *   3. Ensure .env.local has:
 *        NEXT_PUBLIC_SUPABASE_URL=
 *        SUPABASE_SERVICE_ROLE_KEY=   (preferred) OR NEXT_PUBLIC_SUPABASE_ANON_KEY=
 *   4. npm run seed:properties
 *
 * Options:
 *   --dry-run     Print actions without uploading / writing DB
 *   --skip-db     Upload images only
 *   --skip-upload Use existing public URLs already in listings.json images[]
 */

import { createClient } from '@supabase/supabase-js'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const mediaRoot = path.join(root, 'seed-media')
const listingsPath = path.join(mediaRoot, 'listings.json')
const plotsRoot = path.join(mediaRoot, 'plots')

const args = new Set(process.argv.slice(2))
const dryRun = args.has('--dry-run')
const skipDb = args.has('--skip-db')
const skipUpload = args.has('--skip-upload')

const IMAGE_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif'])
const VIDEO_EXT = new Set(['.mp4', '.webm', '.mov'])

function loadEnvLocal() {
  const envPath = path.join(root, '.env.local')
  if (!fs.existsSync(envPath)) return
  const text = fs.readFileSync(envPath, 'utf8')
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq < 0) continue
    const key = trimmed.slice(0, eq).trim()
    let val = trimmed.slice(eq + 1).trim()
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1)
    }
    if (!process.env[key]) process.env[key] = val
  }
}

function contentType(filePath) {
  const ext = path.extname(filePath).toLowerCase()
  const map = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.webp': 'image/webp',
    '.gif': 'image/gif',
    '.avif': 'image/avif',
    '.mp4': 'video/mp4',
    '.webm': 'video/webm',
    '.mov': 'video/quicktime',
  }
  return map[ext] || 'application/octet-stream'
}

function listMediaFiles(dir) {
  if (!fs.existsSync(dir)) return { images: [], videos: [] }
  const files = fs
    .readdirSync(dir)
    .filter((name) => !name.startsWith('.'))
    .map((name) => path.join(dir, name))
    .filter((p) => fs.statSync(p).isFile())

  const images = files
    .filter((p) => IMAGE_EXT.has(path.extname(p).toLowerCase()))
    .sort((a, b) => {
      const an = path.basename(a).toLowerCase()
      const bn = path.basename(b).toLowerCase()
      const aCover = an.startsWith('cover') ? 0 : 1
      const bCover = bn.startsWith('cover') ? 0 : 1
      if (aCover !== bCover) return aCover - bCover
      return an.localeCompare(bn, undefined, { numeric: true })
    })

  const videos = files
    .filter((p) => VIDEO_EXT.has(path.extname(p).toLowerCase()))
    .sort((a, b) => path.basename(a).localeCompare(path.basename(b), undefined, { numeric: true }))

  return { images, videos }
}

function resolveLocalPaths(listing) {
  const folder = listing.folder || listing.code
  const dir = path.join(plotsRoot, folder)

  // Explicit file names inside the plot folder
  if (Array.isArray(listing.imageFiles) && listing.imageFiles.length) {
    return {
      images: listing.imageFiles.map((f) => path.join(dir, f)),
      videos: (listing.videoFiles || []).map((f) => path.join(dir, f)),
    }
  }

  // Migrate from existing project paths (e.g. public/images/...)
  if (Array.isArray(listing.localImages) && listing.localImages.length) {
    return {
      images: listing.localImages.map((f) => path.join(root, f.replace(/^\//, ''))),
      videos: (listing.localVideos || []).map((f) => path.join(root, f.replace(/^\//, ''))),
    }
  }

  // Default: every media file in seed-media/plots/<folder>/
  return listMediaFiles(dir)
}

async function uploadFile(supabase, storagePath, filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing file: ${filePath}`)
  }
  const buffer = fs.readFileSync(filePath)
  const { error } = await supabase.storage.from('properties').upload(storagePath, buffer, {
    contentType: contentType(filePath),
    upsert: true,
  })
  if (error) throw new Error(`${storagePath}: ${error.message}`)
  const { data } = supabase.storage.from('properties').getPublicUrl(storagePath)
  return data.publicUrl
}

function toDbRow(listing, imageUrls, videoUrls) {
  return {
    slug: listing.slug,
    code: listing.code,
    type: listing.type || 'Plot',
    title: listing.title,
    location: listing.location,
    locality: listing.locality,
    price: Number(listing.price),
    price_label: listing.priceLabel || listing.price_label,
    bhk: listing.bhk ?? 'N/A',
    bedrooms: Number(listing.bedrooms ?? 0),
    bathrooms: Number(listing.bathrooms ?? 0),
    area: Number(listing.area),
    area_unit: listing.areaUnit || listing.area_unit || 'sq.yd',
    description: listing.description,
    highlights: listing.highlights || [],
    images: imageUrls,
    videos: videoUrls,
    featured: Boolean(listing.featured),
    badge: listing.badge || 'For Sale',
    nearby_places: listing.nearbyPlaces || listing.nearby_places || [],
    // 360 embed stored here (no separate panorama column required)
    map_embed_url:
      listing.panoramaUrl ||
      listing.panorama_url ||
      listing.mapEmbedUrl ||
      listing.map_embed_url ||
      null,
  }
}

async function main() {
  loadEnvLocal()

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    console.error(
      'Missing Supabase env. Add NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to .env.local'
    )
    process.exit(1)
  }

  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.warn(
      'Warning: SUPABASE_SERVICE_ROLE_KEY not set — using anon key. Uploads may fail if storage policies are strict.'
    )
  }

  if (!fs.existsSync(listingsPath)) {
    console.error(`Missing ${listingsPath}`)
    console.error('Copy listings.example.json → listings.json and fill in your plots.')
    process.exit(1)
  }

  const listings = JSON.parse(fs.readFileSync(listingsPath, 'utf8'))
  if (!Array.isArray(listings) || !listings.length) {
    console.error('listings.json must be a non-empty array')
    process.exit(1)
  }

  const supabase = createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  })

  console.log(`Seeding ${listings.length} listing(s)${dryRun ? ' [dry-run]' : ''}…\n`)

  for (const listing of listings) {
    if (!listing.code || !listing.slug || !listing.title) {
      console.error('Each listing needs code, slug, title — skipped one entry')
      continue
    }

    console.log(`→ ${listing.code}  ${listing.title}`)

    let imageUrls = Array.isArray(listing.images) ? [...listing.images] : []
    let videoUrls = Array.isArray(listing.videos) ? [...listing.videos] : []

    if (!skipUpload) {
      const { images, videos } = resolveLocalPaths(listing)
      const existingLocalImages = images.filter((p) => fs.existsSync(p))
      const existingLocalVideos = videos.filter((p) => fs.existsSync(p))

      if (!existingLocalImages.length && !imageUrls.length) {
        console.warn(`  ! No images found for ${listing.code} (folder seed-media/plots/${listing.folder || listing.code})`)
      }

      const uploadedImages = []
      for (let i = 0; i < existingLocalImages.length; i++) {
        const filePath = existingLocalImages[i]
        const ext = path.extname(filePath).toLowerCase() || '.jpg'
        const base = i === 0 ? `cover${ext}` : `${String(i).padStart(2, '0')}${ext}`
        const storagePath = `${listing.code}/${base}`
        if (dryRun) {
          console.log(`  [dry] upload ${filePath} → properties/${storagePath}`)
          uploadedImages.push(`(dry)${storagePath}`)
        } else {
          const publicUrl = await uploadFile(supabase, storagePath, filePath)
          uploadedImages.push(publicUrl)
          console.log(`  ↑ ${path.basename(filePath)}`)
        }
      }

      const uploadedVideos = []
      for (let i = 0; i < existingLocalVideos.length; i++) {
        const filePath = existingLocalVideos[i]
        const ext = path.extname(filePath).toLowerCase() || '.mp4'
        const storagePath = `${listing.code}/video-${String(i).padStart(2, '0')}${ext}`
        if (dryRun) {
          console.log(`  [dry] upload ${filePath} → properties/${storagePath}`)
          uploadedVideos.push(`(dry)${storagePath}`)
        } else {
          const publicUrl = await uploadFile(supabase, storagePath, filePath)
          uploadedVideos.push(publicUrl)
          console.log(`  ↑ video ${path.basename(filePath)}`)
        }
      }

      if (uploadedImages.length) imageUrls = uploadedImages
      if (uploadedVideos.length) videoUrls = uploadedVideos
    }

    if (skipDb) continue

    const row = toDbRow(listing, imageUrls, videoUrls)
    if (dryRun) {
      console.log(`  [dry] upsert properties code=${row.code} images=${row.images.length}`)
      continue
    }

    const { error } = await supabase.from('properties').upsert(row, { onConflict: 'code' })
    if (error) {
      console.error(`  ✗ DB upsert failed: ${error.message}`)
      continue
    }
    console.log(`  ✓ saved (${imageUrls.length} images, ${videoUrls.length} videos)`)

    if (Array.isArray(listing.reviews) && listing.reviews.length) {
      await supabase.from('plot_reviews').delete().eq('property_code', listing.code)
      const reviewRows = listing.reviews.map((r) => ({
        property_code: listing.code,
        property_slug: listing.slug,
        author: r.author,
        rating: Number(r.rating),
        comment: r.comment,
        review_date: r.date || r.review_date || null,
      }))
      const { error: revErr } = await supabase.from('plot_reviews').insert(reviewRows)
      if (revErr) console.warn(`  ! reviews: ${revErr.message}`)
      else console.log(`  ✓ ${reviewRows.length} review(s)`)
    }
  }

  console.log('\nDone.')
  if (!dryRun) {
    console.log('Open the site Properties page — listings should load from Supabase.')
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
