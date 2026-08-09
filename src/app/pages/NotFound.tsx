import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";

/**
 * Public 404. Without this, an unknown URL falls through to React Router's
 * developer error screen, which is not something a visitor should ever see.
 */
export function NotFound() {
  return (
    <div className="pt-20 lg:pt-24">
      <section className="py-32 lg:py-48 bg-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600 mb-4">404</p>
          <h1 className="text-4xl md:text-5xl font-bold text-[#0B1C2C] mb-6">
            This page doesn't exist
          </h1>
          <p className="text-lg text-gray-600 mb-10 leading-relaxed">
            The link may be out of date, or the page may have moved.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-[#0B1C2C] text-white px-6 py-3 rounded-sm hover:bg-[#1a3a52] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
        </div>
      </section>
    </div>
  );
}
