'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Shield, Handshake, FileCheck, MapPin, ArrowRight, Quote } from 'lucide-react'
import Image from 'next/image'

const reasons = [
  {
    icon: Shield,
    title: 'Clear-Title Focus',
    desc: 'We prioritise ownership papers and NA status before you commit.',
  },
  {
    icon: Handshake,
    title: 'End-to-End Guidance',
    desc: 'From shortlist to site visit to registration — we stay with you.',
  },
  {
    icon: FileCheck,
    title: 'Documentation Support',
    desc: 'Help with title review, approvals, and loan paperwork for every deal.',
  },
  {
    icon: MapPin,
    title: 'NCR Local Expertise',
    desc: 'Deep knowledge of Greater Noida, Noida, Expressway & Vrindavan corridors.',
  },
]

export function WhyChooseUs() {
  return (
    <section className="py-20 md:py-28 bg-white overflow-hidden">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3]">
              <Image
                src="/images/gallery-images/6.jpg"
                alt="Aurixxrealty team assisting property buyers in NCR"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={75}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/40 to-transparent" />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="absolute -bottom-6 -right-4 md:right-8 bg-white rounded-2xl shadow-card-hover p-6 max-w-[200px] border border-border/50"
            >
              <div className="font-mono font-bold text-3xl text-brand-primary">132+</div>
              <div className="text-text-secondary text-sm mt-1">Properties guided & sold</div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="section-eyebrow">Why Choose Us</p>
            <h2 className="section-title text-3xl sm:text-4xl md:text-[2.5rem] mb-6">
              NCR&apos;s Focused
              <br />
              <span className="text-brand-primary">Real Estate Specialists</span>
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-8">
              Aurixxrealty helps you buy plots, highrise, and commercial space with clarity —
              locality fit, title confidence, and honest pricing at every step.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {reasons.map((reason, i) => (
                <motion.div
                  key={reason.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-start gap-3 p-4 rounded-xl bg-brand-light hover:bg-brand-muted transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center shrink-0">
                    <reason.icon size={20} className="text-brand-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-text-primary">{reason.title}</div>
                    <div className="text-text-muted text-xs mt-0.5">{reason.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="relative pl-6 border-l-2 border-brand-primary/30 mb-8">
              <Quote size={24} className="text-brand-primary/20 absolute -left-3 -top-1" />
              <p className="text-text-secondary italic text-[15px] leading-relaxed">
                &ldquo;We don&apos;t just show listings. We help you buy property you can trust with confidence.&rdquo;
              </p>
              <p className="text-text-primary font-semibold text-sm mt-2">— Aurixxrealty Team</p>
            </div>

            <Link href="/about" className="btn-charcoal">
              Meet Our Team <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
