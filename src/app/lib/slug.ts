/**
 * URL-safe slug generation, mirroring public.slugify() in the database so the
 * value previewed in the editor matches what Postgres would produce.
 *
 *   "The Cultural Shifts Redefining African & Global Brands in 2026"
 *   -> "the-cultural-shifts-redefining-african-global-brands-in-2026"
 */
export function slugify(value: string): string {
  return value
    .normalize("NFD")
    // Strip combining accent marks so "Café" becomes "cafe", not "caf".
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-{2,}/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Appends -2, -3, … until the slug is not already taken.
 * `isTaken` is async so callers can check against the database.
 */
export async function uniqueSlug(
  base: string,
  isTaken: (candidate: string) => Promise<boolean>,
): Promise<string> {
  const root = slugify(base) || "untitled";

  if (!(await isTaken(root))) return root;

  for (let n = 2; n < 100; n++) {
    const candidate = `${root}-${n}`;
    if (!(await isTaken(candidate))) return candidate;
  }

  // Practically unreachable; guarantees we never return a colliding slug.
  return `${root}-${Date.now()}`;
}
