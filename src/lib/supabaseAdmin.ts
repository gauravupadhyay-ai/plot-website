import { createClient, SupabaseClient } from '@supabase/supabase-js'

/**
 * Server-side Supabase client.
 * Prefers service_role key; falls back to anon key so the app
 * can run without MongoDB / without crashing when service key is unset.
 */

let adminClient: SupabaseClient | null = null

export function getSupabaseAdmin(): SupabaseClient {
  if (adminClient) return adminClient

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  const key = serviceKey || anonKey

  if (!supabaseUrl || !key) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL and a Supabase key')
  }

  adminClient = createClient(supabaseUrl, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })

  return adminClient
}

/** @deprecated Prefer getSupabaseAdmin() — kept for existing imports */
export const supabaseAdmin: SupabaseClient = new Proxy({} as SupabaseClient, {
  get(_target, prop, receiver) {
    const client = getSupabaseAdmin()
    const value = Reflect.get(client, prop, receiver)
    return typeof value === 'function' ? value.bind(client) : value
  },
})
