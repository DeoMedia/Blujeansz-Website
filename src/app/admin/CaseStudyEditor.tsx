import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router";
import {
  ArrowLeft,
  Save,
  Send,
  Eye,
  Globe,
  Clock,
  Archive,
  Loader2,
  Trash2,
  Plus,
} from "lucide-react";

import { api, ApiError } from "../lib/api";
import { slugify } from "../lib/slug";
import { useAsync } from "./useAsync";
import { useAuth, canPublish } from "./AuthContext";
import { BlockEditor } from "./BlockEditor";
import { PageHeader, LoadingState, ErrorState, StatusBadge, Field, inputClass } from "./components";
import type { ContentBlock } from "../types/content";
import type { ContentStatus } from "../types/database";

interface Metric {
  value: string;
  label: string;
  description?: string | null;
}

/** The five narrative sections, each stored as content blocks. */
const SECTIONS = [
  { key: "challenge", label: "The Challenge" },
  { key: "strategic_approach", label: "Strategic Approach" },
  { key: "solution", label: "Solution" },
  { key: "execution", label: "Execution" },
  { key: "results_summary", label: "Results" },
] as const;

type SectionKey = (typeof SECTIONS)[number]["key"];

interface CaseStudyForm {
  title: string;
  slug: string;
  client: string;
  industry: string;
  project_year: number | null;
  location: string;
  summary: string;
  featured_image_url: string;
  hero_image_url: string;
  challenge: ContentBlock[];
  strategic_approach: ContentBlock[];
  solution: ContentBlock[];
  execution: ContentBlock[];
  results_summary: ContentBlock[];
  client_quote: string;
  quote_attribution: string;
  featured: boolean;
  seo_title: string;
  meta_description: string;
  og_image_url: string;
  metrics: Metric[];
}

const EMPTY: CaseStudyForm = {
  title: "",
  slug: "",
  client: "",
  industry: "",
  project_year: null,
  location: "",
  summary: "",
  featured_image_url: "",
  hero_image_url: "",
  challenge: [],
  strategic_approach: [],
  solution: [],
  execution: [],
  results_summary: [],
  client_quote: "",
  quote_attribution: "",
  featured: false,
  seo_title: "",
  meta_description: "",
  og_image_url: "",
  metrics: [],
};

