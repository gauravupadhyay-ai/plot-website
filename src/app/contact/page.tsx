import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { PageHero } from '@/components/layout/PageHero'
import { SITE_NAME } from '@/lib/utils'
import { ContactClient } from './ContactClient'

export default function ContactPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <Header />
      <PageHero
        title="Contact Us"
        subtitle={`Talk to ${SITE_NAME} about plots in Vadodara`}
        image="/images/hero/hero-contact.jpg"
        breadcrumb={[{ label: 'Contact' }]}
      />
      <ContactClient />
      <Footer />
    </main>
  )
}
