"use client";
import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import gsap from "gsap";
import { Terminal, Users, ShieldCheck, ChevronRight } from "lucide-react";

const Hero = ({ isReady = false }: { isReady?: boolean }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll parallax for content depth
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.4], [1, 0.9]);
  const rotateX = useTransform(scrollYProgress, [0, 0.4], [0, 5]);

  const springY = useSpring(y, { stiffness: 100, damping: 30 });
  const springScale = useSpring(scale, { stiffness: 100, damping: 30 });

  // Floating background motion
  useEffect(() => {
    if (!isReady) return;
    const ctx = gsap.context(() => {
      gsap.to(".tech-float", {
        y: "random(-40, 40)",
        x: "random(-40, 40)",
        duration: "random(4, 7)",
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        stagger: { each: 1, from: "random" },
      });
    }, containerRef);
    return () => ctx.revert();
  }, [isReady]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.4 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 1,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 md:px-6 py-20 bg-white dark:bg-black"
    >
      {/* Immersive Background System */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[60vw] h-[60vw] bg-blue-500/5 dark:bg-red-600/5 rounded-full blur-[120px] tech-float" />
        <div className="absolute bottom-1/4 right-1/4 w-[50vw] h-[50vw] bg-purple-500/5 dark:bg-orange-600/5 rounded-full blur-[100px] tech-float" />

        <div className="absolute inset-x-0 top-0 h-1/2 bg-linear-to-b from-zinc-100/50 dark:from-zinc-900/10 to-transparent" />

        {/* Grid System - Dark */}
        <div
          className="absolute inset-0 opacity-[0.1] hidden dark:block"
          style={{
            backgroundImage: `linear-gradient(to right, #333 1px, transparent 1px), 
                              linear-gradient(to bottom, #333 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Grid System - Light */}
        <div
          className="absolute inset-0 opacity-[0.05] block dark:hidden"
          style={{
            backgroundImage: `linear-gradient(to right, #ddd 1px, transparent 1px), 
                              linear-gradient(to bottom, #ddd 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <motion.div
        style={{ y: springY, opacity, scale: springScale, rotateX }}
        className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isReady ? "visible" : "hidden"}
          className="text-center"
        >
          {/* Status Badge */}
          <motion.div
            variants={itemVariants}
            className="mb-8 inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl shadow-sm"
          >
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 dark:text-zinc-400">
              India's First Creator-Led Tech Community
            </span>
          </motion.div>

          {/* Logo */}
          <motion.div
            variants={itemVariants}
            className="relative mb-10 flex justify-center"
          >
            <Image
              src="/logo1.svg"
              alt="Hackshastra Logo"
              width={160}
              height={160}
              className="w-20 sm:w-24 md:w-32 object-contain filter drop-shadow-[0_0_30px_rgba(0,0,0,0.05)] hidden dark:block"
              priority
            />
            <Image
              src="/logo2.svg"
              alt="Hackshastra Logo"
              width={160}
              height={160}
              className="w-20 sm:w-24 md:w-32 object-contain filter drop-shadow-[0_0_30px_rgba(0,0,0,0.05)] block dark:hidden"
              priority
            />
          </motion.div>

          {/* Core Brand Identity */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h1 className="text-[clamp(3.5rem,14vw,10rem)] font-black tracking-tighter leading-[0.85] flex flex-col items-center">
              <span className="text-zinc-900 dark:text-white">HACK</span>
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#0DA5F0] via-blue-700 to-[#0DA5F0] dark:from-[#ff2e2e] dark:via-red-800 dark:to-[#ff2e2e] animate-gradient bg-[length:200%_auto]">
                SHASTRA
              </span>
            </h1>

            <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed tracking-tight px-4 mt-8">
              A high-octane engineering collective architecting the next era of
              technical dominance through hands-on innovation.
            </p>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Background Accents */}
      <div className="absolute bottom-10 left-10 hidden md:block opacity-10">
        <div className="w-px h-24 bg-linear-to-b from-zinc-500 to-transparent" />
      </div>
      <div className="absolute bottom-10 right-10 hidden md:block opacity-10">
        <div className="w-px h-24 bg-linear-to-b from-zinc-500 to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
