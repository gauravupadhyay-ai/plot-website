-- ============================================================
-- Aurixrealty — schema upgrades + 6 plot listings + reviews
-- Run in Supabase SQL Editor
-- ============================================================

-- 1) Base properties table (safe if already exists)
CREATE TABLE IF NOT EXISTS public.properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  slug TEXT UNIQUE NOT NULL,
  code TEXT UNIQUE NOT NULL,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  location TEXT NOT NULL,
  locality TEXT NOT NULL,
  price NUMERIC NOT NULL,
  price_label TEXT NOT NULL,
  bhk TEXT NOT NULL DEFAULT 'N/A',
  bedrooms INTEGER NOT NULL DEFAULT 0,
  bathrooms INTEGER NOT NULL DEFAULT 0,
  area NUMERIC NOT NULL,
  area_unit TEXT NOT NULL DEFAULT 'sq.yd',
  floor TEXT,
  facing TEXT,
  age TEXT,
  parking TEXT,
  description TEXT NOT NULL,
  highlights TEXT[] DEFAULT '{}',
  images TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT false,
  badge TEXT,
  nearby_places JSONB DEFAULT '[]'::jsonb,
  map_embed_url TEXT,
  videos TEXT[] DEFAULT '{}'
);

-- 2) Plot-focused columns
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS videos TEXT[] DEFAULT '{}';
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS price_per_unit TEXT;
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS ownership TEXT DEFAULT 'Freehold';
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'Available';
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS amenities TEXT[] DEFAULT '{}';
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS rating_avg NUMERIC(3,2) DEFAULT 0;
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS rating_count INTEGER DEFAULT 0;
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS lat DOUBLE PRECISION;
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS lng DOUBLE PRECISION;

-- Allow plot rows without apartment fields
ALTER TABLE public.properties ALTER COLUMN bhk SET DEFAULT 'N/A';
ALTER TABLE public.properties ALTER COLUMN bedrooms SET DEFAULT 0;
ALTER TABLE public.properties ALTER COLUMN bathrooms SET DEFAULT 0;

-- 3) Reviews table (linked to properties by code + slug)
CREATE TABLE IF NOT EXISTS public.plot_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  property_code TEXT NOT NULL REFERENCES public.properties(code) ON DELETE CASCADE,
  property_slug TEXT NOT NULL,
  author TEXT NOT NULL,
  rating NUMERIC(2,1) NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  review_date DATE DEFAULT CURRENT_DATE
);

CREATE INDEX IF NOT EXISTS idx_plot_reviews_code ON public.plot_reviews(property_code);
CREATE INDEX IF NOT EXISTS idx_plot_reviews_slug ON public.plot_reviews(property_slug);

-- 4) Storage bucket for plot images/videos
INSERT INTO storage.buckets (id, name, public)
VALUES ('properties', 'properties', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Public Access" ON storage.objects;
CREATE POLICY "Public Access" ON storage.objects
  FOR SELECT USING (bucket_id = 'properties');

DROP POLICY IF EXISTS "Anon Insert" ON storage.objects;
CREATE POLICY "Anon Insert" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'properties');

DROP POLICY IF EXISTS "Anon Update" ON storage.objects;
CREATE POLICY "Anon Update" ON storage.objects
  FOR UPDATE USING (bucket_id = 'properties');

DROP POLICY IF EXISTS "Anon Delete" ON storage.objects;
CREATE POLICY "Anon Delete" ON storage.objects
  FOR DELETE USING (bucket_id = 'properties');

-- 5) RLS
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.plot_reviews ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow all for properties" ON public.properties;
CREATE POLICY "Allow all for properties" ON public.properties
  FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow read reviews" ON public.plot_reviews;
CREATE POLICY "Allow read reviews" ON public.plot_reviews
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow insert reviews" ON public.plot_reviews;
CREATE POLICY "Allow insert reviews" ON public.plot_reviews
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all reviews admin" ON public.plot_reviews;
CREATE POLICY "Allow all reviews admin" ON public.plot_reviews
  FOR ALL USING (true) WITH CHECK (true);

-- 6) Seed 6 plot listings
-- Replace images/videos later with Supabase Storage public URLs, e.g.
-- https://YOUR_PROJECT.supabase.co/storage/v1/object/public/properties/GP-P001/cover.jpg

