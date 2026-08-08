import { motion } from "motion/react";
import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import nollywoodImage from "figma:asset/a62e4ba09adba0e5a10a00ad71595970ad8b69d9.png";
import nollywoodHomepageImage from "figma:asset/d23e62e60df0ff81d962016a2670dd428dd14182.png";
import nollywoodCoursesImage from "figma:asset/4d9098b8f120c476f76ad2589196d176968bde1d.png";
import patternBg from "figma:asset/71ddc76d0944f8bd918d3e8110f5c242374d3e98.png";

export function NollywoodMasterclass() {
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
                Nollywood Masterclass (NMC)
              </span>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold my-6">
                Online Education Platform Launch
              </h1>

              <p className="text-lg text-gray-300 mb-8">
                Africa's premier film education destination where aspiring creatives gain access to exclusive courses taught by industry Masters.
              </p>

              {/* MINI META */}
              <div className="flex flex-wrap gap-6 text-sm text-gray-300">
                <span>Nigeria</span>
                <span>Branding · Digital</span>
                <span>Deo Media</span>
              </div>
            </div>

            {/* RIGHT: IMAGE */}
            <div className="rounded-xl overflow-hidden">
              <img
                src={nollywoodImage}
                alt="Nollywood Masterclass Platform"
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
            <div className="text-3xl font-bold">E-Learning</div>
            <div className="text-gray-500 text-sm">Platform</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="text-3xl font-bold">Entertainment</div>
            <div className="text-gray-500 text-sm">Industry Focus</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="text-3xl font-bold">Pan-African</div>
            <div className="text-gray-500 text-sm">Reach</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="text-3xl font-bold">Industry-Leading</div>
            <div className="text-gray-500 text-sm">Market Position</div>
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
                Nollywood has emerged as one of the world's most prolific film industries,
                yet aspiring filmmakers and creatives across Africa often lack access to
                professional training and industry insights from established masters.
              </p>
              <p>
                The challenge was to create a premium online learning platform that could
                democratize access to world-class film education while maintaining the
                quality and prestige associated with learning from industry leaders.
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
                Platform Vision & Development
              </h3>
              <p>
                NMC (Nollywood Masterclass) is an online learning platform where aspiring
                creatives gain access to exclusive courses taught by industry Masters.
                From production to editing, acting, writing, directing, and more, NMC
                offers expert-led masterclasses designed to equip students with real-world
                skills to thrive in the entertainment industry.
              </p>

              <h3 className="text-2xl font-bold text-[#0B1C2C] mt-8">
                Branding & Digital Infrastructure
              </h3>
              <p>
                Blujeansz and Deo Media collaborated to develop the complete branding and
                digital infrastructure for NMC, including website design, platform development,
                and user experience optimization for seamless course delivery.
              </p>

              <h3 className="text-2xl font-bold text-[#0B1C2C] mt-8">
                YouTube Content Marketing
              </h3>
              <p>
                We developed and executed a comprehensive YouTube content marketing strategy,
                creating engaging video content that showcases the platform's offerings,
                builds audience engagement, and drives enrollment through strategic
                distribution and optimization.
              </p>

              <h3 className="text-2xl font-bold text-[#0B1C2C] mt-8">
                Impact on African Film Industry
              </h3>
              <p>
                NMC is democratizing access to professional film education across Africa,
                enabling the next generation of filmmakers to learn directly from the
                masters who have shaped Nollywood and African cinema.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FULL-WIDTH VISUAL BREAK */}
      <section className="py-20">
        <div className="w-full">
          <img
            src={nollywoodHomepageImage}
            alt="Nollywood Masterclass Homepage - Make it big with Nollywood Masterclass"
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
                "E-Learning Platform Built",
                "Entertainment Industry Focus",
                "Pan-African Audience Reach",
                "Industry-Leading Position",
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
                  src={nollywoodHomepageImage}
                  alt="Platform Homepage"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="group relative overflow-hidden rounded-sm aspect-[4/3] bg-gray-200">
                <img
                  src={nollywoodImage}
                  alt="Platform Interface"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="group relative overflow-hidden rounded-sm aspect-[4/3] bg-gray-200">
                <img
                  src={nollywoodCoursesImage}
                  alt="Platform Courses"
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
              Content Marketing Videos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative overflow-hidden rounded-sm aspect-[16/9]">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/ewDb5jhXqaw"
                  title="Nollywood Masterclass Video 1"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                ></iframe>
              </div>
              <div className="relative overflow-hidden rounded-sm aspect-[16/9]">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/grO3VvF_AL8"
                  title="Nollywood Masterclass Video 2"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                ></iframe>
              </div>
              <div className="relative overflow-hidden rounded-sm aspect-[16/9]">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/fldNJ8xlIJo"
                  title="Nollywood Masterclass Video 3"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                ></iframe>
              </div>
              <div className="relative overflow-hidden rounded-sm aspect-[16/9]">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/BDZNUSRPukE"
                  title="Nollywood Masterclass Video 4"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                ></iframe>
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