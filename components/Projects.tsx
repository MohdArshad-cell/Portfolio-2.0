"use client";
import { motion } from "framer-motion";
import { Github, ExternalLink, Cpu, Activity, Bot } from "lucide-react"; 
import Link from "next/link"; 

const projects = [
  {
    title: "Career Catalyst",
    subtitle: "Multi-Agent AI Resume Architect",
    desc: "Autonomous multi-agent system (Tailor, Evaluator, Optimizer) that iteratively refines resumes to achieve 90+ ATS scores. Uses Hybrid Java-Python architecture.",
    tech: ["Java Spring Boot", "Gemini 1.5", "Python", "LaTeX"],
    stats: "Multi-Agent Loop",
    statIcon: <Bot size={16} className="text-pink-400"/>, 
    link: "/project/careercatalyst", 
    color: "hover:border-pink-500/50"
  },
  {
    title: "FlashTix",
    subtitle: "High-Concurrency Ticketing System",
    desc: "Event booking engine handling 5,000+ req/s. Implements Optimistic Locking (JPA) and Redis Distributed Locks for inventory safety.",
    tech: ["Java Spring Boot", "Redis", "PostgreSQL", "JMeter"],
    stats: "5k+ TPS / Zero Oversell",
    statIcon: <Activity size={16} className="text-[#00f3ff]"/>,
    link: "/project/flashtix", 
    color: "hover:border-[#00f3ff]/50"
  },
  {
    title: "StreamFlow",
    subtitle: "Distributed Notification Service",
    desc: "Event-driven microservice decoupling producers via Kafka partitions. Ensures zero data loss with Dead Letter Queues (DLQ).",
    tech: ["Apache Kafka", "WebSockets", "MongoDB", "Java"],
    stats: "1M+ Events/Hr",
    statIcon: <Cpu size={16} className="text-[#7000ff]"/>,
    link: "/project/streamflow", 
    color: "hover:border-[#7000ff]/50"
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-16 md:py-24 px-4 md:px-6 bg-[#0b0d17]/50">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 md:gap-4 mb-10 md:mb-16"
        >
          <span className="text-[#00f3ff] font-mono text-lg md:text-xl">04.</span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold font-sans tracking-tight">
            System_Architecture
          </h2>
          <div className="h-px bg-[#00f3ff]/30 flex-grow max-w-[80px] md:max-w-xs ml-2 md:ml-4"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`glass-card p-6 md:p-8 rounded-2xl relative group border border-white/5 transition-all duration-300 ${p.color}`}
            >
              <div className="absolute top-4 right-4 md:top-6 md:right-6 opacity-20 group-hover:opacity-100 transition-opacity">
                {/* ✅ FIX: Removed 'size={...} md:size={...}' 
                   ✅ ADDED: 'w-5 h-5 md:w-6 md:h-6' for responsive sizing via Tailwind
                */}
                <Github className="text-gray-400 hover:text-white cursor-pointer w-5 h-5 md:w-6 md:h-6"/>
              </div>

              <div className="font-mono text-[10px] md:text-xs text-[#00f3ff] mb-2">SYS_ID_00{i+1}</div>
              <h3 className="text-xl md:text-2xl font-bold mb-1">{p.title}</h3>
              <p className="text-xs md:text-sm font-mono text-gray-500 mb-4 md:mb-6">{p.subtitle}</p>
              
              <p className="text-gray-400 leading-relaxed text-sm mb-6 md:mb-8 line-clamp-3">
                {p.desc}
              </p>

              <div className="space-y-4 md:space-y-6">
                <div className="flex flex-wrap gap-2">
                  {p.tech.map(t => (
                    <span key={t} className="text-[10px] md:text-xs font-mono px-2 py-1 rounded bg-[#0b0d17] border border-white/10 text-gray-400">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="pt-4 md:pt-6 border-t border-white/5 flex justify-between items-center">
                  <div className="flex items-center gap-2 font-mono text-[10px] md:text-xs text-gray-300">
                    {p.statIcon}
                    <span>{p.stats}</span>
                  </div>
                  
                  <Link href={p.link} className="text-[10px] md:text-xs font-mono text-[#00f3ff] hover:underline flex items-center gap-1 cursor-pointer">
                    VIEW_BLUEPRINT <ExternalLink size={12}/>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}