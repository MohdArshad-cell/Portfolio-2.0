"use client";
import { motion } from "framer-motion";
import { Server, Brain, Database } from "lucide-react";

const skills = [
  {
    category: "Distributed Systems",
    icon: <Server className="text-[#00f3ff]" size={32} />,
    // Added "System Design" to emphasize architecture skills
    items: ["Java Spring Boot 3", "Apache Kafka", "Microservices", "System Design", "WebSockets (STOMP)", "Redis Pub/Sub"],
    color: "border-[#00f3ff]/20"
  },
  {
    category: "AI & Data Engineering",
    icon: <Brain className="text-[#7000ff]" size={32} />,
    // UPDATED: Added "Multi-Agent Systems", "Gemini/OpenAI", "LLM Orchestration"
    items: ["Python", "Multi-Agent Systems", "Gemini 1.5 / OpenAI", "LLM Orchestration", "DistilBERT", "Vector DBs"],
    color: "border-[#7000ff]/20"
  },
  {
    category: "Core Infrastructure",
    icon: <Database className="text-green-400" size={32} />,
    // Kept solid backend/infra skills
    items: ["PostgreSQL (ACID)", "MongoDB (Sharding)", "Docker & Kubernetes", "AWS (EC2/S3)", "CI/CD Actions", "Terraform"],
    color: "border-green-400/20"
  }
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="text-[#00f3ff] font-mono text-xl">02.</span>
          <h2 className="text-4xl md:text-5xl font-bold font-sans">Technical_Stack</h2>
          <div className="h-px bg-[#00f3ff]/30 flex-grow max-w-xs ml-4"></div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {skills.map((skill, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`glass-card p-8 rounded-2xl border-t-4 ${skill.color} hover:bg-[#15192b]/80 transition-colors group`}
            >
              <div className="bg-[#0b0d17] p-4 rounded-full w-fit mb-6 border border-white/5 group-hover:border-white/20 transition-colors">
                {skill.icon}
              </div>
              <h3 className="text-2xl font-bold mb-6 font-sans">{skill.category}</h3>
              <div className="flex flex-wrap gap-3">
                {skill.items.map((item) => (
                  <span key={item} className="px-3 py-1.5 text-xs font-mono bg-white/5 border border-white/10 rounded text-gray-300 group-hover:text-white transition-colors">
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}