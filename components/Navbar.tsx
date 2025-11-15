"use client";

import { useTheme } from "next-themes";
import { useEffect, useState, useMemo } from "react";
import CardNav from "./CardNav";

import logoDark from "@/public/logodark.svg";
import logoLight from "@/public/logolight.svg";

const Navbar = () => {
  const { theme } = useTheme();

  // Hooks in stable order: useState -> useEffect -> useMemo (always called)
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // compute dynamic values (still hooks-first order)
  const currentLogo = theme === "dark" ? logoDark : logoLight;
  const bgColor = theme === "dark" ? "#F90101" : "#0DA5F0";

  const items = useMemo(
    () => [
      {
        label: "About",
        bgColor,
        textColor: "#fff",
        links: [
          { label: "Company", href: "/company", ariaLabel: "About Company" },
          { label: "Careers", href: "/careers", ariaLabel: "About Careers" },
          { label: "Team", href: "/team", ariaLabel: "Team" },
        ],
      },
      {
        label: "Projects",
        bgColor,
        textColor: "#fff",
        links: [
          {
            label: "Featured",
            href: "/featured",
            ariaLabel: "Featured Projects",
          },
          {
            label: "Case Studies",
            href: "/case-studies",
            ariaLabel: "Case Studies",
          },
          {
            label: "Case Studies",
            href: "/case-studies",
            ariaLabel: "Case Studies",
          },
        ],
      },
      {
        label: "Contact",
        bgColor,
        textColor: "#fff",
        links: [
          { label: "Email", href: "/contact", ariaLabel: "Email Us" },
          {
            label: "Twitter",
            href: "https://twitter.com",
            ariaLabel: "Twitter",
          },
          {
            label: "LinkedIn",
            href: "https://linkedin.com",
            ariaLabel: "LinkedIn",
          },
        ],
      },
    ],
    [bgColor]
  );

  // Prevent rendering on server/hydration mismatch
  if (!mounted) return null;

  return (
    <CardNav
      logo={currentLogo}
      logoAlt="HackShastra Logo"
      items={items}
      baseColor="#fff"
      menuColor="#000"
      ease="power3.out"
    />
  );
};

export default Navbar;
