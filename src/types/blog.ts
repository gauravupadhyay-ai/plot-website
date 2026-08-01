/**
 * Represents a blog post as stored in Supabase `blog_posts`.
 */
export interface BlogPost {
  _id?: string
  title: string
  slug: string
  content: string
  coverImage: string
  metaDescription: string
  keywords: string[]
  sourceUrl?: string
  createdAt: string
  updatedAt: string
}

/**
 * The payload shape accepted by POST /api/blogs.
 * Matches the Amtop Blog Agent output format.
 */
export interface CreateBlogPostPayload {
  title: string
  content: string
  coverImage: string
  metaDescription?: string
  keywords?: string[]
  sourceUrl?: string
}
