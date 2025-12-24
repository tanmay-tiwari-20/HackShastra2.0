import React, { useEffect, useRef } from "react";
import { Brain, Shield, Wifi, Lightbulb, Eye, Lock } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Theme: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    /* Heading animation */
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      }
    );

    /* Cards stagger animation */
    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, y: 28 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      }
    );
  }, []);

  const themes = [
    {
      icon: Brain,
      title: "AI & ML",
      description:
        "Intelligent systems for automation, prediction, data analysis and real-world AI applications.",
    },
    {
      icon: Lock,
      title: "Cybersecurity",
      description:
        "Secure architectures, encryption, authentication, and threat-resilient systems.",
    },
    {
      icon: Shield,
      title: "Web3",
      description:
        "Decentralized applications, smart contracts, and blockchain-powered solutions.",
    },
    {
      icon: Wifi,
      title: "Internet of Things",
      description:
        "Smart devices, sensors, automation and real-time connected systems.",
    },
    {
      icon: Eye,
      title: "AR & VR",
      description:
        "Immersive augmented and virtual reality experiences with interactive environments.",
    },
    {
      icon: Lightbulb,
      title: "Open Innovation",
      description:
        "A flexible track for original ideas that do not fit within a single domain.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 px-4 md:px-8 lg:px-20 bg-white dark:bg-zinc-950"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headingRef} className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-zinc-900 dark:text-white">
            Choose Your{" "}
            <span className="text-[#0DA5F0] dark:text-[#FA0001]">Theme</span>
          </h2>

          <p className="mt-4 max-w-2xl mx-auto text-base md:text-lg text-zinc-600 dark:text-zinc-400">
            Select a domain that matches your skills and build impactful
            solutions during the hackathon.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {themes.map((theme, index) => (
            <div
              key={theme.title}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className="rounded-xl border border-zinc-200 dark:border-zinc-800
                         border-l-4 border-l-[#0DA5F0] dark:border-l-[#FA0001]
                         p-6 md:p-7 bg-white dark:bg-zinc-900"
            >
              <div className="mb-5 flex items-center gap-4">
                <div className="w-11 h-11 flex items-center justify-center rounded-md border border-zinc-200 dark:border-zinc-800">
                  <theme.icon className="w-5 h-5 text-[#0DA5F0] dark:text-[#FA0001]" />
                </div>

                <h3 className="text-lg md:text-xl font-medium text-zinc-900 dark:text-white">
                  {theme.title}
                </h3>
              </div>

              <p className="text-sm md:text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                {theme.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Theme;
