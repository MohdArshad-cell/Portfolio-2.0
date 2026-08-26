"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX, transformOrigin: "0%" }}
      className="fixed top-0 left-0 right-0 h-[2px] z-[60] bg-gradient-to-r from-[#00f3ff] via-[#7000ff] to-[#00f3ff] shadow-[0_0_10px_rgba(0,243,255,0.5)]"
    />
  );
}
