'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { X, MapPin, Sparkles, ArrowRight, MessageCircle, CheckCircle2 } from 'lucide-react'
import { getWhatsAppUrl, SITE_NAME } from '@/lib/utils'

const highlights = ['Omicron 1A', '7 towers', '7.5 acres', 'Loan support']

export function UpcomingProjectModal() {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const [open, setOpen] = useState(false)
  const skip =
    pathname?.startsWith('/properties') ||
    pathname?.startsWith('/admin') ||
    pathname === '/admin'

  useEffect(() => {
    if (skip) return
    setMounted(true)
    const timer = window.setTimeout(() => setOpen(true), 3000)
    return () => window.clearTimeout(timer)
  }, [skip])

  const close = () => {
    setOpen(false)
  }

  if (skip || !mounted) return null

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
            aria-label="Close overlay"
            onClick={close}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="upcoming-project-title"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ type: 'spring', damping: 24, stiffness: 260 }}
            className="relative z-[101] grid max-h-[min(90vh,640px)] w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-filter sm:max-h-[min(90vh,720px)] sm:max-w-4xl sm:rounded-[2rem] md:grid-cols-[1.35fr_1fr]"
          >
            <button
              type="button"
              onClick={close}
              className="absolute right-2.5 top-2.5 z-20 rounded-full bg-white p-2 text-text-primary shadow-sm transition-colors hover:bg-brand-light hover:text-text-primary active:bg-brand-muted md:right-3 md:top-3"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            <div className="relative h-[160px] shrink-0 sm:h-[180px] md:h-auto md:min-h-full">
              <Image
                src="/images/plots/eldeco-7-peaks/cover.jpg"
                alt="Eldeco 7 Peaks Residence Omicron 1A Greater Noida"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={75}
                className="object-cover object-[72%_42%]"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent md:bg-gradient-to-b md:from-black/55 md:via-black/15 md:to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 md:bottom-auto md:left-5 md:right-5 md:top-5">
                <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
                  <Sparkles size={11} />
                  Featured layout
                </span>
                <p className="mt-2 hidden font-display text-2xl font-bold text-white drop-shadow md:block lg:text-3xl">
                  Eldeco 7 Peaks
                </p>
                <p className="mt-1 hidden items-center gap-1.5 text-sm text-white/90 md:flex">
                  <MapPin size={14} />
                  Omicron 1A, Greater Noida
                </p>
              </div>
            </div>

            <div className="flex min-h-0 flex-col p-4 sm:p-6 md:justify-center md:p-8 lg:p-10">
              <div className="min-h-0 flex-1 overflow-y-auto md:flex-none">
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-text-secondary sm:text-[11px]">
                  Featured · {SITE_NAME}
                </p>
                <h3
                  id="upcoming-project-title"
                  className="mt-1 font-display text-xl font-bold tracking-tight text-text-primary sm:text-2xl md:text-3xl"
                >
                  Eldeco 7 Peaks Residence
                </h3>
                <p className="mt-0.5 flex items-center gap-1 text-xs font-medium text-text-secondary md:hidden">
                  <MapPin size={12} />
                  Omicron 1A, Greater Noida
                </p>
                <p className="mt-2 text-sm leading-snug text-text-secondary sm:mt-3 sm:text-[15px] sm:leading-relaxed">
                  <span className="md:hidden">
                    7 towers on 7.5 acres in Omicron 1A. Ask for availability &amp; pricing.
                  </span>
                  <span className="hidden md:inline">
                    Exclusive residences across 7 standalone towers on 7.5 acres in Omicron 1A,
                    Greater Noida — green views, clubhouse amenities, and Expressway connectivity.
                    Get availability via {SITE_NAME}.
                  </span>
                </p>

                <ul className="mt-3 grid grid-cols-2 gap-1.5 sm:mt-4 sm:gap-2 md:mt-5 md:gap-2.5">
                  {highlights.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-1.5 rounded-lg bg-brand-light px-2 py-1.5 text-[11px] font-medium text-text-primary sm:rounded-xl sm:px-2.5 sm:py-2 sm:text-xs md:px-3 md:py-2.5 md:text-sm"
                    >
                      <CheckCircle2 size={14} className="shrink-0 text-brand-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-3 flex shrink-0 flex-col gap-2.5 sm:mt-5 sm:flex-row sm:gap-3 md:mt-6">
                <a
                  href={getWhatsAppUrl(
                    `Hi! I'm interested in Eldeco 7 Peaks Residence, Omicron 1A, Greater Noida via ${SITE_NAME}. Please share availability and pricing.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[52px] w-full shrink-0 items-center justify-center gap-2 rounded-full bg-brand-primary px-5 text-sm font-semibold leading-none text-white shadow-cta transition hover:opacity-90 sm:min-h-12 sm:flex-1 md:min-h-12"
                  onClick={close}
                >
                  <MessageCircle size={16} className="shrink-0" />
                  WhatsApp
                </a>
                <Link
                  href="/properties/eldeco-7-peaks-residence-greater-noida"
                  className="inline-flex min-h-[52px] w-full shrink-0 items-center justify-center gap-2 rounded-full border border-border bg-white px-5 text-sm font-semibold leading-none text-text-primary transition hover:bg-brand-light sm:min-h-12 sm:flex-1 md:min-h-12"
                  onClick={close}
                >
                  Explore
                  <ArrowRight size={16} className="shrink-0" />
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
