'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Mail, MapPin, Clock, Instagram, Linkedin, Send, Award } from 'lucide-react'
import { CONTACT_EMAIL, SITE_NAME } from '@/lib/utils'
import { ContactPhoneLinks } from '@/components/ui/ContactPhoneLinks'

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
                Get new property alerts for NCR
              </h3>
              <p className="mt-1 text-sm text-white/50">
                Join buyers who receive curated listings weekly.
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
            <Link href="/" className="mb-4 inline-flex items-center gap-3">
              <Image
                src="/images/brand/aurixx-logo.png"
                alt={SITE_NAME}
                width={72}
                height={72}
                className="h-16 w-16 rounded-full object-cover sm:h-[4.5rem] sm:w-[4.5rem]"
              />
              <span className="font-display text-2xl font-bold text-white">{SITE_NAME}</span>
            </Link>
            <p className="mb-6 text-[15px] leading-relaxed text-white/60">
              NCR real-estate specialists. Helping buyers find verified plots, highrise, and commercial inventory across Greater Noida, Noida, Yamuna Expressway &amp; Vrindavan.
            </p>
            <div className="flex gap-3">
              <a href="https://www.instagram.com/aurixxrealty" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-5 font-sans text-sm font-bold uppercase tracking-wider text-white/80">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: 'Home', href: '/' },
                { label: 'Plots', href: '/properties' },
                { label: 'Highrise', href: '/highrise' },
                { label: 'Commercial', href: '/commercial' },
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
                { label: 'Buying Property', href: '/services/buying-property' },
                { label: 'Real Estate Consulting', href: '/services/real-estate-consultant' },
                { label: 'Loan Assistance', href: '/services/home-loan' },
                { label: 'List Your Property', href: '/post-property' },
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
                  Greater Noida / Yamuna Expressway corridor, Uttar Pradesh (NCR)
                </span>
              </li>
              <ContactPhoneLinks variant="footer" iconSize={18} asListItems />
              <li>
                <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center gap-3 text-[15px] text-white/60 transition-colors hover:text-white">
                  <Mail size={18} className="flex-shrink-0 text-white" />
                  {CONTACT_EMAIL}
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
          <p className="text-sm text-white/70">
            © {new Date().getFullYear()} Aurixxrealty. All Rights Reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-white/70">
            <Link href="/contact" className="transition-colors hover:text-white">Contact</Link>
            <span aria-hidden="true">|</span>
            <Link href="/about" className="transition-colors hover:text-white">About</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
