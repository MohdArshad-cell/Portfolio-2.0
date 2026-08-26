"use client";
import { motion } from "framer-motion";
import { Award, Briefcase, GraduationCap, CheckCircle } from "lucide-react";

const milestones = [
  {
    year: "Oct 2026",
    title: "TCS Software Engineer",
    subtitle: "Tata Consultancy Services (TCS Xplore)",
    desc: "Transitioning to enterprise-scale systems architecture. Focused on high-availability backend solutions and cloud integrations.",
    icon: <Briefcase size={16} className="text-[#00f3ff]" />,
    color: "border-[#00f3ff]"
  },
  {
    year: "2026",
    title: "OCI Certified",
    subtitle: "Oracle Cloud Infrastructure",
    desc: "Achieved certification in cloud architecture, validating expertise in deploying scalable, secure, and fault-tolerant cloud solutions.",
    icon: <Award size={16} className="text-[#7000ff]" />,
    color: "border-[#7000ff]"
  },
  {
    year: "2025 - 2026",
    title: "HireEase & FlashTix",
    subtitle: "High-Concurrency Architectures",
    desc: "Engineered platforms processing 5,000+ TPS using Redis LUA locks, and built AI multi-agent pipelines achieving 98% ATS accuracy.",
    icon: <CheckCircle size={16} className="text-emerald-400" />,
    color: "border-emerald-500"
  },
  {
    year: "2024",
    title: "B.Tech Computer Science",
    subtitle: "SRMSCET, Bareilly",
    desc: "Graduated with 80% marks. Core focus on Data Structures, Algorithms, and Distributed Systems.",
    icon: <GraduationCap size={16} className="text-pink-400" />,
    color: "border-pink-500"
  }
];

export default function Timeline() {
  return (
    <section id="achievements" className="py-24 px-6 bg-[#05060a] relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="flex flex-col mb-20 items-center text-center">
          <span className="text-[#00f3ff] font-mono text-sm tracking-[0.5em] mb-2 uppercase">05_Milestones</span>
          <h2 className="text-5xl md:text-6xl font-black font-sans uppercase tracking-tight text-white">
            Operational_<span className="text-[#00f3ff]">History</span>
          </h2>
        </div>

        <div className="relative border-l border-white/10 ml-4 md:ml-0 md:pl-0">
          {milestones.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="mb-12 relative pl-8 md:pl-0"
            >
              <div className={`md:flex items-center justify-between w-full`}>
                <div className="order-1 md:w-5/12 hidden md:flex justify-end pr-8">
                  {i % 2 === 0 ? (
                    <div className="text-right">
                      <div className="text-[#00f3ff] font-mono text-xs mb-1 font-black tracking-widest">{item.year}</div>
                      <h3 className="text-xl font-bold text-white">{item.title}</h3>
                      <div className="text-gray-500 text-sm font-mono mt-1">{item.subtitle}</div>
                      <p className="text-gray-400 text-sm mt-3 leading-relaxed text-readable">{item.desc}</p>
                    </div>
                  ) : null}
                </div>
                
                <div className="z-20 flex items-center order-1 bg-[#05060a] shadow-xl w-10 h-10 rounded-full border border-white/10 absolute left-[-20px] md:left-1/2 md:-translate-x-1/2 justify-center shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                  {item.icon}
                </div>
                
                <div className="order-1 md:w-5/12 md:pl-8">
                  {i % 2 !== 0 ? (
                    <div className="text-left">
                      <div className="text-[#00f3ff] font-mono text-xs mb-1 font-black tracking-widest">{item.year}</div>
                      <h3 className="text-xl font-bold text-white">{item.title}</h3>
                      <div className="text-gray-500 text-sm font-mono mt-1">{item.subtitle}</div>
                      <p className="text-gray-400 text-sm mt-3 leading-relaxed text-readable">{item.desc}</p>
                    </div>
                  ) : (
                    <div className="text-left md:hidden">
                      <div className="text-[#00f3ff] font-mono text-xs mb-1 font-black tracking-widest">{item.year}</div>
                      <h3 className="text-xl font-bold text-white">{item.title}</h3>
                      <div className="text-gray-500 text-sm font-mono mt-1">{item.subtitle}</div>
                      <p className="text-gray-400 text-sm mt-3 leading-relaxed text-readable">{item.desc}</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
