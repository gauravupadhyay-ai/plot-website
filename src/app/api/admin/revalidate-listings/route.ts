import { revalidatePath, revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST() {
  const auth = cookies().get('admin_auth')
  if (!auth || auth.value !== 'authenticated') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  revalidateTag('properties')
  revalidatePath('/')
  revalidatePath('/properties')
  revalidatePath('/highrise')
  revalidatePath('/commercial')
  revalidatePath('/projects')

  return NextResponse.json({ ok: true })
}
