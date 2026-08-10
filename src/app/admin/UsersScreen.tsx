import { useState } from "react";
import { UserPlus, Loader2, X } from "lucide-react";

import { api, ApiError } from "../lib/api";
import { useAsync } from "./useAsync";
import { useAuth } from "./AuthContext";
import {
  PageHeader,
  LoadingState,
  ErrorState,
  EmptyState,
  PrimaryButton,
  Field,
  inputClass,
} from "./components";
import type { Profile, UserRole, UserStatus } from "../types/database";

const ROLES: UserRole[] = ["author", "editor", "admin", "super_admin"];
const STATUSES: UserStatus[] = ["active", "invited", "suspended"];

const ROLE_HELP: Record<UserRole, string> = {
  author: "Writes insights and edits their own.",
  editor: "Edits all insights and case studies.",
  admin: "Manages content, people and media. Can publish.",
  super_admin: "Full access, including other super admins.",
};

const STATUS_STYLES: Record<UserStatus, string> = {
  active: "bg-green-100 text-green-800",
  invited: "bg-amber-100 text-amber-800",
  suspended: "bg-red-100 text-red-700",
};

export function UsersScreen() {
  const { profile: me } = useAuth();
  const { data, loading, error, reload } = useAsync(() => api.get<Profile[]>("/users"), []);

  const [inviting, setInviting] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  async function patch(id: string, changes: Partial<Profile>) {
    setBusyId(id);
    setActionError(null);

    try {
      await api.patch<Profile>(`/users/${id}`, changes);
      reload();
    } catch (err) {
      setActionError(err instanceof ApiError ? err.message : "Could not update the user.");
    } finally {
      setBusyId(null);
    }
  }

  return (
    <>
      <PageHeader
        title="Users"
        description="CMS accounts. There is no public sign-up — people are invited."
        action={
          <PrimaryButton onClick={() => setInviting(true)}>
            <UserPlus className="w-4 h-4" />
            Invite User
          </PrimaryButton>
        }
      />

      {actionError && (
        <div className="mb-6">
          <ErrorState message={actionError} />
        </div>
      )}

      {inviting && (
        <InviteDialog
          onClose={() => setInviting(false)}
          onInvited={() => {
            setInviting(false);
            reload();
          }}
        />
      )}

      {loading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState message={error} onRetry={reload} />
      ) : !data?.length ? (
        <EmptyState title="No users yet" />
      ) : (
        <div className="bg-white border border-gray-200 rounded-sm overflow-x-auto">
          <table className="w-full text-sm min-w-[800px]">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr className="text-left text-xs uppercase tracking-wider text-gray-500">
                <th className="px-5 py-3 font-semibold">Name</th>
                <th className="px-5 py-3 font-semibold">Role</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold">Can publish</th>
                <th className="px-5 py-3 font-semibold">Last login</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.map((user) => {
                const isSelf = user.id === me?.id;
                const busy = busyId === user.id;

                return (
                  <tr key={user.id} className={busy ? "opacity-50" : "hover:bg-gray-50"}>
                    <td className="px-5 py-4">
                      <p className="font-medium text-[#0B1C2C]">
                        {[user.first_name, user.last_name].filter(Boolean).join(" ") || "—"}
                        {isSelf && <span className="ml-2 text-xs text-gray-400">(you)</span>}
                      </p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </td>

                    <td className="px-5 py-4">
                      <select
                        value={user.role}
                        disabled={isSelf || busy}
                        // Changing your own privileges is refused by the API and
                        // again by a database trigger; disabling it here just
                        // avoids offering an action that cannot succeed.
                        title={isSelf ? "You cannot change your own role." : ROLE_HELP[user.role]}
                        onChange={(e) => void patch(user.id, { role: e.target.value as UserRole })}
                        className={`${inputClass} py-1.5 disabled:bg-gray-50 disabled:text-gray-400`}
                      >
                        {ROLES.map((role) => (
                          <option key={role} value={role}>
                            {role.replace("_", " ")}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td className="px-5 py-4">
                      <select
                        value={user.status}
                        disabled={isSelf || busy}
                        onChange={(e) =>
                          void patch(user.id, { status: e.target.value as UserStatus })
                        }
                        className={`${inputClass} py-1.5 w-32 disabled:bg-gray-50 disabled:text-gray-400`}
                      >
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                      <span
                        className={`ml-2 inline-block px-2 py-0.5 rounded-sm text-xs font-semibold ${STATUS_STYLES[user.status]}`}
                      >
                        {user.status}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <label className="inline-flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={user.can_publish || user.role === "admin" || user.role === "super_admin"}
                          disabled={
                            isSelf ||
                            busy ||
                            user.role === "admin" ||
                            user.role === "super_admin"
                          }
                          title={
                            user.role === "admin" || user.role === "super_admin"
                              ? "Admins can always publish."
                              : "Allow this user to publish without approval."
                          }
                          onChange={(e) =>
                            void patch(user.id, { can_publish: e.target.checked })
                          }
                        />
                        {busy && <Loader2 className="w-3 h-3 animate-spin text-gray-400" />}
                      </label>
                    </td>

                    <td className="px-5 py-4 text-gray-500 whitespace-nowrap">
                      {user.last_login_at
                        ? new Date(user.last_login_at).toLocaleDateString("en-GB")
                        : "Never"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <p className="mt-6 text-xs text-gray-500 max-w-2xl">
        Roles are enforced by the API and by Row Level Security, not by this screen. Admins and
        super admins can always publish; for editors and authors, publishing is granted
        individually.
      </p>
    </>
  );
}

function InviteDialog({
  onClose,
  onInvited,
}: {
  onClose: () => void;
  onInvited: () => void;
}) {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState<UserRole>("author");
  const [canPublishFlag, setCanPublishFlag] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    setSubmitting(true);
    setError(null);

    try {
      await api.post("/users/invite", {
        email: email.trim(),
        first_name: firstName.trim() || null,
        last_name: lastName.trim() || null,
        role,
        can_publish: canPublishFlag,
      });
      onInvited();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not send the invitation.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-sm w-full max-w-md">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <h2 className="font-bold text-[#0B1C2C]">Invite a user</h2>
          <button onClick={onClose} aria-label="Close" className="text-gray-400 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {error && <ErrorState message={error} />}

          <Field label="Email" required>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
            />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="First name">
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label="Last name">
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className={inputClass}
              />
            </Field>
          </div>

          <Field label="Role" hint={ROLE_HELP[role]}>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as UserRole)}
              className={inputClass}
            >
              {ROLES.map((r) => (
                <option key={r} value={r}>
                  {r.replace("_", " ")}
                </option>
              ))}
            </select>
          </Field>

          {role !== "admin" && role !== "super_admin" && (
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={canPublishFlag}
                onChange={(e) => setCanPublishFlag(e.target.checked)}
              />
              Allow publishing without approval
            </label>
          )}

          <p className="text-xs text-gray-500">
            Supabase emails an invitation link. The account stays{" "}
            <span className="font-medium">invited</span> until they set a password.
          </p>
        </div>

        <div className="flex justify-end gap-3 px-5 py-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2.5 text-sm font-semibold text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={() => void submit()}
            disabled={submitting || !email.trim()}
            className="inline-flex items-center gap-2 bg-[#0B1C2C] text-white px-4 py-2.5 rounded-sm text-sm font-semibold hover:bg-[#1a3a52] disabled:opacity-50"
          >
            {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
            Send invitation
          </button>
        </div>
      </div>
    </div>
  );
}
