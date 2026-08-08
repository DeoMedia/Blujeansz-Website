import { motion } from "motion/react";
import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import gtbankLogo from "figma:asset/671a62bcda2ead48411c00120be8602fa107755b.png";
import gtbankVideo from "figma:asset/21f48f062d16f6bb15bc85c2fbfa1e58e17df8fe.mp4";
import patternBg from "figma:asset/71ddc76d0944f8bd918d3e8110f5c242374d3e98.png";

export function GTBankNigeria() {
  return (
    <div className="pt-20 lg:pt-24">
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
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            {/* LEFT: TEXT */}
            <div>
              <Link
                to="/case-studies"
                className="inline-flex items-center gap-2 text-gray-300 hover:text-white mb-8 block"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Case Studies
              </Link>

              <span className="text-sm text-gray-400 uppercase block">
                GT Bank Nigeria
              </span>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold my-6">
                Television Advertising Campaign
              </h1>

              <p className="text-lg text-gray-300 mb-8">
                Developed and executed TV ads in conjunction with comprehensive media placements across Nigeria.
              </p>

              {/* MINI META */}
              <div className="flex flex-wrap gap-6 text-sm text-gray-300">
                <span>Nigeria</span>
                <span>Creative · Digital · TV</span>
                <span>Deo Media Production</span>
              </div>
            </div>

            {/* RIGHT: IMAGE */}
            <div className="rounded-xl overflow-hidden">
              <img
                src={gtbankLogo}
                alt="GT Bank Nigeria Campaign"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* IMPACT METRICS */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-3xl font-bold">TV</div>
            <div className="text-gray-500 text-sm">Production</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="text-3xl font-bold">Multi-Channel</div>
            <div className="text-gray-500 text-sm">Media</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="text-3xl font-bold">Creative</div>
            <div className="text-gray-500 text-sm">Excellence</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="text-3xl font-bold">National</div>
            <div className="text-gray-500 text-sm">Reach</div>
          </motion.div>
        </div>
      </section>

      {/* Project Overview */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B1C2C] mb-8">
              The Opportunity
            </h2>
            <div className="prose prose-lg max-w-none text-gray-600 space-y-6">
              <p>
                Guaranty Trust Bank, one of Nigeria's leading financial institutions,
                required a compelling television advertising campaign to strengthen
                brand presence and drive engagement across Nigeria's competitive
                banking landscape.
              </p>
              <p>
                The challenge was to create broadcast-quality creative that would
                resonate with Nigerian audiences while executing strategic media
                placements across television and complementary channels to maximize
                campaign impact.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B1C2C] mb-8">
              What We Did
            </h2>
            <div className="prose prose-lg max-w-none text-gray-600 space-y-6">
              <h3 className="text-2xl font-bold text-[#0B1C2C]">
                Creative Development
              </h3>
              <p>
                Blu Jeansz (formerly trading as Blu Flamingo Africa) developed the
                complete creative strategy and execution for the television advertising
                campaign, crafting compelling narratives that connect with Nigerian
                audiences.
              </p>

              <h3 className="text-2xl font-bold text-[#0B1C2C] mt-8">
                TV Production Partnership
              </h3>
              <p>
                We partnered with Deo Media for broadcast-quality production,
                ensuring world-class execution that meets the standards expected
                for national television advertising in Nigeria's premier banking
                sector.
              </p>

              <h3 className="text-2xl font-bold text-[#0B1C2C] mt-8">
                Digital Integration
              </h3>
              <p>
                Beyond television, we developed complementary digital assets and
                strategies to extend campaign reach and create synergy across
                multiple touchpoints.
              </p>

              <h3 className="text-2xl font-bold text-[#0B1C2C] mt-8">
                Media Placement Strategy
              </h3>
              <p>
                Our team executed comprehensive media placements in conjunction with
                the TV ads, strategically deploying the campaign across channels to
                maximize reach, frequency, and impact among target audiences.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FULL-WIDTH VISUAL BREAK */}
      <section className="py-20 bg-[#FF6600] flex items-center justify-center">
        <div className="max-w-2xl w-full px-6">
          <img
            src={gtbankLogo}
            alt="GT Bank Logo"
            className="w-full h-auto"
          />
        </div>
      </section>

      {/* KEY RESULTS */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B1C2C] mb-12">
              Key Results
            </h2>
            <div className="grid grid-cols-2 gap-8">
              {[
                "Broadcast TV Production",
                "Multi-Channel Media Execution",
                "Creative Excellence Delivered",
                "National Campaign Reach",
              ].map((item) => (
                <div key={item} className="p-6 bg-gray-50 rounded-lg">
                  <div className="text-xl font-semibold">{item}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* PROJECT VIDEO */}
      <section className="py-20 lg:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B1C2C] mb-12">
              Campaign Video
            </h2>
            <div className="relative group cursor-pointer overflow-hidden rounded-sm aspect-[16/9]">
              <video
                src={gtbankVideo}
                aria-label="TV Commercial"
                className="w-full h-full object-cover"
                controls
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-[#0B1C2C] to-[#1a3a52] text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Ready to Transform Your Vision?
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Let's create something extraordinary together.
            </p>
            <Link
              to="/contact"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-sm transition-colors"
            >
              Start a Project
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}