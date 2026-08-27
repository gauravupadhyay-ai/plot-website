import { unstable_cache } from 'next/cache'
import { Property, PlotReview } from '@/types/property'
import { supabase } from '@/lib/supabase'
import { seedPlots } from '@/data/seedPlots'

/** Old demo inventory codes — never show these once seedPlots is the source of truth */
const LEGACY_DEMO_CODES = new Set([
  'GP-P001',
  'GP-P002',
  'GP-P003',
  'GP-P004',
  'GP-P005',
  'GP-P006',
  'AX-AS-001', // merged into AX-GC-001
  'AX-YE-001', // Expressway Residency — hidden from public site
])

const HIDDEN_SLUGS = new Set([
  'expressway-residency-yamuna-expressway',
])

async function getReviewsByCodes(codes: string[]): Promise<Record<string, PlotReview[]>> {
  if (!codes.length) return {}
  const { data } = await supabase
    .from('plot_reviews')
    .select('*')
    .in('property_code', codes)
    .order('review_date', { ascending: false })

  const map: Record<string, PlotReview[]> = {}
  ;(data || []).forEach((row: any) => {
    const list = map[row.property_code] || []
    list.push({
      id: row.id,
      author: row.author,
      rating: Number(row.rating),
      comment: row.comment,
      date: row.review_date || row.created_at,
    })
    map[row.property_code] = list
  })
  return map
}

function mapProperty(dbProp: any, reviews: PlotReview[] = []): Property {
  return {
    slug: dbProp.slug,
    code: dbProp.code,
    type: dbProp.type,
    title: dbProp.title,
    location: dbProp.location,
    locality: dbProp.locality,
    price: Number(dbProp.price),
    priceLabel: dbProp.price_label,
    priceOnRequest: Boolean(dbProp.price_on_request) || dbProp.price_label === 'Price on Request',
    pricePerUnit: dbProp.price_per_unit || undefined,
    bhk: dbProp.bhk || 'N/A',
    bedrooms: dbProp.bedrooms ?? 0,
    bathrooms: dbProp.bathrooms ?? 0,
    area: Number(dbProp.area),
    areaUnit: dbProp.area_unit || 'sq.yd',
    floor: dbProp.floor,
    facing: dbProp.facing,
    age: dbProp.age,
    parking: dbProp.parking,
    ownership: dbProp.ownership || 'Freehold',
    status: dbProp.status || 'Available',
    description: dbProp.description,
    highlights: dbProp.highlights || [],
    amenities: dbProp.amenities || [],
    images: dbProp.images?.length ? dbProp.images : [],
    videos: dbProp.videos || [],
    featured: Boolean(dbProp.featured),
    badge: dbProp.badge || 'For Sale',
    nearbyPlaces: dbProp.nearby_places || [],
    mapEmbedUrl: dbProp.map_embed_url,
    panoramaUrl: dbProp.panorama_url || undefined,
    panoramaLink: dbProp.panorama_link || undefined,
    lat: dbProp.lat != null ? Number(dbProp.lat) : undefined,
    lng: dbProp.lng != null ? Number(dbProp.lng) : undefined,
    reviews: reviews.length ? reviews : undefined,
    ratingAvg: dbProp.rating_avg != null ? Number(dbProp.rating_avg) : undefined,
    ratingCount: dbProp.rating_count != null ? Number(dbProp.rating_count) : undefined,
  }
}

function uniqueUrls(urls: string[] | undefined): string[] {
  if (!urls?.length) return []
  const seen = new Set<string>()
  const out: string[] = []
  for (const url of urls) {
    const key = url.split('?')[0].replace(/\/$/, '')
    const base = key.split('/').pop()?.toLowerCase() || key
    // Drop exact URL dupes and same filename served from different hosts/paths
    const dedupeKey = `${base}`
    if (seen.has(key) || seen.has(dedupeKey)) continue
    seen.add(key)
    seen.add(dedupeKey)
    out.push(url)
  }
  return out
}

