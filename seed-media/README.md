# Bulk seed plots → Supabase

Upload **all** plot photos + listing data in one go (no Supabase dashboard uploads).

## Folder layout

```
seed-media/
  listings.json          ← all plot information
  plots/
    GP-P001/
      cover.jpg          ← first / cover image (name starting with cover* sorts first)
      01.jpg
      02.jpg
    GP-P002/
      cover.jpg
      ...
```

## Steps

1. Copy the example file:
   ```bash
   copy seed-media\listings.example.json seed-media\listings.json
   ```
2. Edit `listings.json` — add every plot (price, locality, description, etc.).
3. Either:
   - Drop photos into `seed-media/plots/<CODE>/`, **or**
   - Use `"localImages": ["public/images/..."]` to push existing project files.
4. In `.env.local` add (recommended):
   ```env
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```
   (Supabase → Project Settings → API → `service_role`)
5. Make sure the `properties` storage bucket exists (run `supabase_plots_seed.sql` / schema once).
6. Preview:
   ```bash
   npm run seed:properties -- --dry-run
   ```
7. Push for real:
   ```bash
   npm run seed:properties
   ```

The script uploads images to `properties/<CODE>/…` and **upserts** rows in the `properties` table (matched by `code`). Safe to re-run after you add more photos.

## Tips

- Lots of plots: keep editing `listings.json`; one command updates everything.
- Re-run after changing photos — storage uses `upsert: true`.
- Do **not** commit large photo folders to git (see `.gitignore`).
