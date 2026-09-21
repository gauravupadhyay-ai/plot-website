/** Bust the public catalog cache after an admin save or delete. */
export async function refreshPublicListings() {
  try {
    await fetch('/api/admin/revalidate-listings', { method: 'POST' })
  } catch {
    // The listing is already saved. Pages refresh on the next cache window.
  }
}
