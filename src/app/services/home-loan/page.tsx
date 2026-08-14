import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { PageHero } from '@/components/layout/PageHero'
import { CTABanner } from '@/components/home/CTABanner'
import { Landmark, FileCheck, IndianRupee, Clock, CheckCircle2, Phone, MessageCircle } from 'lucide-react'
import { getWhatsAppUrl, getCallUrl, getSecondaryCallUrl, SECONDARY_PHONE_NUMBER, SITE_NAME } from '@/lib/utils'

export const metadata: Metadata = {
  title: `Plot & Construction Loans | ${SITE_NAME} NCR`,
  description: `Fast, hassle-free plot and construction loan guidance across Greater Noida, Noida & Yamuna Expressway with ${SITE_NAME}. Banking partners, eligibility checks, and EMI planning.`,
}

export default function HomeLoanPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <Header />
      <PageHero
        title="Plot & Construction Loans"
        subtitle="Fast, hassle-free financing guidance for plot purchase and construction"
        image="/images/hero/hero-loan.jpg"
        breadcrumb={[
          { label: 'Services', href: '/services' },
          { label: 'Plot & Construction Loans' },
        ]}
        imageClassName="object-cover object-[center_88%] md:object-[center_82%]"
      />

      <section className="py-16 md:py-24 bg-white">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <p className="section-eyebrow">Our Service</p>
              <h2 className="section-title text-3xl md:text-4xl mb-6 font-display">
                Financing Made Simple
              </h2>
              <div className="text-text-secondary text-lg leading-relaxed space-y-4 mb-8 font-sans">
                <p>
                  Securing a plot loan or construction loan shouldn&apos;t slow down your plans. We
                  work with leading banks to help you compare options and move forward with clarity.
                </p>
                <p>
                  Our loan assistance team evaluates eligibility, compares offerings across 10+
                  banks, and supports documentation — so you can focus on choosing the right plot,
                  not chasing paperwork.
                </p>
              </div>
              <div className="space-y-3 mb-8">
                {[
                  '10+ Banking Partners',
                  'Plot Loan Guidance',
                  'Construction Loan Support',
                  'Fast Approvals (48-72 hours)',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 font-medium text-text-primary font-sans">
                    <CheckCircle2 size={20} className="text-brand-primary flex-shrink-0" /> {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="relative flex items-center justify-center bg-brand-light rounded-3xl overflow-hidden aspect-[4/3] p-12">
              <div className="text-center space-y-4">
                <Landmark size={64} className="text-brand-primary mx-auto" />
                <h3 className="font-display font-bold text-2xl">Trusted Banking Partners</h3>
                <p className="text-text-secondary font-sans">
                  SBI, HDFC, ICICI, Axis, Bank of Baroda, and more leading institutions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-brand-light">
        <div className="section-container max-w-4xl mx-auto">
          <h2 className="section-title text-3xl text-center mb-12 font-display">
            How We Help You Get Funded
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                icon: FileCheck,
                title: 'Eligibility Check',
                desc: 'We assess your profile to estimate plot or construction loan eligibility.',
              },
              {
                icon: IndianRupee,
                title: 'Rate Comparison',
                desc: 'We compare bank offers so you can choose a practical rate and tenure.',
              },
              {
                icon: Clock,
                title: 'Fast Processing',
                desc: 'Our team helps with paperwork for quicker approvals and fewer delays.',
              },
              {
                icon: Landmark,
                title: 'Disbursement Support',
                desc: 'We coordinate with the bank through final disbursement for your plot plans.',
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

          <div className="mt-12 text-center">
            <Link href="/tools/emi-calculator" className="btn-secondary">
              Try our Plot Loan EMI Calculator
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white text-center">
        <div className="section-container max-w-3xl mx-auto">
          <h2 className="font-display font-bold text-3xl mb-6">Need help with a plot loan?</h2>
          <p className="text-text-secondary mb-8 font-sans">
            Speak to our team today to check eligibility for plot or construction financing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={getCallUrl()} className="btn-charcoal">
              <Phone size={18} /> Call Loan Expert
            </a>
            <a href={getSecondaryCallUrl()} className="btn-charcoal">
              <Phone size={18} /> {SECONDARY_PHONE_NUMBER}
            </a>
            <a
              href={getWhatsAppUrl(
                `Hi! I need assistance with a plot/construction loan in Greater Noida / Noida / Yamuna Expressway via ${SITE_NAME}.`
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
