'use client'
import { useState } from 'react'
import { Phone, Mail, MapPin, Clock, MessageCircle, Instagram, Linkedin, Send, CheckCircle2 } from 'lucide-react'
import {
  getWhatsAppUrl,
  getCallUrl,
  PHONE_NUMBER,
  SITE_NAME,
  CONTACT_EMAIL,
  EMAIL_ALIASES,
} from '@/lib/utils'

export function ContactClient() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [userType, setUserType] = useState('')
  const [propertyType, setPropertyType] = useState('Plot')
  const [budgetRange, setBudgetRange] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          email,
          userType,
          propertyType,
          budgetRange,
          message,
          source: 'Contact Page',
        }),
      })

      if (res.ok) {
        setSubmitted(true)
        setTimeout(() => setSubmitted(false), 5000)
        setName('')
        setPhone('')
        setEmail('')
        setMessage('')
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const now = new Date()
  const istHour = (now.getUTCHours() + 5 + (now.getUTCMinutes() + 30 >= 60 ? 1 : 0)) % 24
  const istDay = now.getUTCDay()
  const isOpen = istDay >= 1 && istDay <= 6 && istHour >= 9 && istHour < 19

  return (
    <>
      <section className="py-16 md:py-24 bg-brand-light">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
            <div className="card-static p-6 md:p-8 !rounded-2xl">
              <h2 className="font-display font-bold text-2xl mb-6">Send Us an Enquiry</h2>
              {submitted ? (
                <div className="text-center py-12">
                  <CheckCircle2 size={48} className="text-brand-primary mx-auto mb-4" />
                  <h3 className="font-display font-bold text-xl mb-2">Enquiry Sent!</h3>
                  <p className="text-text-secondary font-sans">We&apos;ll contact you within 2 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-semibold text-text-primary mb-1.5 block font-sans">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        className="input"
                        placeholder="Your full name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-text-primary mb-1.5 block font-sans">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        className="input"
                        placeholder="+91 XXXXX XXXXX"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-text-primary mb-1.5 block font-sans">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="input"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-text-primary mb-1.5 block font-sans">
                      I am a
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {['Buyer', 'Seller', 'Investor', 'Other'].map((type) => (
                        <label key={type} className="pill-toggle cursor-pointer">
                          <input
                            type="radio"
                            name="userType"
                            value={type}
                            className="sr-only peer"
                            checked={userType === type}
                            onChange={() => setUserType(type)}
                          />
                          <span className="peer-checked:bg-brand-primary peer-checked:text-white peer-checked:border-brand-primary">
                            {type}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-semibold text-text-primary mb-1.5 block font-sans">
                        Looking For
                      </label>
                      <select
                        className="select"
                        value={propertyType}
                        onChange={(e) => setPropertyType(e.target.value)}
                      >
                        <option value="Plot">Residential Plot</option>
                        <option value="Plot Investment">Plot for Investment</option>
                        <option value="Plot Consultation">Plot Consultation</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-text-primary mb-1.5 block font-sans">
                        Budget Range
                      </label>
                      <select
                        className="select"
                        value={budgetRange}
                        onChange={(e) => setBudgetRange(e.target.value)}
                      >
                        <option value="">Select budget</option>
                        <option>₹10 Lac - ₹20 Lac</option>
                        <option>₹20 Lac - ₹40 Lac</option>
                        <option>₹40 Lac - ₹75 Lac</option>
                        <option>₹75 Lac - ₹1 Cr</option>
                        <option>₹1 Cr+</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-text-primary mb-1.5 block font-sans">
                      Message
                    </label>
                    <textarea
                      className="textarea"
                      placeholder="Tell us which locality or plot size you're looking for..."
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>
                  <button type="submit" disabled={loading} className="btn-primary w-full md:w-auto">
                    <Send size={16} /> {loading ? 'Sending...' : 'Send Enquiry'}
                  </button>
                  <p className="text-xs text-text-muted font-sans">
                    Your information is 100% confidential and never shared.
                  </p>
                </form>
              )}
            </div>

            <div className="space-y-6">
              <div className="card-static p-6 !rounded-2xl">
                <h3 className="font-display font-bold text-xl mb-6">Contact Information</h3>
                <div className="space-y-5">
                  <div
                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold ${isOpen ? 'bg-brand-primary/10 text-brand-primary' : 'bg-red-50 text-red-500'}`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${isOpen ? 'bg-brand-primary animate-pulse' : 'bg-red-400'}`}
                    />
                    {isOpen ? 'Open Now' : 'Closed'}
                  </div>

                  <div className="flex gap-3">
                    <MapPin size={20} className="text-brand-primary flex-shrink-0 mt-1" />
                    <p className="text-text-secondary text-sm leading-relaxed font-sans">
                      Greater Noida / Yamuna Expressway corridor, Uttar Pradesh (NCR)
                    </p>
                  </div>
                  <a
                    href={getCallUrl()}
                    className="flex items-center gap-3 text-text-secondary text-sm hover:text-brand-primary transition font-sans"
                  >
                    <Phone size={20} className="text-brand-primary" />
                    {PHONE_NUMBER}
                  </a>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="flex items-center gap-3 text-text-secondary text-sm hover:text-brand-primary transition font-sans"
                  >
                    <Mail size={20} className="text-brand-primary" />
                    {CONTACT_EMAIL}
                  </a>
                  <div className="rounded-2xl border border-border/60 bg-brand-light/60 px-4 py-3">
                    <p className="mb-2 text-xs font-bold uppercase tracking-wider text-text-muted">
                      Email aliases
                    </p>
                    <ul className="space-y-1.5">
                      {EMAIL_ALIASES.map((item) => (
                        <li key={item.email}>
                          <a
                            href={`mailto:${item.email}`}
                            className="flex items-center justify-between gap-2 text-sm text-text-secondary transition hover:text-brand-primary"
                          >
                            <span className="font-medium text-text-primary">{item.label}</span>
                            <span className="truncate font-mono text-xs">{item.email}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex items-center gap-3 text-text-secondary text-sm font-sans">
                    <Clock size={20} className="text-brand-primary" />
                    <div>
                      Mon–Sat: 9:00 AM – 7:00 PM
                      <br />
                      Sunday: By appointment
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <a href={getCallUrl()} className="btn-charcoal justify-center !py-3 text-sm">
                  <Phone size={16} /> Call Now
                </a>
                <a
                  href={getWhatsAppUrl(
                    `Hello! I found ${SITE_NAME} and I'd like to discuss property in Greater Noida / Noida / Yamuna Expressway.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp justify-center !py-3 text-sm"
                >
                  <MessageCircle size={16} /> WhatsApp
                </a>
                <a
                  href="https://www.instagram.com/aurixxrealty"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary justify-center !py-3 text-sm"
                >
                  <Instagram size={16} /> Instagram
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary justify-center !py-3 text-sm"
                >
                  <Linkedin size={16} /> LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="h-[350px] md:h-[450px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112183.0!2d77.5040!3d28.4744!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5a43173357b%3A0x37ffce30c87cc03f!2sGreater%20Noida%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            title={`${SITE_NAME} Office Location`}
          />
        </div>
      </section>

    </>
  )
}
