import dynamic from 'next/dynamic'
import { HeroSection } from '@/components/home/HeroSection'
import { StatsBar } from '@/components/home/StatsBar'
import { FeaturedProperties } from '@/components/home/FeaturedProperties'
import { CTABanner } from '@/components/home/CTABanner'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

const TestimonialsCarousel = dynamic(
  () => import('@/components/home/TestimonialsCarousel').then((m) => m.TestimonialsCarousel)
)
const LocalitiesGrid = dynamic(
  () => import('@/components/home/LocalitiesGrid').then((m) => m.LocalitiesGrid)
)
const WhyChooseUs = dynamic(
  () => import('@/components/home/WhyChooseUs').then((m) => m.WhyChooseUs)
)
const HowItWorks = dynamic(
  () => import('@/components/home/HowItWorks').then((m) => m.HowItWorks)
)
const ServicesStrip = dynamic(
  () => import('@/components/home/ServicesStrip').then((m) => m.ServicesStrip)
)
const ProjectsTeaser = dynamic(
  () => import('@/components/home/ProjectsTeaser').then((m) => m.ProjectsTeaser)
)
const CredentialsSection = dynamic(
  () => import('@/components/home/CredentialsSection').then((m) => m.CredentialsSection)
)
const ToolsStrip = dynamic(
  () => import('@/components/home/ToolsStrip').then((m) => m.ToolsStrip)
)

export default function HomePage() {
  return (
    <main id="main-content" className="min-h-screen">
      {/* Preload LCP hero — skips /_next/image hop for above-the-fold paint */}
      <link
        rel="preload"
        as="image"
        href="/images/hero/home-hero-bg.jpg"
        fetchPriority="high"
      />
      <Header />

      <HeroSection />
      <StatsBar />

      {/* Inventory first, then social proof — strongest trust sequence */}
      <FeaturedProperties />
      <TestimonialsCarousel />

      <LocalitiesGrid />
      <WhyChooseUs />
      <HowItWorks />
      <ServicesStrip />
      <ProjectsTeaser />
      <CredentialsSection />
      <ToolsStrip />
      <CTABanner />

      <Footer />
    </main>
  )
}
