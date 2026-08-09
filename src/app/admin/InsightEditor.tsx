import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router";
import { ArrowLeft, Save, Send, Eye, Globe, Clock, Archive, Loader2 } from "lucide-react";

import { api, ApiError } from "../lib/api";
import { slugify } from "../lib/slug";
import { useAsync } from "./useAsync";
import { useAuth, canPublish } from "./AuthContext";
import { BlockEditor } from "./BlockEditor";
import {
  PageHeader,
  LoadingState,
  ErrorState,
  StatusBadge,
  Field,
  inputClass,
} from "./components";
import type { ContentBlock } from "../types/content";
import type { ContentStatus, InsightCategory, Author } from "../types/database";

interface InsightForm {
  title: string;
  slug: string;
  excerpt: string;
  content: ContentBlock[];
  category_id: string | null;
  author_id: string | null;
  featured_image_url: string;
  featured_image_alt: string;
  hero_image_position: string;
  read_time_minutes: number | null;
  featured: boolean;
  seo_title: string;
  meta_description: string;
  canonical_url: string;
  og_title: string;
  og_description: string;
  og_image_url: string;
}

const EMPTY: InsightForm = {
  title: "",
  slug: "",
  excerpt: "",
  content: [],
  category_id: null,
  author_id: null,
  featured_image_url: "",
  featured_image_alt: "",
  hero_image_position: "center",
  read_time_minutes: null,
  featured: false,
  seo_title: "",
  meta_description: "",
  canonical_url: "",
  og_title: "",
  og_description: "",
  og_image_url: "",
};

