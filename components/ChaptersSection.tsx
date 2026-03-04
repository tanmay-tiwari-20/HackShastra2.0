"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";
import { type Chapter } from "@/lib/types";

const ChaptersSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchChapters = async () => {
    try {
      const res = await fetch("/api/chapters");
      if (res.ok) {
        const data = await res.json();
        setChapters(data);
      }
    } catch (err) {
      console.error("Failed to fetch chapters:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChapters();
  }, []);

  useEffect(() => {
    if (!containerRef.current || loading || chapters.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.from(".chapter-card", {
        scale: 0.9,
        opacity: 0,
        y: 40,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [loading, chapters]);

  return (
    <section
      ref={containerRef}
      className="relative w-full py-28 px-6 bg-white dark:bg-[#0a0a0a] transition-colors duration-700 overflow-hidden"
    >
      {/* Background Decorative Grid */}
      <div
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, currentColor 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-[#0DA5F0] dark:bg-[#FA0001]" />
              <span className="text-[10px] md:text-xs font-black tracking-[0.5em] text-[#0DA5F0] dark:text-[#FA0001] uppercase">
                EXPANSION // PHASE 01
              </span>
            </div>
            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-black dark:text-white leading-[0.9]">
              Community
              <br />
              <span className="opacity-20 dark:opacity-10">Chapters</span>
            </h2>
          </div>
          <p className="text-lg md:text-xl opacity-50 dark:opacity-30 max-w-sm tracking-tight leading-tight font-medium">
            Scaling the hacker culture to every corner of India, one campus at a
            time. Directing the pulse of innovation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
          {loading
            ? [1, 2].map((i) => (
                <div
                  key={i}
                  className="h-96 rounded-[2.5rem] bg-black/5 dark:bg-white/5 animate-pulse"
                />
              ))
            : chapters.map((chapter, i) => (
                <motion.div
                  key={chapter._id || i}
                  whileHover={{ y: -12, scale: 1.02 }}
                  className="chapter-card group relative"
                >
                  {/* Industrial Border Glow */}
                  <div className="absolute -inset-[1px] bg-gradient-to-r from-[#0DA5F0] to-blue-600 dark:from-[#FA0001] dark:to-red-600 rounded-[2.5rem] opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500" />

                  <div className="relative h-full rounded-[2.5rem] border border-black/5 dark:border-white/10 bg-white dark:bg-zinc-900/40 backdrop-blur-2xl p-10 md:p-14 overflow-hidden shadow-2xl shadow-black/5 dark:shadow-none">
                    {/* Visual Content Layout */}
                    <div className="flex flex-col md:flex-row gap-10 items-center md:items-start">
                      {/* Cinematic Logo Container */}
                      <div className="relative shrink-0">
                        <div className="absolute -inset-4 bg-[#0DA5F0]/10 dark:bg-[#FA0001]/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-3xl overflow-hidden border border-black/5 dark:border-white/10 bg-white/50 dark:bg-white/5 p-5 shadow-2xl backdrop-blur-md transition-transform duration-700 group-hover:scale-105 group-hover:rotate-1">
                          <div className="relative w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700">
                            {chapter.logo && (
                              <Image
                                src={chapter.logo}
                                alt={`${chapter.college} logo`}
                                fill
                                className="object-contain"
                              />
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Text Data */}
                      <div className="flex-1 flex flex-col justify-center text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                          <span className="font-mono text-[10px] md:text-xs opacity-30 tracking-[0.3em] font-bold">
                            UNIT // 0{i + 1}
                          </span>
                          <div className="h-px flex-1 bg-black/5 dark:bg-white/5 hidden md:block" />
                        </div>

                        <h3 className="text-4xl md:text-6xl font-black text-black dark:text-white tracking-tighter leading-none mb-3">
                          {chapter.college}
                        </h3>
                        <p className="text-sm md:text-lg font-bold opacity-30 uppercase tracking-widest mb-8">
                          {chapter.city}
                        </p>

                        <div className="pt-8 border-t border-black/5 dark:border-white/10">
                          <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#0DA5F0] dark:bg-[#FA0001]" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30">
                              CHAPTER LEAD
                            </span>
                          </div>
                          <p className="text-xl md:text-3xl font-black text-black dark:text-white leading-none">
                            {chapter.lead}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Industrial Corner Details */}
                    {/* Top Left */}
                    <div className="absolute top-8 left-8 w-4 h-4 border-t-2 border-l-2 border-black/10 dark:border-white/10 group-hover:border-[#0DA5F0] dark:group-hover:border-[#FA0001] transition-colors duration-500" />
                    {/* Top Right */}
                    <div className="absolute top-8 right-8 w-4 h-4 border-t-2 border-r-2 border-black/10 dark:border-white/10 group-hover:border-[#0DA5F0] dark:group-hover:border-[#FA0001] transition-colors duration-500" />
                    {/* Bottom Left */}
                    <div className="absolute bottom-8 left-8 w-4 h-4 border-b-2 border-l-2 border-black/10 dark:border-white/10 group-hover:border-[#0DA5F0] dark:group-hover:border-[#FA0001] transition-colors duration-500" />
                    {/* Bottom Right */}
                    <div className="absolute bottom-8 right-8 w-4 h-4 border-b-2 border-r-2 border-black/10 dark:border-white/10 group-hover:border-[#0DA5F0] dark:group-hover:border-[#FA0001] transition-colors duration-500" />

                    {/* Background Text Shadow */}
                    <div className="absolute -bottom-10 -right-10 text-9xl font-black opacity-[0.02] dark:opacity-[0.03] pointer-events-none select-none italic group-hover:translate-x-5 transition-transform duration-1000">
                      {chapter.college}
                    </div>
                  </div>
                </motion.div>
              ))}
        </div>
      </div>
    </section>
  );
};

export default ChaptersSection;
