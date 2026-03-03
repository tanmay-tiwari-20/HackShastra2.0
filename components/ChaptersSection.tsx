"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const chapters = [
  { college: "IPEC", city: "Ghaziabad", lead: "HackShastra Main" },
  { college: "ABESIT", city: "Ghaziabad", lead: "Coming Soon" },
  { college: "RKGIT", city: "Ghaziabad", lead: "Coming Soon" },
  { college: "AKGEC", city: "Ghaziabad", lead: "Coming Soon" },
];

const ChaptersSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

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
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full py-28 px-6 bg-white dark:bg-[#0a0a0a] transition-colors duration-700"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <span className="text-xs font-black tracking-[0.5em] text-[#0DA5F0] dark:text-[#FA0001] uppercase">
              Expansion
            </span>
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tighter text-black dark:text-white mt-4">
              Community Chapters
            </h2>
          </div>
          <p className="text-xl opacity-50 dark:opacity-30 max-w-sm tracking-tight">
            Scaling the hacker culture to every corner of India, one campus at a
            time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {chapters.map((chapter, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="chapter-card group relative"
            >
              <div className="relative p-10 h-full rounded-[2.5rem] border border-black/5 dark:border-white/10 bg-[#f8f8f8] dark:bg-zinc-900/20 backdrop-blur-xl transition-all duration-500 group-hover:bg-white dark:group-hover:bg-black group-hover:border-[#0DA5F0]/30 dark:group-hover:border-[#FA0001]/30 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
                <span className="text-xs font-black opacity-20 uppercase tracking-widest">
                  Chapter // 0{i + 1}
                </span>
                <h3 className="text-3xl font-bold text-black dark:text-white mt-6 tracking-tighter">
                  {chapter.college}
                </h3>
                <p className="text-sm opacity-50 font-medium">{chapter.city}</p>
                <div className="mt-8 pt-8 border-t border-black/5 dark:border-white/5">
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-30">
                    Lead
                  </span>
                  <p className="text-lg font-bold text-[#0DA5F0] dark:text-[#FA0001] mt-1">
                    {chapter.lead}
                  </p>
                </div>

                {/* Industrial Corner Detail */}
                <div className="absolute bottom-6 right-6 w-8 h-8 opacity-10 group-hover:opacity-40 transition-opacity duration-500">
                  <div className="absolute bottom-0 right-0 w-full h-px bg-current" />
                  <div className="absolute bottom-0 right-0 h-full w-px bg-current" />
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
