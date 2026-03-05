"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { type Sponsor } from "@/lib/types";

const fallbackSPONSORS = [
  {
    name: "Neighshop Global",
    logo: "https://res.cloudinary.com/dunacoujw/image/upload/v1772719196/images_yoqlcn.png",
  },
  {
    name: "Genesis",
    logo: "https://res.cloudinary.com/dunacoujw/image/upload/v1772717702/images_1_gouh4p.png",
  },
  {
    name: "Secure With Techies",
    logo: "https://res.cloudinary.com/dunacoujw/image/upload/v1772717775/images_2_wmezfw.png",
  },
  {
    name: "She Kunj",
    logo: "https://res.cloudinary.com/dunacoujw/image/upload/v1772717897/images_3_u2zn3y.png",
  },
  {
    name: ".xyz",
    logo: "https://res.cloudinary.com/dunacoujw/image/upload/v1772719374/images_1_tjxtuf.png",
  },
  {
    name: "Abhi Bus",
    logo: "https://res.cloudinary.com/dunacoujw/image/upload/v1772718078/images_5_bpqzow.png",
  },
  {
    name: "Physics Wallah",
    logo: "https://res.cloudinary.com/dunacoujw/image/upload/v1772718155/images_6_trbcr9.png",
  },
];

const Sponsors = () => {
  const [sponsorsData, setSponsorsData] = useState<any[]>(fallbackSPONSORS);

  useEffect(() => {
    async function fetchSponsors() {
      try {
        const res = await fetch("/api/sponsors");
        if (res.ok) {
          const data = await res.json();
          // Use dynamic data if available, otherwise keep fallback
          if (data && data.length > 0) {
            setSponsorsData(data);
          }
        }
      } catch (error) {
        console.error("Failed to fetch dynamic sponsors:", error);
      }
    }
    fetchSponsors();
  }, []);

  // Use 4 duplicates to ensure the marquee fills even the largest screens without a gap
  const marqueeItems = [
    ...sponsorsData,
    ...sponsorsData,
    ...sponsorsData,
    ...sponsorsData,
  ];

  return (
    <section className="relative w-full py-24 md:py-32 bg-white dark:bg-black overflow-hidden border-y border-zinc-100 dark:border-zinc-900">
      {/* Premium Background System */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, currentColor 1.5px, transparent 1.5px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="absolute inset-0 bg-linear-to-b from-white dark:from-black via-transparent to-white dark:to-black opacity-60" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 mb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-900 mb-6"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-[#0DA5F0] dark:bg-[#ff2e2e] animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 dark:text-zinc-600">
            Strategic Alliances
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-tight"
        >
          POWERED BY <br className="sm:hidden" />
          <span className="text-[#0DA5F0] dark:text-[#ff2e2e]">
            INDUSTRY LEADERS
          </span>
        </motion.h2>
      </div>

      <div className="relative w-full group overflow-hidden">
        {/* Edge Fade Masks - Premium Gradient */}
        <div className="absolute inset-y-0 left-0 w-32 md:w-64 bg-linear-to-r from-white dark:from-black via-white/80 dark:via-black/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 md:w-64 bg-linear-to-l from-white dark:from-black via-white/80 dark:via-black/80 to-transparent z-10 pointer-events-none" />

        <div className="relative flex overflow-hidden py-14">
          <motion.div
            className="flex whitespace-nowrap gap-20 md:gap-40"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 60,
              ease: "linear",
              repeat: Infinity,
            }}
            whileHover={{ transition: { duration: 120 } }} // Slow down significantly on hover
          >
            {marqueeItems.map((sponsor, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center gap-8 group/card"
              >
                {/* Contrast Plate Container - Extreme Sizing */}
                <div className="relative w-56 h-36 md:w-72 md:h-44 flex items-center justify-center rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/80 dark:bg-zinc-900/40 backdrop-blur-md group-hover/card:scale-105 group-hover/card:border-zinc-200 dark:group-hover/card:border-zinc-700 transition-all duration-500 shadow-sm group-hover/card:shadow-2xl dark:group-hover/card:shadow-none">
                  <div className="relative w-full h-full p-8 md:p-10 flex items-center justify-center">
                    <img
                      src={sponsor.logo}
                      alt={sponsor.name}
                      className="max-h-20 md:max-h-36 w-auto object-contain transition-all duration-700 opacity-100 group-hover/card:scale-110 drop-shadow-xl"
                    />
                  </div>
                </div>

                <span className="text-[20px] font-black opacity-0 group-hover/card:opacity-100 translate-y-2 group-hover/card:translate-y-0 transition-all duration-500">
                  {sponsor.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Sponsors;
