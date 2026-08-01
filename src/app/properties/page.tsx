import { Suspense } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { PageHero } from '@/components/layout/PageHero'
import { PropertiesClient } from './PropertiesClient'

export default function PropertiesPage() {
  return (
    <main id="main-content" className="min-h-screen bg-brand-light">
      <Header />
      <PageHero
        title="Residential Plots"
        subtitle="Choose from our premium plots and build the home you've always dreamed of."
        image="/images/hero/hero-plots.jpg"
        breadcrumb={[{ label: 'Plots' }]}
        imageClassName="object-cover object-[center_85%] md:object-[center_80%]"
      />
      <Suspense
        fallback={
          <div className="flex min-h-[40vh] items-center justify-center">
            <p className="text-sm font-semibold text-text-secondary">Loading plots…</p>
          </div>
        }
      >
        <PropertiesClient />
      </Suspense>
      <Footer />
    </main>
  )
}
