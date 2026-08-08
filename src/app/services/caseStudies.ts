import { supabase } from "../lib/supabase";
import { slugify, uniqueSlug } from "../lib/slug";
import { unwrap, ServiceError } from "./shared";
import type {
  CaseStudy,
  CaseStudyInput,
  CaseStudyMetric,
  CaseStudyWithMetrics,
  ContentStatus,
} from "../types/database";

const SELECT_WITH_METRICS = `
  *,
  metrics:case_study_metrics(*)
`;

/** Metrics come back unordered from the join; the display order is meaningful. */
function sortMetrics(row: CaseStudyWithMetrics): CaseStudyWithMetrics {
  return {
    ...row,
    metrics: [...(row.metrics ?? [])].sort((a, b) => a.display_order - b.display_order),
  };
}

export async function listPublishedCaseStudies(options?: {
  limit?: number;
}): Promise<CaseStudyWithMetrics[]> {
  let query = supabase
    .from("case_studies")
    .select(SELECT_WITH_METRICS)
    .eq("status", "published")
    .lte("published_at", new Date().toISOString())
    .order("published_at", { ascending: false });

  if (options?.limit) query = query.limit(options.limit);

  const rows = unwrap(await query, "listPublishedCaseStudies") as CaseStudyWithMetrics[];
  return rows.map(sortMetrics);
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudyWithMetrics | null> {
  const { data, error } = await supabase
    .from("case_studies")
    .select(SELECT_WITH_METRICS)
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw new ServiceError(`getCaseStudyBySlug(${slug}): ${error.message}`, error);
  return data ? sortMetrics(data as CaseStudyWithMetrics) : null;
}

// ---------------------------------------------------------------------------
// Admin
// ---------------------------------------------------------------------------

export async function listAllCaseStudies(options?: {
  status?: ContentStatus;
  search?: string;
}): Promise<CaseStudyWithMetrics[]> {
  let query = supabase
    .from("case_studies")
    .select(SELECT_WITH_METRICS)
    .order("updated_at", { ascending: false });

  if (options?.status) query = query.eq("status", options.status);
  if (options?.search) query = query.ilike("title", `%${options.search}%`);

  const rows = unwrap(await query, "listAllCaseStudies") as CaseStudyWithMetrics[];
  return rows.map(sortMetrics);
}

export async function getCaseStudyById(id: string): Promise<CaseStudyWithMetrics | null> {
  const { data, error } = await supabase
    .from("case_studies")
    .select(SELECT_WITH_METRICS)
    .eq("id", id)
    .maybeSingle();

  if (error) throw new ServiceError(`getCaseStudyById(${id}): ${error.message}`, error);
  return data ? sortMetrics(data as CaseStudyWithMetrics) : null;
}

export async function isSlugTaken(slug: string, exceptId?: string): Promise<boolean> {
  let query = supabase.from("case_studies").select("id").eq("slug", slug);
  if (exceptId) query = query.neq("id", exceptId);

  const { data, error } = await query.limit(1);
  if (error) throw new ServiceError(`isSlugTaken(${slug}): ${error.message}`, error);
  return (data?.length ?? 0) > 0;
}

export function buildSlug(title: string, exceptId?: string): Promise<string> {
  return uniqueSlug(slugify(title), (candidate) => isSlugTaken(candidate, exceptId));
}

export async function createCaseStudy(
  input: CaseStudyInput,
  profileId: string,
): Promise<CaseStudy> {
  const result = await supabase
    .from("case_studies")
    .insert({ ...input, created_by: profileId, updated_by: profileId })
    .select()
    .single();

  return unwrap(result, "createCaseStudy");
}

export async function updateCaseStudy(
  id: string,
  changes: Partial<CaseStudyInput>,
  profileId: string,
): Promise<CaseStudy> {
  const result = await supabase
    .from("case_studies")
    .update({ ...changes, updated_by: profileId })
    .eq("id", id)
    .select()
    .single();

  return unwrap(result, "updateCaseStudy");
}

export async function deleteCaseStudy(id: string): Promise<void> {
  const { error } = await supabase.from("case_studies").delete().eq("id", id);
  if (error) throw new ServiceError(`deleteCaseStudy(${id}): ${error.message}`, error);
}

/**
 * Replaces the metric set for a case study.
 *
 * Metrics are free-form and reorderable, so diffing individual rows buys little
 * — deleting and reinserting keeps display_order authoritative and avoids
 * orphaned rows when an editor removes one.
 */
export async function replaceMetrics(
  caseStudyId: string,
  metrics: Array<Pick<CaseStudyMetric, "value" | "label"> & { description?: string | null }>,
): Promise<void> {
  const { error: deleteError } = await supabase
    .from("case_study_metrics")
    .delete()
    .eq("case_study_id", caseStudyId);

  if (deleteError) {
    throw new ServiceError(`replaceMetrics(delete): ${deleteError.message}`, deleteError);
  }

  if (metrics.length === 0) return;

  const { error: insertError } = await supabase.from("case_study_metrics").insert(
    metrics.map((metric, index) => ({
      case_study_id: caseStudyId,
      value: metric.value,
      label: metric.label,
      description: metric.description ?? null,
      display_order: index,
    })),
  );

  if (insertError) {
    throw new ServiceError(`replaceMetrics(insert): ${insertError.message}`, insertError);
  }
}

export async function getCaseStudyCount(): Promise<number> {
  const { count, error } = await supabase
    .from("case_studies")
    .select("id", { count: "exact", head: true });

  if (error) throw new ServiceError(`getCaseStudyCount: ${error.message}`, error);
  return count ?? 0;
}
