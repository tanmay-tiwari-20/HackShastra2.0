"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useTheme } from "next-themes";
import { ArrowRight, Calendar, MapPin, Trophy } from "lucide-react";
import { type Event } from "@/lib/types";

gsap.registerPlugin(ScrollTrigger);

const UpcomingEvent: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  const isDark = resolvedTheme === "dark";

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  useEffect(() => {
    async function fetchUpcoming() {
      try {
        const res = await fetch("/api/events?upcoming=true&single=true");
        if (res.ok) {
          const data = await res.json();
          setEvent(data);
        }
      } catch (err) {
        console.error("Failed to fetch upcoming event:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchUpcoming();
  }, []);

  useEffect(() => {
    if (!resolvedTheme || loading) return;

    const ctx = gsap.context(() => {
      gsap.from(".reveal-text", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });

      gsap.from(".reveal-card", {
        scale: 0.9,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [resolvedTheme, loading]);

  if (!loading && !event) return null;

  const formattedDate = event
    ? new Date(event.date).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "31 January – 1 February";

  const details = [
    { icon: <Calendar size={18} />, label: "Timeline", value: formattedDate },
    {
      icon: <MapPin size={18} />,
      label: "Location",
      value: event?.venue || "IPEC, Ghaziabad",
    },
    {
      icon: <Trophy size={18} />,
      label: "Prize Pool",
      value: "Exciting Rewards",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 sm:py-32 overflow-hidden bg-white dark:bg-black"
    >
      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-zinc-50 dark:from-zinc-900/20 to-transparent pointer-events-none" />

      <div ref={containerRef} className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* CONTENT COLUMN */}
          <div className="lg:col-span-7 space-y-10 order-2 lg:order-1">
            <div className="space-y-6">
              <div className="reveal-text inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 shadow-sm">
                <div className="w-2 h-2 rounded-full animate-pulse bg-blue-500 dark:bg-red-600" />
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                  Mission Intel: Upcoming Event
                </span>
              </div>

              <h2 className="reveal-text text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter leading-[0.9]">
                {event?.title || "SnowHackIPEC"}
              </h2>

              <p className="reveal-text text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-xl font-medium leading-relaxed">
                {event?.description ||
                  "Push the boundaries of innovation in our annual 24-hour flagship hackathon at IPEC."}
              </p>
            </div>

            {/* DETAILS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-zinc-100 dark:border-zinc-900">
              {details.map((item, i) => (
                <div key={i} className="reveal-text space-y-2">
                  <div className="flex items-center gap-2 text-zinc-400 dark:text-zinc-500">
                    {item.icon}
                    <span className="text-[10px] font-bold uppercase tracking-widest">
                      {item.label}
                    </span>
                  </div>
                  <p className="text-sm font-black text-zinc-900 dark:text-zinc-100 uppercase tracking-tighter">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA BUTTONS */}
            <div className="reveal-text flex flex-wrap gap-4 pt-6">
              <motion.a
                href={
                  event?.registration_link ||
                  "https://unstop.com/hackathons/snowhackipec-hackshastra-1613746"
                }
                target="_blank"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative px-8 py-4 bg-black dark:bg-white text-white dark:text-black rounded-full font-black text-sm uppercase tracking-widest overflow-hidden flex items-center gap-3 transition-shadow hover:shadow-2xl hover:shadow-blue-500/20 dark:hover:shadow-red-600/30"
              >
                Register Now
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </motion.a>

              <motion.a
                href="/events"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 border border-zinc-200 dark:border-zinc-800 rounded-full font-black text-sm uppercase tracking-widest hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
              >
                Events Archive
              </motion.a>
            </div>
          </div>

          {/* IMAGE COLUMN */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <div className="reveal-card relative aspect-3/4 group">
              {/* Decorative Frame */}
              <div className="absolute -inset-4 border border-zinc-100 dark:border-zinc-900 rounded-[2.5rem] pointer-events-none" />
              <div className="absolute -inset-2 border border-zinc-200 dark:border-zinc-800 rounded-[2.2rem] pointer-events-none" />

              {/* Image Wrapper */}
              <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl">
                <motion.div
                  style={{ y: imageY }}
                  className="absolute inset-0 w-full h-[120%]"
                >
                  <Image
                    src={event?.cover_image || "/images/poster.png"}
                    alt={event?.title || "Upcoming Event"}
                    fill
                    className="object-cover scale-110 group-hover:scale-105 transition-transform duration-700"
                    priority
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-60" />
                </motion.div>

                {/* Image Label */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center justify-between">
                    <div className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                      <span className="text-[9px] font-black text-white uppercase tracking-[0.2em]">
                        Live Status
                      </span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvent;
