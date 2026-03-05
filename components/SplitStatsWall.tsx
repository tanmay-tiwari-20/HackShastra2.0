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
              <div className="hidden sm:flex relative p-8 rounded-3xl border border-dashed border-zinc-200 dark:border-zinc-800 items-center justify-center text-center opacity-40">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-600 italic">
                  &bull; Data Syncing with Core &bull;
                </p>
                <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black" />
                <div className="absolute -bottom-1 -left-1 w-2 h-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({ stat, index }: { stat: Stat; index: number }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  // Counting animation logic
  const [count, setCount] = useState(0);
  const target = parseFloat(stat.value.replace(/[^\d.]/g, ""));
  const isK = stat.id === "reach"; // Reach is currently the only 'k' unit

  useEffect(() => {
    if (isInView && target > 0) {
      let startTime: number;
      const duration = 2000;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const easeOutExpo = 1 - Math.pow(2, -10 * progress);

        // Ensure we hit the exact target at the end
        if (progress === 1) {
          setCount(target);
        } else {
          setCount(Math.floor(easeOutExpo * target));
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
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group relative p-8 rounded-3xl border border-zinc-100 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-900/30 backdrop-blur-sm shadow-sm hover:shadow-2xl hover:border-zinc-200 dark:hover:border-zinc-800 transition-all duration-300"
    >
      {/* Glow Effect */}
      <div className="absolute -right-12 -top-12 w-24 h-24 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-2xl bg-blue-500 dark:bg-red-600" />

      <div className="relative z-10 space-y-4">
        <div className="flex items-center justify-between">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white dark:bg-zinc-950 shadow-sm border border-zinc-100 dark:border-zinc-800 group-hover:scale-110 transition-transform duration-500 text-blue-500 dark:text-red-500">
            {stat.icon}
          </div>
          <div className="h-px flex-1 mx-4 bg-zinc-100 dark:bg-zinc-800 group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700 transition-colors" />
        </div>

        <div className="space-y-1">
          <div className="flex items-baseline gap-1">
            <span className="text-4xl md:text-5xl font-black tracking-tighter text-zinc-900 dark:text-zinc-100">
              {count}
              {isK ? "k" : ""}
            </span>
            <span className="text-xl font-black text-blue-500 dark:text-red-500">
              +
            </span>
          </div>
          <p className="text-xs font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
            {stat.label}
          </p>
        </div>

        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 leading-tight">
          {stat.description}
        </p>
      </div>
    </motion.div>
  );
}
