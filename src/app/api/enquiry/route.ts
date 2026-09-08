import { NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

const LEAD_NOTIFY_EMAIL = 'contact@aurixxrealty.com'

function escapeHtml(value: unknown) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, phone, email, userType, propertyType, budgetRange, message, propertyCode, source } = body

    if (!name || !phone) {
      return NextResponse.json({ error: 'Name and phone are required' }, { status: 400 })
    }

    try {
      const { error: dbError } = await getSupabase().from('leads').insert([
        {
          name,
          phone,
          email: email || null,
          user_type: userType || null,
          property_type: propertyType || null,
          budget_range: budgetRange || null,
          message: message || null,
          property_code: propertyCode || null,
          source: source || null,
        },
      ])

      if (dbError) {
        console.error('Supabase Error:', dbError)
      }
    } catch (dbInitError) {
      console.error('Supabase unavailable:', dbInitError)
    }

    const resendApiKey = process.env.RESEND_API_KEY
    const recipients = [LEAD_NOTIFY_EMAIL]

    if (resendApiKey && resendApiKey !== 're_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx') {
      const { Resend } = await import('resend')
      const resend = new Resend(resendApiKey)

      const result = await resend.emails.send({
        from: 'Aurixxrealty <noreply@aurixxrealty.com>',
        to: recipients,
        subject: `New Enquiry from ${name}${propertyCode ? ` - ${propertyCode}` : ''}`,
        html: `
          <h2>New Plot Enquiry</h2>
          <table style="border-collapse:collapse;width:100%">
            <tr><td style="padding:8px;font-weight:bold;border:1px solid #ddd">Name</td><td style="padding:8px;border:1px solid #ddd">${escapeHtml(name)}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;border:1px solid #ddd">Phone</td><td style="padding:8px;border:1px solid #ddd">${escapeHtml(phone)}</td></tr>
            ${email ? `<tr><td style="padding:8px;font-weight:bold;border:1px solid #ddd">Email</td><td style="padding:8px;border:1px solid #ddd">${escapeHtml(email)}</td></tr>` : ''}
            ${userType ? `<tr><td style="padding:8px;font-weight:bold;border:1px solid #ddd">User Type</td><td style="padding:8px;border:1px solid #ddd">${escapeHtml(userType)}</td></tr>` : ''}
            ${propertyType ? `<tr><td style="padding:8px;font-weight:bold;border:1px solid #ddd">Property Type</td><td style="padding:8px;border:1px solid #ddd">${escapeHtml(propertyType)}</td></tr>` : ''}
            ${budgetRange ? `<tr><td style="padding:8px;font-weight:bold;border:1px solid #ddd">Budget Range</td><td style="padding:8px;border:1px solid #ddd">${escapeHtml(budgetRange)}</td></tr>` : ''}
            ${propertyCode ? `<tr><td style="padding:8px;font-weight:bold;border:1px solid #ddd">Property Code</td><td style="padding:8px;border:1px solid #ddd">${escapeHtml(propertyCode)}</td></tr>` : ''}
            ${message ? `<tr><td style="padding:8px;font-weight:bold;border:1px solid #ddd">Message</td><td style="padding:8px;border:1px solid #ddd">${escapeHtml(message)}</td></tr>` : ''}
            ${source ? `<tr><td style="padding:8px;font-weight:bold;border:1px solid #ddd">Source Page</td><td style="padding:8px;border:1px solid #ddd">${escapeHtml(source)}</td></tr>` : ''}
            <tr><td style="padding:8px;font-weight:bold;border:1px solid #ddd">Timestamp</td><td style="padding:8px;border:1px solid #ddd">${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</td></tr>
          </table>
        `,
      })

      if (result.error) {
        console.error('Resend error:', result.error)
        return NextResponse.json({ error: 'Failed to send enquiry email' }, { status: 500 })
      }
    } else {
      console.error('RESEND_API_KEY is not configured; enquiry was not emailed')
    }

    return NextResponse.json({ success: true, message: 'Enquiry sent successfully' })
  } catch (error) {
    console.error('Enquiry API error:', error)
    return NextResponse.json({ error: 'Failed to send enquiry' }, { status: 500 })
  }
}
