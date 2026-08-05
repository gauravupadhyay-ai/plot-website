'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, MapPin, Maximize, MessageCircle, Layers } from 'lucide-react'
import { getProperties } from '@/data/properties'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { getWhatsAppUrl } from '@/lib/utils'
import { Property } from '@/types/property'

export function FeaturedProperties() {
  const [displayProps, setDisplayProps] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const data = await getProperties()
      const plots = data
        .filter((p) => p.type === 'Plot' || p.type === 'Commercial' || p.type === 'Flat / Apartment')
        .sort((a, b) => Number(b.featured) - Number(a.featured))
      setDisplayProps(plots.slice(0, 6))
      setLoading(false)
    }
    load()
  }, [])

  return (
    <section className="py-20 md:py-28 bg-brand-light">
      <div className="section-container">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8">
          <SectionHeading
            eyebrow="Featured Plots"
            title="Handpicked Residential Plots"
            subtitle="Verified NA land and clear-title plots in Vadodara's growing localities"
          />
          <Link href="/properties" className="btn-ghost flex items-center gap-2 shrink-0">
            View All Plots <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {loading && Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="card h-[400px] bg-white/50 animate-pulse rounded-2xl" />
          ))}
          {!loading && displayProps.map((property, i) => (
            <motion.div
              key={property.code}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="card group h-full flex flex-col">
                <div className="relative overflow-hidden rounded-t-2xl" style={{ aspectRatio: '16/10' }}>
                  {property.images && property.images.length > 0 ? (
                    <Image
                      src={property.images[0]}
                      alt={property.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      quality={75}
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-brand-muted group-hover:scale-105 transition-transform duration-700" />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {(!property.images || !property.images.length) && (
                      <div className="text-center text-text-muted">
                        <Layers size={40} className="mx-auto mb-1 opacity-40" />
                        <span className="text-xs">{property.type}</span>
                      </div>
                    )}
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-4 pt-12">
                    <div className="font-mono font-bold text-xl text-white">
                      {property.priceOnRequest || property.priceLabel === 'Price on Request'
                        ? 'Price on Request'
                        : property.priceLabel}
                    </div>
                    <div className="flex items-center gap-3 text-white/80 text-xs mt-1">
                      <span>{property.type}</span>
                      {property.area > 0 && (
                        <>
                          <span>•</span>
                          <span>{property.area} {property.areaUnit}</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="absolute top-3 left-3 z-10 flex gap-2">
                    <span className={`badge ${
                      property.badge === 'Hot Deal' ? 'badge-hot' :
                      property.badge === 'New' ? 'badge-new' :
                      property.featured ? 'badge-featured' : 'badge-sale'
                    }`}>
                      {property.badge}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-sans font-semibold text-lg text-text-primary mb-2 group-hover:opacity-70 transition-opacity">
                    {property.title}
                  </h3>

                  <div className="flex items-center gap-1.5 text-text-secondary text-sm mb-4">
                    <MapPin size={14} className="text-brand-primary flex-shrink-0" />
                    {property.location}
                  </div>

                  <div className="flex items-center gap-4 text-sm text-text-secondary border-t border-border pt-4 mb-4">
                    <span className="flex items-center gap-1.5">
                      <Layers size={15} className="text-brand-primary" />
                      {property.type}
                    </span>
                    <span className="text-border">|</span>
                    <span className="flex items-center gap-1.5">
                      <Maximize size={15} className="text-brand-primary" />
                      {property.area > 0 ? `${property.area} ${property.areaUnit}` : 'Sizes on request'}
                    </span>
                    {property.facing && (
                      <>
                        <span className="text-border">|</span>
                        <span className="text-text-secondary">{property.facing} Facing</span>
                      </>
                    )}
                  </div>

                  <p className="text-xs text-text-muted mb-4 font-mono">Code: {property.code}</p>

                  <div className="flex gap-3 mt-auto">
                    <Link
                      href={`/properties/${property.slug}`}
                      className="btn-secondary flex-1 !py-2.5 !px-4 text-sm justify-center"
                      aria-label={`View details for ${property.title}`}
                    >
                      View Details
                    </Link>
                    <a
                      href={getWhatsAppUrl(
                        property.priceOnRequest || property.priceLabel === 'Price on Request'
                          ? `Hi! I'm interested in ${property.title} (${property.code}) at ${property.location}. Please share availability and pricing.`
                          : `Hi! I'm interested in the plot in ${property.locality} (Code: ${property.code}) — ${property.area} ${property.areaUnit} at ${property.priceLabel}. Please share more details.`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 rounded-full bg-[#25D366] flex items-center justify-center text-white hover:scale-110 transition-transform shrink-0"
                      aria-label={`Enquire on WhatsApp about ${property.title}`}
                    >
                      <MessageCircle size={18} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          {!loading && displayProps.length === 0 && (
            <div className="col-span-full py-20 text-center text-gray-500">
              No plots found matching your selection.
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
