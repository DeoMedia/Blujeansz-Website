import { supabase } from "../lib/supabase";
import { ServiceError } from "./shared";
import type { Profile, UserRole } from "../types/database";

/**
 * Authentication and the caller's CMS identity.
 *
 * There is no public registration by design — accounts are created by an
 * administrator, which is why this module exposes signIn but no signUp.
 */

export async function signIn(email: string, password: string): Promise<void> {
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    // Supabase returns the same message for "no such user" and "wrong
    // password"; keep it that way rather than confirming which accounts exist.
    throw new ServiceError(
      error.message === "Invalid login credentials"
        ? "Incorrect email or password."
        : error.message,
      error,
    );
  }

  await touchLastLogin();
}

export async function signOut(): Promise<void> {
  const { error } = await supabase.auth.signOut();
  if (error) throw new ServiceError(error.message, error);
}

export async function sendPasswordReset(email: string, redirectTo: string): Promise<void> {
  const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });
  if (error) throw new ServiceError(error.message, error);
}

export async function updatePassword(password: string): Promise<void> {
  const { error } = await supabase.auth.updateUser({ password });
  if (error) throw new ServiceError(error.message, error);
}

/**
 * The CMS profile for the signed-in user, or null when signed out or when the
 * account has no active profile (invited-but-not-activated, or suspended).
 */
export async function getCurrentProfile(): Promise<Profile | null> {
  const { data: sessionData } = await supabase.auth.getSession();
  const userId = sessionData.session?.user.id;
  if (!userId) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) throw new ServiceError(`getCurrentProfile: ${error.message}`, error);
  return data ?? null;
}

async function touchLastLogin(): Promise<void> {
  const { data } = await supabase.auth.getSession();
  const userId = data.session?.user.id;
  if (!userId) return;

  // Best-effort only — a failure here must never block a successful sign-in.
  const { error } = await supabase
    .from("profiles")
    .update({ last_login_at: new Date().toISOString() })
    .eq("user_id", userId);

  if (error) console.warn("[auth] could not record last_login_at:", error.message);
}

const ROLE_RANK: Record<UserRole, number> = {
  super_admin: 4,
  admin: 3,
  editor: 2,
  author: 1,
};

/**
 * Mirrors public.auth_is_at_least() in the database.
 *
 * This exists to shape the UI — hiding buttons a user cannot use. It is NOT the
 * security boundary; RLS is. Never rely on this alone to protect data.
 */
export function hasAtLeastRole(profile: Profile | null, minimum: UserRole): boolean {
  if (!profile || profile.status !== "active") return false;
  return ROLE_RANK[profile.role] >= ROLE_RANK[minimum];
}

/** Mirrors public.auth_can_publish(). */
export function canPublish(profile: Profile | null): boolean {
  if (!profile || profile.status !== "active") return false;
  return profile.role === "super_admin" || profile.role === "admin" || profile.can_publish;
}

export function onAuthStateChange(callback: () => void): () => void {
  const { data } = supabase.auth.onAuthStateChange(() => callback());
  return () => data.subscription.unsubscribe();
}
