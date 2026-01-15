"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Github, Cpu, Database, Server, Bot, Layers, Zap } from "lucide-react";
import { motion } from "framer-motion";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

// ✅ UPDATED PROJECT DATA
const projects = {
  // 1. CAREER CATALYST (New "Brahmastra" Project)
  careercatalyst: {
    title: "Career Catalyst",
    subtitle: "Multi-Agent AI Resume Architect",
    desc: "Autonomous multi-agent system (Tailor, Evaluator, Optimizer) that iteratively refines resumes to achieve 90+ ATS scores.",
    content: "This system goes beyond simple text generation by implementing a 'Human-in-the-Loop' architecture using AI Agents. It features a Hybrid Microservices design: A Java Spring Boot Orchestrator manages user sessions, while a Python FastAPI Microservice handles the AI 'Chain-of-Thought' processing and high-fidelity LaTeX-to-PDF compilation. The AI loop consists of three agents: a 'Tailor' that rewrites content based on JD, an 'Evaluator' (ATS Simulator) that scores the draft, and an 'Optimizer' that fixes identified gaps iteratively.",
    tech: ["Java Spring Boot", "Python (FastAPI)", "Google Gemini 1.5", "LaTeX Engine", "Docker", "React"],
    stats: { 
      performance: "4-Agent Loop", 
      latency: "Hybrid Arch", 
      scale: "90+ ATS Score" 
    },
    github: "https://github.com/mohdarshad-cell/ai-powered-career-catalyst",
    image: "/asset/careercatalyst-architecture.png" 
  },

  // 2. FLASHTIX (Concurrency Project)
  flashtix: {
    title: "FlashTix",
    subtitle: "High-Concurrency Ticketing Engine",
    desc: "Backend system engineered to handle 5,000+ requests per second with zero double-bookings.",
    content: "The core challenge was race conditions during flash sales. I implemented Optimistic Locking using JPA @Version annotation to prevent data inconsistency at the database level. To further offload the DB, I architected a Write-Through Redis caching strategy with Distributed Locks (Redlock concept), where inventory checks happen in-memory, reducing DB hits by ~60% and ensuring zero overselling.",
    tech: ["Java Spring Boot", "Redis (Distributed Locks)", "PostgreSQL", "JMeter", "Docker"],
    stats: { 
      performance: "5k req/s", 
      latency: "99.99% Consistency", 
      scale: "Zero Oversell" 
    },
    github: "https://github.com/MohdArshad-cell/FlashTix-Backend",
    image: "/asset/flashtix-architecture.png" 
  },

  // 3. STREAMFLOW (Distributed Systems Project)
  streamflow: {
    title: "StreamFlow",
    subtitle: "Distributed Notification Service",
    desc: "Event-driven microservice capable of processing 1M+ notifications/hour with zero data loss.",
    content: "Designed to decouple notification generation from delivery using the Pub/Sub model. Producers push events to Apache Kafka topics (partitioned for scale). Consumer services pick these up and dispatch emails/SMS asynchronously. To ensure reliability, I implemented a Dead Letter Queue (DLQ) mechanism for failed messages and used MongoDB for flexible payload storage.",
    tech: ["Apache Kafka", "WebSockets (STOMP)", "MongoDB", "Java Spring Boot", "Zipkin"],
    stats: { 
      performance: "1M+ Events/Hr", 
      latency: "<50ms Delivery", 
      scale: "DLQ Reliability" 
    },
    github: "https://github.com/MohdArshad-cell/stream-flow-",
    image: "/asset/streamflow-architecture.png" 
  }
};

