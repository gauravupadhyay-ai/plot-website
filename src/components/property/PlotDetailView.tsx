'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowLeft, ArrowRight, CheckCircle2, MapPin,
  MessageCircle, Phone, ShieldCheck, Star,
} from 'lucide-react'
import { Property } from '@/types/property'
import { getCallUrl, getWhatsAppUrl, PHONE_NUMBER, SITE_NAME } from '@/lib/utils'
import { GoogleReviewCard, GoogleMark, GoogleStars } from '@/components/ui/GoogleReviewCard'

export function PlotDetailView({
  property,
  similar,
}: {
  property: Property
  similar: Property[]
}) {
  const images = property.images?.length ? property.images : ['/images/hero/hero-plots.jpg']
  const [active, setActive] = useState(0)
  const pricePer = property.pricePerUnit || `₹${Math.round(property.price / Math.max(property.area, 1)).toLocaleString('en-IN')} / ${property.areaUnit}`

  const whatsappMsg = `Hi! I'm interested in the plot ${property.title} (${property.code}) priced at ${property.priceLabel}. Please share more details via ${SITE_NAME}.`

  const specs = useMemo(
    () => [
      { label: 'Plot Area', value: `${property.area} ${property.areaUnit}` },
      { label: 'Facing', value: property.facing || 'N/A' },
      { label: 'Ownership', value: property.ownership || 'Freehold' },
      { label: 'Status', value: property.status || 'Available' },
    ],
    [property]
  )

  const next = () => setActive((i) => (i + 1) % images.length)
  const prev = () => setActive((i) => (i - 1 + images.length) % images.length)

  return (
    <div className="bg-brand-light px-4 pb-16 pt-24 sm:px-6 lg:px-8 lg:pt-28">
      <div className="mx-auto max-w-[90rem]">
        <nav className="mb-5 flex flex-wrap items-center gap-2 text-sm text-text-muted">
          <Link href="/" className="hover:text-text-primary">Home</Link>
          <span>›</span>
          <Link href="/properties" className="hover:text-text-primary">Plots</Link>
          <span>›</span>
          <span className="text-text-secondary">Residential Plot</span>
          <span>›</span>
          <span className="font-medium text-text-primary">{property.title}</span>
        </nav>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.4fr_0.9fr]">
          {/* Left */}
          <div className="space-y-8">
            <div>
              <div className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-white shadow-card">
                <Image
                  src={images[active]}
                  alt={property.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  quality={75}
                  className="object-cover"
                  priority={active === 0}
                  fetchPriority={active === 0 ? 'high' : 'auto'}
                />
                <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                  {property.featured && (
                    <span className="rounded-full bg-brand-primary px-3 py-1 text-xs font-bold text-white">★ Featured</span>
                  )}
                  {property.status && (
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-text-primary">{property.status}</span>
                  )}
                </div>
                <div className="absolute bottom-4 left-4 rounded-full bg-emerald-600 px-3 py-1 text-xs font-bold text-white">
                  Verified Listing
                </div>
                <div className="absolute bottom-4 right-4 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-white">
                  {active + 1}/{images.length}
                </div>
                {images.length > 1 && (
                  <>
                    <button type="button" onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white p-2 shadow-card" aria-label="Previous">
                      <ArrowLeft size={18} />
                    </button>
                    <button type="button" onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white p-2 shadow-card" aria-label="Next">
                      <ArrowRight size={18} />
                    </button>
                  </>
                )}
              </div>

              <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                {images.slice(0, 6).map((src, i) => (
                  <button
                    key={`${src}-${i}`}
                    type="button"
                    onClick={() => setActive(i)}
                    className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-xl border-2 sm:h-20 sm:w-28 ${
                      active === i ? 'border-brand-primary' : 'border-transparent'
                    }`}
                  >
                    <Image src={src} alt="" fill sizes="112px" quality={60} className="object-cover" />
                    {i === 5 && images.length > 6 && (
                      <span className="absolute inset-0 flex items-center justify-center bg-black/55 text-xs font-bold text-white">
                        +{images.length - 5} Photos
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {property.highlights?.length > 0 && (
              <section>
                <h2 className="mb-4 font-display text-2xl font-bold">Key Highlights</h2>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {property.highlights.slice(0, 6).map((h) => (
                    <div key={h} className="rounded-2xl border border-border bg-white p-4 text-sm font-semibold text-text-primary shadow-card">
                      <CheckCircle2 size={16} className="mb-2 text-emerald-600" />
                      {h}
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="rounded-3xl border border-border bg-white p-6 shadow-card">
                <h2 className="mb-3 font-display text-2xl font-bold">Description</h2>
                <p className="text-[15px] leading-relaxed text-text-secondary">{property.description}</p>
                {property.amenities && property.amenities.length > 0 && (
                  <ul className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {property.amenities.map((a) => (
                      <li key={a} className="flex items-center gap-2 text-sm text-text-primary">
                        <CheckCircle2 size={16} className="text-emerald-600" />
                        {a}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="rounded-3xl border border-border bg-brand-muted/60 p-6">
                <h3 className="mb-4 font-display text-xl font-bold">Nearby Amenities</h3>
                <ul className="space-y-3">
                  {(property.nearbyPlaces || []).map((place) => (
                    <li key={place.name} className="flex items-center justify-between text-sm">
                      <span className="font-medium text-text-primary">{place.name}</span>
                      <span className="text-text-muted">{place.distance}</span>
                    </li>
                  ))}
                  {!property.nearbyPlaces?.length && (
                    <li className="text-sm text-text-secondary">Ask us for a locality briefing on WhatsApp.</li>
                  )}
                </ul>
              </div>
            </section>

            {(property.reviews?.length || 0) > 0 && (
              <section className="rounded-3xl border border-[#e8eaed] bg-[#f8f9fa] p-5 sm:p-6">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <GoogleMark />
                    <h2 className="font-display text-xl font-bold text-[#202124] sm:text-2xl">Google reviews</h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-[#202124]">
                      {property.ratingAvg?.toFixed(1) || '4.5'}
                    </span>
                    <GoogleStars rating={Math.round(property.ratingAvg || 5)} />
                    <span className="text-xs text-[#70757a]">
                      ({property.ratingCount || property.reviews?.length})
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {property.reviews!.map((review) => (
                    <GoogleReviewCard
                      key={review.id}
                      name={review.author}
                      quote={review.comment}
                      rating={Math.round(review.rating)}
                      timeLabel={review.date ? new Date(review.date).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }) : 'Recently'}
                    />
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right sidebar */}
          <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-3xl border border-border bg-white p-6 shadow-card">
              <span className="rounded-full bg-brand-light px-3 py-1 text-xs font-bold uppercase tracking-wider text-text-secondary">
                Residential Plot
              </span>
              <h1 className="mt-3 font-display text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
                {property.title}
              </h1>
              <div className="mt-3 flex flex-wrap items-end gap-3">
                <p className="font-display text-3xl font-bold">{property.priceLabel}</p>
                <p className="pb-1 text-sm text-text-secondary">{pricePer}</p>
              </div>
              <Link href="/tools/emi-calculator" className="mt-2 inline-block text-sm font-semibold text-text-primary underline-offset-2 hover:underline">
                EMI Calculator
              </Link>

              <div className="mt-5 grid grid-cols-2 gap-3">
                {specs.map((s) => (
                  <div key={s.label} className="rounded-2xl bg-brand-light p-3">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-text-muted">{s.label}</p>
                    <p className="mt-1 text-sm font-semibold text-text-primary">{s.value}</p>
                  </div>
                ))}
              </div>

              <a
                href={getWhatsAppUrl(whatsappMsg)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-5 w-full justify-center !rounded-2xl"
              >
                Book a Site Visit <ArrowRight size={16} />
              </a>
              <a href={getCallUrl()} className="btn-secondary mt-3 w-full justify-center !rounded-2xl">
                <Phone size={16} /> Get Callback
              </a>
            </div>

            <div className="rounded-3xl border border-border bg-white p-5 shadow-card">
              <div className="flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-primary text-lg font-bold text-white">
                  A
                </div>
                <div>
                  <p className="font-semibold text-text-primary">Aurixrealty Advisor</p>
                  <p className="text-xs text-text-secondary">Plot Consultant · Vadodara</p>
                  <p className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" /> Online
                  </p>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-1 text-sm font-semibold">
                <Star size={14} className="fill-amber-400 text-amber-400" />
                {property.ratingAvg?.toFixed(1) || '4.8'}
                <span className="text-text-muted">({property.ratingCount || 120}+ Reviews)</span>
              </div>
              <a
                href={getWhatsAppUrl(whatsappMsg)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-text-primary"
              >
                <MessageCircle size={16} /> Chat on WhatsApp · {PHONE_NUMBER}
              </a>
            </div>

            <div className="rounded-3xl border border-border bg-white p-5 shadow-card">
              <h3 className="font-display text-lg font-bold">Location</h3>
              <p className="mt-2 flex items-start gap-2 text-sm text-text-secondary">
                <MapPin size={16} className="mt-0.5 shrink-0" />
                {property.location}
              </p>
              <div className="relative mt-4 h-36 overflow-hidden rounded-2xl bg-[linear-gradient(135deg,#e8eaed,#f3f4f6)]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded-full bg-brand-primary px-3 py-1.5 text-xs font-bold text-white shadow-cta">
                    Exact location after enquiry
                  </div>
                </div>
              </div>
              <p className="mt-3 inline-flex items-center gap-2 text-xs text-text-muted">
                <ShieldCheck size={14} /> Verified listing by {SITE_NAME}
              </p>
            </div>
          </aside>
        </div>

        {similar.length > 0 && (
          <section className="mt-12">
            <h2 className="mb-5 font-display text-2xl font-bold">Similar Plots</h2>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {similar.map((p) => (
                <Link
                  key={p.code}
                  href={`/properties/${p.slug}`}
                  className="w-[260px] shrink-0 overflow-hidden rounded-3xl border border-border bg-white shadow-card"
                >
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={p.images[0] || '/images/hero/hero-plots.jpg'}
                      alt={p.title}
                      fill
                      sizes="260px"
                      quality={70}
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <p className="line-clamp-1 font-semibold text-text-primary">{p.title}</p>
                    <p className="mt-1 font-display text-lg font-bold">{p.priceLabel}</p>
                    <p className="mt-1 text-xs text-text-secondary">
                      {p.area} {p.areaUnit}
                      {p.facing ? ` · ${p.facing}` : ''}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
