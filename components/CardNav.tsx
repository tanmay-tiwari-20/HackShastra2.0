"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { GoArrowUpRight } from "react-icons/go";
import { ThemeToggleButton } from "./ui/skiper-ui/skiper26";

type CardNavLink = {
  label: string;
  href: string;
  ariaLabel: string;
};

export type CardNavItem = {
  label: string;
  bgColor: string;
  textColor: string;
  links: CardNavLink[];
};

export interface CardNavProps {
  logo: StaticImageData | string;
  logoAlt?: string;
  items: CardNavItem[];
  className?: string;
  ease?: string;
  baseColor?: string;
  menuColor?: string;
  buttonBgColor?: string;
  buttonTextColor?: string;
}

const CardNav: React.FC<CardNavProps> = ({
  logo,
  logoAlt = "Logo",
  items,
  className = "",
  ease = "power3.out",
  baseColor = "#fff",
  menuColor = "#000",
}) => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const navRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const calculateHeight = () => {
    const navEl = navRef.current;
    if (!navEl) return 260;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) {
      const contentEl = navEl.querySelector(".card-nav-content") as HTMLElement;
      if (contentEl) {
        const original = {
          visibility: contentEl.style.visibility,
          pointer: contentEl.style.pointerEvents,
          position: contentEl.style.position,
          height: contentEl.style.height,
        };

        contentEl.style.visibility = "visible";
        contentEl.style.pointerEvents = "auto";
        contentEl.style.position = "static";
        contentEl.style.height = "auto";

        contentEl.offsetHeight;

        const total = 60 + contentEl.scrollHeight + 16;

        Object.assign(contentEl.style, original);
        return total;
      }
    }
    return 260;
  };

  const createTimeline = () => {
    const navEl = navRef.current;
    if (!navEl) return null;

    gsap.set(navEl, { height: 60, overflow: "hidden" });
    gsap.set(cardsRef.current, { y: 50, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    tl.to(navEl, { height: calculateHeight, duration: 0.4, ease });
    tl.to(
      cardsRef.current,
      { y: 0, opacity: 1, duration: 0.4, ease, stagger: 0.08 },
      "-=0.1"
    );

    return tl;
  };

  useLayoutEffect(() => {
    const tl = createTimeline();
    tlRef.current = tl;

    return () => {
      tl?.kill();
      tlRef.current = null;
    };
  }, [ease, items]);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (!tlRef.current) return;

      if (isExpanded) {
        const newHeight = calculateHeight();
        gsap.set(navRef.current, { height: newHeight });

        tlRef.current.kill();
        const newTl = createTimeline();
        newTl?.progress(1);
        tlRef.current = newTl;
      } else {
        tlRef.current.kill();
        tlRef.current = createTimeline();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isExpanded]);

  const toggleMenu = () => {
    const tl = tlRef.current;
    if (!tl) return;

    if (!isExpanded) {
      setIsHamburgerOpen(true);
      setIsExpanded(true);
      tl.play(0);
    } else {
      setIsHamburgerOpen(false);
      tl.eventCallback("onReverseComplete", () => setIsExpanded(false));
      tl.reverse();
    }
  };

  const setCardRef = (i: number) => (el: HTMLDivElement | null) => {
    if (el) cardsRef.current[i] = el;
  };

  return (
    <div
      className={`card-nav-container absolute left-1/2 -translate-x-1/2 w-[90%] max-w-[800px] top-[1.2em] md:top-[2em] z-50 ${className}`}
    >
      <nav
        ref={navRef}
        className={`card-nav ${
          isExpanded ? "open" : ""
        } block h-[60px] rounded-xl shadow-md relative overflow-hidden`}
        style={{ backgroundColor: baseColor }}
      >
        {/* TOP BAR */}
        <div className="absolute inset-x-0 top-0 h-[60px] flex items-center px-4 z-20">
          {/* Hamburger */}
          <div
            className={`hamburger-menu ${
              isHamburgerOpen ? "open" : ""
            } flex flex-col justify-center gap-[5px] cursor-pointer`}
            onClick={toggleMenu}
            style={{ color: menuColor }}
          >
            <span
              className={`h-[2px] bg-current transition-all w-7 ${
                isHamburgerOpen ? "translate-y-1 rotate-45" : ""
              }`}
            />
            <span
              className={`h-[2px] bg-current transition-all w-7 ${
                isHamburgerOpen ? "-translate-y-1 -rotate-45" : ""
              }`}
            />
          </div>

          {/* LOGO CENTERED */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <div className="relative h-8 sm:h-9 md:h-11 lg:h-14 w-[130px] sm:w-[150px] md:w-[180px] lg:w-[220px]">
              <Image
                src={logo}
                alt={logoAlt}
                fill
                style={{ objectFit: "contain" }}
                priority
              />
            </div>
          </div>

          {/* Theme Toggle */}
          <div className="ml-auto">
            <ThemeToggleButton variant="circle" start="center" />
          </div>
        </div>

        {/* CONTENT CARDS */}
        <div
          className={`card-nav-content absolute left-0 right-0 top-[60px] bottom-0 p-2 flex flex-col gap-2 ${
            isExpanded
              ? "visible pointer-events-auto"
              : "invisible pointer-events-none"
          } md:flex-row md:items-end md:gap-3`}
        >
          {items.slice(0, 3).map((item, idx) => (
            <div
              key={item.label}
              ref={setCardRef(idx)}
              className="nav-card flex flex-col gap-2 p-4 rounded-lg flex-1"
              style={{ backgroundColor: item.bgColor, color: item.textColor }}
            >
              <div className="text-lg md:text-xl">{item.label}</div>

              <div className="mt-auto flex flex-col gap-1">
                {item.links.map((lnk, i) => (
                  <Link
                    key={i}
                    href={lnk.href}
                    aria-label={lnk.ariaLabel}
                    className="flex items-center gap-1 hover:opacity-75"
                  >
                    <GoArrowUpRight /> {lnk.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default CardNav;
