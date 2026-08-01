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
  const { count: leadsCount } = await supabase
    .from('leads')
    .select('*', { count: 'exact', head: true })
  const { count: propertiesCount } = await supabase
    .from('properties')
    .select('*', { count: 'exact', head: true })
  const blogCount = await getBlogPostCount()

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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="p-8 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm relative overflow-hidden group">
          <h3 className="text-2xl font-display font-bold text-brand-primary mb-6 relative z-10">
            Quick Management
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
            <Link
              href="/admin/properties/add"
              className="flex items-center gap-3 p-4 bg-brand-light hover:bg-gray-100 transition-colors rounded-2xl border border-border group"
            >
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <PlusCircle size={20} className="text-brand-primary" />
              </div>
              <span className="font-medium text-brand-primary font-sans">Add Plot</span>
              <ArrowRight
                size={16}
                className="ml-auto text-brand-primary opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all"
              />
            </Link>
            <Link
              href="/admin/leads"
              className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-gray-100 transition-colors rounded-2xl border border-border group"
            >
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <Users size={20} className="text-brand-accent" />
              </div>
              <span className="font-medium text-brand-primary font-sans">Recent Leads</span>
              <ArrowRight
                size={16}
                className="ml-auto text-brand-accent opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all"
              />
            </Link>
          </div>
        </div>

        <div className="p-8 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col justify-center items-center text-center">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center animate-pulse">
              <ShieldCheck className="text-green-600" size={24} />
            </div>
          </div>
          <h3 className="text-xl font-bold text-brand-primary font-display">
            System Fully Operational
          </h3>
          <p className="text-text-secondary text-sm px-8 mt-2 font-sans">
            Database, Storage, and API endpoints are synchronized and performing optimally.
          </p>
        </div>
      </div>

      <BlogApiConfigCard
        blogApiUrl={process.env.NEXT_PUBLIC_BLOG_API_URL || `${SITE_URL}/api/blogs`}
        blogApiKey={process.env.BLOG_API_KEY || ''}
        blogCount={blogCount}
      />
    </div>
  )
}
