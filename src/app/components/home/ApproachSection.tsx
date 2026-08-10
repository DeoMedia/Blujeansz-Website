import { motion } from "motion/react";
import { Search, Lightbulb, Rocket, BarChart } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Discover",
    outcome: "Identify what drives behavior",
    description: "We uncover the cultural codes, market gaps, and consumer truths that create competitive advantage.",
  },
  {
    number: "02",
    icon: Lightbulb,
    title: "Position",
    outcome: "Clarify what you stand for",
    description: "We define sharp, differentiated positioning that makes your brand impossible to ignore.",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Activate",
    outcome: "Turn strategy into market presence",
    description: "We execute campaigns that move audiences from awareness to conversion, online to on-ground.",
  },
  {
    number: "04",
    icon: BarChart,
    title: "Optimize",
    outcome: "Maximize impact and ROI",
    description: "We track performance, refine execution, and scale what works.",
  },
];

export function ApproachSection() {
  return (
    <section className="py-24 lg:py-40 bg-gradient-to-br from-[#0B1C2C] to-[#1a3a52] text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            How We Work
          </h2>
          <p className="text-xl lg:text-2xl text-gray-300 max-w-3xl">
            A clear method designed to move from insight to impact, fast.
          </p>
        </motion.div>

        {/* Desktop Grid */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-16">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.7 }}
              className="group"
            >
              <div className="flex items-start gap-6">
                {/* Icon */}
                <div className="flex-shrink-0 p-4 bg-white/10 rounded-sm backdrop-blur-sm group-hover:bg-blue-600 transition-colors">
                  <step.icon className="w-8 h-8" />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="text-6xl font-bold text-white/10 mb-3 leading-none">
                    {step.number}
                  </div>

                  <h3 className="text-3xl font-bold mb-3">
                    {step.title}
                  </h3>

                  <p className="text-lg text-blue-400 font-semibold mb-4">
                    {step.outcome}
                  </p>

                  <p className="text-gray-300 text-lg leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Stack */}
        <div className="lg:hidden space-y-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex gap-6"
            >
              <div className="flex-shrink-0">
                <div className="p-4 bg-white/10 rounded-sm backdrop-blur-sm">
                  <step.icon className="w-6 h-6" />
                </div>
              </div>

              <div>
                <div className="text-3xl font-bold text-white/20 mb-2">
                  {step.number}
                </div>
                <h3 className="text-2xl font-bold mb-2">
                  {step.title}
                </h3>
                <p className="text-base text-blue-400 font-semibold mb-3">
                  {step.outcome}
                </p>
                <p className="text-gray-300 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}