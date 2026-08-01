import { BlogPost } from '@/types/blog'
import { supabase } from '@/lib/supabase'

function mapBlog(row: any): BlogPost {
  return {
    _id: row.id,
    title: row.title,
    slug: row.slug,
    content: row.content,
    coverImage: row.cover_image,
    metaDescription: row.meta_description || '',
    keywords: row.keywords || [],
    sourceUrl: row.source_url || undefined,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false })

    if (error || !data) {
      console.error('[blogPosts] Failed to fetch all blog posts:', error)
      return []
    }

    return data.map(mapBlog)
  } catch (error) {
    console.error('[blogPosts] Failed to fetch all blog posts:', error)
    return []
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .maybeSingle()

    if (error || !data) return undefined
    return mapBlog(data)
  } catch (error) {
    console.error('[blogPosts] Failed to fetch blog post by slug:', error)
    return undefined
  }
}
