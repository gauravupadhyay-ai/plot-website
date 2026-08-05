import { supabase } from '@/lib/supabase'
import {
  Users,
  Map,
  PlusCircle,
  MessageSquare,
  ShieldCheck,
  ArrowRight,
  FileText,
} from 'lucide-react'
import Link from 'next/link'
import { BlogApiConfigCard } from '@/app/admin/(dashboard)/dashboard/BlogApiConfigCard'
import { SITE_NAME, SITE_URL } from '@/lib/utils'

async function getBlogPostCount(): Promise<number> {
  try {
    const { count } = await supabase
      .from('blog_posts')
      .select('*', { count: 'exact', head: true })
    return count || 0
  } catch {
    return 0
  }
}

export default async function DashboardOverview() {
  const [{ count: leadsCount }, { count: propertiesCount }, { data: recentLeads }, blogCount] =
    await Promise.all([
      supabase.from('leads').select('*', { count: 'exact', head: true }),
      supabase.from('properties').select('*', { count: 'exact', head: true }),
      supabase.from('leads').select('*').order('created_at', { ascending: false }).limit(8),
      getBlogPostCount(),
    ])

  const contactLeads = (recentLeads || []).filter((l) =>
    String(l.source || '').toLowerCase().includes('contact')
  ).length

  const stats = [
    {
      label: 'Total Plots',
      value: propertiesCount || 0,
      icon: Map,
      color: 'text-brand-primary',
      bg: 'bg-brand-light',
    },
    {
      label: 'Inquiry Leads',
      value: leadsCount || 0,
      icon: MessageSquare,
      color: 'text-brand-accent',
      bg: 'bg-brand-accent/10',
    },
    {
      label: 'Blog Posts',
      value: blogCount,
      icon: FileText,
      color: 'text-text-secondary',
      bg: 'bg-gray-50',
    },
  ]

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header className="flex flex-col gap-1">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-brand-primary">
          Overview
        </h1>
        <p className="text-text-secondary text-sm md:text-base font-sans">
          {SITE_NAME} — real-time plot inventory and inquiry metrics.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="group p-6 md:p-8 bg-white/80 backdrop-blur-sm rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex items-center gap-4 mb-4">
              <div
                className={`p-4 ${stat.bg} rounded-2xl transition-transform group-hover:scale-110`}
              >
                <stat.icon className={stat.color} size={28} />
              </div>
              <div>
                <h3 className="text-gray-500 font-bold text-[10px] md:text-xs uppercase tracking-[0.2em]">
                  {stat.label}
                </h3>
                <p className="text-3xl md:text-5xl font-mono font-bold text-brand-primary">
                  {stat.value}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-gray-100 bg-white p-8 shadow-sm">
          <h3 className="relative z-10 mb-6 font-display text-2xl font-bold text-brand-primary">
            Quick Management
          </h3>
          <div className="relative z-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Link
              href="/admin/properties"
              className="group flex items-center gap-3 rounded-2xl border border-border bg-brand-light p-4 transition-colors hover:bg-gray-100"
            >
              <div className="rounded-lg bg-white p-2 shadow-sm">
                <Map size={20} className="text-brand-primary" />
              </div>
              <span className="font-sans font-medium text-brand-primary">Edit Plots</span>
              <ArrowRight size={16} className="ml-auto text-brand-primary opacity-0 transition-all group-hover:opacity-100" />
            </Link>
            <Link
              href="/admin/properties/add"
              className="group flex items-center gap-3 rounded-2xl border border-border bg-gray-50 p-4 transition-colors hover:bg-gray-100"
            >
              <div className="rounded-lg bg-white p-2 shadow-sm">
                <PlusCircle size={20} className="text-brand-primary" />
              </div>
              <span className="font-sans font-medium text-brand-primary">Add Plot</span>
              <ArrowRight size={16} className="ml-auto text-brand-primary opacity-0 transition-all group-hover:opacity-100" />
            </Link>
            <Link
              href="/admin/leads"
              className="group flex items-center gap-3 rounded-2xl border border-border bg-gray-50 p-4 transition-colors hover:bg-gray-100 sm:col-span-2"
            >
              <div className="rounded-lg bg-white p-2 shadow-sm">
                <Users size={20} className="text-brand-accent" />
              </div>
              <span className="font-sans font-medium text-brand-primary">Leads &amp; Contact Submissions</span>
              <ArrowRight size={16} className="ml-auto text-brand-accent opacity-0 transition-all group-hover:opacity-100" />
            </Link>
          </div>
          <p className="mt-4 text-xs text-text-muted">
            Contact form submissions and plot enquiries both appear under Leads.
            {contactLeads > 0 ? ` ${contactLeads} recent contact lead(s) below.` : ''}
          </p>
        </div>

        <div className="flex flex-col items-center justify-center rounded-[2.5rem] border border-gray-100 bg-white p-8 text-center shadow-sm">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-50">
            <div className="flex h-10 w-10 animate-pulse items-center justify-center rounded-full bg-green-100">
              <ShieldCheck className="text-green-600" size={24} />
            </div>
          </div>
          <h3 className="font-display text-xl font-bold text-brand-primary">System Fully Operational</h3>
          <p className="mt-2 px-8 font-sans text-sm text-text-secondary">
            Database, Storage, and API endpoints are synchronized and performing optimally.
          </p>
        </div>
      </div>

      <div className="rounded-[2.5rem] border border-gray-100 bg-white p-6 shadow-sm md:p-8">
        <div className="mb-5 flex items-center justify-between gap-3">
          <h3 className="font-display text-2xl font-bold text-brand-primary">Recent Leads</h3>
          <Link href="/admin/leads" className="text-sm font-bold text-brand-primary underline-offset-2 hover:underline">
            View all
          </Link>
        </div>
        {(recentLeads || []).length === 0 ? (
          <p className="py-8 text-center text-sm text-text-secondary">
            No leads yet. Contact form and enquiry submissions will show here.
          </p>
        ) : (
          <ul className="divide-y divide-gray-100">
            {(recentLeads || []).map((lead) => (
              <li key={lead.id} className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-bold text-brand-primary">{lead.name}</p>
                  <p className="text-xs text-text-secondary">
                    {lead.phone}
                    {lead.email ? ` · ${lead.email}` : ''}
                  </p>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-xs font-bold uppercase tracking-wide text-brand-accent">
                    {lead.source || 'Website'}
                  </p>
                  <p className="text-[11px] text-text-muted">
                    {new Date(lead.created_at).toLocaleString('en-IN', {
                      day: '2-digit',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <BlogApiConfigCard
        blogApiUrl={process.env.NEXT_PUBLIC_BLOG_API_URL || `${SITE_URL}/api/blogs`}
        blogApiKey={process.env.BLOG_API_KEY || ''}
        blogCount={blogCount}
      />
    </div>
  )
}
