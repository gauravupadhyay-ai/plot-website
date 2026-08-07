'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Layers, Briefcase, Landmark } from 'lucide-react'

const services = [
  {
    icon: Layers,
    title: 'Buying Property',
    description: 'Find plots, highrise, and commercial space that match your budget, size, and locality — from search to registration.',
    href: '/services/buying-property',
  },
  {
    icon: Briefcase,
    title: 'Real Estate Consulting',
    description: 'Clear advice on title, approvals, location growth, and fair pricing for NCR deals.',
    href: '/services/real-estate-consultant',
  },
  {
    icon: Landmark,
    title: 'Loan Assistance',
    description: 'Help comparing loan options and paperwork so financing does not slow your purchase.',
    href: '/services/home-loan',
  },
]

export function ServicesStrip() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="section-container">
        <div className="text-center mb-12 lg:mb-16">
          <p className="section-eyebrow justify-center">Our Services</p>
          <h2 className="section-title text-3xl sm:text-4xl md:text-[2.75rem]">
            How We Help You
          </h2>
          <p className="section-subtitle mx-auto text-center">
            End-to-end services from shortlist to paperwork
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <Link href={service.href} className="group block h-full">
                <div className="card h-full p-8 flex flex-col !rounded-2xl border border-transparent hover:border-brand-primary/20">
                  <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 flex items-center justify-center mb-6 group-hover:bg-brand-primary/15 transition-colors">
                    <service.icon size={26} className="text-brand-primary" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-text-primary mb-3 group-hover:opacity-70 transition-opacity">
                    {service.title}
                  </h3>
                  <p className="text-text-secondary text-[15px] leading-relaxed mb-6 flex-1">
                    {service.description}
                  </p>
                  <span className="text-brand-primary text-sm font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                    Learn More <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
