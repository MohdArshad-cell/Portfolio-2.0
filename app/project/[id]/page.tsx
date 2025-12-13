"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Github, Cpu, Database, Server } from "lucide-react";
import { motion } from "framer-motion";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

// ✅ DATA STRUCTURE WITH IMAGES
const projects = {
  geosentinel: {
    title: "GeoSentinel",
    subtitle: "Real-Time Geopolitical Risk AI",
    desc: "A bi-modal system fusing kinetic data (ACLED) and narrative sentiment to predict conflict escalation.",
    content: "GeoSentinel solves the problem of lagging indicators in political risk analysis. By using a Hybrid AI Engine, it processes thousands of news articles daily using DistilBERT to gauge sentiment, while simultaneously tracking physical conflict data. The two streams are merged using PCA-based dynamic weighting, ensuring that the final risk score reflects the dominant driver of tension.",
    tech: ["Python", "DistilBERT", "Scikit-learn", "Streamlit", "Pandas"],
    stats: { 
      performance: "92% Accuracy", 
      latency: "200ms Latency", 
      scale: "50k+ Data Points" 
    },
    github: "https://github.com/mohdarshad-cell/geosentinal",
    // Make sure 'architecture.png' is in your public/asset folder
    image: "/asset/architecture.png" 
  },
  flashtix: {
    title: "FlashTix",
    subtitle: "High-Concurrency Ticketing Engine",
    desc: "Backend system engineered to handle 5,000+ requests per second with zero double-bookings.",
    content: "The core challenge was race conditions during flash sales. I implemented Optimistic Locking using JPA @Version annotation to prevent data inconsistency. To reduce database load, I architected a Write-Through Redis caching strategy, where inventory checks happen in-memory, reducing DB hits by 60%.",
    tech: ["Java Spring Boot", "Redis", "PostgreSQL", "JMeter", "Docker"],
    stats: { 
      performance: "5k req/s", 
      latency: "99.99% Uptime", 
      scale: "85% Cache Hit" 
    },
    github: "#",
    // Placeholder image until you create a diagram for FlashTix
    image: "/asset/flashtix-architecture.png" 
  },
  streamflow: {
    title: "StreamFlow",
    subtitle: "Distributed Notification Service",
    desc: "Event-driven microservice capable of processing 1M+ notifications/hour.",
    content: "Designed to decouple notification generation from delivery. Producers push events to Apache Kafka topics. Consumer services pick these up and dispatch emails/SMS asynchronously. Real-time in-app updates are delivered via WebSockets (STOMP protocol).",
    tech: ["Apache Kafka", "WebSockets", "MongoDB", "Java", "Spring Boot"],
    stats: { 
      performance: "1M+ Events/Hr", 
      latency: "<50ms Latency", 
      scale: "Sharded DB" 
    },
    github: "#",
  
    image: "/asset/streamflow-architecture.png" 
  }
};

export default function ProjectDetails() {
  const params = useParams();
  const id = params.id as string;
  const project = projects[id as keyof typeof projects];

  if (!project) return <div className="min-h-screen bg-[#0b0d17] flex items-center justify-center text-red-500 font-mono">SYSTEM_ERROR: PROJECT_NOT_FOUND // ID: {id}</div>;

  return (
    <div className="min-h-screen bg-[#0b0d17] text-gray-300 font-sans selection:bg-[#00f3ff] selection:text-black pb-24">
      
      {/* Header Image Placeholder */}
      <div className="h-[40vh] w-full bg-gradient-to-b from-[#15192b] to-[#0b0d17] relative flex items-center justify-center border-b border-white/5">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,243,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,243,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00f3ff] to-[#7000ff] z-10 px-4 text-center">
          {project.title}
        </h1>
      </div>

      <div className="max-w-4xl mx-auto px-6 -mt-20 relative z-20">
        <Link href="/" className="inline-flex items-center gap-2 text-[#00f3ff] hover:underline mb-8 font-mono bg-[#0b0d17]/80 px-4 py-2 rounded backdrop-blur">
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
            <div className="p-4 bg-[#0b0d17] rounded border border-white/5 hover:border-[#7000ff]/50 transition-colors">
              <Cpu className="text-[#7000ff] mb-2" />
              <div className="text-xl font-bold text-white">{project.stats.performance}</div>
              <div className="text-[10px] font-mono text-gray-500">PERFORMANCE</div>
            </div>
            <div className="p-4 bg-[#0b0d17] rounded border border-white/5 hover:border-green-400/50 transition-colors">
              <Server className="text-green-400 mb-2" />
              <div className="text-xl font-bold text-white">{project.stats.latency}</div>
              <div className="text-[10px] font-mono text-gray-500">LATENCY / UPTIME</div>
            </div>
            <div className="p-4 bg-[#0b0d17] rounded border border-white/5 hover:border-[#00f3ff]/50 transition-colors">
              <Database className="text-[#00f3ff] mb-2" />
              <div className="text-xl font-bold text-white">{project.stats.scale}</div>
              <div className="text-[10px] font-mono text-gray-500">DATA SCALE</div>
            </div>
          </div>

          {/* --- NEW: ZOOMABLE ARCHITECTURE DIAGRAM --- */}
          <div className="mb-12">
            <h3 className="text-[#00f3ff] font-mono text-lg mb-4">BLUEPRINT_VISUALIZATION</h3>
            <div className="border border-white/10 rounded-xl overflow-hidden bg-black/50 p-2">
              <Zoom>
                <img 
                  src={project.image} 
                  alt="System Architecture" 
                  className="w-full object-cover rounded-lg hover:opacity-90 transition-opacity cursor-zoom-in"
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
                <span key={t} className="px-3 py-1 bg-white/5 border border-white/10 rounded text-sm font-mono text-gray-300 hover:border-white/30 transition-colors">
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