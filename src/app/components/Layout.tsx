import { Outlet, ScrollRestoration } from "react-router";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";

export function Layout() {
  return (
    <div className="min-h-screen bg-white">
      {/* Top on a new navigation, previous position on back/forward. */}
      <ScrollRestoration />
      <Navigation />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}