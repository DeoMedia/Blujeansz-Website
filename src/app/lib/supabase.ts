import { createClient } from "@supabase/supabase-js";

/**
 * Browser Supabase client.
 *
 * Only the anon key belongs here — it is published in the bundle and is safe
 * *because* every table is guarded by RLS. The service-role key bypasses RLS
 * entirely and must never appear in frontend code or in a VITE_ variable, since
 * anything prefixed VITE_ is inlined into the client bundle at build time.
 */

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

if (!isSupabaseConfigured && import.meta.env.DEV) {
  console.warn(
    "[supabase] VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY are not set. " +
      "Copy .env.example to .env.local and fill them in. The site will fall " +
      "back to bundled content until then.",
  );
}

export const supabase = createClient(
  supabaseUrl ?? "http://localhost:54321",
  supabaseAnonKey ?? "public-anon-key-placeholder",
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storageKey: "blujeansz-auth",
    },
  },
);
