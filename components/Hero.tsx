"use client";
import { useEffect, useRef } from "react";
import Typed from "typed.js";
import { Github, FileText, Server, Code2, Brain, Zap, ShieldCheck, Activity } from "lucide-react"; 
import { motion } from "framer-motion";

export default function Hero() {
  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [
  "Kafka_Systems...",
  "Neural_Loops...", 
  "High_TPS_Core...",
  "Fault_Tolerance...",
  "Cloud_Infra...",
],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 2000,
      startDelay: 800,
      loop: true,
      showCursor: true,
      cursorChar: "█",
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <section id="about" className="min-h-screen flex items-center justify-center pt-24 pb-12 px-6 relative bg-[#05060a] overflow-hidden">
      {/* Dynamic Background: Grid + Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#7000ff]/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#00f3ff]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-16 items-center relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, x: -30 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Status HUD Header */}
          <div className="flex items-center gap-6 mb-8">
            <div className="flex items-center gap-2 font-mono text-[#00f3ff] text-[10px] uppercase tracking-[0.3em] bg-[#00f3ff]/5 px-3 py-1 border border-[#00f3ff]/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00f3ff] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00f3ff]"></span>
              </span>
              System_Status: Online
            </div>
            <div className="text-gray-600 font-mono text-[10px] uppercase tracking-widest hidden sm:block">
              Node: LKO_V1.1_MARCH_2026
            </div>
          </div>

          <h1 className="text-6xl sm:text-7xl md:text-8xl font-black font-sans mb-6 tracking-tighter leading-[0.9] uppercase text-white">
            MOHD <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f3ff] via-[#7000ff] to-[#00f3ff] bg-[length:200%_auto] animate-gradient">
              ARSHAD
            </span>
          </h1>

          <div className="text-sm md:text-2xl text-gray-400 font-mono mb-10 flex items-center gap-3 min-h-[1.5em] border-l-4 border-[#00f3ff] pl-6 whitespace-nowrap overflow-hidden">
  <span className="text-[#00f3ff] font-black uppercase tracking-tighter flex-shrink-0">
    Architecting_
  </span>
  <span ref={el} className="text-white truncate"></span>
</div>

          <p className="text-gray-400 leading-relaxed text-base md:text-lg max-w-xl mb-12 font-medium">
            Backend Architect focused on building the high-frequency systems of the next decade. 
            Currently transitioning to <span className="text-white font-bold">TCS Ninja</span> while scaling 
            <span className="text-[#00f3ff]"> HireEase</span> and researching 
            <span className="text-white"> GeoSentinel</span> AI frameworks.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 font-mono text-xs font-black tracking-widest">
            <a 
              href="https://github.com/MohdArshad-cell" 
              target="_blank" 
              className="flex items-center justify-center gap-3 px-8 py-4 bg-[#00f3ff] text-black hover:bg-[#00f3ff]/80 transition-all rounded-none shadow-[0_0_20px_rgba(0,243,255,0.3)]"
            >
              <Github size={16} /> 
              <span>:: EXPLORE_CODEBASE</span>
            </a>

            <a 
              href="https://raw.githubusercontent.com/MohdArshad-cell/Portfolio-2.0/a2f4520ab852250d17e0b8a3e11df4a2eab1eaff/public/asset/ARSHAD.pdf" 
              target="_blank"
              className="flex items-center justify-center gap-3 px-8 py-4 border border-white/10 text-white hover:border-[#7000ff] hover:text-[#7000ff] transition-all rounded-none bg-white/5"
            >
              <FileText size={16} /> 
              <span>:: ACCESS_DOSSIER</span>
            </a>
          </div>
        </motion.div>

        {/* Right: Technical Intelligence HUD */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, x: 30 }} 
          animate={{ opacity: 1, scale: 1, x: 0 }} 
          transition={{ delay: 0.2, duration: 1 }}
          className="relative hidden lg:flex justify-center"
        >
          <div className="relative z-10 bg-[#0b0d17]/80 backdrop-blur-xl p-10 border border-white/10 rounded-none w-full max-w-md shadow-2xl overflow-hidden">
            {/* Scanline Effect */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px]" />
            
            <div className="flex justify-between items-center mb-10 border-b border-white/10 pb-6">
              <div className="flex items-center gap-3">
                <ShieldCheck size={14} className="text-[#00f3ff]" />
                <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">/bin/skills_matrix_v1.2</span>
              </div>
              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-none bg-red-500/50"/>
                <div className="w-2 h-2 rounded-none bg-[#00f3ff]/50 animate-pulse"/>
              </div>
            </div>
            
            <div className="space-y-6">
               <div className="bg-black/40 p-5 border border-white/5 hover:border-[#00f3ff]/30 transition-all group">
                  <div className="flex items-center justify-between mb-4">
                    <Server className="text-gray-500 group-hover:text-[#00f3ff]" size={20}/>
                    <span className="text-[10px] font-mono text-[#00f3ff]/60">98% Load_Capacity</span>
                  </div>
                  <div className="text-xs font-mono text-white mb-2 tracking-tight">Backend_Engine: Java/Kafka/Redis</div>
                  <div className="h-[2px] w-full bg-white/5">
                    <motion.div initial={{ width: 0 }} animate={{ width: "95%" }} transition={{ duration: 1.5 }} className="h-full bg-[#00f3ff]" />
                  </div>
               </div>
               
               <div className="bg-black/40 p-5 border border-white/5 hover:border-[#7000ff]/30 transition-all group">
                  <div className="flex items-center justify-between mb-4">
                    <Brain className="text-gray-500 group-hover:text-[#7000ff]" size={20}/>
                    <span className="text-[10px] font-mono text-[#7000ff]/60">RAG_Sync: Active</span>
                  </div>
                  <div className="text-xs font-mono text-white mb-2 tracking-tight">Neural_Intelligence: Multi-Agent</div>
                  <div className="h-[2px] w-full bg-white/5">
                    <motion.div initial={{ width: 0 }} animate={{ width: "88%" }} transition={{ duration: 1.5, delay: 0.2 }} className="h-full bg-[#7000ff]" />
                  </div>
               </div>

               <div className="bg-black/40 p-5 border border-white/5 flex items-center gap-4">
                  <Activity size={18} className="text-emerald-400 animate-pulse" />
                  <div className="flex flex-col">
                    <span className="text-[9px] text-gray-500 uppercase font-black">Current_Mission</span>
                    <span className="text-[11px] text-white font-mono uppercase tracking-tighter">Plotting. | TCS_Xplore_2026</span>
                  </div>
               </div>
            </div>

            {/* Aesthetic Corner Decals */}
            <div className="absolute bottom-0 right-0 w-8 h-8 border-r border-b border-[#00f3ff]/40" />
            <div className="absolute top-0 left-0 w-8 h-8 border-l border-t border-white/10" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}