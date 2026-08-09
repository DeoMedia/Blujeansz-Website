import { useState, type FormEvent } from "react";
import { Navigate, useLocation } from "react-router";
import { AlertCircle, Loader2 } from "lucide-react";

import { AuthProvider, useAuth } from "./AuthContext";
import { isSupabaseConfigured } from "../lib/supabase";

/**
 * /admin/login
 *
 * There is no registration link, by design: accounts are created by an
 * administrator inviting a user. This screen only ever signs an existing user
 * in or explains why it cannot.
 */
function LoginForm() {
  const { profile, loading, error: profileError, signIn } = useAuth();
  const location = useLocation() as { state?: { from?: string } };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B1C2C]">
        <Loader2 className="w-6 h-6 text-white/60 animate-spin" />
      </div>
    );
  }

  if (profile) {
    return <Navigate to={location.state?.from ?? "/admin"} replace />;
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      await signIn(email.trim(), password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not sign in.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B1C2C] px-6 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <span className="text-2xl font-bold tracking-wider text-white">BLUJEANSZ</span>
          <p className="text-sm text-white/50 mt-2 uppercase tracking-wider">Content Manager</p>
        </div>

        {!isSupabaseConfigured && (
          <div className="mb-6 p-4 bg-amber-500/10 border border-amber-500/30 rounded-sm flex gap-3">
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-sm text-amber-100">
              <p className="font-semibold mb-1">Not configured</p>
              <p className="text-amber-200/80">
                Set <code className="text-amber-100">VITE_SUPABASE_URL</code> and{" "}
                <code className="text-amber-100">VITE_SUPABASE_ANON_KEY</code> in{" "}
                <code className="text-amber-100">.env.local</code>, then restart the dev
                server.
              </p>
            </div>
          </div>
        )}

        {(error ?? profileError) && (
          <div
            role="alert"
            className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-sm flex gap-3"
          >
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <p className="text-sm text-red-100">{error ?? profileError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-sm p-8 space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#0B1C2C] mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="username"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              disabled={!isSupabaseConfigured || submitting}
              className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-[#0B1C2C] disabled:bg-gray-50 disabled:text-gray-400"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#0B1C2C] mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              disabled={!isSupabaseConfigured || submitting}
              className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-[#0B1C2C] disabled:bg-gray-50 disabled:text-gray-400"
            />
          </div>

          <button
            type="submit"
            disabled={!isSupabaseConfigured || submitting}
            className="w-full flex items-center justify-center gap-2 bg-[#0B1C2C] text-white py-3 rounded-sm font-semibold hover:bg-[#1a3a52] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
            {submitting ? "Signing in…" : "Sign in"}
          </button>

          <p className="text-xs text-gray-500 text-center pt-2">
            Accounts are created by an administrator. Contact one if you need access.
          </p>
        </form>
      </div>
    </div>
  );
}

export function AdminLogin() {
  return (
    <AuthProvider>
      <LoginForm />
    </AuthProvider>
  );
}
