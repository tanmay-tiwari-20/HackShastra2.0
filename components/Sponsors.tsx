"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Handshake, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { type Sponsor } from "@/lib/types";

const fallbackSPONSORS: Sponsor[] = [
  {
    name: "Neighshop Global",
    logo: "https://res.cloudinary.com/dunacoujw/image/upload/v1772719196/images_yoqlcn.png",
    category: "IT Company",
  },
  {
    name: "Genesis",
    logo: "https://res.cloudinary.com/dunacoujw/image/upload/v1772717702/images_1_gouh4p.png",
    category: "Partner",
  },
  {
    name: "Secure With Techies",
    logo: "https://res.cloudinary.com/dunacoujw/image/upload/v1772717775/images_2_wmezfw.png",
    category: "Cybersecurity",
  },
  {
    name: "She Kunj",
    logo: "https://res.cloudinary.com/dunacoujw/image/upload/v1772717897/images_3_u2zn3y.png",
    category: "Partner",
  },
  {
    name: ".xyz",
    logo: "https://res.cloudinary.com/dunacoujw/image/upload/v1772719374/images_1_tjxtuf.png",
    category: "Web3 & Domains",
  },
  {
    name: "Abhi Bus",
    logo: "https://res.cloudinary.com/dunacoujw/image/upload/v1772718078/images_5_bpqzow.png",
    category: "Travel",
  },
  {
    name: "Physics Wallah",
    logo: "https://res.cloudinary.com/dunacoujw/image/upload/v1772718155/images_6_trbcr9.png",
    category: "EdTech",
  },
];

const SPONSOR_DOMAINS: Record<string, string> = {
  "Neighshop Global": "IT Company",
  "Genesis": "Partner",
  "Secure With Techies": "Cybersecurity",
  "She Kunj": "Partner",
  ".xyz": "Web3 & Domains",
  "Abhi Bus": "Travel",
  "Physics Wallah": "EdTech",
};

const getSponsorDomain = (sponsor: Sponsor): string => {
  return sponsor.category?.trim() || SPONSOR_DOMAINS[sponsor.name] || "Tech Ecosystem";
};

