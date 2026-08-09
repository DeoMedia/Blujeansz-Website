import { useState } from "react";
import { Link } from "react-router";
import { Plus, Search, ExternalLink } from "lucide-react";

import { api } from "../lib/api";
import { useAsync } from "./useAsync";
import {
  PageHeader,
  LoadingState,
  ErrorState,
  EmptyState,
  StatusBadge,
  PrimaryButton,
  inputClass,
} from "./components";
import type { ContentStatus } from "../types/database";

interface InsightRow {
  id: string;
  title: string;
  slug: string;
  status: ContentStatus;
  featured: boolean;
  published_at: string | null;
  updated_at: string;
  category: { name: string } | null;
  author: { display_name: string } | null;
}

const STATUS_FILTERS: Array<{ value: string; label: string }> = [
  { value: "", label: "All" },
  { value: "draft", label: "Drafts" },
  { value: "in_review", label: "In review" },
  { value: "scheduled", label: "Scheduled" },
  { value: "published", label: "Published" },
  { value: "archived", label: "Archived" },
];

export function InsightsList() {
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");

  const { data, loading, error, reload } = useAsync(() => {
    const params = new URLSearchParams();
    if (status) params.set("status", status);
    if (search.trim()) params.set("search", search.trim());

    const query = params.toString();
    return api.get<InsightRow[]>(`/insights/admin/all${query ? `?${query}` : ""}`);
  }, [status, search]);

  return (
    <>
      <PageHeader
        title="Insights"
        description="Articles for the public Insights page."
        action={
          <PrimaryButton to="/admin/insights/new">
            <Plus className="w-4 h-4" />
            New Insight
          </PrimaryButton>
        }
      />

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search titles…"
            className={`${inputClass} pl-9`}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {STATUS_FILTERS.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setStatus(filter.value)}
              className={`px-3 py-2 text-sm rounded-sm border transition-colors ${
                status === filter.value
                  ? "bg-[#0B1C2C] text-white border-[#0B1C2C]"
                  : "bg-white text-gray-600 border-gray-300 hover:border-gray-400"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState message={error} onRetry={reload} />
      ) : !data?.length ? (
        <EmptyState
          title={search || status ? "No matching articles" : "No articles yet"}
          description={
            search || status
              ? "Try a different search or filter."
              : "Create your first article to get started."
          }
          action={
            !search && !status ? (
              <PrimaryButton to="/admin/insights/new">
                <Plus className="w-4 h-4" />
                New Insight
              </PrimaryButton>
            ) : undefined
          }
        />
      ) : (
        <div className="bg-white border border-gray-200 rounded-sm overflow-x-auto">
          <table className="w-full text-sm min-w-[760px]">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr className="text-left text-xs uppercase tracking-wider text-gray-500">
                <th className="px-5 py-3 font-semibold">Title</th>
                <th className="px-5 py-3 font-semibold">Category</th>
                <th className="px-5 py-3 font-semibold">Author</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold">Updated</th>
                <th className="px-5 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  <td className="px-5 py-4 max-w-sm">
                    <Link
                      to={`/admin/insights/${row.id}/edit`}
                      className="font-medium text-[#0B1C2C] hover:text-blue-600 block truncate"
                    >
                      {row.title}
                    </Link>
                    {row.featured && (
                      <span className="text-xs text-blue-600 font-semibold">Featured</span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-gray-500">{row.category?.name ?? "—"}</td>
                  <td className="px-5 py-4 text-gray-500">{row.author?.display_name ?? "—"}</td>
                  <td className="px-5 py-4">
                    <StatusBadge status={row.status} />
                  </td>
                  <td className="px-5 py-4 text-gray-500 whitespace-nowrap">
                    {new Date(row.updated_at).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-5 py-4 text-right whitespace-nowrap">
                    <Link
                      to={`/admin/insights/${row.id}/edit`}
                      className="text-blue-600 hover:text-blue-800 font-semibold"
                    >
                      Edit
                    </Link>
                    {row.status === "published" && (
                      <Link
                        to={`/insights/${row.slug}`}
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