INSERT INTO public.properties (
  slug, code, type, title, location, locality,
  price, price_label, price_per_unit,
  bhk, bedrooms, bathrooms, area, area_unit,
  facing, ownership, status, age,
  description, highlights, amenities,
  images, videos, featured, badge, nearby_places,
  rating_avg, rating_count
) VALUES
(
  'greenfield-estate-waghodia', 'GP-P001', 'Plot',
  'Greenfield Estate Plot', 'Waghodia Road, Vadodara', 'Waghodia Road',
  4200000, '₹42 Lac', '₹2,800 / sq.yd',
  'N/A', 0, 0, 150, 'sq.yd',
  'East', 'Freehold', 'Ready to Register', 'New',
  'Premium residential plot in a developing corridor on Waghodia Road. Ideal for building a family home with clear approach roads and verified ownership papers.',
  ARRAY['Prime Location','Wide Internal Roads','Clear Title','Gated Access','Park Nearby','Loan Friendly'],
  ARRAY['Gated Community','24/7 Security','Park & Green Spaces','Wide Roads','Underground Utilities'],
  ARRAY[]::TEXT[], ARRAY[]::TEXT[], true, 'Hot Deal',
  '[{"name":"School","distance":"1.2 km"},{"name":"Hospital","distance":"2.8 km"},{"name":"Market","distance":"1.5 km"}]'::jsonb,
  4.8, 12
),
(
  'sunrise-na-plot-ajwa', 'GP-P002', 'Plot',
  'Sunrise NA Plot', 'Ajwa Road, Vadodara', 'Ajwa Road',
  3650000, '₹36.5 Lac', '₹2,920 / sq.yd',
  'N/A', 0, 0, 125, 'sq.yd',
  'North', 'Freehold', 'Available', NULL,
  'Compact NA residential plot on Ajwa Road with strong connectivity and neighbourhood amenities. Perfect starter plot for a 2–3 BHK bungalow plan.',
  ARRAY['NA Status','Corner Approach','Clear Title','Water Line Ready','Quiet Lane','Fast Registration'],
  ARRAY['Wide Roads','Underground Utilities','Park & Green Spaces'],
  ARRAY[]::TEXT[], ARRAY[]::TEXT[], true, 'New',
  '[{"name":"Temple","distance":"0.8 km"},{"name":"Bus Stop","distance":"0.5 km"},{"name":"Clinic","distance":"1.1 km"}]'::jsonb,
  4.6, 8
),
(
  'jarod-garden-villa-plot', 'GP-P003', 'Plot',
  'Jarod Garden Villa Plot', 'Jarod, Vadodara', 'Jarod',
  2850000, '₹28.5 Lac', '₹1,900 / sq.yd',
  'N/A', 0, 0, 150, 'sq.yd',
  'West', 'Freehold', 'Ready to Register', NULL,
  'Affordable villa plot in Jarod with open surroundings and strong appreciation potential as the corridor develops.',
  ARRAY['Budget Friendly','Open Surroundings','Title Clear','Road Access','Investment Ready','Flat Terrain'],
  ARRAY['Wide Roads','Park & Green Spaces'],
  ARRAY[]::TEXT[], ARRAY[]::TEXT[], false, 'For Sale',
  '[{"name":"Highway Access","distance":"2.0 km"},{"name":"Village Market","distance":"1.4 km"}]'::jsonb,
  4.4, 6
),
(
  'subhanpura-prime-corner', 'GP-P004', 'Plot',
  'Subhanpura Prime Corner Plot', 'Subhanpura, Vadodara', 'Subhanpura',
  7800000, '₹78 Lac', '₹3,900 / sq.yd',
  'N/A', 0, 0, 200, 'sq.yd',
  'South', 'Freehold', 'Available', NULL,
  'Corner residential plot in a sought-after Subhanpura pocket. Wide frontage and convenient city access for a premium home build.',
  ARRAY['Corner Plot','Wide Frontage','City Access','Clear Title','Premium Pocket','High Demand'],
  ARRAY['Gated Community','24/7 Security','Wide Roads','Underground Utilities'],
  ARRAY[]::TEXT[], ARRAY[]::TEXT[], true, 'Hot Deal',
  '[{"name":"Mall","distance":"3.2 km"},{"name":"School","distance":"1.0 km"},{"name":"Hospital","distance":"2.1 km"}]'::jsonb,
  4.9, 15
),
(
  'orchard-lane-plot-waghodia', 'GP-P005', 'Plot',
  'Orchard Lane Residential Plot', 'Waghodia Road, Vadodara', 'Waghodia Road',
  5100000, '₹51 Lac', '₹3,000 / sq.yd',
  'N/A', 0, 0, 170, 'sq.yd',
  'East', 'Freehold', 'Ready to Register', NULL,
  'Well-sized plot suited for a spacious ground-plus-one home. Clean paperwork and easy bankability for plot loans.',
  ARRAY['Loan Friendly','Clean Papers','East Facing','Spacious Layout','Growing Corridor','Site Visit Ready'],
  ARRAY['24/7 Security','Wide Roads','Park & Green Spaces','Underground Utilities'],
  ARRAY[]::TEXT[], ARRAY[]::TEXT[], false, 'New',
  '[{"name":"College","distance":"2.5 km"},{"name":"Market","distance":"1.8 km"}]'::jsonb,
  4.7, 9
),
(
  'lakeview-residences-plot-ajwa', 'GP-P006', 'Plot',
  'Lakeview Residences Plot', 'Ajwa Road, Vadodara', 'Ajwa Road',
  6200000, '₹62 Lac', '₹3,100 / sq.yd',
  'N/A', 0, 0, 200, 'sq.yd',
  'North', 'Freehold', 'Available', NULL,
  'Larger plot for buyers planning a villa-style home. Calm surroundings with planned internal roads and verified title.',
  ARRAY['Villa Sized','Calm Surroundings','Verified Title','Internal Roads','Future Ready','Family Friendly'],
  ARRAY['Gated Community','24/7 Security','Park & Green Spaces','Wide Roads'],
  ARRAY[]::TEXT[], ARRAY[]::TEXT[], true, 'For Sale',
  '[{"name":"Lake / Recreation","distance":"3.0 km"},{"name":"School","distance":"2.2 km"}]'::jsonb,
  4.5, 7
)
ON CONFLICT (code) DO UPDATE SET
  title = EXCLUDED.title,
  price = EXCLUDED.price,
  price_label = EXCLUDED.price_label,
  price_per_unit = EXCLUDED.price_per_unit,
  area = EXCLUDED.area,
  facing = EXCLUDED.facing,
  ownership = EXCLUDED.ownership,
  status = EXCLUDED.status,
  description = EXCLUDED.description,
  highlights = EXCLUDED.highlights,
  amenities = EXCLUDED.amenities,
  featured = EXCLUDED.featured,
  badge = EXCLUDED.badge,
  nearby_places = EXCLUDED.nearby_places,
  rating_avg = EXCLUDED.rating_avg,
  rating_count = EXCLUDED.rating_count;

