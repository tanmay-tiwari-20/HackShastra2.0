import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | HackShastra",
  description:
    "Get in touch with the HackShastra core team. Reach out for sponsorships, collaborations, or general inquiries.",
  openGraph: {
    title: "Contact Us | HackShastra",
    description:
      "Get in touch with the HackShastra core team. Reach out for sponsorships, collaborations, or general inquiries.",
    url: "https://hackshastra.in/contact",
  },
  alternates: {
    canonical: "https://hackshastra.in/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
