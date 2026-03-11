"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BootScreen({ onComplete }: { onComplete: () => void }) {
  const [logs, setLogs] = useState<string[]>([]);
  const bootSequence = [
    "INITIALIZING_ARSHAD_OS_V1.2.0...",
    "LOADING_KERNEL_MODULES...",
    "SYNCING_LKO_MAINFRAME_CLOCK...",
    "CHECKING_CREDENTIALS: B.TECH_IT_2026",
    "ESTABLISHING_UPLINK: TATA_CONSULTANCY_SERVICES...",
    "DEPLOYING_HIREEASE_AGENTS...",
    "DECRYPTING_PORTFOLIO_DATA...",
    "SYSTEM_STABLE. READY_FOR_UPLINK."
  ];

  useEffect(() => {
    let currentLog = 0;
    const interval = setInterval(() => {
      if (currentLog < bootSequence.length) {
        setLogs(prev => [...prev, bootSequence[currentLog]]);
        currentLog++;
      } else {
        clearInterval(interval);
        setTimeout(onComplete, 800); // Final delay for dramatic effect
      }
    }, 250);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-[#05060a] flex items-center justify-center p-6 font-mono">
      <div className="max-w-md w-full">
        <div className="space-y-2 mb-8">
          {logs.map((log, i) => (
            <motion.div 
              initial={{ opacity: 0, x: -10 }} 
              animate={{ opacity: 1, x: 0 }} 
              key={i} 
              className="text-[10px] md:text-xs text-[#00f3ff] flex gap-3"
            >
              <span className="text-gray-700">[{i.toString().padStart(2, '0')}]</span>
              <span className="tracking-widest font-black uppercase">{log}</span>
            </motion.div>
          ))}
        </div>
        
        {/* Progress Bar */}
        <div className="h-1 w-full bg-white/5 relative overflow-hidden">
          <motion.div 
            initial={{ width: 0 }} 
            animate={{ width: "100%" }} 
            transition={{ duration: 2.5, ease: "linear" }}
            className="h-full bg-[#00f3ff] shadow-[0_0_15px_#00f3ff]"
          />
        </div>
      </div>
    </div>
  );
}