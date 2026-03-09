import { Cpu, Activity, Bot } from "lucide-react"; 
import ProjectCard from "./ProjectCard"; // Import your new client component
// Notice: No framer-motion import here. No "use client" here.

const projects = [
  {
    title: "Career Catalyst",
    subtitle: "Multi-Agent AI Resume Architect",
    desc: "Built an autonomous multi-agent pipeline that eliminates manual resume tailoring. Iteratively optimizes formatting and keywords against job descriptions, increasing candidate ATS pass rates to 90%+.",
    tech: ["Java Spring Boot", "Gemini 1.5", "Python", "LaTeX"],
    stats: "Multi-Agent Loop",
    statIcon: <Bot size={16} className="text-pink-400"/>, 
    link: "/project/careercatalyst", 
    github: "https://github.com/MohdArshad-cell/Career-Catalyst",
    color: "hover:border-pink-500/50"
  },
  {
    title: "FlashTix",
    subtitle: "High-Concurrency Ticketing System",
    desc: "Engineered a high-surge ticketing platform to solve the 'double-booking' revenue loss problem during flash sales. Scaled to 5,000+ TPS using Redis Distributed Locks, ensuring 100% inventory accuracy and zero customer drop-offs.",
    tech: ["Java Spring Boot", "Redis", "PostgreSQL", "JMeter"],
    stats: "5k+ TPS / Zero Oversell",
    statIcon: <Activity size={16} className="text-[#00f3ff]"/>,
    link: "/project/flashtix", 
    github: "https://github.com/MohdArshad-cell/FlashTix", 
    color: "hover:border-[#00f3ff]/50"
  },
  {
    title: "StreamFlow",
    subtitle: "Distributed Notification Service",
    desc: "Architected a fault-tolerant notification backbone to process 1M+ critical business alerts per hour. Eliminated alert drop-off via Kafka DLQs, guaranteeing delivery for high-stakes transactional data.",
    tech: ["Apache Kafka", "WebSockets", "MongoDB", "Java"],
    stats: "1M+ Events/Hr",
    statIcon: <Cpu size={16} className="text-[#7000ff]"/>,
    link: "/project/streamflow", 
    github: "https://github.com/MohdArshad-cell/StreamFlow",
    color: "hover:border-[#7000ff]/50"
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-16 md:py-24 px-4 md:px-6 bg-[#0b0d17]/50">
      <div className="max-w-7xl mx-auto">
        {/* We removed motion from the header here to keep it server-side. 
            If you desperately want the header to slide in, create a separate <AnimatedHeader> client component. 
            For a developer portfolio, raw speed beats a sliding title. */}
        <div className="flex items-center gap-2 md:gap-4 mb-10 md:mb-16">
          <span className="text-[#00f3ff] font-mono text-lg md:text-xl">04.</span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold font-sans tracking-tight">
            System_Architecture
          </h2>
          <div className="h-px bg-[#00f3ff]/30 flex-grow max-w-[80px] md:max-w-xs ml-2 md:ml-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((p, i) => (
            <ProjectCard key={i} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}