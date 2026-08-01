import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { PlotDetailView } from '@/components/property/PlotDetailView'
import { getPropertyBySlug, getProperties } from '@/data/properties'
import { SITE_NAME } from '@/lib/utils'

export async function generateStaticParams() {
  const properties = await getProperties()
  return properties.map((p) => ({ slug: p.slug }))
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
    } in ${property.location}. Verified plot listing by ${SITE_NAME} Vadodara.`,
  }
}

export default async function PropertyDetailPage({ params }: { params: { slug: string } }) {
  const property = await getPropertyBySlug(params.slug)
  if (!property) notFound()

  const all = await getProperties()
  const similar = all
    .filter((p) => p.code !== property.code)
    .sort((a, b) => {
      if (a.locality === property.locality && b.locality !== property.locality) return -1
      if (b.locality === property.locality && a.locality !== property.locality) return 1
      return 0
    })
    .slice(0, 4)

  const lcpImage = property.images?.[0] || '/images/hero/hero-plots.jpg'

  return (
    <main id="main-content" className="min-h-screen">
      {lcpImage.startsWith('/') && (
        <link rel="preload" as="image" href={lcpImage} fetchPriority="high" />
      )}
      <Header />
      <PlotDetailView property={property} similar={similar} />
      <Footer />
    </main>
  )
}
