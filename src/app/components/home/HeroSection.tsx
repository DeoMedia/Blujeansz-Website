import { Link } from "react-router";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import brandPattern from "figma:asset/d3ed68ee451b305fbc50e90fb3ef65a45cdba864.png";

export function HeroSection() {
  // The pattern drifts forever; honour the OS setting for anyone who has asked
  // for less motion.
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0B1C2C]">
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

      {/* Brand Pattern - Architectural Element
          Sits above the video, gradient and vignette (z-[4]) but below the
          copy (z-10). Underneath them it was invisible no matter how high the
          opacity went, which is what made it read as missing.
          The artwork is dark navy line art on transparency — the same colour as
          the hero behind it. `brightness(0) invert(1)` repaints the strokes
          pure white while leaving the alpha channel untouched, which is how the
          original site renders it. */}
      <div className="absolute inset-0 z-[4] pointer-events-none overflow-hidden flex items-center">
        <motion.div
          // Sized by HEIGHT, not width. The artwork is portrait (411x596), so a
          // width of 2000px made it ~2900px tall and the viewport only ever
          // showed a magnified slice of it. Constraining the height instead
          // keeps the whole mark on screen, anchored left as on the live site.
          className="relative h-[70%] md:h-[80%] lg:h-[88%] ml-[-4%] md:ml-[-2%] lg:ml-[2%]"
          // Reduced motion still gets the reveal, just without the travel —
          // a slide is precisely what that setting asks us not to do.
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -100, scale: 1.06 }}
          animate={reduceMotion ? { opacity: 0.22 } : { opacity: 0.22, x: 0, scale: 1 }}
          transition={{
            duration: reduceMotion ? 0.6 : 1.6,
            ease: [0.22, 1, 0.36, 1],
            delay: reduceMotion ? 0 : 0.15,
          }}
        >
          {/* Entry and drift are split across two elements so the infinite
              loop never fights the one-shot entry over the same properties. */}
          <motion.img
            src={brandPattern}
            alt=""
            aria-hidden="true"
            className="h-full w-auto object-contain"
            style={{ filter: "brightness(0) invert(1)" }}
            animate={reduceMotion ? undefined : { x: [0, 12, 0], y: [0, -8, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>

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