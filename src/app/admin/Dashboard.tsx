import { Link } from "react-router";
import { FileText, Briefcase, UserCircle, Users, Plus, ExternalLink } from "lucide-react";

import { api } from "../lib/api";
import { useAsync } from "./useAsync";
import { useAuth, hasAtLeastRole } from "./AuthContext";
import { PageHeader, LoadingState, ErrorState, EmptyState, StatusBadge } from "./components";
import type { ContentStatus } from "../types/database";

interface DashboardStats {
  total_insights: number;
  published_insights: number;
  draft_insights: number;
  case_studies: number;
  authors: number;
  team_members: number;
}

interface RecentItem {
  id: string;
  title: string;
  slug: string;
  kind: "insight" | "case_study";
  author: string | null;
  status: ContentStatus;
  updated_at: string;
}

export function Dashboard() {
  const { profile } = useAuth();
  const stats = useAsync(() => api.get<DashboardStats>("/dashboard/stats"), []);
  const recent = useAsync(() => api.get<RecentItem[]>("/dashboard/recent"), []);

  const firstName = profile?.first_name ?? "there";

  return (
    <>
      <PageHeader
        title={`Welcome back, ${firstName}`}
        description="An overview of everything published and in progress."
      />

      {/* Stats */}
      {stats.loading ? (
        <LoadingState />
      ) : stats.error ? (
        <ErrorState message={stats.error} onRetry={stats.reload} />
      ) : (
        stats.data && (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            <StatCard label="Total Insights" value={stats.data.total_insights} icon={FileText} />
            <StatCard
              label="Published"
              value={stats.data.published_insights}
              icon={FileText}
              tone="text-green-600"
            />
            <StatCard
              label="Drafts"
              value={stats.data.draft_insights}
              icon={FileText}
              tone="text-amber-600"
            />
            <StatCard label="Case Studies" value={stats.data.case_studies} icon={Briefcase} />
            <StatCard label="Authors" value={stats.data.authors} icon={UserCircle} />
            <StatCard label="Team Members" value={stats.data.team_members} icon={Users} />
          </div>
        )
      )}

      {/* Quick actions */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-4">
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-3">
          <QuickAction to="/admin/insights/new" label="New Insight" />
          {hasAtLeastRole(profile, "editor") && (
            <QuickAction to="/admin/case-studies/new" label="New Case Study" />
          )}
          {hasAtLeastRole(profile, "admin") && (
            <>
              <QuickAction to="/admin/authors" label="Add Author" />
              <QuickAction to="/admin/staff" label="Add Team Member" />
            </>
          )}
        </div>
      </section>

      {/* Recent content */}
      <section>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-4">
          Recent Content
        </h2>

        {recent.loading ? (
          <LoadingState />
        ) : recent.error ? (
          <ErrorState message={recent.error} onRetry={recent.reload} />
        ) : !recent.data?.length ? (
          <EmptyState
            title="Nothing here yet"
            description="Content you create will appear here."
          />
        ) : (
          <div className="bg-white border border-gray-200 rounded-sm overflow-x-auto">
            <table className="w-full text-sm min-w-[720px]">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr className="text-left text-xs uppercase tracking-wider text-gray-500">
                  <th className="px-5 py-3 font-semibold">Title</th>
                  <th className="px-5 py-3 font-semibold">Type</th>
                  <th className="px-5 py-3 font-semibold">Author</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                  <th className="px-5 py-3 font-semibold">Updated</th>
                  <th className="px-5 py-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recent.data.map((item) => {
                  const editPath =
                    item.kind === "insight"
                      ? `/admin/insights/${item.id}/edit`
                      : `/admin/case-studies/${item.id}/edit`;
                  const publicPath =
                    item.kind === "insight"
                      ? `/insights/${item.slug}`
                      : `/case-studies/${item.slug}`;

                  return (
                    <tr key={`${item.kind}-${item.id}`} className="hover:bg-gray-50">
                      <td className="px-5 py-4 font-medium text-[#0B1C2C] max-w-sm truncate">
                        {item.title}
                      </td>
                      <td className="px-5 py-4 text-gray-500 capitalize">
                        {item.kind.replace("_", " ")}
                      </td>
                      <td className="px-5 py-4 text-gray-500">{item.author ?? "—"}</td>
                      <td className="px-5 py-4">
                        <StatusBadge status={item.status} />
                      </td>
                      <td className="px-5 py-4 text-gray-500 whitespace-nowrap">
                        {new Date(item.updated_at).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td className="px-5 py-4 text-right whitespace-nowrap">
                        <Link
                          to={editPath}
                          className="text-blue-600 hover:text-blue-800 font-semibold"
                        >
                          Edit
                        </Link>
                        {item.status === "published" && (
                          <Link
                            to={publicPath}
                            className="ml-4 inline-flex items-center gap-1 text-gray-500 hover:text-gray-700"
                          >
                            View <ExternalLink className="w-3 h-3" />
                          </Link>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  tone = "text-[#0B1C2C]",
}: {
  label: string;
  value: number;
  icon: typeof FileText;
  tone?: string;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-sm p-5">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs uppercase tracking-wider text-gray-500">{label}</span>
        <Icon className="w-4 h-4 text-gray-300" />
      </div>
      <p className={`text-3xl font-bold ${tone}`}>{value}</p>
    </div>
  );
}

function QuickAction({ to, label }: { to: string; label: string }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-2 bg-white border border-gray-300 px-4 py-2.5 rounded-sm text-sm font-semibold text-[#0B1C2C] hover:border-[#0B1C2C] transition-colors"
    >
      <Plus className="w-4 h-4" />
      {label}
    </Link>
  );
}
