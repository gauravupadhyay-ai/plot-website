import type { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { PageHero } from '@/components/layout/PageHero'
import { CTABanner } from '@/components/home/CTABanner'
import { BlogPostsSection } from '@/components/blog/BlogPostsSection'
import { getAllBlogPosts } from '@/data/blogPosts'
import { SITE_NAME, SITE_URL } from '@/lib/utils'

export const metadata: Metadata = {
  title: `Plot & Real Estate Blog | ${SITE_NAME}`,
  description: `Read expert articles on NCR property — buying tips, market insights, loan guidance, and investment strategies from ${SITE_NAME}.`,
  keywords: [
    'NCR property blog',
    'Greater Noida plots blog',
    'plot buying guide',
    'real estate tips',
    `${SITE_NAME} blog`,
    'plot loan guide Noida',
    'plot investment tips',
  ],
  openGraph: {
    title: `Plot & Real Estate Blog | ${SITE_NAME}`,
    description:
      'Expert property articles, buying guides, and market insights for NCR buyers.',
    url: `${SITE_URL}/blog`,
    type: 'website',
  },
}

export default async function BlogListingPage() {
  const posts = await getAllBlogPosts()

  return (
    <>
      <Header />

      <PageHero
        title="Our Blog"
        subtitle="Expert insights, guides, and market updates to help you make informed property decisions in NCR."
        image="/images/hero/hero-blog.jpg"
        breadcrumb={[{ label: 'Blog' }]}
      />

      <BlogPostsSection posts={posts} />

      <CTABanner />
      <Footer />
    </>
  )
}
