"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, ShieldCheck, Cpu, X, Menu } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [time, setTime] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const navItems = ["About", "Skills", "Experience", "Projects", "Research"];

  // Real-time System Clock
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Active Section Detection via IntersectionObserver
  useEffect(() => {
    const sectionIds = ["about", "skills", "experience", "projects", "research", "contact"];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <motion.nav 
        initial={{ y: -100, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 w-full z-50 border-b border-black/5 dark:border-white/5 bg-white/80 dark:bg-[#05060a]/80 backdrop-blur-xl"
      >
        {/* Top Metadata Strip */}
        <div className="hidden lg:flex justify-between px-8 py-1.5 border-b border-black/5 dark:border-white/5 bg-gray-100/40 dark:bg-black/40">
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
          <Link href="/" className="flex items-center gap-3 text-black dark:text-white font-black text-xl tracking-tighter group">
            <div className="p-2 bg-[#00f3ff]/10 border border-[#00f3ff]/20 group-hover:bg-[#00f3ff]/20 transition-all">
              <Terminal size={18} className="text-[#00f3ff]"/>
            </div>
            <span className="group-hover:text-[#00f3ff] transition-colors">ARSHAD_OS</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            <div className="flex gap-8 font-mono text-[11px] font-black tracking-widest text-gray-500">
              {navItems.map((item, index) => {
                const isActive = activeSection === item.toLowerCase();
                return (
                  <Link 
                    key={item} 
                    href={`#${item.toLowerCase()}`} 
                    className={`transition-colors relative group py-2 ${isActive ? 'text-white' : 'hover:text-white'}`}
                  >
                    <span className={`mr-2 transition-colors ${isActive ? 'text-[#00f3ff] opacity-100' : 'text-[#00f3ff] opacity-60'}`}>
                      0{index + 1}
                    </span>
                    {item.toUpperCase()}
                    {/* Active indicator: persistent underline */}
                    <span className={`absolute bottom-0 left-0 h-px bg-[#00f3ff] transition-all duration-300 ${isActive ? 'w-full shadow-[0_0_8px_rgba(0,243,255,0.5)]' : 'w-0 group-hover:w-full'}`} />
                  </Link>
                );
              })}
            </div>

            <Link 
              href="#contact" 
              className={`relative px-6 py-2.5 font-black text-[11px] uppercase tracking-[0.2em] transition-all ${
                activeSection === 'contact' 
                  ? 'bg-[#00f3ff] text-black shadow-[0_0_20px_rgba(0,243,255,0.4)]' 
                  : 'bg-white text-black hover:bg-[#00f3ff] hover:shadow-[0_0_20px_rgba(0,243,255,0.4)]'
              }`}
            >
              ./CONNECT_PROT
            </Link>
          </div>

          {/* Mobile Toggle Button */}
          <button 
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-[#00f3ff] p-2 border border-[#00f3ff]/20 bg-[#00f3ff]/5 hover:bg-[#00f3ff]/10 transition-all relative z-[60]"
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            <AnimatePresence mode="wait">
              {mobileOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={22} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={22} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Full-Screen Overlay Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[55] bg-white/98 dark:bg-[#05060a]/98 backdrop-blur-2xl flex flex-col items-center justify-center lg:hidden overflow-hidden"
          >
            {/* Scanline Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px]" />
            
            {/* Corner Decals */}
            <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-[#00f3ff]/20" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-[#00f3ff]/20" />

            {/* System Status */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="absolute top-28 flex items-center gap-3 text-[9px] font-black text-[#00f3ff]/40 uppercase tracking-[0.4em]"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00f3ff] opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#00f3ff]" />
              </span>
              Navigation_Module_Active
            </motion.div>

            {/* Nav Links */}
            <nav className="flex flex-col items-center gap-2 relative z-10">
              {navItems.map((item, index) => {
                const isActive = activeSection === item.toLowerCase();
                return (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 40 }}
                    transition={{ delay: 0.15 + index * 0.08, duration: 0.4, ease: "easeOut" }}
                  >
                    <Link
                      href={`#${item.toLowerCase()}`}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-4 py-4 px-8 group transition-all ${isActive ? 'bg-[#00f3ff]/10' : 'hover:bg-[#00f3ff]/5'}`}
                    >
                      <span className={`font-mono text-sm font-black transition-colors ${isActive ? 'text-[#00f3ff]' : 'text-[#00f3ff]/40 group-hover:text-[#00f3ff]'}`}>
                        0{index + 1}
                      </span>
                      <span className={`text-2xl font-black uppercase tracking-widest transition-colors ${isActive ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
                        {item}
                      </span>
                      <span className={`h-px bg-[#00f3ff] transition-all duration-300 ml-2 ${isActive ? 'w-8' : 'w-0 group-hover:w-8'}`} />
                    </Link>
                  </motion.div>
                );
              })}

              {/* Connect CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.15 + navItems.length * 0.08 + 0.1, duration: 0.4 }}
                className="mt-6"
              >
                <Link
                  href="#contact"
                  onClick={() => setMobileOpen(false)}
                  className="px-10 py-4 bg-[#00f3ff] text-black font-black text-xs uppercase tracking-[0.3em] flex items-center gap-3 shadow-[0_0_30px_rgba(0,243,255,0.2)] hover:bg-white transition-all"
                >
                  ./CONNECT_PROT
                </Link>
              </motion.div>
            </nav>

            {/* Bottom System Info */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="absolute bottom-12 flex flex-col items-center gap-3"
            >
              <div className="text-[9px] font-mono font-black text-gray-700 uppercase tracking-[0.3em]">
                ARSHAD_OS_V1.2 :: MOBILE_INTERFACE
              </div>
              <div className="h-px w-20 bg-gradient-to-r from-transparent via-[#00f3ff]/30 to-transparent" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}