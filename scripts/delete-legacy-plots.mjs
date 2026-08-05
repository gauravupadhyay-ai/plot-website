import { createClient } from '@supabase/supabase-js'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')

function loadEnvLocal() {
  const envPath = path.join(root, '.env.local')
  if (!fs.existsSync(envPath)) return
  for (const line of fs.readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq < 0) continue
    const key = trimmed.slice(0, eq).trim()
    let val = trimmed.slice(eq + 1).trim()
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1)
    }
    if (!process.env[key]) process.env[key] = val
  }
}

loadEnvLocal()

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
if (!url || !key) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or key in .env.local')
  process.exit(1)
}

const sb = createClient(url, key, {
  auth: { persistSession: false, autoRefreshToken: false },
})

const legacy = ['GP-P001', 'GP-P002', 'GP-P003', 'GP-P004', 'GP-P005', 'GP-P006']

const { error: rErr } = await sb.from('plot_reviews').delete().in('property_code', legacy)
console.log('reviews delete:', rErr ? rErr.message : 'ok')

const { error: pErr, count } = await sb
  .from('properties')
  .delete({ count: 'exact' })
  .in('code', legacy)
console.log('properties delete:', pErr ? pErr.message : 'ok', 'count=', count)

const { data, error } = await sb.from('properties').select('code,title')
if (error) console.error('list error:', error.message)
else console.log('remaining:', data)
