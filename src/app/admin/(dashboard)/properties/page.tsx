'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { Property } from '@/types/property'
import { Plus, Trash2, MapPin, Map } from 'lucide-react'

export default function AdminPropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)

  const fetchProperties = async () => {
    setLoading(true)
    const { data } = await supabase
      .from('properties')
      .select('*')
      .order('created_at', { ascending: false })
    if (data) {
      setProperties(data as any)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchProperties()
  }, [])

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this plot listing?')) {
      await supabase.from('properties').delete().eq('id', id)
      fetchProperties()
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-display font-bold text-brand-primary">Plots Inventory</h1>
        <Link
          href="/admin/properties/add"
          className="w-full sm:w-auto bg-brand-primary text-white px-6 py-3 rounded-2xl hover:bg-black/90 transition-all shadow-lg shadow-brand-primary/20 flex items-center justify-center gap-2 font-medium font-sans"
        >
          <Plus size={20} /> Add New Plot
        </Link>
      </div>

      <div className="bg-white/70 backdrop-blur-md rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-6 py-4 font-bold text-brand-primary uppercase tracking-wider text-xs">
                  Plot
                </th>
                <th className="px-6 py-4 font-bold text-brand-primary uppercase tracking-wider text-xs">
                  Location
                </th>
                <th className="px-6 py-4 font-bold text-brand-primary uppercase tracking-wider text-xs">
                  Price
                </th>
                <th className="px-6 py-4 font-bold text-brand-primary uppercase tracking-wider text-xs text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-20 text-center text-gray-500 font-medium">
                    Refreshing inventory...
                  </td>
                </tr>
              ) : (
                properties.map((prop: any) => (
                  <tr key={prop.id} className="hover:bg-brand-light/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-gray-100 rounded-xl overflow-hidden shadow-sm flex-shrink-0">
                          {prop.images?.[0] ? (
                            <img
                              src={prop.images[0]}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Map size={20} className="text-gray-300" />
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="font-bold text-brand-primary truncate max-w-[200px]">
                            {prop.title}
                          </div>
                          <div className="text-xs font-mono text-text-muted mt-1 uppercase tracking-tighter">
                            {prop.code}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600 font-sans">
                        <MapPin size={14} className="text-brand-accent" />
                        {prop.locality}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-mono font-bold text-brand-primary">
                        {prop.price_label}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleDelete(prop.id)}
                        className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                        title="Delete Plot"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="md:hidden space-y-4 p-4">
          {loading ? (
            <div className="p-12 text-center text-gray-500 font-medium">Refreshing list...</div>
          ) : (
            properties.map((prop: any) => (
              <div
                key={prop.id}
                className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col"
              >
                <div className="relative aspect-[16/9] w-full">
                  {prop.images?.[0] ? (
                    <img src={prop.images[0]} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-300">
                      <Map size={32} />
                    </div>
                  )}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-white/90 backdrop-blur-md text-brand-primary text-[10px] font-bold px-3 py-1 rounded-full shadow-sm uppercase tracking-wider">
                      {prop.type}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-brand-primary/80 backdrop-blur-md text-white p-3 rounded-2xl flex justify-between items-center">
                      <span className="text-lg font-mono font-bold tracking-tight">
                        {prop.price_label}
                      </span>
                      <span className="text-[10px] font-bold text-white/70 uppercase tracking-widest">
                        {prop.code}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-display font-bold text-brand-primary line-clamp-1">
                      {prop.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-gray-500 text-sm mt-1 font-sans">
                      <MapPin size={14} className="text-brand-accent" />
                      <span>
                        {prop.locality}, {prop.location}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex gap-4 text-xs font-bold text-brand-primary font-sans">
                      <div className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                        {prop.type === 'Plot' ? 'Plot' : prop.bhk || 'N/A'}
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                        {prop.area} {prop.area_unit}
                      </div>
                    </div>

                    <button
                      onClick={() => handleDelete(prop.id)}
                      className="p-3 bg-red-50 text-red-500 rounded-2xl active:scale-90 transition-transform shadow-sm flex items-center gap-2 font-bold text-xs"
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
            <Map className="mx-auto text-gray-200 mb-4" size={48} />
            <p className="text-gray-500 font-medium font-sans">No plots found yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}
