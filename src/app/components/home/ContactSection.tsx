import { motion } from "motion/react";
import { Send } from "lucide-react";

export function ContactSection() {
  return (
    <section className="py-20 lg:py-32 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0B1C2C] mb-6">
            Let's Create Something Remarkable
          </h2>
          <p className="text-xl text-gray-600">
            Ready to transform your brand? Get in touch with our team.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-sm p-8 lg:p-12 shadow-xl space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-[#0B1C2C] mb-2">
                Name *
              </label>
              <input
                type="text"
                id="name"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-[#0B1C2C] transition-colors"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-semibold text-[#0B1C2C] mb-2">
                Company *
              </label>
              <input
                type="text"
                id="company"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-[#0B1C2C] transition-colors"
                placeholder="Company name"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-[#0B1C2C] mb-2">
              Email *
            </label>
            <input
              type="email"
              id="email"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-[#0B1C2C] transition-colors"
              placeholder="your.email@company.com"
            />
          </div>

          <div>
            <label htmlFor="project" className="block text-sm font-semibold text-[#0B1C2C] mb-2">
              Project Details *
            </label>
            <textarea
              id="project"
              required
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-[#0B1C2C] transition-colors resize-none"
              placeholder="Tell us about your project..."
            />
          </div>

          <button
            type="submit"
            className="group w-full md:w-auto px-8 py-4 bg-[#0B1C2C] text-white font-semibold rounded-sm hover:bg-[#1a3a52] transition-colors flex items-center justify-center gap-2"
          >
            Send Message
            <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.form>
      </div>
    </section>
  );
}
