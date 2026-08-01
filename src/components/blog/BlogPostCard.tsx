import Link from 'next/link'
import Image from 'next/image'
import { BlogPost } from '@/types/blog'
import { Calendar, ArrowRight } from 'lucide-react'

interface BlogPostCardProps {
  post: BlogPost
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  const formattedDate = new Date(post.createdAt).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  // Create a snippet from the content (strip markdown syntax)
  const snippet = post.metaDescription
    || post.content
        .replace(/[#*`>\[\]()!_~\-]/g, '')
        .replace(/\n+/g, ' ')
        .trim()
        .slice(0, 140) + '…'

  return (
    <Link
      href={`/blog/${post.slug}`}
      id={`blog-card-${post.slug}`}
      className="group block bg-white rounded-2xl border border-border overflow-hidden shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
    >
      {/* Cover Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-brand-light">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          quality={70}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="p-5 md:p-6">
        {/* Date */}
        <div className="flex items-center gap-1.5 text-text-muted text-xs font-medium mb-3">
          <Calendar size={13} />
          {formattedDate}
        </div>

        {/* Title */}
        <h3 className="font-serif font-bold text-lg md:text-xl text-brand-primary leading-snug mb-2 group-hover:text-brand-secondary transition-colors line-clamp-2">
          {post.title}
        </h3>

        {/* Description snippet */}
        <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-3">
          {snippet}
        </p>

        {/* Keywords */}
        {post.keywords.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {post.keywords.slice(0, 3).map((kw) => (
              <span
                key={kw}
                className="px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider bg-brand-light text-brand-secondary rounded-full border border-brand-secondary/20"
              >
                {kw}
              </span>
            ))}
          </div>
        )}

        {/* Read More CTA */}
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-secondary group-hover:gap-2.5 transition-all">
          Read Article
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  )
}