export function InsightEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { profile } = useAuth();
  const isNew = !id;

  const [form, setForm] = useState<InsightForm>(EMPTY);
  const [status, setStatus] = useState<ContentStatus>("draft");
  const [slugEdited, setSlugEdited] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ kind: "ok" | "error"; text: string } | null>(null);
  const [savedId, setSavedId] = useState<string | null>(id ?? null);

  const categories = useAsync(() => api.get<InsightCategory[]>("/categories"), []);
  const authors = useAsync(() => api.get<Author[]>("/authors"), []);

  // Loaded by id, not slug: an editor changing the slug must not break the
  // page they are editing it on.
  const existing = useAsync(
    async () => (id ? api.get<Record<string, unknown>>(`/insights/by-id/${id}`) : null),
    [id],
  );

  useEffect(() => {
    if (!existing.data) return;
    const row = existing.data as Record<string, any>;

    setForm({
      title: row.title ?? "",
      slug: row.slug ?? "",
      excerpt: row.excerpt ?? "",
      content: (row.content ?? []) as ContentBlock[],
      category_id: row.category?.id ?? null,
      author_id: row.author?.id ?? null,
      featured_image_url: row.featured_image_url ?? "",
      featured_image_alt: row.featured_image_alt ?? "",
      hero_image_position: row.hero_image_position ?? "center",
      read_time_minutes: row.read_time_minutes ?? null,
      featured: Boolean(row.featured),
      seo_title: row.seo_title ?? "",
      meta_description: row.meta_description ?? "",
      canonical_url: row.canonical_url ?? "",
      og_title: row.og_title ?? "",
      og_description: row.og_description ?? "",
      og_image_url: row.og_image_url ?? "",
    });
    setStatus(row.status ?? "draft");
    setSlugEdited(true);
  }, [existing.data]);

  const set = <K extends keyof InsightForm>(key: K, value: InsightForm[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  // The slug tracks the title until an editor takes control of it, after which
  // it is left alone — renaming a published article should not silently change
  // its URL.
  const onTitleChange = (title: string) => {
    setForm((prev) => ({
      ...prev,
      title,
      slug: slugEdited ? prev.slug : slugify(title),
    }));
  };

  async function save(): Promise<string | null> {
    setSaving(true);
    setMessage(null);

    const payload = {
      ...form,
      slug: form.slug || slugify(form.title),
      category_id: form.category_id || null,
      author_id: form.author_id || null,
      read_time_minutes: form.read_time_minutes || null,
    };

    try {
      const saved = savedId
        ? await api.put<{ id: string }>(`/insights/${savedId}`, payload)
        : await api.post<{ id: string }>("/insights", payload);

      setSavedId(saved.id);
      setMessage({ kind: "ok", text: "Saved." });

      if (isNew) navigate(`/admin/insights/${saved.id}/edit`, { replace: true });
      return saved.id;
    } catch (err) {
      setMessage({
        kind: "error",
        text: err instanceof ApiError ? err.message : "Could not save.",
      });
      return null;
    } finally {
      setSaving(false);
    }
  }

  async function changeStatus(next: ContentStatus, scheduledAt?: string) {
    const targetId = savedId ?? (await save());
    if (!targetId) return;

    setSaving(true);
    setMessage(null);

    try {
      await api.post(`/insights/${targetId}/status`, {
        status: next,
        scheduled_at: scheduledAt ?? null,
      });
      setStatus(next);
      setMessage({ kind: "ok", text: `Status changed to ${next.replace("_", " ")}.` });
    } catch (err) {
      setMessage({
        kind: "error",
        text: err instanceof ApiError ? err.message : "Could not change status.",
      });
    } finally {
      setSaving(false);
    }
  }

  if (id && existing.loading) return <LoadingState label="Loading article…" />;
  if (id && existing.error) return <ErrorState message={existing.error} onRetry={existing.reload} />;

  const mayPublish = canPublish(profile);

  return (
    <>
      <Link
        to="/admin/insights"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#0B1C2C] mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Insights
      </Link>

      <PageHeader
        title={isNew ? "New Insight" : "Edit Insight"}
        action={<StatusBadge status={status} />}
      />

      {message && (
        <div
          role="status"
          className={`mb-6 px-4 py-3 rounded-sm text-sm ${
            message.kind === "ok"
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main column */}
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white border border-gray-200 rounded-sm p-5 space-y-4">
            <Field label="Title" required>
              <input
                value={form.title}
                onChange={(e) => onTitleChange(e.target.value)}
                className={inputClass}
                placeholder="Article title"
              />
            </Field>

            <Field label="Slug" hint="The URL for this article. Edit with care once published.">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400 whitespace-nowrap">/insights/</span>
                <input
                  value={form.slug}
                  onChange={(e) => {
                    setSlugEdited(true);
                    set("slug", slugify(e.target.value));
                  }}
                  className={inputClass}
                />
              </div>
            </Field>

            <Field label="Excerpt" hint="Shown on cards and used as the meta description fallback.">
              <textarea
                rows={3}
                value={form.excerpt}
                onChange={(e) => set("excerpt", e.target.value)}
                className={inputClass}
              />
            </Field>
          </div>

          <div className="bg-white border border-gray-200 rounded-sm p-5">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-4">
              Article Content
            </h2>
            <BlockEditor blocks={form.content} onChange={(blocks) => set("content", blocks)} />
          </div>

          <details className="bg-white border border-gray-200 rounded-sm">
            <summary className="px-5 py-4 cursor-pointer text-sm font-semibold uppercase tracking-wider text-gray-500">
              SEO
            </summary>
            <div className="px-5 pb-5 space-y-4">
              <Field label="SEO title" hint="Falls back to the article title.">
                <input
                  value={form.seo_title}
                  onChange={(e) => set("seo_title", e.target.value)}
                  className={inputClass}
                />
              </Field>
              <Field label="Meta description" hint="Falls back to the excerpt.">
                <textarea
                  rows={2}
                  value={form.meta_description}
                  onChange={(e) => set("meta_description", e.target.value)}
                  className={inputClass}
                />
              </Field>
              <Field label="Canonical URL">
                <input
                  value={form.canonical_url}
                  onChange={(e) => set("canonical_url", e.target.value)}
                  className={inputClass}
                />
              </Field>
              <Field label="OG title">
                <input
                  value={form.og_title}
                  onChange={(e) => set("og_title", e.target.value)}
                  className={inputClass}
                />
              </Field>
              <Field label="OG description">
                <textarea
                  rows={2}
                  value={form.og_description}
                  onChange={(e) => set("og_description", e.target.value)}
                  className={inputClass}
                />
              </Field>
              <Field label="OG image URL" hint="Falls back to the featured image.">
                <input
                  value={form.og_image_url}
                  onChange={(e) => set("og_image_url", e.target.value)}
                  className={inputClass}
                />
              </Field>
            </div>
          </details>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          <div className="bg-white border border-gray-200 rounded-sm p-5 space-y-3">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-1">
              Publishing
            </h2>

            <button
              onClick={() => void save()}
              disabled={saving || !form.title.trim()}
              className="w-full inline-flex items-center justify-center gap-2 bg-[#0B1C2C] text-white py-2.5 rounded-sm text-sm font-semibold hover:bg-[#1a3a52] disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save Draft
            </button>

            <button
              onClick={() => void changeStatus("in_review")}
              disabled={saving || !form.title.trim()}
              className="w-full inline-flex items-center justify-center gap-2 border border-gray-300 py-2.5 rounded-sm text-sm font-semibold text-gray-700 hover:border-gray-400 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              Submit for Review
            </button>

            {savedId && (
              <Link
                to={`/insights/${form.slug}`}
                target="_blank"
                className="w-full inline-flex items-center justify-center gap-2 border border-gray-300 py-2.5 rounded-sm text-sm font-semibold text-gray-700 hover:border-gray-400"
              >
                <Eye className="w-4 h-4" />
                Preview
              </Link>
            )}

            <div className="pt-3 border-t border-gray-100 space-y-3">
              <button
                onClick={() => void changeStatus("published")}
                disabled={saving || !mayPublish || !form.title.trim()}
                title={mayPublish ? undefined : "You do not have permission to publish."}
                className="w-full inline-flex items-center justify-center gap-2 bg-green-700 text-white py-2.5 rounded-sm text-sm font-semibold hover:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Globe className="w-4 h-4" />
                Publish
              </button>

              <ScheduleControl
                disabled={saving || !mayPublish}
                onSchedule={(when) => void changeStatus("scheduled", when)}
              />

              <button
                onClick={() => void changeStatus("archived")}
                disabled={saving || !savedId}
                className="w-full inline-flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-gray-700 py-1 disabled:opacity-50"
              >
                <Archive className="w-4 h-4" />
                Archive
              </button>
            </div>

            {!mayPublish && (
              <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-sm p-2.5">
                You can write and submit for review. An administrator publishes.
              </p>
            )}
          </div>

          <div className="bg-white border border-gray-200 rounded-sm p-5 space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
              Organisation
            </h2>

            <Field label="Category">
              <select
                value={form.category_id ?? ""}
                onChange={(e) => set("category_id", e.target.value || null)}
                className={inputClass}
              >
                <option value="">— None —</option>
                {categories.data?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Author">
              <select
                value={form.author_id ?? ""}
                onChange={(e) => set("author_id", e.target.value || null)}
                className={inputClass}
              >
                <option value="">— None —</option>
                {authors.data?.map((author) => (
                  <option key={author.id} value={author.id}>
                    {author.display_name}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Read time (minutes)" hint="Leave blank to estimate from length.">
              <input
                type="number"
                min={1}
                value={form.read_time_minutes ?? ""}
                onChange={(e) =>
                  set("read_time_minutes", e.target.value ? Number(e.target.value) : null)
                }
                className={inputClass}
              />
            </Field>

            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => set("featured", e.target.checked)}
              />
              Featured article
            </label>
          </div>

          <div className="bg-white border border-gray-200 rounded-sm p-5 space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
              Featured Image
            </h2>

            <Field label="Image URL" hint="Upload in Media, then paste the URL here.">
              <input
                value={form.featured_image_url}
                onChange={(e) => set("featured_image_url", e.target.value)}
                className={inputClass}
              />
            </Field>

            <Field label="Alt text" hint="Describes the image for screen readers.">
              <input
                value={form.featured_image_alt}
                onChange={(e) => set("featured_image_alt", e.target.value)}
                className={inputClass}
              />
            </Field>

            {form.featured_image_url && (
              <img
                src={form.featured_image_url}
                alt=""
                className="w-full rounded-sm border border-gray-200"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function ScheduleControl({
  disabled,
  onSchedule,
}: {
  disabled: boolean;
  onSchedule: (isoDate: string) => void;
}) {
  const [when, setWhen] = useState("");

  return (
    <div className="space-y-2">
      <input
        type="datetime-local"
        value={when}
        onChange={(e) => setWhen(e.target.value)}
        disabled={disabled}
        className={inputClass}
      />
      <button
        onClick={() => when && onSchedule(new Date(when).toISOString())}
        disabled={disabled || !when}
        className="w-full inline-flex items-center justify-center gap-2 border border-gray-300 py-2.5 rounded-sm text-sm font-semibold text-gray-700 hover:border-gray-400 disabled:opacity-50"
      >
        <Clock className="w-4 h-4" />
        Schedule
      </button>
    </div>
  );
}
