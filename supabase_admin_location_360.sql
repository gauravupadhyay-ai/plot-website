-- Run in Supabase SQL Editor: location + 360 fields for admin add/edit
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS lat DOUBLE PRECISION;
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS lng DOUBLE PRECISION;
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS map_embed_url TEXT;
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS panorama_url TEXT;
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS panorama_link TEXT;

NOTIFY pgrst, 'reload schema';
