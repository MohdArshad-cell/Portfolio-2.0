"use client";
import { motion } from "framer-motion";
import { Github, ExternalLink, Activity } from "lucide-react"; 
import Link from "next/link"; 
import { ReactNode } from "react";

// Define the types so TypeScript doesn't yell at you
interface ProjectProps {
  title: string;
  subtitle: string;
  desc: string;
  tech: string[];
  stats: string;
  statIcon: ReactNode;
  link: string;
  github?: string;
  liveDocs?: string;
  color: string;
}

export default function ProjectCard({ project, index }: { project: ProjectProps; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`glass-card p-6 md:p-8 rounded-2xl relative group border border-white/5 transition-all duration-300 ${project.color}`}
    >
      <div className="absolute top-4 right-4 md:top-6 md:right-6 opacity-20 group-hover:opacity-100 transition-opacity flex gap-3 z-10">
        {project.github && (
          <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.title} source code`}>
            <Github className="text-gray-400 hover:text-white cursor-pointer w-5 h-5 md:w-6 md:h-6 transition-colors"/>
          </a>
        )}
      </div>

      <div className="font-mono text-[10px] md:text-xs text-[#00f3ff] mb-2">SYS_ID_00{index + 1}</div>
      <h3 className="text-xl md:text-2xl font-bold mb-1">{project.title}</h3>
      <p className="text-xs md:text-sm font-mono text-gray-500 mb-4 md:mb-6">{project.subtitle}</p>
      
      <p className="text-gray-400 leading-relaxed text-sm mb-6 md:mb-8 line-clamp-3">
        {project.desc}
      </p>

      <div className="space-y-4 md:space-y-6">
        <div className="flex flex-wrap gap-2">
          {project.tech.map(t => (
            <span key={t} className="text-[10px] md:text-xs font-mono px-2 py-1 rounded bg-[#0b0d17] border border-white/10 text-gray-400">
              {t}
            </span>
          ))}
        </div>

        <div className="pt-4 md:pt-6 border-t border-white/5 flex justify-between items-center">
          <div className="flex items-center gap-2 font-mono text-[10px] md:text-xs text-gray-300">
            {project.statIcon}
            <span>{project.stats}</span>
          </div>
          
          <div className="flex gap-4 items-center">
            {project.liveDocs && (
              <a href={project.liveDocs} target="_blank" rel="noopener noreferrer" className="text-[10px] md:text-xs font-mono text-green-400 hover:underline flex items-center gap-1 cursor-pointer">
                API_DOCS <Activity size={12}/>
              </a>
            )}
            <Link 
  href={project.link} 
  aria-label={`View system architecture blueprint for ${project.title}`} // 🔴 ADD THIS
  className="text-[10px] md:text-xs font-mono text-[#00f3ff] hover:underline flex items-center gap-1 cursor-pointer z-10 relative"
>
  VIEW_BLUEPRINT <ExternalLink size={12}/>
</Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}