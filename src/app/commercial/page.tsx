import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import type { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { PageHero } from '@/components/layout/PageHero'
import { PropertiesClient } from '@/app/properties/PropertiesClient'
import { getCategoryListings } from '@/lib/listingPayload'
import { categoryMeta } from '@/lib/propertyCategories'
import { SITE_NAME } from '@/lib/utils'

const Footer = dynamic(
  () => import('@/components/layout/Footer').then((m) => m.Footer),
  { ssr: true }
)

const meta = categoryMeta('commercial')

export const revalidate = 300

export const metadata: Metadata = {
  title: `Commercial Properties in Noida & Greater Noida | ${SITE_NAME}`,
  description: meta.heroSubtitle,
}

export default async function CommercialPage() {
  const initialPlots = await getCategoryListings('commercial')

  return (
    <main id="main-content" className="min-h-screen bg-brand-light">
      <Header />
      <PageHero
        title={meta.heroTitle}
        subtitle={meta.heroSubtitle}
        image={meta.heroImage}
        breadcrumb={[{ label: meta.breadcrumb }]}
        imageClassName="object-cover object-[center_70%]"
      />
      <Suspense
        fallback={
          <div className="flex min-h-[40vh] items-center justify-center">
            <p className="text-sm font-semibold text-text-secondary">Loading commercial inventory…</p>
          </div>
        }
      >
        <PropertiesClient initialPlots={initialPlots} category="commercial" />
      </Suspense>
      <Footer />
    </main>
  )
}
