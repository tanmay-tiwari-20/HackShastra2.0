"use client";

import StickyCard002 from "@/components/ui/skiper-ui/skiper17";

const Cards = () => {
  const cards = [
    {
      id: 1,
      image:
        "https://res.cloudinary.com/dunacoujw/image/upload/v1772402433/reach_xhdfbp.webp",
      alt: "HackShastra developers collaborating at a large tech event",
    },
    {
      id: 2,
      image:
        "https://res.cloudinary.com/dunacoujw/image/upload/v1772402429/3_ewhcxs.webp",
      alt: "HackShastra core team members at a meetup",
    },
    {
      id: 3,
      image:
        "https://res.cloudinary.com/dunacoujw/image/upload/v1772402430/12_ubduyk.webp",
      alt: "Participants coding during a HackShastra hackathon",
    },
    {
      id: 4,
      image:
        "https://res.cloudinary.com/dunacoujw/image/upload/v1772402429/13_qqolcu.webp",
      alt: "A speaker addressing the audience at a HackShastra conference",
    },
    {
      id: 5,
      image:
        "https://res.cloudinary.com/dunacoujw/image/upload/v1772402432/8_v0g0is.webp",
      alt: "Group photo of the HackShastra student community",
    },
  ];

  return (
    <div className="w-full">
      <StickyCard002 cards={cards} />
    </div>
  );
};

export default Cards;
