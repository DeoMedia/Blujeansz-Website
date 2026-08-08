import { supabase } from "../lib/supabase";
import { slugify } from "../lib/slug";
import { unwrap, ServiceError } from "./shared";
import type { InsightCategory } from "../types/database";

export async function listActiveCategories(): Promise<InsightCategory[]> {
  const result = await supabase
    .from("insight_categories")
    .select("*")
    .eq("active", true)
    .order("display_order", { ascending: true });

  return unwrap(result, "listActiveCategories");
}

export async function listAllCategories(): Promise<InsightCategory[]> {
  const result = await supabase
    .from("insight_categories")
    .select("*")
    .order("display_order", { ascending: true });

  return unwrap(result, "listAllCategories");
}

export async function createCategory(
  input: Pick<InsightCategory, "name"> & Partial<InsightCategory>,
): Promise<InsightCategory> {
  return unwrap(
    await supabase
      .from("insight_categories")
      .insert({ ...input, slug: input.slug ?? slugify(input.name) })
      .select()
      .single(),
    "createCategory",
  );
}

export async function updateCategory(
  id: string,
  changes: Partial<InsightCategory>,
): Promise<InsightCategory> {
  return unwrap(
    await supabase.from("insight_categories").update(changes).eq("id", id).select().single(),
    "updateCategory",
  );
}

export async function deleteCategory(id: string): Promise<void> {
  const { error } = await supabase.from("insight_categories").delete().eq("id", id);
  if (error) throw new ServiceError(`deleteCategory(${id}): ${error.message}`, error);
}
