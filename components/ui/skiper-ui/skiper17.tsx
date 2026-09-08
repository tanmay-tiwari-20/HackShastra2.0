"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, Images } from "lucide-react";

import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface CardData {
  id: number | string;
  image: string;
  alt?: string;
}

interface StickyCard002Props {
  cards: CardData[];
  className?: string;
  containerClassName?: string;
  imageClassName?: string;
  showGalleryCta?: boolean;
}

const StickyCard002 = ({
  cards,
  className,
  containerClassName,
  imageClassName,
  showGalleryCta = true,
}: StickyCard002Props) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imageRefs = useRef<HTMLDivElement[]>([]);

  useGSAP(
    () => {
      const images = imageRefs.current;
      const total = images.length;
      if (!total) return;

      const isMobile = window.innerWidth < 640;

      gsap.defaults({
        ease: "power2.inOut",
        force3D: true,
      });

      images.forEach((img, i) => {
        gsap.set(img, {
          yPercent: i === 0 ? 0 : 120, // start first card at 0, others below
          xPercent: i === 0 ? 0 : isMobile ? 0 : 50,
          rotateZ: i === 0 ? 0 : isMobile ? (i % 2 === 0 ? 10 : -10) : 25,
          scale: 1,
          transformOrigin: "bottom center",
          willChange: "transform, opacity",
          zIndex: i,
          force3D: true,
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${window.innerHeight * (total - 1)}`,
          pin: true,
          scrub: 0.5, // Reduced from 1 for snappier performance
          anticipatePin: 1,
          invalidateOnRefresh: true,
          fastScrollEnd: true, // Optimizes for fast scrolling
        },
      });

      for (let k = 1; k < total; k++) {
        const stepTl = gsap.timeline();

        for (let i = 0; i <= k; i++) {
          const offset = i - k / 2;

          let rotateZ, xPercent, yPercent, scale;

          if (isMobile) {
            // Predetermined pseudo-random values to scatter cards naturally
            const rotOffsets = [0, -6, 5, -8, 4, -7, 6, -5];
            const xOffsets = [0, 8, -6, 7, -8, 5, -7, 6];

            // Stack vertically, slightly randomized
            rotateZ = rotOffsets[i % rotOffsets.length] + offset * 2;
            xPercent = xOffsets[i % xOffsets.length] + offset * 3;
            yPercent = offset * 20; // Fan vertically instead of sideways
            scale = 1 - Math.abs(offset) * 0.015;
          } else {
            // Calculate values for a hand-of-cards fan effect
            rotateZ = offset * 10;
            xPercent = offset * 20;
            yPercent = Math.abs(offset) * 5;
            scale = 1 - Math.abs(offset) * 0.02; // Optional depth styling
          }

          stepTl.to(
            images[i],
            {
              yPercent,
              xPercent,
              rotateZ,
              scale,
              duration: 1,
              ease: "none",
            },
            0, // All cards in the hand animate simultaneously for the step
          );
        }

        tl.add(stepTl, k - 1);
      }

      return () => {
        tl.kill();
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className={cn(
        "relative w-full min-h-svh flex items-center justify-center",
        className,
      )}
    >
      <div className="relative w-full flex items-center justify-center overflow-visible px-4 sm:px-6">
        <div
          className={cn(
            `
            relative 
            w-full 
            max-w-[clamp(280px,85vw,520px)]
            sm:max-w-[clamp(320px,70vw,600px)]
            lg:max-w-[clamp(380px,45vw,720px)]
            aspect-16/10
            rounded-3xl 
            `,
            containerClassName,
          )}
        >
          {cards.map((card, i) => (
            <div
              key={card.id}
              ref={(el) => {
                if (el) imageRefs.current[i] = el;
              }}
              className={cn(
                "absolute inset-0 w-full h-full",
                "flex items-center justify-center shadow-2xl rounded-3xl overflow-hidden",
                imageClassName,
              )}
              style={{
                willChange: "transform, opacity",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
            >
              <img
                src={card.image}
                alt={card.alt || ""}
                draggable={false}
                loading={i < 2 ? "eager" : "lazy"}
                className="
                  w-full
                  h-full
                  object-cover
                  select-none
                  rounded-3xl
                "
              />
            </div>
          ))}
        </div>
      </div>

      {showGalleryCta && (
        <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-30 pointer-events-auto">
          <Link
            href="/gallery"
            className="group relative flex items-center gap-3 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full border border-zinc-200/80 dark:border-zinc-800/80 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md shadow-lg hover:shadow-xl hover:border-zinc-400/80 dark:hover:border-zinc-600/80 hover:-translate-y-0.5 transition-all duration-300"
          >
            <div className="w-7 h-7 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-[#0DA5F0] dark:text-[#FA0001] transition-transform duration-300 group-hover:scale-110">
              <Images size={14} />
            </div>
            <span className="text-xs sm:text-sm font-semibold tracking-wide text-zinc-900 dark:text-zinc-100">
              Explore Gallery
            </span>
            <ArrowUpRight
              size={14}
              className="text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-white transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      )}
    </section>
  );
};

export default StickyCard002;
