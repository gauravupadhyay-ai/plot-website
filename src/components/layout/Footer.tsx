'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Phone, Mail, MapPin, Clock, Facebook, Youtube, Send, Award } from 'lucide-react'
import { getCallUrl, PHONE_NUMBER } from '@/lib/utils'

const credentials = [
  'Title Verified',
  'NA Guidance',
  'Site Visits',
  'Loan Support',
  'Clear Docs',
]

export function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    try {
      await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 4000)
    } catch {
      // silently fail
    }
  }

  return (
    <footer className="bg-brand-primary text-white pb-16 lg:pb-0">
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div>
              <h3 className="font-display text-xl font-bold text-white">
                Get new plot alerts for Vadodara
              </h3>
              <p className="mt-1 text-sm text-white/50">
                Join buyers who receive curated plot listings weekly.
              </p>
            </div>
            <form onSubmit={handleNewsletter} className="flex w-full gap-3 md:w-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="h-12 w-full rounded-full border border-white/15 bg-white/10 px-5 text-sm font-medium text-white placeholder:text-white/40 transition-colors focus:border-white focus:outline-none md:w-72"
                required
              />
              <button
                type="submit"
                className="flex h-12 shrink-0 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-brand-primary transition-all hover:bg-brand-light"
              >
                {subscribed ? '✓ Subscribed!' : (
                  <>
                    <Send size={14} />
                    Subscribe
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
            {credentials.map((cred) => (
              <div key={cred} className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/50">
                <Award size={14} className="text-white" />
                {cred}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="mb-4 inline-block">
              <span className="font-display text-2xl font-bold text-white">Gaurav Plots</span>
            </Link>
            <p className="mb-6 text-[15px] leading-relaxed text-white/60">
              Vadodara&apos;s plot specialists. Helping buyers find verified residential land with clear titles and honest guidance.
            </p>
            <div className="flex gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20" aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20" aria-label="YouTube">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-5 font-sans text-sm font-bold uppercase tracking-wider text-white/80">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: 'Home', href: '/' },
                { label: 'Plots', href: '/properties' },
                { label: 'Projects', href: '/projects' },
                { label: 'About Us', href: '/about' },
                { label: 'Blog', href: '/blog' },
                { label: 'Contact', href: '/contact' },
                { label: 'Careers', href: '/careers' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[15px] text-white/60 transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-5 font-sans text-sm font-bold uppercase tracking-wider text-white/80">Our Services</h4>
            <ul className="space-y-3">
              {[
                { label: 'Buying a Plot', href: '/services/buying-property' },
                { label: 'Plot Consulting', href: '/services/real-estate-consultant' },
                { label: 'Loan Assistance', href: '/services/home-loan' },
                { label: 'List Your Plot', href: '/post-property' },
                { label: 'EMI Calculator', href: '/tools/emi-calculator' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[15px] text-white/60 transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-5 font-sans text-sm font-bold uppercase tracking-wider text-white/80">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin size={18} className="mt-1 flex-shrink-0 text-white" />
                <span className="text-[15px] leading-relaxed text-white/60">
                  Kubereshwar Rd, Goverdhan Township, Kendranagar, Waghodia Road, Vadodara, Gujarat — 390025
                </span>
              </li>
              <li>
                <a href={getCallUrl()} className="flex items-center gap-3 text-[15px] text-white/60 transition-colors hover:text-white">
                  <Phone size={18} className="flex-shrink-0 text-white" />
                  {PHONE_NUMBER}
                </a>
              </li>
              <li>
                <a href="mailto:contact@gauravplots.com" className="flex items-center gap-3 text-[15px] text-white/60 transition-colors hover:text-white">
                  <Mail size={18} className="flex-shrink-0 text-white" />
                  contact@gauravplots.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-[15px] text-white/60">
                <Clock size={18} className="flex-shrink-0 text-white" />
                Mon–Sat: 9 AM – 7 PM
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 sm:flex-row sm:px-6 lg:px-8">
          <p className="text-sm text-white/40">
            © {new Date().getFullYear()} Gaurav Plots. All Rights Reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-white/40">
            <Link href="/contact" className="transition-colors hover:text-white/70">Contact</Link>
            <span>|</span>
            <Link href="/about" className="transition-colors hover:text-white/70">About</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
