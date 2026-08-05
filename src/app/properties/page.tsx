import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { Header } from '@/components/layout/Header'
import { PageHero } from '@/components/layout/PageHero'
import { getProperties } from '@/data/properties'
import { seedPlots } from '@/data/seedPlots'
import { PropertiesClient } from './PropertiesClient'

const Footer = dynamic(
  () => import('@/components/layout/Footer').then((m) => m.Footer),
  { ssr: true }
)

export const revalidate = 300

export default async function PropertiesPage() {
  const all = await getProperties()
  const seedCoverByCode = new Map(seedPlots.map((p) => [p.code, p.images[0]]))
  // List view only needs local cover images — shrink payload + avoid slow remote LCP
  const initialPlots = all
    .filter((p) => p.type === 'Plot' || p.type === 'Commercial' || p.type === 'Flat / Apartment')
    .map((p) => {
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
      }
    })

  return (
    <main id="main-content" className="min-h-screen bg-brand-light">
      <Header />
      <PageHero
        title="Residential Plots"
        subtitle="Choose from our premium plots and build the home you've always dreamed of."
        image="/images/hero/hero-plots.jpg"
        breadcrumb={[{ label: 'Plots' }]}
        imageClassName="object-cover object-[center_80%] md:object-[center_85%]"
      />
      <Suspense
        fallback={
          <div className="flex min-h-[40vh] items-center justify-center">
            <p className="text-sm font-semibold text-text-secondary">Loading plots…</p>
          </div>
        }
      >
        <PropertiesClient initialPlots={initialPlots} />
      </Suspense>
      <Footer />
    </main>
  )
}
