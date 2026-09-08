"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Zap,
  Terminal,
  Globe,
  Flame,
  Users,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

const PILLARS = [
  {
    index: "01",
    title: "Battle-Tested Architecture",
    description:
      "We replace toy tutorials with production-grade engineering—distributed systems, AI workflows, and resilient software.",
    icon: Terminal,
  },
  {
    index: "02",
    title: "High-Octane Hacker Ethos",
    description:
      "36-hour sprint cycles, peer code audits, and creator-led masterclasses designed for builders who ship without excuses.",
    icon: Flame,
  },
  {
    index: "03",
    title: "Pan-India Chapter Network",
    description:
      "A decentralized alliance across top engineering institutions, empowering grassroots innovators to build at scale.",
    icon: Globe,
  },
];

const FOUNDER_AVATARS = [
  {
    name: "Tanmay Tiwari",
    image:
      "https://res.cloudinary.com/dunacoujw/image/upload/v1772568692/1_f8hnlw.png",
  },
  {
    name: "Jai Chawla",
    image:
      "https://res.cloudinary.com/dunacoujw/image/upload/v1772568692/5_oz9vt2.png",
  },
  {
    name: "Sumit Rathore",
    image:
      "https://res.cloudinary.com/dunacoujw/image/upload/v1772568692/4_snnvr9.png",
  },
  {
    name: "Uday Sharma",
    image:
      "https://res.cloudinary.com/dunacoujw/image/upload/v1772568691/2_ipkls5.png",
  },
  {
    name: "Md Imran",
    image:
      "https://res.cloudinary.com/dunacoujw/image/upload/v1772647474/cofounders_2_dqcol5.png",
  },
];

const AboutSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activePillar, setActivePillar] = useState(0);
  const [chapterCount, setChapterCount] = useState<number | null>(null);

  useEffect(() => {
    async function fetchRealData() {
      try {
        const res = await fetch("/api/chapters");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            setChapterCount(data.length);
          }
        }
      } catch (err) {
        console.error("Failed to fetch chapters:", err);
      }
    }
    fetchRealData();
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [0.4, 1, 1, 0.4],
  );

  const metrics = [
    {
      value: "10K+",
      label: "Active Builders",
      sub: "National Network",
    },
    {
      value: chapterCount !== null ? `${chapterCount}` : "2",
      label: "Campus Chapters",
      sub: "Verified Chapters",
    },
    {
      value: "80+",
      label: "Partner Communities",
      sub: "Student Alliances",
    },
    {
      value: "100%",
      label: "Hands-on Ethos",
      sub: "Builder-Led",
    },
  ];

  return (
    <motion.section
      ref={containerRef}
      style={{ opacity }}
      className="relative w-full py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#070707] text-zinc-900 dark:text-zinc-100 overflow-hidden transition-colors duration-700"
    >
      {/* Subtle Background Glows */}
      <div className="absolute top-1/3 -left-32 w-80 h-80 rounded-full bg-[#0DA5F0]/10 dark:bg-[#FA0001]/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 -right-32 w-80 h-80 rounded-full bg-[#0DA5F0]/10 dark:bg-[#FA0001]/10 blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-zinc-200/80 dark:border-zinc-800/80">
          <div className="space-y-4 max-w-3xl">
            {/* Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 shadow-xs"
            >
              <Zap size={14} className="text-[#0DA5F0] dark:text-[#FA0001]" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 dark:text-zinc-400">
                Institutional Genesis
              </span>
              <div className="h-2 w-px bg-zinc-300 dark:bg-zinc-700" />
              <span className="text-[9px] font-bold uppercase tracking-wider text-[#0DA5F0] dark:text-[#FA0001]">
                ESTD. 2024
              </span>
            </motion.div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-[0.95] text-black dark:text-white">
              WE ARCHITECT THE{" "}
              <span className="text-[#0DA5F0] dark:text-[#FA0001]">FUTURE</span>{" "}
              OF ENGINEERING.
            </h2>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start pt-10">
          {/* Left Column (7 cols) */}
          <div className="lg:col-span-7 space-y-9">
            {/* Story Paragraph */}
            <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 font-normal leading-relaxed">
              HackShastra is a high-octane student collective engineered to bridge
              the terminal gap between academic theory and architectural reality.
              We don't just teach code; we build the builders who engineer India's
              next wave of technology.
            </p>

            {/* Metrics Bar with Real Data */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 sm:p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/20">
              {metrics.map((metric, i) => (
                <div key={i} className="space-y-1">
                  <div className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-950 dark:text-white">
                    {metric.value}
                  </div>
                  <div className="text-[10px] font-black uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                    {metric.label}
                  </div>
                  <div className="text-[9px] font-medium text-zinc-400 dark:text-zinc-500">
                    {metric.sub}
                  </div>
                </div>
              ))}
            </div>

            {/* Call To Action & Links */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pt-2">
              <Link href="/about" className="group">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative inline-flex items-center gap-3 px-8 py-4 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-full font-black text-xs uppercase tracking-[0.25em] shadow-lg overflow-hidden transition-all duration-300"
                >
                  <span className="relative z-10 flex items-center gap-2.5">
                    Explore Our Story
                    <ArrowRight
                      size={15}
                      className="group-hover:translate-x-1 transition-transform duration-300"
                    />
                  </span>
                  <div className="absolute inset-0 bg-[#0DA5F0] dark:bg-[#FA0001] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                </motion.div>
              </Link>

              {/* Sub-links to About page anchors */}
              <div className="flex flex-wrap items-center gap-2">
                <Link
                  href="/about#architects"
                  className="px-3.5 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors inline-flex items-center gap-1.5"
                >
                  Architects
                  <ArrowUpRight size={12} className="opacity-60" />
                </Link>
                <Link
                  href="/about#story-section"
                  className="px-3.5 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors inline-flex items-center gap-1.5"
                >
                  Timeline
                  <ArrowUpRight size={12} className="opacity-60" />
                </Link>
                <Link
                  href="/about"
                  className="px-3.5 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors inline-flex items-center gap-1.5"
                >
                  Student Chapters
                  <ArrowUpRight size={12} className="opacity-60" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column (5 cols) - Visual Card & Architect Link */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <div className="relative group">
              {/* Main Photo Frame */}
              <div className="relative rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 shadow-xl">
                <div className="relative aspect-4/3 sm:aspect-16/11 w-full overflow-hidden">
                  <img
                    src="https://res.cloudinary.com/dunacoujw/image/upload/v1772402430/12_ubduyk.webp"
                    alt="HackShastra Arena Celebration"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />
                </div>

                <div className="absolute bottom-0 inset-x-0 p-5 text-white">
                  <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#0DA5F0] dark:text-[#FA0001] block mb-1">
                    National Hackathon Arena
                  </span>
                  <p className="text-xs sm:text-sm font-semibold tracking-tight text-white/90">
                    Builders united to create, compete, and launch production-grade
                    innovations.
                  </p>
                </div>
              </div>

              {/* Floating Architects Badge (Bottom-Left) */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="absolute -bottom-5 -left-2 sm:-left-5 z-20"
              >
                <Link
                  href="/about#architects"
                  className="group flex items-center gap-3.5 px-4 py-2.5 sm:py-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md shadow-xl hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300"
                >
                  {/* Founder Avatars */}
                  <div className="flex items-center -space-x-2">
                    {FOUNDER_AVATARS.map((f, idx) => (
                      <div
                        key={idx}
                        className="relative w-8 h-8 rounded-full border-2 border-white dark:border-zinc-900 overflow-hidden bg-zinc-200 dark:bg-zinc-800 shadow-xs transition-transform duration-200 group-hover:scale-105"
                      >
                        <img
                          src={f.image}
                          alt={f.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Text Details */}
                  <div className="flex flex-col">
                    <span className="text-[11px] font-black uppercase tracking-wider text-zinc-900 dark:text-white leading-tight">
                      5 Architects
                    </span>
                    <span className="text-[10px] font-semibold text-[#0DA5F0] dark:text-[#FA0001] flex items-center gap-1 mt-0.5">
                      Meet the founders
                    </span>
                  </div>

                  {/* Subtle right accent arrow pill */}
                  <div className="ml-1 w-6 h-6 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 dark:text-white group-hover:bg-[#0DA5F0] dark:group-hover:bg-[#FA0001] group-hover:text-white transition-colors duration-200">
                    <ArrowUpRight size={12} />
                  </div>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default AboutSection;


