import { Cpu, Activity, Bot, Zap, Shield, Database } from "lucide-react"; 
import ProjectCard from "./ProjectCard"; 

const projects = [
  {
    title: "Career Catalyst",
    subtitle: "AI Multi-Agent Loop",
    desc: "Autonomous 4-agent orchestration engine (Analyst -> Strategist -> Writer -> Reviewer) designed to eliminate manual resume tailoring. Optimized via iterative LaTeX rendering to achieve 98% ATS compliance.",
    tech: ["Java Spring Boot", "Gemini 1.5", "Python", "LaTeX"],
    stats: "4-Agent Node Cluster", // Unified with Arshad_OS Telemetry
    statIcon: <Bot size={16} className="text-pink-400"/>, 
    link: "/project/careercatalyst", 
    github: "https://github.com/MohdArshad-cell/Career-Catalyst",
    color: "hover:border-pink-500/50"
  },
  {
    title: "FlashTix",
    subtitle: "High-Concurrency Engine",
    desc: "Engineered a high-surge ticketing platform using Redis Distributed Locks (LUA scripts) to solve race conditions. Scaled to sustain 5,000+ TPS with zero inventory leakage during stress-testing.",
    tech: ["Java Spring Boot", "Redis (LUA)", "PostgreSQL", "JMeter"],
    stats: "5,000+ TPS / Atomic", // Unified with Arshad_OS Telemetry
    statIcon: <Activity size={16} className="text-[#00f3ff]"/>,
    link: "/project/flashtix", 
    github: "https://github.com/MohdArshad-cell/FlashTix", 
    color: "hover:border-[#00f3ff]/50"
  },
  {
    title: "StreamFlow",
    subtitle: "Distributed Event Stream",
    desc: "Architected a fault-tolerant notification backbone using Kafka Consumer Groups. Implemented 3-step retry logic and Dead Letter Queues (DLQ) to ensure zero-loss delivery for 1M+ hourly alerts.",
    tech: ["Apache Kafka", "Redis LTrim/LPush", "WebSockets", "Java"],
    stats: "1M+ Events/Hr | Zero-Loss", // Unified with Arshad_OS Telemetry
    statIcon: <Cpu size={16} className="text-[#7000ff]"/>,
    link: "/project/streamflow", 
    github: "https://github.com/MohdArshad-cell/StreamFlow",
    color: "hover:border-[#7000ff]/50"
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 bg-[#05060a] relative overflow-hidden">
      {/* Background Decal: Section ID */}
      <div className="absolute right-10 top-20 text-[150px] font-black text-white/[0.02] select-none pointer-events-none uppercase">
        Systems
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-baseline gap-6 mb-20">
          <div className="flex flex-col">
            <span className="text-[#00f3ff] font-mono text-sm tracking-[0.5em] mb-2 uppercase">04_Deployment_Archives</span>
            <h2 className="text-5xl md:text-6xl font-black font-sans uppercase tracking-tight text-white">
              System_<span className="text-[#00f3ff]">Architecture</span>
            </h2>
          </div>
          <div className="h-px bg-gradient-to-r from-[#00f3ff]/50 to-transparent flex-grow hidden md:block mt-8"></div>
        </div>

        {/* System Dashboard Metadata */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 border-b border-white/5 pb-12">
           <div className="flex flex-col gap-1 border-l border-white/10 pl-4">
              <span className="text-[10px] text-gray-600 uppercase font-black tracking-widest">Global_Status</span>
              <span className="text-xs text-emerald-400 font-mono">ALL_SYSTEMS_NOMINAL</span>
           </div>
           <div className="flex flex-col gap-1 border-l border-white/10 pl-4">
              <span className="text-[10px] text-gray-600 uppercase font-black tracking-widest">Total_Ingestion</span>
              <span className="text-xs text-white font-mono">15.4M+_EVENTS_LOGGED</span>
           </div>
           <div className="flex flex-col gap-1 border-l border-white/10 pl-4">
              <span className="text-[10px] text-gray-600 uppercase font-black tracking-widest">Kernel_Version</span>
              <span className="text-xs text-[#00f3ff] font-mono">ARSHAD_OS_V1.2.0</span>
           </div>
           <div className="flex flex-col gap-1 border-l border-white/10 pl-4">
              <span className="text-[10px] text-gray-600 uppercase font-black tracking-widest">Node_Cluster</span>
              <span className="text-xs text-gray-300 font-mono">LKO_MAIN_MAINFRAME</span>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p, i) => (
            <ProjectCard key={i} project={p} index={i} />
          ))}
        </div>

        {/* Mission Persistence Footer */}
        <div className="mt-20 flex justify-center">
          <div className="px-6 py-3 bg-white/5 border border-white/10 flex items-center gap-4 group hover:border-[#00f3ff]/50 transition-all cursor-default">
            <Shield size={14} className="text-[#00f3ff] group-hover:animate-pulse" />
            <span className="text-[10px] text-gray-500 font-black uppercase tracking-[0.3em]">
              All_Architectures_Validated_Under_Load
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}