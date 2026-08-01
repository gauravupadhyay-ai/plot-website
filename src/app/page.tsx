import { HeroSection } from '@/components/home/HeroSection'
import { StatsBar } from '@/components/home/StatsBar'
import { FeaturedProperties } from '@/components/home/FeaturedProperties'
import { TestimonialsCarousel } from '@/components/home/TestimonialsCarousel'
import { LocalitiesGrid } from '@/components/home/LocalitiesGrid'
import { WhyChooseUs } from '@/components/home/WhyChooseUs'
import { HowItWorks } from '@/components/home/HowItWorks'
import { ServicesStrip } from '@/components/home/ServicesStrip'
import { ProjectsTeaser } from '@/components/home/ProjectsTeaser'
import { CredentialsSection } from '@/components/home/CredentialsSection'
import { ToolsStrip } from '@/components/home/ToolsStrip'
import { CTABanner } from '@/components/home/CTABanner'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export default function HomePage() {
  return (
    <main id="main-content" className="min-h-screen">
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
