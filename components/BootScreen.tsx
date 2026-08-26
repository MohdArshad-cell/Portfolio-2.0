"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function BootScreen({ onComplete }: { onComplete: () => void }) {
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  
  const bootSequence = [
    "INITIALIZING_ARSHAD_OS_V1.2.0...",
    "LOADING_KERNEL_MODULES...",
    "MOUNTING_VIRTUAL_FILESYSTEM...",
    "SYNCING_LKO_MAINFRAME_CLOCK...",
    "CHECKING_CREDENTIALS: B.TECH_IT_2026",
    "ESTABLISHING_UPLINK: TATA_CONSULTANCY_SERVICES...",
    "DEPLOYING_HIREEASE_AGENTS...",
    "DECRYPTING_PORTFOLIO_DATA...",
    "SYSTEM_STABLE. READY_FOR_UPLINK."
  ];

  // Hex Matrix Background
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const hexChars = "0123456789ABCDEF".split("");
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];
    for (let x = 0; x < columns; x++) drops[x] = 1;

    const draw = () => {
      ctx.fillStyle = "rgba(5, 6, 10, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = "rgba(0, 243, 255, 0.15)";
      ctx.font = fontSize + "px monospace";
      
      for (let i = 0; i < drops.length; i++) {
        const text = hexChars[Math.floor(Math.random() * hexChars.length)];
        // Draw 0xHEX
        ctx.fillText("0x" + text, i * fontSize * 3, drops[i] * fontSize);
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const matrixInterval = setInterval(draw, 33);
    return () => clearInterval(matrixInterval);
  }, []);

  // Typewriter effect & sequence progression
  useEffect(() => {
    if (currentLineIndex >= bootSequence.length) {
      setTimeout(onComplete, 800);
      return;
    }

    const currentLine = bootSequence[currentLineIndex];
    let charIndex = 0;
    
    const typeInterval = setInterval(() => {
      if (charIndex <= currentLine.length) {
        setTypedText(currentLine.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setLogs(prev => [...prev, currentLine]);
        setTypedText("");
        // Random pause between lines
        setTimeout(() => setCurrentLineIndex(prev => prev + 1), Math.random() * 150 + 50);
      }
    }, 15); // Very fast typing speed

    return () => clearInterval(typeInterval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLineIndex]);

  // Jumpy Progress Bar
  useEffect(() => {
    let currentProgress = 0;
    const progressInterval = setInterval(() => {
      if (currentProgress < 100) {
        // Random jump between 1 and 15
        currentProgress += Math.floor(Math.random() * 15) + 1;
        if (currentProgress > 100) currentProgress = 100;
        setProgress(currentProgress);
      } else {
        clearInterval(progressInterval);
      }
    }, 150);

    return () => clearInterval(progressInterval);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-[#05060a] flex items-center justify-center p-6 font-mono overflow-hidden">
      
      {/* Background Matrix */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-50" />

      {/* CRT Scanline Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] opacity-20" />

      <div className="max-w-2xl w-full relative z-20">
        
        {/* ASCII Art Logo */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          className="text-[#00f3ff] mb-8 select-none hidden md:block"
        >
          <pre className="text-[10px] sm:text-xs leading-[1.2] font-black drop-shadow-[0_0_10px_rgba(0,243,255,0.5)]">
{`
    ___    ____  _____ __  _____    ____ 
   /   |  / __ \\/ ___// / / /   |  / __ \\
  / /| | / /_/ /\\__ \\/ /_/ / /| | / / / /
 / ___ |/ _, _/___/ / __  / ___ |/ /_/ / 
/_/  |_/_/ |_|/____/_/ /_/_/  |_/_____/  
                                         
`}
          </pre>
        </motion.div>

        {/* Logs Container */}
        <div className="space-y-1 mb-8 h-[250px] flex flex-col justify-end">
          {logs.map((log, i) => (
            <div key={i} className="text-xs md:text-sm text-gray-400 flex gap-3">
              <span className="text-gray-600">[{i.toString().padStart(2, '0')}]</span>
              <span className="tracking-wider uppercase">{log}</span>
            </div>
          ))}
          
          {/* Currently Typing Line */}
          {currentLineIndex < bootSequence.length && (
            <div className="text-xs md:text-sm text-[#00f3ff] flex gap-3 drop-shadow-[0_0_5px_rgba(0,243,255,0.8)]">
              <span className="text-[#00f3ff]/50">[{currentLineIndex.toString().padStart(2, '0')}]</span>
              <span className="tracking-wider uppercase">
                {typedText}
                <motion.span 
                  animate={{ opacity: [1, 0] }} 
                  transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                  className="inline-block w-2 h-4 bg-[#00f3ff] ml-1 align-middle"
                />
              </span>
            </div>
          )}
        </div>
        
        {/* Progress Bar & Percentage */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between text-xs text-[#00f3ff] font-bold tracking-widest drop-shadow-[0_0_5px_rgba(0,243,255,0.5)]">
            <span>BOOT_SEQUENCE</span>
            <span>{progress}%</span>
          </div>
          <div className="h-1 w-full bg-white/10 relative overflow-hidden">
            <div 
              style={{ width: \`\${progress}%\` }} 
              className="h-full bg-[#00f3ff] shadow-[0_0_15px_#00f3ff] transition-all duration-75"
            />
          </div>
        </div>
      </div>
    </div>
  );
}