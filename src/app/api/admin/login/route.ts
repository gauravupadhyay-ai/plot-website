import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// In a real application, consider using NextAuth/Auth.js or Supabase Auth.
// Here we are honoring the request for a specific admin password bypass.

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    // Credential check using environment variables (+ legacy email alias)
    const allowedEmails = [
      process.env.LOGIN_ADMIN_EMAIL,
      'admin@aurixxrealty.com',
      'admin@aurixrealty.com',
    ].filter(Boolean)
    if (allowedEmails.includes(email) && password === process.env.LOGIN_PASSWORD) {
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
