import { motion } from "motion/react";
import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import taranisHeroImage from "figma:asset/29fe49afeadc2f210df2788fc059baf1b0498d1b.png";
import taranisPortfolioImage from "figma:asset/bd7b0166e12c85695b1355742cae38b59b336dca.png";
import taranisCrmDashboardImage from "figma:asset/ef62f17196254ccaf3bd03f9a795e4c10e8a91b4.png";
import patternBg from "figma:asset/71ddc76d0944f8bd918d3e8110f5c242374d3e98.png";

export function TaranisNouvusAfrica() {
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
                Taranis Nouvus Africa
              </span>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold my-6">
                Corporate Website & Custom CRM Platform
              </h1>

              <p className="text-lg text-gray-300 mb-8">
                Complete digital ecosystem including corporate website and custom-built CRM tool for managing Lithtech sales operations.
              </p>

              {/* MINI META */}
              <div className="flex flex-wrap gap-6 text-sm text-gray-300">
                <span>Africa</span>
                <span>Digital · Web Development · CRM</span>
                <span>Enterprise Solutions</span>
              </div>
            </div>

            {/* RIGHT: IMAGE */}
            <div className="rounded-xl overflow-hidden">
              <img
                src={taranisHeroImage}
                alt="Taranis Nouvus Africa Platform"
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
            <div className="text-3xl font-bold">Corporate</div>
            <div className="text-gray-500 text-sm">Website</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="text-3xl font-bold">Custom</div>
            <div className="text-gray-500 text-sm">CRM Platform</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="text-3xl font-bold">Video</div>
            <div className="text-gray-500 text-sm">Production</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="text-3xl font-bold">Enterprise</div>
            <div className="text-gray-500 text-sm">Grade</div>
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
                Taranis Nouvus Africa required a comprehensive digital transformation
                that would establish their corporate presence while also providing
                powerful internal tools to manage their Lithtech sales operations at
                scale.
              </p>
              <p>
                The challenge was to deliver both a world-class corporate website that
                reflects their market position and a custom-built CRM platform that
                could streamline sales processes, improve data visibility, and drive
                operational efficiency.
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
                Corporate Website Development
              </h3>
              <p>
                We designed and developed a premium corporate website at tnlafrica.com
                that serves as Taranis Nouvus Africa's digital flagship. The site
                combines sophisticated design with strategic content architecture to
                engage stakeholders, showcase capabilities, and drive business development.
              </p>

              <h3 className="text-2xl font-bold text-[#0B1C2C] mt-8">
                Custom CRM Platform
              </h3>
              <p>
                Our development team built a bespoke CRM tool tailored specifically for
                managing Lithtech sales operations. The platform provides comprehensive
                sales management capabilities including lead tracking, pipeline
                visualization, customer relationship management, and analytics.
              </p>

              <h3 className="text-2xl font-bold text-[#0B1C2C] mt-8">
                Video Production & Voiceover
              </h3>
              <p>
                We produced a professional brand video with professional voiceover
                narration to communicate Taranis Nouvus Africa's value proposition,
                creating compelling visual storytelling that brings their sustainable
                energy mission to life.
              </p>

              <h3 className="text-2xl font-bold text-[#0B1C2C] mt-8">
                Sales Process Optimization
              </h3>
              <p>
                The CRM platform was designed to optimize Taranis Nouvus Africa's unique
                sales workflows, automating manual processes, providing real-time
                visibility into sales performance, and enabling data-driven decision
                making across the organization.
              </p>

              <h3 className="text-2xl font-bold text-[#0B1C2C] mt-8">
                Enterprise Integration
              </h3>
              <p>
                We ensured seamless integration between the corporate website and CRM
                platform, creating a unified digital ecosystem that supports both
                external communications and internal operations.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FULL-WIDTH VISUAL BREAK */}
      <section className="py-20">
        <div className="w-full">
          <img
            src={taranisCrmDashboardImage}
            alt="CRM Platform Dashboard"
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
                "Corporate Website Live",
                "Custom CRM Deployed",
                "Video Production Complete",
                "Enterprise-Grade Platform",
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
                  src={taranisPortfolioImage}
                  alt="Website Design"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="group relative overflow-hidden rounded-sm aspect-[4/3] bg-gray-200">
                <img
                  src={taranisCrmDashboardImage}
                  alt="CRM Dashboard"
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
              Brand Video
            </h2>
            <div className="relative overflow-hidden rounded-sm aspect-[16/9]">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/h3UPgHOSCiA"
                title="Taranis Nouvus Africa Brand Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              ></iframe>
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
                  title: "Lead Management",
                  description: "Capture, track, and nurture leads through the sales pipeline",
                },
                {
                  title: "Sales Analytics",
                  description: "Real-time dashboards and reporting for data-driven decisions",
                },
                {
                  title: "Customer Database",
                  description: "Centralized customer information and interaction history",
                },
                {
                  title: "Pipeline Visualization",
                  description: "Clear visibility into sales opportunities and forecasting",
                },
                {
                  title: "Task Automation",
                  description: "Streamlined workflows and automated sales processes",
                },
                {
                  title: "Mobile Access",
                  description: "Access CRM capabilities anywhere, on any device",
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