import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community Gallery | HackShastra",
  description:
    "Explore the visual history of the HackShastra community. Photos from our past hackathons, meetups, and tech events.",
  openGraph: {
    title: "Community Gallery | HackShastra",
    description:
      "Explore the visual history of the HackShastra community through our interactive gallery.",
    url: "https://hackshastra.in/gallery",
  },
  alternates: {
    canonical: "https://hackshastra.in/gallery",
  },
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
