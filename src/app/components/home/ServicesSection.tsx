import { motion } from "motion/react";
import { Palette, Target, Smartphone, Megaphone, Clapperboard, Zap } from "lucide-react";
import { Link } from "react-router";

const services = [
  {
    icon: Palette,
    title: "Brand Development",
    description: "We build distinctive brand identities designed to stand out, resonate with audiences, and endure over time.",
  },
  {
    icon: Target,
    title: "Marketing Strategy",
    description: "Data-driven strategies that uncover opportunities, guide decision-making, and deliver measurable business growth.",
  },
  {
    icon: Smartphone,
    title: "Digital Marketing",
    description: "From SEO to social media and performance campaigns, we help brands succeed across the entire digital ecosystem.",
  },
  {
    icon: Megaphone,
    title: "Public Relations",
    description: "We craft compelling narratives that build trust, shape perception, and connect brands with their stakeholders.",
  },
  {
    icon: Clapperboard,
    title: "Content Marketing",
    description: "Impactful content strategies across platforms, from YouTube to TikTok, that drive engagement and growth.",
  },
  {
    icon: Zap,
    title: "Through-The-Line Campaigns",
    description: "Fully integrated campaigns from concept to execution, spanning media, activations, and on-ground presence.",
  },
];

export function ServicesSection() {
  return (
    <section className="py-24 lg:py-40 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0B1C2C] mb-6">
            Capabilities
          </h2>
          <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl">
            We solve problems across the full spectrum of brand and marketing, from strategy to execution.
          </p>
        </motion.div>

        {/* Services Grid - 3 columns for better visual weight */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="mb-6">
                <service.icon className="w-10 h-10 lg:w-12 lg:h-12 text-blue-600 group-hover:text-[#0B1C2C] transition-colors" />
              </div>
              
              <h3 className="text-2xl lg:text-3xl font-bold text-[#0B1C2C] mb-4 leading-tight">
                {service.title}
              </h3>
              
              <p className="text-gray-600 text-base lg:text-lg leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <Link
            to="/services"
            className="inline-block px-8 py-4 bg-[#0B1C2C] text-white font-semibold rounded-sm hover:bg-[#1a3a52] transition-colors"
          >
            View All Services
          </Link>
        </motion.div>
      </div>
    </section>
  );
}