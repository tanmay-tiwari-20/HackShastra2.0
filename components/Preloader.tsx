import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const greetings = [
  { text: "Hello" },
  { text: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ" },
  { text: "ہیلو" },
  { text: "হ্যালো" },
  { text: "வணக்கம்" },
  { text: "こんにちは" },
  { text: "नमस्ते" },
];

export const Preloader = ({ onComplete }: { onComplete?: () => void }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => {
        if (prev === greetings.length - 1) {
          clearInterval(interval);

          // Call onComplete immediately
          setTimeout(() => onComplete?.(), 500);

          return prev;
        }
        return prev + 1;
      });
    }, 900);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-9999 bg-white dark:bg-black flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.6 }}
          className="absolute"
        >
          <h1 className="text-black dark:text-white text-6xl md:text-9xl font-bold">
            {greetings[index].text}
          </h1>
        </motion.div>
      </AnimatePresence>

      {/* Skip Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        onClick={() => onComplete?.()}
        aria-label="Skip preloader"
        className="absolute bottom-10 right-10 group flex items-center gap-2 px-5 py-2.5 rounded-full border border-black/20 dark:border-white/20 bg-white/60 dark:bg-black/60 backdrop-blur-sm text-black dark:text-white text-xs font-black uppercase tracking-widest hover:border-black/60 dark:hover:border-white/60 transition-all duration-300 hover:scale-105"
      >
        Skip
        <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </motion.button>
    </div>
  );
};
