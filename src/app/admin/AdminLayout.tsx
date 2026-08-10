import { useState } from "react";
import { NavLink, Navigate, Outlet, ScrollRestoration, useLocation } from "react-router";
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Users,
  UserCircle,
  Image,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";

import { AuthProvider, useAuth, hasAtLeastRole } from "./AuthContext";
import logoLight from "figma:asset/aa1ba75230506f31800d027742b495f059fdb329.png";
import type { UserRole } from "../types/database";

/**
 * Admin shell.
 *
 * Deliberately its own layout — it does not use the public site's Layout, nav
 * or footer, so nothing here can affect the public design.
 */

interface NavItem {
  to: string;
  label: string;
  icon: typeof LayoutDashboard;
  minRole?: UserRole;
}

const NAV: NavItem[] = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/insights", label: "Insights", icon: FileText },
  { to: "/admin/case-studies", label: "Case Studies", icon: Briefcase, minRole: "editor" },
  { to: "/admin/authors", label: "Authors", icon: UserCircle, minRole: "admin" },
  { to: "/admin/staff", label: "Team", icon: Users, minRole: "admin" },
  { to: "/admin/media", label: "Media", icon: Image },
  { to: "/admin/users", label: "Users", icon: Users, minRole: "admin" },
  { to: "/admin/settings", label: "Settings", icon: Settings, minRole: "admin" },
];

function Shell() {
  const { profile, loading, signOut } = useAuth();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex items-center gap-3 text-gray-500">
          <span className="w-5 h-5 border-2 border-gray-300 border-t-[#0B1C2C] rounded-full animate-spin" />
          Loading…
        </div>
      </div>
    );
  }

  // Unauthenticated users attempting /admin/* land on the login screen, and
  // return to where they were headed once signed in.
  if (!profile) {
    return <Navigate to="/admin/login" state={{ from: location.pathname }} replace />;
  }

  const visibleNav = NAV.filter((item) => !item.minRole || hasAtLeastRole(profile, item.minRole));
  const fullName = [profile.first_name, profile.last_name].filter(Boolean).join(" ") || profile.email;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <ScrollRestoration />

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-[#0B1C2C] text-white flex flex-col transition-transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="px-6 py-6 border-b border-white/10">
          {/* The light logo — the sidebar is the brand navy. */}
          <img src={logoLight} alt="BLUJEANSZ" className="h-7 w-auto" />
          <p className="text-xs text-white/50 mt-2 uppercase tracking-wider">Content Manager</p>
        </div>

        <nav className="flex-1 py-4 overflow-y-auto">
          {visibleNav.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/admin"}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-6 py-3 text-sm transition-colors ${
                  isActive
                    ? "bg-white/10 text-white border-l-2 border-blue-400"
                    : "text-white/70 hover:text-white hover:bg-white/5 border-l-2 border-transparent"
                }`
              }
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="px-6 py-4 border-t border-white/10">
          <p className="text-sm font-medium truncate">{fullName}</p>
          <p className="text-xs text-white/50 capitalize mb-3">
            {profile.role.replace("_", " ")}
          </p>
          <button
            onClick={() => void signOut()}
            className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
        </div>
      </aside>

      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Content */}
      <div className="flex-1 min-w-0">
        <header className="lg:hidden sticky top-0 z-20 bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3">
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <span className="font-bold text-[#0B1C2C]">Content Manager</span>
        </header>

        <main className="p-6 lg:p-10 max-w-7xl">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export function AdminLayout() {
  return (
    <AuthProvider>
      <Shell />
    </AuthProvider>
  );
}
