"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import { type Event } from "@/lib/types";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

// ─── Upcoming Event Card ────────────────────────────────────────────────────
function UpcomingEventBanner({ event }: { event: Event }) {
    const { resolvedTheme } = useTheme();
    const accent = resolvedTheme === "dark" ? "#FA0001" : "#0DA5F0";
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const ctx = gsap.context(() => {
            gsap.from(".upcoming-item", {
                y: 40,
                opacity: 0,
                duration: 0.8,
                stagger: 0.12,
                ease: "power3.out",
                scrollTrigger: { trigger: el, start: "top 80%" },
            });
        }, el);
        return () => ctx.revert();
    }, []);

    const eventDate = new Date(event.date);
    const daysLeft = Math.ceil((eventDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));

    return (
        <div ref={ref} className="relative w-full max-w-6xl mx-auto px-4 py-20">
            <div className="upcoming-item flex items-center gap-3 mb-10">
                <span className="h-px flex-1 max-w-[60px]" style={{ background: accent }} />
                <span className="text-xs uppercase tracking-[0.3em] font-semibold" style={{ color: accent }}>Upcoming Event</span>
            </div>

            <div className="upcoming-item grid grid-cols-1 lg:grid-cols-5 gap-0 border dark:border-white/10 border-black/10 overflow-hidden">
                <div className="lg:col-span-3 p-8 lg:p-12 flex flex-col justify-between">
                    <div>
                        {daysLeft > 0 && (
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6" style={{ background: `${accent}15`, color: accent, border: `1px solid ${accent}30` }}>
                                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: accent }} />
                                {daysLeft} days to go
                            </div>
                        )}
                        <h2 className="text-4xl lg:text-5xl font-bold tracking-tight dark:text-white text-black mb-4 leading-[1.1]">{event.title}</h2>
                        {event.description && <p className="text-base dark:text-white/60 text-black/60 leading-relaxed mb-8 max-w-lg">{event.description}</p>}
                    </div>

                    <div>
                        <div className="grid grid-cols-3 gap-4 mt-6">
                            {[
                                { label: "Date", value: eventDate.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) },
                                { label: "Venue", value: event.venue },
                                { label: "Format", value: event.format },
                            ].map((item) => (
                                <div key={item.label} className="flex flex-col gap-1">
                                    <span className="text-xs uppercase tracking-widest dark:text-white/40 text-black/40">{item.label}</span>
                                    <span className="text-sm font-semibold dark:text-white text-black">{item.value}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-4 mt-8">
                            <motion.a
                                href={event.registration_link || "#"}
                                target={event.registration_link ? "_blank" : "_self"}
                                rel={event.registration_link ? "noopener noreferrer" : ""}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                                className="px-6 sm:px-8 py-3 sm:py-4 rounded-4xl font-semibold shadow-lg hover:shadow-xl transition-shadow duration-300"
                                style={{
                                    backgroundColor: accent,
                                    color: "#fff",
                                }}
                            >
                                Register Now
                            </motion.a>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2 relative min-h-[260px] lg:min-h-0 overflow-hidden" style={{ borderLeft: `1px solid ${accent}20` }}>
                    <Image src={event.cover_image || "/images/poster.png"} alt={event.title} fill className="object-cover" />
                    <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${accent}20 0%, transparent 60%)` }} />
                    <div className="absolute top-4 right-4 backdrop-blur-md bg-black/40 border border-white/10 rounded px-3 py-1.5 text-white text-xs font-semibold">{event.reach} reach</div>
                </div>
            </div>
        </div>
    );
}

// ─── Timeline Item ─────────────────────────────────────────────────────────
function TimelineItem({ event, index, accent }: { event: Event; index: number; accent: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const isEven = index % 2 === 0;

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const ctx = gsap.context(() => {
            gsap.from(el, {
                x: isEven ? -60 : 60,
                opacity: 0,
                duration: 0.9,
                ease: "power3.out",
                scrollTrigger: { trigger: el, start: "top 82%" },
            });
        }, el);
        return () => ctx.revert();
    }, [isEven]);

    return (
        <div className={`relative flex items-start gap-0 w-full mb-0 ${isEven ? "flex-row" : "flex-row-reverse"}`}>
            <div ref={ref} className={`w-[calc(50%-28px)] group cursor-default ${isEven ? "pr-8 text-right" : "pl-8 text-left"}`}>
                <motion.div whileHover={{ y: -4 }} className="dark:bg-zinc-900/80 bg-white/80 backdrop-blur-sm border dark:border-white/8 border-black/8 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
                    <div className="relative w-full h-48 overflow-hidden">
                        <Image src={event.cover_image || "/images/poster.png"} alt={event.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `linear-gradient(to top, ${accent}30, transparent)` }} />
                    </div>
                    <div className="p-5">
                        <div className={`flex items-center gap-2 mb-3 ${isEven ? "justify-end" : "justify-start"}`}>
                            <span className="text-xs font-bold uppercase tracking-widest px-2.5 py-1" style={{ color: accent, background: `${accent}12`, border: `1px solid ${accent}25` }}>
                                {new Date(event.date).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}
                            </span>
                        </div>
                        <h3 className="text-lg font-bold dark:text-white text-black mb-3 leading-snug">{event.title}</h3>
                        <div className={`flex flex-wrap gap-x-4 gap-y-1.5 text-xs dark:text-white/50 text-black/50 ${isEven ? "justify-end" : "justify-start"}`}>
                            <span className="flex items-center gap-1">{event.venue}</span>
                            <span className="flex items-center gap-1">{event.format}</span>
                        </div>
                    </div>
                </motion.div>
            </div>
            <div className="flex flex-col items-center" style={{ width: 56, flexShrink: 0 }}>
                <div className="w-4 h-4 rounded-full z-10 mt-6 border-2 dark:border-zinc-900 border-white shadow-lg" style={{ background: accent, boxShadow: `0 0 0 2px ${accent}40` }} />
            </div>
            <div className="w-[calc(50%-28px)]" />
        </div>
    );
}

// ─── Timeline Section ───────────────────────────────────────────────────────
function EventTimeline({ events, accent }: { events: Event[]; accent: string }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start 60%", "end 60%"] });
    const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <div ref={containerRef} className="relative w-full max-w-6xl mx-auto px-4 pb-32">
            <div className="text-center mb-20">
                <div className="flex items-center justify-center gap-3 mb-4"><span className="h-px w-12" style={{ background: accent }} /><span className="text-xs uppercase tracking-[0.3em] font-semibold" style={{ color: accent }}>Event Timeline</span><span className="h-px w-12" style={{ background: accent }} /></div>
                <h2 className="text-4xl lg:text-5xl font-bold dark:text-white text-black tracking-tight">Our Journey So Far</h2>
                <p className="mt-3 text-base dark:text-white/50 text-black/50 max-w-md mx-auto">Every event that shaped HackShastra into what it is today.</p>
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 top-[200px] bottom-0 w-px bg-black/8 dark:bg-white/8">
                <motion.div className="w-full origin-top" style={{ height: lineHeight, background: accent, opacity: 0.5 }} />
            </div>
            <div className="relative flex flex-col gap-12">
                {events.map((event, i) => <TimelineItem key={event._id} event={event} index={i} accent={accent} />)}
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
                    setUpcomingEvents(data.filter(e => e.is_upcoming && new Date(e.date) >= now));
                    setPastEvents(data.filter(e => !e.is_upcoming || new Date(e.date) < now));
                }
            } catch (err) { console.error(err); } finally { setLoading(false); }
        }
        fetchEvents();
    }, []);

    useEffect(() => {
        const el = heroRef.current;
        if (!el) return;
        const ctx = gsap.context(() => {
            gsap.from(".hero-line", { y: "110%", opacity: 0, duration: 1, stagger: 0.15, ease: "power4.out", delay: 0.2 });
        }, el);
        return () => ctx.revert();
    }, []);

    return (
        <main className="min-h-screen dark:bg-[oklch(0.145_0_0)] bg-white overflow-x-hidden">
            <Navbar isReady={true} />
            <div ref={heroRef} className="relative w-full max-w-6xl mx-auto px-4 pt-36 pb-16 overflow-hidden">
                <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[120px] opacity-10 pointer-events-none" style={{ background: accent }} />
                <div className="overflow-hidden mb-2"><div className="hero-line text-xs uppercase tracking-[0.35em] font-semibold" style={{ color: accent }}>HackShastra · Events</div></div>
                <div className="overflow-hidden"><h1 className="hero-line text-6xl lg:text-8xl font-black tracking-tighter dark:text-white text-black leading-[0.95]">Where Ideas</h1></div>
                <div className="overflow-hidden"><h1 className="hero-line text-6xl lg:text-8xl font-black tracking-tighter leading-[0.95] pb-2" style={{ color: accent }}>Come Alive</h1></div>
                <div className="overflow-hidden mt-5"><p className="hero-line text-base dark:text-white/50 text-black/50 max-w-md leading-relaxed">Every hackathon, workshop, and community gathering that has defined our story.</p></div>
            </div>

            <AnimatePresence>
                {!loading && upcomingEvents.length > 0 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        {upcomingEvents.map(event => <UpcomingEventBanner key={event._id} event={event} />)}
                    </motion.div>
                )}
            </AnimatePresence>

            {loading && <div className="w-full max-w-6xl mx-auto px-4 py-20"><div className="h-64 dark:bg-white/5 bg-black/5 animate-pulse" /></div>}

            {!loading && pastEvents.length > 0 && <EventTimeline events={pastEvents} accent={accent} />}
        </main>
    );
}
