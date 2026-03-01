"use client";

import StickyCard002 from "@/components/ui/skiper-ui/skiper17";

const Cards = () => {
  const cards = [
    { id: 1, image: "https://res.cloudinary.com/dunacoujw/image/upload/v1772402433/reach_xhdfbp.webp" },
    { id: 2, image: "https://res.cloudinary.com/dunacoujw/image/upload/v1772402429/3_ewhcxs.webp" },
    { id: 3, image: "https://res.cloudinary.com/dunacoujw/image/upload/v1772402430/12_ubduyk.webp" },
    { id: 4, image: "https://res.cloudinary.com/dunacoujw/image/upload/v1772402429/13_qqolcu.webp" },
    { id: 5, image: "https://res.cloudinary.com/dunacoujw/image/upload/v1772402432/8_v0g0is.webp" },
  ];

  return (
    <div className="w-full">
      <StickyCard002 cards={cards} />
    </div>
  );
};

export default Cards;
