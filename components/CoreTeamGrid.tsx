"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";
import { type TeamMember } from "@/lib/types";
import { Github, Linkedin, Twitter, Instagram, Globe } from "lucide-react";

const CoreTeamGrid = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTeam = async () => {
    try {
      const res = await fetch("/api/team");
      if (res.ok) {
        const data = await res.json();
        setTeam(data);
      }
    } catch (err) {
      console.error("Failed to fetch team:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  useEffect(() => {
    if (!gridRef.current || loading || team.length === 0) return;

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
  }, [loading, team]);

  const socialIcons = {
    github: Github,
    linkedin: Linkedin,
    twitter: Twitter,
    instagram: Instagram,
    portfolio: Globe,
  };

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
          {loading
            ? [1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-72 rounded-3xl bg-black/5 dark:bg-white/5 animate-pulse"
                />
              ))
            : team.map((member, i) => (
                <motion.div
                  key={member._id || i}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="team-card relative group"
                >
                  <div className="relative p-6 pt-8 rounded-3xl border border-black/5 dark:border-white/10 bg-white/50 dark:bg-zinc-900/40 backdrop-blur-xl overflow-hidden transition-all duration-500 group-hover:border-[#0DA5F0]/40 dark:group-hover:border-[#FA0001]/40 group-hover:shadow-2xl group-hover:shadow-[#0DA5F0]/10 dark:group-hover:shadow-[#FA0001]/10 flex flex-col items-center">
                    {/* Image Wrap */}
                    <div className="relative w-28 h-28 mb-5 rounded-full overflow-hidden border-4 border-white dark:border-zinc-800 shadow-xl transition-transform duration-500 group-hover:scale-105 z-10">
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
                    <div className="text-center z-10 mb-5">
                      <h3 className="text-xl font-black text-black dark:text-white tracking-tight">
                        {member.name}
                      </h3>
                      <p className="text-xs font-bold uppercase tracking-widest text-[#0DA5F0] dark:text-[#FA0001] mt-1.5 opacity-80">
                        {member.role}
                      </p>
                    </div>

                    {/* Socials */}
                    {member.socials &&
                      Object.values(member.socials).some(Boolean) && (
                        <div className="flex items-center gap-3 z-10 pt-4 border-t border-black/5 dark:border-white/10 w-full justify-center">
                          {Object.entries(member.socials).map(
                            ([platform, url]) => {
                              if (!url) return null;
                              const Icon =
                                socialIcons[
                                  platform as keyof typeof socialIcons
                                ];
                              if (!Icon) return null;

                              return (
                                <a
                                  key={platform}
                                  href={
                                    url.startsWith("http")
                                      ? url
                                      : `https://${url}`
                                  }
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-2 rounded-full bg-black/5 dark:bg-white/5 text-black/40 dark:text-white/40 hover:text-[#0DA5F0] dark:hover:text-[#FA0001] hover:bg-[#0DA5F0]/10 dark:hover:bg-[#FA0001]/10 transition-all duration-300 transform hover:scale-110"
                                >
                                  <Icon size={16} strokeWidth={2.5} />
                                  <span className="sr-only">{platform}</span>
                                </a>
                              );
                            },
                          )}
                        </div>
                      )}

                    {/* Background Accents */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#0DA5F0]/10 dark:from-[#FA0001]/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#0DA5F0]/5 dark:from-[#FA0001]/5 to-transparent rounded-tr-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100" />
                  </div>
                </motion.div>
              ))}
        </div>
      </div>
    </section>
  );
};

export default CoreTeamGrid;
