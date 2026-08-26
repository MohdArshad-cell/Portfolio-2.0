import { Cpu, Activity, Bot, Shield } from "lucide-react"; 
import ProjectCard from "./ProjectCard"; 
import GitHubStats from "./GitHubStats";

const projects = [
  {
    title: "SentinelLedger",
    subtitle: "Distributed Financial Ledger Engine",
    desc: "Architected a high-throughput payment orchestrator enforcing strict append-only double-entry bookkeeping, Saga failure recovery, and embedded <15ms ONNX fraud evaluation.",
    tech: ["Java 21", "Spring Boot 3", "Apache Kafka", "PostgreSQL", "Redis Redlock", "ONNX"],
    stats: "10,000+ RPS | ACID Ledger",
    statIcon: <Activity size={16} className="text-emerald-400" />,
    link: "/project/sentinelledger",
    github: "https://github.com/MohdArshad-cell/SentinelLedger",
    image: "/asset/sentinelledger_arch.png",
    color: "hover:border-emerald-500/50"
  },
  {
    title: "FlashTix",
    subtitle: "High-Concurrency Ticketing Engine",
    desc: "Engineered a distributed booking platform handling 5,000+ RPS without overselling anomalies using atomic Redis Lua scripts, distributed locking, and HikariCP connection tuning.",
    tech: ["Java 21", "Spring Boot 3", "Redis (Lua/Redlock)", "PostgreSQL", "Prometheus", "Grafana"],
    stats: "5,000+ RPS | Zero Over-selling",
    statIcon: <Activity size={16} className="text-[#00f3ff]" />,
    link: "/project/flashtix",
    github: "https://github.com/MohdArshad-cell/FlashTix",
    image: "/asset/flashtix_arch.png",
    color: "hover:border-[#00f3ff]/50"
  },
  {
    title: "StreamFlow",
    subtitle: "Distributed Event Streaming Engine",
    desc: "Architected a fault-tolerant messaging backbone with Kafka custom partition hashing, Dead Letter Queues (DLQ) retry pipelines, and Redis write-through caching.",
    tech: ["Java", "Spring Boot", "Apache Kafka", "Redis", "MongoDB", "Zipkin", "Docker"],
    stats: "10,000+ Events/Sec | Zero Loss",
    statIcon: <Cpu size={16} className="text-[#7000ff]" />,
    link: "/project/streamflow",
    github: "https://github.com/MohdArshad-cell/StreamFlow",
    image: "/asset/streamflow_arch.png",
    color: "hover:border-[#7000ff]/50"
  },
  {
    title: "Career Catalyst",
    subtitle: "AI Document Compilation Engine",
    desc: "Engineered an asynchronous document compilation pipeline coupling Spring Boot with Python Gemini AI workers to compile structured JSON data into ATS-compliant LaTeX templates.",
    tech: ["Spring Boot", "Python", "Google Gemini API", "LaTeX", "Redis"],
    stats: "90%+ ATS Score | Non-blocking",
    statIcon: <Bot size={16} className="text-pink-400" />,
    link: "/project/careercatalyst",
    github: "https://github.com/MohdArshad-cell/Career-Catalyst",
    image: "/asset/careercatalyst_arch.png",
    color: "hover:border-pink-500/50"
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

        <GitHubStats />

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