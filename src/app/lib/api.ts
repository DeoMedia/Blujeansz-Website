import { supabase, isSupabaseConfigured } from "./supabase";

/**
 * Client for the FastAPI backend.
 *
 * The API owns all database access; the browser never queries Postgres
 * directly. Supabase is still the identity provider, so every request carries
 * the current Supabase access token for the API to verify.
 */

const API_BASE_URL = (import.meta.env.VITE_API_URL ?? "http://localhost:8000").replace(
  /\/$/,
  "",
);

export class ApiError extends Error {
  readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }

  get isUnauthorized(): boolean {
    return this.status === 401;
  }

  get isForbidden(): boolean {
    return this.status === 403;
  }

  get isNotFound(): boolean {
    return this.status === 404;
  }

  /** True when the backend simply is not reachable (not an HTTP error). */
  get isOffline(): boolean {
    return this.status === 0;
  }
}

/**
 * Local development mode.
 *
 * Supabase Auth is a hosted service, so when the API runs against a bare local
 * Postgres there is no Supabase session to read a token from. In that mode the
 * API issues the token itself and it is kept here.
 *
 * Off unless VITE_LOCAL_AUTH is explicitly "true".
 */
export const isLocalAuthMode = import.meta.env.VITE_LOCAL_AUTH === "true";

const LOCAL_TOKEN_KEY = "blujeansz-local-token";

export const localToken = {
  get: () => (isLocalAuthMode ? localStorage.getItem(LOCAL_TOKEN_KEY) : null),
  set: (token: string) => localStorage.setItem(LOCAL_TOKEN_KEY, token),
  clear: () => localStorage.removeItem(LOCAL_TOKEN_KEY),
};

async function authHeader(): Promise<Record<string, string>> {
  if (isLocalAuthMode) {
    const token = localToken.get();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  if (!isSupabaseConfigured) return {};

  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;

  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request<T>(
  path: string,
  options: RequestInit & { json?: unknown } = {},
): Promise<T> {
  const { json, headers, ...rest } = options;

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}/api${path}`, {
      ...rest,
      headers: {
        ...(json !== undefined ? { "Content-Type": "application/json" } : {}),
        ...(await authHeader()),
        ...headers,
      },
      body: json !== undefined ? JSON.stringify(json) : rest.body,
    });
  } catch {
    // fetch only rejects on network failure, which is the case worth
    // distinguishing: the API is down rather than refusing the request.
    throw new ApiError(0, "Cannot reach the content API. Is the backend running?");
  }

  if (response.status === 204) return undefined as T;

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    const detail =
      (payload && typeof payload === "object" && "detail" in payload
        ? String((payload as { detail: unknown }).detail)
        : null) ?? `Request failed (${response.status})`;

    throw new ApiError(response.status, detail);
  }

  return payload as T;
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, json?: unknown) => request<T>(path, { method: "POST", json }),
  put: <T>(path: string, json?: unknown) => request<T>(path, { method: "PUT", json }),
  patch: <T>(path: string, json?: unknown) => request<T>(path, { method: "PATCH", json }),
  delete: <T>(path: string) => request<T>(path, { method: "DELETE" }),

  /** Multipart upload — must not set Content-Type, the browser adds the boundary. */
  upload: <T>(path: string, form: FormData) =>
    request<T>(path, { method: "POST", body: form }),
};

export { API_BASE_URL };
