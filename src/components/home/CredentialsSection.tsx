'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Award } from 'lucide-react'

const credentials = [
  { name: 'NAR India', fullName: 'National Association of Realtors — Certified Member' },
  { name: 'CREDAI', fullName: 'CREDAI — Active Member' },
  { name: 'VPCA', fullName: 'Vadodara Property Consultants Association' },
  { name: 'eXp Realty', fullName: 'eXp Realty Certified Partner' },
  { name: 'Digital Certified', fullName: 'Digital Certified Real Estate Professional' },
]

const eventPhotos = [
  { src: '/images/gallery-images/7.jpg', caption: 'Investor Meet 2024' },
  { src: '/images/gallery-images/8.jpg', caption: 'Exhibition Stall at Navlakhi' },
  { src: '/images/gallery-images/9.jpg', caption: 'NAR Certification Event' },
  { src: '/images/gallery-images/11.jpg', caption: 'At CREDAI Conference' },
]

export function CredentialsSection() {
  return (
    <section className="py-20 md:py-28 bg-brand-light">
      <div className="section-container">
        <div className="text-center mb-12">
          <p className="section-eyebrow justify-center">Credentials</p>
          <h2 className="section-title text-3xl sm:text-4xl md:text-[2.75rem]">
            Trusted Credentials,
            <br />
            <span className="text-brand-primary">Plot Buyers First</span>
          </h2>
        </div>

        <div className="mb-12 overflow-hidden">
          <div className="flex items-center justify-center gap-6 md:gap-12 flex-wrap">
            {credentials.map((cred, i) => (
              <motion.div
                key={cred.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-2 px-6 py-3 bg-white rounded-2xl shadow-card border border-border/50"
              >
                <Award size={18} className="text-brand-primary" />
                <div>
                  <div className="font-semibold text-sm text-text-primary">{cred.name}</div>
                  <div className="text-[11px] text-text-muted hidden sm:block">{cred.fullName}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {eventPhotos.map((photo, i) => (
            <motion.div
              key={photo.caption}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative overflow-hidden rounded-2xl group aspect-[4/3]"
            >
              <Image
                src={photo.src}
                alt={photo.caption}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <span className="text-white text-sm font-medium">{photo.caption}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
