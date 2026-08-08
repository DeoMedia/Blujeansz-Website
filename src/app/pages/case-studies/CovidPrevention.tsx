import { motion } from "motion/react";
import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import covidImage from "figma:asset/27ab71ace98bf4bb27a9e36bd8f07baba7ee5e07.png";
import covidTaxiImage from "figma:asset/735116d3624db5615089c87aa462449bb6152024.png";
import covidDoctorImage from "figma:asset/ec610fa24f9fb69a244506ed1138b94b20babcd4.png";
import covidWorkerImage from "figma:asset/94c32f91f5be1d9229b6c6a908a700cc3963a3cd.png";
import covidWomanImage from "figma:asset/a07d2f935f9ade3f7c63636924cae24e8d2ae17f.png";
import patternBg from "figma:asset/71ddc76d0944f8bd918d3e8110f5c242374d3e98.png";

export function CovidPrevention() {
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
                COVID-19 Prevention Network
              </span>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold my-6">
                Global COVID Vaccine Education Campaign
              </h1>

              <p className="text-lg text-gray-300 mb-8">
                A through-the-line global campaign to educate people about the COVID vaccine, developed in partnership with Socialisma USA.
              </p>

              {/* MINI META */}
              <div className="flex flex-wrap gap-6 text-sm text-gray-300">
                <span>Global</span>
                <span>Creative · Digital · Content</span>
                <span>Socialisma USA Partnership</span>
              </div>
            </div>

            {/* RIGHT: IMAGE */}
            <div className="rounded-xl overflow-hidden">
              <img
                src={covidTaxiImage}
                alt="COVID-19 Prevention Campaign - Taxi Driver"
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
            <div className="text-gray-500 text-sm">Campaign</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="text-3xl font-bold">Through-the-Line</div>
            <div className="text-gray-500 text-sm">Approach</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="text-3xl font-bold">Critical</div>
            <div className="text-gray-500 text-sm">Mission</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="text-3xl font-bold">Public</div>
            <div className="text-gray-500 text-sm">Impact</div>
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
                During the global COVID-19 pandemic, there was an urgent need for clear,
                accessible, and credible public health communications to educate people
                about the COVID vaccine and combat misinformation at a global scale.
              </p>
              <p>
                The challenge was to develop and execute a comprehensive through-the-line
                campaign that could reach diverse audiences across multiple continents,
                delivering evidence-based information in ways that were culturally
                relevant and emotionally resonant.
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
                Strategic Partnership
              </h3>
              <p>
                BLU Jeansz partnered with Socialisma USA to develop and execute this
                critical global campaign, combining local expertise with international
                reach to maximize impact across multiple markets.
              </p>

              <h3 className="text-2xl font-bold text-[#0B1C2C] mt-8">
                Campaign Strategy & Creative
              </h3>
              <p>
                We developed comprehensive strategy and creative execution for the
                through-the-line campaign, encompassing digital, traditional, and
                experiential touchpoints to ensure maximum reach and engagement.
              </p>

              <h3 className="text-2xl font-bold text-[#0B1C2C] mt-8">
                Video & Content Production
              </h3>
              <p>
                Our team produced high-quality video content and supporting materials
                that communicated complex health information in accessible, compelling
                ways—cutting through misinformation with clear, evidence-based messaging.
              </p>

              <h3 className="text-2xl font-bold text-[#0B1C2C] mt-8">
                Multi-Channel Deployment
              </h3>
              <p>
                The campaign was deployed across multiple channels including digital
                platforms, social media, traditional media, and community engagement,
                ensuring the message reached audiences through their preferred channels.
              </p>

              <h3 className="text-2xl font-bold text-[#0B1C2C] mt-8">
                Global Impact
              </h3>
              <p>
                This through-the-line global campaign served as a vital resource during
                a critical period, demonstrating how strategic communications can support
                public health responses at scale and save lives.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FULL-WIDTH VISUAL BREAK */}
      <section className="py-20">
        <div className="w-full">
          <img
            src={covidDoctorImage}
            alt="COVID-19 Campaign - Healthcare Worker"
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
                "Global Campaign Launch",
                "Through-the-Line Execution",
                "Critical Mission Success",
                "Significant Public Impact",
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
              Campaign Creative
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="group relative overflow-hidden rounded-sm aspect-[4/3] bg-gray-200">
                <img
                  src={covidTaxiImage}
                  alt="Campaign - Taxi Driver"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="group relative overflow-hidden rounded-sm aspect-[4/3] bg-gray-200">
                <img
                  src={covidDoctorImage}
                  alt="Campaign - Healthcare Professional"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="group relative overflow-hidden rounded-sm aspect-[4/3] bg-gray-200">
                <img
                  src={covidWorkerImage}
                  alt="Campaign - Essential Worker"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="group relative overflow-hidden rounded-sm aspect-[4/3] bg-gray-200">
                <img
                  src={covidWomanImage}
                  alt="Campaign - Community Member"
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
              Campaign Video
            </h2>
            <div className="relative group cursor-pointer overflow-hidden rounded-sm aspect-[16/9]">
              <img
                src={covidImage}
                alt="Campaign Video"
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