const Sponsors = () => {
  const [sponsorsData, setSponsorsData] = useState<Sponsor[]>(fallbackSPONSORS);

  useEffect(() => {
    async function fetchSponsors() {
      try {
        const res = await fetch("/api/sponsors");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setSponsorsData(data);
          }
        }
      } catch (error) {
        console.error("Failed to fetch dynamic sponsors:", error);
      }
    }
    fetchSponsors();
  }, []);

  // Track 1: Normal order looped 4 times for continuous marquee
  const track1Items = [
    ...sponsorsData,
    ...sponsorsData,
    ...sponsorsData,
    ...sponsorsData,
  ];

  // Track 2: Offset / reversed order looped 4 times for dynamic counter-flow
  const reversedSponsors = [...sponsorsData].reverse();
  const track2Items = [
    ...reversedSponsors,
    ...reversedSponsors,
    ...reversedSponsors,
    ...reversedSponsors,
  ];

  return (
    <section className="relative w-full py-16 md:py-24 bg-white dark:bg-[#070707] text-zinc-900 dark:text-zinc-100 overflow-hidden border-y border-zinc-200/80 dark:border-zinc-800/80 transition-colors duration-700">
      {/* Background Subtle Tech Glows */}
      <div className="absolute top-1/4 -left-32 w-80 h-80 rounded-full bg-[#0DA5F0]/10 dark:bg-[#FA0001]/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full bg-[#0DA5F0]/10 dark:bg-[#FA0001]/10 blur-[120px] pointer-events-none" />

      {/* Cyber Grid Dot Pattern */}
      <div
        className="absolute inset-0 opacity-[0.035] dark:opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, currentColor 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 relative z-10 mb-12 md:mb-16 text-center">
        {/* Pill Badge matching AboutSection */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 shadow-xs mb-5 backdrop-blur-sm"
        >
          <Handshake size={14} className="text-[#0DA5F0] dark:text-[#FA0001]" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 dark:text-zinc-400">
            Strategic Alliances
          </span>
          <div className="h-2 w-px bg-zinc-300 dark:bg-zinc-700" />
          <span className="text-[9px] font-bold uppercase tracking-wider text-[#0DA5F0] dark:text-[#FA0001]">
            Industry Backed
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-tight text-zinc-950 dark:text-white"
        >
          POWERED BY{" "}
          <span className="text-[#0DA5F0] dark:text-[#FA0001]">
            INDUSTRY LEADERS
          </span>
        </motion.h2>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="max-w-2xl mx-auto text-sm sm:text-base text-zinc-600 dark:text-zinc-400 font-normal leading-relaxed mt-4"
        >
          Collaborating with visionary tech enterprises and developer ecosystems
          to empower 10,000+ student builders with industrial-grade tooling, bounties,
          and direct hiring pipelines.
        </motion.p>
      </div>

      {/* Marquee Container with Dual Tracks */}
      <div className="relative w-full space-y-6 md:space-y-8 overflow-hidden">
        {/* Edge Fade Masks for smooth gradient feathering */}
        <div className="absolute inset-y-0 left-0 w-24 sm:w-40 md:w-64 bg-linear-to-r from-white dark:from-[#070707] via-white/80 dark:via-[#070707]/80 to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 sm:w-40 md:w-64 bg-linear-to-l from-white dark:from-[#070707] via-white/80 dark:via-[#070707]/80 to-transparent z-20 pointer-events-none" />

        {/* Track 1: Leftward Infinite Flow */}
        <div className="relative flex overflow-hidden py-1">
          <motion.div
            className="flex whitespace-nowrap gap-5 sm:gap-6 md:gap-8 shrink-0"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 35,
              ease: "linear",
              repeat: Infinity,
            }}
            whileHover={{ transition: { duration: 90 } }}
          >
            {track1Items.map((sponsor, i) => (
              <div
                key={`track1-${i}`}
                className="group/card relative flex flex-col justify-between w-64 h-36 sm:w-72 sm:h-40 md:w-80 md:h-44 rounded-2xl md:rounded-3xl border border-zinc-200/90 dark:border-zinc-800/80 bg-white/80 dark:bg-[#0c0c0e]/80 backdrop-blur-xl shadow-xs hover:shadow-2xl hover:shadow-[#0DA5F0]/10 dark:hover:shadow-[#FA0001]/10 hover:border-[#0DA5F0]/50 dark:hover:border-[#FA0001]/50 transition-all duration-500 overflow-hidden shrink-0 select-none cursor-pointer"
              >
                {/* Top Subtle Ambient Accent Highlight */}
                <div className="absolute top-0 inset-x-0 h-0.5 bg-linear-to-r from-transparent via-[#0DA5F0] dark:via-[#FA0001] to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />

                {/* Tech Corner Crosshairs */}
                <div className="absolute top-2.5 left-2.5 w-1.5 h-1.5 border-t border-l border-zinc-300 dark:border-zinc-700 group-hover/card:border-[#0DA5F0] dark:group-hover/card:border-[#FA0001] transition-colors" />
                <div className="absolute top-2.5 right-2.5 w-1.5 h-1.5 border-t border-r border-zinc-300 dark:border-zinc-700 group-hover/card:border-[#0DA5F0] dark:group-hover/card:border-[#FA0001] transition-colors" />

                {/* Dedicated Logo Canvas with Contrast Plate */}
                <div className="relative flex-1 flex items-center justify-center p-5 sm:p-6 overflow-hidden">
                  {/* Contrast Plate ensuring dark & light logos pop clearly */}
                  <div className="absolute inset-3 sm:inset-4 rounded-xl sm:rounded-2xl bg-zinc-100/70 dark:bg-white/4 group-hover/card:bg-zinc-100/90 dark:group-hover/card:bg-white/[0.07] border border-zinc-200/60 dark:border-white/6 transition-all duration-500" />

                  {/* Soft Radial Backlight on Hover */}
                  <div className="absolute inset-0 bg-radial from-[#0DA5F0]/5 dark:from-[#FA0001]/10 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  {/* Logo Image */}
                  <img
                    src={sponsor.logo}
                    alt={sponsor.name}
                    className="relative z-10 max-h-14 sm:max-h-16 md:max-h-20 w-auto max-w-[170px] sm:max-w-[190px] md:max-w-[210px] object-contain transition-transform duration-500 group-hover/card:scale-105 filter drop-shadow-sm dark:drop-shadow-[0_2px_10px_rgba(255,255,255,0.08)]"
                    loading="lazy"
                  />
                </div>

                {/* Card Status & Identity Footer */}
                <div className="relative z-10 w-full px-4 sm:px-5 py-2.5 flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/70 dark:bg-zinc-950/60 transition-colors">
                  <span className="text-xs sm:text-[13px] font-bold text-zinc-800 dark:text-zinc-200 group-hover/card:text-[#0DA5F0] dark:group-hover/card:text-[#FA0001] transition-colors truncate max-w-[150px] sm:max-w-[170px]">
                    {sponsor.name}
                  </span>
                  <span className="text-[10px] font-semibold tracking-wide px-2.5 py-0.5 rounded-full bg-zinc-200/70 dark:bg-zinc-800/70 text-zinc-600 dark:text-zinc-400 group-hover/card:bg-[#0DA5F0]/10 dark:group-hover/card:bg-[#FA0001]/10 group-hover/card:text-[#0DA5F0] dark:group-hover/card:text-[#FA0001] group-hover/card:border-[#0DA5F0]/30 dark:group-hover/card:border-[#FA0001]/30 border border-transparent transition-all duration-300">
                    {getSponsorDomain(sponsor)}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Track 2: Rightward Infinite Flow (Counter-Direction) */}
        <div className="relative flex overflow-hidden py-1">
          <motion.div
            className="flex whitespace-nowrap gap-5 sm:gap-6 md:gap-8 shrink-0"
            animate={{ x: ["-50%", "0%"] }}
            transition={{
              duration: 38,
              ease: "linear",
              repeat: Infinity,
            }}
            whileHover={{ transition: { duration: 90 } }}
          >
            {track2Items.map((sponsor, i) => (
              <div
                key={`track2-${i}`}
                className="group/card relative flex flex-col justify-between w-64 h-36 sm:w-72 sm:h-40 md:w-80 md:h-44 rounded-2xl md:rounded-3xl border border-zinc-200/90 dark:border-zinc-800/80 bg-white/80 dark:bg-[#0c0c0e]/80 backdrop-blur-xl shadow-xs hover:shadow-2xl hover:shadow-[#0DA5F0]/10 dark:hover:shadow-[#FA0001]/10 hover:border-[#0DA5F0]/50 dark:hover:border-[#FA0001]/50 transition-all duration-500 overflow-hidden shrink-0 select-none cursor-pointer"
              >
                {/* Top Subtle Ambient Accent Highlight */}
                <div className="absolute top-0 inset-x-0 h-0.5 bg-linear-to-r from-transparent via-[#0DA5F0] dark:via-[#FA0001] to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />

                {/* Tech Corner Crosshairs */}
                <div className="absolute top-2.5 left-2.5 w-1.5 h-1.5 border-t border-l border-zinc-300 dark:border-zinc-700 group-hover/card:border-[#0DA5F0] dark:group-hover/card:border-[#FA0001] transition-colors" />
                <div className="absolute top-2.5 right-2.5 w-1.5 h-1.5 border-t border-r border-zinc-300 dark:border-zinc-700 group-hover/card:border-[#0DA5F0] dark:group-hover/card:border-[#FA0001] transition-colors" />

                {/* Dedicated Logo Canvas with Contrast Plate */}
                <div className="relative flex-1 flex items-center justify-center p-5 sm:p-6 overflow-hidden">
                  {/* Contrast Plate ensuring dark & light logos pop clearly */}
                  <div className="absolute inset-3 sm:inset-4 rounded-xl sm:rounded-2xl bg-zinc-100/70 dark:bg-white/4 group-hover/card:bg-zinc-100/90 dark:group-hover/card:bg-white/[0.07] border border-zinc-200/60 dark:border-white/6 transition-all duration-500" />

                  {/* Soft Radial Backlight on Hover */}
                  <div className="absolute inset-0 bg-radial from-[#0DA5F0]/5 dark:from-[#FA0001]/10 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  {/* Logo Image */}
                  <img
                    src={sponsor.logo}
                    alt={sponsor.name}
                    className="relative z-10 max-h-14 sm:max-h-16 md:max-h-20 w-auto max-w-[170px] sm:max-w-[190px] md:max-w-[210px] object-contain transition-transform duration-500 group-hover/card:scale-105 filter drop-shadow-sm dark:drop-shadow-[0_2px_10px_rgba(255,255,255,0.08)]"
                    loading="lazy"
                  />
                </div>

                {/* Card Status & Identity Footer */}
                <div className="relative z-10 w-full px-4 sm:px-5 py-2.5 flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/70 dark:bg-zinc-950/60 transition-colors">
                  <span className="text-xs sm:text-[13px] font-bold text-zinc-800 dark:text-zinc-200 group-hover/card:text-[#0DA5F0] dark:group-hover/card:text-[#FA0001] transition-colors truncate max-w-[150px] sm:max-w-[170px]">
                    {sponsor.name}
                  </span>
                  <span className="text-[10px] font-semibold tracking-wide px-2.5 py-0.5 rounded-full bg-zinc-200/70 dark:bg-zinc-800/70 text-zinc-600 dark:text-zinc-400 group-hover/card:bg-[#0DA5F0]/10 dark:group-hover/card:bg-[#FA0001]/10 group-hover/card:text-[#0DA5F0] dark:group-hover/card:text-[#FA0001] group-hover/card:border-[#0DA5F0]/30 dark:group-hover/card:border-[#FA0001]/30 border border-transparent transition-all duration-300">
                    {getSponsorDomain(sponsor)}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Alliance CTA & Proof Banner */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="mt-12 md:mt-16 max-w-5xl mx-auto px-6 relative z-10"
      >
        <div className="p-6 sm:p-8 rounded-2xl md:rounded-3xl border border-zinc-200/90 dark:border-zinc-800/80 bg-linear-to-r from-zinc-50 via-white to-zinc-50 dark:from-zinc-950/90 dark:via-zinc-900/60 dark:to-zinc-950/90 backdrop-blur-xl shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-[#0DA5F0] dark:text-[#FA0001]">
              <Handshake size={13} />
              Collaborate & Sponsor
            </div>
            <h3 className="text-lg sm:text-xl font-black text-zinc-950 dark:text-white tracking-tight">
              Empower India&apos;s Next Generation of Builders
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-xl">
              Partner with <span className="text-[#0DA5F0] dark:text-[#FA0001] font-bold">HackShastra</span> on national hackathons, developer grants,
              and direct campus talent recruitment.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/contact"
              className="group relative inline-flex items-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-full bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 font-black text-xs uppercase tracking-[0.2em] shadow-md hover:shadow-xl hover:scale-102 transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Partner With Us
                <ArrowUpRight
                  size={15}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
                />
              </span>
              <div className="absolute inset-0 bg-[#0DA5F0] dark:bg-[#FA0001] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Sponsors;
