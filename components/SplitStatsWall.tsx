"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useTheme } from "next-themes";
import { Users, BookOpen, Share2, Award, Zap, TrendingUp, Globe } from "lucide-react";

interface Stat {
  label: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  id: string;
}

const STATS_CONFIG: Stat[] = [
  {
    id: "reach",
    label: "Social Reach",
    value: "500",
    description: "Active digital footprint",
    icon: <Share2 className="w-5 h-5" />,
  },
  {
    id: "chapters",
    label: "Chapters",
    value: "12",
    description: "Pan-India presence",
    icon: <BookOpen className="w-5 h-5" />,
  },
  {
    id: "events",
    label: "Events",
    value: "8",
    description: "Engaging tech events ",
    icon: <Award className="w-5 h-5" />,
  },
  {
    id: "partners",
    label: "Partners",
    value: "80",
    description: "Student communities",
    icon: <Users className="w-5 h-5" />,
  },
  {
    id: "brands",
    label: "Brands",
    value: "100",
    description: "Industry collaborations",
    icon: <Zap className="w-5 h-5" />,
  },
];

export default function SplitStatsWall() {
  const { resolvedTheme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [stats, setStats] = useState<Stat[]>(STATS_CONFIG);

  const isDark = resolvedTheme === "dark";

  useEffect(() => {
    async function fetchDynamicStats() {
      try {
        const [eventsRes, chaptersRes] = await Promise.all([
          fetch("/api/events"),
          fetch("/api/chapters"),
        ]);

        const eventsData = await eventsRes.json();
        const chaptersData = await chaptersRes.json();

        setStats((prev) =>
          prev.map((s) => {
            if (s.id === "events")
              return { ...s, value: eventsData.length.toString() };
            if (s.id === "chapters")
              return { ...s, value: chaptersData.length.toString() };
            return s;
          }),
        );
      } catch (err) {
        console.error("Failed to fetch dynamic stats:", err);
      }
    }
    fetchDynamicStats();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full py-16 md:py-24 px-6 bg-white dark:bg-black overflow-hidden"
    >
      {/* Background Tech elements */}
      <div className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-40">
        <div className="absolute top-0 right-0 w-full h-px bg-linear-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent" />
        <div className="absolute left-1/2 top-0 w-px h-full bg-linear-to-b from-transparent via-zinc-200 dark:via-zinc-800 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-stretch">
          {/* Left Content: The Mission */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-block px-4 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 shadow-sm"
              >
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
                  Community Analytics
                </span>
              </motion.div>

              <div className="space-y-4">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-[0.95]"
                >
                  THE{" "}
                  <span className="text-[#0DA5F0] dark:text-[#ff2e2e]">
                    IMPACT
                  </span>{" "}
                  ENGINE
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed"
                >
                  Our community is scaling. These numbers reflect the live
                  momentum of HackShastra chapters and builders across the
                  network.
                </motion.p>
              </div>
            </div>

            {/* Visual Decorative Element */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative p-1 rounded-3xl border border-zinc-100 dark:border-zinc-900 bg-linear-to-br from-zinc-50 to-white dark:from-zinc-950 dark:to-black group overflow-hidden shadow-2xl flex-1 min-h-[200px] flex flex-col mt-4"
            >
              <img
                src="https://res.cloudinary.com/dunacoujw/image/upload/v1772402433/reach_xhdfbp.webp"
                alt="Impact Visualization"
                className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700 flex-1"
              />
            </motion.div>
          </div>

          {/* Right: The Bento Grid */}
          <div className="lg:col-span-7 h-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 gap-4 lg:gap-5 h-full">
              {stats.map((stat, i) => {
                const isFirst = i === 0;
                return (
                  <StatCard
                    key={stat.id}
                    stat={stat}
                    index={i}
                    isFeatured={isFirst}
                    className={
                      isFirst
                        ? "sm:col-span-2 lg:col-span-2 lg:row-span-1"
                        : "col-span-1"
                    }
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({
  stat,
  index,
  className = "",
  isFeatured = false,
}: {
  stat: Stat;
  index: number;
  className?: string;
  isFeatured?: boolean;
}) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-80px" });

  // Counting animation logic
  const [count, setCount] = useState(0);
  const target = parseFloat(stat.value.replace(/[^\d.]/g, ""));
  const isK = stat.id === "reach";

  useEffect(() => {
    if (isInView && target > 0) {
      let startTime: number;
      const duration = 2200;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);

        if (progress === 1) {
          setCount(target);
        } else {
          setCount(Math.floor(ease * target));
        }

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, target]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        type: "spring",
        stiffness: 120,
        damping: 18,
        delay: index * 0.1,
      }}
      whileHover={{
        y: -5,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
      className={`group relative rounded-[1.75rem] overflow-hidden h-full flex flex-col ${className}`}
    >
      {/* Animated gradient border */}
      <div
        className="absolute -inset-px rounded-[1.75rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0"
        style={{
          background:
            "conic-gradient(from 180deg, #3b82f6, #8b5cf6, #ec4899, #ef4444, #f97316, #3b82f6)",
        }}
      />

      {/* Card body */}
      <div className="relative z-1 m-px rounded-[calc(1.75rem-1px)] bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl p-5 sm:p-6 border border-zinc-100/80 dark:border-zinc-800/60 shadow-[0_2px_24px_-4px_rgba(0,0,0,0.06)] group-hover:shadow-[0_8px_40px_-8px_rgba(59,130,246,0.12)] dark:group-hover:shadow-[0_8px_40px_-8px_rgba(239,68,68,0.12)] transition-shadow duration-500 h-full flex flex-col justify-between">
        {/* Ambient glow */}
        <div className="absolute -right-16 -top-16 w-32 h-32 rounded-full opacity-0 group-hover:opacity-[0.08] transition-opacity duration-700 blur-3xl bg-blue-500 dark:bg-red-500 pointer-events-none" />
        <div className="absolute -left-8 -bottom-8 w-24 h-24 rounded-full opacity-0 group-hover:opacity-[0.05] transition-opacity duration-700 blur-2xl bg-violet-500 dark:bg-orange-500 pointer-events-none" />

        {isFeatured ? (
          <div className="relative z-10 h-full flex flex-col justify-between gap-4">
            {/* Top: Icon + Badge + Growth Indicator */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <motion.div
                  whileHover={{ rotate: [0, -8, 8, 0] }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="w-10 h-10 rounded-xl flex items-center justify-center bg-linear-to-br from-blue-500/10 to-violet-500/10 dark:from-red-500/10 dark:to-orange-500/10 shadow-sm border border-blue-500/20 dark:border-red-500/20 text-blue-500 dark:text-red-500 shrink-0"
                >
                  {stat.icon}
                </motion.div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 dark:bg-red-500/10 border border-blue-500/20 dark:border-red-500/20">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 dark:bg-red-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500 dark:bg-red-500" />
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-red-400">
                    Live Footprint
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 dark:bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold tracking-wider">
                <TrendingUp className="w-3 h-3" />
                <span>+140% YoY</span>
              </div>
            </div>

            {/* Middle: 2-Column Bento Inside Hero Card */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              {/* Left Details */}
              <div className="md:col-span-7 space-y-2">
                <div className="space-y-0.5">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-4xl sm:text-5xl lg:text-5xl font-black tracking-tighter text-zinc-900 dark:text-zinc-50 tabular-nums">
                      {count}
                      {isK ? "k" : ""}
                    </span>
                    <motion.span
                      initial={{ opacity: 0, scale: 0 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        delay: index * 0.1 + 0.5,
                      }}
                      className="text-2xl font-black text-blue-500 dark:text-red-500"
                    >
                      +
                    </motion.span>
                  </div>
                  <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">
                    {stat.label} & Impressions
                  </p>
                </div>
                <p className="text-xs sm:text-sm font-medium text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  Active digital footprint across Pan-India campus networks, creator nodes & developer channels.
                </p>

                {/* Mini Stat Badges */}
                <div className="flex flex-wrap items-center gap-2 pt-0.5">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400">
                    <Globe className="w-3 h-3 text-blue-500 dark:text-red-500" />
                    85+ Cities
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400">
                    <Users className="w-3 h-3 text-blue-500 dark:text-red-500" />
                    200+ Colleges
                  </span>
                </div>
              </div>

              {/* Right Mini Telemetry Graph Box */}
              <div className="md:col-span-5 p-3 rounded-2xl bg-zinc-50/90 dark:bg-zinc-900/60 border border-zinc-100 dark:border-zinc-800/80 flex flex-col justify-between gap-2 shadow-xs">
                <div className="flex items-center justify-between text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                  <span>Growth Wave</span>
                  <span className="text-blue-600 dark:text-red-400 font-extrabold">2.4M/mo</span>
                </div>

                {/* SVG Sparkline */}
                <div className="h-9 w-full relative overflow-hidden text-blue-500 dark:text-red-500">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 160 40" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id={`sparkGrad-${index}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="currentColor" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="currentColor" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M 0 35 Q 20 30, 45 27 T 90 18 T 130 12 T 160 4 L 160 40 L 0 40 Z"
                      fill={`url(#sparkGrad-${index})`}
                    />
                    <motion.path
                      initial={{ pathLength: 0 }}
                      animate={isInView ? { pathLength: 1 } : {}}
                      transition={{ duration: 1.8, ease: "easeOut", delay: 0.3 }}
                      d="M 0 35 Q 20 30, 45 27 T 90 18 T 130 12 T 160 4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <circle cx="160" cy="4" r="3" className="fill-current animate-pulse" />
                  </svg>
                </div>

                <div className="flex items-center justify-between text-[9px] font-bold text-zinc-400 dark:text-zinc-500">
                  <span>Baseline</span>
                  <span className="text-emerald-600 dark:text-emerald-400">Peak Volume ↗</span>
                </div>
              </div>
            </div>

            {/* Accent progress bar */}
            <div className="h-0.5 w-full rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
              <motion.div
                initial={{ width: "0%" }}
                animate={isInView ? { width: "100%" } : {}}
                transition={{
                  duration: 2.2,
                  delay: index * 0.1 + 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="h-full rounded-full bg-linear-to-r from-blue-500 to-violet-500 dark:from-red-500 dark:to-orange-500"
              />
            </div>
          </div>
        ) : (
          <div className="relative z-10 h-full flex flex-col justify-between gap-3">
            {/* Top: Icon + Line */}
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ rotate: [0, -8, 8, 0] }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="w-10 h-10 rounded-xl flex items-center justify-center bg-linear-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-800 shadow-sm border border-zinc-200/60 dark:border-zinc-700/50 group-hover:border-blue-200/60 dark:group-hover:border-red-800/50 group-hover:shadow-md transition-all duration-500 text-blue-500 dark:text-red-500 shrink-0"
              >
                {stat.icon}
              </motion.div>
              <div className="h-px flex-1 bg-linear-to-r from-zinc-200/80 via-zinc-100/40 to-transparent dark:from-zinc-700/60 dark:via-zinc-800/30 dark:to-transparent group-hover:from-blue-200/60 dark:group-hover:from-red-800/40 transition-colors duration-500" />
            </div>

            {/* Middle: Number + Label + Description */}
            <div className="space-y-1">
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl sm:text-4xl font-black tracking-tighter text-zinc-900 dark:text-zinc-50 tabular-nums">
                  {count}
                  {isK ? "k" : ""}
                </span>
                <motion.span
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    delay: index * 0.1 + 0.5,
                  }}
                  className="text-xl font-black text-blue-500 dark:text-red-500"
                >
                  +
                </motion.span>
              </div>
              <p className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-[0.18em] text-zinc-400 dark:text-zinc-500">
                {stat.label}
              </p>
              <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-2 pt-0.5">
                {stat.description}
              </p>
            </div>

            {/* Accent progress bar */}
            <div className="h-0.5 w-full rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
              <motion.div
                initial={{ width: "0%" }}
                animate={isInView ? { width: "100%" } : {}}
                transition={{
                  duration: 2.2,
                  delay: index * 0.1 + 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="h-full rounded-full bg-linear-to-r from-blue-500 to-violet-500 dark:from-red-500 dark:to-orange-500"
              />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
