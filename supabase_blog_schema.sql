-- ============================================================
-- Aurixrealty — Blog posts in Supabase (+ images bucket)
-- Run in Supabase SQL Editor
-- ============================================================

-- 1) Blog posts table (replaces MongoDB)
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  cover_image TEXT NOT NULL,
  meta_description TEXT,
  keywords TEXT[] DEFAULT '{}',
  source_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at ON public.blog_posts (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON public.blog_posts (slug);

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Blog posts public read" ON public.blog_posts;
CREATE POLICY "Blog posts public read"
  ON public.blog_posts FOR SELECT USING (true);

DROP POLICY IF EXISTS "Blog posts insert" ON public.blog_posts;
CREATE POLICY "Blog posts insert"
  ON public.blog_posts FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Blog posts update" ON public.blog_posts;
CREATE POLICY "Blog posts update"
  ON public.blog_posts FOR UPDATE USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Blog posts delete" ON public.blog_posts;
CREATE POLICY "Blog posts delete"
  ON public.blog_posts FOR DELETE USING (true);

-- 2) Storage bucket for blog cover images
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-images', 'blog-images', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Blog Images Public Read" ON storage.objects;
CREATE POLICY "Blog Images Public Read"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'blog-images');

DROP POLICY IF EXISTS "Blog Images Insert" ON storage.objects;
CREATE POLICY "Blog Images Insert"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'blog-images');

DROP POLICY IF EXISTS "Blog Images Update" ON storage.objects;
CREATE POLICY "Blog Images Update"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'blog-images');

DROP POLICY IF EXISTS "Blog Images Delete" ON storage.objects;
CREATE POLICY "Blog Images Delete"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'blog-images');

NOTIFY pgrst, 'reload schema';
