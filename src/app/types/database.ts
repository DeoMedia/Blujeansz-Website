/**
 * Typed shape of the BLUJEANSZ Supabase schema.
 *
 * Hand-maintained to mirror supabase/migrations in the backend repo. Once the
 * project is linked you can regenerate this with:
 *
 *   supabase gen types typescript --project-id <id> > src/app/types/database.ts
 *
 * Keep the two in step — the service layer is typed entirely off this file.
 */

export type UserRole = "super_admin" | "admin" | "editor" | "author";
export type UserStatus = "active" | "invited" | "suspended";
export type ContentStatus = "draft" | "in_review" | "scheduled" | "published" | "archived";

export interface Profile {
  id: string;
  user_id: string;
  first_name: string | null;
  last_name: string | null;
  email: string;
  avatar_url: string | null;
  role: UserRole;
  status: UserStatus;
  can_publish: boolean;
  created_at: string;
  updated_at: string;
  last_login_at: string | null;
}

export interface Author {
  id: string;
  profile_id: string | null;
  first_name: string;
  last_name: string;
  display_name: string;
  slug: string;
  job_title: string | null;
  short_bio: string | null;
  full_bio: string | null;
  profile_image_url: string | null;
  email: string | null;
  linkedin_url: string | null;
  instagram_url: string | null;
  website_url: string | null;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface StaffMember {
  id: string;
  profile_id: string | null;
  first_name: string;
  last_name: string;
  slug: string;
  job_title: string | null;
  department: string | null;
  short_bio: string | null;
  full_bio: string | null;
  profile_image_url: string | null;
  email: string | null;
  linkedin_url: string | null;
  instagram_url: string | null;
  website_url: string | null;
  display_order: number;
  featured: boolean;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface InsightCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  display_order: number;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Insight {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  /** Raw jsonb — run through parseContentBlocks() before rendering. */
  content: unknown;
  category_id: string | null;
  author_id: string | null;
  featured_image_url: string | null;
  featured_image_alt: string | null;
  hero_image_position: string;
  read_time_minutes: number | null;
  status: ContentStatus;
  featured: boolean;
  seo_title: string | null;
  meta_description: string | null;
  canonical_url: string | null;
  og_title: string | null;
  og_description: string | null;
  og_image_url: string | null;
  created_by: string | null;
  updated_by: string | null;
  created_at: string;
  updated_at: string;
  published_at: string | null;
  scheduled_at: string | null;
}

/** An insight joined to its category and author, as the public pages read it. */
export interface InsightWithRelations extends Insight {
  category: InsightCategory | null;
  author: Author | null;
}

export interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  client: string | null;
  industry: string | null;
  project_year: number | null;
  location: string | null;
  summary: string | null;
  featured_image_url: string | null;
  hero_image_url: string | null;
  challenge: unknown;
  strategic_approach: unknown;
  solution: unknown;
  execution: unknown;
  results_summary: unknown;
  client_quote: string | null;
  quote_attribution: string | null;
  status: ContentStatus;
  featured: boolean;
  seo_title: string | null;
  meta_description: string | null;
  og_image_url: string | null;
  created_by: string | null;
  updated_by: string | null;
  created_at: string;
  updated_at: string;
  published_at: string | null;
  scheduled_at: string | null;
}

export interface CaseStudyMetric {
  id: string;
  case_study_id: string;
  value: string;
  label: string;
  description: string | null;
  display_order: number;
  created_at: string;
}

export interface CaseStudyWithMetrics extends CaseStudy {
  metrics: CaseStudyMetric[];
}

export interface MediaAsset {
  id: string;
  file_name: string;
  storage_path: string;
  public_url: string;
  mime_type: string;
  file_size: number;
  width: number | null;
  height: number | null;
  alt_text: string | null;
  caption: string | null;
  uploaded_by: string | null;
  created_at: string;
}

export interface Service {
  id: string;
  name: string;
  slug: string;
  short_description: string | null;
  description: string | null;
  icon: string | null;
  display_order: number;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface SiteSetting {
  id: string;
  key: string;
  value: unknown;
  description: string | null;
  is_public: boolean;
  updated_by: string | null;
  updated_at: string;
}

/** Columns the client is allowed to supply; the rest are server-managed. */
export type InsightInput = Partial<
  Omit<Insight, "id" | "created_at" | "updated_at" | "created_by" | "updated_by">
> & { title: string; slug: string };

export type CaseStudyInput = Partial<
  Omit<CaseStudy, "id" | "created_at" | "updated_at" | "created_by" | "updated_by">
> & { title: string; slug: string };

export type AuthorInput = Partial<Omit<Author, "id" | "created_at" | "updated_at">> & {
  first_name: string;
  last_name: string;
  display_name: string;
  slug: string;
};

export type StaffMemberInput = Partial<Omit<StaffMember, "id" | "created_at" | "updated_at">> & {
  first_name: string;
  last_name: string;
  slug: string;
};
