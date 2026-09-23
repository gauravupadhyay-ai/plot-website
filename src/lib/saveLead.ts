import { getSupabaseAdmin } from '@/lib/supabaseAdmin'

export type LeadInput = {
  name: string
  phone: string
  email?: string | null
  userType?: string | null
  propertyType?: string | null
  budgetRange?: string | null
  message?: string | null
  propertyCode?: string | null
  source?: string | null
}

export async function saveLead(input: LeadInput) {
  const name = input.name.trim()
  const phone = input.phone.trim()
  if (!name || !phone) {
    return { ok: false as const, error: 'Name and phone are required' }
  }

  const { error } = await getSupabaseAdmin().from('leads').insert([
    {
      name,
      phone,
      email: input.email?.trim() || null,
      user_type: input.userType?.trim() || null,
      property_type: input.propertyType?.trim() || null,
      budget_range: input.budgetRange?.trim() || null,
      message: input.message?.trim() || null,
      property_code: input.propertyCode?.trim() || null,
      source: input.source?.trim() || null,
    },
  ])

  if (error) {
    return { ok: false as const, error: error.message }
  }

  return { ok: true as const }
}
