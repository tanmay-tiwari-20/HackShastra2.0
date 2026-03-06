"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useTheme } from "next-themes";
import { Users, BookOpen, Share2, Award, Zap } from "lucide-react";

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
      className="relative w-full py-32 md:py-48 px-6 bg-white dark:bg-black overflow-hidden"
    >
      {/* Background Tech elements */}
      <div className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-40">
        <div className="absolute top-0 right-0 w-full h-px bg-linear-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent" />
        <div className="absolute left-1/2 top-0 w-px h-full bg-linear-to-b from-transparent via-zinc-200 dark:via-zinc-800 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          {/* Left Content: The Mission */}
          <div className="lg:col-span-12 xl:col-span-5 space-y-8">
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

            <div className="space-y-6">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter leading-[0.9]"
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
                className="text-lg text-zinc-600 dark:text-zinc-400 max-w-lg font-medium"
              >
                Our community is scaling. These numbers reflect the live
                momentum of HackShastra chapters and builders across the
                network.
              </motion.p>
            </div>

            {/* Visual Decorative Element */}
            <motion.div
              initial={{ opacity: 0, rotate: -5 }}
              whileInView={{ opacity: 1, rotate: 0 }}
              viewport={{ once: true }}
              className="relative p-1 rounded-3xl border border-zinc-100 dark:border-zinc-900 bg-linear-to-br from-zinc-50 to-white dark:from-zinc-950 dark:to-black group overflow-hidden shadow-2xl"
            >
              <img
                src="https://res.cloudinary.com/dunacoujw/image/upload/v1772402433/reach_xhdfbp.webp"
                alt="Impact Visualization"
                className="w-full h-80 object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700"
              />
            </motion.div>
          </div>

          {/* Right: The Grid */}
          <div className="lg:col-span-12 xl:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
              {stats.map((stat, i) => (
                <StatCard key={stat.id} stat={stat} index={i} />
              ))}

              {/* Decorative Tech Card */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="hidden sm:flex relative p-8 rounded-[1.75rem] border border-dashed border-zinc-200/60 dark:border-zinc-800/60 items-center justify-center text-center"
              >
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 dark:bg-red-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500 dark:bg-red-500" />
                  </span>
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-600">
                    Data Syncing with Core
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({ stat, index }: { stat: Stat; index: number }) {
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
        // Smoother cubic ease-out
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
        delay: index * 0.12,
      }}
      whileHover={{
        y: -6,
        scale: 1.02,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
      className="group relative rounded-[1.75rem] overflow-hidden"
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
      <div className="relative z-[1] m-px rounded-[calc(1.75rem-1px)] bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl p-7 sm:p-8 border border-zinc-100/80 dark:border-zinc-800/60 shadow-[0_2px_24px_-4px_rgba(0,0,0,0.06)] group-hover:shadow-[0_8px_40px_-8px_rgba(59,130,246,0.12)] dark:group-hover:shadow-[0_8px_40px_-8px_rgba(239,68,68,0.12)] transition-shadow duration-500">
        {/* Ambient glow */}
        <div className="absolute -right-16 -top-16 w-32 h-32 rounded-full opacity-0 group-hover:opacity-[0.08] transition-opacity duration-700 blur-3xl bg-blue-500 dark:bg-red-500 pointer-events-none" />
        <div className="absolute -left-8 -bottom-8 w-24 h-24 rounded-full opacity-0 group-hover:opacity-[0.05] transition-opacity duration-700 blur-2xl bg-violet-500 dark:bg-orange-500 pointer-events-none" />

        <div className="relative z-10 space-y-5">
          {/* Icon + Line */}
          <div className="flex items-center gap-4">
            <motion.div
              whileHover={{ rotate: [0, -8, 8, 0] }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="w-11 h-11 rounded-xl flex items-center justify-center bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-800 shadow-sm border border-zinc-200/60 dark:border-zinc-700/50 group-hover:border-blue-200/60 dark:group-hover:border-red-800/50 group-hover:shadow-md transition-all duration-500 text-blue-500 dark:text-red-500"
            >
              {stat.icon}
            </motion.div>
            <div className="h-px flex-1 bg-gradient-to-r from-zinc-200/80 via-zinc-100/40 to-transparent dark:from-zinc-700/60 dark:via-zinc-800/30 dark:to-transparent group-hover:from-blue-200/60 dark:group-hover:from-red-800/40 transition-colors duration-500" />
          </div>

          {/* Number */}
          <div className="space-y-1.5">
            <div className="flex items-baseline gap-1.5">
              <span className="text-4xl md:text-5xl font-black tracking-tighter text-zinc-900 dark:text-zinc-50 tabular-nums">
                {count}
                {isK ? "k" : ""}
              </span>
              <motion.span
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  delay: index * 0.12 + 0.6,
                }}
                className="text-xl font-black text-blue-500 dark:text-red-500"
              >
                +
              </motion.span>
            </div>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-zinc-400 dark:text-zinc-500">
              {stat.label}
            </p>
          </div>

          {/* Description */}
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 leading-relaxed">
            {stat.description}
          </p>

          {/* Accent progress bar */}
          <div className="h-0.5 w-full rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
            <motion.div
              initial={{ width: "0%" }}
              animate={isInView ? { width: "100%" } : {}}
              transition={{
                duration: 2.2,
                delay: index * 0.12 + 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-500 dark:from-red-500 dark:to-orange-500"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
