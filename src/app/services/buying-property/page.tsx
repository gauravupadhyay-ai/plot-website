import type { Metadata } from 'next'
import Image from 'next/image'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { PageHero } from '@/components/layout/PageHero'
import { CTABanner } from '@/components/home/CTABanner'
import { Search, MapPin, Key, MessageCircle, Phone, CheckCircle2 } from 'lucide-react'
import { getWhatsAppUrl, getCallUrl, SITE_NAME } from '@/lib/utils'

export const metadata: Metadata = {
  title: `Buying Plots | ${SITE_NAME} NCR`,
  description: `Expert guidance to find residential plots across Greater Noida, Noida, Yamuna Expressway & Vrindavan. Verified listings, clear documentation, and end-to-end support from ${SITE_NAME}.`,
}

export default function BuyingPropertyPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <Header />
      <PageHero
        title="Buying Plots"
        subtitle="Expert guidance to find verified residential plots across NCR"
        image="/images/hero/hero-buying.jpg"
        breadcrumb={[
          { label: 'Services', href: '/services' },
          { label: 'Buying Plots' },
        ]}
        imageClassName="object-cover object-[center_90%] md:object-[center_85%]"
      />

      <section className="py-16 md:py-24 bg-white">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <p className="section-eyebrow">Our Service</p>
              <h2 className="section-title text-3xl md:text-4xl mb-6 font-display">
                Find the Right Plot with Confidence
              </h2>
              <div className="text-text-secondary text-lg leading-relaxed space-y-4 mb-8 font-sans">
                <p>
                  Buying a plot is one of the most important investment decisions a family makes.
                  Yet the process is often filled with unclear titles, opaque pricing, and rushed
                  decisions.
                </p>
                <p>
                  At {SITE_NAME}, we take the stress out of plot buying. We understand your budget
                  and locality preferences, shortlist verified plots, negotiate fairly, and support
                  you through documentation until registration is complete.
                </p>
              </div>
              <div className="space-y-3 mb-8">
                {[
                  'Verified Plot Listings',
                  'Clear Title Guidance',
                  'End-to-End Documentation Support',
                  'Zero Hidden Charges',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 font-medium text-text-primary font-sans">
                    <CheckCircle2 size={20} className="text-brand-primary flex-shrink-0" /> {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3]">
              <Image
                src="/images/gallery-images/12.jpg"
                alt={`Buying plots with ${SITE_NAME}`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={75}
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-brand-light">
        <div className="section-container max-w-4xl mx-auto">
          <h2 className="section-title text-3xl text-center mb-12 font-display">The Buying Process</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                icon: MessageCircle,
                title: '1. Consultation',
                desc: 'We understand your budget, preferred localities, and plot size requirements.',
              },
              {
                icon: Search,
                title: '2. Curated Shortlist',
                desc: 'We present a handpicked list of verified plots matching your criteria.',
              },
              {
                icon: MapPin,
                title: '3. Guided Site Visits',
                desc: 'We accompany you to each plot and share honest locality feedback.',
              },
              {
                icon: Key,
                title: '4. Legal & Registration',
                desc: 'We support negotiations, document checks, and registration seamlessly.',
              },
            ].map((step) => (
              <div key={step.title} className="card-static p-6 !rounded-2xl">
                <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center mb-4">
                  <step.icon size={20} className="text-brand-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-text-primary font-display">{step.title}</h3>
                <p className="text-text-secondary text-sm font-sans">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white text-center">
        <div className="section-container max-w-3xl mx-auto">
          <h2 className="font-display font-bold text-3xl mb-6">Ready to find your plot?</h2>
          <p className="text-text-secondary mb-8 font-sans">
            Tell us your budget and preferred localities — we&apos;ll shortlist options for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={getCallUrl()} className="btn-charcoal">
              <Phone size={18} /> Call to Discuss
            </a>
            <a
              href={getWhatsAppUrl(
                `Hello! I want to start my plot search in Greater Noida / Noida / Yamuna Expressway with ${SITE_NAME}.`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
            >
              <MessageCircle size={18} /> WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      <CTABanner />
      <Footer />
    </main>
  )
}
