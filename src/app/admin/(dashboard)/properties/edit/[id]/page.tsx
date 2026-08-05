'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { AdminPropertyForm, type AdminPropertyRecord } from '@/components/admin/AdminPropertyForm'
import { dbRowToAdminRecord, seedToAdminRecord } from '@/lib/adminProperty'
import { seedPlots } from '@/data/seedPlots'

export default function EditPropertyPage() {
  const params = useParams<{ id: string }>()
  const rawKey = decodeURIComponent(params.id || '')
  const [record, setRecord] = useState<AdminPropertyRecord | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      setLoading(true)
      setError('')
      if (!rawKey) {
        setError('Missing plot id')
        setLoading(false)
        return
      }

      // 1) Try database by UUID / id
      const byId = await supabase.from('properties').select('*').eq('id', rawKey).maybeSingle()
      if (cancelled) return
      if (byId.data) {
        setRecord(dbRowToAdminRecord(byId.data as Record<string, unknown>))
        setLoading(false)
        return
      }

      // 2) Try database by listing code
      const byCode = await supabase.from('properties').select('*').eq('code', rawKey).maybeSingle()
      if (cancelled) return
      if (byCode.data) {
        setRecord(dbRowToAdminRecord(byCode.data as Record<string, unknown>))
        setLoading(false)
        return
      }

      // 3) Fall back to website seed plot (so every live listing is editable)
      const seed =
        seedPlots.find((p) => p.code === rawKey || p.slug === rawKey) ||
        seedPlots.find((p) => p.code.toLowerCase() === rawKey.toLowerCase())
      if (seed) {
        setRecord(seedToAdminRecord(seed))
        setLoading(false)
        return
      }

      setError('Plot not found in database or website seed inventory.')
      setLoading(false)
    }

    load()
    return () => {
      cancelled = true
    }
  }, [rawKey])

  if (loading) {
    return <p className="py-20 text-center text-sm font-semibold text-text-secondary">Loading plot…</p>
  }
  if (error || !record) {
    return <p className="py-20 text-center text-sm font-semibold text-red-600">{error || 'Plot not found'}</p>
  }

  return (
    <div className="space-y-4">
      <div
        className={`rounded-2xl px-4 py-3 text-sm ${
          record.id
            ? 'border border-sky-100 bg-sky-50 text-sky-900'
            : 'border border-violet-100 bg-violet-50 text-violet-900'
        }`}
      >
        {record.id
          ? 'You are editing a previously saved listing. Changes (including location & 360°) update the live plot.'
          : 'This listing is from the website inventory. Saving stores it in the database so you can keep editing it later (location, 360°, media, details).'}
      </div>
      <AdminPropertyForm mode="edit" initial={record} />
    </div>
  )
}
