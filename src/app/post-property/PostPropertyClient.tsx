'use client'

import { useState } from 'react'
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react'
import { SITE_NAME } from '@/lib/utils'

const totalSteps = 6

const emptyForm = {
  purpose: 'Sell',
  propertyType: 'Plot',
  facing: 'North',
  roadWidth: '20 ft',
  city: 'Greater Noida',
  locality: '',
  address: '',
  pinCode: '',
  areaSqYd: '',
  areaSqFt: '',
  dimensions: '',
  ownership: 'Freehold',
  approvals: 'NA / Approved',
  price: '',
  negotiable: '',
  ownerName: '',
  phone: '',
  email: '',
  notes: '',
}

export function PostPropertyClient() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState(emptyForm)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const set = (key: keyof typeof emptyForm, value: string) => {
    setForm((current) => ({ ...current, [key]: value }))
  }

  const next = () => setStep((current) => Math.min(current + 1, totalSteps))
  const prev = () => setStep((current) => Math.max(current - 1, 1))

  const handleSubmit = async () => {
    if (!form.ownerName.trim() || !form.phone.trim()) {
      setError('Add the owner name and phone number so we can reach you.')
      setStep(5)
      return
    }

    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/post-property', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        setError('We could not save this listing. Please try again.')
        return
      }
      setSubmitted(true)
    } catch {
      setError('We could not save this listing. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <section className="py-24 bg-brand-light">
        <div className="section-container text-center max-w-lg mx-auto">
          <CheckCircle2 size={64} className="text-brand-primary mx-auto mb-6" />
          <h2 className="font-display font-bold text-2xl mb-4">Plot Submitted Successfully!</h2>
          <p className="text-text-secondary mb-8 font-sans">
            Our team at {SITE_NAME} will contact you within 24 hours to verify and list your plot.
          </p>
          <a href="/" className="btn-primary">
            Back to Home
          </a>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 md:py-16 bg-brand-light">
      <div className="section-container max-w-2xl mx-auto">
        <div className="mb-8">
          <div className="flex justify-between text-xs text-text-muted mb-2 font-sans">
            <span>
              Step {step} of {totalSteps}
            </span>
            <span>{Math.round((step / totalSteps) * 100)}%</span>
          </div>
          <div className="h-2 bg-border rounded-full overflow-hidden">
            <div
              className="h-full bg-brand-primary rounded-full transition-all duration-500"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        <div className="card p-6 md:p-8 !rounded-2xl">
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="font-display font-bold text-xl mb-4">Plot Basics</h3>
              <div>
                <label className="text-sm font-semibold mb-1.5 block font-sans">I want to *</label>
                <div className="flex gap-3">
                  {['Sell', 'Rent'].map((opt) => (
                    <label
                      key={opt}
                      className="flex-1 flex items-center justify-center gap-2 p-3 bg-brand-light rounded-xl cursor-pointer hover:bg-brand-primary/10 transition border border-transparent has-[:checked]:border-brand-primary"
                    >
                      <input
                        type="radio"
                        name="purpose"
                        value={opt}
                        className="accent-brand-primary"
                        checked={form.purpose === opt}
                        onChange={() => set('purpose', opt)}
                      />
                      <span className="font-medium font-sans">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold mb-1.5 block font-sans">Listing Type *</label>
                <select className="select" value={form.propertyType} onChange={(e) => set('propertyType', e.target.value)}>
                  <option value="Plot">Residential Plot</option>
                  <option value="Plot Investment">Investment Plot</option>
                  <option value="Commercial Plot">Commercial Plot</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold mb-1.5 block font-sans">Plot Facing</label>
                  <select className="select" value={form.facing} onChange={(e) => set('facing', e.target.value)}>
                    <option>North</option>
                    <option>South</option>
                    <option>East</option>
                    <option>West</option>
                    <option>North-East</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold mb-1.5 block font-sans">Road Width</label>
                  <select className="select" value={form.roadWidth} onChange={(e) => set('roadWidth', e.target.value)}>
                    <option>20 ft</option>
                    <option>30 ft</option>
                    <option>40 ft</option>
                    <option>60 ft+</option>
                  </select>
                </div>
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="font-display font-bold text-xl mb-4">Location</h3>
              <div>
                <label className="text-sm font-semibold mb-1.5 block font-sans">City</label>
                <input className="input" value={form.city} onChange={(e) => set('city', e.target.value)} />
              </div>
              <div>
                <label className="text-sm font-semibold mb-1.5 block font-sans">Locality *</label>
                <select className="select" value={form.locality} onChange={(e) => set('locality', e.target.value)}>
                  <option value="">Select</option>
                  <option>Yamuna Expressway</option>
                  <option>Greater Noida</option>
                  <option>Sector 153, Noida</option>
                  <option>Vrindavan</option>
                  <option>Knowledge Park 3, Greater Noida</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold mb-1.5 block font-sans">Landmark / Address</label>
                <input
                  className="input"
                  placeholder="Near..."
                  value={form.address}
                  onChange={(e) => set('address', e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-semibold mb-1.5 block font-sans">PIN Code</label>
                <input
                  className="input"
                  placeholder="201310"
                  value={form.pinCode}
                  onChange={(e) => set('pinCode', e.target.value)}
                />
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="font-display font-bold text-xl mb-4">Plot Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold mb-1.5 block font-sans">Plot Area (sq.yd.)</label>
                  <input className="input" type="number" value={form.areaSqYd} onChange={(e) => set('areaSqYd', e.target.value)} />
                </div>
                <div>
                  <label className="text-sm font-semibold mb-1.5 block font-sans">Plot Area (sq.ft.)</label>
                  <input className="input" type="number" value={form.areaSqFt} onChange={(e) => set('areaSqFt', e.target.value)} />
                </div>
                <div>
                  <label className="text-sm font-semibold mb-1.5 block font-sans">Dimensions</label>
                  <input
                    className="input"
                    placeholder="e.g. 30 x 40"
                    value={form.dimensions}
                    onChange={(e) => set('dimensions', e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold mb-1.5 block font-sans">Ownership Type</label>
                  <select className="select" value={form.ownership} onChange={(e) => set('ownership', e.target.value)}>
                    <option>Freehold</option>
                    <option>Leasehold</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold mb-1.5 block font-sans">Approvals</label>
                <select className="select" value={form.approvals} onChange={(e) => set('approvals', e.target.value)}>
                  <option>NA / Approved</option>
                  <option>Gamtal</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
          )}
          {step === 4 && (
            <div className="space-y-4">
              <h3 className="font-display font-bold text-xl mb-4">Pricing</h3>
              <div>
                <label className="text-sm font-semibold mb-1.5 block font-sans">Expected Price (₹) *</label>
                <input
                  className="input"
                  type="number"
                  placeholder="e.g. 2500000"
                  value={form.price}
                  onChange={(e) => set('price', e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-semibold mb-1.5 block font-sans">Price Negotiable?</label>
                <div className="flex gap-3 font-sans">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="negotiable"
                      value="Yes"
                      className="accent-brand-primary"
                      checked={form.negotiable === 'Yes'}
                      onChange={() => set('negotiable', 'Yes')}
                    />{' '}
                    Yes
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="negotiable"
                      value="No"
                      className="accent-brand-primary"
                      checked={form.negotiable === 'No'}
                      onChange={() => set('negotiable', 'No')}
                    />{' '}
                    No
                  </label>
                </div>
              </div>
            </div>
          )}
          {step === 5 && (
            <div className="space-y-4">
              <h3 className="font-display font-bold text-xl mb-4">Contact Details</h3>
              <div>
                <label className="text-sm font-semibold mb-1.5 block font-sans">Owner Name *</label>
                <input className="input" required value={form.ownerName} onChange={(e) => set('ownerName', e.target.value)} />
              </div>
              <div>
                <label className="text-sm font-semibold mb-1.5 block font-sans">Phone Number *</label>
                <input className="input" type="tel" required value={form.phone} onChange={(e) => set('phone', e.target.value)} />
              </div>
              <div>
                <label className="text-sm font-semibold mb-1.5 block font-sans">Email</label>
                <input className="input" type="email" value={form.email} onChange={(e) => set('email', e.target.value)} />
              </div>
            </div>
          )}
          {step === 6 && (
            <div className="space-y-4">
              <h3 className="font-display font-bold text-xl mb-4">Anything else</h3>
              <div>
                <label className="text-sm font-semibold mb-1.5 block font-sans">Notes</label>
                <textarea
                  className="textarea"
                  rows={5}
                  placeholder="Plot size, possession, or a link to photos."
                  value={form.notes}
                  onChange={(e) => set('notes', e.target.value)}
                />
              </div>
              <p className="text-sm text-text-secondary font-sans">
                These details are saved for the team. We will call you to confirm the listing.
              </p>
            </div>
          )}

          {error ? <p className="mt-4 text-sm text-red-600 font-sans">{error}</p> : null}

          <div className="flex justify-between mt-8 pt-6 border-t border-border">
            {step > 1 ? (
              <button type="button" onClick={prev} className="btn-secondary !py-2.5">
                <ArrowLeft size={16} /> Previous
              </button>
            ) : (
              <div />
            )}
            {step < totalSteps ? (
              <button type="button" onClick={next} className="btn-primary !py-2.5">
                Next <ArrowRight size={16} />
              </button>
            ) : (
              <button type="button" onClick={handleSubmit} disabled={loading} className="btn-primary !py-2.5">
                <CheckCircle2 size={16} /> {loading ? 'Saving...' : 'Submit Plot'}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
