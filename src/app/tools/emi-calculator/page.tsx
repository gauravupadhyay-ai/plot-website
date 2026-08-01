'use client'
import { useState } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { PageHero } from '@/components/layout/PageHero'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function EMICalculatorPage() {
  const [loanAmount, setLoanAmount] = useState(3000000)
  const [interestRate, setInterestRate] = useState(8.5)
  const [tenure, setTenure] = useState(20)

  const r = interestRate / 12 / 100
  const n = tenure * 12
  const emi = r > 0 ? (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1) : loanAmount / n
  const totalPayment = emi * n
  const totalInterest = totalPayment - loanAmount
  const principalPct = (loanAmount / totalPayment) * 100
  const interestPct = (totalInterest / totalPayment) * 100

  const fmt = (amt: number) => {
    if (amt >= 10000000) return `₹${(amt / 10000000).toFixed(2)} Cr`
    if (amt >= 100000) return `₹${(amt / 100000).toFixed(2)} Lac`
    return `₹${Math.round(amt).toLocaleString('en-IN')}`
  }

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

      <section className="py-16 md:py-24 bg-brand-light">
        <div className="section-container max-w-3xl mx-auto">
          <div className="card-static p-6 md:p-10 !rounded-2xl">
            <div className="space-y-8">
              <div>
                <div className="flex justify-between mb-2">
                  <label className="font-semibold text-sm font-sans">Loan Amount</label>
                  <span className="font-mono font-bold text-brand-primary text-lg">
                    {fmt(loanAmount)}
                  </span>
                </div>
                <input
                  type="range"
                  min={500000}
                  max={50000000}
                  step={100000}
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full h-2"
                />
                <div className="flex justify-between text-xs text-text-muted mt-1 font-sans">
                  <span>₹5 Lac</span>
                  <span>₹5 Cr</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="font-semibold text-sm font-sans">Interest Rate</label>
                  <span className="font-mono font-bold text-brand-primary text-lg">
                    {interestRate}%
                  </span>
                </div>
                <input
                  type="range"
                  min={6}
                  max={18}
                  step={0.1}
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full h-2"
                />
                <div className="flex justify-between text-xs text-text-muted mt-1 font-sans">
                  <span>6%</span>
                  <span>18%</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="font-semibold text-sm font-sans">Loan Tenure</label>
                  <span className="font-mono font-bold text-brand-primary text-lg">
                    {tenure} Years
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={30}
                  step={1}
                  value={tenure}
                  onChange={(e) => setTenure(Number(e.target.value))}
                  className="w-full h-2"
                />
                <div className="flex justify-between text-xs text-text-muted mt-1 font-sans">
                  <span>1 Year</span>
                  <span>30 Years</span>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-border">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="text-center p-6 bg-brand-primary/10 rounded-2xl">
                  <div className="text-sm text-text-secondary mb-2 font-sans">Monthly EMI</div>
                  <div className="font-mono font-bold text-3xl text-brand-primary">{fmt(emi)}</div>
                </div>
                <div className="text-center p-6 bg-brand-light rounded-2xl border border-border/50">
                  <div className="text-sm text-text-secondary mb-2 font-sans">Total Interest</div>
                  <div className="font-mono font-bold text-2xl text-text-primary">
                    {fmt(totalInterest)}
                  </div>
                </div>
                <div className="text-center p-6 bg-brand-light rounded-2xl border border-border/50">
                  <div className="text-sm text-text-secondary mb-2 font-sans">Total Payment</div>
                  <div className="font-mono font-bold text-2xl text-text-primary">
                    {fmt(totalPayment)}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-8">
                <div className="w-40 h-40">
                  <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#E2E8F0" strokeWidth="16" />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#0A0A0A"
                      strokeWidth="16"
                      strokeDasharray={`${(principalPct / 100) * 251.2} 251.2`}
                      strokeLinecap="round"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#525252"
                      strokeWidth="16"
                      strokeDasharray={`${(interestPct / 100) * 251.2} 251.2`}
                      strokeDashoffset={`${(-principalPct / 100) * 251.2}`}
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm font-medium font-sans">
                    <span className="w-4 h-4 rounded bg-brand-primary" /> Principal (
                    {principalPct.toFixed(0)}%)
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium font-sans">
                    <span className="w-4 h-4 rounded bg-brand-accent" /> Interest (
                    {interestPct.toFixed(0)}%)
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-8 pt-6 border-t border-border">
              <Link href="/services/home-loan" className="btn-primary">
                Get Plot Loan Assistance <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
