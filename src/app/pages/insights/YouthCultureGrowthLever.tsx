import { motion } from "motion/react";
import { Link } from "react-router";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import { ReadingProgress } from "../../components/blog/ReadingProgress";
import { InlineSocialShare } from "../../components/blog/InlineSocialShare";
import { ArticleNavigation } from "../../components/blog/ArticleNavigation";
import patternBg from "figma:asset/71ddc76d0944f8bd918d3e8110f5c242374d3e98.png";
import youthCultureImg from "figma:asset/7596ecbc56e3575e3a2807cc40cb6f0cc322d09f.png";

export function YouthCultureGrowthLever() {
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
                Culture
              </span>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Why Youth Culture Is the Most Underrated Growth Lever in Africa
              </h1>
              
              <p className="text-xl text-gray-300 leading-relaxed mb-8">
                Youth culture isn't just a segment—it's the force shaping what people pay attention to, talk about, and ultimately buy.
              </p>
              
              <div className="flex items-center gap-6 text-gray-400">
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  February 5, 2026
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
                  src={youthCultureImg}
                  alt="Youth Culture Growth Lever"
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
              Most brands say they target youth.<br />
              Very few actually understand them.
            </p>

            <p className="text-[18px] leading-[1.7] text-gray-700 mb-8">
              And that's the problem.
            </p>

            <div className="h-[1px] bg-black/5 my-16" />

            <h2 className="text-[28px] lg:text-[32px] font-bold text-[#0B1C2C] mt-16 mb-6">
              Youth Is Not a Demographic—It's a Mindset
            </h2>

            <p className="text-[18px] leading-[1.7] text-gray-700 mb-6">
              Youth culture is not defined by age alone.
            </p>

            <p className="text-[18px] leading-[1.7] text-gray-700 mb-4">
              It's defined by:
            </p>

            <div className="space-y-3 mb-8">
              <p className="text-[18px] leading-[1.7] text-gray-700">— behavior</p>
              <p className="text-[18px] leading-[1.7] text-gray-700">— influence</p>
              <p className="text-[18px] leading-[1.7] text-gray-700">— cultural participation</p>
            </div>

            <p className="text-[18px] leading-[1.7] text-gray-700 mb-4">
              This is why youth culture drives:
            </p>

            <div className="space-y-3 mb-8">
              <p className="text-[18px] leading-[1.7] text-gray-700">— trends</p>
              <p className="text-[18px] leading-[1.7] text-gray-700">— language</p>
              <p className="text-[18px] leading-[1.7] text-gray-700">— purchasing decisions</p>
            </div>

            <div className="h-[1px] bg-black/5 my-16" />

            <h2 className="text-[28px] lg:text-[32px] font-bold text-[#0B1C2C] mt-16 mb-6">
              Africa's Youth = Market Power
            </h2>

            <p className="text-[18px] leading-[1.7] text-gray-700 mb-6">
              Africa has one of the youngest populations in the world.
            </p>

            <p className="text-[18px] leading-[1.7] text-gray-700 mb-8">
              This is not just a statistic—it's a strategic advantage.
            </p>

            <p className="text-[18px] leading-[1.7] text-gray-700 mb-4">
              Youth in Africa are:
            </p>

            <div className="space-y-3 mb-8">
              <p className="text-[18px] leading-[1.7] text-gray-700">— digitally native</p>
              <p className="text-[18px] leading-[1.7] text-gray-700">— culturally influential</p>
              <p className="text-[18px] leading-[1.7] text-gray-700">— globally connected</p>
            </div>

            <div className="h-[1px] bg-black/5 my-16" />

            <h2 className="text-[28px] lg:text-[32px] font-bold text-[#0B1C2C] mt-16 mb-6">
              Why Most Brands Miss It
            </h2>

            <p className="text-[18px] leading-[1.7] text-gray-700 mb-4">
              Most brands:
            </p>

            <div className="space-y-3 mb-8">
              <p className="text-[18px] leading-[1.7] text-gray-700">— speak at youth, not with them</p>
              <p className="text-[18px] leading-[1.7] text-gray-700">— follow trends instead of shaping them</p>
              <p className="text-[18px] leading-[1.7] text-gray-700">— play safe instead of being culturally relevant</p>
            </div>

            <div className="h-[1px] bg-black/5 my-16" />

            <h2 className="text-[28px] lg:text-[32px] font-bold text-[#0B1C2C] mt-16 mb-6">
              What Winning Brands Do Differently
            </h2>

            <p className="text-[18px] leading-[1.7] text-gray-700 mb-4">
              They:
            </p>

            <div className="space-y-3 mb-12">
              <p className="text-[18px] leading-[1.7] text-gray-700">— collaborate with creators</p>
              <p className="text-[18px] leading-[1.7] text-gray-700">— embed themselves in music, fashion, and culture</p>
              <p className="text-[18px] leading-[1.7] text-gray-700">— move at the speed of conversation</p>
            </div>

            <div className="h-[1px] bg-black/5 my-16" />

            <div className="my-20 p-10 bg-[#0B1C2C] text-white rounded-lg">
              <h3 className="text-2xl font-bold mb-6">Final Thought</h3>
              
              <p className="text-lg leading-relaxed mb-4">
                Youth culture isn't a segment.
              </p>

              <p className="text-lg leading-relaxed mb-4">
                It's the engine of growth.
              </p>

              <p className="text-lg leading-relaxed">
                Ignore it, and your brand becomes irrelevant.
              </p>
            </div>

            {/* Social Share & Written By - Two Column Layout */}
            <div className="mt-16 pt-10 border-t border-black/10">
              <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                {/* Left: Social Share */}
                <InlineSocialShare
                  url="/insights/youth-culture-growth-lever"
                  title="Why Youth Culture Is the Most Underrated Growth Lever in Africa"
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
          slug: "cultural-trends-2026",
          title: "The 2026 Cultural Trends Shaping African & Global Brands",
          category: "Strategy",
        }}
        nextArticle={{
          slug: "scaling-african-brands",
          title: "Why Most African Brands Struggle to Scale Globally",
          category: "Growth",
        }}
      />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#0B1C2C] to-[#1a3a52] text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Connect with Youth Culture?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Let's discuss how to make your brand culturally relevant.
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