import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";
import { Linkedin, Instagram, Twitter, Mail, Check } from "lucide-react";

interface ArchitectProps {
  name: string;
  story: string;
  image: string;
  index: number;
  socials: {
    linkedin?: string;
    instagram?: string;
    twitter?: string;
    email?: string;
  };
}

const FounderCinematicCard = ({
  name,
  story,
  image,
  index,
  socials,
}: ArchitectProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    if (socials.email) {
      try {
        await navigator.clipboard.writeText(socials.email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy email: ", err);
      }
    }
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Reveal text and image on scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play reverse play reverse",
        },
      });

      tl.fromTo(
        imageRef.current,
        {
          x: index % 2 === 0 ? -40 : 40,
          opacity: 0,
          scale: 0.95,
          rotate: index % 2 === 0 ? -2 : 2,
        },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          rotate: 0,
          duration: 1.2,
          ease: "power4.out",
        },
      ).fromTo(
        textRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
        "-=0.9",
      );
    }, containerRef);

    return () => ctx.revert();
  }, [index]);

  return (
    <section
      ref={containerRef}
      className={`relative min-h-[80vh] md:min-h-screen w-full flex flex-col ${
        index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
      } items-center justify-center gap-10 md:gap-24 px-6 py-20 md:py-32 overflow-hidden bg-white dark:bg-[#0a0a0a] transition-colors duration-700`}
    >
      {/* Background Index - Hidden on small mobile for clarity */}
      <div
        className={`absolute top-10 md:top-20 ${index % 2 === 0 ? "left-10 md:left-20" : "right-10 md:right-20"} opacity-[0.05] dark:opacity-[0.08] hidden sm:block pointer-events-none z-0`}
        style={{ willChange: "transform", transform: "translate3d(0,0,0)" }}
      >
        <span className="text-[12rem] md:text-[22rem] font-black tracking-tighter leading-none select-none">
          0{index + 1}
        </span>
      </div>

      {/* Portrait Image Container */}
      <div
        ref={imageRef}
        className="relative z-10 w-full lg:w-[40%] flex justify-center"
      >
        <div className="relative group w-full max-w-[320px] md:max-w-md aspect-[3/4] rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden">
          <Image
            src={
              image ||
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop"
            }
            alt={name}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/10 opacity-0 transition-opacity duration-500" />
        </div>
      </div>

      {/* Narrative Content */}
      <div
        ref={textRef}
        className="relative z-10 w-full lg:w-[45%] flex flex-col items-center lg:items-start text-center lg:text-left"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px w-8 bg-[#0DA5F0] dark:bg-[#FA0001]" />
          <span className="text-[10px] md:text-xs font-black tracking-[0.4em] uppercase text-[#0DA5F0] dark:text-[#FA0001]">
            ARCHITECT
          </span>
        </div>

        <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-black dark:text-white leading-[0.9] mb-8">
          {name.split(" ")[0]}
          <br />
          <span className="opacity-30">
            {name.split(" ").slice(1).join(" ")}
          </span>
        </h2>

        <p className="text-lg md:text-xl lg:text-2xl opacity-60 dark:opacity-40 leading-tight tracking-tight mb-10 max-w-lg font-medium">
          {story}
        </p>

        {/* Social Dock */}
        <div className="flex items-center gap-3 md:gap-4">
          {socials.linkedin && (
            <motion.a
              href={socials.linkedin}
              target="_blank"
              whileHover={{ y: -5, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-black/5 dark:bg-white/5 flex items-center justify-center hover:bg-[#0DA5F0] dark:hover:bg-[#FA0001] hover:text-white transition-colors duration-300 shadow-sm"
            >
              <Linkedin size={18} />
            </motion.a>
          )}
          {socials.instagram && (
            <motion.a
              href={socials.instagram}
              target="_blank"
              whileHover={{ y: -5, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-black/5 dark:bg-white/5 flex items-center justify-center hover:bg-[#0DA5F0] dark:hover:bg-[#FA0001] hover:text-white transition-colors duration-300 shadow-sm"
            >
              <Instagram size={18} />
            </motion.a>
          )}
          {socials.twitter && (
            <motion.a
              href={socials.twitter}
              target="_blank"
              whileHover={{ y: -5, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-black/5 dark:bg-white/5 flex items-center justify-center hover:bg-[#0DA5F0] dark:hover:bg-[#FA0001] hover:text-white transition-colors duration-300 shadow-sm"
            >
              <Twitter size={18} />
            </motion.a>
          )}
          {socials.email && (
            <div className="relative">
              <motion.button
                onClick={handleCopyEmail}
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-black/5 dark:bg-white/5 flex items-center justify-center hover:bg-[#0DA5F0] dark:hover:bg-[#FA0001] hover:text-white transition-colors duration-300 shadow-sm"
              >
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.div
                      key="check"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      <Check size={18} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="mail"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      <Mail size={18} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
              <AnimatePresence>
                {copied && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] font-bold bg-black dark:bg-white text-white dark:text-black px-2 py-1 rounded"
                  >
                    Copied!
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FounderCinematicCard;
