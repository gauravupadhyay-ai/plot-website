import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { PageHero } from '@/components/layout/PageHero'
import { EMICalculatorClient } from './EMICalculatorClient'

export default function EMICalculatorPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <Header />
      <PageHero
        title="Plot Loan EMI Calculator"
        subtitle="Plan your plot or construction loan with our free calculator"
        image="/images/hero/hero-loan.jpg"
        breadcrumb={[
          { label: 'Tools', href: '/tools/emi-calculator' },
          { label: 'EMI Calculator' },
        ]}
      />
      <EMICalculatorClient />
      <Footer />
    </main>
  )
}
