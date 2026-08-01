import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { PageHero } from '@/components/layout/PageHero'
import { SITE_NAME } from '@/lib/utils'
import { TestimonialsClient } from './TestimonialsClient'

export default function TestimonialsPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <Header />
      <PageHero
        title="Client Reviews"
        subtitle={`Families and investors who trusted ${SITE_NAME} with their plot decisions.`}
        image="/images/hero/hero-testimonials.jpg"
        breadcrumb={[{ label: 'Testimonials' }]}
        imageClassName="object-cover object-[center_85%] md:object-[center_75%]"
      />
      <TestimonialsClient />
      <Footer />
    </main>
  )
}
