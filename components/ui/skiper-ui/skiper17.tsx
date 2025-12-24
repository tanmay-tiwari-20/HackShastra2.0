"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import Image from "next/image";
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
        ease: "none",
        force3D: true,
      });

      images.forEach((img, i) => {
        gsap.set(img, {
          yPercent: i === 0 ? 0 : 100,
          scale: 1,
          rotateZ: 0,
          willChange: "transform",
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${window.innerHeight * (total - 1)}`,
          pin: true,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      for (let i = 0; i < total - 1; i++) {
        tl.to(
          images[i],
          {
            scale: isMobile ? 0.96 : 0.9,
            rotateZ: isMobile ? 1 : 2,
          },
          i
        ).to(
          images[i + 1],
          {
            yPercent: 0,
          },
          i
        );
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
        "relative w-full min-h-[100svh] flex items-center justify-center",
        className
      )}
    >
      <div className="relative w-full flex items-center justify-center overflow-hidden px-4 sm:px-6">
        <div
          className={cn(
            `
            relative 
            w-full 
            aspect-[3/4]
            max-w-[clamp(280px,85vw,520px)]
            sm:max-w-[clamp(320px,70vw,600px)]
            lg:max-w-[clamp(380px,45vw,720px)]
            rounded-3xl 
            overflow-hidden
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
                "absolute inset-0 flex items-center justify-center will-change-transform",
                imageClassName
              )}
            >
              <Image
                src={card.image}
                alt={card.alt || ""}
                fill
                priority={i === 0}
                draggable={false}
                className="
                  object-contain
                  select-none
                  backface-hidden
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
