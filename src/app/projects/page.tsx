import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { PageHero } from '@/components/layout/PageHero'
import { CTABanner } from '@/components/home/CTABanner'
import { MapPin, ArrowRight, CheckCircle2 } from 'lucide-react'
import { SITE_NAME } from '@/lib/utils'

export const metadata: Metadata = {
  title: `Plot Projects by ${SITE_NAME} | Vadodara`,
  description: `Explore residential plot projects curated by ${SITE_NAME} in Vadodara. Premium plot opportunities in sought-after localities.`,
}

export default function ProjectsPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <Header />
      <PageHero
        title="Our Projects"
        subtitle="Featured plot opportunities in Vadodara"
        image="/images/hero/hero-projects.jpg"
        breadcrumb={[{ label: 'Projects' }]}
      />

      <section className="py-16 md:py-24 bg-brand-light">
        <div className="section-container">
          <div className="card-static !rounded-2xl overflow-hidden max-w-4xl mx-auto">
            <div className="relative h-64 md:h-80">
              <Image
                src="/images/gallery-images/10.jpg"
                alt="Sarthak Enclave Plot Project"
                fill
                sizes="(max-width: 896px) 100vw, 896px"
                quality={75}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="badge badge-featured mb-3">Featured Project</span>
                <div className="font-display font-bold text-2xl md:text-3xl text-white">
                  Sarthak Enclave
                </div>
                <div className="flex items-center gap-2 text-white/70 mt-2 font-sans">
                  <MapPin size={14} /> Subhanpura, Vadodara
                </div>
              </div>
            </div>
            <div className="p-8 md:p-12">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                {['Prime Location', 'Plot Opportunities', 'Clear Documentation', 'Loan Support'].map(
                  (item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-text-primary font-sans">
                      <CheckCircle2 size={14} className="text-brand-primary flex-shrink-0" /> {item}
                    </div>
                  )
                )}
              </div>
              <p className="text-text-secondary leading-relaxed mb-8 font-sans">
                A residential project opportunity in one of Vadodara&apos;s well-connected
                neighbourhoods. Sarthak Enclave is presented by {SITE_NAME} for buyers exploring
                plot and project options with clear locality access and practical investment
                potential.
              </p>
              <Link href="/projects/sarthak-enclave" className="btn-primary">
                View Project Details <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTABanner />
      <Footer />
    </main>
  )
}
