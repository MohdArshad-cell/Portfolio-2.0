"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldCheck, Activity, Cpu, Terminal as TerminalIcon, ExternalLink, Zap, BarChart3 } from "lucide-react";

// Types for the Telemetry Data
interface Metrics {
  throughput?: string;
  latency?: string;
  p99_latency?: string;
  concurrency_limit?: string;
  uptime?: string;
  iteration_speed?: string;
  agent_nodes?: string;
  success_rate?: string;
  data_ingestion?: string;
  analysis_window?: string;
  accuracy?: string;
  stack: string;
}

export default function Terminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [activeMetrics, setActiveMetrics] = useState<Metrics | null>(null);
  
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'model', parts: { text: string }[] }[]>([]);
  const [displayHistory, setDisplayHistory] = useState([
    { role: "system", text: "ARSHAD_OS [Version 1.2.0.442]" },
    { role: "system", text: "(c) Arshad Systems. All architectural protocols active." },
    { role: "system", text: "Type 'help' for available commands." },
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [displayHistory, isThinking]);

  // Utility to extract metrics from AI response text
  const extractMetrics = (text: string): Metrics | null => {
    const match = text.match(/METRICS:\s*({.*?})/s);
    if (match) {
      try {
        return JSON.parse(match[1]);
      } catch (e) {
        return null;
      }
    }
    return null;
  };

  const handleCommand = async (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && input.trim()) {
      const cmd = input.trim();
      setDisplayHistory(prev => [...prev, { role: "user", text: cmd }]);
      setInput("");
      setIsThinking(true);

      try {
        const res = await fetch("/api/terminal", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ command: cmd, history: chatHistory }),
        });
        
        const data = await res.json();
        const rawResponse = data.response;

        // ACTION_TRIGGERS
        if (rawResponse.includes("[ACTION: OPEN_CV]")) {
          window.open("https://raw.githubusercontent.com/MohdArshad-cell/Portfolio-2.0/a2f4520ab852250d17e0b8a3e11df4a2eab1eaff/public/asset/ARSHAD.pdf", '_blank');
        }
        if (rawResponse.includes("[ACTION: SCROLL_PROJECTS]")) {
          document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
        }
        if (rawResponse.includes("[ACTION: OPEN_LINKEDIN]")) {
          window.open("https://www.linkedin.com/in/mohd-arshad-156227314", '_blank');
        }

        // TELEMETRY_HUD: Update side panel metrics if project is discussed
        const metrics = extractMetrics(rawResponse);
        setActiveMetrics(metrics);

        // CLEAN_DISPLAY: Remove technical tags and JSON from user view
        const displayResponse = rawResponse.replace(/\[ACTION: .*?\]/g, "").replace(/METRICS:\s*{.*?}/s, "").trim();

        setDisplayHistory(prev => [
          ...prev, 
          { role: "system", text: `[ROUTING_SUCCESS]: ${data.metadata.category} MODULE_ENGAGED` },
          { role: "kernel", text: displayResponse }
        ]);

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
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-12 right-8 z-[60] flex items-center gap-3 px-6 py-3 bg-[#0b0d17] border border-[#00f3ff]/40 text-[#00f3ff] hover:bg-[#00f3ff] hover:text-black transition-all group font-mono text-[10px] uppercase tracking-[0.2em] shadow-[0_0_30px_rgba(0,243,255,0.1)] rounded-sm"
        >
          <Zap size={14} className="group-hover:fill-current" />
          <span className="font-black">Boot_Kernel</span>
        </button>
      )}

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="relative w-full md:w-[800px] h-[85vh] md:h-[650px] bg-[#0b0d17] border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.9)] flex flex-col font-mono rounded-lg overflow-hidden backdrop-blur-xl pointer-events-auto"
            >
              {/* Telemetry HUD Panel */}
              <AnimatePresence>
                {activeMetrics && (
                  <motion.div
                    initial={{ x: 300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 300, opacity: 0 }}
                    className="absolute right-0 top-[65px] bottom-[77px] w-[260px] bg-[#080a12]/95 border-l border-white/10 z-10 p-6 flex flex-col gap-6 backdrop-blur-md hidden lg:flex"
                  >
                    <div className="flex items-center gap-2 text-[#00f3ff] mb-2">
                      <BarChart3 size={14} />
                      <span className="text-[10px] font-black uppercase tracking-widest">Live_Telemetry</span>
                    </div>
                    
                    {Object.entries(activeMetrics).map(([key, value]) => (
                      key !== 'stack' && (
                        <div key={key} className="space-y-1">
                          <div className="text-[9px] text-gray-500 uppercase font-bold">{key.replace('_', ' ')}</div>
                          <div className="text-sm text-white font-black font-mono tracking-tight">{value}</div>
                          <div className="h-[2px] w-full bg-white/5 overflow-hidden">
                            <motion.div 
                              initial={{ x: "-100%" }} 
                              animate={{ x: "0%" }} 
                              className="h-full w-full bg-[#00f3ff]/40" 
                            />
                          </div>
                        </div>
                      )
                    ))}
                    
                    <div className="mt-auto pt-6 border-t border-white/5">
                      <div className="text-[9px] text-gray-500 uppercase font-bold mb-1">Architecture_Stack</div>
                      <div className="text-[10px] text-[#00f3ff] font-bold">{activeMetrics.stack}</div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 bg-[#111420]/80 border-b border-white/5">
                <div className="flex items-center gap-8">
                  <div className="flex items-center gap-2 text-[#00f3ff] animate-pulse">
                    <ShieldCheck size={14} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Secure_Layer</span>
                  </div>
                  <div className="hidden sm:flex items-center gap-3 text-gray-500 border-l border-white/10 pl-8 font-black text-[9px]">
                    NODE: ARSHAD_V1.1_MAINFRAME
                  </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-red-500 transition-all hover:rotate-90 p-1">
                  <X size={20} />
                </button>
              </div>

              {/* Content Area */}
              <div className="flex-1 flex overflow-hidden bg-gradient-to-b from-[#0d101b] to-[#0b0d17]">
                <div className="hidden lg:flex w-12 flex-col items-center py-8 border-r border-white/5 bg-[#080a12] text-[8px] text-gray-700 font-black select-none tracking-[0.5em]">
                  <div className="rotate-90 origin-center whitespace-nowrap mb-24">SYSTEM_STATUS_200</div>
                  <div className="rotate-90 origin-center whitespace-nowrap text-[#00f3ff]/30">CORE_SYNC_ACTIVE</div>
                </div>

                <div className="flex-1 p-8 overflow-y-auto scrollbar-thin scrollbar-thumb-[#00f3ff]/10 space-y-8 pr-[40px]">
                  {displayHistory.map((msg, i) => (
                    <div key={i} className={`text-[13px] md:text-sm leading-relaxed max-w-[85%] ${
                      msg.role === 'user' ? 'text-white ml-auto' : 
                      msg.role === 'system' ? 'text-gray-500 border-l border-white/10 pl-5 py-2' : 
                      msg.role === 'error' ? 'text-red-500 bg-red-500/5 p-4' : 'text-[#00f3ff]'
                    }`}>
                      {msg.role === 'user' && <div className="text-[9px] text-gray-600 uppercase font-black mb-2 text-right tracking-[0.1em]">/ USER_UPLINK /</div>}
                      {msg.role === 'kernel' && <div className="text-[9px] text-[#00f3ff]/50 uppercase font-black mb-3 tracking-[0.3em] flex items-center gap-2"><TerminalIcon size={10} /> [Incoming_Transmission]</div>}
                      <span className="whitespace-pre-wrap block">{msg.text}</span>
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

              {/* Input Area */}
              <div className="p-6 bg-[#080a12] border-t border-white/10 flex items-center gap-5">
                <span className="text-[#00f3ff] text-xs font-black tracking-tighter">SYS_ROOT:~$</span>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleCommand}
                  disabled={isThinking}
                  placeholder={isThinking ? "AWAITING_KERNEL..." : "Enter technical query..."}
                  className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-700 text-sm font-bold"
                  autoFocus
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}