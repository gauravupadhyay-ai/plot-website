import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import type { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { PageHero } from '@/components/layout/PageHero'
import { PropertiesClient } from './PropertiesClient'
import { getCategoryListings } from '@/lib/listingPayload'
import { categoryMeta } from '@/lib/propertyCategories'
import { SITE_NAME } from '@/lib/utils'

const Footer = dynamic(
  () => import('@/components/layout/Footer').then((m) => m.Footer),
  { ssr: true }
)

const meta = categoryMeta('plot')

export const revalidate = 300

export const metadata: Metadata = {
  title: `Residential Plots in NCR | ${SITE_NAME}`,
  description: meta.heroSubtitle,
}

export default async function PropertiesPage() {
  const initialPlots = await getCategoryListings('plot')

  return (
    <main id="main-content" className="min-h-screen bg-brand-light">
      <Header />
      <PageHero
        title={meta.heroTitle}
        subtitle={meta.heroSubtitle}
        image={meta.heroImage}
        breadcrumb={[{ label: meta.breadcrumb }]}
        imageClassName="object-cover object-[center_80%] md:object-[center_85%]"
      />
      <Suspense
        fallback={
          <div className="flex min-h-[40vh] items-center justify-center">
            <p className="text-sm font-semibold text-text-secondary">Loading listings…</p>
          </div>
        }
      >
        <PropertiesClient initialPlots={initialPlots} category="plot" />
      </Suspense>
      <Footer />
    </main>
  )
}
