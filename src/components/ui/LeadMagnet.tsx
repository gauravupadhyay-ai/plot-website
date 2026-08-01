'use client'

import React, { useState, useEffect, FormEvent } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Phone, User, CheckCircle2 } from 'lucide-react'
import { SITE_NAME } from '@/lib/utils'

export function LeadMagnet() {
  const [isVisible, setIsVisible] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const pathname = usePathname()

  useEffect(() => {
    if (pathname === '/admin/login') return

    const hasSeenLeadMagnet = sessionStorage.getItem('hasSeenLeadMagnet')
    if (!hasSeenLeadMagnet) {
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [pathname])

  const handleClose = () => {
    setIsVisible(false)
    sessionStorage.setItem('hasSeenLeadMagnet', 'true')
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          source: 'Lead Magnet Popup',
          message: 'Interested in residential plots in Vadodara',
        }),
      })

      if (res.ok) {
        setIsSubmitted(true)
        sessionStorage.setItem('hasSeenLeadMagnet', 'true')
        setTimeout(() => {
          setIsVisible(false)
        }, 3000)
      }
    } catch (err) {
      console.error('Failed to submit lead:', err)
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <div
          key="lead-magnet-popup"
          className="fixed inset-0 z-[100] flex items-center justify-center px-4 pointer-events-none"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-brand-primary/20 backdrop-blur-sm pointer-events-auto"
            onClick={handleClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md bg-white p-8 pointer-events-auto shadow-hover overflow-hidden rounded-2xl border border-brand-primary/10"
          >
            <button
              type="button"
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 text-brand-primary/60 hover:text-brand-primary transition-all z-30"
              aria-label="Close popup"
            >
              <X size={20} />
            </button>

            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="w-20 h-20 rounded-full bg-brand-primary/10 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={40} className="text-brand-primary" />
                </div>
                <h2 className="font-display font-bold text-2xl text-text-primary mb-2">
                  Thank You!
                </h2>
                <p className="text-text-secondary font-sans">
                  Our plot specialist will call you shortly to help with your search.
                </p>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center">
                    <Send size={24} className="text-brand-primary" />
                  </div>
                  <div>
                    <h2 className="font-display font-bold text-xl text-brand-primary">
                      Looking for Plots in Vadodara?
                    </h2>
                    <p className="text-text-secondary text-sm font-sans">
                      Get a free callback from {SITE_NAME}.
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <User
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
                    />
                    <input
                      type="text"
                      placeholder="Your Full Name *"
                      className="input pl-12"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="relative">
                    <Phone
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
                    />
                    <input
                      type="tel"
                      placeholder="Mobile Number *"
                      className="input pl-12"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn-primary w-full justify-center !py-3.5 mt-2 text-base shadow-cta"
                  >
                    Get a Call Back <Send size={18} />
                  </button>
                  <p className="text-[10px] text-text-muted text-center mt-4 font-sans">
                    By clicking, you agree to receive plot updates. We respect your privacy.
                  </p>
                </form>
              </div>
            )}

            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 blur-[60px] rounded-full -translate-y-1/2 translate-x-1/2" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
