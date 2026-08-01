import { Locality } from '@/types/property'

export const localities: Locality[] = [
  {
    slug: 'waghodia-road',
    name: 'Waghodia Road',
    description: 'Strong NH-48 connectivity and growing demand for residential plots. Waghodia Road is a preferred corridor for buyers seeking NA land near employment hubs with improving infrastructure.',
    propertyCount: 2,
    image: '/images/waghodia-road.jpg',
  },
  {
    slug: 'ajwa-road',
    name: 'Ajwa Road',
    description: 'Greener surroundings with planned plot layouts. Ajwa Road suits families looking for residential land with a calmer setting and steady local development.',
    propertyCount: 0,
    image: '/images/ajwa-road.jpg',
  },
  {
    slug: 'jarod',
    name: 'Jarod',
    description: 'Value-focused plots on the State Highway belt. Jarod offers spacious residential land options with practical city access for first-time plot buyers.',
    propertyCount: 1,
    image: '/images/jarod.jpg',
  },
  {
    slug: 'subhanpura',
    name: 'Subhanpura',
    description: 'Established Vadodara locality close to key city amenities. Subhanpura attracts buyers seeking well-located residential plots with strong neighbourhood demand.',
    propertyCount: 0,
    image: '/images/subhanpura.jpg',
  },
]

export function getLocalityBySlug(slug: string): Locality | undefined {
  return localities.find(l => l.slug === slug)
}
