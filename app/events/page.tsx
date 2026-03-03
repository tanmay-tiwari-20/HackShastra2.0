"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useTheme } from "next-themes";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import { type Event } from "@/lib/types";
import Image from "next/image";
import { Calendar, MapPin, Zap, Users, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// ─── Upcoming Event Card (Spotlight) ────────────────────────────────────────
function UpcomingEventBanner({ event }: { event: Event }) {
  const { resolvedTheme } = useTheme();
  const accent = resolvedTheme === "dark" ? "#FA0001" : "#0DA5F0";
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.from(".upcoming-chars span", {
        y: 50,
        opacity: 0,
        rotateX: -90,
        duration: 0.8,
        stagger: 0.03,
        ease: "back.out(1.7)",
        scrollTrigger: { trigger: el, start: "top 80%" },
      });
      gsap.from(".upcoming-content", {
        x: -30,
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 80%" },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  const eventDate = new Date(event.date);
  const daysLeft = Math.ceil(
    (eventDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24),
  );

  return (
    <div ref={ref} className="relative w-full max-w-7xl mx-auto px-4 py-32">
      <div
        className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-[140px] opacity-10 pointer-events-none"
        style={{ background: accent }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 order-2 lg:order-1 space-y-8 upcoming-content">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border dark:border-white/10 border-black/10 bg-white/5 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ background: accent }}
              ></span>
              <span
                className="relative inline-flex rounded-full h-2 w-2"
                style={{ background: accent }}
              ></span>
            </span>
            <span
              className="text-[10px] uppercase tracking-[0.3em] font-black"
              style={{ color: accent }}
            >
              Spotlight · Upcoming
            </span>
          </div>

          <h2 className="text-5xl lg:text-7xl font-black tracking-tighter dark:text-white text-black leading-[0.9] flex flex-wrap upcoming-chars">
            {event.title.split("").map((char, i) => (
              <span key={i} className="inline-block">
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h2>

          <p className="text-lg dark:text-white/50 text-black/50 leading-relaxed max-w-xl font-medium">
            {event.description ||
              "Get ready for an extraordinary experience at our flagship event. Join the community and innovate with the best."}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            {[
              {
                label: "Date",
                value: eventDate.toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                }),
                icon: Calendar,
              },
              {
                label: "Venue",
                value: event.venue.split(",")[0],
                icon: MapPin,
              },
              { label: "Format", value: event.format, icon: Zap },
            ].map((item) => (
              <div
                key={item.label}
                className="group relative flex flex-col gap-2 p-5 rounded-2xl dark:bg-white/[0.03] bg-black/[0.03] border dark:border-white/10 border-black/10 transition-all duration-500 hover:scale-[1.02]"
                style={{ borderColor: accent + "30" }}
              >
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at center, ${accent}15, transparent)`,
                  }}
                />
                <div className="flex items-center gap-2">
                  <div
                    className="p-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 shadow-lg group-hover:shadow-[0_0_15px_-5px_rgba(0,0,0,0.1)] transition-all duration-500"
                    style={{ boxShadow: `0 0 20px ${accent}20` }}
                  >
                    <item.icon
                      className="w-3.5 h-3.5"
                      style={{ color: accent }}
                    />
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.2em] font-black opacity-40">
                    {item.label}
                  </span>
                </div>
                <span className="text-sm font-black dark:text-white text-black truncate z-10">
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 pt-6">
            <motion.a
              href={event.registration_link || "#"}
              target={event.registration_link ? "_blank" : "_self"}
              rel={event.registration_link ? "noopener noreferrer" : ""}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 rounded-full font-black text-xs uppercase tracking-widest shadow-2xl transition-all"
              style={{ backgroundColor: accent, color: "#fff" }}
            >
              Claim Your Slot
            </motion.a>
          </div>
        </div>

        <div className="lg:col-span-5 order-1 lg:order-2">
          <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden group shadow-2xl border dark:border-white/10 border-black/10">
            <Image
              src={event.cover_image || "/images/poster.png"}
              alt={event.title}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
            <div className="absolute bottom-10 left-10">
              <div className="text-white font-black text-4xl tracking-tighter">
                {eventDate.getDate()}
                <span
                  className="text-xl uppercase ml-1 opacity-50"
                  style={{ color: accent }}
                >
                  {eventDate.toLocaleString("default", { month: "short" })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Timeline Item ─────────────────────────────────────────────────────────
function TimelineItem({
  event,
  index,
  accent,
}: {
  event: Event;
  index: number;
  accent: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);
  const isEven = index % 2 === 0;

  useEffect(() => {
    const el = ref.current;
    const dEl = dateRef.current;
    if (!el || !dEl) return;
    const ctx = gsap.context(() => {
      gsap.from(el, {
        x: isEven ? -40 : 40,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 90%" },
      });
      gsap.from(dEl, {
        x: isEven ? 40 : -40,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 90%" },
      });
    }, el);
    return () => ctx.revert();
  }, [isEven]);

  const eventDate = new Date(event.date);

  return (
    <div
      className={`relative flex items-center justify-center w-full min-h-[450px] py-16 ${isEven ? "md:flex-row" : "md:flex-row-reverse"} flex-col`}
    >
      {/* CARD */}
      <div
        ref={ref}
        className="w-full md:w-1/2 flex items-center justify-center px-4 md:px-16"
      >
        <motion.div
          whileHover={{ y: -8 }}
          className="relative w-full max-w-lg rounded-[2rem] overflow-hidden group border dark:border-white/10 border-black/10 dark:bg-zinc-900/50 bg-white/50 backdrop-blur-xl shadow-2xl transition-all duration-500"
        >
          <div className="relative w-full aspect-[16/9] overflow-hidden">
            <Image
              src={event.cover_image || "/images/poster.png"}
              alt={event.title}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

          <div className="p-8 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-black dark:text-white text-black tracking-tighter leading-none">
                {event.title}
              </h3>
              <div className="md:hidden text-[10px] font-black uppercase tracking-widest opacity-40">
                {eventDate.toLocaleDateString("en-IN", {
                  month: "short",
                  year: "numeric",
                })}
              </div>
            </div>

            {event.description && (
              <p className="text-sm dark:text-white/40 text-black/40 line-clamp-2 leading-relaxed font-medium">
                {event.description}
              </p>
            )}

            <div className="flex flex-wrap gap-6 pt-6 border-t dark:border-white/5 border-black/5">
              <div className="flex items-center gap-3 transition-all duration-300 hover:translate-x-1">
                <div
                  className="p-2.5 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 shadow-lg"
                  style={{ boxShadow: `0 0 20px ${accent}15` }}
                >
                  <MapPin className="w-3.5 h-3.5" style={{ color: accent }} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] dark:text-white/40 text-black/40 font-black uppercase tracking-widest">
                    Venue
                  </span>
                  <span className="text-xs dark:text-white/80 text-black/80 font-black tracking-tight">
                    {event.venue.split(",")[0]}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3 transition-all duration-300 hover:translate-x-1">
                <div
                  className="p-2.5 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 shadow-lg"
                  style={{ boxShadow: `0 0 20px ${accent}15` }}
                >
                  <Zap className="w-3.5 h-3.5" style={{ color: accent }} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] dark:text-white/40 text-black/40 font-black uppercase tracking-widest">
                    Format
                  </span>
                  <span className="text-xs dark:text-white/80 text-black/80 font-black tracking-tight">
                    {event.format}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* NODE */}
      <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center justify-center z-20 pointer-events-none hidden md:flex">
        <div
          className="w-5 h-5 rounded-full border-[5px] dark:border-[oklch(0.145_0_0)] border-white shadow-2xl transition-all duration-500 z-10"
          style={{ backgroundColor: accent, boxShadow: `0 0 30px ${accent}80` }}
        />
        <div
          className="absolute w-12 h-12 rounded-full opacity-20 animate-pulse"
          style={{ background: accent }}
        />
      </div>

      {/* DATE SIDE */}
      <div
        ref={dateRef}
        className={`hidden md:flex md:w-1/2 items-center ${isEven ? "justify-start pl-16" : "justify-end pr-16"}`}
      >
        <div className={`space-y-1 ${isEven ? "text-left" : "text-right"}`}>
          <div className="text-5xl font-black dark:text-white text-black tracking-tighter leading-none transition-colors duration-500 group-hover:text-current">
            {eventDate.getDate()}
          </div>
          <div
            className="text-3xl font-extrabold uppercase tracking-[0.2em]"
            style={{ color: accent }}
          >
            {eventDate.toLocaleString("default", { month: "long" })}
          </div>
          <div className="text-xl font-black uppercase tracking-[0.2em] dark:text-white text-black">
            {eventDate.getFullYear()}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Timeline Section ───────────────────────────────────────────────────────
function EventTimeline({
  events,
  accent,
}: {
  events: Event[];
  accent: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 20%", "end end"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-7xl mx-auto px-4 pb-40 lg:mt-20"
    >
      <div className="text-center mb-32 space-y-4">
        <div className="inline-flex items-center justify-center gap-4">
          <span
            className="h-px w-8 opacity-20"
            style={{ background: accent }}
          />
          <span className="text-xs uppercase tracking-[0.4em] font-black opacity-40">
            Archive · History
          </span>
          <span
            className="h-px w-8 opacity-20"
            style={{ background: accent }}
          />
        </div>
        <h2 className="text-5xl lg:text-7xl font-black dark:text-white text-black tracking-tighter uppercase">
          The <span style={{ color: accent }}>Journey</span>
        </h2>
        <p className="text-base dark:text-white/40 text-black/40 max-w-md mx-auto font-medium">
          Tracking the evolution of our technical frontier through every
          milestone.
        </p>
      </div>

      {/* CENTRAL LINE */}
      <div className="absolute left-1/2 -translate-x-1/2 top-[300px] bottom-0 w-[2px] bg-black/[0.05] dark:bg-white/[0.05] hidden md:block">
        <motion.div
          className="w-full origin-top relative rounded-full"
          style={{
            height: lineHeight,
            background: accent,
          }}
        >
          {/* SHARP PROGRESS NODE */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-4 dark:border-[oklch(0.145_0_0)] border-white shadow-xl"
            style={{ backgroundColor: accent }}
          />
        </motion.div>
      </div>

      <div className="relative flex flex-col">
        {events.map((event, i) => (
          <TimelineItem
            key={event._id}
            event={event}
            index={i}
            accent={accent}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function EventsPage() {
  const { resolvedTheme } = useTheme();
  const accent = resolvedTheme === "dark" ? "#FA0001" : "#0DA5F0";
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [pastEvents, setPastEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch("/api/events");
        if (res.ok) {
          const data: Event[] = await res.json();
          const now = new Date();
          setUpcomingEvents(
            data.filter((e) => e.is_upcoming && new Date(e.date) >= now),
          );
          setPastEvents(
            data.filter((e) => !e.is_upcoming || new Date(e.date) < now),
          );
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.from(".hero-line", {
        y: "110%",
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power4.out",
        delay: 0.2,
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <main className="min-h-screen dark:bg-[oklch(0.145_0_0)] bg-white transition-colors duration-500 overflow-x-hidden">
      <Navbar isReady={true} />

      {/* HERO SECTION */}
      <div
        ref={heroRef}
        className="relative w-full max-w-7xl mx-auto px-4 pt-48 pb-20"
      >
        <div
          className="absolute top-40 right-10 w-[500px] h-[500px] rounded-full blur-[160px] opacity-[0.03] pointer-events-none"
          style={{ background: accent }}
        />

        <div className="space-y-6">
          <div className="overflow-hidden">
            <div className="hero-line inline-flex items-center gap-4 text-[10px] uppercase tracking-[0.5em] font-black opacity-50 dark:text-white text-black">
              <span className="w-8 h-[1px] bg-[#0DA5F0]/50 dark:bg-[#F90101]/50" />{" "}
              Technical Records
            </div>
          </div>

          <h1 className="hero-line text-[clamp(3.5rem,10vw,9.5rem)] font-black tracking-tighter dark:text-white text-black leading-[0.85] uppercase">
            The{" "}
            <span className="text-[#0DA5F0] dark:text-[#FA0001]">
              Collective
            </span>{" "}
            <br /> History
          </h1>

          <div className="overflow-hidden max-w-xl">
            <p className="hero-line text-lg md:text-xl dark:text-white/40 text-black/40 font-medium leading-relaxed mt-4">
              Chronicling every technological leap, midnight code, and
              breakthrough that defines the HackShastra lineage.
            </p>
          </div>
        </div>

        {/* SCROLL INDICATOR */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-0 right-4 hidden md:flex flex-col items-center gap-4"
        >
          <div className="text-[10px] uppercase font-black tracking-[0.3em] rotate-90 origin-right translate-x-1 whitespace-nowrap">
            Dive Into Records
          </div>
          <div className="w-px h-24 bg-current" />
        </motion.div>
      </div>

      <AnimatePresence>
        {!loading && upcomingEvents.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {upcomingEvents.map((event) => (
              <UpcomingEventBanner key={event._id} event={event} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {loading && (
        <div className="w-full max-w-6xl mx-auto px-4 py-20">
          <div className="h-64 dark:bg-white/5 bg-black/5 animate-pulse" />
        </div>
      )}

      {!loading && pastEvents.length > 0 && (
        <EventTimeline events={pastEvents} accent={accent} />
      )}
    </main>
  );
}
