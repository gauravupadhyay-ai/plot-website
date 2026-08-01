import { createClient, SupabaseClient } from '@supabase/supabase-js'

/**
 * Browser / anon Supabase client.
 * Lazily created so Next.js can collect route data at build time
 * even when env vars are only available at runtime on Vercel.
 */

let client: SupabaseClient | null = null

export function getSupabase(): SupabaseClient {
  if (client) return client

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY')
  }

  client = createClient(supabaseUrl, supabaseAnonKey)
  return client
}

/** Lazy proxy so existing `import { supabase }` call sites keep working */
export const supabase: SupabaseClient = new Proxy({} as SupabaseClient, {
  get(_target, prop, receiver) {
    const value = Reflect.get(getSupabase(), prop, receiver)
    return typeof value === 'function' ? value.bind(getSupabase()) : value
  },
})
