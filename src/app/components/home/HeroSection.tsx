import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import brandPattern from "figma:asset/d3ed68ee451b305fbc50e90fb3ef65a45cdba864.png";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0B1C2C]">
      {/* Brand Pattern Background - Architectural Element */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center">
        <motion.img
          src={brandPattern}
          alt=""
          className="absolute left-[-40%] md:left-[-30%] lg:left-[-20%] top-1/2 -translate-y-1/2 w-[1200px] md:w-[1500px] lg:w-[2000px] object-contain opacity-[0.07]"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 0.07,
            x: [0, 10, 0], 
            y: [0, -5, 0] 
          }}
          transition={{ 
            opacity: { duration: 1.2, ease: "easeOut" },
            x: { duration: 16, repeat: Infinity, ease: "easeInOut" },
            y: { duration: 16, repeat: Infinity, ease: "easeInOut" }
          }}
        />
      </div>

      {/* Background Video */}
      <div className="absolute inset-0 opacity-30 z-[1]">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/media/johannesburg-skyline.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Gradient Overlay - Precise Values */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B1C2C]/20 via-[#0B1C2C]/50 to-[#0B1C2C]/90 z-[2]" />

      {/* Vignette Effect - Darker Edges */}
      <div className="absolute inset-0 z-[3]" style={{
        background: 'radial-gradient(ellipse at center, transparent 0%, transparent 40%, rgba(11, 28, 44, 0.4) 100%)'
      }} />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-24 md:py-28 lg:py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-[900px] mx-auto"
        >
          <h1 className="font-bold text-white mb-6 md:mb-8 tracking-tight" style={{ lineHeight: '1.1' }}>
            <span className="block text-[36px] md:text-[52px] lg:text-[64px]">Turning Culture Into</span>
            <span className="block text-[42px] md:text-[60px] lg:text-[72px] bg-gradient-to-r from-[#60A5FA] to-[#22D3EE] bg-clip-text text-transparent">
              Market Power.
            </span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          className="text-base md:text-lg lg:text-[21px] text-[#D1D5DB] max-w-[640px] mx-auto mb-10 md:mb-12 px-4"
          style={{ lineHeight: '1.6' }}
        >
          We build African brands that win globally—and global brands that win in Africa.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6"
        >
          <Link
            to="/contact"
            className="w-full sm:w-auto group px-6 md:px-8 py-3 md:py-4 bg-white text-[#0B1C2C] font-semibold rounded-sm hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-2"
          >
            Start a Project
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            to="/case-studies"
            className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 border-2 border-white text-white font-semibold rounded-sm hover:bg-white hover:text-[#0B1C2C] transition-all duration-300 text-center"
          >
            View Our Work
          </Link>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="hidden md:block absolute bottom-8 lg:bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2"
          >
            <motion.div className="w-1 h-2 bg-white/50 rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}