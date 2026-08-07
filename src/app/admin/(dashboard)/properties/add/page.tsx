import { AdminPropertyForm } from '@/components/admin/AdminPropertyForm'

export default function AddPropertyPage() {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
        You are <strong>adding a new NCR listing</strong> (plot, highrise, or commercial). Choose the
        inventory type, then fill location (lat/lng or map embed) and the 360° link so it appears on
        the public listing page.
      </div>
      <AdminPropertyForm mode="add" />
    </div>
  )
}
