-- Run in Supabase SQL Editor
-- Separates inventory into plot / highrise / commercial for admin + public pages

ALTER TABLE public.properties
  ADD COLUMN IF NOT EXISTS category TEXT;

-- Backfill from existing type values
UPDATE public.properties
SET category = CASE
  WHEN type ILIKE '%commercial%' THEN 'commercial'
  WHEN type ILIKE '%flat%' OR type ILIKE '%apartment%' OR type ILIKE '%independent%' THEN 'highrise'
  ELSE 'plot'
END
WHERE category IS NULL OR category = '';

-- Keep future rows consistent
ALTER TABLE public.properties
  DROP CONSTRAINT IF EXISTS properties_category_check;

ALTER TABLE public.properties
  ADD CONSTRAINT properties_category_check
  CHECK (category IS NULL OR category IN ('plot', 'highrise', 'commercial'));

CREATE INDEX IF NOT EXISTS properties_category_idx ON public.properties (category);
CREATE INDEX IF NOT EXISTS properties_type_idx ON public.properties (type);

-- Optional: sync category whenever type changes (app also writes category on save)
CREATE OR REPLACE FUNCTION public.sync_property_category()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.category := CASE
    WHEN NEW.type ILIKE '%commercial%' THEN 'commercial'
    WHEN NEW.type ILIKE '%flat%' OR NEW.type ILIKE '%apartment%' OR NEW.type ILIKE '%independent%' THEN 'highrise'
    ELSE 'plot'
  END;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_sync_property_category ON public.properties;
CREATE TRIGGER trg_sync_property_category
  BEFORE INSERT OR UPDATE OF type ON public.properties
  FOR EACH ROW
  EXECUTE PROCEDURE public.sync_property_category();

NOTIFY pgrst, 'reload schema';
