import { getProperties } from '@/data/properties'
import { seedPlots } from '@/data/seedPlots'
import { filterByCategory, type PropertyCategory } from '@/lib/propertyCategories'
import type { Property } from '@/types/property'

/** Slim list payload for catalog pages — local covers preferred. */
export async function getCategoryListings(category: PropertyCategory): Promise<Property[]> {
  const all = await getProperties()
  const seedCoverByCode = new Map(seedPlots.map((p) => [p.code, p.images[0]]))
  return filterByCategory(all, category).map((p) => {
    const cover = seedCoverByCode.get(p.code) || p.images[0]
    return {
      ...p,
      images: cover ? [cover] : [],
      videos: [] as string[],
      reviews: undefined,
      amenities: p.amenities?.slice(0, 4),
      description: '',
      highlights: [],
      nearbyPlaces: undefined,
      mapEmbedUrl: undefined,
      panoramaUrl: undefined,
      panoramaLink: undefined,
      documents: undefined,
      ambientAudio: undefined,
    }
  })
}
