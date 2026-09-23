import { NextResponse } from 'next/server'
import { saveLead } from '@/lib/saveLead'

export const dynamic = 'force-dynamic'

function line(label: string, value: unknown) {
  const text = String(value ?? '').trim()
  return text ? `${label}: ${text}` : ''
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const ownerName = String(body.ownerName || '').trim()
    const phone = String(body.phone || '').trim()
    const propertyType = String(body.propertyType || body.listingType || '').trim()

    if (!ownerName || !phone || !propertyType) {
      return NextResponse.json(
        { error: 'Owner name, phone, and property type are required' },
        { status: 400 }
      )
    }

    const message = [
      line('Purpose', body.purpose),
      line('Listing type', propertyType),
      line('Facing', body.facing),
      line('Road width', body.roadWidth),
      line('City', body.city),
      line('Locality', body.locality),
      line('Address', body.address),
      line('PIN code', body.pinCode),
      line('Area (sq.yd)', body.areaSqYd || body.totalArea),
      line('Area (sq.ft)', body.areaSqFt || body.coveredArea),
      line('Dimensions', body.dimensions),
      line('Ownership', body.ownership),
      line('Approvals', body.approvals),
      line('Expected price', body.price),
      line('Negotiable', body.negotiable),
      line('Notes', body.notes || body.message),
    ]
      .filter(Boolean)
      .join('\n')

    const saved = await saveLead({
      name: ownerName,
      phone,
      email: body.email,
      userType: 'Owner',
      propertyType,
      budgetRange: body.price ? `₹${body.price}` : null,
      message,
      source: 'Post Property',
    })

    if (!saved.ok) {
      console.error('Post property save failed:', saved.error)
      return NextResponse.json({ error: 'Could not save this listing. Please try again.' }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: 'Property submitted successfully' })
  } catch (error) {
    console.error('Post property API error:', error)
    return NextResponse.json({ error: 'Failed to submit property' }, { status: 500 })
  }
}
