import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { PageHero } from '@/components/layout/PageHero'
import { CTABanner } from '@/components/home/CTABanner'
import { ArrowRight, Map, Briefcase, Landmark } from 'lucide-react'
import { SITE_NAME } from '@/lib/utils'

export const metadata: Metadata = {
  title: `Our Services | ${SITE_NAME} Vadodara`,
  description: `Explore ${SITE_NAME}'s plot services: buying residential plots, plot consulting, and plot/construction loan guidance in Vadodara.`,
}

const services = [
  {
    icon: Map,
    title: 'Buying Plots',
    description:
      'Expert guidance to find the right residential plot within your budget. We handle shortlisting, site visits, documentation, and registration for a clear buying journey.',
    href: '/services/buying-property',
    highlights: ['Verified plot listings', 'Title & legal support', 'Locality guidance'],
    image: '/images/gallery-images/12.jpg',
  },
  {
    icon: Briefcase,
    title: 'Plot Consulting',
    description:
      'Unbiased advice for buying, selling, and investing in plots. Our deep knowledge of Vadodara land markets helps you choose locations with long-term value.',
    href: '/services/real-estate-consultant',
    highlights: ['Market analysis', 'Investment advisory', 'NRI plot consulting'],
    image: '/images/gallery-images/13.jpg',
  },
  {
    icon: Landmark,
    title: 'Plot & Construction Loans',
    description:
      'Hassle-free loan support for plot purchase and home construction. We compare offers across banking partners and help with paperwork for faster approvals.',
    href: '/services/home-loan',
    highlights: ['10+ banking partners', 'Plot loan guidance', 'Construction loan support'],
    image: '/images/gallery-images/14.jpg',
  },
]

export default function ServicesPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <Header />

      <PageHero
        title="Our Services"
        subtitle="End-to-end plot services tailored for Vadodara buyers and investors"
        image="/images/hero/hero-services.jpg"
        breadcrumb={[{ label: 'Services' }]}
        imageClassName="object-[center_92%] md:object-[center_82%]"
      />

      <section className="py-16 md:py-24 bg-brand-light">
        <div className="section-container">
          <div className="space-y-8">
            {services.map((service, i) => (
              <div key={service.title} className="card-static !rounded-2xl overflow-hidden">
                <div
                  className={`grid grid-cols-1 lg:grid-cols-2 ${i % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}
                >
                  <div
                    className={`p-8 lg:p-12 flex flex-col justify-center ${i % 2 === 1 ? 'lg:col-start-2' : ''}`}
                  >
                    <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 flex items-center justify-center mb-6">
                      <service.icon size={28} className="text-brand-primary" />
                    </div>
                    <h2 className="font-display font-bold text-2xl md:text-3xl text-text-primary mb-4">
                      {service.title}
                    </h2>
                    <p className="text-text-secondary leading-relaxed mb-6 font-sans">
                      {service.description}
                    </p>
                    <ul className="space-y-2 mb-8">
                      {service.highlights.map((h) => (
                        <li
                          key={h}
                          className="flex items-center gap-2 text-text-primary text-sm font-medium font-sans"
                        >
                          <span className="w-2 h-2 rounded-full bg-brand-primary" />
                          {h}
                        </li>
                      ))}
                    </ul>
                    <Link href={service.href} className="btn-primary w-fit">
                      Learn More <ArrowRight size={16} />
                    </Link>
                  </div>
                  <div className={`relative min-h-[18rem] h-72 lg:h-auto lg:min-h-full ${i % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      quality={75}
                      className="object-cover object-center"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
      <Footer />
    </main>
  )
}
