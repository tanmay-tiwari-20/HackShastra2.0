"use client";
import React, { useRef, useEffect, useState } from "react";
import {
    motion,
    useMotionValue,
    useSpring,
    useTransform,
    AnimatePresence,
    LayoutGroup
} from "framer-motion";
import { useGesture } from "@use-gesture/react";
import Navbar from "@/components/Navbar";
import { X } from "lucide-react";

// To add more images in the future, simply place them in the 'public/images' folder
// and add their paths to this array. Avoid using 'poster.png' as requested.
const GALLERY_IMAGES = [
    "/images/1.webp",
    "/images/2.webp",
    "/images/3.webp",
    "/images/4.webp",
    "/images/5.webp",
    "/images/6.webp",
    "/images/7.webp",
    "/images/8.webp",
    "/images/9.webp",
    "/images/10.webp",
    "/images/11.webp",
    "/images/12.webp",
    "/images/13.webp",
    "/images/14.webp",
    "/images/15.webp",
    "/images/16.webp",
    "/images/17.webp",
    "/images/reach.webp",
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
    const wrappedX = useTransform(smoothX, (v) => wrap(-GRID_WIDTH / 2, GRID_WIDTH / 2, v));
    const wrappedY = useTransform(smoothY, (v) => wrap(-GRID_HEIGHT / 2, GRID_HEIGHT / 2, v));
    const wrappedYFast = useTransform(smoothY, (v) => wrap(-GRID_HEIGHT / 2, GRID_HEIGHT / 2, v * 1.3));

    const [selectedImage, setSelectedImage] = useState<{ url: string; id: string } | null>(null);
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
            }
        }
    );

    return (
        <LayoutGroup>
            {/* Theme-aware background */}
            <div className="relative w-full h-screen overflow-hidden bg-gray-50 dark:bg-[#0a0a0a] text-black dark:text-white transition-colors duration-500">
                {/* Sticky Header */}
                <div className="absolute top-0 left-0 w-full z-50 pointer-events-none transition-opacity duration-300" style={{ opacity: selectedImage ? 0 : 1 }}>
                    <Navbar isReady={true} />
                </div>

                {/* Interactive Surface */}
                <div
                    ref={containerRef}
                    {...bind()}
                    className={`absolute inset-0 w-full h-full touch-none select-none ${selectedImage ? 'pointer-events-none blur-sm' : 'cursor-grab active:cursor-grabbing'} transition-[filter] duration-500`}
                >
                    <motion.div
                        style={{ x: wrappedX }}
                        className="w-full h-full absolute top-1/2 left-1/2 will-change-transform"
                    >
                        <div
                            className="absolute top-0 left-0"
                            style={{
                                transform: `scale(${scale})`,
                                transformOrigin: "center center"
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
                                                            const isCenterMacro = colMultiplier === 0 && rowMultiplier === 0;

                                                            const imgIndex = ((r * COLUMNS) + c) % GALLERY_IMAGES.length;
                                                            const url = GALLERY_IMAGES[imgIndex];
                                                            const id = `img-${r}-${c}`;

                                                            return isCenterMacro ? (
                                                                <motion.div
                                                                    layoutId={`container-${id}`}
                                                                    key={`img-motion-${r}`}
                                                                    className="absolute overflow-hidden rounded-2xl group cursor-pointer shadow-lg hover:z-10"
                                                                    style={{ top, left: 0, width: IMAGE_WIDTH, height: IMAGE_HEIGHT }}
                                                                    whileHover={{ scale: 0.98 }}
                                                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                                                    onClick={() => setSelectedImage({ url, id })}
                                                                >
                                                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                                                    <motion.img
                                                                        layoutId={`image-${id}`}
                                                                        src={url}
                                                                        alt={`Gallery Image ${imgIndex}`}
                                                                        decoding="async"
                                                                        loading="eager"
                                                                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none"
                                                                    />
                                                                </motion.div>
                                                            ) : (
                                                                <div
                                                                    key={`img-div-${r}`}
                                                                    className="absolute overflow-hidden rounded-2xl group cursor-pointer shadow-lg hover:z-10 transition-transform duration-400 ease-out hover:scale-[0.98]"
                                                                    style={{ top, left: 0, width: IMAGE_WIDTH, height: IMAGE_HEIGHT }}
                                                                    onClick={() => setSelectedImage({ url, id })}
                                                                >
                                                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                                                    <img
                                                                        src={url}
                                                                        alt={`Gallery Image ${imgIndex}`}
                                                                        decoding="async"
                                                                        loading="lazy"
                                                                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none"
                                                                    />
                                                                </div>
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
                </div>

                {/* Decorative prompt */}
                <div
                    className={`absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none z-40 text-sm tracking-widest uppercase transition-opacity duration-300 ${selectedImage ? 'opacity-0' : 'opacity-100'}`}
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
                            className="fixed inset-0 z-[100] flex items-center justify-center bg-white/90 dark:bg-black/90 backdrop-blur-xl"
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
                                className="relative flex max-w-[90vw] max-h-[85vh] overflow-hidden rounded-lg shadow-xl"
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <motion.img
                                    layoutId={`image-${selectedImage.id}`}
                                    src={selectedImage.url}
                                    alt="Selected Gallery Image"
                                    className="w-auto h-auto max-w-[90vw] max-h-[85vh] object-contain"
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
