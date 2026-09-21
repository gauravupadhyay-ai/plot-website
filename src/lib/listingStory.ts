import type { PlotDriveCard, PlotVisualCard, PlotVisualSections } from '@/data/plotVisualSections'
import { getPlotVisualSections } from '@/data/plotVisualSections'

export type NearbyPlace = { name: string; distance: string }

export type ListingBundle = {
  v: 1
  places: NearbyPlace[]
  sections?: PlotVisualSections
  areaLabel?: string
  developer?: string
  pricePerUnit?: string
}

export const LOCALITY_OPTIONS = [
  'Jewar / Yamuna Expressway',
  'Nandgaon / Barsana',
  'Nari Semri / Vrindavan',
  'Vrindavan',
  'Sector 153, Noida',
  'Yamuna Expressway / Gaur Yamuna City',
  'Omicron 1A, Greater Noida',
  'Knowledge Park 3, Greater Noida',
  'Greater Noida',
  'Noida',
]

export const STATUS_OPTIONS = [
  'Available',
  'Pre-Launch',
  'Available for Sale',
  'Ready for Possession',
  'Under Construction',
  'Sold Out',
]

export const FACING_OPTIONS = [
  'North',
  'East',
  'South',
  'West',
  'North-East',
  'North-West',
  'South-East',
  'South-West',
]

export const OWNERSHIP_OPTIONS = ['Freehold', 'Leasehold', 'Co-operative Society']

export const AREA_UNIT_OPTIONS = ['sq.yd', 'sq.ft', 'gaj', 'acre', 'sq.m']

export const BHK_OPTIONS = ['N/A', 'Studio', '1 BHK', '2 BHK', '3 BHK', '4 BHK', '5 BHK']

export const PRICE_LABEL_OPTIONS = ['Price on Request']

export const DEVELOPER_OPTIONS = [
  'Shubh Labh Group',
  'Rama Global Infra Pvt. Ltd.',
  'Laadli Group',
  'Urbtech',
  'Hari Kripa Buildscape Pvt. Ltd.',
]

export const HIGHLIGHT_PRESETS = [
  'Bank and government-supported home loans available',
  'Pre-launch rate below expected launch price',
  'Registration open',
  'Government-approved township',
  'Plots allotted through draw',
  'RERA registered',
  'Freehold ownership',
  'Gated community',
]

export const AMENITY_PRESETS = [
  'Wide internal roads',
  '52 ft & 35 ft wide roads',
  'Parks and green spaces',
  '7 parks',
  'School & community hall',
  'Commercial shops',
  'Electricity, water & sewerage',
  'Gated community',
  '24/7 Security',
  'Underground utilities',
  'Clubhouse',
  'Power backup',
]

export const STOCK_LISTING_IMAGES: { label: string; src: string }[] = [
  { label: 'Township plan', src: '/images/landings/lalita-township.jpg' },
  { label: 'Green park', src: '/images/landings/gated-park.jpg' },
  { label: 'Colony shops', src: '/images/landings/colony-shops.jpg' },
  { label: 'Nandgaon', src: '/images/landings/nandgaon.jpg' },
  { label: 'Radha Rani Temple, Barsana', src: '/images/landings/radha-rani-barsana.jpg' },
  { label: 'Kokilavan', src: '/images/landings/kokilavan-shani.jpg' },
  { label: 'Govardhan', src: '/images/landings/govardhan-parikrama.jpg' },
  { label: 'Vrindavan temples', src: '/images/landings/vrindavan-temples.jpg' },
  { label: 'Yamuna Expressway', src: '/images/landings/yamuna-expressway.jpg' },
  { label: 'Jewar Airport', src: '/images/landings/jewar-airport.jpg' },
  { label: 'Gated township', src: '/images/landings/hari-shyam-gated.jpg' },
  { label: 'NH-2 corridor', src: '/images/landings/nh2-corridor.jpg' },
  { label: 'Prem Mandir', src: '/images/landings/prem-mandir.jpg' },
  { label: 'Plots cover', src: '/images/hero/hero-plots.jpg' },
]

const FALLBACK_IMAGE = '/images/hero/hero-plots.jpg'

/** Headings used on the public listing, same blocks as the existing projects. */
export const TOWNSHIP_STYLES = [
  {
    id: 'society',
    label: 'Township — A Society You Can Live In, Not Only Hold',
    eyebrow: 'Township',
    title: 'A Society You Can Live In, Not Only Hold',
    subtitle: 'A gated township with roads, parks, and a boundary you can walk.',
  },
  {
    id: 'acres',
    label: '40 Acres · 582 Plots — A Township, Not a Scattered Cut',
    eyebrow: '40 Acres · 582 Plots',
    title: 'A Township, Not a Scattered Cut',
    subtitle: 'Government-approved planning with roads, parks, civic amenities — and RERA on the way.',
  },
] as const

export const AROUND_LAND_STYLES = [
  {
    id: 'corridor',
    label: "The Corridor — What's Actually Rising Around This Land",
    eyebrow: 'The Corridor',
    title: "What's Actually Rising Around This Land",
    subtitle: 'Airport, expressway, Film City, and the growth already mapped around this land.',
  },
  {
    id: 'circuit',
    label: 'The Circuit — Faith Meets a Corridor That’s Being Built Out',
    eyebrow: 'The Circuit',
    title: 'Faith Meets a Corridor That’s Being Built Out',
    subtitle: 'Temples and towns people already travel — this listing sits on that map.',
  },
  {
    id: 'belt',
    label: 'The Belt — A Township on the Road Into Vrindavan',
    eyebrow: 'The Belt',
    title: 'A Township on the Road Into Vrindavan',
    subtitle: 'Highway, campus, and temple access already on this belt.',
  },
  {
    id: 'location',
    label: 'The Location — Where This Land Sits',
    eyebrow: 'The Location',
    title: 'Where This Land Sits',
    subtitle: 'The places a buyer can reach from the gate.',
  },
] as const

