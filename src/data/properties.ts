import { Property, PlotReview } from '@/types/property'
import { supabase } from '@/lib/supabase'
import { seedPlots } from '@/data/seedPlots'

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
    lat: dbProp.lat != null ? Number(dbProp.lat) : undefined,
    lng: dbProp.lng != null ? Number(dbProp.lng) : undefined,
    reviews: reviews.length ? reviews : undefined,
    ratingAvg: dbProp.rating_avg != null ? Number(dbProp.rating_avg) : undefined,
    ratingCount: dbProp.rating_count != null ? Number(dbProp.rating_count) : undefined,
  }
}

function withFallbackImages(property: Property): Property {
  if (property.images?.length) return property
  const seed = seedPlots.find((p) => p.code === property.code || p.slug === property.slug)
  return seed ? { ...property, images: seed.images, videos: property.videos?.length ? property.videos : seed.videos } : property
}

export async function getProperties(): Promise<Property[]> {
  try {
    const { data, error } = await supabase.from('properties').select('*').eq('type', 'Plot').order('created_at', { ascending: false })
    if (error || !data?.length) return seedPlots

    const reviewsMap = await getReviewsByCodes(data.map((p) => p.code))
    return data.map((row) => withFallbackImages(mapProperty(row, reviewsMap[row.code] || [])))
  } catch {
    return seedPlots
  }
}

export async function getPropertyBySlug(slug: string): Promise<Property | undefined> {
  try {
    const { data, error } = await supabase.from('properties').select('*').eq('slug', slug).single()
    if (error || !data) return seedPlots.find((p) => p.slug === slug)

    const reviewsMap = await getReviewsByCodes([data.code])
    const mapped = withFallbackImages(mapProperty(data, reviewsMap[data.code] || []))
    if (!mapped.reviews?.length) {
      const seed = seedPlots.find((p) => p.slug === slug)
      if (seed?.reviews) mapped.reviews = seed.reviews
    }
    return mapped
  } catch {
    return seedPlots.find((p) => p.slug === slug)
  }
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
