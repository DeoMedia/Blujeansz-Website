import { motion } from "motion/react";
import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import seplatImage from "figma:asset/950a079cba5a897289a0cf77f52bf17d7211de37.png";
import seplatPromoImage from "figma:asset/5431ef358edb703baa071f3e58b698f2f22bc62e.png";
import seplatVideoThumb from "figma:asset/02362eca00c2e619fd628160d19f45248b04ea29.png";
import seplatLogo from "figma:asset/09ab0d26bbdf2650924d272a8be42776af4634ed.png";
import patternBg from "figma:asset/71ddc76d0944f8bd918d3e8110f5c242374d3e98.png";

export function SeplatEnergy() {
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
                Seplat Energy
              </span>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold my-6">
                Hybrid Event Experience & Digital Ecosystem
              </h1>

              <p className="text-lg text-gray-300 mb-8">
                End-to-end hybrid event execution including management, creative design, advertising, website development, and live streaming.
              </p>

              {/* MINI META */}
              <div className="flex flex-wrap gap-6 text-sm text-gray-300">
                <span>Nigeria</span>
                <span>Branding · Digital · Events</span>
                <span>Deo Media</span>
              </div>
            </div>

            {/* RIGHT: IMAGE */}
            <div className="rounded-xl overflow-hidden">
              <img
                src={seplatImage}
                alt="Seplat Energy Event"
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
            <div className="text-3xl font-bold">Hybrid</div>
            <div className="text-gray-500 text-sm">Event Format</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="text-3xl font-bold">End-to-End</div>
            <div className="text-gray-500 text-sm">Execution</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="text-3xl font-bold">Full-Service</div>
            <div className="text-gray-500 text-sm">Production</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="text-3xl font-bold">Live</div>
            <div className="text-gray-500 text-sm">Streaming</div>
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
                Seplat Energy, one of Africa's leading energy companies, entrusted us
                with the end-to-end execution of a hybrid experience that would engage
                both physical and virtual audiences while maintaining the gravitas
                expected of a major corporate event.
              </p>
              <p>
                The challenge was to orchestrate a flawless multi-channel event that
                integrated event management, creative design, advertising, digital
                platforms, and live streaming into one seamless experience.
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
                Event Management
              </h3>
              <p>
                We oversaw comprehensive event management, handling logistics, vendor
                coordination, timeline execution, and on-site production to ensure
                flawless delivery of the physical experience.
              </p>

              <h3 className="text-2xl font-bold text-[#0B1C2C] mt-8">
                Creative Design & Collateral
              </h3>
              <p>
                Our creative team designed all event collateral, from stage design and
                environmental graphics to digital assets and printed materials, creating
                a cohesive visual identity throughout the experience.
              </p>

              <h3 className="text-2xl font-bold text-[#0B1C2C] mt-8">
                Website Development
              </h3>
              <p>
                We developed a dedicated event website to serve as the digital hub,
                providing registration, information, and engagement tools for both
                physical and virtual attendees.
              </p>

              <h3 className="text-2xl font-bold text-[#0B1C2C] mt-8">
                Live Streaming Services
              </h3>
              <p>
                Our production team delivered broadcast-quality live streaming,
                enabling global participation and extending the event's reach beyond
                the physical venue with professional AV production and real-time
                engagement features.
              </p>

              <h3 className="text-2xl font-bold text-[#0B1C2C] mt-8">
                Advertising Campaign
              </h3>
              <p>
                We executed targeted advertising campaigns to drive attendance and
                engagement, using strategic media placements across digital and
                traditional channels.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FULL-WIDTH VISUAL BREAK */}
      <section className="py-20">
        <div className="w-full">
          <img
            src={seplatImage}
            alt="Seplat Energy Event Detail"
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
                "Hybrid Event Success",
                "End-to-End Execution",
                "Full-Service Production",
                "Seamless Live Streaming",
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
              Event Highlights
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="group relative overflow-hidden rounded-sm aspect-[4/3] bg-gray-200">
                <img
                  src={seplatPromoImage}
                  alt="Seplat Energy Summit Promotional Banner"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="group relative overflow-hidden rounded-sm aspect-[4/3] bg-gray-200">
                <img
                  src={seplatImage}
                  alt="Seplat Energy Facility"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="group relative overflow-hidden rounded-sm aspect-[4/3] bg-gray-200">
                <img
                  src={seplatVideoThumb}
                  alt="Live Streaming Event"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="group relative overflow-hidden rounded-sm aspect-[4/3] bg-gray-200 flex items-center justify-center bg-white">
                <img
                  src={seplatLogo}
                  alt="Seplat Energy Brand"
                  className="w-2/3 h-auto object-contain"
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
                src={seplatVideoThumb}
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