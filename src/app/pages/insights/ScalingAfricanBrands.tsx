import { motion } from "motion/react";
import { Link } from "react-router";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import { ReadingProgress } from "../../components/blog/ReadingProgress";
import { InlineSocialShare } from "../../components/blog/InlineSocialShare";
import { ArticleNavigation } from "../../components/blog/ArticleNavigation";
import patternBg from "figma:asset/71ddc76d0944f8bd918d3e8110f5c242374d3e98.png";
import scalingBrandsImg from "figma:asset/fa9308f9c3dcf7a42bd52f0eff4aa6a702a8890f.png";

export function ScalingAfricanBrands() {
  return (
    <div className="pt-20 lg:pt-24">
      <ReadingProgress />

      {/* Hero */}
      <section className="py-20 lg:py-32 bg-[#0B1C2C] text-white relative overflow-hidden">
        <motion.img
          src={patternBg}
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
            {/* Left: Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm text-sm font-semibold rounded-sm uppercase tracking-wider mb-6">
                Growth
              </span>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Why Most African Brands Struggle to Scale Globally
              </h1>
              
              <p className="text-xl text-gray-300 leading-relaxed mb-8">
                Scaling globally isn't just about expansion—it's about positioning. And this is where most brands fail.
              </p>
              
              <div className="flex items-center gap-6 text-gray-400">
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  March 5, 2026
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  5 min read
                </span>
              </div>
            </motion.div>

            {/* Right: Featured Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-lg shadow-2xl aspect-[4/3] bg-white p-4">
                <ImageWithFallback
                  src={scalingBrandsImg}
                  alt="Scaling African Brands"
                  className="w-full h-full object-cover rounded"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-20 lg:py-32 bg-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-none"
          >
            <p className="text-[22px] lg:text-[24px] leading-[1.6] text-gray-700 font-normal mb-8">
              Scaling globally isn't just about expansion.<br />
              It's about positioning.
            </p>

            <p className="text-[18px] leading-[1.7] text-gray-700 mb-8">
              And this is where most brands fail.
            </p>

            <div className="h-[1px] bg-black/5 my-16" />

            <h2 className="text-[28px] lg:text-[32px] font-bold text-[#0B1C2C] mt-16 mb-6">
              The Real Problem: Identity Confusion
            </h2>

            <p className="text-[18px] leading-[1.7] text-gray-700 mb-6">
              Many brands try to "look global."
            </p>

            <p className="text-[18px] leading-[1.7] text-gray-700 mb-8">
              In doing so, they lose what made them unique.
            </p>

            <div className="border-l-2 border-gradient-to-b from-blue-400 to-cyan-400 pl-6 my-12">
              <p className="text-[20px] leading-[1.6] text-[#0B1C2C] font-medium">
                Global brands don't erase identity—they refine it.
              </p>
            </div>

            <div className="h-[1px] bg-black/5 my-16" />

            <h2 className="text-[28px] lg:text-[32px] font-bold text-[#0B1C2C] mt-16 mb-6">
              Local Strength Is a Competitive Advantage
            </h2>

            <p className="text-[18px] leading-[1.7] text-gray-700 mb-4">
              The strongest global brands are deeply rooted in something:
            </p>

            <div className="space-y-3 mb-8">
              <p className="text-[18px] leading-[1.7] text-gray-700">— Nike → sport culture</p>
              <p className="text-[18px] leading-[1.7] text-gray-700">— Apple → design philosophy</p>
            </div>

            <p className="text-[18px] leading-[1.7] text-gray-700 mb-8">
              African brands have something even more powerful: <strong>culture</strong>.
            </p>

            <div className="h-[1px] bg-black/5 my-16" />

            <h2 className="text-[28px] lg:text-[32px] font-bold text-[#0B1C2C] mt-16 mb-6">
              The Scaling Mistake
            </h2>

            <p className="text-[18px] leading-[1.7] text-gray-700 mb-4">
              Brands think scaling means:
            </p>

            <div className="space-y-3 mb-8">
              <p className="text-[18px] leading-[1.7] text-gray-700">— copying Western models</p>
              <p className="text-[18px] leading-[1.7] text-gray-700">— changing tone</p>
              <p className="text-[18px] leading-[1.7] text-gray-700">— diluting identity</p>
            </div>

            <p className="text-[18px] leading-[1.7] text-gray-700 mb-4">
              Instead, scaling should mean:
            </p>

            <div className="space-y-3 mb-8">
              <p className="text-[18px] leading-[1.7] text-gray-700">— amplifying what makes you different</p>
            </div>

            <div className="h-[1px] bg-black/5 my-16" />

            <h2 className="text-[28px] lg:text-[32px] font-bold text-[#0B1C2C] mt-16 mb-6">
              What It Takes to Scale
            </h2>

            <p className="text-[18px] leading-[1.7] text-gray-700 mb-4">
              To scale globally, a brand needs:
            </p>

            <div className="space-y-3 mb-12">
              <p className="text-[18px] leading-[1.7] text-gray-700">— Clear positioning</p>
              <p className="text-[18px] leading-[1.7] text-gray-700">— Cultural relevance</p>
              <p className="text-[18px] leading-[1.7] text-gray-700">— Consistent storytelling</p>
              <p className="text-[18px] leading-[1.7] text-gray-700">— Strong identity</p>
            </div>

            <div className="h-[1px] bg-black/5 my-16" />

            <div className="my-20 p-10 bg-[#0B1C2C] text-white rounded-lg">
              <h3 className="text-2xl font-bold mb-6">Final Thought</h3>
              
              <p className="text-lg leading-relaxed mb-4">
                You don't scale by becoming less of who you are.
              </p>

              <p className="text-lg leading-relaxed">
                You scale by becoming more of it—strategically.
              </p>
            </div>

            {/* Social Share & Written By - Two Column Layout */}
            <div className="mt-16 pt-10 border-t border-black/10">
              <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                {/* Left: Social Share */}
                <InlineSocialShare
                  url="/insights/scaling-african-brands"
                  title="Why Most African Brands Struggle to Scale Globally"
                />

                {/* Right: Written By */}
                <div className="md:text-right">
                  <p className="text-sm text-gray-500 mb-2">Written by</p>
                  <p className="font-semibold text-[#0B1C2C]">BluJeansz Strategy Team</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </article>

      {/* Article Navigation */}
      <ArticleNavigation
        prevArticle={{
          slug: "youth-culture-growth-lever",
          title: "Why Youth Culture Is the Most Underrated Growth Lever in Africa",
          category: "Culture",
        }}
      />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#0B1C2C] to-[#1a3a52] text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Scale Your Brand Globally?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Let's develop a positioning strategy that amplifies your unique strengths.
          </p>
          <Link
            to="/contact"
            className="inline-block px-8 py-4 bg-white text-[#0B1C2C] font-semibold rounded-sm hover:bg-gray-100 transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}