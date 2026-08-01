'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Calculator, TrendingUp, MessageCircle, ArrowRight } from 'lucide-react'
import { getWhatsAppUrl } from '@/lib/utils'

const tools = [
  {
    icon: Calculator,
    title: 'EMI Calculator',
    desc: 'Estimate monthly payments for a plot loan — plan your budget before you visit.',
    href: '/tools/emi-calculator',
    isLink: true,
  },
  {
    icon: TrendingUp,
    title: 'Locality Insights',
    desc: 'Vadodara plot corridor trends, growth pockets, and practical buying tips.',
    href: '/blog',
    isLink: true,
  },
  {
    icon: MessageCircle,
    title: 'Free Plot Consultation',
    desc: 'Talk to Aurixrealty — no obligation, clear advice on land and paperwork.',
    href: '',
    isLink: false,
  },
]

export function ToolsStrip() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="section-container">
        <div className="text-center mb-12">
          <p className="section-eyebrow justify-center">Resources</p>
          <h2 className="section-title text-3xl sm:text-4xl md:text-[2.75rem]">
            Tools & Resources
          </h2>
          <p className="section-subtitle mx-auto text-center">
            Practical tools for smarter plot decisions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {tools.map((tool, i) => (
            <motion.div
              key={tool.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              {tool.isLink ? (
                <Link href={tool.href} className="group block h-full">
                  <div className="card h-full p-8 flex flex-col !rounded-2xl border border-transparent hover:border-brand-primary/20">
                    <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 flex items-center justify-center mb-6 group-hover:bg-brand-primary/15 transition-colors">
                      <tool.icon size={26} className="text-brand-primary" />
                    </div>
                    <h3 className="font-display font-bold text-xl text-text-primary mb-3 group-hover:opacity-70 transition-opacity">
                      {tool.title}
                    </h3>
                    <p className="text-text-secondary text-[15px] leading-relaxed mb-6 flex-1">
                      {tool.desc}
                    </p>
                    <span className="text-brand-primary text-sm font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                      Explore <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              ) : (
                <a
                  href={getWhatsAppUrl("Hello! I'm looking for a residential plot in Vadodara. Can we discuss my requirements?")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block h-full"
                >
                  <div className="card h-full p-8 flex flex-col !rounded-2xl border border-transparent hover:border-brand-primary/20">
                    <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 flex items-center justify-center mb-6 group-hover:bg-brand-primary/15 transition-colors">
                      <tool.icon size={26} className="text-brand-primary" />
                    </div>
                    <h3 className="font-display font-bold text-xl text-text-primary mb-3 group-hover:opacity-70 transition-opacity">
                      {tool.title}
                    </h3>
                    <p className="text-text-secondary text-[15px] leading-relaxed mb-6 flex-1">
                      {tool.desc}
                    </p>
                    <span className="text-brand-primary text-sm font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                      Start Chat <ArrowRight size={14} />
                    </span>
                  </div>
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
