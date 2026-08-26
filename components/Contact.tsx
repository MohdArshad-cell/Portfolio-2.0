"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github, ShieldCheck, Copy, CheckCircle2 } from "lucide-react";

export default function Contact() {
  const currentYear = 2026;
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("arshadmohd8574@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer id="contact" className="py-24 px-6 border-t border-white/5 bg-[#05060a] relative overflow-hidden">
      {/* Decorative Scanline Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px]" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          {/* Handshake Header */}
          <div className="flex justify-center items-center gap-4 mb-10">
             <div className="h-px w-12 bg-[#00f3ff]/30"></div>
             <div className="font-mono text-[#00f3ff] text-[10px] uppercase tracking-[0.4em] px-4 py-1 border border-[#00f3ff]/20 bg-[#00f3ff]/5">
               Initialize_Handshake::v1.2
             </div>
             <div className="h-px w-12 bg-[#00f3ff]/30"></div>
          </div>

          <h2 className="text-5xl md:text-7xl font-black mb-8 uppercase tracking-tighter text-white">
            Ready to <span className="text-[#00f3ff]">Scale?</span>
          </h2>
          
          <p className="text-gray-400 max-w-2xl mx-auto mb-16 text-base md:text-lg leading-relaxed font-medium">
            Currently navigating the <span className="text-white">Post-Offer Transition Phase</span>. I am open to discussing high-concurrency systems, 
            autonomous AI pipelines, or technical collaborations for late 2026.
          </p>

          {/* Core Call-To-Action */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-16">
            <a 
              href="mailto:arshadmohd8574@gmail.com" 
              className="group relative px-10 py-5 bg-[#00f3ff] text-black font-black uppercase tracking-widest text-xs flex items-center gap-4 transition-all hover:bg-white overflow-hidden shadow-[0_0_30px_rgba(0,243,255,0.2)] w-full md:w-auto justify-center"
            >
              <Mail size={16} />
              <span>SEND_ENCRYPTED_PACKET</span>
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
            </a>

            <button 
              onClick={handleCopyEmail}
              className="group relative px-10 py-5 border border-[#00f3ff]/50 text-[#00f3ff] bg-[#00f3ff]/5 hover:bg-[#00f3ff]/10 font-black uppercase tracking-widest text-xs flex items-center gap-4 transition-all w-full md:w-auto justify-center"
            >
              {copied ? <CheckCircle2 size={16} className="text-emerald-400" /> : <Copy size={16} />}
              <span>{copied ? "EMAIL_COPIED" : "COPY_ADDRESS"}</span>
            </button>
          </div>

          {/* Availability Status */}
          <div className="flex justify-center mb-20">
            <div className="flex items-center gap-3 px-6 py-3 border border-white/10 bg-white/5 rounded-full">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-mono text-gray-300 uppercase tracking-widest">Status: Open for Q4 2026 Collaborations</span>
            </div>
          </div>

          {/* Social Cluster */}
          <div className="flex justify-center gap-10 text-gray-500 mb-20">
            <a 
              href="https://github.com/MohdArshad-cell" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Access Codebase Repository"
              className="hover:text-[#00f3ff] transition-all transform hover:scale-110"
            >
              <Github size={28} />
            </a>
            <a 
              href="https://www.linkedin.com/in/mohd-arshad-156227314" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Establish Professional Uplink"
              className="hover:text-[#00f3ff] transition-all transform hover:scale-110"
            >
              <Linkedin size={28} />
            </a>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-2 text-[10px] font-mono text-gray-600 uppercase tracking-[0.5em]">
               <ShieldCheck size={12} className="text-[#00f3ff]/40" />
               Mohd_Arshad © {currentYear}
            </div>
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#00f3ff]/40 to-transparent"></div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}