"use client";
import React, { useRef, useEffect, useState, memo } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
  LayoutGroup,
} from "framer-motion";
import { useGesture } from "@use-gesture/react";
import Navbar from "@/components/Navbar";
import { X } from "lucide-react";

// To add more images in the future, simply place them in the 'public/images' folder
// and add their paths to this array. Avoid using 'poster.png' as requested.
const GALLERY_IMAGES = [
  "https://res.cloudinary.com/dunacoujw/image/upload/v1772402429/3_ewhcxs.webp",
  "https://res.cloudinary.com/dunacoujw/image/upload/v1772402431/7_c4axuu.webp",
  "https://res.cloudinary.com/dunacoujw/image/upload/v1772402429/11_x88zyt.webp",
  "https://res.cloudinary.com/dunacoujw/image/upload/v1772402429/1_gaiwhl.webp",
  "https://res.cloudinary.com/dunacoujw/image/upload/v1772402430/4_mbd5ak.webp",
  "https://res.cloudinary.com/dunacoujw/image/upload/v1772402429/13_qqolcu.webp",
  "https://res.cloudinary.com/dunacoujw/image/upload/v1772402431/14_esbxla.webp",
  "https://res.cloudinary.com/dunacoujw/image/upload/v1772402433/16_nhp0kd.webp",
  "https://res.cloudinary.com/dunacoujw/image/upload/v1772402433/17_kjiyiu.webp",
  "https://res.cloudinary.com/dunacoujw/image/upload/v1772402433/17_kjiyiu.webp",
  "https://res.cloudinary.com/dunacoujw/image/upload/v1772402432/8_v0g0is.webp",
  "https://res.cloudinary.com/dunacoujw/image/upload/v1772402431/5_cibwsm.webp",
  "https://res.cloudinary.com/dunacoujw/image/upload/v1772402430/12_ubduyk.webp",
  "https://res.cloudinary.com/dunacoujw/image/upload/v1772402432/9_dige7e.webp",
  "https://res.cloudinary.com/dunacoujw/image/upload/v1772402431/6_bep8ex.webp",
  "https://res.cloudinary.com/dunacoujw/image/upload/v1772402432/15_bopebl.webp",
  "https://res.cloudinary.com/dunacoujw/image/upload/v1772402434/2_holzer.webp",
  "https://res.cloudinary.com/dunacoujw/image/upload/v1772402433/reach_xhdfbp.webp",
];

const COLUMNS = 5;
const ROWS = 4;
const IMAGE_WIDTH = 500;
const IMAGE_HEIGHT = 300;
const GAP = 40;

const GRID_WIDTH = COLUMNS * (IMAGE_WIDTH + GAP);
const GRID_HEIGHT = ROWS * (IMAGE_HEIGHT + GAP);

// Mathematical wrap function to ensure seamless modulus looping including negatives
const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

// Extracted and memoized Grid component to prevent 180 images from re-rendering
// when the user clicks an image and selectedImage state changes.
const GalleryGrid = memo(
  ({ scale, wrappedX, wrappedY, wrappedYFast, setSelectedImage }: any) => {
    return (
      <motion.div
        style={{ x: wrappedX }}
        className="w-full h-full absolute top-1/2 left-1/2 will-change-transform"
      >
        <div
          className="absolute top-0 left-0 will-change-transform"
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "center center",
          }}
        >
          {/* Render a horizontal array of 3 macro-columns for infinite X scrolling */}
          {[-1, 0, 1].map((colMultiplier) => (
            <div
              key={`col-group-${colMultiplier}`}
              className="absolute"
              style={{
                left: colMultiplier * GRID_WIDTH - GRID_WIDTH / 2,
                top: 0,
                width: GRID_WIDTH,
              }}
            >
              {/* Render 5 individual columns to support parallax */}
              {[0, 1, 2, 3, 4].map((c) => {
                const isFast = c % 2 !== 0;
                const columnWrappedY = isFast ? wrappedYFast : wrappedY;
                const staggerOffset = isFast ? IMAGE_HEIGHT / 2 : 0;

                return (
                  <motion.div
                    key={`col-${c}`}
                    style={{
                      y: columnWrappedY,
                      left: c * (IMAGE_WIDTH + GAP),
                      width: IMAGE_WIDTH,
                    }}
                    className="absolute top-0 will-change-transform"
                  >
                    {/* Render a vertical array of 3 macro-rows for infinite Y scrolling */}
                    {[-1, 0, 1].map((rowMultiplier) => (
                      <div
                        key={`row-group-${rowMultiplier}`}
                        className="absolute"
                        style={{
                          top: rowMultiplier * GRID_HEIGHT - GRID_HEIGHT / 2,
                          left: 0,
                          width: IMAGE_WIDTH,
                          height: GRID_HEIGHT,
                        }}
                      >
                        {/* Render 4 images per column */}
                        {[0, 1, 2, 3].map((r) => {
                          const top = r * (IMAGE_HEIGHT + GAP) + staggerOffset;
                          const imgIndex =
                            (r * COLUMNS + c) % GALLERY_IMAGES.length;
                          const url = GALLERY_IMAGES[imgIndex];

                          // Unique ID for every instance to ensure correct layout animations
                          const id = `img-${colMultiplier}-${rowMultiplier}-${r}-${c}`;

                          return (
                            <motion.div
                              layoutId={`container-${id}`}
                              key={`img-motion-${id}`}
                              className="absolute overflow-hidden rounded-2xl cursor-pointer shadow-lg will-change-transform"
                              style={{
                                top,
                                left: 0,
                                width: IMAGE_WIDTH,
                                height: IMAGE_HEIGHT,
                              }}
                              initial="rest"
                              whileHover="hover"
                              animate="rest"
                              variants={{
                                rest: { scale: 1, zIndex: 1 },
                                hover: { scale: 0.98, zIndex: 10 },
                              }}
                              transition={{
                                type: "spring",
                                damping: 25,
                                stiffness: 200,
                              }}
                              onClick={() => setSelectedImage({ url, id })}
                            >
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <motion.img
                                layoutId={`image-${id}`}
                                src={url}
                                alt={`Gallery Image ${imgIndex}`}
                                decoding="async"
                                loading={
                                  colMultiplier === 0 && rowMultiplier === 0
                                    ? "eager"
                                    : "lazy"
                                }
                                className="w-full h-full object-cover pointer-events-none will-change-transform"
                                variants={{
                                  rest: { scale: 1 },
                                  hover: { scale: 1.05 },
                                }}
                                transition={{
                                  type: "spring",
                                  damping: 25,
                                  stiffness: 200,
                                }}
                              />
                            </motion.div>
                          );
                        })}
                      </div>
                    ))}
                  </motion.div>
                );
              })}
            </div>
          ))}
        </div>
      </motion.div>
    );
  },
);

