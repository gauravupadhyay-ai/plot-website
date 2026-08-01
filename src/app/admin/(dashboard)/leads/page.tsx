import { supabase } from '@/lib/supabase'
import { Calendar, User, Phone, Mail, MessageSquare, Info } from 'lucide-react'

// Ensure we re-fetch effectively
export const revalidate = 0

export default async function LeadsPage() {
  const { data: leads } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-serif font-bold text-teal-950">Client Inquiries</h1>
        <p className="text-text-secondary mt-1">Manage and track all property inquiries from your website.</p>
      </header>

      <div className="bg-white/70 backdrop-blur-md rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
        {/* Desktop View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-6 py-4 font-bold text-teal-900 uppercase tracking-wider text-xs">Received</th>
                <th className="px-6 py-4 font-bold text-teal-900 uppercase tracking-wider text-xs">Customer</th>
                <th className="px-6 py-4 font-bold text-teal-900 uppercase tracking-wider text-xs">Context</th>
                <th className="px-6 py-4 font-bold text-teal-900 uppercase tracking-wider text-xs">Message</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium text-sm">
              {leads && leads.map(lead => (
                <tr key={lead.id} className="hover:bg-teal-50/30 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="text-teal-950">
                        {new Date(lead.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                      </span>
                      <span className="text-[10px] text-teal-600 uppercase">
                        {new Date(lead.created_at).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-teal-950 font-bold">{lead.name}</span>
                      <span className="text-xs text-gray-500 font-normal">{lead.phone}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-teal-800">{lead.property_code || lead.property_type || 'General'}</span>
                      {lead.source && <span className="text-[10px] text-brand-accent uppercase tracking-tighter">{lead.source}</span>}
                    </div>
                  </td>
                  <td className="px-6 py-4 max-w-xs transition-all">
                    <p className="line-clamp-2 text-gray-600 font-normal leading-snug" title={lead.message}>
                      {lead.message || '-'}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className="md:hidden space-y-4 p-4 text-sm">
          {leads && leads.map(lead => (
            <div key={lead.id} className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col p-6 space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-teal-50 rounded-[1.25rem] flex items-center justify-center text-teal-600 shadow-inner">
                    <User size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-teal-950 leading-tight">{lead.name}</h3>
                    <div className="text-[10px] text-teal-600 font-bold uppercase tracking-widest flex items-center gap-1.5 mt-0.5">
                      <Calendar size={12} /> {new Date(lead.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                    </div>
                  </div>
                </div>
                <div className="bg-brand-accent/10 border border-brand-accent/20 text-brand-secondary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter">
                  {lead.property_code || 'General'}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <a href={`tel:${lead.phone}`} className="flex items-center justify-center gap-2 py-3.5 bg-teal-900 text-white rounded-2xl shadow-lg shadow-teal-900/10 active:scale-95 transition-all text-xs font-bold">
                  <Phone size={14} /> Call Now
                </a>
                {lead.email ? (
                  <a href={`mailto:${lead.email}`} className="flex items-center justify-center gap-2 py-3.5 bg-white border border-gray-100 rounded-2xl shadow-sm text-teal-900 active:scale-95 transition-all text-xs font-bold">
                    <Mail size={14} /> E-mail
                  </a>
                ) : (
                  <div className="flex items-center justify-center gap-2 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-gray-400 text-xs font-bold cursor-not-allowed">
                    <Mail size={14} /> No Email
                  </div>
                )}
              </div>

              {lead.message && (
                <div className="p-4 bg-gray-50/80 rounded-[1.5rem] border border-gray-100 relative group">
                  <MessageSquare size={16} className="absolute -top-3 -left-3 text-brand-accent bg-white rounded-full p-0.5 shadow-sm" />
                  <p className="text-gray-600 italic leading-relaxed text-xs">&ldquo;{lead.message}&rdquo;</p>
                </div>
              )}
              
              {lead.source && (
                <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-widest pl-1">
                  <Info size={12} className="text-teal-400" /> Source: <span className="text-teal-900">{lead.source}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {(!leads || leads.length === 0) && (
          <div className="px-6 py-20 text-center">
            <MessageSquare className="mx-auto text-gray-200 mb-4" size={48} />
            <p className="text-gray-500 font-medium">No leads generated yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}
