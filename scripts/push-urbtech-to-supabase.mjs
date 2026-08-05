/**
 * Refresh Urbtech NPX (AX-UB-001) images + title/copy on Supabase.
 */
import { createClient } from '@supabase/supabase-js'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
for (const line of fs.readFileSync(path.join(root, '.env.local'), 'utf8').split(/\r?\n/)) {
  const t = line.trim()
  if (!t || t.startsWith('#')) continue
  const i = t.indexOf('=')
  if (i < 0) continue
  const k = t.slice(0, i).trim()
  let v = t.slice(i + 1).trim()
  if (!process.env[k]) process.env[k] = v
}

function ctype(filePath) {
  const ext = path.extname(filePath).toLowerCase()
  return (
    {
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.webp': 'image/webp',
      '.mp4': 'video/mp4',
    }[ext] || 'application/octet-stream'
  )
}

async function upload(sb, storagePath, absPath) {
  const buf = fs.readFileSync(absPath)
  const { error } = await sb.storage.from('properties').upload(storagePath, buf, {
    contentType: ctype(absPath),
    upsert: true,
  })
  if (error) throw new Error(`${storagePath}: ${error.message}`)
  return sb.storage.from('properties').getPublicUrl(storagePath).data.publicUrl
}

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  { auth: { persistSession: false, autoRefreshToken: false } }
)

const listing = JSON.parse(fs.readFileSync(path.join(root, 'seed-media/listings.json'), 'utf8')).find(
  (l) => l.code === 'AX-UB-001'
)
if (!listing) throw new Error('AX-UB-001 missing')

console.log(`→ ${listing.code} ${listing.title}`)
const imageUrls = []
for (let i = 0; i < (listing.localImages || []).length; i++) {
  const abs = path.join(root, listing.localImages[i])
  const ext = path.extname(abs).toLowerCase() || '.jpg'
  const name = i === 0 ? `cover${ext}` : `${String(i).padStart(2, '0')}${ext}`
  imageUrls.push(await upload(sb, `${listing.code}/${name}`, abs))
  console.log('  ↑', path.basename(abs))
}

const { data: existing } = await sb.from('properties').select('videos').eq('code', 'AX-UB-001').single()

const row = {
  slug: listing.slug,
  code: listing.code,
  type: 'Commercial',
  title: listing.title,
  location: listing.location,
  locality: listing.locality,
  price: Number(listing.price || 0),
  price_label: listing.priceLabel || 'Price on Request',
  bhk: 'N/A',
  bedrooms: 0,
  bathrooms: 0,
  area: Number(listing.area || 0),
  area_unit: listing.areaUnit || 'sq.ft',
  description: listing.description,
  highlights: listing.highlights || [],
  amenities: listing.amenities || [],
  ownership: listing.ownership || 'Freehold',
  status: listing.status || 'Available',
  age: listing.age || null,
  images: imageUrls,
  videos: existing?.videos || [],
  featured: true,
  badge: listing.badge || 'New',
  nearby_places: listing.nearbyPlaces || [],
  map_embed_url: listing.mapEmbedUrl || listing.panoramaUrl || null,
}

const { data, error } = await sb.from('properties').upsert(row, { onConflict: 'code' }).select('code,title')
if (error) console.error('✗ DB', error.message)
else console.log('✓ DB', data)
