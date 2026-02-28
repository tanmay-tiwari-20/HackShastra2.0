"use client";

import StickyCard002 from "@/components/ui/skiper-ui/skiper17";

const Cards = () => {
  const cards = [
    { id: 1, image: "/images/reach.webp" },
    { id: 2, image: "/images/1.webp" },
    { id: 3, image: "/images/2.webp" },
    { id: 4, image: "/images/3.webp" },
  ];

  return (
    <div className="w-full">
      <StickyCard002 cards={cards} />
    </div>
  );
};

export default Cards;
