"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const AboutHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;

    const ctx = gsap.context(() => {
      // Subtle parallax on the grid background
      gsap.to(gridRef.current, {
        y: -100,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-white dark:bg-[#0a0a0a] transition-colors duration-700 pt-20"
    >
      {/* Cinematic Grid Background */}
      <div
        ref={gridRef}
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.05] dark:opacity-[0.08]"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: "clamp(40px, 8vw, 80px) clamp(40px, 8vw, 80px)",
        }}
      />

      {/* Side Label - Left */}
      <div className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 -rotate-90 origin-center hidden sm:block">
        <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[1em] md:tracking-[1.5em] opacity-20 whitespace-nowrap">
          SYSTEM // INITIALIZED
        </span>
      </div>

      {/* Side Label - Right */}
      <div className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 rotate-90 origin-center hidden sm:block">
        <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[1em] md:tracking-[1.5em] opacity-20 whitespace-nowrap">
          HACKSHASTRA // ORIGIN
        </span>
      </div>

      {/* High-Impact Typography Layout */}
      <div className="relative z-10 w-full max-w-7xl px-6 flex flex-col items-center">
        {/* Top Text Block */}
        <div className="w-full flex flex-col items-center lg:items-start mb-4 md:mb-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0DA5F0] dark:text-[#FA0001]">
              ESTABLISHED 2023
            </span>
            <div className="h-px w-12 bg-black/10 dark:bg-white/10" />
          </motion.div>

          <motion.h1
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.85] text-black dark:text-white text-center lg:text-left"
          >
            HACK
            <span className="text-[#0DA5F0] dark:text-[#FA0001]">SHASTRA</span>
          </motion.h1>
        </div>

        {/* Bottom Text and Action */}
        <div className="mt-8 md:mt-16 w-full flex flex-col md:flex-row items-center md:items-end justify-between gap-10 md:gap-20">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold tracking-tight max-w-xl leading-tight text-black dark:text-white text-center md:text-left"
          >
            Decoding the divine architecture of innovation. We build for the
            architects of tomorrow, today.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="relative"
          >
            <button
              onClick={() => {
                const el = document.getElementById("story-section");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group relative px-10 py-8 md:px-14 md:py-12 rounded-full border-2 border-black/10 dark:border-white/10 flex items-center justify-center transition-all duration-500 hover:border-[#0DA5F0] dark:hover:border-[#FA0001]"
            >
              <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] relative z-10 transition-colors duration-500 group-hover:text-[#0DA5F0] dark:group-hover:text-[#FA0001]">
                Unveil History
              </span>
              <div className="absolute inset-0 bg-black/5 dark:bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
            </button>
          </motion.div>
        </div>
      </div>

      {/* Industrial Decorative Brackets - Responsive */}
      <div className="absolute bottom-10 left-6 md:bottom-20 md:left-20 w-20 h-20 md:w-40 md:h-40 border-b-2 border-l-2 border-black/5 dark:border-white/5" />
      <div className="absolute top-24 right-6 md:top-40 md:right-20 w-20 h-20 md:w-40 md:h-40 border-t-2 border-r-2 border-black/5 dark:border-white/5" />

      {/* Scroll Down Hint */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30"
      >
        <div className="w-px h-8 md:h-12 bg-current" />
        <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest">
          Scroll
        </span>
      </motion.div>
    </section>
  );
};

export default AboutHero;