export function emptyVisualSections(): PlotVisualSections {
  const corridor = AROUND_LAND_STYLES[0]
  return {
    amenitiesEyebrow: '',
    amenitiesTitle: '',
    amenitiesSubtitle: '',
    amenities: [],
    connectivityEyebrow: corridor.eyebrow,
    connectivityTitle: corridor.title,
    connectivitySubtitle: corridor.subtitle,
    drives: [],
    connectivity: [],
  }
}

function asCard(raw: unknown): PlotVisualCard | null {
  if (!raw || typeof raw !== 'object') return null
  const card = raw as Partial<PlotVisualCard>
  const title = String(card.title || '').trim()
  if (!title) return null
  const image = String(card.image || '').trim() || FALLBACK_IMAGE
  return {
    tag: card.tag ? String(card.tag).trim() : undefined,
    title,
    description: String(card.description || '').trim(),
    image,
    alt: String(card.alt || title).trim(),
  }
}

function asDrive(raw: unknown): PlotDriveCard | null {
  if (!raw || typeof raw !== 'object') return null
  const drive = raw as Partial<PlotDriveCard>
  const place = String(drive.place || '').trim()
  if (!place) return null
  return {
    time: String(drive.time || '').trim(),
    place,
    note: drive.note ? String(drive.note).trim() : undefined,
  }
}

export function cleanVisualSections(sections?: PlotVisualSections | null): PlotVisualSections | undefined {
  if (!sections) return undefined
  const amenities = (sections.amenities || []).map(asCard).filter((card): card is PlotVisualCard => Boolean(card))
  const connectivity = (sections.connectivity || []).map(asCard).filter((card): card is PlotVisualCard => Boolean(card))
  const drives = (sections.drives || []).map(asDrive).filter((drive): drive is PlotDriveCard => Boolean(drive))
  const amenitiesTitle = sections.amenitiesTitle?.trim() || ''
  const connectivityTitle = sections.connectivityTitle?.trim() || ''
  const connectivityEyebrow = sections.connectivityEyebrow?.trim() || ''
  if (
    !amenities.length &&
    !connectivity.length &&
    !drives.length &&
    !amenitiesTitle &&
    !connectivityTitle &&
    !connectivityEyebrow
  ) {
    return undefined
  }
  return {
    amenitiesEyebrow: sections.amenitiesEyebrow?.trim() || undefined,
    amenitiesTitle: amenitiesTitle || (amenities.length ? 'Township' : ''),
    amenitiesSubtitle: sections.amenitiesSubtitle?.trim() || undefined,
    amenities,
    connectivityEyebrow: connectivityEyebrow || undefined,
    connectivityTitle:
      connectivityTitle || (connectivity.length || drives.length ? "What's Actually Rising Around This Land" : ''),
    connectivitySubtitle: sections.connectivitySubtitle?.trim() || undefined,
    drives,
    connectivity,
  }
}

export function parseListingBundle(raw: unknown): {
  places: NearbyPlace[]
  sections?: PlotVisualSections
  areaLabel?: string
  developer?: string
  pricePerUnit?: string
} {
  if (Array.isArray(raw)) {
    return {
      places: raw
        .map((place) => ({
          name: String((place as NearbyPlace)?.name || '').trim(),
          distance: String((place as NearbyPlace)?.distance || '').trim(),
        }))
        .filter((place) => place.name),
    }
  }
  if (raw && typeof raw === 'object' && 'v' in raw) {
    const bundle = raw as Partial<ListingBundle>
    const places = Array.isArray(bundle.places)
      ? bundle.places
          .map((place) => ({
            name: String(place?.name || '').trim(),
            distance: String(place?.distance || '').trim(),
          }))
          .filter((place) => place.name)
      : []
    return {
      places,
      sections: cleanVisualSections(bundle.sections),
      areaLabel: bundle.areaLabel?.trim() || undefined,
      developer: bundle.developer?.trim() || undefined,
      pricePerUnit: bundle.pricePerUnit?.trim() || undefined,
    }
  }
  return { places: [] }
}

export function serializeListingBundle(input: {
  sections?: PlotVisualSections | null
  areaLabel?: string
  developer?: string
  pricePerUnit?: string
}): ListingBundle | NearbyPlace[] {
  const sections = cleanVisualSections(input.sections)
  const places: NearbyPlace[] = (sections?.drives || [])
    .filter((drive) => drive.place)
    .map((drive) => ({ name: drive.place, distance: drive.time || '' }))
  const areaLabel = input.areaLabel?.trim() || undefined
  const developer = input.developer?.trim() || undefined
  const pricePerUnit = input.pricePerUnit?.trim() || undefined
  if (!sections && !areaLabel && !developer && !pricePerUnit) return places
  return { v: 1, places, sections, areaLabel, developer, pricePerUnit }
}

export function sectionsForEditor(
  slug: string | undefined,
  code: string | undefined,
  rawNearby: unknown
): PlotVisualSections {
  const bundle = parseListingBundle(rawNearby)
  if (bundle.sections) return bundle.sections
  const known = slug || code ? getPlotVisualSections(slug || '', code) : undefined
  if (known) return known
  return {
    ...emptyVisualSections(),
    drives: bundle.places.map((place) => ({ time: place.distance, place: place.name })),
  }
}
