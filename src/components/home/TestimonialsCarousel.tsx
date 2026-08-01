'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { testimonials } from '@/data/testimonials'
import { GoogleReviewCard, GoogleReviewsHeader } from '@/components/ui/GoogleReviewCard'

export function TestimonialsCarousel() {
  const cards = testimonials.slice(0, 6)

  return (
    <section className="bg-[#f8f9fa] py-16 md:py-24">
      <div className="section-container">
        <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <GoogleReviewsHeader />
          <Link
            href="/testimonials"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-[#dadce0] bg-white px-5 py-2.5 text-sm font-semibold text-[#1a73e8] shadow-sm hover:bg-white"
          >
            See all reviews <ArrowRight size={16} />
          </Link>
        </div>

        {/* Same Google cards on mobile + desktop */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5">
          {cards.map((t) => (
            <GoogleReviewCard
              key={t.id}
              name={t.name}
              quote={t.quote}
              rating={t.rating}
              meta={t.type}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
