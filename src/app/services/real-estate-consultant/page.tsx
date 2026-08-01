import type { Metadata } from 'next'
import Image from 'next/image'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { PageHero } from '@/components/layout/PageHero'
import { CTABanner } from '@/components/home/CTABanner'
import { Briefcase, TrendingUp, HelpCircle, FileText, CheckCircle2, Phone, MessageCircle } from 'lucide-react'
import { getWhatsAppUrl, getCallUrl, SITE_NAME } from '@/lib/utils'

export const metadata: Metadata = {
  title: `Plot Consulting | ${SITE_NAME} Vadodara`,
  description: `Unbiased plot consulting in Vadodara for investments, selling, and locality insights from ${SITE_NAME}.`,
}

export default function ConsultingPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <Header />
      <PageHero
        title="Plot Consulting"
        subtitle="Unbiased advice for buying, selling, and investing in plots"
        image="/images/hero/hero-consultant.jpg"
        breadcrumb={[
          { label: 'Services', href: '/services' },
          { label: 'Plot Consulting' },
        ]}
        imageClassName="object-cover object-[center_90%] md:object-[center_80%]"
      />

      <section className="py-16 md:py-24 bg-white">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <p className="section-eyebrow">Our Service</p>
              <h2 className="section-title text-3xl md:text-4xl mb-6 font-display">
                Expert Plot Advice You Can Trust
              </h2>
              <div className="text-text-secondary text-lg leading-relaxed space-y-4 mb-8 font-sans">
                <p>
                  Choosing the right plot requires more than capital — it needs clear local
                  knowledge. With changing infrastructure and shifting area demand in Vadodara,
                  the wrong land decision can be costly.
                </p>
                <p>
                  {SITE_NAME} consulting is designed for investors, sellers, and NRIs who need
                  trusted guidance on the ground. We share practical insights on localities,
                  pricing trends, and documentation so your plot decisions are secure.
                </p>
              </div>
              <div className="space-y-3 mb-8">
                {[
                  'Unbiased Locality Insights',
                  'NRI Plot Investment Guidance',
                  'Plot Valuation Support',
                  'Legal Document Advisory',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 font-medium text-text-primary font-sans">
                    <CheckCircle2 size={20} className="text-brand-primary flex-shrink-0" /> {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3]">
              <Image
                src="/images/gallery-images/13.jpg"
                alt="Plot consulting"
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
          <h2 className="section-title text-3xl text-center mb-12 font-display">Who We Help</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                icon: TrendingUp,
                title: 'Investors',
                desc: 'Identify high-growth corridors and evaluate plot ROI across Vadodara localities.',
              },
              {
                icon: Briefcase,
                title: 'Plot Sellers',
                desc: 'Get realistic valuations and clear guidance to sell your plot faster.',
              },
              {
                icon: HelpCircle,
                title: 'First-time Buyers',
                desc: 'Navigate titles, approvals, hidden costs, and future area development safely.',
              },
              {
                icon: FileText,
                title: 'NRIs & Remote Buyers',
                desc: 'Manage Vadodara plot investments remotely with complete peace of mind.',
              },
            ].map((div) => (
              <div key={div.title} className="card-static p-6 !rounded-2xl">
                <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center mb-4">
                  <div.icon size={20} className="text-brand-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-text-primary font-display">{div.title}</h3>
                <p className="text-text-secondary text-sm font-sans">{div.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white text-center">
        <div className="section-container max-w-3xl mx-auto">
          <h2 className="font-display font-bold text-3xl mb-6">Need expert plot advice?</h2>
          <p className="text-text-secondary mb-8 font-sans">
            Book a free consulting session with our Vadodara plot specialists.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={getCallUrl()} className="btn-charcoal">
              <Phone size={18} /> Schedule Call
            </a>
            <a
              href={getWhatsAppUrl(
                `Hi! I'd like to book a plot consulting session with ${SITE_NAME} regarding Vadodara.`
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
