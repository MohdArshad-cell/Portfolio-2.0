"use client";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, ExternalLink, Briefcase, Target, Zap } from "lucide-react";

const experiences = [
  {
    company: "HireEase", // Rebranded from AplyEase
    website: "https://hireease.in", 
    role: "Software Engineering Intern",
    date: "March 2025 — Present",
    status: "ACTIVE_MISSION",
    desc: "Revolutionizing global recruitment through autonomous Multi-Agent orchestration and high-density AI profiling.", 
    points: [
      "Architected a <strong class='text-white'>Multi-Agent AI System</strong> (Tailor, Evaluate, Optimize) leveraging Google Gemini 1.5 Pro, achieving consistent <strong class='text-[#00f3ff]'>90+ ATS compatibility scores</strong>.",
      "Served as <strong class='text-white'>Interim Technical Lead</strong>, managing cross-functional workflows and optimizing internal AI-agent delivery pipelines for high-velocity output.",
      "Engineered automated resume generation engines that facilitate sub-second document tailoring for global enterprise clients (US/UK markets).",
      "Optimized prompt-chaining logic to reduce token latency by 35%, ensuring real-time responsiveness in the recruitment portal."
    ],
    tech: ["Gemini 1.5 Pro", "LLM Orchestration", "Node.js", "System Design", "Prompt Engineering"]
  }
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6 relative bg-[#05060a] overflow-hidden">
      {/* Structural Background Decor */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00f3ff]/20 to-transparent" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-baseline gap-6 mb-20"
        >
          <div className="flex flex-col">
            <span className="text-[#00f3ff] font-mono text-xs tracking-[0.5em] mb-2 uppercase">03_Deployment_History</span>
            <h2 className="text-5xl md:text-6xl font-black font-sans uppercase tracking-tight text-white">
              Professional_<span className="text-[#00f3ff]">Log</span>
            </h2>
          </div>
          <div className="h-px bg-[#00f3ff]/30 flex-grow hidden md:block mt-8"></div>
        </motion.div>

        <div className="space-y-16">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative group"
            >
              {/* Industrial Side-Marker */}
              <div className="absolute -left-6 top-0 bottom-0 w-1 bg-white/5 group-hover:bg-[#00f3ff]/40 transition-all hidden lg:block" />

              <div className="bg-[#0b0d17]/40 border border-white/5 backdrop-blur-xl p-8 md:p-12 hover:border-[#00f3ff]/30 transition-all duration-500 relative overflow-hidden">
                {/* CRT Scanline Overlay */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px]" />
                
                {/* Header Metadata */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12 border-b border-white/5 pb-8">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="px-3 py-1 bg-[#00f3ff]/10 border border-[#00f3ff]/30 text-[#00f3ff] text-[9px] font-black uppercase tracking-[0.2em]">
                        {exp.status}
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 font-mono text-[10px] uppercase">
                        <Calendar size={12} />
                        {exp.date}
                      </div>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter">
                      {exp.role} <span className="text-[#00f3ff]/40">::</span> 
                      <a 
                        href={exp.website} 
                        target="_blank" 
                        className="text-[#00f3ff] hover:text-white transition-colors ml-3"
                      >
                        {exp.company}
                      </a>
                    </h3>
                  </div>

                  <a 
                    href={exp.website} 
                    target="_blank"
                    className="p-4 bg-white/5 border border-white/10 text-white hover:text-[#00f3ff] hover:border-[#00f3ff]/50 transition-all"
                  >
                    <ExternalLink size={20} />
                  </a>
                </div>

                <div className="grid lg:grid-cols-[1fr_2fr] gap-12">
                  {/* Left: Mission Profile */}
                  <div className="space-y-8">
                    <div className="p-6 bg-black/40 border-l-2 border-[#00f3ff]/30">
                      <div className="flex items-center gap-2 text-[#00f3ff] mb-3">
                        <Target size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Mission_Profile</span>
                      </div>
                      <p className="text-gray-400 text-sm leading-relaxed italic font-medium">
  &quot;{exp.desc}&quot;
</p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {exp.tech.map((t) => (
                        <span key={t} className="px-3 py-1.5 text-[10px] font-mono bg-[#00f3ff]/5 border border-[#00f3ff]/10 text-[#00f3ff]/80 uppercase tracking-widest">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right: Technical Objectives */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-2">
                      <Zap size={14} className="text-yellow-500 fill-current" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Execution_Metrics</span>
                    </div>
                    <ul className="space-y-6">
                      {exp.points.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-5 group/item">
                          <ArrowRight className="text-[#00f3ff] mt-1.5 flex-shrink-0 group-hover/item:translate-x-1 transition-transform" size={14} />
                          <span 
                            className="text-gray-400 text-[15px] leading-relaxed group-hover/item:text-gray-200 transition-colors"
                            dangerouslySetInnerHTML={{ __html: point }} 
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}