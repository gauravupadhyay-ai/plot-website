'use client'

import { useState } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { PageHero } from '@/components/layout/PageHero'
import { testimonials } from '@/data/testimonials'
import { ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'
import { SITE_NAME } from '@/lib/utils'
import { GoogleReviewCard, GoogleReviewsHeader } from '@/components/ui/GoogleReviewCard'

export default function TestimonialsPage() {
  const [filter, setFilter] = useState<string>('All')
  const filtered = filter === 'All' ? testimonials : testimonials.filter((t) => t.type === filter)

  return (
    <main id="main-content" className="min-h-screen">
      <Header />
      <PageHero
        title="Client Reviews"
        subtitle={`Families and investors who trusted ${SITE_NAME} with their plot decisions.`}
        image="/images/hero/hero-testimonials.jpg"
        breadcrumb={[{ label: 'Testimonials' }]}
        imageClassName="object-[center_85%] md:object-[center_75%]"
      />

      <section className="bg-[#f8f9fa] py-14 md:py-20">
        <div className="section-container">
          <GoogleReviewsHeader title="Google reviews from plot buyers" score="4.9" />

          <div className="mb-8 flex flex-wrap gap-2">
            {['All', 'Buyer', 'Seller', 'Investor'].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  filter === tab
                    ? 'bg-[#1a73e8] text-white'
                    : 'border border-[#dadce0] bg-white text-[#3c4043] hover:bg-[#f1f3f4]'
                }`}
              >
                {tab === 'All' ? 'All reviews' : `${tab}s`}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5">
            {filtered.map((review, i) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.04, 0.24) }}
              >
                <GoogleReviewCard
                  name={review.name}
                  quote={review.quote}
                  rating={review.rating}
                  meta={review.type}
                />
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a
              href="https://g.page/r/gauravplots/review"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#1a73e8] px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#1765cc]"
            >
              <ExternalLink size={16} />
              Share your experience on Google
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
