import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { PageHero } from '@/components/layout/PageHero'
import { CTABanner } from '@/components/home/CTABanner'
import { MapPin, ArrowRight, CheckCircle2 } from 'lucide-react'
import { SITE_NAME } from '@/lib/utils'
import { seedPlots } from '@/data/seedPlots'
import { categoryFromType } from '@/lib/propertyCategories'

export const metadata: Metadata = {
  title: `Featured Real Estate Projects | ${SITE_NAME} NCR`,
  description: `Explore residential, highrise, and commercial projects curated by ${SITE_NAME} across Greater Noida, Noida, Yamuna Expressway, and Vrindavan.`,
}

const spotlightCodes = ['AX-NS-001', 'AX-RK-001', 'AX-RP-001', 'AX-LK-001', 'AX-HS-001', 'AX-E7-001', 'AX-GC-001', 'AX-BT-001', 'AX-VV-001', 'AX-UB-001']

export default function ProjectsPage() {
  const projects = spotlightCodes
    .map((code) => seedPlots.find((p) => p.code === code))
    .filter(Boolean) as typeof seedPlots

  return (
    <main id="main-content" className="min-h-screen">
      <Header />
      <PageHero
        title="Our Projects"
        subtitle="Residential, highrise, and commercial opportunities across Greater Noida, Noida, and Vrindavan"
        image="/images/hero/hero-projects.jpg"
        breadcrumb={[{ label: 'Projects' }]}
      />

      <section className="bg-brand-light py-16 md:py-24">
        <div className="section-container">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-wider text-brand-primary">NCR inventory</p>
            <h2 className="mt-2 font-display text-3xl font-bold text-text-primary md:text-4xl">
              Projects we are actively showcasing
            </h2>
            <p className="mt-3 text-text-secondary">
              From villa plots and luxury residences to IT suites — curated for buyers and investors in the NCR.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {projects.map((project) => {
              const category = categoryFromType(project.type)
              const href =
                category === 'highrise'
                  ? '/highrise'
                  : category === 'commercial'
                    ? '/commercial'
                    : '/properties'
              return (
                <article
                  key={project.code}
                  className="card-static overflow-hidden !rounded-2xl"
                >
                  <div className="relative h-56 md:h-64">
                    <Image
                      src={project.images[0] || '/images/hero/hero-projects.jpg'}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      quality={70}
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
                    <div className="absolute bottom-5 left-5 right-5">
                      <span className="badge badge-featured mb-2">{project.type}</span>
                      <h3 className="font-display text-xl font-bold text-white md:text-2xl">
                        {project.title}
                      </h3>
                      <div className="mt-2 flex items-center gap-2 font-sans text-sm text-white/80">
                        <MapPin size={14} /> {project.locality}
                      </div>
                    </div>
                  </div>
                  <div className="p-6 md:p-8">
                    <div className="mb-4 grid grid-cols-2 gap-2">
                      {(project.highlights || []).slice(0, 4).map((item) => (
                        <div
                          key={item}
                          className="flex items-center gap-2 font-sans text-sm text-text-primary"
                        >
                          <CheckCircle2 size={14} className="flex-shrink-0 text-brand-primary" />
                          <span className="line-clamp-1">{item}</span>
                        </div>
                      ))}
                    </div>
                    <p className="mb-6 line-clamp-3 font-sans leading-relaxed text-text-secondary">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <Link href={`/properties/${project.slug}`} className="btn-primary">
                        View listing <ArrowRight size={16} />
                      </Link>
                      <Link href={href} className="btn-secondary">
                        Browse {category === 'plot' ? 'plots' : category}
                      </Link>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <CTABanner />
      <Footer />
    </main>
  )
}
