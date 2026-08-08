import { motion } from "motion/react";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import prodxculatorImage from "figma:asset/4f902cc33d2ecf96a8fb8789e6487f51b394b7f9.png";
import afrotodsImage from "figma:asset/f8fc589b341bceef9f3d4ecdd7ffff1dbe313315.png";
import seplatImage from "figma:asset/950a079cba5a897289a0cf77f52bf17d7211de37.png";

const caseStudies = [
  {
    id: 1,
    image: prodxculatorImage,
    client: "Prodculator",
    title: "Film Finance Platform Design & Launch",
    metrics: "Global Media Coverage",
    description: "Platform architecture and UI design that demystifies film tax rebates, plus strategic communications that positioned Prodculator as a game-changer bridging film producers and global financiers.",
    link: "/case-studies/prodculator",
  },
  {
    id: 2,
    image: afrotodsImage,
    client: "The Afrotods",
    title: "Digital Learning Platform & Global Growth",
    metrics: "3 Continents, Millions Reached",
    description: "Full web application development (WordPress, WooCommerce) for African-inspired animated storybooks, plus digital marketing strategy driving visibility across North America, Asia, and South America.",
    link: "/case-studies/the-afrotods",
  },
  {
    id: 4,
    image: seplatImage,
    client: "Seplat Energy",
    title: "Hybrid Event Experience & Digital Ecosystem",
    metrics: "Full-Scale Activation",
    description: "End-to-end event management, creative collateral design, website development, advertising, and live streaming services for one of Africa's leading energy companies.",
    link: "/case-studies/seplat-energy",
  },
];

export function CaseStudiesSection() {
  const heroCase = caseStudies[0];
  const supportingCases = caseStudies.slice(1, 3);

  return (
    <section className="py-24 lg:py-32 bg-[#0B1C2C]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-20 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
              Featured Work
            </h2>
            <p className="text-xl text-gray-400 mt-4 max-w-2xl">
              We build brands and platforms that scale globally.
            </p>
          </motion.div>

          <Link
            to="/case-studies"
            className="group flex items-center gap-2 text-white font-semibold hover:gap-4 transition-all"
          >
            View All Projects
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* HERO CASE - Full Width */}
        <Link to={heroCase.link}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group cursor-pointer mb-16"
          >
            <div className="relative overflow-hidden rounded-sm aspect-[21/9] lg:aspect-[21/8]">
              <img
                src={heroCase.image}
                alt={heroCase.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              {/* Consistent dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1C2C]/90 via-[#0B1C2C]/40 to-[#0B1C2C]/10" />
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <p className="text-sm text-gray-300 uppercase tracking-wider mb-3">
                    {heroCase.client}
                  </p>
                  <h3 className="text-3xl lg:text-5xl font-bold text-white mb-4 max-w-4xl leading-tight">
                    {heroCase.title}
                  </h3>
                  <p className="text-lg lg:text-xl font-semibold text-blue-400 mb-4">
                    {heroCase.metrics}
                  </p>
                  <p className="text-base lg:text-lg text-gray-300 leading-relaxed max-w-3xl">
                    {heroCase.description}
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </Link>

        {/* SUPPORTING CASES - 2 Column Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
          {supportingCases.map((study, index) => (
            <Link key={study.id} to={study.link}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-sm aspect-[4/3] mb-6">
                  <img
                    src={study.image}
                    alt={study.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Consistent dark overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1C2C]/80 via-[#0B1C2C]/30 to-[#0B1C2C]/5" />
                  
                  {/* Hover description */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1C2C]/95 to-[#0B1C2C]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6 lg:p-8">
                    <p className="text-white text-sm lg:text-base leading-relaxed">
                      {study.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-gray-400 uppercase tracking-wider">
                    {study.client}
                  </p>
                  <h3 className="text-xl lg:text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                    {study.title}
                  </h3>
                  <p className="text-base lg:text-lg font-semibold text-blue-400">
                    {study.metrics}
                  </p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}