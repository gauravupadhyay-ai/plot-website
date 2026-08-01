import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { PageHero } from '@/components/layout/PageHero'
import { PostPropertyClient } from './PostPropertyClient'

export default function PostPropertyPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <Header />
      <PageHero
        title="List Your Plot"
        subtitle="Reach genuine plot buyers across Vadodara"
        image="/images/hero/hero-list-plot.jpg"
        breadcrumb={[{ label: 'List Your Plot' }]}
      />
      <PostPropertyClient />
      <Footer />
    </main>
  )
}