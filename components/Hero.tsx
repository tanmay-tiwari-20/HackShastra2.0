"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, Compass, ChevronRight } from "lucide-react";
import { HeroBackground } from "./HeroBackground";

const Hero = ({ isReady = false }: { isReady?: boolean }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.25,
      },
    },
  };

  // Crisp, smooth entrance without blur filter animation
  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.75,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen lg:h-screen lg:min-h-[620px] flex items-center justify-center overflow-hidden px-4 md:px-6 pt-16 md:pt-16 pb-6 bg-white dark:bg-black select-none"
    >
      {/* Rich High-Tech Background System */}
      <HeroBackground />

      <motion.div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center my-auto md:-translate-y-5 lg:-translate-y-7">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isReady ? "visible" : "hidden"}
          className="text-center w-full flex flex-col items-center"
        >
          {/* Status Badge */}
          <motion.div
            variants={itemVariants}
            className="mb-3 sm:mb-3.5 inline-flex items-center gap-2.5 px-3.5 py-1 sm:py-1.5 rounded-full border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-100/60 dark:bg-zinc-950/60 backdrop-blur-xl shadow-xs"
          >
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]" />
            <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.25em] text-zinc-600 dark:text-zinc-400">
              India's First Creator-Led Tech Community
            </span>
          </motion.div>

          {/* Logo */}
          <motion.div
            variants={itemVariants}
            className="relative mb-2.5 sm:mb-3.5 flex justify-center"
          >
            <Image
              src="/logo1.svg"
              alt="Hackshastra Logo"
              width={140}
              height={140}
              className="w-16 sm:w-20 md:w-24 object-contain filter drop-shadow-[0_0_35px_rgba(255,46,46,0.18)] hidden dark:block"
              priority
            />
            <Image
              src="/logo2.svg"
              alt="Hackshastra Logo"
              width={140}
              height={140}
              className="w-16 sm:w-20 md:w-24 object-contain filter drop-shadow-[0_0_35px_rgba(13,165,240,0.18)] block dark:hidden"
              priority
            />
          </motion.div>

          {/* Core Brand Identity */}
          <motion.div variants={itemVariants} className="space-y-2 sm:space-y-3 max-w-4xl mx-auto">
            <h1 className="text-[clamp(3.5rem,13vw,9.5rem)] font-black tracking-tighter leading-[0.85] flex flex-col items-center">
              <span className="text-zinc-900 dark:text-white">HACK</span>
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#0DA5F0] via-blue-700 to-[#0DA5F0] dark:from-[#ff2e2e] dark:via-red-800 dark:to-[#ff2e2e] animate-gradient bg-[length:200%_auto]">
                SHASTRA
              </span>
            </h1>

            <p className="max-w-xl sm:max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed tracking-tight px-4 mt-2 sm:mt-3">
              A high-octane engineering collective architecting the next era of
              technical dominance through hands-on innovation.
            </p>
          </motion.div>

          {/* Call-to-Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="mt-5 sm:mt-6 flex flex-wrap items-center justify-center gap-3.5 sm:gap-4 px-4 z-20"
          >
            {/* Primary CTA: Events */}
            <Link
              href="/events"
              className="group relative inline-flex items-center gap-2.5 sm:gap-3 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full font-bold text-sm sm:text-base text-white transition-all duration-300 transform hover:scale-[1.03] active:scale-[0.98] shadow-lg overflow-hidden bg-linear-to-r from-[#0DA5F0] via-blue-600 to-[#0284c7] shadow-blue-500/25 hover:shadow-blue-500/40 dark:from-[#ff2e2e] dark:via-red-600 dark:to-[#dc2626] dark:shadow-red-600/30 dark:hover:shadow-red-600/50"
            >
              <span className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:rotate-12" />
              <span>Explore Events</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            {/* Secondary CTA: Our Story */}
            <Link
              href="/about"
              className="group inline-flex items-center gap-2.5 sm:gap-3 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full font-bold text-sm sm:text-base text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-800/80 bg-zinc-100/70 dark:bg-zinc-900/60 hover:bg-zinc-200/70 dark:hover:bg-zinc-800/80 backdrop-blur-xl transition-all duration-300 transform hover:scale-[1.03] active:scale-[0.98] hover:border-zinc-400 dark:hover:border-zinc-700 shadow-xs"
            >
              <Compass className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-500 dark:text-zinc-400 transition-transform duration-500 group-hover:rotate-45" />
              <span>Our Story</span>
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-400 dark:text-zinc-500 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
