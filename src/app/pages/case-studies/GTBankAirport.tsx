import { motion } from "motion/react";
import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import gtbankImage from "figma:asset/0ee45d6e1bf00d5afe7f07a91d0b859c49d1ad0b.png";
import airportImage1 from "figma:asset/eb6f9ed8e3b8b8d3c21f066455e1b6ef163d84be.png";
import airportImage2 from "figma:asset/a30ae11d6184dd93b275548a806fe62211cdb080.png";
import airportImage3 from "figma:asset/9886548120c744a528e725cbd12daecd70bcc127.png";
import airportImage4 from "figma:asset/f2228ec33de229a6a4b01a3b4f6cdadd339e188c.png";
import patternBg from "figma:asset/71ddc76d0944f8bd918d3e8110f5c242374d3e98.png";

export function GTBankAirport() {
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
                GT Bank
              </span>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold my-6">
                Cape Town Airport Brand Activation
              </h1>

              <p className="text-lg text-gray-300 mb-8">
                Strategic outdoor branding deployment at Cape Town International Airport.
              </p>

              {/* MINI META */}
              <div className="flex flex-wrap gap-6 text-sm text-gray-300">
                <span>South Africa</span>
                <span>Branding · Activations</span>
                <span>Banking Sector</span>
              </div>
            </div>

            {/* RIGHT: IMAGE */}
            <div className="rounded-xl overflow-hidden">
              <img
                src={gtbankImage}
                alt="GT Bank Cape Town Airport"
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
            <div className="text-3xl font-bold">Premium</div>
            <div className="text-gray-500 text-sm">Location</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="text-3xl font-bold">High-Traffic</div>
            <div className="text-gray-500 text-sm">Deployment</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="text-3xl font-bold">Strategic</div>
            <div className="text-gray-500 text-sm">Placement</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="text-3xl font-bold">Brand</div>
            <div className="text-gray-500 text-sm">Visibility</div>
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
                Guaranty Trust Bank (GT Bank) sought to establish premium brand
                presence at Cape Town International Airport, one of Africa's busiest
                and most prestigious aviation hubs.
              </p>
              <p>
                The challenge was to deploy and secure high-impact outdoor branding
                that would engage affluent international travelers while reinforcing
                GT Bank's position as a premium banking partner across Africa.
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
                Strategic Site Selection
              </h3>
              <p>
                Blue Jeansz identified and secured premium outdoor branding locations
                throughout Cape Town International Airport, selecting high-traffic
                areas that maximize visibility among the target demographic.
              </p>

              <h3 className="text-2xl font-bold text-[#0B1C2C] mt-8">
                Deployment & Installation
              </h3>
              <p>
                We managed the complete deployment process, handling logistics,
                permissions, production coordination, and professional installation
                to ensure flawless execution across all placements.
              </p>

              <h3 className="text-2xl font-bold text-[#0B1C2C] mt-8">
                Brand Presence Management
              </h3>
              <p>
                Our team secured ongoing brand presence on behalf of GTBank, ensuring
                the activation maintained premium quality standards and maximum impact
                throughout its duration.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FULL-WIDTH VISUAL BREAK */}
      <section className="py-20">
        <div className="w-full">
          <img
            src={gtbankImage}
            alt="GT Bank Airport Activation Detail"
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
                "Premium Location Secured",
                "High-Traffic Deployment",
                "Strategic Brand Placement",
                "Maximum Brand Visibility",
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
              {[airportImage1, airportImage2, airportImage3, airportImage4].map((item) => (
                <div
                  key={item}
                  className="group relative overflow-hidden rounded-sm aspect-[4/3] bg-gray-200"
                >
                  <img
                    src={item}
                    alt={`Gallery ${item}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>
              ))}
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