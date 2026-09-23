'use client'

import { FormEvent, useState } from 'react'
import { CheckCircle2, Send } from 'lucide-react'

export function CareerApplyForm({ roles }: { roles: { title: string }[] }) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')
  const [note, setNote] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          email,
          userType: 'Job applicant',
          propertyType: role,
          source: 'Careers',
          message: [`Role: ${role}`, note.trim() ? `Note: ${note.trim()}` : ''].filter(Boolean).join('\n'),
        }),
      })

      if (!res.ok) {
        setError('We could not save this application. Please try again.')
        return
      }

      setSubmitted(true)
    } catch {
      setError('We could not save this application. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="py-10 text-center">
        <CheckCircle2 size={48} className="mx-auto mb-4 text-brand-primary" />
        <h3 className="font-display text-xl font-bold">Application received</h3>
        <p className="mt-2 font-sans text-text-secondary">We will contact you about this role.</p>
      </div>
    )
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1.5 block font-sans text-sm font-semibold">Full Name *</label>
          <input className="input" required value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label className="mb-1.5 block font-sans text-sm font-semibold">Phone *</label>
          <input className="input" type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
      </div>
      <div>
        <label className="mb-1.5 block font-sans text-sm font-semibold">Email *</label>
        <input className="input" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label className="mb-1.5 block font-sans text-sm font-semibold">Role Applying For *</label>
        <select className="select" required value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="">Select role</option>
          {roles.map((item) => (
            <option key={item.title} value={item.title}>
              {item.title}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="mb-1.5 block font-sans text-sm font-semibold">Note</label>
        <textarea
          className="textarea"
          rows={4}
          placeholder="A short note, or a link to your CV."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </div>
      {error ? <p className="font-sans text-sm text-red-600">{error}</p> : null}
      <button type="submit" disabled={loading} className="btn-primary w-full">
        <Send size={16} /> {loading ? 'Sending...' : 'Submit Application'}
      </button>
    </form>
  )
}
