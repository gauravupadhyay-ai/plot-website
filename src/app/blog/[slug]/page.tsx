import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CTABanner } from '@/components/home/CTABanner'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { BlogMarkdownContent } from '@/components/blog/BlogMarkdownContent'
import { getAllBlogPosts, getBlogPostBySlug } from '@/data/blogPosts'
import { SITE_NAME, SITE_URL } from '@/lib/utils'
import { Calendar, Tag } from 'lucide-react'

interface BlogPostPageProps {
  params: { slug: string }
}

/* ─── Static params for SSG ─── */

export async function generateStaticParams() {
  const posts = await getAllBlogPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

/* ─── Dynamic metadata ─── */

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug)

  if (!post) {
    return {
      title: `Blog Post Not Found | ${SITE_NAME}`,
      description: 'The requested blog post could not be found.',
    }
  }

  return {
    title: `${post.title} | ${SITE_NAME} Blog`,
    description: post.metaDescription || post.title,
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.metaDescription || post.title,
      url: `${SITE_URL}/blog/${post.slug}`,
      type: 'article',
      images: [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      publishedTime: post.createdAt,
      modifiedTime: post.updatedAt,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.metaDescription || post.title,
      images: [post.coverImage],
    },
  }
}

/* ─── Page component ─── */

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const formattedDate = new Date(post.createdAt).toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <>
      <Header />

      {/* Hero Section with Cover Image */}
      <section className="relative min-h-[50vh] md:min-h-[55vh] flex items-end overflow-hidden">
        {/* Background Image */}
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {/* Content */}
        <div className="relative z-10 w-full pb-10 pt-32 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <div className="mb-6">
              <Breadcrumb
                items={[
                  { label: 'Blog', href: '/blog' },
                  { label: post.title },
                ]}
              />
            </div>

            {/* Title */}
            <h1 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl text-white leading-tight mb-4">
              {post.title}
            </h1>

            {/* Keywords */}
            {post.keywords.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {post.keywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-white/10 backdrop-blur-sm text-white/80 rounded-full border border-white/20"
                  >
                    <Tag size={10} />
                    {keyword}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="bg-brand-light py-12 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <article className="bg-white rounded-2xl border border-border shadow-card p-6 sm:p-8 md:p-12">
            {/* Publication date */}
            <div className="flex items-center gap-2 text-text-muted text-sm font-medium mb-8 pb-6 border-b border-border">
              <Calendar size={15} />
              <time dateTime={post.createdAt}>Published on {formattedDate}</time>
            </div>

            {/* Markdown Content */}
            <BlogMarkdownContent markdown={post.content} />

            {/* Source attribution */}
            {post.sourceUrl && (
              <div className="mt-10 pt-6 border-t border-border">
                <p className="text-text-muted text-sm">
                  Originally published at{' '}
                  <a
                    href={post.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-secondary hover:underline font-medium"
                  >
                    source
                  </a>
                </p>
              </div>
            )}
          </article>
        </div>
      </section>

      {/* CTA & Footer */}
      <CTABanner />
      <Footer />
    </>
  )
}
