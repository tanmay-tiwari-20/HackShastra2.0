import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import SmoothScrollProvider from "@/SmoothScrollProvider";
import ScrollProgress from "@/components/ScrollProgress";
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hackshastra.in"),
  title: "HackShastra | Unleash Your Divine Potential",
  description:
    "The official website of HackShastra Community. We are a technical community focused on building, innovating, and driving the hacker culture forward through hackathons and meetups.",
  keywords: [
    "HackShastra",
    "Hackathon",
    "Technical Community",
    "Developers",
    "Student Community",
    "Coding",
    "Tech Events",
  ],
  authors: [{ name: "HackShastra Team" }],
  creator: "HackShastra",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hackshastra.in",
    title: "HackShastra | Unleash Your Divine Potential",
    description:
      "The official website of HackShastra Community. Join us in building and innovating.",
    siteName: "HackShastra",
    images: [
      {
        url: "/images/HackShastra.png", // Standard OG image path
        width: 1200,
        height: 630,
        alt: "HackShastra Community",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HackShastra | Unleash Your Divine Potential",
    description:
      "The official website of HackShastra Community. Join us in building and innovating.",
    images: ["/images/HackShastra.png"],
    creator: "@hackshastra",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://hackshastra.in",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "HackShastra",
              url: "https://hackshastra.in",
              logo: "https://hackshastra.in/images/HackShastra.png",
              sameAs: [
                "https://instagram.com/hackshastra",
                "https://x.com/hackshastra",
                "https://linkedin.com/company/hackshastraa",
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "HackShastra",
              url: "https://hackshastra.in",
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-[helvetica]`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        >
          <SmoothScrollProvider>
            <ScrollProgress />
            {children}
            <Analytics />
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
