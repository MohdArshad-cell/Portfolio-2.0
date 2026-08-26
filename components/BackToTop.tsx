"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past ~1 viewport height
      setVisible(window.scrollY > window.innerHeight * 0.8);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          onClick={scrollToTop}
          aria-label="Return to top"
          className="fixed bottom-12 left-8 z-[99] flex items-center gap-3 px-5 py-3 bg-[#05060a]/90 backdrop-blur-md border border-white/10 text-gray-500 font-mono text-[10px] uppercase tracking-[0.2em] hover:border-[#00f3ff]/50 hover:text-[#00f3ff] transition-all group shadow-[0_0_20px_rgba(0,0,0,0.5)]"
        >
          <ChevronUp size={14} className="group-hover:text-[#00f3ff] group-hover:-translate-y-0.5 transition-all" />
          <span className="hidden sm:inline font-black">cd /</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
