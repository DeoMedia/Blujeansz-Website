import { motion } from "motion/react";
import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import prodculatorHeroImage from "figma:asset/4f902cc33d2ecf96a8fb8789e6487f51b394b7f9.png";
import prodculatorAnalysisImage from "figma:asset/257e1b822f742fab2928c1f2a54e3f0440b1d857.png";
import prodculatorHomepageImage from "figma:asset/907abd1c2a6180629beecc66389904f11aaa3b6e.png";
import prodculatorDashboardImage from "figma:asset/ef6e5ba40f2c180becb497f874e7be9dfbd27a80.png";
import patternBg from "figma:asset/71ddc76d0944f8bd918d3e8110f5c242374d3e98.png";

export function Prodculator() {
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
                Prodculator
              </span>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold my-6">
                Film Finance Platform Design & Launch
              </h1>

              <p className="text-lg text-gray-300 mb-8">
                Platform architecture and strategic communications that transformed access to global film financing.
              </p>

              {/* MINI META */}
              <div className="flex flex-wrap gap-6 text-sm text-gray-300">
                <span>South Africa</span>
                <span>Branding · Digital</span>
                <span>Deo Media</span>
              </div>
            </div>

            {/* RIGHT: IMAGE */}
            <div className="rounded-xl overflow-hidden">
              <img
                src={prodculatorHeroImage}
                alt="Prodculator Platform"
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
            <div className="text-3xl font-bold">Global</div>
            <div className="text-gray-500 text-sm">Launch</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="text-3xl font-bold">Major</div>
            <div className="text-gray-500 text-sm">Media Coverage</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="text-3xl font-bold">Full Stack</div>
            <div className="text-gray-500 text-sm">Execution</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="text-3xl font-bold">Game-Changer</div>
            <div className="text-gray-500 text-sm">Positioning</div>
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
                Film tax rebates and incentive programs represent a complex landscape
                that often intimidates independent producers and creative teams. The
                challenge was to create a digital platform that could demystify these
                financial regulations and make them accessible to filmmakers worldwide.
              </p>
              <p>
                Beyond the technical development, the platform needed to make a significant
                impact in the entertainment and finance media landscape, positioning itself
                as a transformative tool for the global film industry.
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
                Platform Design & Architecture
              </h3>
              <p>
                The Prodculator platform architecture and user interface were designed by
                Blujeansz, creating a streamlined, accessible tool that translates complex
                financial regulations into an intuitive digital experience. Our design
                approach prioritized clarity, usability, and trust—essential elements
                for a platform handling financial information.
              </p>

              <h3 className="text-2xl font-bold text-[#0B1C2C] mt-8">
                Scriptelligence Tool
              </h3>
              <p>
                At the heart of the platform is the Scriptelligence tool, which analyzes
                screenplays to generate investor-ready intelligence reports on locations,
                incentives, and costs. We designed the interface to make script upload
                and analysis seamless, turning complex data into clear, actionable insights.
              </p>

              <h3 className="text-2xl font-bold text-[#0B1C2C] mt-8">
                Production Analysis Engine
              </h3>
              <p>
                We created comprehensive form systems allowing users to input production
                details including project title, genre, format, budget ranges, preferred
                currencies, location strategies, territories, filming schedules, camera
                equipment, and cast information. The interface guides users through
                selecting production priorities—whether maximizing incentive returns,
                achieving full picture quality, or optimizing location and creative fit.
              </p>

              <h3 className="text-2xl font-bold text-[#0B1C2C] mt-8">
                Strategic Communications & Launch
              </h3>
              <p>
                Our team played a critical role in the global announcement of Prodculator's
                launch. We were responsible for developing and contributing to the articles
                that introduced the platform to the entertainment and finance media landscape.
              </p>
              <p>
                This work involved:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Articulating the core value proposition of Prodculator as a "game-changer"
                  that demystifies film tax rebates
                </li>
                <li>
                  Highlighting its role in bridging the gap between film producers and
                  global financiers
                </li>
                <li>
                  Securing and shaping the narrative published in key outlets, ensuring
                  a clear, impactful message regarding the platform's potential to disrupt
                  global film financing and unlock new funding opportunities for creatives globally
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FULL-WIDTH VISUAL BREAK */}
      <section className="py-20">
        <div className="w-full">
          <img
            src={prodculatorHomepageImage}
            alt="Prodculator Homepage Hero"
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
                "Global Launch",
                "Major Media Coverage",
                "Full Stack Delivery",
                "Industry Disruption",
              ].map((item) => (
                <div key={item} className="p-6 bg-gray-50 rounded-lg">
                  <div className="text-xl font-semibold">{item}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* PLATFORM FEATURES */}
      <section className="py-20 lg:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B1C2C] mb-12">
              Platform Capabilities
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Script Analysis",
                  description: "Upload scripts to receive location recommendations and incentive estimates",
                },
                {
                  title: "Global Tax Incentives",
                  description: "Access comprehensive database of film tax rebates worldwide",
                },
                {
                  title: "Location Intelligence",
                  description: "Compare territories and production locations with data-driven insights",
                },
                {
                  title: "Budget Optimization",
                  description: "Calculate financial scenarios to maximize production value",
                },
                {
                  title: "Investor Reports",
                  description: "Generate professional reports for financiers and stakeholders",
                },
                {
                  title: "Production Dashboard",
                  description: "Manage multiple projects and track analysis reports in one place",
                },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 bg-white rounded-lg"
                >
                  <h3 className="text-xl font-bold text-[#0B1C2C] mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* PROJECT GALLERY */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B1C2C] mb-12">
              Platform Gallery
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="group relative overflow-hidden rounded-sm aspect-[4/3] bg-gray-200">
                <img
                  src={prodculatorHomepageImage}
                  alt="Prodculator Homepage"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="group relative overflow-hidden rounded-sm aspect-[4/3] bg-gray-200">
                <img
                  src={prodculatorAnalysisImage}
                  alt="Production Analysis Engine"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="group relative overflow-hidden rounded-sm aspect-[4/3] bg-gray-200">
                <img
                  src={prodculatorDashboardImage}
                  alt="User Dashboard"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="group relative overflow-hidden rounded-sm aspect-[4/3] bg-gray-200">
                <img
                  src={prodculatorHeroImage}
                  alt="Platform Overview"
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