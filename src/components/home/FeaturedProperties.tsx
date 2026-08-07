import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, MapPin, Maximize, MessageCircle, Layers } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { getWhatsAppUrl } from '@/lib/utils'

export type FeaturedPlotCard = {
  slug: string
  code: string
  title: string
  type: string
  location: string
  locality: string
  priceLabel: string
  priceOnRequest?: boolean
  area: number
  areaUnit: string
  facing?: string
  badge: string
  featured: boolean
  cover: string
}

export function FeaturedProperties({ plots }: { plots: FeaturedPlotCard[] }) {
  return (
    <section className="bg-brand-light py-20 md:py-28">
      <div className="section-container">
        <div className="mb-8 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Featured Properties"
            title="Handpicked NCR Inventory"
            subtitle="Plots, highrise residences, and commercial assets across Greater Noida, Noida, and Vrindavan"
          />
          <Link href="/projects" className="btn-ghost flex shrink-0 items-center gap-2">
            View All Projects <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {plots.map((property, i) => (
            <div key={property.code} className="card group flex h-full flex-col">
              <div className="relative overflow-hidden rounded-t-2xl" style={{ aspectRatio: '16/10' }}>
                {property.cover ? (
                  <Image
                    src={property.cover}
                    alt={property.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    quality={55}
                    priority={i < 3}
                    loading={i < 3 ? 'eager' : 'lazy'}
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 bg-brand-muted transition-transform duration-700 group-hover:scale-105" />
                )}

                {!property.cover && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-text-muted">
                      <Layers size={40} className="mx-auto mb-1 opacity-40" />
                      <span className="text-xs">{property.type}</span>
                    </div>
                  </div>
                )}

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-4 pt-12">
                  <div className="font-mono text-xl font-bold text-white">
                    {property.priceOnRequest || property.priceLabel === 'Price on Request'
                      ? 'Price on Request'
                      : property.priceLabel}
                  </div>
                  <div className="mt-1 flex items-center gap-3 text-xs text-white/80">
                    <span>{property.type}</span>
                    {property.area > 0 && (
                      <>
                        <span>•</span>
                        <span>
                          {property.area} {property.areaUnit}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <div className="absolute left-3 top-3 z-10 flex gap-2">
                  <span
                    className={`badge ${
                      property.badge === 'Hot Deal'
                        ? 'badge-hot'
                        : property.badge === 'New'
                          ? 'badge-new'
                          : property.featured
                            ? 'badge-featured'
                            : 'badge-sale'
                    }`}
                  >
                    {property.badge}
                  </span>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h3 className="mb-2 font-sans text-lg font-semibold text-text-primary transition-opacity group-hover:opacity-70">
                  {property.title}
                </h3>

                <div className="mb-4 flex items-center gap-1.5 text-sm text-text-secondary">
                  <MapPin size={14} className="flex-shrink-0 text-brand-primary" />
                  {property.locality || property.location}
                </div>

                <div className="mb-4 flex items-center gap-4 border-t border-border pt-4 text-sm text-text-secondary">
                  <span className="flex items-center gap-1.5">
                    <Layers size={15} className="text-brand-primary" />
                    {property.type}
                  </span>
                  <span className="text-border">|</span>
                  <span className="flex items-center gap-1.5">
                    <Maximize size={15} className="text-brand-primary" />
                    {property.area > 0 ? `${property.area} ${property.areaUnit}` : 'Sizes on request'}
                  </span>
                </div>

                <p className="mb-4 font-mono text-xs text-text-muted">Code: {property.code}</p>

                <div className="mt-auto flex gap-3">
                  <Link
                    href={`/properties/${property.slug}`}
                    className="btn-secondary flex-1 justify-center !px-4 !py-2.5 text-sm"
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
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white transition-transform hover:scale-110"
                    aria-label={`Enquire on WhatsApp about ${property.title}`}
                  >
                    <MessageCircle size={18} />
                  </a>
                </div>
              </div>
            </div>
          ))}

          {plots.length === 0 && (
            <div className="col-span-full py-20 text-center text-gray-500">
              No plots found matching your selection.
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
