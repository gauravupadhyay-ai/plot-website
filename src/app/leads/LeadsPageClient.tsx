'use client'

import { FormEvent, useEffect, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Phone,
  User,
  Send,
  CheckCircle2,
  Shield,
  FileCheck,
  MapPin,
  Handshake,
  Star,
  Award,
  Users,
  Layers,
  X,
} from 'lucide-react'
import { Footer } from '@/components/layout/Footer'
import { GoogleReviewCard, GoogleReviewsHeader } from '@/components/ui/GoogleReviewCard'
import { testimonials } from '@/data/testimonials'
import { SITE_NAME } from '@/lib/utils'

const stats = [
  { icon: Layers, value: '132+', label: 'Properties Sold' },
  { icon: MapPin, value: '4+', label: 'NCR Corridors' },
  { icon: FileCheck, value: '100%', label: 'Title Focus' },
  { icon: Users, value: '5+', label: 'Years of Service' },
]

const trustPoints = [
  { icon: Shield, title: 'Verified Listings', desc: 'Every plot is checked for title clarity before we recommend it.' },
  { icon: Handshake, title: 'Zero Pressure', desc: 'Honest advice on locality fit, pricing, and paperwork — at your pace.' },
  { icon: MapPin, title: 'NCR Specialists', desc: 'Deep expertise across Greater Noida, Noida, Yamuna Expressway & Vrindavan.' },
  { icon: FileCheck, title: 'End-to-End Support', desc: 'From shortlist and site visit through registration and loan paperwork.' },
]

const credentials = ['NAR Certified', 'CREDAI Member', 'Title Verified', 'Site Visit Support']

const heroStagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
}

const heroItem = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 120, damping: 18 },
  },
}

const formPop = {
  hidden: { opacity: 0, scale: 0.88, y: 32 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 260, damping: 22, delay: 0.5 },
  },
}

function LeadForm({
  id,
  className = '',
  onSuccess,
}: {
  id?: string
  className?: string
  onSuccess?: () => void
}) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          propertyType: 'Plot',
          source: 'Lead Magnet Page /leads',
          message: 'Lead from /leads landing page — interested in plots and property in NCR.',
        }),
      })

      if (res.ok) {
        setSubmitted(true)
        setName('')
        setPhone('')
        onSuccess?.()
        return
      }

      setError('Something went wrong. Please try again or call us directly.')
    } catch {
      setError('Unable to submit right now. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className={`card-static p-8 text-center !rounded-2xl ${className}`}>
        <CheckCircle2 size={48} className="mx-auto mb-4 text-brand-primary" />
        <h3 className="font-display text-xl font-bold text-text-primary">You&apos;re on the list!</h3>
        <p className="mt-2 font-sans text-text-secondary">
          Our property specialist will call you within 2 hours to discuss plots and options in NCR.
        </p>
      </div>
    )
  }

  return (
    <div id={id} className={`card-static p-6 md:p-8 !rounded-2xl shadow-card-hover ${className}`}>
      <div className="mb-6">
        <p className="section-eyebrow !justify-start">Free consultation</p>
        <h2 className="font-display text-2xl font-bold text-text-primary">Get plot options in NCR</h2>
        <p className="mt-2 text-sm text-text-secondary font-sans">
          Share your name and number — we&apos;ll call with verified plot shortlists for Greater Noida, Noida &amp; Yamuna Expressway.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            placeholder="Your full name *"
            className="input pl-12"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="relative">
          <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="tel"
            placeholder="Mobile number *"
            className="input pl-12"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        {error && <p className="text-sm text-red-600 font-sans">{error}</p>}
        <button type="submit" disabled={loading} className="btn-primary w-full justify-center !py-3.5">
          <Send size={18} /> {loading ? 'Submitting...' : 'Get a Free Callback'}
        </button>
        <p className="text-center text-[11px] text-text-muted font-sans">
          100% confidential. No spam — only property guidance from {SITE_NAME}.
        </p>
      </form>
    </div>
  )
}

