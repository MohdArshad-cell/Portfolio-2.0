"use client";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, ExternalLink } from "lucide-react";

const experiences = [
  {
    company: "AplyEase",
    website: "https://aplyeaseportal.onrender.com/", 
    role: "Software Engineer",
    date: "Mar 2025 - Present",
    desc: "Land Your Dream Job Faster. AI-powered job applications with human expertise.", 
    points: [
      "Engineered a Multi-Agent AI System (Tailor, Evaluate, Optimize) using Google Gemini models, achieving 90+ ATS compatibility scores.",
      "Acted as Interim Team Lead, orchestrating client-employee allocations and mentoring new recruits on AI-driven delivery workflows.",
      "Facilitated client success by utilizing AI agents to generate tailored resumes, streamlining the application process for global clients (USA)."
    ],
    tech: ["Google Gemini", "Multi-Agent Systems", "Team Leadership", "Client Delivery"]
  }
];

export default function Experience() {
  return (
    <section id="experience" className="py-16 md:py-24 px-4 md:px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 md:gap-4 mb-10 md:mb-16"
        >
          <span className="text-[#00f3ff] font-mono text-lg md:text-xl">03.</span>
          {/* ✅ Font size reduced on mobile: text-2xl -> md:text-5xl */}
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold font-sans break-words">
            Professional_Log
          </h2>
          <div className="h-px bg-[#00f3ff]/30 flex-grow max-w-[100px] md:max-w-xs ml-2 md:ml-4"></div>
        </motion.div>

        <div className="relative space-y-8 md:space-y-12">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="relative md:pl-8"
            >
              {/* ✅ Padding reduced: p-5 on mobile */}
              <div className={`glass-card p-5 md:p-8 rounded-2xl border border-white/5 hover:border-[#00f3ff]/50 transition-all group relative overflow-hidden`}>
                
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#00f3ff]/20 group-hover:bg-[#00f3ff] transition-colors"></div>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-6 gap-2 md:gap-4">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-[#00f3ff] transition-colors flex flex-wrap items-center gap-2">
                      {exp.role} 
                      <span className="text-[#00f3ff]">@ </span>
                      <a 
                        href={exp.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[#00f3ff] hover:underline flex items-center gap-1 break-all"
                      >
                        {exp.company}
                        <ExternalLink size={14} className="opacity-70" />
                      </a>
                    </h3>
                    <div className="flex items-center gap-2 text-xs md:text-sm font-mono text-gray-500 mt-1">
                      <Calendar size={12} />
                      {exp.date}
                    </div>
                  </div>
                </div>

                <p className="text-gray-400 text-sm md:text-base mb-6 italic pl-4 border-l-2 border-[#00f3ff]/30 leading-relaxed">
                  {exp.desc}
                </p>

                <ul className="space-y-4 mb-8">
                  {exp.points.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-gray-300 text-sm leading-relaxed">
                      <ArrowRight className="text-[#00f3ff] mt-1 flex-shrink-0" size={14} />
                      <span dangerouslySetInnerHTML={{ 
                        __html: point
                          .replace("Multi-Agent AI System", "<strong class='text-white'>Multi-Agent AI System</strong>")
                          .replace("Interim Team Lead", "<strong class='text-white'>Interim Team Lead</strong>")
                          .replace("90+ ATS compatibility scores", "<strong class='text-[#00f3ff]'>90+ ATS compatibility scores</strong>")
                       }} />
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 pt-6 border-t border-white/5">
                  {exp.tech.map((t) => (
                    <span key={t} className="px-2 py-1 md:px-3 text-[10px] md:text-xs font-mono bg-[#0b0d17] border border-white/10 text-gray-400 group-hover:border-[#00f3ff]/30 group-hover:text-[#00f3ff] transition-colors rounded">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}