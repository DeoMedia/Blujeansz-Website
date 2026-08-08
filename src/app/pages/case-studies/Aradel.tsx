import { motion } from "motion/react";
import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import aradelWebsite from "figma:asset/701c1d45f269baf647df394e7366e0393358b3db.png";
import aradelBillboard from "figma:asset/61da1e8186f11bc3d439f27897445348ac6bef87.png";
import aradelBanners from "figma:asset/3c8877a90cd8d03331bf76bf69c6a02818cfe588.png";
import aradelBusinessCards from "figma:asset/ba5d74f57225c836e297319b57131aafb1e860de.png";
import aradelWorkers from "figma:asset/54f600d8e4570288ab04f6dff039f83504040bb4.png";
import aradelApparel from "figma:asset/d6369e74a03fe11be6f86f87041a10340b7c60c7.png";
import patternBg from "figma:asset/71ddc76d0944f8bd918d3e8110f5c242374d3e98.png";

export function Aradel() {
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
                ARADEL (formerly NDEP)
              </span>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold my-6">
                Comprehensive Rebranding & Digital Transformation
              </h1>

              <p className="text-lg text-gray-300 mb-8">
                From NDEP to ARADEL: A complete brand evolution for Nigeria's emerging energy leader.
              </p>

              {/* MINI META */}
              <div className="flex flex-wrap gap-6 text-sm text-gray-300">
                <span>Nigeria</span>
                <span>Branding · Digital · Content</span>
                <span>Energy Sector</span>
              </div>
            </div>

            {/* RIGHT: IMAGE */}
            <div className="rounded-xl overflow-hidden">
              <img
                src={aradelWebsite}
                alt="ARADEL Platform"
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
            <div className="text-3xl font-bold">Complete</div>
            <div className="text-gray-500 text-sm">Rebrand</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="text-3xl font-bold">Full-Service</div>
            <div className="text-gray-500 text-sm">Execution</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="text-3xl font-bold">Strategic</div>
            <div className="text-gray-500 text-sm">Transformation</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="text-3xl font-bold">Market</div>
            <div className="text-gray-500 text-sm">Leadership</div>
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
                NDEP, now known as ARADEL, sought a modern identity that would capture
                its evolving vision, commitment to innovation, and ambitious future in
                Nigeria's energy sector.
              </p>
              <p>
                The challenge was to deliver a comprehensive rebranding that would not
                only refresh its market presence but also align with its strategic growth
                objectives and position the company as a premium player in the market.
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
                New Name, Logo & Tagline
              </h3>
              <p>
                We developed the new brand name ARADEL, designed a modern logo system,
                and crafted a compelling tagline that captures the company's vision and
                market positioning.
              </p>

              <h3 className="text-2xl font-bold text-[#0B1C2C] mt-8">
                Comprehensive Brand Manual
              </h3>
              <p>
                Our team created detailed brand guidelines covering visual identity,
                typography, color systems, imagery standards, and brand voice—providing
                a complete framework for consistent brand expression.
              </p>

              <h3 className="text-2xl font-bold text-[#0B1C2C] mt-8">
                Website Redesign
              </h3>
              <p>
                We designed and developed a premium corporate website that reflects
                ARADEL's new identity, combining sophisticated design with strategic
                content architecture to serve stakeholders, investors, and partners.
              </p>

              <h3 className="text-2xl font-bold text-[#0B1C2C] mt-8">
                Photography & Video Production
              </h3>
              <p>
                Professional photography and video content were produced to establish
                ARADEL's visual language, capturing the company's operations, leadership,
                and brand story through compelling imagery.
              </p>

              <h3 className="text-2xl font-bold text-[#0B1C2C] mt-8">
                Social Media Content & Management
              </h3>
              <p>
                We created and managed social media content that brings the brand to
                life across digital channels, establishing ARADEL's voice and building
                engagement with key audiences.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FULL-WIDTH VISUAL BREAK */}
      <section className="py-20">
        <div className="w-full">
          <img
            src={aradelBillboard}
            alt="ARADEL Brand Detail"
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
                "Complete Rebrand Delivered",
                "Full-Service Execution",
                "Strategic Transformation",
                "Market Leadership Position",
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
              <div
                className="group relative overflow-hidden rounded-sm aspect-[4/3] bg-gray-200"
              >
                <img
                  src={aradelBanners}
                  alt={`Gallery 1`}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div
                className="group relative overflow-hidden rounded-sm aspect-[4/3] bg-gray-200"
              >
                <img
                  src={aradelBusinessCards}
                  alt={`Gallery 2`}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div
                className="group relative overflow-hidden rounded-sm aspect-[4/3] bg-gray-200"
              >
                <img
                  src={aradelWorkers}
                  alt={`Gallery 3`}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div
                className="group relative overflow-hidden rounded-sm aspect-[4/3] bg-gray-200"
              >
                <img
                  src={aradelApparel}
                  alt={`Gallery 4`}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
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