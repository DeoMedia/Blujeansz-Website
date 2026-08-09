import { motion } from "motion/react";
import { Link } from "react-router";
import { Calendar, Clock } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import patternBg from "figma:asset/71ddc76d0944f8bd918d3e8110f5c242374d3e98.png";
import { getPublishedArticles } from "../data/editorial";
import { ArticleImageFallback } from "./insights/InsightArticle";

export function Insights() {
  // Published articles only, newest first. Articles scheduled for a future
  // date stay hidden until that date passes, matching the CMS rule.
  const allInsights = getPublishedArticles();

  return (
    <div className="pt-20 lg:pt-24">
      {/* Hero */}
      <section className="py-20 lg:py-32 bg-[#07007b] text-white relative overflow-hidden">
        {/* Background Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-45"
          style={{
            backgroundImage: `url(${patternBg})`,
            backgroundSize: '100%',
            backgroundPosition: 'left top',
            backgroundRepeat: 'repeat',
            backgroundAttachment: 'scroll',
          }}
        />
        
        <style>{`
          @media (min-width: 768px) {
            .pt-20 > section:first-child > div[style*="backgroundImage"] {
              background-size: 60% !important;
            }
          }
          @media (min-width: 1024px) {
            .pt-20 > section:first-child > div[style*="backgroundImage"] {
              background-size: 42% !important;
            }
          }
        `}</style>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
              Insights
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
              Perspectives on marketing, culture, and growth from our team of experts.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-[#0B1C2C] mb-12"
          >
            All Articles
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
            {allInsights.map((insight, index) => (
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
                  <div className="relative overflow-hidden rounded-sm mb-6 aspect-[16/10]">
                    {insight.image ? (
                      <ImageWithFallback
                        src={insight.image}
                        alt={insight.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <ArticleImageFallback />
                    )}
                    <div className="absolute top-6 left-6">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold text-[#0B1C2C] rounded-sm uppercase tracking-wider">
                        {insight.categoryName}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold text-[#0B1C2C] mb-4 group-hover:text-blue-600 transition-colors leading-tight">
                    {insight.title}
                  </h3>

                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {insight.excerpt}
                  </p>

                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {insight.displayDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {insight.readTime}
                    </span>
                  </div>
                </motion.article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-[#0B1C2C] to-[#1a3a52] text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Stay Informed
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Subscribe to receive our latest insights and perspectives directly to your inbox.
            </p>
            <form className="max-w-md mx-auto flex gap-4">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-6 py-4 bg-white/10 border border-white/20 rounded-sm text-white placeholder:text-gray-400 focus:outline-none focus:border-white/40"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-white text-[#0B1C2C] font-semibold rounded-sm hover:bg-gray-100 transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}