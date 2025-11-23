"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Code2,
  Rocket,
  Users,
  Trophy,
  Lightbulb,
  Calendar,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface FeatureCard {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: FeatureCard[] = [
  {
    icon: <Code2 className="w-8 h-8" />,
    title: "Workshops & Masterclasses",
    description:
      "Learn cutting-edge technologies from industry experts and experienced developers in interactive sessions.",
  },
  {
    icon: <Rocket className="w-8 h-8" />,
    title: "Hands-on Training & Projects",
    description:
      "Build real-world projects and gain practical experience that goes beyond theoretical knowledge.",
  },
  {
    icon: <Trophy className="w-8 h-8" />,
    title: "Hackathon Exposure",
    description:
      "Compete in hackathons, solve challenges, and get mentorship from seasoned developers.",
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Peer-to-Peer Learning",
    description:
      "Collaborate with fellow students, share knowledge, and grow together as a community.",
  },
  {
    icon: <Lightbulb className="w-8 h-8" />,
    title: "Leadership Opportunities",
    description:
      "Develop leadership skills by organizing events, leading teams, and managing tech initiatives.",
  },
  {
    icon: <Calendar className="w-8 h-8" />,
    title: "Community Events & Meetups",
    description:
      "Connect with like-minded developers at regular meetups, tech talks, and networking sessions.",
  },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.from(titleRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 85%",
        },
      });

      // Subtitle animation
      gsap.from(subtitleRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: subtitleRef.current,
          start: "top 85%",
        },
      });

      // Cards stagger animation
      gsap.from(".feature-card", {
        y: 60,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 md:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden transition-colors duration-300"
    >
      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2
            ref={titleRef}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight"
          >
            Why HackShastra?
          </h2>
          <p
            ref={subtitleRef}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            A student-powered tech community built to inspire, learn, and grow
            together.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="feature-card group relative"
              whileHover={{ scale: 1.03, y: -8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className="relative h-full p-8 rounded-2xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-zinc-900/50 backdrop-blur-sm overflow-hidden transition-all duration-300 group-hover:border-blue-400 dark:group-hover:border-red-500/40 group-hover:shadow-2xl group-hover:shadow-blue-500/20 dark:group-hover:shadow-red-500/10">
                {/* Hover glow effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-blue-400 dark:via-red-500/50 to-transparent" />
                  <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-blue-400 dark:via-red-500/50 to-transparent" />
                </div>

                {/* Icon */}
                <div className="mb-6 text-blue-600 dark:text-red-600 group-hover:text-blue-500 dark:group-hover:text-red-500">
                  {feature.icon}
                </div>

                {/* Content */}
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm md:text-base">
                  {feature.description}
                </p>

                {/* Corner accent */}
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-linear-to-tl from-blue-400/10 dark:from-red-500/5 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