function LeadFormPopup({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center sm:p-6">
          <motion.button
            type="button"
            aria-label="Close form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/55 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 48, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 32, scale: 0.94 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className="relative w-full max-w-md"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute -top-3 right-0 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white text-text-primary shadow-lg transition hover:scale-105 sm:-right-3"
              aria-label="Close"
            >
              <X size={18} />
            </button>
            <LeadForm onSuccess={onClose} className="shadow-hover" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export function LeadsPageClient() {
  const reviewCards = testimonials.slice(0, 6)
  const [popupOpen, setPopupOpen] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setPopupOpen(true), 4500)
    return () => window.clearTimeout(timer)
  }, [])

  const closePopup = () => setPopupOpen(false)

  return (
    <main id="main-content" className="min-h-screen bg-brand-light">
      {/* Minimal header — logo only, no site navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/60 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-6xl items-center px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Image
              src="/images/brand/aurixx-logo.png"
              alt={SITE_NAME}
              width={44}
              height={44}
              className="h-11 w-11 rounded-full object-cover"
              priority
            />
            <span className="font-display text-lg font-extrabold tracking-tight text-text-primary sm:text-xl">
              {SITE_NAME}
            </span>
          </div>
        </div>
      </header>

      {/* Hero — copy on top (mobile), form below; desktop unchanged */}
      <section className="relative overflow-hidden pt-16">
        <div className="absolute inset-0">
          <Image
            src="/images/hero/home-hero-bg-mobile.jpg"
            alt="Residential plots in Greater Noida and Yamuna Expressway"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/70 to-black/85 lg:bg-gradient-to-r lg:from-black/85 lg:via-black/70 lg:to-black/55" />
        </div>

        <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 px-4 py-12 sm:px-6 sm:py-16 md:gap-10 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:py-24">
          {/* Hero copy — top on mobile, left on desktop */}
          <motion.div
            variants={heroStagger}
            initial="hidden"
            animate="show"
            className="order-1 text-white lg:order-1"
          >
            <motion.p
              variants={heroItem}
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-300/30 bg-amber-400/15 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-200"
            >
              <Star size={14} className="fill-amber-400 text-amber-400" />
              Trusted by 130+ NCR buyers
            </motion.p>

            <motion.h1
              variants={heroItem}
              className="font-display text-[2rem] font-extrabold leading-[1.15] tracking-tight sm:text-5xl lg:text-[3.25rem]"
            >
              <span className="block text-amber-300 drop-shadow-[0_2px_12px_rgba(0,0,0,0.65)]">
                Find the Right Plot in
              </span>
              <span className="mt-2 block text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.75)]">
                Greater Noida &amp; NCR
              </span>
            </motion.h1>

            <motion.p
              variants={heroItem}
              className="mt-5 max-w-xl text-base leading-relaxed text-white/90 font-sans sm:text-lg"
            >
              Verified residential plots, clear-title focus, and end-to-end guidance from shortlist to registration — without the hard sell.
            </motion.p>

            <motion.ul variants={heroItem} className="mt-8 space-y-3 font-sans text-sm text-white/95 sm:text-base">
              {[
                'Free plot shortlist within 24 hours',
                'Site visits across Yamuna Expressway & Greater Noida',
                'Title & NA status explained clearly',
              ].map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.55 + i * 0.1, type: 'spring', stiffness: 140, damping: 16 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-amber-400" />
                  {item}
                </motion.li>
              ))}
            </motion.ul>

            <motion.div variants={heroItem}>
              <button
                type="button"
                onClick={() => setPopupOpen(true)}
                className="btn-white mt-8 inline-flex !text-base transition-transform hover:scale-[1.02]"
              >
                Get free consultation <Send size={16} />
              </button>
            </motion.div>
          </motion.div>

          {/* Lead form — below copy on mobile, right on desktop */}
          <motion.div
            variants={formPop}
            initial="hidden"
            animate="show"
            className="order-2 lg:order-2"
          >
            <LeadForm id="lead-form" />
          </motion.div>
        </div>
      </section>

      <LeadFormPopup open={popupOpen} onClose={closePopup} />

      {/* Social proof strip */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ type: 'spring', stiffness: 100, damping: 18 }}
        className="relative z-10 -mt-8 mx-4 sm:mx-6 lg:mx-auto lg:max-w-5xl"
      >
        <div className="grid grid-cols-2 gap-6 rounded-3xl border border-border/50 bg-white p-8 shadow-card md:grid-cols-4 md:gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-primary/10">
                <stat.icon size={22} className="text-brand-primary" />
              </div>
              <div className="font-mono text-2xl font-bold text-brand-primary sm:text-3xl">{stat.value}</div>
              <div className="mt-1 text-xs font-semibold text-text-secondary sm:text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* About */}
      <section className="py-20 md:py-28">
        <div className="section-container">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="relative">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
                <Image
                  src="/images/gallery-images/6.jpg"
                  alt={`${SITE_NAME} team helping plot buyers in NCR`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-5 -right-4 max-w-[180px] rounded-2xl border border-border/50 bg-white p-5 shadow-card-hover md:right-6">
                <div className="font-mono text-3xl font-bold text-brand-primary">4.9</div>
                <div className="mt-1 flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="mt-1 text-xs text-text-secondary">Buyer satisfaction</p>
              </div>
            </div>

            <div>
              <p className="section-eyebrow">About {SITE_NAME}</p>
              <h2 className="section-title mb-6 font-display text-3xl md:text-4xl">
                NCR&apos;s focused{' '}
                <span className="text-brand-primary">real estate specialists</span>
              </h2>
              <p className="mb-6 font-sans text-lg leading-relaxed text-text-secondary">
                {SITE_NAME} helps families and investors buy residential plots, highrise, and commercial property across Greater Noida, Noida, Yamuna Expressway, and Vrindavan — with transparency at every step.
              </p>
              <p className="mb-8 font-sans leading-relaxed text-text-secondary">
                Whether you are buying your first plot to build a home or comparing corridors for investment, our team stays with you from enquiry to registration.
              </p>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {trustPoints.map((point) => (
                  <div
                    key={point.title}
                    className="flex items-start gap-3 rounded-xl bg-white p-4 shadow-sm border border-border/40"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-primary/10">
                      <point.icon size={20} className="text-brand-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-text-primary">{point.title}</p>
                      <p className="mt-0.5 text-xs text-text-muted">{point.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials / social proof */}
      <section className="border-y border-border/60 bg-white py-14 md:py-16">
        <div className="section-container text-center">
          <p className="section-eyebrow justify-center">Why buyers trust us</p>
          <h2 className="section-title mb-10 font-display text-2xl md:text-3xl">
            Verified guidance for every plot decision
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            {credentials.map((cred) => (
              <div
                key={cred}
                className="flex items-center gap-2 rounded-2xl border border-border/50 bg-brand-light px-5 py-3 text-sm font-semibold text-text-primary"
              >
                <Award size={18} className="text-brand-primary" />
                {cred}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-[#f8f9fa] py-16 md:py-24">
        <div className="section-container">
          <GoogleReviewsHeader title="What plot buyers say about us" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5">
            {reviewCards.map((t) => (
              <GoogleReviewCard
                key={t.id}
                name={t.name}
                quote={t.quote}
                rating={t.rating}
                meta={t.type}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA + form */}
      <section className="py-16 md:py-24">
        <div className="section-container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold text-text-primary md:text-4xl">
              Ready to explore plots in NCR?
            </h2>
            <p className="mt-4 font-sans text-text-secondary">
              Leave your details and our advisor will call with options matched to your budget and preferred localities.
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 140, damping: 18 }}
            className="mx-auto mt-10 max-w-md"
          >
            <LeadForm />
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
