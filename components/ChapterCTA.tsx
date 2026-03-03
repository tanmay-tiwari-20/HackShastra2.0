"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";

const ChapterCTA = () => {
  const buttonRef = useRef<HTMLAnchorElement>(null);

  // Magnetic button effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } =
      buttonRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    x.set((clientX - centerX) * 0.4);
    y.set((clientY - centerY) * 0.4);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section className="relative w-full py-20 md:py-40 flex items-center justify-center overflow-hidden bg-[#f8f8f8] dark:bg-[#0c0c0c] transition-colors duration-700">
      {/* Background Pulse */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl max-h-4xl bg-gradient-to-r from-[#0DA5F0]/5 to-[#FA0001]/5 blur-[60px] md:blur-[100px] rounded-full animate-pulse" />

      <div className="relative z-10 text-center px-6 w-full max-w-5xl">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-[9px] md:text-xs font-black tracking-[0.3em] md:tracking-[0.5em] text-[#0DA5F0] dark:text-[#FA0001] uppercase"
        >
          Join the Movement
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-black dark:text-white mt-4 mb-8 md:mb-12 leading-[1.1] sm:leading-[0.9]"
        >
          Start a HackShastra
          <br className="sm:block" />
          Chapter
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-base md:text-xl lg:text-2xl opacity-60 dark:opacity-40 max-w-2xl mx-auto mb-10 md:mb-16 tracking-tight font-medium"
        >
          Bring the hacker culture to your campus. Empower your peers, build
          world-class projects, and lead the tech revolution.
        </motion.p>

        <div className="flex justify-center">
          <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: springX, y: springY }}
            className="relative"
          >
            <motion.a
              ref={buttonRef}
              href="https://forms.gle/vS5uRzWhW2hM8h6L8"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center px-6 py-4 md:px-12 md:py-6 bg-black dark:bg-white text-white dark:text-black rounded-full font-black text-[9px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.4em] overflow-hidden shadow-2xl transition-transform"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Apply for Student Chapter</span>
              <div className="absolute inset-0 bg-[#0DA5F0] dark:bg-[#FA0001] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />

              {/* Outer Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 blur-xl bg-[#0DA5F0]/30 dark:bg-[#FA0001]/30 transition-opacity duration-500" />
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* Industrial Accents - Simplified for Mobile */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 h-10 md:h-20 w-px bg-black/10 dark:bg-white/10" />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 h-10 md:h-20 w-px bg-black/10 dark:bg-white/10" />
    </section>
  );
};

export default ChapterCTA;
