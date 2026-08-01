import type { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { PageHero } from '@/components/layout/PageHero'
import { MapPin, Maximize, CheckCircle2, Phone, MessageCircle, Car, Shield, Zap, Trees, Users, Compass } from 'lucide-react'
import { getWhatsAppUrl, getCallUrl, SITE_NAME } from '@/lib/utils'

export const metadata: Metadata = {
  title: `Sarthak Enclave | Plot Project in Subhanpura, Vadodara | ${SITE_NAME}`,
  description: `Discover Sarthak Enclave with ${SITE_NAME} — a residential plot project opportunity in Subhanpura, Vadodara. Location advantages, amenities, and enquiry support.`,
}

const amenities = [
  { icon: Compass, label: 'Clear Access' },
  { icon: Car, label: 'Road Connectivity' },
  { icon: Shield, label: 'Secure Area' },
  { icon: Zap, label: 'Utility Access' },
  { icon: Trees, label: 'Green Surroundings' },
  { icon: Users, label: 'Residential Neighbourhood' },
]

export default function SarthakEnclavePage() {
  return (
    <main id="main-content" className="min-h-screen">
      <Header />

      <PageHero
        title="Sarthak Enclave"
        subtitle={`Subhanpura, Vadodara · Presented by ${SITE_NAME}`}
        image="/images/hero/hero-projects.jpg"
        breadcrumb={[
          { label: 'Projects', href: '/projects' },
          { label: 'Sarthak Enclave' },
        ]}
      />

      <section className="py-16 md:py-24 bg-white">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <p className="section-eyebrow">Overview</p>
            <h2 className="section-title text-3xl md:text-4xl mb-6 font-display">Project Overview</h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-8 font-sans">
              Sarthak Enclave is a residential project opportunity in Subhanpura, a well-connected
              Vadodara neighbourhood. {SITE_NAME} helps buyers explore availability, locality
              advantages, and documentation clarity — whether you are looking to invest in land or
              plan a future home.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['Prime Location', 'Plot Focus', 'Clear Documentation', 'Loan Support'].map((item) => (
                <div key={item} className="flex items-center gap-2 p-3 bg-brand-light rounded-xl">
                  <CheckCircle2 size={16} className="text-brand-primary flex-shrink-0" />
                  <span className="text-sm font-medium text-text-primary font-sans">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-brand-light">
        <div className="section-container">
          <h2 className="section-title text-3xl text-center mb-12 font-display">Plot Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {['Compact Residential Plots', 'Larger Family Plots'].map((config) => (
              <div key={config} className="card-static p-8 !rounded-2xl text-center">
                <div className="w-16 h-16 rounded-2xl bg-brand-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Maximize size={28} className="text-brand-primary" />
                </div>
                <h3 className="font-display font-bold text-lg mb-2">{config}</h3>
                <p className="text-text-secondary text-sm font-sans">
                  Sizes and availability on request
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="section-container">
          <h2 className="section-title text-3xl text-center mb-12 font-display">Local Advantages</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
            {amenities.map((amenity) => (
              <div
                key={amenity.label}
                className="p-6 bg-brand-light rounded-2xl text-center hover:bg-brand-primary/5 transition-colors"
              >
                <amenity.icon size={28} className="text-brand-primary mx-auto mb-3" />
                <span className="text-sm font-medium text-text-primary font-sans">{amenity.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-brand-light">
        <div className="section-container">
          <h2 className="section-title text-3xl text-center mb-12 font-display">Location</h2>
          <div className="rounded-2xl overflow-hidden h-[300px] md:h-[400px] mb-8">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691!2d73.18!3d22.31!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc58e9!2sSubhanpura%2C%20Vadodara!5e0!3m2!1sen!2sin!4v1"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Sarthak Enclave Location"
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { place: 'Vadodara Airport', distance: '12 km' },
              { place: 'Railway Station', distance: '5 km' },
              { place: 'Schools & Colleges', distance: '1-3 km' },
              { place: 'Hospitals', distance: '2-4 km' },
            ].map((d) => (
              <div key={d.place} className="flex items-center gap-2 text-sm text-text-secondary font-sans">
                <MapPin size={14} className="text-brand-primary flex-shrink-0" />
                <span>
                  {d.place}: {d.distance}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 charcoal-gradient">
        <div className="section-container text-center">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">
            Interested in Sarthak Enclave?
          </h2>
          <p className="text-white/60 mb-8 font-sans">
            Register your interest or contact {SITE_NAME} for availability and pricing
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={getCallUrl()} className="btn-white">
              <Phone size={18} /> Call Now
            </a>
            <a
              href={getWhatsAppUrl(
                `Hi! I'm interested in Sarthak Enclave plots in Subhanpura via ${SITE_NAME}. Please share availability and pricing.`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <MessageCircle size={18} /> WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