export default function ProjectDetails() {
  const params = useParams();
  const id = params.id as string;
  const project = projects[id as keyof typeof projects];

  if (!project) return (
    <div className="min-h-screen bg-[#0b0d17] flex flex-col items-center justify-center text-red-500 font-mono gap-4">
      <div>SYSTEM_ERROR: PROJECT_NOT_FOUND // ID: {id}</div>
      <Link href="/" className="text-[#00f3ff] hover:underline">../RETURN_HOME</Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0b0d17] text-gray-300 font-sans selection:bg-[#00f3ff] selection:text-black pb-24">
      
      {/* Header Image Placeholder */}
      <div className="h-[40vh] w-full bg-gradient-to-b from-[#15192b] to-[#0b0d17] relative flex items-center justify-center border-b border-white/5">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,243,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,243,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00f3ff] to-[#7000ff] z-10 px-4 text-center tracking-tight">
          {project.title}
        </h1>
      </div>

      <div className="max-w-4xl mx-auto px-6 -mt-20 relative z-20">
        <Link href="/#projects" className="inline-flex items-center gap-2 text-[#00f3ff] hover:underline mb-8 font-mono bg-[#0b0d17]/80 px-4 py-2 rounded backdrop-blur border border-white/10">
          <ArrowLeft size={16} /> ../RETURN_ROOT
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8 md:p-12 rounded-2xl border-t-4 border-[#00f3ff]"
        >
          <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">{project.subtitle}</h2>
              <p className="font-mono text-xs text-gray-500">SYS_ID: {id.toUpperCase()}</p>
            </div>
            <a href={project.github} target="_blank" className="flex items-center gap-2 px-4 py-2 bg-[#00f3ff]/10 rounded-full text-[#00f3ff] hover:bg-[#00f3ff] hover:text-black transition-all text-sm font-mono border border-[#00f3ff]/20">
              <Github size={18} /> VIEW_REPO
            </a>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {/* Stat 1 */}
            <div className="p-4 bg-[#0b0d17] rounded border border-white/5 hover:border-[#7000ff]/50 transition-colors group">
              {id === 'careercatalyst' ? <Bot className="text-[#7000ff] mb-2 group-hover:scale-110 transition-transform" /> : <Cpu className="text-[#7000ff] mb-2 group-hover:scale-110 transition-transform" />}
              <div className="text-xl font-bold text-white">{project.stats.performance}</div>
              <div className="text-[10px] font-mono text-gray-500">ARCHITECTURE / THROUGHPUT</div>
            </div>
            {/* Stat 2 */}
            <div className="p-4 bg-[#0b0d17] rounded border border-white/5 hover:border-green-400/50 transition-colors group">
              {id === 'careercatalyst' ? <Layers className="text-green-400 mb-2 group-hover:scale-110 transition-transform" /> : <Server className="text-green-400 mb-2 group-hover:scale-110 transition-transform" />}
              <div className="text-xl font-bold text-white">{project.stats.latency}</div>
              <div className="text-[10px] font-mono text-gray-500">LATENCY / DESIGN</div>
            </div>
            {/* Stat 3 */}
            <div className="p-4 bg-[#0b0d17] rounded border border-white/5 hover:border-[#00f3ff]/50 transition-colors group">
              {id === 'careercatalyst' ? <Zap className="text-[#00f3ff] mb-2 group-hover:scale-110 transition-transform" /> : <Database className="text-[#00f3ff] mb-2 group-hover:scale-110 transition-transform" />}
              <div className="text-xl font-bold text-white">{project.stats.scale}</div>
              <div className="text-[10px] font-mono text-gray-500">KEY METRIC</div>
            </div>
          </div>

          {/* --- ZOOMABLE ARCHITECTURE DIAGRAM --- */}
          <div className="mb-12">
            <h3 className="text-[#00f3ff] font-mono text-lg mb-4">BLUEPRINT_VISUALIZATION</h3>
            <div className="border border-white/10 rounded-xl overflow-hidden bg-black/50 p-2">
              <Zoom>
                <img 
                  src={project.image} 
                  alt="System Architecture" 
                  className="w-full object-cover rounded-lg hover:opacity-90 transition-opacity cursor-zoom-in"
                  onError={(e) => {
                    // Fallback if image not found
                    e.currentTarget.src = "https://placehold.co/1200x630/1e1e1e/FFF?text=Architecture+Diagram+Coming+Soon";
                  }}
                />
              </Zoom>
              <p className="text-center text-xs font-mono text-gray-500 mt-2">CLICK_TO_ENLARGE</p>
            </div>
          </div>

          <div className="prose prose-invert max-w-none mb-12">
            <h3 className="text-[#00f3ff] font-mono text-lg mb-4">SYSTEM_ARCHITECTURE_DETAILS</h3>
            <p className="leading-relaxed text-gray-300 text-lg">{project.content}</p>
          </div>

          <div>
            <h3 className="text-[#00f3ff] font-mono text-lg mb-4">TECH_STACK</h3>
            <div className="flex flex-wrap gap-3">
              {project.tech.map(t => (
                <span key={t} className="px-3 py-1 bg-white/5 border border-white/10 rounded text-sm font-mono text-gray-300 hover:border-white/30 transition-colors cursor-default">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}