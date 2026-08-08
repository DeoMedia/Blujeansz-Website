import { supabase } from "../lib/supabase";
import { slugify, uniqueSlug } from "../lib/slug";
import { unwrap, ServiceError } from "./shared";
import type {
  Insight,
  InsightInput,
  InsightWithRelations,
  ContentStatus,
} from "../types/database";

/**
 * Columns joined on every public read. Selecting explicitly (rather than `*`)
 * keeps the payload small and makes the shape match InsightWithRelations.
 */
const PUBLIC_SELECT = `
  id, title, slug, excerpt, content, category_id, author_id,
  featured_image_url, featured_image_alt, hero_image_position,
  read_time_minutes, status, featured,
  seo_title, meta_description, canonical_url, og_title, og_description, og_image_url,
  created_by, updated_by, created_at, updated_at, published_at, scheduled_at,
  category:insight_categories(*),
  author:authors(*)
`;

/**
 * Anonymous visitors are already restricted to published rows by RLS. Repeating
 * the filter here is deliberate: it keeps the intent visible at the call site
 * and lets logged-in editors browse the public site without seeing their own
 * drafts leak into the listing.
 */
function publishedOnly<T extends { eq: Function; lte: Function }>(query: T): T {
  return query.eq("status", "published").lte("published_at", new Date().toISOString()) as T;
}

/**
 * PostgREST embeds a many-to-one relation as a single object, but supabase-js
 * cannot infer that from the select string and types every embed as an array.
 * Collapsing it here — rather than casting the whole row — keeps the returned
 * shape honest whichever form the client hands back.
 */
function toOne<T>(value: T | T[] | null | undefined): T | null {
  if (Array.isArray(value)) return value[0] ?? null;
  return value ?? null;
}

function normalizeInsight(row: Record<string, unknown>): InsightWithRelations {
  return {
    ...(row as unknown as Insight),
    category: toOne(row.category as InsightWithRelations["category"]),
    author: toOne(row.author as InsightWithRelations["author"]),
  };
}

export async function listPublishedInsights(options?: {
  limit?: number;
  categorySlug?: string;
  authorSlug?: string;
  excludeId?: string;
}): Promise<InsightWithRelations[]> {
  let query = supabase.from("insights").select(PUBLIC_SELECT);
  query = publishedOnly(query);
  query = query.order("published_at", { ascending: false });

  if (options?.categorySlug) {
    query = query.eq("insight_categories.slug", options.categorySlug);
  }
  if (options?.authorSlug) {
    query = query.eq("authors.slug", options.authorSlug);
  }
  if (options?.excludeId) {
    query = query.neq("id", options.excludeId);
  }
  if (options?.limit) {
    query = query.limit(options.limit);
  }

  return unwrap(await query, "listPublishedInsights").map(normalizeInsight);
}

export async function getFeaturedInsights(limit = 3): Promise<InsightWithRelations[]> {
  let query = supabase.from("insights").select(PUBLIC_SELECT).eq("featured", true);
  query = publishedOnly(query);

  const result = await query.order("published_at", { ascending: false }).limit(limit);
  return unwrap(result, "getFeaturedInsights").map(normalizeInsight);
}

/**
 * Fetches a single article by slug. Returns null rather than throwing when the
 * article does not exist or is not visible to the caller, so the route can show
 * its 404 state instead of an error boundary.
 */
export async function getInsightBySlug(slug: string): Promise<InsightWithRelations | null> {
  const { data, error } = await supabase
    .from("insights")
    .select(PUBLIC_SELECT)
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw new ServiceError(`getInsightBySlug(${slug}): ${error.message}`, error);
  return data ? normalizeInsight(data) : null;
}

/**
 * Related articles: same category first, topped up with the most recent others
 * so the section is never half-empty on a thin category.
 */
