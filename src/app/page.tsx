import dynamic from 'next/dynamic'
import { HeroSection } from '@/components/home/HeroSection'
import { StatsBar } from '@/components/home/StatsBar'
import { FeaturedProperties } from '@/components/home/FeaturedProperties'
import { CTABanner } from '@/components/home/CTABanner'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { seedPlots } from '@/data/seedPlots'

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
  // Seed covers only — no client fetch / Supabase wait for Featured Plots
  const featuredPlots = seedPlots
    .filter((p) => p.type === 'Plot' || p.type === 'Commercial' || p.type === 'Flat / Apartment')
    .sort((a, b) => Number(b.featured) - Number(a.featured))
    .slice(0, 6)
    .map((p) => ({
      slug: p.slug,
      code: p.code,
      title: p.title,
      type: p.type,
      location: p.location,
      locality: p.locality,
      priceLabel: p.priceLabel,
      priceOnRequest: p.priceOnRequest,
      area: p.area,
      areaUnit: p.areaUnit,
      facing: p.facing,
      badge: p.badge,
      featured: p.featured,
      cover: p.images[0] || '',
    }))

  return (
    <main id="main-content" className="min-h-screen">
      {/* Preload mobile LCP hero (matches Moto G / Slow 4G audits) */}
      <link
        rel="preload"
        as="image"
        href="/images/hero/home-hero-bg-mobile.jpg"
        fetchPriority="high"
      />
      {/* Preload first featured covers so the section paints quickly */}
      {featuredPlots.slice(0, 2).map(
        (p) =>
          p.cover.startsWith('/') && (
            <link key={p.code} rel="preload" as="image" href={p.cover} />
          )
      )}
      <Header />

      <HeroSection />
      <StatsBar />

      {/* Inventory first, then social proof — strongest trust sequence */}
      <FeaturedProperties plots={featuredPlots} />
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
