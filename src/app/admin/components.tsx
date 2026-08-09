import type { ReactNode } from "react";
import { Link } from "react-router";
import { AlertCircle, Loader2, Inbox } from "lucide-react";
import type { ContentStatus } from "../types/database";

/** Shared admin building blocks — kept together so screens stay readable. */

export function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
      <div>
        <h1 className="text-2xl font-bold text-[#0B1C2C]">{title}</h1>
        {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function LoadingState({ label = "Loading…" }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-3 py-16 text-gray-500">
      <Loader2 className="w-5 h-5 animate-spin" />
      {label}
    </div>
  );
}

export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="p-6 bg-red-50 border border-red-200 rounded-sm flex gap-3">
      <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
      <div>
        <p className="text-sm text-red-800">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-3 text-sm font-semibold text-red-700 hover:text-red-900 underline"
          >
            Try again
          </button>
        )}
      </div>
    </div>
  );
}

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="py-16 text-center border border-dashed border-gray-300 rounded-sm">
      <Inbox className="w-8 h-8 text-gray-300 mx-auto mb-4" />
      <p className="font-semibold text-[#0B1C2C]">{title}</p>
      {description && <p className="text-sm text-gray-500 mt-1 mb-5">{description}</p>}
      {action}
    </div>
  );
}

const STATUS_STYLES: Record<ContentStatus, string> = {
  draft: "bg-gray-100 text-gray-700",
  in_review: "bg-amber-100 text-amber-800",
  scheduled: "bg-blue-100 text-blue-800",
  published: "bg-green-100 text-green-800",
  archived: "bg-gray-100 text-gray-400",
};

export function StatusBadge({ status }: { status: ContentStatus }) {
  return (
    <span
      className={`inline-block px-2.5 py-1 rounded-sm text-xs font-semibold capitalize ${STATUS_STYLES[status]}`}
    >
      {status.replace("_", " ")}
    </span>
  );
}

export function PrimaryButton({
  to,
  onClick,
  children,
  disabled,
  type = "button",
}: {
  to?: string;
  onClick?: () => void;
  children: ReactNode;
  disabled?: boolean;
  type?: "button" | "submit";
}) {
  const className =
    "inline-flex items-center gap-2 bg-[#0B1C2C] text-white px-4 py-2.5 rounded-sm text-sm font-semibold hover:bg-[#1a3a52] transition-colors disabled:opacity-50 disabled:cursor-not-allowed";

  if (to) {
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={className}>
      {children}
    </button>
  );
}

export function Field({
  label,
  hint,
  children,
  required,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-[#0B1C2C] mb-2">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </span>
      {children}
      {hint && <span className="block text-xs text-gray-500 mt-1.5">{hint}</span>}
    </label>
  );
}

export const inputClass =
  "w-full px-3 py-2.5 border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-[#0B1C2C]";
