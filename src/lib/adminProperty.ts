import { seedPlots } from '@/data/seedPlots'
import { getPlotVisualSections } from '@/data/plotVisualSections'
import type { AdminPropertyRecord } from '@/components/admin/AdminPropertyForm'
import type { Property } from '@/types/property'
import { parseListingBundle, sectionsForEditor } from '@/lib/listingStory'

export type AdminListProperty = {
  id: string | null
  editKey: string
  code: string
  slug: string
  title: string
  type: string
  locality: string
  location: string
  price_label: string
  area: number
  area_unit: string
  images: string[]
  source: 'database' | 'seed' | 'both'
}

export function seedToAdminRecord(seed: Property): AdminPropertyRecord {
  return {
    code: seed.code,
    slug: seed.slug,
    title: seed.title,
    type: seed.type,
    location: seed.location,
    locality: seed.locality,
    price: seed.price,
    price_label: seed.priceLabel,
    bhk: seed.bhk,
    bedrooms: seed.bedrooms,
    bathrooms: seed.bathrooms,
    area: seed.area,
    area_unit: seed.areaUnit,
    description: seed.description,
    badge: seed.badge,
    images: seed.images || [],
    videos: seed.videos || [],
    map_embed_url: seed.mapEmbedUrl || null,
    lat: seed.lat ?? null,
    lng: seed.lng ?? null,
    panorama_url: seed.panoramaUrl || null,
    panorama_link: seed.panoramaLink || null,
    highlights: seed.highlights || [],
    amenities: seed.amenities || [],
    status: seed.status || 'Available',
    facing: seed.facing || '',
    ownership: seed.ownership || 'Freehold',
    area_label: seed.areaLabel || '',
    developer: seed.developer || '',
    price_per_unit: seed.pricePerUnit || '',
    visual_sections: getPlotVisualSections(seed.slug, seed.code) || null,
  }
}

export function dbRowToAdminRecord(row: Record<string, unknown>): AdminPropertyRecord {
  const bundle = parseListingBundle(row.nearby_places)
  const slug = String(row.slug || '')
  const code = String(row.code || '')
  return {
    id: String(row.id),
    slug: String(row.slug || ''),
    code: String(row.code || ''),
    title: String(row.title || ''),
    type: String(row.type || 'Plot'),
    location: String(row.location || ''),
    locality: String(row.locality || ''),
    price: (row.price as number | string) ?? 0,
    price_label: String(row.price_label || 'Price on Request'),
    bhk: String(row.bhk || 'N/A'),
    bedrooms: (row.bedrooms as number | string) ?? 0,
    bathrooms: (row.bathrooms as number | string) ?? 0,
    area: (row.area as number | string) ?? 0,
    area_unit: String(row.area_unit || 'sq.yd'),
    description: String(row.description || ''),
    badge: String(row.badge || 'For Sale'),
    images: (row.images as string[]) || [],
    videos: (row.videos as string[]) || [],
    map_embed_url: (row.map_embed_url as string) || null,
    lat: (row.lat as number | string) ?? null,
    lng: (row.lng as number | string) ?? null,
    panorama_url: (row.panorama_url as string) || null,
    panorama_link: (row.panorama_link as string) || null,
    highlights: (row.highlights as string[]) || [],
    amenities: (row.amenities as string[]) || [],
    status: String(row.status || 'Available'),
    facing: String(row.facing || ''),
    ownership: String(row.ownership || 'Freehold'),
    area_label: bundle.areaLabel || '',
    developer: bundle.developer || '',
    price_per_unit: bundle.pricePerUnit || String(row.price_per_unit || ''),
    visual_sections: sectionsForEditor(slug, code, row.nearby_places),
  }
}

export function mergeAdminInventory(dbRows: Record<string, unknown>[]): AdminListProperty[] {
  const byCode = new Map<string, Record<string, unknown>>()
  for (const row of dbRows) {
    const code = String(row.code || '')
    if (code) byCode.set(code, row)
  }

  const list: AdminListProperty[] = []
  const seen = new Set<string>()

  for (const seed of seedPlots) {
    const db = byCode.get(seed.code)
    seen.add(seed.code)
    list.push({
      id: db?.id ? String(db.id) : null,
      editKey: db?.id ? String(db.id) : seed.code,
      code: seed.code,
      slug: String(db?.slug || seed.slug),
      title: String(db?.title || seed.title),
      type: String(db?.type || seed.type),
      locality: String(db?.locality || seed.locality),
      location: String(db?.location || seed.location),
      price_label: String(db?.price_label || seed.priceLabel),
      area: Number(db?.area ?? seed.area) || 0,
      area_unit: String(db?.area_unit || seed.areaUnit || 'sq.yd'),
      images: ((db?.images as string[] | undefined)?.length
        ? (db?.images as string[])
        : seed.images) || [],
      source: db ? 'both' : 'seed',
    })
  }

  for (const row of dbRows) {
    const code = String(row.code || '')
    if (!code || seen.has(code)) continue
    list.push({
      id: String(row.id),
      editKey: String(row.id),
      code,
      slug: String(row.slug || ''),
      title: String(row.title || ''),
      type: String(row.type || 'Plot'),
      locality: String(row.locality || ''),
      location: String(row.location || ''),
      price_label: String(row.price_label || 'Price on Request'),
      area: Number(row.area) || 0,
      area_unit: String(row.area_unit || 'sq.yd'),
      images: (row.images as string[]) || [],
      source: 'database',
    })
  }

  return list
}
