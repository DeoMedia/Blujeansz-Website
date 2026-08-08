import { supabase } from "../lib/supabase";
import { slugify, uniqueSlug } from "../lib/slug";
import { unwrap, ServiceError } from "./shared";
import type { StaffMember, StaffMemberInput } from "../types/database";

/** The About page ordering: active members, by display_order. */
export async function listActiveStaff(): Promise<StaffMember[]> {
  const result = await supabase
    .from("staff_members")
    .select("*")
    .eq("active", true)
    .order("display_order", { ascending: true });

  return unwrap(result, "listActiveStaff");
}

export async function listAllStaff(): Promise<StaffMember[]> {
  const result = await supabase
    .from("staff_members")
    .select("*")
    .order("display_order", { ascending: true });

  return unwrap(result, "listAllStaff");
}

export async function getStaffBySlug(slug: string): Promise<StaffMember | null> {
  const { data, error } = await supabase
    .from("staff_members")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw new ServiceError(`getStaffBySlug(${slug}): ${error.message}`, error);
  return data ?? null;
}

export async function isSlugTaken(slug: string, exceptId?: string): Promise<boolean> {
  let query = supabase.from("staff_members").select("id").eq("slug", slug);
  if (exceptId) query = query.neq("id", exceptId);

  const { data, error } = await query.limit(1);
  if (error) throw new ServiceError(`isSlugTaken(${slug}): ${error.message}`, error);
  return (data?.length ?? 0) > 0;
}

export function buildSlug(name: string, exceptId?: string): Promise<string> {
  return uniqueSlug(slugify(name), (candidate) => isSlugTaken(candidate, exceptId));
}

export async function createStaffMember(input: StaffMemberInput): Promise<StaffMember> {
  return unwrap(
    await supabase.from("staff_members").insert(input).select().single(),
    "createStaffMember",
  );
}

export async function updateStaffMember(
  id: string,
  changes: Partial<StaffMemberInput>,
): Promise<StaffMember> {
  return unwrap(
    await supabase.from("staff_members").update(changes).eq("id", id).select().single(),
    "updateStaffMember",
  );
}

export async function deleteStaffMember(id: string): Promise<void> {
  const { error } = await supabase.from("staff_members").delete().eq("id", id);
  if (error) throw new ServiceError(`deleteStaffMember(${id}): ${error.message}`, error);
}

/** Persists a drag-reordered team list in one round trip. */
export async function reorderStaff(orderedIds: string[]): Promise<void> {
  const updates = orderedIds.map((id, index) =>
    supabase.from("staff_members").update({ display_order: index + 1 }).eq("id", id),
  );

  const results = await Promise.all(updates);
  const failure = results.find((result) => result.error);
  if (failure?.error) {
    throw new ServiceError(`reorderStaff: ${failure.error.message}`, failure.error);
  }
}

export async function getStaffCount(): Promise<number> {
  const { count, error } = await supabase
    .from("staff_members")
    .select("id", { count: "exact", head: true });

  if (error) throw new ServiceError(`getStaffCount: ${error.message}`, error);
  return count ?? 0;
}
