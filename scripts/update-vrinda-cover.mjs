import { createClient } from '@supabase/supabase-js'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
for (const line of fs.readFileSync(path.join(root, '.env.local'), 'utf8').split(/\r?\n/)) {
  const t = line.trim()
  if (!t || t.startsWith('#')) continue
  const i = t.indexOf('=')
  if (i < 0) continue
  const k = t.slice(0, i).trim()
  let v = t.slice(i + 1).trim()
  if (!process.env[k]) process.env[k] = v
}

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  { auth: { persistSession: false, autoRefreshToken: false } }
)

const code = 'AX-VV-001'
const coverAbs = path.join(root, 'public/images/plots/vrinda-vatika/cover.png')

async function upload(storagePath, abs, type) {
  const buf = fs.readFileSync(abs)
  const { error } = await sb.storage.from('properties').upload(storagePath, buf, {
    contentType: type,
    upsert: true,
  })
  if (error) throw error
  return sb.storage.from('properties').getPublicUrl(storagePath).data.publicUrl
}

const cover = await upload(`${code}/cover.png`, coverAbs, 'image/png')
console.log('cover', cover)

// Keep existing videos; only replace images with the branding cover (no location map)
const { data: existing, error: fetchErr } = await sb
  .from('properties')
  .select('videos')
  .eq('code', code)
  .single()
if (fetchErr) throw fetchErr

const { data, error } = await sb
  .from('properties')
  .update({ images: [cover] })
  .eq('code', code)
  .select('code,images,videos')
console.log(error ? error.message : 'updated', data)
console.log('kept videos', existing?.videos?.length || 0)
