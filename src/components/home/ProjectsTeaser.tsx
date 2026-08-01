'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, MapPin, CheckCircle2, Ruler, FileCheck, Layers, Shield, Trees, Route, MessageCircle } from 'lucide-react'
import { getWhatsAppUrl } from '@/lib/utils'

const amenities = [
  { icon: Route, label: 'Road Access' },
  { icon: Ruler, label: 'Clear Boundaries' },
  { icon: Layers, label: 'NA Ready' },
  { icon: Shield, label: 'Clear Title Focus' },
  { icon: Trees, label: 'Open Layout' },
  { icon: FileCheck, label: 'Docs Support' },
]

export function ProjectsTeaser() {
  return (
    <section className="py-20 md:py-28 charcoal-gradient relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-[100px]" />

      <div className="section-container relative z-10">
        <div className="text-center mb-12">
          <p className="section-eyebrow justify-center !text-white/70">Featured Layout</p>
          <h2 className="section-title text-3xl sm:text-4xl md:text-[2.75rem] text-white">
            Plot Project Spotlight
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl overflow-hidden border border-white/10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative h-72 lg:h-auto lg:min-h-[480px]">
              <Image
                src="/images/gallery-images/10.jpg"
                alt="Sarthak Enclave - Residential plots in Subhanpura"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={75}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/60 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-brand-primary/40" />
              <div className="absolute bottom-6 left-6 lg:hidden">
                <span className="badge badge-featured">Featured Layout</span>
              </div>
            </div>

            <div className="p-8 lg:p-12 bg-brand-primary/50 backdrop-blur-sm flex flex-col justify-center">
              <span className="badge badge-featured w-fit mb-4 hidden lg:inline-flex">Featured Layout</span>
              <h3 className="font-display font-bold text-3xl md:text-4xl text-white mb-2">
                Sarthak Enclave
              </h3>
              <div className="flex items-center gap-2 text-white/60 text-sm mb-6">
                <MapPin size={14} className="text-white" />
                Subhanpura, Vadodara
              </div>
              <p className="text-white/70 leading-relaxed mb-6">
                A residential plot layout in a well-connected Vadodara locality.
                Planned plots with practical road access — built for buyers who
                want land first, then build on their terms.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-6">
                {['Prime Locality', 'Plot Inventory', 'Clear Docs Focus', 'Loan Support'].map(item => (
                  <div key={item} className="flex items-center gap-2 text-sm text-white/80">
                    <CheckCircle2 size={14} className="text-white flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 mb-8">
                {amenities.map(a => (
                  <div key={a.label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/60 text-xs">
                    <a.icon size={12} />
                    {a.label}
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/projects/sarthak-enclave" className="btn-primary">
                  Explore Plots <ArrowRight size={16} />
                </Link>
                <a
                  href={getWhatsAppUrl("Hi! I'd like plot availability and pricing for Sarthak Enclave, Subhanpura.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp"
                >
                  <MessageCircle size={16} />
                  Register Interest
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
