import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { purpose, propertyType, bedrooms, bathrooms, city, locality, address, pinCode, totalArea, coveredArea, floor, totalFloors, age, facing, price, negotiable, maintenance, ownerName, phone, email } = body

    if (!ownerName || !phone || !propertyType) {
      return NextResponse.json({ error: 'Owner name, phone, and property type are required' }, { status: 400 })
    }

    const resendApiKey = process.env.RESEND_API_KEY
    const contactEmail = process.env.CONTACT_EMAIL || 'contact@gauravplots.com'

    if (resendApiKey && resendApiKey !== 're_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx') {
      const { Resend } = await import('resend')
      const resend = new Resend(resendApiKey)

      await resend.emails.send({
        from: 'Gaurav Plots <noreply@gauravplots.com>',
        to: contactEmail,
        subject: `New Plot Listing: ${propertyType} in ${locality || city || 'Vadodara'}`,
        html: `
          <h2>New Plot Listing Submission</h2>
          <h3>Owner Details</h3>
          <p><strong>Name:</strong> ${ownerName}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          ${email ? `<p><strong>Email:</strong> ${email}</p>` : ''}
          <h3>Property Details</h3>
          <p><strong>Purpose:</strong> ${purpose || 'Sell'}</p>
          <p><strong>Type:</strong> ${propertyType}</p>
          <p><strong>Bedrooms:</strong> ${bedrooms || 'N/A'}</p>
          <p><strong>Bathrooms:</strong> ${bathrooms || 'N/A'}</p>
          <p><strong>Location:</strong> ${locality || ''}, ${city || 'Vadodara'}</p>
          ${address ? `<p><strong>Address:</strong> ${address}</p>` : ''}
          ${totalArea ? `<p><strong>Total Area:</strong> ${totalArea} sq.ft.</p>` : ''}
          ${coveredArea ? `<p><strong>Covered Area:</strong> ${coveredArea} sq.ft.</p>` : ''}
          ${price ? `<p><strong>Expected Price:</strong> ₹${Number(price).toLocaleString('en-IN')}</p>` : ''}
          ${negotiable ? `<p><strong>Negotiable:</strong> ${negotiable}</p>` : ''}
          <p><strong>Submitted:</strong> ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
        `,
      })
    }

    return NextResponse.json({ success: true, message: 'Property submitted successfully' })
  } catch (error) {
    console.error('Post property API error:', error)
    return NextResponse.json({ error: 'Failed to submit property' }, { status: 500 })
  }
}
