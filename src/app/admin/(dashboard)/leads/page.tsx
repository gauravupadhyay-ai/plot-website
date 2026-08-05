import { supabase } from '@/lib/supabase'
import { Calendar, User, Phone, Mail, MessageSquare, Info } from 'lucide-react'

export const revalidate = 0
export const dynamic = 'force-dynamic'

function sourceBadge(source?: string | null) {
  const s = (source || '').toLowerCase()
  if (s.includes('contact')) return { label: 'Contact Form', className: 'bg-sky-100 text-sky-800' }
  if (s.includes('plot') || s.includes('property detail')) {
    return { label: 'Plot Enquiry', className: 'bg-amber-100 text-amber-800' }
  }
  if (s.includes('lead magnet') || s.includes('callback')) {
    return { label: 'Lead Magnet', className: 'bg-violet-100 text-violet-800' }
  }
  return { label: source || 'Website', className: 'bg-gray-100 text-gray-700' }
}

export default async function LeadsPage() {
  const { data: leads, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })

  const contactCount = (leads || []).filter((l) =>
    String(l.source || '').toLowerCase().includes('contact')
  ).length
  const plotCount = (leads || []).filter((l) =>
    /plot|property detail/i.test(String(l.source || ''))
  ).length

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-brand-primary">Leads &amp; Contact</h1>
          <p className="mt-1 text-sm text-text-secondary">
            Contact form submissions and plot enquiries from the website.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 text-xs font-bold">
          <span className="rounded-full bg-brand-light px-3 py-1.5 text-brand-primary">
            Total {leads?.length || 0}
          </span>
          <span className="rounded-full bg-sky-100 px-3 py-1.5 text-sky-800">Contact {contactCount}</span>
          <span className="rounded-full bg-amber-100 px-3 py-1.5 text-amber-800">Plot {plotCount}</span>
        </div>
      </header>

      {error && (
        <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
          Could not load leads: {error.message}
        </div>
      )}

      <div className="overflow-hidden rounded-[2rem] border border-gray-100 bg-white/70 shadow-sm backdrop-blur-md">
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-brand-primary">Received</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-brand-primary">Customer</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-brand-primary">Source</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-brand-primary">Context</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-brand-primary">Message</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {(leads || []).map((lead) => {
                const badge = sourceBadge(lead.source)
                return (
                  <tr key={lead.id} className="transition-colors hover:bg-brand-light/40">
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex flex-col">
                        <span>
                          {new Date(lead.created_at).toLocaleDateString('en-IN', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </span>
                        <span className="text-[10px] uppercase text-text-muted">
                          {new Date(lead.created_at).toLocaleTimeString('en-IN', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-brand-primary">{lead.name}</span>
                        <a href={`tel:${lead.phone}`} className="text-xs text-text-secondary hover:underline">
                          {lead.phone}
                        </a>
                        {lead.email && (
                          <a href={`mailto:${lead.email}`} className="text-xs text-text-muted hover:underline">
                            {lead.email}
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${badge.className}`}>
                        {badge.label}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-0.5">
                        <span>{lead.property_code || lead.property_type || 'General'}</span>
                        {lead.budget_range && (
                          <span className="text-[10px] text-text-muted">Budget: {lead.budget_range}</span>
                        )}
                        {lead.user_type && (
                          <span className="text-[10px] text-text-muted">User: {lead.user_type}</span>
                        )}
                      </div>
                    </td>
                    <td className="max-w-xs px-6 py-4">
                      <p className="line-clamp-3 leading-snug text-text-secondary" title={lead.message || ''}>
                        {lead.message || '—'}
                      </p>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div className="space-y-4 p-4 text-sm md:hidden">
          {(leads || []).map((lead) => {
            const badge = sourceBadge(lead.source)
            return (
              <div
                key={lead.id}
                className="flex flex-col space-y-5 rounded-[2.5rem] border border-gray-100 bg-white p-6 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-[1.25rem] bg-brand-light text-brand-primary shadow-inner">
                      <User size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold leading-tight text-brand-primary">{lead.name}</h3>
                      <div className="mt-0.5 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-text-muted">
                        <Calendar size={12} />{' '}
                        {new Date(lead.created_at).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                        })}
                      </div>
                    </div>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase ${badge.className}`}>
                    {badge.label}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={`tel:${lead.phone}`}
                    className="flex items-center justify-center gap-2 rounded-2xl bg-brand-primary py-3.5 text-xs font-bold text-white"
                  >
                    <Phone size={14} /> Call
                  </a>
                  {lead.email ? (
                    <a
                      href={`mailto:${lead.email}`}
                      className="flex items-center justify-center gap-2 rounded-2xl border border-gray-100 bg-white py-3.5 text-xs font-bold text-brand-primary"
                    >
                      <Mail size={14} /> Email
                    </a>
                  ) : (
                    <div className="flex items-center justify-center gap-2 rounded-2xl border border-gray-100 bg-gray-50 py-3.5 text-xs font-bold text-gray-400">
                      <Mail size={14} /> No email
                    </div>
                  )}
                </div>

                {lead.message && (
                  <div className="relative rounded-[1.5rem] border border-gray-100 bg-gray-50/80 p-4">
                    <MessageSquare size={16} className="absolute -left-3 -top-3 rounded-full bg-white p-0.5 text-brand-accent shadow-sm" />
                    <p className="text-xs italic leading-relaxed text-text-secondary">&ldquo;{lead.message}&rdquo;</p>
                  </div>
                )}

                <div className="flex items-center gap-2 pl-1 text-[10px] font-bold uppercase tracking-widest text-text-muted">
                  <Info size={12} /> {lead.property_code || lead.property_type || 'General'}
                  {lead.source ? ` · ${lead.source}` : ''}
                </div>
              </div>
            )
          })}
        </div>

        {(!leads || leads.length === 0) && (
          <div className="px-6 py-20 text-center">
            <MessageSquare className="mx-auto mb-4 text-gray-200" size={48} />
            <p className="font-medium text-gray-500">No contact or enquiry leads yet.</p>
            <p className="mt-1 text-xs text-text-muted">
              Submissions from the Contact page and plot enquiry forms will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
