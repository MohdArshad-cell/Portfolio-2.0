"use client";
import { motion } from "framer-motion";
import { Server, Brain, Database, Shield, Cpu, Activity } from "lucide-react";

const skills = [
  {
    category: "Distributed Backend Architecture",
    icon: <Server className="text-[#00f3ff]" size={32} />,
    // Emphasizing the FlashTix/StreamFlow expertise
    items: [
      "Java Spring Boot 3 & Security",
      "Apache Kafka (Event-Driven)",
      "Redis Distributed Locking (LUA)",
      "System Design & Scalability",
      "WebSockets (STOMP Protocol)",
      "Microservices Orchestration"
    ],
    color: "border-[#00f3ff]/40",
    glow: "shadow-[0_0_20px_rgba(0,243,255,0.1)]"
  },
  {
    category: "Neural Intelligence & RAG",
    icon: <Brain className="text-[#7000ff]" size={32} />,
    // Reflecting Career Catalyst and GeoSentinel research
    items: [
      "Multi-Agent Orchestration",
      "Gemini 1.5 & OpenAI SDKs",
      "RAG Architecture (Vector DBs)",
      "Python (AI Engine Development)",
      "DistilBERT & Sentiment PCA",
      "Prompt Engineering Logic"
    ],
    color: "border-[#7000ff]/40",
    glow: "shadow-[0_0_20px_rgba(112,0,255,0.1)]"
  },
  {
    category: "Infrastructure & Data Integrity",
    icon: <Database className="text-emerald-400" size={32} />,
    // Emphasizing the TCS-ready OCI and DevOps skills
    items: [
      "PostgreSQL (Optimistic Locking)",
      "MongoDB (Data Sharding)",
      "Oracle Cloud (OCI Certified)",
      "Docker & K8s Deployment",
      "CI/CD (GitHub Actions)",
      "Redis Caching Strategies"
    ],
    color: "border-emerald-400/40",
    glow: "shadow-[0_0_20px_rgba(52,211,153,0.1)]"
  }
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 relative bg-[#05060a]">
      {/* Decorative Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="flex items-center gap-6 mb-20"
        >
          <div className="flex flex-col">
            <span className="text-[#00f3ff] font-mono text-sm tracking-[0.5em] mb-2 uppercase">02_Capabilities</span>
            <h2 className="text-5xl md:text-6xl font-black font-sans uppercase tracking-tight text-white">
              Technical_<span className="text-[#00f3ff]">Stack</span>
            </h2>
          </div>
          <div className="h-px bg-gradient-to-r from-[#00f3ff]/50 to-transparent flex-grow hidden md:block mt-8"></div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-10">
          {skills.map((skill, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className={`relative bg-[#0b0d17]/50 backdrop-blur-xl p-8 border border-white/10 rounded-none border-t-4 ${skill.color} ${skill.glow} hover:bg-[#0f1220] transition-all duration-500 group overflow-hidden`}
            >
              {/* Animated Corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-white/5 to-transparent rotate-45 translate-x-8 -translate-y-8" />
              
              <div className="relative z-10">
                <div className="bg-black/40 p-5 rounded-none w-fit mb-8 border border-white/5 group-hover:border-[#00f3ff]/30 transition-all duration-300">
                  {skill.icon}
                </div>
                
                <h3 className="text-xl font-black mb-8 font-sans uppercase tracking-widest text-white group-hover:text-[#00f3ff] transition-colors">
                  {skill.category}
                </h3>
                
                <div className="grid grid-cols-1 gap-3">
                  {skill.items.map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <div className="h-1 w-1 bg-[#00f3ff]/50 group-hover:bg-[#00f3ff]" />
                      <span className="text-[13px] font-mono text-gray-400 group-hover:text-gray-100 transition-colors">
                        {item}
                      </span>
                    </div>
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