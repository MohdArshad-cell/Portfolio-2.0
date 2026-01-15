"use client";
import { useEffect, useRef } from "react";
import Typed from "typed.js";
// ✅ Added 'Brain' to imports for AI section
import { Github, FileText, Server, Code2, Brain } from "lucide-react"; 
import { motion } from "framer-motion";

export default function Hero() {
  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [
        "Distributed Systems...",
        "Multi-Agent Orchestration...", // 🔥 Added this for Career Catalyst
        "High-Frequency Engines...",
        "Hybrid AI Architectures...",
      ],
      typeSpeed: 40,
      backSpeed: 30,
      backDelay: 1500,
      loop: true,
      cursorChar: "█",
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <section id="about" className="min-h-screen flex items-center justify-center pt-20 px-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-[#7000ff]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl w-full grid md:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left: Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-2 font-mono text-[#00f3ff] text-sm mb-4">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00f3ff] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00f3ff]"></span>
            </span>
            System_Status: Online
          </div>

          <h1 className="text-5xl md:text-7xl font-bold font-sans mb-6 tracking-tight">
            MOHD <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f3ff] to-[#7000ff]">
              ARSHAD
            </span>
          </h1>

          <div className="text-xl md:text-2xl text-gray-400 font-mono mb-8 h-8 flex items-center">
            <span className="text-[#00f3ff] mr-3">&gt; Architecting</span>
            <span ref={el} className="text-gray-200"></span>
          </div>

          {/* 🔥 Updated Description */}
          <p className="text-gray-400 leading-relaxed max-w-lg mb-8 border-l-2 border-[#00f3ff]/30 pl-6">
            Backend Engineer & Systems Architect. I engineer fault-tolerant 
            microservices, optimize high-concurrency engines (5k+ TPS), 
            and build <span className="text-gray-200">autonomous Multi-Agent AI systems</span>.
          </p>
          
          <div className="flex flex-wrap gap-4 font-mono">
            <a href="https://github.com/MohdArshad-cell" target="_blank" className="flex items-center gap-2 px-6 py-3 bg-[#00f3ff]/10 border border-[#00f3ff] text-[#00f3ff] hover:bg-[#00f3ff] hover:text-black transition-all group">
              <Github size={18} /> 
              <span>:: VIEW_CODE</span>
            </a>
            <a href="/asset/ARSHAD.pdf" download className="flex items-center gap-2 px-6 py-3 border border-gray-700 text-gray-300 hover:border-[#7000ff] hover:text-[#7000ff] transition-all">
              <FileText size={18} /> 
              <span>:: DOWNLOAD_CV</span>
            </a>
          </div>
        </motion.div>

        {/* Right: Tech Stack Visualizer */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ delay: 0.2, duration: 0.8 }}
          className="relative flex justify-center"
        >
          <div className="relative z-10 glass-card p-8 rounded-2xl border border-white/10 w-full max-w-md">
            <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
              <span className="font-mono text-xs text-gray-500">/usr/bin/skills_matrix</span>
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"/>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"/>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"/>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
               {/* Tech Box 1: Backend */}
               <div className="bg-[#0b0d17] p-4 rounded border border-gray-800 flex flex-col items-center gap-2 hover:border-[#00f3ff] transition-colors group">
                  <Server className="text-gray-500 group-hover:text-[#00f3ff]" size={28}/>
                  <span className="text-xs font-mono text-gray-400">Backend</span>
               </div>
               
               {/* Tech Box 2: GenAI (Replaced Database) */}
               <div className="bg-[#0b0d17] p-4 rounded border border-gray-800 flex flex-col items-center gap-2 hover:border-[#7000ff] transition-colors group">
                  <Brain className="text-gray-500 group-hover:text-[#7000ff]" size={28}/>
                  <span className="text-xs font-mono text-gray-400">GenAI / Agents</span>
               </div>
               
               {/* Tech Box 3: Polyglot Stack */}
               <div className="col-span-2 bg-[#0b0d17] p-4 rounded border border-gray-800 flex items-center justify-center gap-3 hover:border-green-400 transition-colors group">
                  <Code2 className="text-gray-500 group-hover:text-green-400" size={24}/>
                  {/* Updated to reflect Java + Python hybrid nature */}
                  <span className="text-xs font-mono text-gray-400">Java / Python / Kafka</span>
               </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}