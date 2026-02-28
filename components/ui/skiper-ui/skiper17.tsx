"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

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
}

const StickyCard002 = ({
  cards,
  className,
  containerClassName,
  imageClassName,
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
        if (i === 0) {
          gsap.set(img, {
            yPercent: 0,
            xPercent: 0,
            rotateZ: 0,
            scale: 1,
            transformOrigin: "bottom center",
            willChange: "transform",
            zIndex: total - i,
          });
        } else {
          gsap.set(img, {
            yPercent: 120,    // start below
            xPercent: 50,     // start to the right 
            rotateZ: 25,      // start rotated
            scale: 1,
            transformOrigin: "bottom center",
            willChange: "transform",
            zIndex: total - i,
          });
        }
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${window.innerHeight * (total - 1)}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      for (let k = 1; k < total; k++) {
        const stepTl = gsap.timeline();

        for (let i = 0; i <= k; i++) {
          const offset = i - k / 2;
          // Calculate values for a hand-of-cards fan effect
          const rotateZ = offset * (isMobile ? 6 : 10);
          const xPercent = offset * (isMobile ? 12 : 20);
          const yPercent = Math.abs(offset) * 5;
          const scale = 1 - Math.abs(offset) * 0.02; // Optional depth styling

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
            0 // All cards in the hand animate simultaneously for the step
          );
        }

        tl.add(stepTl, k - 1);
      }

      return () => {
        tl.kill();
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className={cn(
        "relative w-full min-h-svh flex items-center justify-center",
        className
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
            rounded-3xl 
            `,
            containerClassName
          )}
        >
          {cards.map((card, i) => (
            <div
              key={card.id}
              ref={(el) => {
                if (el) imageRefs.current[i] = el;
              }}
              className={cn(
                i === 0 ? "relative" : "absolute inset-0 h-full",
                "w-full flex items-center justify-center will-change-transform shadow-2xl rounded-3xl",
                imageClassName
              )}
            >
              <img
                src={card.image}
                alt={card.alt || ""}
                draggable={false}
                className="
                  w-full
                  h-auto
                  object-contain
                  select-none
                  backface-hidden
                  rounded-3xl
                "
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StickyCard002;