function withSeedOverrides(property: Property): Property {
  const seed = seedPlots.find((p) => p.code === property.code || p.slug === property.slug)
  if (!seed) {
    return {
      ...property,
      images: uniqueUrls(property.images),
      videos: uniqueUrls(property.videos),
    }
  }
  const useSeedMedia =
    seed.code === 'AX-VV-001' ||
    seed.code === 'AX-UB-001' ||
    seed.code === 'AX-NX-001' ||
    seed.code === 'AX-GC-001' ||
    seed.code === 'AX-E7-001' ||
    seed.code === 'AX-BT-001'
  const images = uniqueUrls(
    useSeedMedia
      ? seed.images
      : property.images?.some((u) => u.includes('supabase.co'))
        ? property.images
        : seed.images
  )
  const videos = uniqueUrls(
    useSeedMedia
      ? seed.videos
      : property.videos?.some((u) => u.includes('supabase.co'))
        ? property.videos
        : seed.videos
  )
  // Database/admin edits win; seed fills gaps and supplies default media.
  return {
    ...seed,
    ...property,
    images: images.length ? images : uniqueUrls(seed.images),
    videos: videos.length ? videos : uniqueUrls(seed.videos),
    panoramaUrl: property.panoramaUrl || seed.panoramaUrl,
    panoramaLink: property.panoramaLink || seed.panoramaLink,
    lat: property.lat ?? seed.lat,
    lng: property.lng ?? seed.lng,
    mapEmbedUrl: property.mapEmbedUrl || seed.mapEmbedUrl,
    priceOnRequest: property.priceOnRequest ?? seed.priceOnRequest,
    documents: property.documents?.length ? property.documents : seed.documents,
    nearbyPlaces: property.nearbyPlaces?.length ? property.nearbyPlaces : seed.nearbyPlaces,
    areaLabel: property.areaLabel || seed.areaLabel,
    highlights: property.highlights?.length ? property.highlights : seed.highlights,
    amenities: property.amenities?.length ? property.amenities : seed.amenities,
  }
}

async function fetchPropertiesUncached(): Promise<Property[]> {
  const seedByCode = new Set(seedPlots.map((p) => p.code))
  const seedBySlug = new Set(seedPlots.map((p) => p.slug))

  try {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .in('type', ['Plot', 'Commercial', 'Flat / Apartment'])
      .order('created_at', { ascending: false })

    if (error || !data?.length) {
      return seedPlots.map((p) => ({
        ...p,
        images: uniqueUrls(p.images),
        videos: uniqueUrls(p.videos),
      }))
    }

    const byCode = new Map<string, Property>()
    for (const seed of seedPlots) {
      byCode.set(seed.code, {
        ...seed,
        images: uniqueUrls(seed.images),
        videos: uniqueUrls(seed.videos),
      })
    }

    for (const row of data) {
      if (LEGACY_DEMO_CODES.has(row.code) || HIDDEN_SLUGS.has(row.slug)) continue
      const mapped = mapProperty(row)
      if (seedByCode.has(row.code) || seedBySlug.has(row.slug)) {
        byCode.set(row.code, withSeedOverrides(mapped))
      } else {
        byCode.set(row.code, {
          ...mapped,
          images: uniqueUrls(mapped.images),
          videos: uniqueUrls(mapped.videos),
        })
      }
    }

    const ordered: Property[] = []
    const used = new Set<string>()
    for (const seed of seedPlots) {
      const item = byCode.get(seed.code)
      if (item) {
        ordered.push(item)
        used.add(seed.code)
      }
    }
    for (const [code, item] of Array.from(byCode.entries())) {
      if (!used.has(code)) ordered.push(item)
    }
    return ordered
  } catch {
    return seedPlots.map((p) => ({
      ...p,
      images: uniqueUrls(p.images),
      videos: uniqueUrls(p.videos),
    }))
  }
}

export const getProperties = unstable_cache(fetchPropertiesUncached, ['properties-list-v2'], {
  revalidate: 300,
})

export async function getPropertyBySlug(slug: string): Promise<Property | undefined> {
  // Aero Suites merged into Chrysalis listing
  const resolvedSlug =
    slug === 'gaur-aero-suites-yamuna-expressway' ? 'gaur-chrysalis-greater-noida' : slug

  if (HIDDEN_SLUGS.has(resolvedSlug)) return undefined
  const fromSeed = seedPlots.find((p) => p.slug === resolvedSlug)

  // Prefer seed for known inventory — avoids Supabase + reviews latency on detail pages
  if (fromSeed) {
    return {
      ...fromSeed,
      images: uniqueUrls(fromSeed.images),
      videos: uniqueUrls(fromSeed.videos),
    }
  }

  try {
    const { data, error } = await supabase.from('properties').select('*').eq('slug', resolvedSlug).single()
    if (!error && data && !LEGACY_DEMO_CODES.has(data.code)) {
      return withSeedOverrides(mapProperty(data))
    }
  } catch {
    // fall through
  }

  return undefined
}

export async function getPropertiesByLocality(locality: string): Promise<Property[]> {
  const all = await getProperties()
  return all.filter((p) => p.locality.toLowerCase().includes(locality.toLowerCase()))
}

export async function getFeaturedProperties(): Promise<Property[]> {
  const all = await getProperties()
  const featured = all.filter((p) => p.featured)
  return featured.length ? featured : all.slice(0, 6)
}
