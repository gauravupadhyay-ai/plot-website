import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// In a real application, consider using NextAuth/Auth.js or Supabase Auth.
// Here we are honoring the request for a specific admin password bypass.

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const email = String(body?.email || '').trim().toLowerCase()
    const password = String(body?.password || '').trim()
    const expectedPassword = String(process.env.LOGIN_PASSWORD || '').trim()

    // Credential check using environment variables (+ legacy email alias)
    const allowedEmails = [
      process.env.LOGIN_ADMIN_EMAIL,
      'admin@aurixxrealty.com',
      'admin@aurixrealty.com',
    ]
      .filter(Boolean)
      .map((value) => String(value).trim().toLowerCase())

    if (!expectedPassword) {
      return NextResponse.json(
        { success: false, error: 'Server login is not configured. Set LOGIN_PASSWORD in .env.local and restart the server.' },
        { status: 500 }
      )
    }

    if (allowedEmails.includes(email) && password === expectedPassword) {
      // Set simple authentication cookie
      cookies().set('admin_auth', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7 // 1 week
      })

      return NextResponse.json({ success: true, message: 'Login successful' })
    }

    return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to process login' }, { status: 500 })
  }
}
