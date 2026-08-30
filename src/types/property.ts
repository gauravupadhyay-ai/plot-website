export interface PlotReview {
  id: string
  author: string
  rating: number
  comment: string
  date: string
}

export interface Property {
  slug: string
  code: string
  type: 'Flat / Apartment' | 'Independent House' | 'Plot' | 'Commercial'
  title: string
  location: string
  locality: string
  price: number
  priceLabel: string
  /** When true, hide numeric price and show Contact / Call CTAs instead */
  priceOnRequest?: boolean
  pricePerUnit?: string
  bhk: string
  bedrooms: number
  bathrooms: number
  area: number
  areaUnit: string
  /** Optional display override (e.g. size range) */
  areaLabel?: string
  floor?: string
  facing?: string
  age?: string
  parking?: string
  ownership?: string
  status?: string
  description: string
  highlights: string[]
  amenities?: string[]
  images: string[]
  videos: string[]
  /** Price list files shown on the detail page */
  documents?: { label: string; url: string }[]
  /** Developer / group name (used in catalog filters) */
  developer?: string
  /** Soft looping tracks for Vrindavan / Braj project pages */
  ambientAudio?: string[]
  featured: boolean
  badge: 'For Sale' | 'Hot Deal' | 'New' | 'Sold'
  nearbyPlaces?: { name: string; distance: string }[]
  mapEmbedUrl?: string
  /** Google Street View / photosphere embed URL */
  panoramaUrl?: string
  /** Open 360° in a new tab */
  panoramaLink?: string
  lat?: number
  lng?: number
  reviews?: PlotReview[]
  ratingAvg?: number
  ratingCount?: number
}

export interface Enquiry {
  name: string
  phone: string
  email?: string
  userType?: 'Buyer' | 'Seller' | 'Investor' | 'Other'
  propertyType?: string
  budgetRange?: string
  message?: string
  propertyCode?: string
  source?: string
}

export interface Project {
  slug: string
  name: string
  location: string
  type: string
  status: 'Available' | 'Under Construction' | 'Sold Out'
  reraNo?: string
  description: string
  highlights: string[]
  unitConfigs: string[]
  amenities: { icon: string; label: string }[]
  images: string[]
  startingPrice?: string
  mapEmbedUrl?: string
  distances?: { place: string; distance: string }[]
}

export interface Testimonial {
  id: number
  name: string
  quote: string
  rating: number
  type?: 'Buyer' | 'Seller' | 'Investor'
  date?: string
}

export interface Locality {
  slug: string
  name: string
  description: string
  propertyCount: number
  image: string
}

export interface TeamMember {
  name: string
  role: string
  image: string
  bio?: string
  linkedin?: string
}
