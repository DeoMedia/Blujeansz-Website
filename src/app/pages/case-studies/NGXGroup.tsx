import { motion } from "motion/react";
import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import ngxImage from "figma:asset/f3e9a04d2a86bb32f16a5d15e82fc0d0b10e8e54.png";
import ngxBandImage from "figma:asset/048206f110745129f6dd6a9993d16d246a9da8e4.png";
import ngxHostImage from "figma:asset/7a82be353714b382a1b7ebf1cb25584539fc57d2.png";
import ngxBannersImage1 from "figma:asset/4353e419f47af1b0f387706f8fff059ebf82e81f.png";
import ngxBannersImage2 from "figma:asset/73878bb315c0f87eb1885e576f8e6026fad56502.png";
import patternBg from "figma:asset/71ddc76d0944f8bd918d3e8110f5c242374d3e98.png";

export function NGXGroup() {
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
                NGX Group
              </span>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold my-6">
                Rebranding & Online Event Production
              </h1>

              <p className="text-lg text-gray-300 mb-8">
                Comprehensive rebrand and digital event execution for Nigeria's premier stock exchange.
              </p>

              {/* MINI META */}
              <div className="flex flex-wrap gap-6 text-sm text-gray-300">
                <span>Nigeria</span>
                <span>Branding · Digital · Events</span>
                <span>Finance Sector</span>
              </div>
            </div>

            {/* RIGHT: IMAGE */}
            <div className="rounded-xl overflow-hidden">
              <img
                src={ngxHostImage}
                alt="NGX Group Event Host"
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
            <div className="text-3xl font-bold">Rebranding</div>
            <div className="text-gray-500 text-sm">Complete</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="text-3xl font-bold">Digital Event</div>
            <div className="text-gray-500 text-sm">Execution</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="text-3xl font-bold">Institutional</div>
            <div className="text-gray-500 text-sm">Grade</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="text-3xl font-bold">Full-Service</div>
            <div className="text-gray-500 text-sm">Delivery</div>
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
                The Nigerian Exchange Group (NGX), Africa's largest stock exchange,
                required both a strategic rebrand and premium online event production
                capabilities to match the gravitas of their capital markets activities.
              </p>
              <p>
                The challenge was to deliver comprehensive rebranding alongside
                institutional-grade digital events that would reinforce NGX Group's
                position as a world-class financial institution.
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
                Comprehensive Rebranding
              </h3>
              <p>
                We delivered a strategic rebrand for NGX Group that modernized their
                market presence while maintaining the authority and trust essential
                for a leading financial institution. The rebrand encompassed visual
                identity, messaging framework, and brand guidelines.
              </p>

              <h3 className="text-2xl font-bold text-[#0B1C2C] mt-8">
                Online Event Production
              </h3>
              <p>
                Our team executed high-stakes online events for NGX Group, managing
                everything from concept to delivery with the precision required for
                major financial market ceremonies. We handled technical production,
                stakeholder coordination, and live broadcast management.
              </p>

              <h3 className="text-2xl font-bold text-[#0B1C2C] mt-8">
                Institutional Excellence
              </h3>
              <p>
                Every element was executed to institutional standards—from brand
                development to event execution—ensuring an experience worthy of
                Africa's leading stock exchange.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FULL-WIDTH VISUAL BREAK */}
      <section className="py-20">
        <div className="w-full">
          <img
            src={ngxBandImage}
            alt="NGX Group Live Performance Event"
            className="w-full h-[500px] object-cover"
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
                "Complete Rebranding",
                "Digital Event Success",
                "Institutional-Grade Quality",
                "Full-Service Delivery",
              ].map((item) => (
                <div key={item} className="p-6 bg-gray-50 rounded-lg">
                  <div className="text-xl font-semibold">{item}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* PROJECT GALLERY */}
      <section className="py-20 lg:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B1C2C] mb-12">
              Project Gallery
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="group relative overflow-hidden rounded-sm aspect-[4/3] bg-gray-200">
                <img
                  src={ngxBannersImage1}
                  alt="NGX Street Banners Campaign"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="group relative overflow-hidden rounded-sm aspect-[4/3] bg-gray-200">
                <img
                  src={ngxBannersImage2}
                  alt="NGX Outdoor Advertising"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="group relative overflow-hidden rounded-sm aspect-[4/3] bg-gray-200">
                <img
                  src={ngxHostImage}
                  alt="NGX Event Host"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="group relative overflow-hidden rounded-sm aspect-[4/3] bg-gray-200">
                <img
                  src={ngxBandImage}
                  alt="NGX Live Event Entertainment"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PROJECT VIDEO */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B1C2C] mb-12">
              Project Video
            </h2>
            <div className="relative group cursor-pointer overflow-hidden rounded-sm aspect-[16/9]">
              <img
                src={ngxImage}
                alt="Project Video"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-[#0B1C2C] text-2xl">
                  ▶
                </div>
              </div>
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