import { useEffect } from "react";
import { motion } from "motion/react";
import { Link, Navigate, useParams } from "react-router";
import { Calendar, Clock, ArrowLeft } from "lucide-react";

import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import { ReadingProgress } from "../../components/blog/ReadingProgress";
import { InlineSocialShare } from "../../components/blog/InlineSocialShare";
import { ContentBlocks } from "../../components/blog/ContentBlocks";
import patternBg from "figma:asset/71ddc76d0944f8bd918d3e8110f5c242374d3e98.png";
import {
  getArticleBySlug,
  getRelatedArticles,
  LEGACY_SLUG_REDIRECTS,
} from "../../data/editorial";

/**
 * Public article route (/insights/:slug).
 *
 * The layout is taken from the original hand-built article pages so every
 * article — including the nine that never had a bespoke page — renders in the
 * established BLUJEANSZ design.
 */
export function InsightArticle() {
  const { slug = "" } = useParams();
  const article = getArticleBySlug(slug);

  // Set the document title and description for the article. Falls back the way
  // the brief specifies: SEO title -> article title, description -> excerpt.
  useEffect(() => {
    if (!article) return;

    const previousTitle = document.title;
    document.title = `${article.title} | BLUJEANSZ`;

    const meta = document.querySelector('meta[name="description"]');
    const previousDescription = meta?.getAttribute("content") ?? null;
    meta?.setAttribute("content", article.excerpt);

    return () => {
      document.title = previousTitle;
      if (previousDescription !== null) meta?.setAttribute("content", previousDescription);
    };
  }, [article]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Old article URLs kept working rather than 404ing.
  const redirect = LEGACY_SLUG_REDIRECTS[slug];
  if (redirect) return <Navigate to={`/insights/${redirect}`} replace />;

  if (!article) {
    return (
      <div className="pt-20 lg:pt-24">
        <section className="py-32 lg:py-48 bg-white">
          <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600 mb-4">
              404
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-[#0B1C2C] mb-6">
              We couldn't find that article
            </h1>
            <p className="text-lg text-gray-600 mb-10 leading-relaxed">
              It may have been moved or renamed. Everything we've published is on the
              Insights page.
            </p>
            <Link
              to="/insights"
              className="inline-flex items-center gap-2 bg-[#0B1C2C] text-white px-6 py-3 rounded-sm hover:bg-[#1a3a52] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Insights
            </Link>
          </div>
        </section>
      </div>
    );
  }

  const related = getRelatedArticles(article);

  return (
    <div className="pt-20 lg:pt-24">
      <ReadingProgress />

      {/* Hero */}
      <section className="py-20 lg:py-32 bg-[#0B1C2C] text-white relative overflow-hidden">
        <motion.img
          src={patternBg}
          alt=""
          aria-hidden="true"
          className="absolute left-[-20%] top-1/2 -translate-y-1/2 w-[1400px] lg:w-[1800px] opacity-[0.06] object-contain"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.06 }}
          transition={{ duration: 1.2 }}
        />

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <Link
            to="/insights"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-12"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Insights
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm text-sm font-semibold rounded-sm uppercase tracking-wider mb-6">
                {article.categoryName}
              </span>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                {article.title}
              </h1>

              <p className="text-xl text-gray-300 leading-relaxed mb-8">{article.excerpt}</p>

              <div className="flex items-center gap-6 text-gray-400">
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {article.displayDate}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {article.readTime}
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-lg shadow-2xl aspect-[4/3] bg-white p-4">
                {article.image ? (
                  <ImageWithFallback
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover rounded"
                  />
                ) : (
                  <ArticleImageFallback />
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Article body */}
      <article className="py-20 lg:py-32 bg-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-none"
          >
            <ContentBlocks blocks={article.blocks} />
          </motion.div>

          <div className="mt-16 pt-8 border-t border-black/5">
            <InlineSocialShare url={`/insights/${article.slug}`} title={article.title} />
          </div>
        </div>
      </article>

      {/* Related */}
      {related.length > 0 && (
        <section className="py-20 lg:py-28 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B1C2C] mb-12">
              Related Insights
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {related.map((item, index) => (
                <Link key={item.slug} to={`/insights/${item.slug}`}>
                  <motion.article
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group cursor-pointer h-full"
                  >
                    <div className="relative overflow-hidden rounded-sm mb-5 aspect-[16/10] bg-[#0B1C2C]">
                      {item.image ? (
                        <ImageWithFallback
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <ArticleImageFallback />
                      )}
                    </div>

                    <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                      {item.categoryName}
                    </span>

                    <h3 className="text-xl font-bold text-[#0B1C2C] mt-2 mb-3 group-hover:text-blue-600 transition-colors leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                      {item.excerpt}
                    </p>
                  </motion.article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

/**
 * Stand-in for articles with no artwork yet. Uses the brand navy and the house
 * pattern so an image-less card still looks deliberate rather than broken.
 *
 * Deliberately carries no category text: every surface that uses this already
 * shows the category next to it, either as a badge on the card or as the chip
 * in the article hero.
 */
export function ArticleImageFallback() {
  return (
    <div className="w-full h-full relative bg-[#07007b] rounded overflow-hidden flex items-center justify-center">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url(${patternBg})`,
          backgroundSize: "120%",
          backgroundPosition: "center",
        }}
      />
      <span className="relative z-10 text-white/70 text-sm font-bold tracking-[0.3em]">
        BLUJEANSZ
      </span>
    </div>
  );
}
