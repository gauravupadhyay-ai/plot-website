'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Sparkles } from 'lucide-react'
import { getWhatsAppUrl } from '@/lib/utils'

const STORAGE_KEY = 'gp-upcoming-dismissed-v2'

export function UpcomingProjectModal() {
  const [mounted, setMounted] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === '1') return
    } catch {
      // ignore storage errors
    }

    const timer = window.setTimeout(() => setOpen(true), 3000)
    return () => window.clearTimeout(timer)
  }, [])

  const close = () => {
    setOpen(false)
    try {
      sessionStorage.setItem(STORAGE_KEY, '1')
    } catch {
      // ignore
    }
  }

  if (!mounted) return null

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/55"
            aria-label="Close overlay"
            onClick={close}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="upcoming-project-title"
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ type: 'spring', damping: 22, stiffness: 260 }}
            className="relative z-[101] w-full max-w-md rounded-3xl bg-white p-6 shadow-filter sm:p-8"
          >
            <button
              type="button"
              onClick={close}
              className="absolute right-3 top-3 rounded-full p-2 text-text-muted hover:bg-brand-light hover:text-text-primary"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-brand-light px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-text-secondary">
              <Sparkles size={14} />
              Coming soon
            </div>
            <h3
              id="upcoming-project-title"
              className="font-display text-2xl font-bold tracking-tight text-text-primary"
            >
              Upcoming Project
            </h3>
            <p className="mt-3 text-[15px] leading-relaxed text-text-secondary">
              A new plotted development from Gaurav Plots is launching soon in Vadodara.
              Chat with us on WhatsApp for early access and plot preferences.
            </p>
            <a
              href={getWhatsAppUrl(
                'Hi Gaurav Plots! I want details about your upcoming project.'
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-6 w-full"
              onClick={close}
            >
              Chat on WhatsApp
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
