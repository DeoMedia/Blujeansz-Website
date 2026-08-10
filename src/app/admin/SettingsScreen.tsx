import { useEffect, useState } from "react";
import { Save, Loader2, Globe, Lock } from "lucide-react";

import { api, ApiError } from "../lib/api";
import { useAsync } from "./useAsync";
import { PageHeader, LoadingState, ErrorState, Field, inputClass } from "./components";

interface Setting {
  id: string;
  key: string;
  value: unknown;
  description: string | null;
  is_public: boolean;
  updated_at: string;
}

/**
 * Settings are stored as jsonb, so the editor adapts to the shape of each
 * value: scalars get a single input, objects get one input per key. That keeps
 * a new setting editable without a code change, while still avoiding a raw
 * JSON textarea that is easy to corrupt.
 */
export function SettingsScreen() {
  const { data, loading, error, reload } = useAsync(() => api.get<Setting[]>("/settings"), []);
  const [drafts, setDrafts] = useState<Record<string, unknown>>({});
  const [savingKey, setSavingKey] = useState<string | null>(null);
  const [message, setMessage] = useState<{ kind: "ok" | "error"; text: string } | null>(null);

  useEffect(() => {
    if (!data) return;
    setDrafts(Object.fromEntries(data.map((setting) => [setting.key, setting.value])));
  }, [data]);

  async function save(setting: Setting) {
    setSavingKey(setting.key);
    setMessage(null);

    try {
      await api.put(`/settings/${setting.key}`, { value: drafts[setting.key] });
      setMessage({ kind: "ok", text: `Saved ${humanise(setting.key)}.` });
      reload();
    } catch (err) {
      setMessage({
        kind: "error",
        text: err instanceof ApiError ? err.message : "Could not save.",
      });
    } finally {
      setSavingKey(null);
    }
  }

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} onRetry={reload} />;

  return (
    <>
      <PageHeader title="Settings" description="Site-wide configuration." />

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

      <div className="space-y-5 max-w-3xl">
        {data?.map((setting) => {
          const draft = drafts[setting.key];
          const dirty = JSON.stringify(draft) !== JSON.stringify(setting.value);

          return (
            <section key={setting.key} className="bg-white border border-gray-200 rounded-sm p-5">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h2 className="font-semibold text-[#0B1C2C] flex items-center gap-2">
                    {humanise(setting.key)}
                    {setting.is_public ? (
                      <span
                        title="Readable by anonymous visitors"
                        className="inline-flex items-center gap-1 text-xs font-normal text-gray-400"
                      >
                        <Globe className="w-3 h-3" /> public
                      </span>
                    ) : (
                      <span
                        title="Only readable by administrators"
                        className="inline-flex items-center gap-1 text-xs font-normal text-gray-400"
                      >
                        <Lock className="w-3 h-3" /> private
                      </span>
                    )}
                  </h2>
                  {setting.description && (
                    <p className="text-sm text-gray-500 mt-1">{setting.description}</p>
                  )}
                </div>

                <button
                  onClick={() => void save(setting)}
                  disabled={!dirty || savingKey === setting.key}
                  className="inline-flex items-center gap-2 bg-[#0B1C2C] text-white px-4 py-2 rounded-sm text-sm font-semibold hover:bg-[#1a3a52] disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                >
                  {savingKey === setting.key ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  Save
                </button>
              </div>

              <ValueEditor
                value={draft}
                onChange={(next) => setDrafts((prev) => ({ ...prev, [setting.key]: next }))}
              />
            </section>
          );
        })}
      </div>

      <p className="mt-6 text-xs text-gray-500 max-w-3xl">
        Settings marked <span className="font-medium">public</span> are served to the website.
        Private settings are only ever readable by administrators.
      </p>
    </>
  );
}

function ValueEditor({
  value,
  onChange,
}: {
  value: unknown;
  onChange: (next: unknown) => void;
}) {
  // Object: one labelled input per key.
  if (value && typeof value === "object" && !Array.isArray(value)) {
    const record = value as Record<string, unknown>;

    return (
      <div className="space-y-3">
        {Object.entries(record).map(([key, entry]) => (
          <Field key={key} label={humanise(key)}>
            <input
              value={typeof entry === "string" ? entry : String(entry ?? "")}
              onChange={(e) => onChange({ ...record, [key]: e.target.value })}
              className={inputClass}
            />
          </Field>
        ))}
      </div>
    );
  }

  if (typeof value === "number") {
    return (
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value === "" ? 0 : Number(e.target.value))}
        className={`${inputClass} max-w-[12rem]`}
      />
    );
  }

  if (typeof value === "boolean") {
    return (
      <label className="flex items-center gap-2 text-sm text-gray-700">
        <input type="checkbox" checked={value} onChange={(e) => onChange(e.target.checked)} />
        Enabled
      </label>
    );
  }

  const text = typeof value === "string" ? value : JSON.stringify(value ?? "");

  return text.length > 80 ? (
    <textarea
      rows={3}
      value={text}
      onChange={(e) => onChange(e.target.value)}
      className={inputClass}
    />
  ) : (
    <input value={text} onChange={(e) => onChange(e.target.value)} className={inputClass} />
  );
}

function humanise(key: string): string {
  return key
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .replace(/\bUrl\b/g, "URL")
    .replace(/\bSeo\b/g, "SEO");
}