-- 7) Seed reviews for all 6 plots
DELETE FROM public.plot_reviews WHERE property_code LIKE 'GP-P%';

INSERT INTO public.plot_reviews (property_code, property_slug, author, rating, comment, review_date) VALUES
('GP-P001', 'greenfield-estate-waghodia', 'Amit Patel', 5.0, 'Transparent process and the plot location is excellent for long-term value.', '2026-05-12'),
('GP-P001', 'greenfield-estate-waghodia', 'Neha Shah', 4.5, 'Site visit was well arranged. Documents were explained clearly.', '2026-06-02'),
('GP-P002', 'sunrise-na-plot-ajwa', 'Ravi Desai', 5.0, 'Good NA plot option in our budget. Aurixrealty team was responsive.', '2026-04-18'),
('GP-P002', 'sunrise-na-plot-ajwa', 'Sonal Rana', 4.0, 'Nice facing and approach road. Happy with the shortlisting help.', '2026-05-03'),
('GP-P003', 'jarod-garden-villa-plot', 'Kiran Trivedi', 4.0, 'Value for money plot. Happy with the guidance on documentation.', '2026-03-22'),
('GP-P003', 'jarod-garden-villa-plot', 'Deepak Solanki', 4.5, 'Good investment corridor. Clear communication throughout.', '2026-04-09'),
('GP-P004', 'subhanpura-prime-corner', 'Meera Joshi', 5.0, 'Premium location. The corner advantage is real — very happy we booked this.', '2026-07-01'),
('GP-P004', 'subhanpura-prime-corner', 'Harsh Patel', 5.0, 'Professional team. Title checks gave us confidence.', '2026-07-10'),
('GP-P005', 'orchard-lane-plot-waghodia', 'Suresh Mehta', 5.0, 'Smooth experience from enquiry to agreement. Strongly recommend Aurixrealty.', '2026-05-28'),
('GP-P005', 'orchard-lane-plot-waghodia', 'Anjali Dave', 4.5, 'Loan assistance tip was useful. Plot size fits our plan.', '2026-06-08'),
('GP-P006', 'lakeview-residences-plot-ajwa', 'Pooja Amin', 4.5, 'Loved the size and facing. Looking forward to building our home here.', '2026-06-15'),
('GP-P006', 'lakeview-residences-plot-ajwa', 'Nikhil Shah', 4.0, 'Calm surroundings and verified papers. Good support from the advisor.', '2026-06-21');

-- 8) Refresh API schema cache
NOTIFY pgrst, 'reload schema';
