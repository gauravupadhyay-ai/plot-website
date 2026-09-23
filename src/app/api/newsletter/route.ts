import { NextResponse } from 'next/server'
import { saveLead } from '@/lib/saveLead'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const email = String(body.email || '').trim()

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 })
    }

    const saved = await saveLead({
      name: email,
      phone: 'Not provided',
      email,
      userType: 'Subscriber',
      source: 'Newsletter',
      message: 'Subscribed for new property alerts.',
    })

    if (!saved.ok) {
      console.error('Newsletter save failed:', saved.error)
      return NextResponse.json({ error: 'Could not save this subscription.' }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: 'Subscribed successfully' })
  } catch (error) {
    console.error('Newsletter API error:', error)
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 })
  }
}
