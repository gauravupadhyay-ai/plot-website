'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, MapPin, CheckCircle2, Ruler, FileCheck, Layers, Shield, Trees, Route, MessageCircle } from 'lucide-react'
import { getWhatsAppUrl } from '@/lib/utils'

const amenities = [
  { icon: Route, label: 'Expressway Access' },
  { icon: Ruler, label: '7.5 Acre Campus' },
  { icon: Layers, label: '7 Towers' },
  { icon: Shield, label: 'Clear Title Focus' },
  { icon: Trees, label: 'Green Views' },
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
                src="/images/plots/eldeco-7-peaks/cover.jpg"
                alt="Eldeco 7 Peaks Residence - Omicron 1A, Greater Noida"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={75}
                className="object-cover object-[75%_45%]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/60 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-brand-primary/40" />
              <div className="absolute bottom-6 left-6 lg:hidden">
                <span className="badge badge-featured">Featured Layout</span>
              </div>
            </div>

            <div className="p-8 lg:p-12 bg-brand-primary/50 backdrop-blur-sm flex flex-col justify-center">
              <span className="badge badge-featured w-fit mb-4 hidden lg:inline-flex">Featured Layout</span>
              <h3 className="font-display font-bold text-3xl md:text-4xl text-white mb-2">
                Eldeco 7 Peaks Residence
              </h3>
              <div className="flex items-center gap-2 text-white/60 text-sm mb-6">
                <MapPin size={14} className="text-white" />
                Omicron 1A, Greater Noida
              </div>
              <p className="text-white/70 leading-relaxed mb-6">
                Premium residences across 7 standalone towers on 7.5 acres — 4-side open towers,
                green views, lavish clubhouse, and strong Greater Noida / Expressway connectivity.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-6">
                {['7 Towers', '7.5 Acres', 'Clubhouse & Pools', 'Loan Support'].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-white/80">
                    <CheckCircle2 size={14} className="text-white flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 mb-8">
                {amenities.map((a) => (
                  <div key={a.label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/60 text-xs">
                    <a.icon size={12} />
                    {a.label}
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/properties/eldeco-7-peaks-residence-greater-noida" className="btn-primary">
                  Explore Project <ArrowRight size={16} />
                </Link>
                <a
                  href={getWhatsAppUrl(
                    "Hi! I'd like availability and pricing for Eldeco 7 Peaks Residence, Omicron 1A, Greater Noida."
                  )}
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
