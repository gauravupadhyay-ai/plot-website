import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { PageHero } from '@/components/layout/PageHero'
import { PostPropertyClient } from './PostPropertyClient'

export default function PostPropertyPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <Header />
      <PageHero
        title="List Your Property"
        subtitle="Reach genuine buyers across Greater Noida, Noida, Yamuna Expressway & Vrindavan"
        image="/images/hero/hero-list-plot.jpg"
        breadcrumb={[{ label: 'List Your Property' }]}
      />
      <PostPropertyClient />
      <Footer />
    </main>
  )
}