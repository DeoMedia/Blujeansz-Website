import { supabase } from "../lib/supabase";
import { slugify, uniqueSlug } from "../lib/slug";
import { unwrap, ServiceError } from "./shared";
import type { Author, AuthorInput } from "../types/database";

export async function listActiveAuthors(): Promise<Author[]> {
  const result = await supabase
    .from("authors")
    .select("*")
    .eq("active", true)
    .order("display_name", { ascending: true });

  return unwrap(result, "listActiveAuthors");
}

export async function listAllAuthors(): Promise<Author[]> {
  const result = await supabase
    .from("authors")
    .select("*")
    .order("display_name", { ascending: true });

  return unwrap(result, "listAllAuthors");
}

export async function getAuthorBySlug(slug: string): Promise<Author | null> {
  const { data, error } = await supabase
    .from("authors")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw new ServiceError(`getAuthorBySlug(${slug}): ${error.message}`, error);
  return data ?? null;
}

export async function isSlugTaken(slug: string, exceptId?: string): Promise<boolean> {
  let query = supabase.from("authors").select("id").eq("slug", slug);
  if (exceptId) query = query.neq("id", exceptId);

  const { data, error } = await query.limit(1);
  if (error) throw new ServiceError(`isSlugTaken(${slug}): ${error.message}`, error);
  return (data?.length ?? 0) > 0;
}

export function buildSlug(displayName: string, exceptId?: string): Promise<string> {
  return uniqueSlug(slugify(displayName), (candidate) => isSlugTaken(candidate, exceptId));
}

export async function createAuthor(input: AuthorInput): Promise<Author> {
  return unwrap(await supabase.from("authors").insert(input).select().single(), "createAuthor");
}

export async function updateAuthor(id: string, changes: Partial<AuthorInput>): Promise<Author> {
  return unwrap(
    await supabase.from("authors").update(changes).eq("id", id).select().single(),
    "updateAuthor",
  );
}

export async function deleteAuthor(id: string): Promise<void> {
  const { error } = await supabase.from("authors").delete().eq("id", id);
  if (error) throw new ServiceError(`deleteAuthor(${id}): ${error.message}`, error);
}

export async function getAuthorCount(): Promise<number> {
  const { count, error } = await supabase
    .from("authors")
    .select("id", { count: "exact", head: true });

  if (error) throw new ServiceError(`getAuthorCount: ${error.message}`, error);
  return count ?? 0;
}
