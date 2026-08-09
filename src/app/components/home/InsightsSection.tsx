import { motion } from "motion/react";
import { Link } from "react-router";
import { ArrowRight, Calendar } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { getPublishedArticles } from "../../data/editorial";
import { ArticleImageFallback } from "../../pages/insights/InsightArticle";

export function InsightsSection() {
  // The 3 most recent published articles
  const latestInsights = getPublishedArticles().slice(0, 3);

  return (
    <section className="py-24 lg:py-40 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-20 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0B1C2C]">
              Latest Insights
            </h2>
            <p className="text-xl lg:text-2xl text-gray-600 mt-4 max-w-2xl">
              Perspectives on culture, strategy, and growth.
            </p>
          </motion.div>

          <Link
            to="/insights"
            className="group flex items-center gap-2 text-[#0B1C2C] font-semibold hover:gap-4 transition-all"
          >
            View All Articles
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
          {latestInsights.map((insight, index) => (
            <Link
              key={insight.slug}
              to={`/insights/${insight.slug}`}
            >
              <motion.article
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-sm mb-6 aspect-[4/3]">
                  {insight.image ? (
                    <ImageWithFallback
                      src={insight.image}
                      alt={insight.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <ArticleImageFallback />
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold text-[#0B1C2C] rounded-sm">
                      {insight.categoryName}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-[#0B1C2C] group-hover:text-blue-600 transition-colors leading-tight">
                    {insight.title}
                  </h3>

                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {insight.displayDate}
                    </span>
                    <span>{insight.readTime}</span>
                  </div>
                </div>
              </motion.article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}