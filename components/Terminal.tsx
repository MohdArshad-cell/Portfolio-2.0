"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldCheck, Activity, Cpu, Terminal as TerminalIcon, ExternalLink, Zap } from "lucide-react";

export default function Terminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  
  // NEURAL_RECALL: Tracks deep conversation turns for RAG context
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'model', parts: { text: string }[] }[]>([]);
  
  // UI_HISTORY: Manages the visible industrial-HUD output
  const [displayHistory, setDisplayHistory] = useState([
    { role: "system", text: "ARSHAD_OS [Version 1.2.0.442]" },
    { role: "system", text: "(c) Arshad Systems. All architectural protocols active." },
    { role: "system", text: "Type 'help' for available commands." },
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to keep the latest logs visible
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [displayHistory, isThinking]);

  const handleCommand = async (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && input.trim()) {
      const cmd = input.trim();
      
      // Visual feedback: Append user query to UI immediately
      setDisplayHistory(prev => [...prev, { role: "user", text: cmd }]);
      setInput("");
      setIsThinking(true);

      try {
        const res = await fetch("/api/terminal", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            command: cmd,
            history: chatHistory 
          }),
        });
        
        const data = await res.json();
        const rawResponse = data.response;

        // --- ACTION_TRIGGERS: Neural-to-UI Interface ---
        // These tags are intercepted before the text is rendered to the user
        if (rawResponse.includes("[ACTION: OPEN_CV]")) {
          // Replace with your actual hosted resume URL
          window.open("https://raw.githubusercontent.com/MohdArshad-cell/Portfolio-2.0/a2f4520ab852250d17e0b8a3e11df4a2eab1eaff/public/asset/ARSHAD.pdf", '_blank');
        }
        
        if (rawResponse.includes("[ACTION: SCROLL_PROJECTS]")) {
          const projectSection = document.getElementById('projects');
          projectSection?.scrollIntoView({ behavior: 'smooth' });
        }

        if (rawResponse.includes("[ACTION: OPEN_LINKEDIN]")) {
          window.open("https://www.linkedin.com/in/mohd-arshad-156227314", '_blank');
        }

        // --- META-RESILIENCE: Clean Action Tags from Display ---
        const displayResponse = rawResponse.replace(/\[ACTION: .*?\]/g, "").trim();

        // Update UI History with system-level status logs
        setDisplayHistory(prev => [
          ...prev, 
          { role: "system", text: `[ROUTING_SUCCESS]: ${data.metadata.category} MODULE_ENGAGED` },
          { role: "kernel", text: displayResponse }
        ]);

        // Update Neural Recall for stateful continuity
        setChatHistory(prev => [
          ...prev,
          { role: 'user', parts: [{ text: cmd }] },
          { role: 'model', parts: [{ text: displayResponse }] }
        ]);

      } catch (error) {
        setDisplayHistory(prev => [...prev, { role: "error", text: "CRITICAL_CONNECTION_FAILURE: Kernel offline." }]);
      } finally {
        setIsThinking(false);
      }
    }
  };

  return (
    <>
      {/* HUD Initialization Trigger */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-12 right-8 z-[60] flex items-center gap-3 px-6 py-3 bg-[#0b0d17] border border-[#00f3ff]/40 text-[#00f3ff] hover:bg-[#00f3ff] hover:text-black transition-all group font-mono text-[10px] uppercase tracking-[0.2em] shadow-[0_0_30px_rgba(0,243,255,0.1)] rounded-sm"
        >
          <Zap size={14} className="group-hover:fill-current transition-all" />
          <span className="font-black">Boot_Kernel</span>
        </button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-10 right-0 md:right-10 w-full md:w-[750px] h-[85vh] md:h-[600px] bg-[#0b0d17] border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.9)] z-[70] flex flex-col font-mono rounded-lg overflow-hidden backdrop-blur-xl"
          >
            {/* System Header with Node Metadata */}
            <div className="flex items-center justify-between px-6 py-4 bg-[#111420]/80 border-b border-white/5">
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-2 text-[#00f3ff] animate-pulse">
                  <ShieldCheck size={14} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Secure_Layer</span>
                </div>
                <div className="hidden sm:flex items-center gap-3 text-gray-500 border-l border-white/10 pl-8">
                  <Cpu size={12} className="text-[#00f3ff]/60" />
                  <span className="text-[9px] font-bold uppercase tracking-tighter">Instance: Arshad_V1_Mainframe</span>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="text-gray-500 hover:text-red-500 transition-all hover:rotate-90"
                aria-label="Terminate Session"
              >
                <X size={20} />
              </button>
            </div>

            {/* Industrial Data Readout Area */}
            <div className="flex-1 flex overflow-hidden">
              {/* Vertical Gutter for Visual Integrity */}
              <div className="hidden lg:flex w-12 flex-col items-center py-8 border-r border-white/5 bg-[#080a12] text-[8px] text-gray-700 font-black select-none tracking-[0.5em]">
                <div className="rotate-90 origin-center whitespace-nowrap mb-24">NEURAL_KERNEL_ACTIVE</div>
                <div className="rotate-90 origin-center whitespace-nowrap text-[#00f3ff]/30">STABLE_DIFFUSION_OFF</div>
              </div>

              {/* Enhanced Legibility Output Scroll */}
              <div className="flex-1 p-8 overflow-y-auto scrollbar-thin scrollbar-thumb-[#00f3ff]/10 space-y-8 bg-gradient-to-b from-[#0d101b] to-[#0b0d17]">
                {displayHistory.map((msg, i) => (
                  <div key={i} className={`text-[13px] md:text-sm leading-relaxed max-w-[90%] ${
                    msg.role === 'user' ? 'text-white ml-auto' : 
                    msg.role === 'system' ? 'text-gray-500 border-l border-white/10 pl-5 py-2' : 
                    msg.role === 'error' ? 'text-red-500 bg-red-500/5 p-4 border border-red-500/20' : 'text-[#00f3ff]'
                  }`}>
                    {msg.role === 'user' && (
                      <div className="text-[9px] text-gray-600 uppercase font-black mb-2 text-right tracking-[0.1em]">
                        / Remote_Uplink /
                      </div>
                    )}
                    {msg.role === 'kernel' && (
                      <div className="text-[9px] text-[#00f3ff]/50 uppercase font-black mb-3 tracking-[0.3em] flex items-center gap-2">
                        <TerminalIcon size={10} /> [Incoming_Transmission]
                      </div>
                    )}
                    <span className="whitespace-pre-wrap font-medium tracking-tight block">
                      {msg.text}
                    </span>
                  </div>
                ))}
                
                {isThinking && (
                  <div className="flex items-center gap-4 text-[#00f3ff] text-[10px] font-black tracking-widest py-4">
                    <Activity size={16} className="animate-spin" />
                    <span className="animate-pulse">KERNEL_SYNCHRONIZING_MODULES...</span>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Command Input Area (Root Access) */}
            <div className="p-6 bg-[#080a12] border-t border-white/10 flex items-center gap-5">
              <div className="flex items-center gap-2 text-[#00f3ff]">
                <span className="text-xs font-black">SYS_ROOT:</span>
                <span className="text-xs font-black animate-pulse">~</span>
                <span className="text-xs font-black">$</span>
              </div>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleCommand}
                disabled={isThinking}
                placeholder={isThinking ? "AWAITING_KERNEL_CALLBACK..." : "Input technical query or command..."}
                className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-700 text-sm font-bold tracking-wide"
                autoFocus
              />
              <div className="hidden md:flex items-center gap-2 text-gray-700">
                <ExternalLink size={12} />
                <span className="text-[9px] font-bold">STRICT_AUTH</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}