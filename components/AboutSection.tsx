"use client";
import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "framer-motion";
import { ArrowRight, Zap, Target, Cpu } from "lucide-react";
import { useTheme } from "next-themes";

const AboutSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const isDark = resolvedTheme === "dark";
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);

  return (
    <motion.section
      ref={containerRef}
      style={{ opacity, y }}
      className="relative w-full py-24 md:py-32 px-6 bg-white dark:bg-black overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Content Column */}
          <div className="space-y-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-zinc-100 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-950"
            >
              <Zap size={14} className="text-blue-500 dark:text-red-600" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-600">
                Institutional Genesis
              </span>
            </motion.div>

            <div className="space-y-6">
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter leading-none">
                WE ARCHITECT THE{" "}
                <span className="text-[#0DA5F0] dark:text-[#ff2e2e]">
                  FUTURE
                </span>{" "}
                OF ENGINEERING.
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed max-w-xl">
                HackShastra is a high-octane student collective engineered to
                bridge the terminal gap between academic theory and
                architectural reality. We don't just teach code; we build the
                builders.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 py-4">
              <div className="space-y-1">
                <span className="text-2xl font-black text-zinc-900 dark:text-white">
                  100%
                </span>
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                  Hands-on Growth
                </p>
              </div>
              <div className="space-y-1">
                <span className="text-2xl font-black text-zinc-900 dark:text-white">
                  Active
                </span>
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                  Nationwide Network
                </p>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <motion.a
                href="/about"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative inline-flex items-center gap-4 px-10 py-5 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-2xl font-black text-[10px] sm:text-xs uppercase tracking-[0.3em] overflow-hidden shadow-2xl transition-all duration-500"
              >
                {/* Text & Icon Layer */}
                <span className="relative z-10 group-hover:text-white transition-colors duration-500 flex items-center gap-3">
                  Explore Our Story
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform duration-500"
                  />
                </span>

                {/* Animated Background Reveal */}
                <div className="absolute inset-0 bg-[#0DA5F0] dark:bg-[#ff2e2e] opacity-0 group-hover:opacity-100 transition-all duration-500 scale-105 group-hover:scale-100" />

                {/* Dynamic Border Glow */}
                <div className="absolute inset-0 border border-white/10 dark:border-black/5 rounded-2xl pointer-events-none" />
              </motion.a>
            </motion.div>
          </div>

          {/* Visual Column */}
          <div className="relative group lg:mt-0 mt-8">
            <div className="absolute -inset-4 border border-zinc-100 dark:border-zinc-900 rounded-3xl -rotate-1 group-hover:rotate-0 transition-transform duration-700" />
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl">
              <img
                src="https://res.cloudinary.com/dunacoujw/image/upload/v1772402430/12_ubduyk.webp"
                alt="HackShastra Lab"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-tr from-blue-500/10 via-transparent to-transparent dark:from-red-600/10" />
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default AboutSection;
