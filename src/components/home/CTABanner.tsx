'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Phone, ArrowRight, MessageCircle } from 'lucide-react'
import { getWhatsAppUrl, CONTACT_PHONES } from '@/lib/utils'

export function CTABanner() {
  return (
    <section className="py-20 md:py-28 charcoal-gradient relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-white/20 animate-float" />
        <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 rounded-full bg-white/15 animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 rounded-full bg-white/25 animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 right-1/4 w-2.5 h-2.5 rounded-full bg-white/10 animate-float" style={{ animationDelay: '3s' }} />
        <div className="absolute bottom-1/3 right-1/2 w-1.5 h-1.5 rounded-full bg-white/20 animate-float" style={{ animationDelay: '4s' }} />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-[120px]" />
      </div>

      <div className="section-container relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white mb-4 leading-tight">
            Your Property in NCR
            <br />
            <span className="text-white/80">Starts with a Clear Conversation.</span>
          </h2>
          <p className="text-white/60 text-lg mb-10 max-w-2xl mx-auto">
            Join buyers who trust Aurixxrealty for plots, highrise, and commercial space — with clear titles and honest guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={getWhatsAppUrl("Hello! I'd like a free consultation about property in Greater Noida / Noida / Yamuna Expressway.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary !text-base !px-8 !py-4"
            >
              <MessageCircle size={18} />
              Schedule a Free Consultation
            </a>
            <Link href="/properties" className="btn-white !text-base !px-8 !py-4">
              Browse Listings
              <ArrowRight size={16} />
            </Link>
          </div>
          <p className="text-white/40 text-sm mt-8 flex items-center justify-center gap-2">
            <Phone size={14} />
            Call us Mon–Sat, 9AM–7PM: {CONTACT_PHONES.join(' · ')}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
