import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const greetings = [
  { text: "Hello" },
  { text: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ" },
  { text: "ہیلو" },
  { text: "Bonjour" },
  { text: "হ্যালো" },
  { text: "Ciao" },
  { text: "வணக்கம்" },
  { text: "こんにちは" },
  { text: "你好" },
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
    </div>
  );
};
