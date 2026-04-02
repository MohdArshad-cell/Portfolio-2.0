"use client";
import { motion } from "framer-motion";
import { FileText, Download, Target, Activity, Zap, ShieldAlert, Cpu } from "lucide-react";

export default function Research() {
  return (
    <section id="research" className="py-24 px-6 bg-[#05060a]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="flex items-center gap-6 mb-16"
        >
          <div className="flex flex-col">
            <span className="text-emerald-400 font-mono text-sm tracking-[0.5em] mb-2 uppercase">05_Technical_Specification</span>
            <h2 className="text-5xl md:text-6xl font-black font-sans uppercase tracking-tight text-white">
              C2_<span className="text-emerald-400">Sentinal</span>_Arch
            </h2>
          </div>
          <div className="h-px bg-gradient-to-r from-emerald-400/50 to-transparent flex-grow hidden md:block mt-8"></div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-[#0b0d17]/40 border border-emerald-500/20 p-8 md:p-12 overflow-hidden group"
        >
          {/* Industrial CRT Scanline Overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px]" />
          
          {/* Corner Decals */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-[60px]" />
          <div className="absolute bottom-0 left-0 w-2 h-24 bg-emerald-400/40" />
          <div className="absolute bottom-0 left-0 w-24 h-2 bg-emerald-400/40" />

          <div className="flex flex-col lg:flex-row gap-12 relative z-10">
            {/* Metadata Block */}
            <div className="lg:w-1/3 space-y-8">
              <div className="p-8 bg-black/40 border border-emerald-500/20 flex flex-col items-center text-center group-hover:border-emerald-400/40 transition-colors">
                <div className="p-4 bg-emerald-500/10 rounded-none mb-6 text-emerald-400">
                  <Cpu size={48} strokeWidth={1.5} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400/60 mb-2">Systems_Architect</span>
                <h4 className="text-white font-bold text-lg mb-4">Mohd Arshad</h4>
                <div className="flex flex-col gap-2 w-full text-[10px] font-mono uppercase tracking-widest text-gray-500">
                  <div className="flex justify-between border-b border-white/5 pb-1">
                    <span>Registry</span>
                    <span className="text-emerald-400">LKO-UP-IND</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-1">
                    <span>Status</span>
                    <span className="text-emerald-400">Active_C2</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-1">
                    <span>Core</span>
                    <span className="text-white">Gemini_3F</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Date</span>
                    <span className="text-white">April 2026</span>
                  </div>
                </div>
              </div>

              {/* Research Metrics HUD */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 border border-white/10">
                  <Target size={14} className="text-emerald-400 mb-2" />
                  <div className="text-[9px] text-gray-500 uppercase font-black">Normalization</div>
                  <div className="text-sm text-white font-bold tracking-tighter">Z-Score</div>
                </div>
                <div className="p-4 bg-white/5 border border-white/10">
                  <ShieldAlert size={14} className="text-emerald-400 mb-2" />
                  <div className="text-[9px] text-gray-500 uppercase font-black">Posturing</div>
                  <div className="text-sm text-white font-bold tracking-tighter">DEFCON_Logic</div>
                </div>
              </div>
            </div>

            {/* Content & Technical Abstract */}
            <div className="lg:w-2/3 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <Zap size={16} className="text-emerald-400 fill-current" />
                  <span className="text-xs font-black uppercase tracking-[0.4em] text-emerald-400">Strategic_Protocol_Briefing</span>
                </div>
                
                <h3 className="text-3xl md:text-4xl font-black mb-8 leading-tight text-white uppercase tracking-tight">
                  Deterministic <span className="text-emerald-400">OSINT</span> Analysis via Weighted PCA & Sigmoid Forecasting
                </h3>
                
                <div className="space-y-6 text-gray-400 leading-relaxed font-medium">
                  <p>
                    Engineered an autonomous Command & Control (C2) interface that transposes 
                    unstructured geopolitical signals into a measurable <span className="text-white font-bold underline decoration-emerald-500/40">GPTI (Geopolitical Tension Index)</span>. 
                    The system utilizes <span className="text-white">Gemini 3 Flash</span> for zero-shot tactical extraction across five global theaters.
                  </p>
                  <div className="grid md:grid-cols-2 gap-6 my-6">
                    <div className="border-l-2 border-emerald-500/30 pl-4 py-2">
                        <h5 className="text-emerald-400 text-xs font-black uppercase mb-1">Mathematical Kernel</h5>
                        <p className="text-xs">Implemented Weighted Principal Component Analysis (PCA) to normalize Kinetic and Narrative signals into a singular strategic index.</p>
                    </div>
                    <div className="border-l-2 border-emerald-500/30 pl-4 py-2">
                        <h5 className="text-emerald-400 text-xs font-black uppercase mb-1">Panic Activation</h5>
                        <p className="text-xs">Developed non-linear Sigmoid activation models to predict civil unrest thresholds and high-velocity economic fallout (NIFTY/Crude).</p>
                    </div>
                  </div>
                  <p className="text-sm italic">
                    The framework provides real-time narrative integrity audits to detect propaganda swarms and triggers automated threat posturing via localized DEFCON protocols.
                  </p>
                </div>
              </div>

              {/* Action Trigger Link */}
              <div className="mt-12 pt-8 border-t border-white/10 flex items-center justify-between">
                <div className="hidden md:block">
                  <span className="text-[9px] text-gray-600 uppercase font-black tracking-widest block">Operational_Report</span>
                  <span className="text-[11px] text-emerald-400/60 font-mono">MD_SENTINEL_2026_v3</span>
                </div>
                <a 
                  href="https://raw.githubusercontent.com/MohdArshad-cell/Portfolio-2.0/a2f4520ab852250d17e0b8a3e11df4a2eab1eaff/public/asset/Geosentinal.pdf" 
                  className="group/btn relative px-8 py-4 bg-emerald-500 text-black font-black uppercase tracking-widest text-xs flex items-center gap-4 transition-all hover:bg-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.2)]"
                >
                  <Download size={16} className="group-hover/btn:animate-bounce" />
                  Access_Full_Methodology
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}