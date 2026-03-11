"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal, ShieldCheck, Cpu } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [time, setTime] = useState("");
  const navItems = ["About", "Skills", "Experience", "Projects", "Research"];

  // Real-time System Clock (Syncs with Arshad_OS kernel time)
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }} 
      animate={{ y: 0, opacity: 1 }} 
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#05060a]/80 backdrop-blur-xl"
    >
      {/* Top Metadata Strip */}
      <div className="hidden lg:flex justify-between px-8 py-1.5 border-b border-white/5 bg-black/40">
        <div className="flex gap-6 items-center">
          <div className="flex items-center gap-2 text-[8px] font-black text-emerald-400 uppercase tracking-[0.3em]">
            <ShieldCheck size={10} />
            Secure_Connection_Active
          </div>
          <div className="flex items-center gap-2 text-[8px] font-black text-gray-600 uppercase tracking-[0.3em]">
            <Cpu size={10} />
            Instance: LKO_V1.1_MAINFRAME
          </div>
        </div>
        <div className="text-[9px] font-mono font-black text-[#00f3ff]/60 uppercase tracking-widest">
          SYS_TIME: {time}
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-5">
        <Link href="/" className="flex items-center gap-3 text-white font-black text-xl tracking-tighter group">
          <div className="p-2 bg-[#00f3ff]/10 border border-[#00f3ff]/20 group-hover:bg-[#00f3ff]/20 transition-all">
            <Terminal size={18} className="text-[#00f3ff]"/>
          </div>
          <span className="group-hover:text-[#00f3ff] transition-colors">ARSHAD_OS</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-10">
          <div className="flex gap-8 font-mono text-[11px] font-black tracking-widest text-gray-500">
            {navItems.map((item, index) => (
              <Link 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="hover:text-white transition-colors relative group py-2"
              >
                <span className="text-[#00f3ff] mr-2 opacity-60">0{index + 1}</span>
                {item.toUpperCase()}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-[#00f3ff] group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          <Link 
            href="#contact" 
            className="relative px-6 py-2.5 bg-white text-black font-black text-[11px] uppercase tracking-[0.2em] transition-all hover:bg-[#00f3ff] hover:shadow-[0_0_20px_rgba(0,243,255,0.4)]"
          >
            ./CONNECT_PROT
          </Link>
        </div>

        {/* Mobile Toggle Placeholder (Can add Hamburger here if needed) */}
        <div className="lg:hidden text-[#00f3ff]">
           <Terminal size={24} />
        </div>
      </div>
    </motion.nav>
  );
}