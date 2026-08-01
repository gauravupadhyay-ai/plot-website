import { Suspense } from 'react'
import { PropertiesClient } from './PropertiesClient'

export default function PropertiesPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-brand-light">
          <p className="text-sm font-semibold text-text-secondary">Loading plots…</p>
        </main>
      }
    >
      <PropertiesClient />
    </Suspense>
  )
}
