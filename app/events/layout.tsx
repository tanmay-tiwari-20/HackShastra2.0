import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events & Hackathons | HackShastra",
  description:
    "Explore upcoming tech events, meetups, and hackathons hosted by the HackShastra community. Join us to build and innovate.",
  openGraph: {
    title: "Events & Hackathons | HackShastra",
    description:
      "Explore upcoming tech events, meetups, and hackathons hosted by the HackShastra community.",
    url: "https://hackshastra.in/events",
  },
  alternates: {
    canonical: "https://hackshastra.in/events",
  },
};

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              name: "Events & Hackathons | HackShastra",
              description:
                "Explore upcoming tech events, meetups, and hackathons hosted by the HackShastra community.",
              url: "https://hackshastra.in/events",
              about: {
                "@type": "EventSeries",
                name: "HackShastra Tech Events",
                organizer: {
                  "@type": "Organization",
                  name: "HackShastra",
                  url: "https://hackshastra.in",
                },
              },
            }),
          }}
        />
      </head>
      {children}
    </>
  );
}
