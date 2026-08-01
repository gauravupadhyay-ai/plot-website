'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Bell, MapPin } from 'lucide-react'
import { localities } from '@/data/localities'
import { SectionHeading } from '@/components/ui/SectionHeading'

export function LocalitiesGrid() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="section-container">
        <SectionHeading
          eyebrow="Localities"
          title="Plots Across Vadodara's Best Corridors"
          subtitle="Explore residential and NA land options in well-connected neighbourhoods"
          center
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {localities.map((locality, i) => (
            <motion.div
              key={locality.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              {locality.propertyCount > 0 ? (
                <Link
                  href={`/properties?locality=${encodeURIComponent(locality.name)}`}
                  className="group block relative overflow-hidden rounded-2xl h-72"
                >
                  <Image
                    src={locality.image}
                    alt={locality.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
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
                      {locality.name}
                    </h3>
                    <p className="text-white/60 text-sm mb-3 line-clamp-2">{locality.description.split('.')[0]}.</p>
                    <div className="flex items-center justify-between">
                      <span className="text-white/80 text-sm font-semibold font-mono">
                        {locality.propertyCount} {locality.propertyCount === 1 ? 'plot' : 'plots'}
                      </span>
                      <ArrowRight size={16} className="text-white group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ) : (
                <div className="relative overflow-hidden rounded-2xl h-72 border border-border/50">
                  <Image
                    src={locality.image}
                    alt={locality.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover opacity-40"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-white/40" />
                  <div className="absolute top-4 right-4">
                    <div className="w-10 h-10 rounded-full bg-brand-primary/5 flex items-center justify-center">
                      <MapPin size={18} className="text-text-muted" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-display font-bold text-text-primary text-xl mb-1">
                      {locality.name}
                    </h3>
                    <p className="text-text-muted text-sm mb-3">{locality.description.split('.')[0]}.</p>
                    <button className="inline-flex items-center gap-2 text-sm font-semibold text-brand-primary hover:opacity-70 transition-opacity">
                      <Bell size={14} />
                      Notify Me When Available
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
