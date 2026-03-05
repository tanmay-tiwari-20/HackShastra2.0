import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | HackShastra Community",
  description:
    "Learn about the story, founders, and core team behind HackShastra. We are a community of builders, innovators, and hackers.",
  openGraph: {
    title: "About Us | HackShastra Community",
    description:
      "Learn about the story, founders, and core team behind HackShastra.",
    url: "https://hackshastra.in/about",
  },
  alternates: {
    canonical: "https://hackshastra.in/about",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
