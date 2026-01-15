"use client";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, ExternalLink } from "lucide-react";

const experiences = [
  {
    company: "AplyEase",
    website: "https://aplyeaseportal.onrender.com/", // ✅ Add valid URL here
    role: "Software Engineer",
    date: "Mar 2025 - Present",
    // ✅ Updated Tagline from Website Screenshot
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
    <section id="experience" className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Heading */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="text-[#00f3ff] font-mono text-xl">03.</span>
          <h2 className="text-4xl md:text-5xl font-bold font-sans">Professional_Log</h2>
          <div className="h-px bg-[#00f3ff]/30 flex-grow max-w-xs ml-4"></div>
        </motion.div>

        <div className="relative space-y-12">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="relative md:pl-8"
            >
              <div className={`glass-card p-8 rounded-2xl border border-white/5 hover:border-[#00f3ff]/50 transition-all group relative overflow-hidden`}>
                
                {/* Decorative Side Bar */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#00f3ff]/20 group-hover:bg-[#00f3ff] transition-colors"></div>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white group-hover:text-[#00f3ff] transition-colors flex flex-wrap items-center gap-2">
                      {exp.role} 
                      <span className="text-[#00f3ff]">@ </span>
                      {/* ✅ Company Name is now a Clickable Link */}
                      <a 
                        href={exp.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[#00f3ff] hover:underline flex items-center gap-1"
                      >
                        {exp.company}
                        <ExternalLink size={16} className="opacity-70" />
                      </a>
                    </h3>
                    <div className="flex items-center gap-2 text-sm font-mono text-gray-500 mt-1">
                      <Calendar size={14} />
                      {exp.date}
                    </div>
                  </div>
                </div>

                <p className="text-gray-400 mb-6 italic pl-4 border-l-2 border-[#00f3ff]/30">
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
                    <span key={t} className="px-3 py-1 text-xs font-mono bg-[#0b0d17] border border-white/10 text-gray-400 group-hover:border-[#00f3ff]/30 group-hover:text-[#00f3ff] transition-colors rounded">
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