export async function getRelatedInsights(
  insight: Pick<Insight, "id" | "category_id">,
  limit = 3,
): Promise<InsightWithRelations[]> {
  const sameCategory = insight.category_id
    ? await listPublishedInsights({ limit, excludeId: insight.id }).then((rows) =>
        rows.filter((row) => row.category_id === insight.category_id),
      )
    : [];

  if (sameCategory.length >= limit) return sameCategory.slice(0, limit);

  const seen = new Set([insight.id, ...sameCategory.map((r) => r.id)]);
  const filler = (await listPublishedInsights({ limit: limit + seen.size })).filter(
    (row) => !seen.has(row.id),
  );

  return [...sameCategory, ...filler].slice(0, limit);
}

// ---------------------------------------------------------------------------
// Admin
// ---------------------------------------------------------------------------

/** Every insight the caller is allowed to see — RLS decides the real scope. */
export async function listAllInsights(options?: {
  status?: ContentStatus;
  search?: string;
}): Promise<InsightWithRelations[]> {
  let query = supabase.from("insights").select(PUBLIC_SELECT).order("updated_at", {
    ascending: false,
  });

  if (options?.status) query = query.eq("status", options.status);
  if (options?.search) query = query.ilike("title", `%${options.search}%`);

  return unwrap(await query, "listAllInsights").map(normalizeInsight);
}

export async function getInsightById(id: string): Promise<InsightWithRelations | null> {
  const { data, error } = await supabase
    .from("insights")
    .select(PUBLIC_SELECT)
    .eq("id", id)
    .maybeSingle();

  if (error) throw new ServiceError(`getInsightById(${id}): ${error.message}`, error);
  return data ? normalizeInsight(data) : null;
}

export async function isSlugTaken(slug: string, exceptId?: string): Promise<boolean> {
  let query = supabase.from("insights").select("id").eq("slug", slug);
  if (exceptId) query = query.neq("id", exceptId);

  const { data, error } = await query.limit(1);
  if (error) throw new ServiceError(`isSlugTaken(${slug}): ${error.message}`, error);
  return (data?.length ?? 0) > 0;
}

/** Generates a slug from a title that is guaranteed not to collide. */
export function buildSlug(title: string, exceptId?: string): Promise<string> {
  return uniqueSlug(slugify(title), (candidate) => isSlugTaken(candidate, exceptId));
}

export async function createInsight(
  input: InsightInput,
  profileId: string,
): Promise<Insight> {
  const result = await supabase
    .from("insights")
    .insert({ ...input, created_by: profileId, updated_by: profileId })
    .select()
    .single();

  return unwrap(result, "createInsight");
}

export async function updateInsight(
  id: string,
  changes: Partial<InsightInput>,
  profileId: string,
): Promise<Insight> {
  const result = await supabase
    .from("insights")
    .update({ ...changes, updated_by: profileId })
    .eq("id", id)
    .select()
    .single();

  return unwrap(result, "updateInsight");
}

/**
 * Status transitions. published_at is stamped on first publish and preserved on
 * re-publish, which keeps the original publication date stable in listings.
 */
export async function publishInsight(
  id: string,
  profileId: string,
  existingPublishedAt: string | null,
): Promise<Insight> {
  return updateInsight(
    id,
    {
      status: "published",
      published_at: existingPublishedAt ?? new Date().toISOString(),
    },
    profileId,
  );
}

export async function scheduleInsight(
  id: string,
  scheduledAt: Date,
  profileId: string,
): Promise<Insight> {
  return updateInsight(
    id,
    { status: "scheduled", scheduled_at: scheduledAt.toISOString() },
    profileId,
  );
}

export async function deleteInsight(id: string): Promise<void> {
  const { error } = await supabase.from("insights").delete().eq("id", id);
  if (error) throw new ServiceError(`deleteInsight(${id}): ${error.message}`, error);
}

export async function getInsightCounts(): Promise<{
  total: number;
  published: number;
  draft: number;
}> {
  const countOf = async (status?: ContentStatus) => {
    let query = supabase.from("insights").select("id", { count: "exact", head: true });
    if (status) query = query.eq("status", status);

    const { count, error } = await query;
    if (error) throw new ServiceError(`getInsightCounts: ${error.message}`, error);
    return count ?? 0;
  };

  const [total, published, draft] = await Promise.all([
    countOf(),
    countOf("published"),
    countOf("draft"),
  ]);

  return { total, published, draft };
}
