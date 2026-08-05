'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { mergeAdminInventory, type AdminListProperty } from '@/lib/adminProperty'
import { Plus, Trash2, MapPin, Map, Pencil, ExternalLink } from 'lucide-react'

export default function AdminPropertiesPage() {
  const [properties, setProperties] = useState<AdminListProperty[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchProperties = async () => {
    setLoading(true)
    setError('')
    const { data, error: fetchError } = await supabase
      .from('properties')
      .select('*')
      .order('created_at', { ascending: false })

    if (fetchError) {
      setError(fetchError.message)
      // Still show seed inventory even if DB fails
      setProperties(mergeAdminInventory([]))
    } else {
      setProperties(mergeAdminInventory((data || []) as Record<string, unknown>[]))
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchProperties()
  }, [])

  const handleDelete = async (prop: AdminListProperty) => {
    if (!prop.id) {
      alert('This plot is from the website seed file. Save it once via Edit first, then you can delete the database copy.')
      return
    }
    if (!confirm(`Delete "${prop.title}" from the database?`)) return
    await supabase.from('properties').delete().eq('id', prop.id)
    fetchProperties()
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-display text-3xl font-bold text-brand-primary">Plots Inventory</h1>
          <p className="mt-1 text-sm text-text-secondary">
            <strong>Edit</strong> updates a previous listing. <strong>Add New Plot</strong> creates an
            extra listing with location + 360° fields.
          </p>
        </div>
        <Link
          href="/admin/properties/add"
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-primary px-6 py-3 font-sans font-medium text-white shadow-lg shadow-brand-primary/20 transition-all hover:bg-black/90 sm:w-auto"
        >
          <Plus size={20} /> Add New Plot
        </Link>
      </div>

      {error && (
        <div className="rounded-2xl border border-amber-100 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Database warning: {error}. Showing seed inventory so you can still edit and save plots.
        </div>
      )}

      <div className="overflow-hidden rounded-[2rem] border border-gray-100 bg-white/70 shadow-sm backdrop-blur-md">
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-brand-primary">Plot</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-brand-primary">Location</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-brand-primary">Price</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-brand-primary">Source</th>
                <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-brand-primary">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center font-medium text-gray-500">
                    Loading inventory...
                  </td>
                </tr>
              ) : (
                properties.map((prop) => (
                  <tr key={prop.editKey} className="group transition-colors hover:bg-brand-light/50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl bg-gray-100 shadow-sm">
                          {prop.images?.[0] ? (
                            <Image src={prop.images[0]} alt="" fill sizes="56px" className="object-cover" />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center">
                              <Map size={20} className="text-gray-300" />
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="max-w-[220px] truncate font-bold text-brand-primary">{prop.title}</div>
                          <div className="mt-1 font-mono text-xs uppercase tracking-tighter text-text-muted">
                            {prop.code}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 font-sans text-sm text-gray-600">
                        <MapPin size={14} className="text-brand-accent" />
                        {prop.locality}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-mono font-bold text-brand-primary">{prop.price_label}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${
                          prop.source === 'seed'
                            ? 'bg-violet-100 text-violet-800'
                            : prop.source === 'both'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-sky-100 text-sky-800'
                        }`}
                      >
                        {prop.source === 'seed' ? 'Website seed' : prop.source === 'both' ? 'Saved' : 'Database'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/properties/${prop.slug}`}
                          target="_blank"
                          className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold text-text-secondary transition-all hover:bg-gray-100"
                          title="View on site"
                        >
                          <ExternalLink size={14} /> View
                        </Link>
                        <Link
                          href={`/admin/properties/edit/${encodeURIComponent(prop.editKey)}`}
                          className="inline-flex items-center gap-1.5 rounded-xl bg-brand-primary px-3 py-2 text-xs font-bold text-white shadow-sm transition-all hover:bg-black"
                          title="Edit Plot"
                        >
                          <Pencil size={14} /> Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(prop)}
                          className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold text-red-500 transition-all hover:bg-red-50"
                          title="Delete Plot"
                          type="button"
                        >
                          <Trash2 size={14} /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="space-y-4 p-4 md:hidden">
          {loading ? (
            <div className="p-12 text-center font-medium text-gray-500">Loading list...</div>
          ) : (
            properties.map((prop) => (
              <div
                key={prop.editKey}
                className="flex flex-col overflow-hidden rounded-[2rem] border border-gray-100 bg-white shadow-sm"
              >
                <div className="relative aspect-[16/9] w-full">
                  {prop.images?.[0] ? (
                    <Image src={prop.images[0]} alt="" fill sizes="100vw" className="object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-300">
                      <Map size={32} />
                    </div>
                  )}
                </div>
                <div className="space-y-4 p-5">
                  <div>
                    <h3 className="line-clamp-1 font-display text-xl font-bold text-brand-primary">{prop.title}</h3>
                    <div className="mt-1 flex items-center gap-1.5 font-sans text-sm text-gray-500">
                      <MapPin size={14} className="text-brand-accent" />
                      <span>
                        {prop.locality}
                        {prop.location ? `, ${prop.location}` : ''}
                      </span>
                    </div>
                    <p className="mt-2 font-mono text-sm font-bold text-brand-primary">{prop.price_label}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href={`/admin/properties/edit/${encodeURIComponent(prop.editKey)}`}
                      className="col-span-2 flex items-center justify-center gap-2 rounded-2xl bg-brand-primary px-3 py-3 text-sm font-bold text-white"
                    >
                      <Pencil size={16} /> Edit plot
                    </Link>
                    <Link
                      href={`/properties/${prop.slug}`}
                      target="_blank"
                      className="flex items-center justify-center gap-2 rounded-2xl bg-brand-light px-3 py-3 text-xs font-bold text-brand-primary"
                    >
                      <ExternalLink size={16} /> View
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDelete(prop)}
                      className="flex items-center justify-center gap-2 rounded-2xl bg-red-50 px-3 py-3 text-xs font-bold text-red-500"
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {!loading && properties.length === 0 && (
          <div className="px-6 py-20 text-center">
            <Map className="mx-auto mb-4 text-gray-200" size={48} />
            <p className="font-sans font-medium text-gray-500">No plots found yet.</p>
            <Link href="/admin/properties/add" className="mt-4 inline-flex font-bold text-brand-primary underline">
              Add your first plot
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
