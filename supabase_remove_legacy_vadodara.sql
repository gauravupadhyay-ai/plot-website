-- Run in Supabase SQL Editor
-- Removes legacy Vadodara / Sarthak demo inventory if still present

DELETE FROM public.plot_reviews
WHERE property_code IN (
  'GP-P001', 'GP-P002', 'GP-P003', 'GP-P004', 'GP-P005', 'GP-P006', 'AX-AS-001'
);

DELETE FROM public.properties
WHERE code IN (
  'GP-P001', 'GP-P002', 'GP-P003', 'GP-P004', 'GP-P005', 'GP-P006', 'AX-AS-001'
)
OR slug ILIKE '%sarthak%'
OR locality ILIKE '%vadodara%'
OR locality ILIKE '%waghodia%'
OR locality ILIKE '%subhanpura%'
OR locality ILIKE '%ajwa%'
OR locality ILIKE '%jarod%'
OR location ILIKE '%vadodara%';

NOTIFY pgrst, 'reload schema';
