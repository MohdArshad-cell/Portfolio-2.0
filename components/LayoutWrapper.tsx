"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BootScreen from "./BootScreen";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isBooted, setIsBooted] = useState(false);

  const handleBootComplete = () => {
    // 1. Initialize and play the "Login Successful" audio
    const audio = new Audio("/asset/chirp.mp3");
    audio.volume = 0.4; // Keep it subtle, not loud
    audio.play().catch(e => console.log("Audio play blocked by browser policy."));

    // 2. Flip the state
    setIsBooted(true);
  };

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {!isBooted ? (
          <BootScreen key="boot" onComplete={handleBootComplete} />
        ) : (
          <motion.main
            key="content"
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            {children}
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}