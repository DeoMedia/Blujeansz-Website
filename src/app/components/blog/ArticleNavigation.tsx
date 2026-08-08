import { Link } from "react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

interface ArticleNavigationProps {
  prevArticle?: {
    slug: string;
    title: string;
    category: string;
  };
  nextArticle?: {
    slug: string;
    title: string;
    category: string;
  };
}

export function ArticleNavigation({ prevArticle, nextArticle }: ArticleNavigationProps) {
  return (
    <section className="py-16 bg-gray-50 border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Previous Article */}
          {prevArticle ? (
            <Link
              to={`/insights/${prevArticle.slug}`}
              className="group"
            >
              <motion.div
                whileHover={{ x: -8 }}
                transition={{ duration: 0.3 }}
                className="flex items-start gap-4 p-6 bg-white rounded-lg border border-gray-200 hover:border-blue-600 transition-all"
              >
                <div className="mt-1 text-gray-400 group-hover:text-blue-600 transition-colors">
                  <ArrowLeft className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2 block">
                    Previous Article
                  </span>
                  <span className="inline-block px-3 py-1 bg-gray-100 text-xs font-semibold text-gray-700 rounded-sm uppercase tracking-wider mb-3">
                    {prevArticle.category}
                  </span>
                  <h3 className="text-lg font-bold text-[#0B1C2C] group-hover:text-blue-600 transition-colors">
                    {prevArticle.title}
                  </h3>
                </div>
              </motion.div>
            </Link>
          ) : (
            <div className="opacity-0 pointer-events-none" />
          )}

          {/* Next Article */}
          {nextArticle ? (
            <Link
              to={`/insights/${nextArticle.slug}`}
              className="group"
            >
              <motion.div
                whileHover={{ x: 8 }}
                transition={{ duration: 0.3 }}
                className="flex items-start gap-4 p-6 bg-white rounded-lg border border-gray-200 hover:border-blue-600 transition-all text-right"
              >
                <div className="flex-1">
                  <span className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2 block">
                    Next Article
                  </span>
                  <span className="inline-block px-3 py-1 bg-gray-100 text-xs font-semibold text-gray-700 rounded-sm uppercase tracking-wider mb-3">
                    {nextArticle.category}
                  </span>
                  <h3 className="text-lg font-bold text-[#0B1C2C] group-hover:text-blue-600 transition-colors">
                    {nextArticle.title}
                  </h3>
                </div>
                <div className="mt-1 text-gray-400 group-hover:text-blue-600 transition-colors">
                  <ArrowRight className="w-6 h-6" />
                </div>
              </motion.div>
            </Link>
          ) : (
            <div className="opacity-0 pointer-events-none" />
          )}
        </div>
      </div>
    </section>
  );
}
