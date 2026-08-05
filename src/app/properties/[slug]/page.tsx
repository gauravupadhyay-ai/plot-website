import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { Header } from '@/components/layout/Header'
import { PlotDetailView } from '@/components/property/PlotDetailView'
import { getPropertyBySlug } from '@/data/properties'
import { seedPlots } from '@/data/seedPlots'
import { SITE_NAME } from '@/lib/utils'

const Footer = dynamic(
  () => import('@/components/layout/Footer').then((m) => m.Footer),
  { ssr: true }
)

export const revalidate = 300

export function generateStaticParams() {
  return seedPlots.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const property = await getPropertyBySlug(params.slug)
  if (!property) return {}
  return {
    title: `${property.title} for Sale in ${property.locality} | ${SITE_NAME}`,
    description: `${property.title} — ${property.priceLabel}. ${property.area} ${property.areaUnit}${
      property.facing ? `, ${property.facing} facing` : ''
    } in ${property.location}. Verified plot listing by ${SITE_NAME}.`,
  }
}

export default async function PropertyDetailPage({ params }: { params: { slug: string } }) {
  const property = await getPropertyBySlug(params.slug)
  if (!property) notFound()

  // Similar from seed only — avoids a second full Supabase round-trip
  const similar = seedPlots
    .filter((p) => p.code !== property.code)
    .sort((a, b) => {
      if (a.locality === property.locality && b.locality !== property.locality) return -1
      if (b.locality === property.locality && a.locality !== property.locality) return 1
      return 0
    })
    .slice(0, 3)
    .map((p) => ({
      ...p,
      images: p.images.slice(0, 1),
      videos: [] as string[],
      description: '',
      highlights: [],
      reviews: undefined,
      documents: undefined,
    }))

  return (
    <main id="main-content" className="min-h-screen">
      <Header />
      <PlotDetailView property={property} similar={similar} />
      <Footer />
    </main>
  )
}
