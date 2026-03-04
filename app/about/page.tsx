"use client";

import Navbar from "@/components/Navbar";
import AboutHero from "@/components/AboutHero";
import StoryTimeline from "@/components/StoryTimeline";
import FounderCinematicCard from "@/components/FounderCinematicCard";
import CoreTeamGrid from "@/components/CoreTeamGrid";
import ChaptersSection from "@/components/ChaptersSection";
import ChapterCTA from "@/components/ChapterCTA";

const architects = [
  {
    name: "Tanmay Tiwari",
    story:
      "Tanmay Tiwari believed that hackathons were more than competitions, they were launchpads for builders. He envisioned a space where raw talent could meet real-world challenges.",
    image:
      "https://res.cloudinary.com/dunacoujw/image/upload/v1772568692/1_f8hnlw.png",
    socials: {
      linkedin: "https://www.linkedin.com/in/tanmay-tiwari20/",
      instagram: "https://instagram.com/takneekitanmay/",
      twitter: "https://x.com/takneekitanmay/",
      email: "workwithtakneekitanmay@gmail.com",
    },
  },
  {
    name: "Jai Chawla",
    story:
      "Jai Chawla saw the potential in student communities to disrupt the status quo. His focus has always been on fostering an environment where innovation is the default state.",
    image:
      "https://res.cloudinary.com/dunacoujw/image/upload/v1772568692/5_oz9vt2.png",
    socials: {
      linkedin: "https://www.linkedin.com/in/jaichawlaa/",
      instagram: "https://www.instagram.com/jaichawla.mp4",
      twitter: "https://x.com/jaichawla_",
      email: "jaichawla.mp4@gmail.com",
    },
  },
  {
    name: "Sumit Rathore",
    story:
      "Sumit Rathore, with his deep technical expertise, bridged the gap between complex engineering and community building, ensuring HackShastra remained a tech-first collective.",
    image:
      "https://res.cloudinary.com/dunacoujw/image/upload/v1772568692/4_snnvr9.png",
    socials: {
      linkedin: "https://linkedin.com/in/tanmay-tiwari-20",
      instagram: "https://instagram.com/tanmay_tiwari_20",
      twitter: "https://x.com/tanmay_tiwari20",
      email: "sumit@hackshastra.com",
    },
  },
  {
    name: "Uday Sharma",
    story:
      "Uday Sharma's vision was to scale the hacker culture beyond local boundaries, creating an impact that resonates across chapters and campuses.",
    image:
      "https://res.cloudinary.com/dunacoujw/image/upload/v1772568691/2_ipkls5.png",
    socials: {
      linkedin: "https://www.linkedin.com/in/udaydotai",
      instagram: "https://www.instagram.com/udaysharmaaaaa",
      twitter: "https://x.com/udaysharmatech",
      email: "workwithudaysharma@gmail.com",
    },
  },
  {
    name: "Md Imran",
    story:
      "Md Imran brought a strategic edge to HackShastra, turning a group of friends with a vision into a structured movement that empowers thousands of developers.",
    image:
      "https://res.cloudinary.com/dunacoujw/image/upload/v1772647474/cofounders_2_dqcol5.png",
    socials: {
      linkedin: "https://www.linkedin.com/in/md-imran-48a443292",
      instagram: "https://www.instagram.com/mdimran.py",
      twitter: "https://x.com/dkpython",
      email: "workwithmdimranpy@gmail.com",
    },
  },
];

const AboutPage = () => {
  return (
    <main className="relative bg-white dark:bg-[#0a0a0a] min-h-screen">
      <Navbar isReady={true} />

      <AboutHero />

      <StoryTimeline />

      <div className="py-20 lg:py-0">
        {architects.map((architect, i) => (
          <FounderCinematicCard
            key={i}
            index={i}
            name={architect.name}
            story={architect.story}
            image={architect.image}
            socials={architect.socials}
          />
        ))}
      </div>

      <CoreTeamGrid />

      <ChaptersSection />

      <ChapterCTA />

      {/* Global Cinematic Accents */}
      <div className="fixed left-6 bottom-6 z-[60] pointer-events-none hidden lg:block">
        <span className="text-[10px] font-black uppercase tracking-[1em] opacity-20 [writing-mode:vertical-lr] rotate-180">
          HACKSHASTRA // ABOUT
        </span>
      </div>
    </main>
  );
};

export default AboutPage;
