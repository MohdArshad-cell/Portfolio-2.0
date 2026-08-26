"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Github, Cpu, Database, Server, Bot, Layers, Zap } from "lucide-react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import Mermaid from "@/components/Mermaid";

interface ProjectData {
  title: string;
  subtitle: string;
  github: string;
  stats: {
    performance: string;
    latency: string;
    scale: string;
  };
  mermaidCode?: string;
  image?: string;
  content: string;
  tech: string[];
}

export default function ProjectClient({ project, id }: { project: ProjectData, id: string }) {
  if (!project) return (
    <div className="min-h-screen font-sans selection:bg-[#00f3ff] selection:text-black pb-24 flex flex-col items-center justify-center text-red-500 font-mono gap-4">
      <div>SYSTEM_ERROR: PROJECT_NOT_FOUND // ID: {id}</div>
      <Link href="/" className="text-[#00f3ff] hover:underline">../RETURN_HOME</Link>
    </div>
  );

  return (
    <div className="min-h-screen font-sans selection:bg-[#00f3ff] selection:text-black pb-24">
      
      {/* Header Image Placeholder */}
      <div className="h-[40vh] w-full bg-gradient-to-b from-[#15192b] to-transparent relative flex items-center justify-center border-b border-black/5 dark:border-white/5">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,243,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,243,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00f3ff] to-[#7000ff] z-10 px-4 text-center tracking-tight">
          {project.title}
        </h1>
      </div>

      <div className="max-w-4xl mx-auto px-6 -mt-20 relative z-20">
        <Link href="/#projects" className="inline-flex items-center gap-2 text-[#00f3ff] hover:underline mb-8 font-mono bg-white/80 dark:bg-[#0b0d17]/80 px-4 py-2 rounded backdrop-blur border border-black/10 dark:border-white/10">
          <ArrowLeft size={16} /> ../RETURN_ROOT
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card bg-white/40 dark:bg-[#15192b]/60 p-8 md:p-12 rounded-2xl border-t-4 border-[#00f3ff]"
        >
          <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{project.subtitle}</h2>
              <p className="font-mono text-xs text-gray-500">SYS_ID: {id.toUpperCase()}</p>
            </div>
            <a href={project.github} target="_blank" className="flex items-center gap-2 px-4 py-2 bg-[#00f3ff]/10 rounded-full text-[#00f3ff] hover:bg-[#00f3ff] hover:text-black transition-all text-sm font-mono border border-[#00f3ff]/20">
              <Github size={18} /> VIEW_REPO
            </a>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="p-4 bg-white dark:bg-[#0b0d17] rounded border border-black/5 dark:border-white/5 hover:border-[#7000ff]/50 transition-colors group">
              {id === 'careercatalyst' ? <Bot className="text-[#7000ff] mb-2 group-hover:scale-110 transition-transform" /> : <Cpu className="text-[#7000ff] mb-2 group-hover:scale-110 transition-transform" />}
              <div className="text-xl font-bold text-gray-900 dark:text-white">{project.stats.performance}</div>
              <div className="text-[10px] font-mono text-gray-500">ARCHITECTURE / THROUGHPUT</div>
            </div>
            <div className="p-4 bg-white dark:bg-[#0b0d17] rounded border border-black/5 dark:border-white/5 hover:border-green-400/50 transition-colors group">
              {id === 'careercatalyst' ? <Layers className="text-green-400 mb-2 group-hover:scale-110 transition-transform" /> : <Server className="text-green-400 mb-2 group-hover:scale-110 transition-transform" />}
              <div className="text-xl font-bold text-gray-900 dark:text-white">{project.stats.latency}</div>
              <div className="text-[10px] font-mono text-gray-500">LATENCY / DESIGN</div>
            </div>
            <div className="p-4 bg-white dark:bg-[#0b0d17] rounded border border-black/5 dark:border-white/5 hover:border-[#00f3ff]/50 transition-colors group">
              {id === 'careercatalyst' ? <Zap className="text-[#00f3ff] mb-2 group-hover:scale-110 transition-transform" /> : <Database className="text-[#00f3ff] mb-2 group-hover:scale-110 transition-transform" />}
              <div className="text-xl font-bold text-gray-900 dark:text-white">{project.stats.scale}</div>
              <div className="text-[10px] font-mono text-gray-500">KEY METRIC</div>
            </div>
          </div>

          {/* --- ZOOMABLE ARCHITECTURE DIAGRAM --- */}
          <div className="mb-12">
            <h3 className="text-[#00f3ff] font-mono text-lg mb-4">BLUEPRINT_VISUALIZATION</h3>
            <div className="border border-black/10 dark:border-white/10 rounded-xl overflow-hidden bg-gray-50 dark:bg-[#05060a] p-6 relative">
              {project.mermaidCode ? (
                <Mermaid chart={project.mermaidCode} />
              ) : (
                <Zoom>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={project.image} 
                    alt="System Architecture" 
                    className="w-full object-cover rounded-lg hover:opacity-90 transition-opacity cursor-zoom-in"
                  />
                </Zoom>
              )}
              <p className="text-center text-[10px] font-mono text-gray-500 mt-4 uppercase tracking-[0.2em]">INTERACTIVE_SYSTEM_GRAPH_RENDERED</p>
            </div>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none mb-12">
            <h3 className="text-[#00f3ff] font-mono text-lg mb-4">SYSTEM_ARCHITECTURE_DETAILS</h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300 text-lg">{project.content}</p>
          </div>

          <div>
            <h3 className="text-[#00f3ff] font-mono text-lg mb-4">TECH_STACK</h3>
            <div className="flex flex-wrap gap-3">
              {project.tech.map((t: string) => (
                <span key={t} className="px-3 py-1 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded text-sm font-mono text-gray-700 dark:text-gray-300 hover:border-black/30 dark:hover:border-white/30 transition-colors cursor-default">
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
