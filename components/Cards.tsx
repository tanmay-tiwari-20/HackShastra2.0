"use client";

import StickyCard002 from "@/components/ui/skiper-ui/skiper17";

const Cards = () => {
  const cards = [
    { id: 1, image: "/images/reach.JPG" },
    { id: 2, image: "/images/1.jpg" },
    { id: 3, image: "/images/2.jpg" },
    { id: 4, image: "/images/3.jpg" },
  ];

  return (
    <div className="w-full">
      <StickyCard002 cards={cards} />
    </div>
  );
};

export default Cards;
