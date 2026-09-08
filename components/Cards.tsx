"use client";

import { useEffect, useState } from "react";
import StickyCard002 from "@/components/ui/skiper-ui/skiper17";
import {
  STATIC_GALLERY,
  getDailyRandomImages,
  fetchGalleryImages,
} from "@/lib/galleryData";

interface CardsProps {
  count?: number;
}

const Cards = ({ count = 5 }: CardsProps) => {
  // Initial daily random selection from gallery images
  const [cards, setCards] = useState(() => {
    const dailyUrls = getDailyRandomImages(STATIC_GALLERY, count);
    return dailyUrls.map((url, index) => ({
      id: index + 1,
      image: url,
      alt: `HackShastra moment ${index + 1}`,
    }));
  });

  useEffect(() => {
    let isMounted = true;

    async function loadGallery() {
      const all = await fetchGalleryImages();
      if (isMounted && all && all.length > 0) {
        const dailyUrls = getDailyRandomImages(all, count);
        setCards(
          dailyUrls.map((url, index) => ({
            id: index + 1,
            image: url,
            alt: `HackShastra moment ${index + 1}`,
          })),
        );
      }
    }

    loadGallery();

    return () => {
      isMounted = false;
    };
  }, [count]);

  return (
    <div className="w-full">
      <StickyCard002
        key={cards.map((c) => c.image).join(",")}
        cards={cards}
      />
    </div>
  );
};

export default Cards;
