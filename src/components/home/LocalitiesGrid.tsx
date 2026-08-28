'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { seedPlots } from '@/data/seedPlots'
import { SectionHeading } from '@/components/ui/SectionHeading'

export function LocalitiesGrid() {
  const plots = seedPlots.filter((p) => p.type === 'Plot')

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="section-container">
        <SectionHeading
          eyebrow="Localities"
          title="Plots Across NCR's Best Corridors"
          subtitle="Explore residential plots in well-connected neighbourhoods"
          center
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {plots.map((plot, i) => (
            <motion.div
              key={plot.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                href={`/properties/${plot.slug}`}
                className="group block relative overflow-hidden rounded-2xl h-72"
              >
                <Image
                  src={plot.images[0] || '/images/hero/hero-plots.jpg'}
                  alt={plot.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  quality={70}
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/10" />

                <div className="absolute top-4 right-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                    <MapPin size={18} className="text-white" />
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-display font-bold text-white text-xl mb-1 group-hover:opacity-90 transition-opacity">
                    {plot.title}
                  </h3>
                  <p className="text-white/70 text-sm mb-3 line-clamp-2">{plot.locality}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-white/90 text-sm font-semibold">
                      {plot.priceOnRequest ? 'Price on Request' : plot.priceLabel}
                    </span>
                    <ArrowRight size={16} className="text-white group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/properties" className="btn-ghost inline-flex items-center gap-2">
            View all plots <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
