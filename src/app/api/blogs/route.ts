import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabaseAdmin'
import { CreateBlogPostPayload } from '@/types/blog'
import { v4 as uuidv4 } from 'uuid'

const BLOG_BUCKET = process.env.SUPABASE_BLOG_BUCKET || 'blog-images'

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

function validateApiKey(req: NextRequest): boolean {
  const apiKey = req.headers.get('x-api-key')
  const expected = process.env.BLOG_API_KEY
  if (!expected) return true
  return apiKey === expected
}

function validatePayload(body: unknown): { valid: boolean; error?: string; data?: CreateBlogPostPayload } {
  if (!body || typeof body !== 'object') {
    return { valid: false, error: 'Request body is required' }
  }

  const payload = body as Record<string, unknown>

  if (!payload.title || typeof payload.title !== 'string' || payload.title.trim().length === 0) {
    return { valid: false, error: 'title is required and must be a non-empty string' }
  }

  if (!payload.content || typeof payload.content !== 'string' || payload.content.trim().length === 0) {
    return { valid: false, error: 'content is required and must be a non-empty string' }
  }

  if (!payload.coverImage || typeof payload.coverImage !== 'string') {
    return { valid: false, error: 'coverImage is required and must be a valid URL string' }
  }

  if (payload.keywords && !Array.isArray(payload.keywords)) {
    return { valid: false, error: 'keywords must be an array of strings' }
  }

  return {
    valid: true,
    data: {
      title: (payload.title as string).trim(),
      content: (payload.content as string).trim(),
      coverImage: (payload.coverImage as string).trim(),
      metaDescription: typeof payload.metaDescription === 'string' ? payload.metaDescription.trim() : undefined,
      keywords: Array.isArray(payload.keywords)
        ? (payload.keywords as string[]).map((k) => String(k).trim())
        : [],
      sourceUrl: typeof payload.sourceUrl === 'string' ? payload.sourceUrl.trim() : undefined,
    },
  }
}

async function uploadCoverImage(imageUrl: string): Promise<string> {
  try {
    const response = await fetch(imageUrl, { signal: AbortSignal.timeout(30_000) })
    if (!response.ok) return imageUrl

    const contentType = response.headers.get('content-type') || 'image/jpeg'
    const buffer = Buffer.from(await response.arrayBuffer())
    const extMap: Record<string, string> = {
      'image/jpeg': 'jpg',
      'image/jpg': 'jpg',
      'image/png': 'png',
      'image/webp': 'webp',
      'image/gif': 'gif',
      'image/avif': 'avif',
    }
    const ext = extMap[contentType] || 'jpg'
    const fileName = `blog-covers/${uuidv4()}.${ext}`
    const admin = getSupabaseAdmin()

    const { error } = await admin.storage.from(BLOG_BUCKET).upload(fileName, buffer, {
      contentType,
      upsert: false,
      cacheControl: '31536000',
    })

    if (error) {
      console.error('[api/blogs] Storage upload failed, using source URL:', error.message)
      return imageUrl
    }

    const { data: publicUrlData } = admin.storage.from(BLOG_BUCKET).getPublicUrl(fileName)
    return publicUrlData.publicUrl
  } catch (err) {
    console.error('[api/blogs] Image upload error, using source URL:', err)
    return imageUrl
  }
}

export async function POST(req: NextRequest) {
  try {
    if (!validateApiKey(req)) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Invalid or missing API key' },
        { status: 401 }
      )
    }

    let body: unknown
    try {
      body = await req.json()
    } catch {
      return NextResponse.json({ success: false, error: 'Invalid JSON body' }, { status: 400 })
    }

    const validation = validatePayload(body)
    if (!validation.valid || !validation.data) {
      return NextResponse.json({ success: false, error: validation.error }, { status: 400 })
    }

    const payload = validation.data
    const coverImageUrl = await uploadCoverImage(payload.coverImage)
    const admin = getSupabaseAdmin()

    const baseSlug = slugify(payload.title)
    let slug = baseSlug
    let counter = 0

    while (true) {
      const { data: existing } = await admin
        .from('blog_posts')
        .select('id')
        .eq('slug', slug)
        .maybeSingle()
      if (!existing) break
      counter++
      slug = `${baseSlug}-${counter}`
    }

    const now = new Date().toISOString()
    const { data, error } = await admin
      .from('blog_posts')
      .insert({
        title: payload.title,
        slug,
        content: payload.content,
        cover_image: coverImageUrl,
        meta_description: payload.metaDescription || payload.title,
        keywords: payload.keywords || [],
        source_url: payload.sourceUrl || null,
        created_at: now,
        updated_at: now,
      })
      .select('id, slug, title, cover_image, created_at')
      .single()

    if (error || !data) {
      console.error('[api/blogs] Insert failed:', error)
      return NextResponse.json(
        { success: false, error: error?.message || 'Failed to save blog post' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          _id: data.id,
          slug: data.slug,
          title: data.title,
          coverImage: data.cover_image,
          createdAt: data.created_at,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('[api/blogs] POST error:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const admin = getSupabaseAdmin()
    const { data, error } = await admin
      .from('blog_posts')
      .select('id, title, slug, cover_image, meta_description, keywords, source_url, created_at, updated_at')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('[api/blogs] GET error:', error)
      return NextResponse.json({ success: false, error: 'Failed to fetch blog posts' }, { status: 500 })
    }

    const posts = (data || []).map((doc) => ({
      _id: doc.id,
      title: doc.title,
      slug: doc.slug,
      coverImage: doc.cover_image,
      metaDescription: doc.meta_description,
      keywords: doc.keywords,
      sourceUrl: doc.source_url,
      createdAt: doc.created_at,
      updatedAt: doc.updated_at,
    }))

    return NextResponse.json({ success: true, data: posts, count: posts.length })
  } catch (error) {
    console.error('[api/blogs] GET error:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch blog posts' }, { status: 500 })
  }
}
