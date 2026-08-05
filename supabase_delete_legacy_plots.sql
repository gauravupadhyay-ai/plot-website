-- Remove old Vadodara demo listings that still show old photos.
-- Run once in Supabase SQL Editor.

DELETE FROM public.plot_reviews
WHERE property_code IN ('GP-P001', 'GP-P002', 'GP-P003', 'GP-P004', 'GP-P005', 'GP-P006');

DELETE FROM public.properties
WHERE code IN ('GP-P001', 'GP-P002', 'GP-P003', 'GP-P004', 'GP-P005', 'GP-P006');

-- Optional: remove any other non–Expressway rows
-- DELETE FROM public.properties WHERE code <> 'AX-YE-001';
