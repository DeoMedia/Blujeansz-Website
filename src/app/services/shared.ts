import type { PostgrestError } from "@supabase/supabase-js";

/**
 * Error raised by the service layer. Carries the underlying Postgres error so
 * callers can distinguish "denied by RLS" from "network down" without parsing
 * strings at the call site.
 */
export class ServiceError extends Error {
  readonly code: string | undefined;
  readonly cause: PostgrestError | Error | undefined;

  constructor(message: string, cause?: PostgrestError | Error) {
    super(message);
    this.name = "ServiceError";
    this.cause = cause;
    this.code = cause && "code" in cause ? cause.code : undefined;
  }

  /** True when the row exists but RLS refused it (or it simply is not there). */
  get isNotFound(): boolean {
    return this.code === "PGRST116";
  }

  /** True when the database rejected the write on permission grounds. */
  get isForbidden(): boolean {
    return this.code === "42501" || this.code === "PGRST301";
  }
}

/** Throws a ServiceError when a Supabase call failed; otherwise returns data. */
export function unwrap<T>(
  result: { data: T | null; error: PostgrestError | null },
  context: string,
): T {
  if (result.error) {
    throw new ServiceError(`${context}: ${result.error.message}`, result.error);
  }
  if (result.data === null) {
    throw new ServiceError(`${context}: no data returned`);
  }
  return result.data;
}

/**
 * For public pages: never let a database problem blank the whole page. Logs the
 * failure and falls back to a safe empty value instead of throwing.
 */
export async function tolerate<T>(operation: Promise<T>, fallback: T, context: string): Promise<T> {
  try {
    return await operation;
  } catch (error) {
    console.error(`[${context}]`, error);
    return fallback;
  }
}
