import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, phone, email, userType, propertyType, budgetRange, message, propertyCode, source } = body

    if (!name || !phone) {
      return NextResponse.json({ error: 'Name and phone are required' }, { status: 400 })
    }

    // 1. Log lead in Supabase database
    const { error: dbError } = await supabase.from('leads').insert([{
      name,
      phone,
      email: email || null,
      user_type: userType || null,
      property_type: propertyType || null,
      budget_range: budgetRange || null,
      message: message || null,
      property_code: propertyCode || null,
      source: source || null
    }])

    if (dbError) {
      console.error('Supabase Error:', dbError)
      // We log it but continue to send email if configured
    }

    // 2. Send email via Resend if API key is configured
    const resendApiKey = process.env.RESEND_API_KEY
    const contactEmail = process.env.CONTACT_EMAIL || 'contact@gauravplots.com'

    if (resendApiKey && resendApiKey !== 're_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx') {
      const { Resend } = await import('resend')
      const resend = new Resend(resendApiKey)

      await resend.emails.send({
        from: 'Gaurav Plots <noreply@gauravplots.com>',
        to: contactEmail,
        subject: `New Enquiry from ${name}${propertyCode ? ` — ${propertyCode}` : ''}`,
        html: `
          <h2>New Plot Enquiry</h2>
          <table style="border-collapse:collapse;width:100%">
            <tr><td style="padding:8px;font-weight:bold;border:1px solid #ddd">Name</td><td style="padding:8px;border:1px solid #ddd">${name}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;border:1px solid #ddd">Phone</td><td style="padding:8px;border:1px solid #ddd">${phone}</td></tr>
            ${email ? `<tr><td style="padding:8px;font-weight:bold;border:1px solid #ddd">Email</td><td style="padding:8px;border:1px solid #ddd">${email}</td></tr>` : ''}
            ${userType ? `<tr><td style="padding:8px;font-weight:bold;border:1px solid #ddd">User Type</td><td style="padding:8px;border:1px solid #ddd">${userType}</td></tr>` : ''}
            ${propertyType ? `<tr><td style="padding:8px;font-weight:bold;border:1px solid #ddd">Property Type</td><td style="padding:8px;border:1px solid #ddd">${propertyType}</td></tr>` : ''}
            ${budgetRange ? `<tr><td style="padding:8px;font-weight:bold;border:1px solid #ddd">Budget Range</td><td style="padding:8px;border:1px solid #ddd">${budgetRange}</td></tr>` : ''}
            ${propertyCode ? `<tr><td style="padding:8px;font-weight:bold;border:1px solid #ddd">Property Code</td><td style="padding:8px;border:1px solid #ddd">${propertyCode}</td></tr>` : ''}
            ${message ? `<tr><td style="padding:8px;font-weight:bold;border:1px solid #ddd">Message</td><td style="padding:8px;border:1px solid #ddd">${message}</td></tr>` : ''}
            ${source ? `<tr><td style="padding:8px;font-weight:bold;border:1px solid #ddd">Source Page</td><td style="padding:8px;border:1px solid #ddd">${source}</td></tr>` : ''}
            <tr><td style="padding:8px;font-weight:bold;border:1px solid #ddd">Timestamp</td><td style="padding:8px;border:1px solid #ddd">${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</td></tr>
          </table>
        `,
      })
    }

    return NextResponse.json({ success: true, message: 'Enquiry sent successfully' })
  } catch (error) {
    console.error('Enquiry API error:', error)
    return NextResponse.json({ error: 'Failed to send enquiry' }, { status: 500 })
  }
}
