import type { Property } from '@/types/property'

/** Site inventory channels — maps to Supabase `category` + listing pages */
export type PropertyCategory = 'plot' | 'highrise' | 'commercial'

export const PROPERTY_CATEGORIES: {
  id: PropertyCategory
  label: string
  navLabel: string
  href: string
  types: Property['type'][]
  heroTitle: string
  heroSubtitle: string
  breadcrumb: string
  heroImage: string
}[] = [
  {
    id: 'plot',
    label: 'Residential Plots',
    navLabel: 'Plots',
    href: '/properties',
    types: ['Plot'],
    heroTitle: 'Residential Plots',
    heroSubtitle:
      'Authority-approved villa plots and land opportunities across Yamuna Expressway, Greater Noida, and Vrindavan.',
    breadcrumb: 'Plots',
    heroImage: '/images/hero/hero-plots.jpg',
  },
  {
    id: 'highrise',
    label: 'Highrise Residences',
    navLabel: 'Highrise',
    href: '/highrise',
    types: ['Flat / Apartment', 'Independent House'],
    heroTitle: 'Highrise Residences',
    heroSubtitle:
      'Premium apartments and residences in Greater Noida and the Yamuna Expressway corridor.',
    breadcrumb: 'Highrise',
    heroImage: '/images/hero/hero-projects.jpg',
  },
  {
    id: 'commercial',
    label: 'Commercial Properties',
    navLabel: 'Commercial',
    href: '/commercial',
    types: ['Commercial'],
    heroTitle: 'Commercial Properties',
    heroSubtitle:
      'IT suites, retail, and investment-grade commercial inventory across Noida and Greater Noida.',
    breadcrumb: 'Commercial',
    heroImage: '/images/hero/hero-services.jpg',
  },
]

export function categoryFromType(type: string | undefined | null): PropertyCategory {
  if (type === 'Commercial') return 'commercial'
  if (type === 'Flat / Apartment' || type === 'Independent House') return 'highrise'
  return 'plot'
}

export function typesForCategory(category: PropertyCategory): Property['type'][] {
  return PROPERTY_CATEGORIES.find((c) => c.id === category)?.types || ['Plot']
}

export function categoryMeta(category: PropertyCategory) {
  return PROPERTY_CATEGORIES.find((c) => c.id === category)!
}

export function filterByCategory<T extends { type: string }>(
  items: T[],
  category: PropertyCategory
): T[] {
  const types = new Set(typesForCategory(category) as string[])
  return items.filter((item) => types.has(item.type))
}