export function CaseStudyEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { profile } = useAuth();
  const isNew = !id;

  const [form, setForm] = useState<CaseStudyForm>(EMPTY);
  const [status, setStatus] = useState<ContentStatus>("draft");
  const [slugEdited, setSlugEdited] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ kind: "ok" | "error"; text: string } | null>(null);
  const [savedId, setSavedId] = useState<string | null>(id ?? null);
  const [activeSection, setActiveSection] = useState<SectionKey>("challenge");

  const existing = useAsync(
    async () => (id ? api.get<Record<string, any>>(`/case-studies/by-id/${id}`) : null),
    [id],
  );

  useEffect(() => {
    if (!existing.data) return;
    const row = existing.data;

    setForm({
      title: row.title ?? "",
      slug: row.slug ?? "",
      client: row.client ?? "",
      industry: row.industry ?? "",
      project_year: row.project_year ?? null,
      location: row.location ?? "",
      summary: row.summary ?? "",
      featured_image_url: row.featured_image_url ?? "",
      hero_image_url: row.hero_image_url ?? "",
      challenge: row.challenge ?? [],
      strategic_approach: row.strategic_approach ?? [],
      solution: row.solution ?? [],
      execution: row.execution ?? [],
      results_summary: row.results_summary ?? [],
      client_quote: row.client_quote ?? "",
      quote_attribution: row.quote_attribution ?? "",
      featured: Boolean(row.featured),
      seo_title: row.seo_title ?? "",
      meta_description: row.meta_description ?? "",
      og_image_url: row.og_image_url ?? "",
      metrics: (row.metrics ?? []).map((m: Metric) => ({
        value: m.value,
        label: m.label,
        description: m.description ?? "",
      })),
    });
    setStatus(row.status ?? "draft");
    setSlugEdited(true);
  }, [existing.data]);

  const set = <K extends keyof CaseStudyForm>(key: K, value: CaseStudyForm[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const onTitleChange = (title: string) =>
    setForm((prev) => ({ ...prev, title, slug: slugEdited ? prev.slug : slugify(title) }));

  async function save(): Promise<string | null> {
    setSaving(true);
    setMessage(null);

    const payload = {
      ...form,
      slug: form.slug || slugify(form.title),
      project_year: form.project_year || null,
      metrics: form.metrics
        // Drop half-filled rows rather than failing validation on the server.
        .filter((metric) => metric.value.trim() && metric.label.trim())
        .map((metric) => ({
          value: metric.value,
          label: metric.label,
          description: metric.description || null,
        })),
    };

    try {
      const saved = savedId
        ? await api.put<{ id: string }>(`/case-studies/${savedId}`, payload)
        : await api.post<{ id: string }>("/case-studies", payload);

      setSavedId(saved.id);
      setMessage({ kind: "ok", text: "Saved." });
      if (isNew) navigate(`/admin/case-studies/${saved.id}/edit`, { replace: true });
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
      await api.post(`/case-studies/${targetId}/status`, {
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

  if (id && existing.loading) return <LoadingState label="Loading case study…" />;
  if (id && existing.error)
    return <ErrorState message={existing.error} onRetry={existing.reload} />;

  const mayPublish = canPublish(profile);

  return (
    <>
      <Link
        to="/admin/case-studies"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#0B1C2C] mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Case Studies
      </Link>

      <PageHeader
        title={isNew ? "New Case Study" : "Edit Case Study"}
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
        <div className="lg:col-span-2 space-y-5">
          {/* Basics */}
          <div className="bg-white border border-gray-200 rounded-sm p-5 space-y-4">
            <Field label="Title" required>
              <input
                value={form.title}
                onChange={(e) => onTitleChange(e.target.value)}
                className={inputClass}
                placeholder="e.g. Nigerian Stock Exchange Rebrand & Relaunch"
              />
            </Field>

            <Field label="Slug">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400 whitespace-nowrap">/case-studies/</span>
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

            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Client">
                <input
                  value={form.client}
                  onChange={(e) => set("client", e.target.value)}
                  className={inputClass}
                />
              </Field>
              <Field label="Industry">
                <input
                  value={form.industry}
                  onChange={(e) => set("industry", e.target.value)}
                  className={inputClass}
                />
              </Field>
              <Field label="Year">
                <input
                  type="number"
                  min={1900}
                  max={2200}
                  value={form.project_year ?? ""}
                  onChange={(e) =>
                    set("project_year", e.target.value ? Number(e.target.value) : null)
                  }
                  className={inputClass}
                />
              </Field>
              <Field label="Location">
                <input
                  value={form.location}
                  onChange={(e) => set("location", e.target.value)}
                  className={inputClass}
                />
              </Field>
            </div>

            <Field label="Summary" hint="The short description shown on the listing cards.">
              <textarea
                rows={3}
                value={form.summary}
                onChange={(e) => set("summary", e.target.value)}
                className={inputClass}
              />
            </Field>
          </div>

          {/* Narrative sections */}
          <div className="bg-white border border-gray-200 rounded-sm">
            <div className="flex flex-wrap gap-1 p-2 border-b border-gray-200 bg-gray-50">
              {SECTIONS.map((section) => {
                const count = form[section.key].length;
                return (
                  <button
                    key={section.key}
                    type="button"
                    onClick={() => setActiveSection(section.key)}
                    className={`px-3 py-2 text-xs font-semibold rounded-sm transition-colors ${
                      activeSection === section.key
                        ? "bg-[#0B1C2C] text-white"
                        : "text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {section.label}
                    {count > 0 && (
                      <span
                        className={`ml-1.5 ${
                          activeSection === section.key ? "text-white/60" : "text-gray-400"
                        }`}
                      >
                        {count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="p-5">
              <BlockEditor
                blocks={form[activeSection]}
                onChange={(blocks) => set(activeSection, blocks)}
              />
            </div>
          </div>

          {/* Metrics */}
          <div className="bg-white border border-gray-200 rounded-sm p-5">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-1">
              Metrics
            </h2>
            <p className="text-xs text-gray-500 mb-4">
              Free-form: any value and label, in any order. For example
              <span className="font-medium"> 42%</span> /
              <span className="font-medium"> Increase in Engagement</span>.
            </p>

            <div className="space-y-3">
              {form.metrics.map((metric, index) => (
                <div key={index} className="flex flex-col sm:flex-row gap-2">
                  <input
                    value={metric.value}
                    onChange={(e) => {
                      const metrics = [...form.metrics];
                      metrics[index] = { ...metric, value: e.target.value };
                      set("metrics", metrics);
                    }}
                    className={`${inputClass} sm:w-36`}
                    placeholder="42%"
                  />
                  <input
                    value={metric.label}
                    onChange={(e) => {
                      const metrics = [...form.metrics];
                      metrics[index] = { ...metric, label: e.target.value };
                      set("metrics", metrics);
                    }}
                    className={inputClass}
                    placeholder="Increase in Engagement"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      set(
                        "metrics",
                        form.metrics.filter((_, i) => i !== index),
                      )
                    }
                    aria-label="Remove metric"
                    className="px-2 text-gray-400 hover:text-red-600 self-center"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => set("metrics", [...form.metrics, { value: "", label: "" }])}
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800"
            >
              <Plus className="w-3 h-3" />
              Add metric
            </button>
          </div>

          {/* Client quote */}
          <div className="bg-white border border-gray-200 rounded-sm p-5 space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
              Client Quote
            </h2>
            <Field label="Quote">
              <textarea
                rows={3}
                value={form.client_quote}
                onChange={(e) => set("client_quote", e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label="Attribution">
              <input
                value={form.quote_attribution}
                onChange={(e) => set("quote_attribution", e.target.value)}
                className={inputClass}
                placeholder="Name, Title, Company"
              />
            </Field>
          </div>

          {/* SEO */}
          <details className="bg-white border border-gray-200 rounded-sm">
            <summary className="px-5 py-4 cursor-pointer text-sm font-semibold uppercase tracking-wider text-gray-500">
              SEO
            </summary>
            <div className="px-5 pb-5 space-y-4">
              <Field label="SEO title" hint="Falls back to the case study title.">
                <input
                  value={form.seo_title}
                  onChange={(e) => set("seo_title", e.target.value)}
                  className={inputClass}
                />
              </Field>
              <Field label="Meta description" hint="Falls back to the summary.">
                <textarea
                  rows={2}
                  value={form.meta_description}
                  onChange={(e) => set("meta_description", e.target.value)}
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
                to={`/case-studies/${form.slug}`}
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
                You can edit and submit for review. An administrator publishes.
              </p>
            )}
          </div>

          <div className="bg-white border border-gray-200 rounded-sm p-5 space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
              Images
            </h2>

            <Field label="Featured image URL" hint="Used on the listing cards.">
              <input
                value={form.featured_image_url}
                onChange={(e) => set("featured_image_url", e.target.value)}
                className={inputClass}
              />
            </Field>

            <Field label="Hero image URL" hint="Used at the top of the case study page.">
              <input
                value={form.hero_image_url}
                onChange={(e) => set("hero_image_url", e.target.value)}
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

            <label className="flex items-center gap-2 text-sm text-gray-700 pt-2">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => set("featured", e.target.checked)}
              />
              Featured case study
            </label>
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
