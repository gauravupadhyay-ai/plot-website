'use client'
import { useState } from 'react'
import { ArrowLeft, ArrowRight, CheckCircle2, Upload } from 'lucide-react'
import { SITE_NAME } from '@/lib/utils'

const totalSteps = 6

export function PostPropertyClient() {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)

  const next = () => setStep((s) => Math.min(s + 1, totalSteps))
  const prev = () => setStep((s) => Math.max(s - 1, 1))
  const handleSubmit = () => setSubmitted(true)

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
                        defaultChecked={opt === 'Sell'}
                      />
                      <span className="font-medium font-sans">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold mb-1.5 block font-sans">Listing Type *</label>
                <select className="select" defaultValue="Plot">
                  <option value="Plot">Residential Plot</option>
                  <option value="Plot Investment">Investment Plot</option>
                  <option value="Commercial Plot">Commercial Plot</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold mb-1.5 block font-sans">Plot Facing</label>
                  <select className="select">
                    <option>North</option>
                    <option>South</option>
                    <option>East</option>
                    <option>West</option>
                    <option>North-East</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold mb-1.5 block font-sans">Road Width</label>
                  <select className="select">
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
                <input className="input" defaultValue="Greater Noida" />
              </div>
              <div>
                <label className="text-sm font-semibold mb-1.5 block font-sans">Locality *</label>
                <select className="select">
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
                <label className="text-sm font-semibold mb-1.5 block font-sans">
                  Landmark / Address
                </label>
                <input className="input" placeholder="Near..." />
              </div>
              <div>
                <label className="text-sm font-semibold mb-1.5 block font-sans">PIN Code</label>
                <input className="input" placeholder="201310" />
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="font-display font-bold text-xl mb-4">Plot Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold mb-1.5 block font-sans">
                    Plot Area (sq.yd.)
                  </label>
                  <input className="input" type="number" />
                </div>
                <div>
                  <label className="text-sm font-semibold mb-1.5 block font-sans">
                    Plot Area (sq.ft.)
                  </label>
                  <input className="input" type="number" />
                </div>
                <div>
                  <label className="text-sm font-semibold mb-1.5 block font-sans">Dimensions</label>
                  <input className="input" placeholder="e.g. 30 x 40" />
                </div>
                <div>
                  <label className="text-sm font-semibold mb-1.5 block font-sans">
                    Ownership Type
                  </label>
                  <select className="select">
                    <option>Freehold</option>
                    <option>Leasehold</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold mb-1.5 block font-sans">Approvals</label>
                <select className="select">
                  <option>NA / Approved</option>
                  <option>Gamtal</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold mb-1.5 block font-sans">Facing</label>
                <select className="select">
                  <option>North</option>
                  <option>South</option>
                  <option>East</option>
                  <option>West</option>
                </select>
              </div>
            </div>
          )}
          {step === 4 && (
            <div className="space-y-4">
              <h3 className="font-display font-bold text-xl mb-4">Pricing</h3>
              <div>
                <label className="text-sm font-semibold mb-1.5 block font-sans">
                  Expected Price (₹) *
                </label>
                <input className="input" type="number" placeholder="e.g. 2500000" />
              </div>
              <div>
                <label className="text-sm font-semibold mb-1.5 block font-sans">
                  Price Negotiable?
                </label>
                <div className="flex gap-3 font-sans">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="negotiable" value="yes" className="accent-brand-primary" />{' '}
                    Yes
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="negotiable" value="no" className="accent-brand-primary" />{' '}
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
                <input className="input" required />
              </div>
              <div>
                <label className="text-sm font-semibold mb-1.5 block font-sans">Phone Number *</label>
                <input className="input" type="tel" required />
              </div>
              <div>
                <label className="text-sm font-semibold mb-1.5 block font-sans">Email</label>
                <input className="input" type="email" />
              </div>
            </div>
          )}
          {step === 6 && (
            <div className="space-y-4">
              <h3 className="font-display font-bold text-xl mb-4">Photos</h3>
              <div className="border-2 border-dashed border-border rounded-2xl p-12 text-center hover:border-brand-primary/50 transition-colors cursor-pointer">
                <Upload size={40} className="text-text-muted mx-auto mb-3" />
                <p className="text-text-secondary font-medium font-sans">
                  Drag & drop plot photos here
                </p>
                <p className="text-text-muted text-sm mt-1 font-sans">Max 10 photos, 5MB each</p>
                <input type="file" multiple accept="image/*" className="hidden" />
              </div>
            </div>
          )}

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
              <button type="button" onClick={handleSubmit} className="btn-primary !py-2.5">
                Submit Plot <CheckCircle2 size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
