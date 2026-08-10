import { useRef, useState } from "react";
import { Link } from "react-router";
import { Plus, Upload, ExternalLink, Loader2 } from "lucide-react";

import { api, ApiError } from "../lib/api";
import { useAsync } from "./useAsync";
import {
  PageHeader,
  LoadingState,
  ErrorState,
  EmptyState,
  StatusBadge,
  PrimaryButton,
} from "./components";
import type { Author, ContentStatus, MediaAsset, StaffMember } from "../types/database";

/** Simple list screens. The insight editor lives in its own module. */

// ---------------------------------------------------------------------------
// Case studies
// ---------------------------------------------------------------------------

interface CaseStudyRow {
  id: string;
  title: string;
  slug: string;
  client: string | null;
  status: ContentStatus;
  updated_at: string;
}

export function CaseStudiesList() {
  const { data, loading, error, reload } = useAsync(
    () => api.get<CaseStudyRow[]>("/case-studies/admin/all"),
    [],
  );

  return (
    <>
      <PageHeader
        title="Case Studies"
        description="Client work shown on the public Case Studies page."
        action={
          <PrimaryButton to="/admin/case-studies/new">
            <Plus className="w-4 h-4" />
            New Case Study
          </PrimaryButton>
        }
      />

      {loading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState message={error} onRetry={reload} />
      ) : !data?.length ? (
        <EmptyState title="No case studies yet" description="Create one to get started." />
      ) : (
        <div className="bg-white border border-gray-200 rounded-sm overflow-x-auto">
          <table className="w-full text-sm min-w-[640px]">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr className="text-left text-xs uppercase tracking-wider text-gray-500">
                <th className="px-5 py-3 font-semibold">Title</th>
                <th className="px-5 py-3 font-semibold">Client</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold">Updated</th>
                <th className="px-5 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  <td className="px-5 py-4 font-medium text-[#0B1C2C]">{row.title}</td>
                  <td className="px-5 py-4 text-gray-500">{row.client ?? "—"}</td>
                  <td className="px-5 py-4">
                    <StatusBadge status={row.status} />
                  </td>
                  <td className="px-5 py-4 text-gray-500 whitespace-nowrap">
                    {new Date(row.updated_at).toLocaleDateString("en-GB")}
                  </td>
                  <td className="px-5 py-4 text-right whitespace-nowrap">
                    <Link
                      to={`/admin/case-studies/${row.id}/edit`}
                      className="text-blue-600 hover:text-blue-800 font-semibold"
                    >
                      Edit
                    </Link>
                    {row.status === "published" && (
                      <Link
                        to={`/case-studies/${row.slug}`}
                        className="ml-4 inline-flex items-center gap-1 text-gray-500 hover:text-gray-700"
                      >
                        View <ExternalLink className="w-3 h-3" />
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

// ---------------------------------------------------------------------------
// Authors
// ---------------------------------------------------------------------------

export function AuthorsList() {
  const { data, loading, error, reload } = useAsync(() => api.get<Author[]>("/authors"), []);

  return (
    <>
      <PageHeader title="Authors" description="Bylines for Insights articles." />

      {loading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState message={error} onRetry={reload} />
      ) : !data?.length ? (
        <EmptyState title="No authors yet" />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((author) => (
            <div key={author.id} className="bg-white border border-gray-200 rounded-sm p-5">
              <p className="font-semibold text-[#0B1C2C]">{author.display_name}</p>
              <p className="text-sm text-gray-500 mt-1">{author.job_title ?? "—"}</p>
              <p className="text-xs text-gray-400 mt-2">/insights/author/{author.slug}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

// ---------------------------------------------------------------------------
// Team
// ---------------------------------------------------------------------------

export function StaffList() {
  const { data, loading, error, reload } = useAsync(() => api.get<StaffMember[]>("/staff"), []);

  return (
    <>
      <PageHeader title="Team" description="Shown on the public About page, in display order." />

      {loading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState message={error} onRetry={reload} />
      ) : !data?.length ? (
        <EmptyState title="No team members yet" />
      ) : (
        <div className="bg-white border border-gray-200 rounded-sm divide-y divide-gray-100">
          {data.map((member) => (
            <div key={member.id} className="px-5 py-4 flex items-center gap-4">
              <span className="w-8 text-xs text-gray-400 tabular-nums">
                {member.display_order}
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-[#0B1C2C] truncate">
                  {member.first_name} {member.last_name}
                </p>
                <p className="text-sm text-gray-500 truncate">{member.job_title ?? "—"}</p>
              </div>
              {member.featured && (
                <span className="text-xs font-semibold text-blue-600">Featured</span>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}

// ---------------------------------------------------------------------------
// Media
// ---------------------------------------------------------------------------

export function MediaLibrary() {
  const { data, loading, error, reload } = useAsync(() => api.get<MediaAsset[]>("/media"), []);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFiles(files: FileList | null) {
    if (!files?.length) return;

    setUploading(true);
    setUploadError(null);

    try {
      for (const file of Array.from(files)) {
        const form = new FormData();
        form.append("file", file);
        await api.upload<MediaAsset>("/media", form);
      }
      reload();
    } catch (err) {
      setUploadError(err instanceof ApiError ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <>
      <PageHeader
        title="Media"
        description="JPG, PNG and WebP up to 10 MB."
        action={
          <>
            <input
              ref={inputRef}
              type="file"
              multiple
              accept="image/jpeg,image/png,image/webp"
              onChange={(e) => void handleFiles(e.target.files)}
              className="hidden"
            />
            <PrimaryButton onClick={() => inputRef.current?.click()} disabled={uploading}>
              {uploading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Upload className="w-4 h-4" />
              )}
              {uploading ? "Uploading…" : "Upload"}
            </PrimaryButton>
          </>
        }
      />

      {uploadError && (
        <div className="mb-6">
          <ErrorState message={uploadError} />
        </div>
      )}

      {loading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState message={error} onRetry={reload} />
      ) : !data?.length ? (
        <EmptyState title="No media yet" description="Upload an image to get started." />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data.map((asset) => (
            <figure key={asset.id} className="bg-white border border-gray-200 rounded-sm">
              <img
                src={asset.public_url}
                alt={asset.alt_text ?? ""}
                loading="lazy"
                className="w-full aspect-[4/3] object-cover rounded-t-sm"
              />
              <figcaption className="p-3">
                <p className="text-xs font-medium text-[#0B1C2C] truncate">{asset.file_name}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {(asset.file_size / 1024).toFixed(0)} KB
                </p>
                <button
                  onClick={() => void navigator.clipboard.writeText(asset.public_url)}
                  className="mt-2 text-xs font-semibold text-blue-600 hover:text-blue-800"
                >
                  Copy URL
                </button>
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </>
  );
}