GalleryGrid.displayName = "GalleryGrid";

const GalleryPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Unbounded target values
  const targetX = useRef(0);
  const targetY = useRef(0);

  // Motion values tracking the absolute unrestricted distance
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Apply spring physics for ultra-smooth buttery feel
  const springConfig = { damping: 40, stiffness: 150, mass: 1 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  // Create wrapped versions of the smooth values to safely loop rendering coordinates
  // We wrap between -GRID_WIDTH/2 and GRID_WIDTH/2 to keep the 3x3 tiles centered beautifully.
  const wrappedX = useTransform(smoothX, (v) =>
    wrap(-GRID_WIDTH / 2, GRID_WIDTH / 2, v),
  );
  const wrappedY = useTransform(smoothY, (v) =>
    wrap(-GRID_HEIGHT / 2, GRID_HEIGHT / 2, v),
  );
  const wrappedYFast = useTransform(smoothY, (v) =>
    wrap(-GRID_HEIGHT / 2, GRID_HEIGHT / 2, v * 1.3),
  );

  const [selectedImage, setSelectedImage] = useState<{
    url: string;
    id: string;
  } | null>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setScale(0.5); // Mobile
      } else if (width < 1024) {
        setScale(0.75); // Tablet
      } else {
        setScale(1); // Desktop
      }
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  // Combine Drag and Wheel gestures safely and unboundedly
  const bind = useGesture(
    {
      onDrag: ({ offset: [ox, oy] }) => {
        targetX.current = ox;
        targetY.current = oy;
        x.set(targetX.current);
        y.set(targetY.current);
      },
      onWheel: ({ delta: [dx, dy] }) => {
        // Accumulate wheel delta into our target infinitely
        targetX.current -= dx * 1.0;
        targetY.current -= dy * 1.0;

        // Keep useGesture's internal state synced with our unbounded wheeling
        // so if you drag AFTER wheeling, it doesn't jump back.

        x.set(targetX.current);
        y.set(targetY.current);
      },
    },
    {
      drag: {
        from: () => [targetX.current, targetY.current],
        filterTaps: true,
        rubberband: false,
      },
    },
  );

  return (
    <LayoutGroup>
      {/* Theme-aware background */}
      <div className="relative w-full h-screen overflow-hidden bg-gray-50 dark:bg-[#0a0a0a] text-black dark:text-white transition-colors duration-500">
        {/* Sticky Header */}
        <div
          className="absolute top-0 left-0 w-full z-50 pointer-events-none transition-opacity duration-300"
          style={{ opacity: selectedImage ? 0 : 1 }}
        >
          <Navbar isReady={true} />
        </div>

        {/* Interactive Surface */}
        <div
          ref={containerRef}
          {...bind()}
          className={`absolute inset-0 w-full h-full touch-none select-none ${selectedImage ? "pointer-events-none blur-sm" : "cursor-grab active:cursor-grabbing"} transition-[filter] duration-500 will-change-[filter]`}
        >
          <GalleryGrid
            scale={scale}
            wrappedX={wrappedX}
            wrappedY={wrappedY}
            wrappedYFast={wrappedYFast}
            setSelectedImage={setSelectedImage}
          />
        </div>

        {/* Decorative prompt */}
        <div
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none z-40 text-sm tracking-widest uppercase transition-opacity duration-300 ${selectedImage ? "opacity-0" : "opacity-100"}`}
        >
          <div className="bg-black/10 dark:bg-black/40 backdrop-blur-sm px-6 py-2 rounded-full border border-black/10 dark:border-white/10 text-black/70 dark:text-white/70 font-medium text-center">
            Drag or Scroll to explore
          </div>
        </div>

        {/* Fullscreen Detail View Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-white/90 dark:bg-black/90 backdrop-blur-xl will-change-opacity"
            >
              {/* Close Button */}
              <motion.button
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: 0.2 }}
                onClick={() => setSelectedImage(null)}
                className="absolute top-8 right-8 z-[110] p-3 rounded-full bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 text-black dark:text-white transition-colors cursor-pointer"
              >
                <X size={24} />
              </motion.button>

              {/* Expanded Image */}
              <motion.div
                layoutId={`container-${selectedImage.id}`}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="relative flex max-w-[90vw] max-h-[85vh] overflow-hidden rounded-lg shadow-xl will-change-transform bg-transparent"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <motion.img
                  layoutId={`image-${selectedImage.id}`}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  src={selectedImage.url}
                  alt="Selected Gallery Image"
                  className="w-auto h-auto max-w-[90vw] max-h-[85vh] object-contain will-change-transform"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </LayoutGroup>
  );
};

export default GalleryPage;
