"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

const teamMembers = [
  { name: "Lakshay Gupta", role: "Management Lead", image: "" },
  { name: "Manas Jaiswal", role: "AI/ML Lead", image: "" },
  { name: "Prabhash Rai", role: "Dev Lead", image: "" },
  { name: "Kunal Gupta", role: "Tech Lead", image: "" },
  { name: "Garv Goel", role: "Management Lead", image: "" },
  { name: "Harshita Gupta", role: "Management Lead", image: "" },
  { name: "Vedant Singh", role: "Design Lead", image: "" },
  { name: "Aksshat Batra", role: "Dev Lead", image: "" },
];

const CoreTeamGrid = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".team-card", {
        y: 60,
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full py-28 px-6 bg-[#fcfcfc] dark:bg-[#0c0c0c] transition-colors duration-700"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-xs font-black tracking-[0.5em] text-[#0DA5F0] dark:text-[#FA0001] uppercase"
          >
            The Vanguard
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tighter text-black dark:text-white mt-4"
          >
            Core Team
          </motion.h2>
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {teamMembers.map((member, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="team-card relative group"
            >
              <div className="relative p-6 rounded-3xl border border-black/5 dark:border-white/10 bg-white/50 dark:bg-zinc-900/40 backdrop-blur-xl overflow-hidden transition-all duration-500 group-hover:border-[#0DA5F0]/40 dark:group-hover:border-[#FA0001]/40 group-hover:shadow-2xl group-hover:shadow-[#0DA5F0]/10 dark:group-hover:shadow-[#FA0001]/10">
                {/* Image Wrap */}
                <div className="relative w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden border-2 border-black/5 dark:border-white/5 transition-transform duration-500 group-hover:scale-110">
                  <Image
                    src={
                      member.image ||
                      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop"
                    }
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Info */}
                <div className="text-center">
                  <h3 className="text-xl font-bold text-black dark:text-white tracking-tight">
                    {member.name}
                  </h3>
                  <p className="text-sm opacity-50 font-medium mt-1">
                    {member.role}
                  </p>
                </div>

                {/* Corner Accent */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#0DA5F0]/5 dark:from-[#FA0001]/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreTeamGrid;
