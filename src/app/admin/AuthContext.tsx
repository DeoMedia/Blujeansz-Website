import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

import { supabase, isSupabaseConfigured } from "../lib/supabase";
import { api, ApiError } from "../lib/api";
import type { Profile, UserRole } from "../types/database";

interface AuthState {
  profile: Profile | null;
  loading: boolean;
  /** Set when a session exists but the CMS profile could not be loaded. */
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthState | null>(null);

const ROLE_RANK: Record<UserRole, number> = {
  super_admin: 4,
  admin: 3,
  editor: 2,
  author: 1,
};

/**
 * Mirrors auth_is_at_least() in SQL and require_role() in the API.
 *
 * This shapes the UI only — hiding controls a user cannot use. The API and RLS
 * are the actual boundary; never treat this as the security check.
 */
export function hasAtLeastRole(profile: Profile | null, minimum: UserRole): boolean {
  if (!profile || profile.status !== "active") return false;
  return ROLE_RANK[profile.role] >= ROLE_RANK[minimum];
}

export function canPublish(profile: Profile | null): boolean {
  if (!profile || profile.status !== "active") return false;
  return profile.role === "super_admin" || profile.role === "admin" || profile.can_publish;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadProfile() {
    if (!isSupabaseConfigured) {
      setProfile(null);
      setError(null);
      setLoading(false);
      return;
    }

    const { data } = await supabase.auth.getSession();
    if (!data.session) {
      setProfile(null);
      setError(null);
      setLoading(false);
      return;
    }

    try {
      setProfile(await api.get<Profile>("/me"));
      setError(null);
    } catch (err) {
      setProfile(null);
      // A valid token with no usable profile (suspended, invited, or no CMS
      // record) is a different problem from being signed out, and the login
      // screen should say so rather than silently loop.
      setError(err instanceof ApiError ? err.message : "Could not load your profile.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadProfile();

    if (!isSupabaseConfigured) return;

    const { data } = supabase.auth.onAuthStateChange(() => {
      void loadProfile();
    });

    return () => data.subscription.unsubscribe();
  }, []);

  const value = useMemo<AuthState>(
    () => ({
      profile,
      loading,
      error,
      signIn: async (email, password) => {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) {
          // Supabase returns one message for unknown-user and wrong-password.
          // Keep it that way rather than confirming which accounts exist.
          throw new Error(
            signInError.message === "Invalid login credentials"
              ? "Incorrect email or password."
              : signInError.message,
          );
        }

        await loadProfile();
      },
      signOut: async () => {
        await supabase.auth.signOut();
        setProfile(null);
      },
      refresh: loadProfile,
    }),
    [profile, loading, error],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthState {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside <AuthProvider>");
  return context;
}
