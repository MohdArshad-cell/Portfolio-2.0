"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldCheck, Activity, Cpu, Terminal as TerminalIcon } from "lucide-react";

export default function Terminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [history, setHistory] = useState([
    { role: "system", text: "ARSHAD_OS [Version 1.2.0.442]" },
    { role: "system", text: "(c) Arshad Systems. All architectural protocols active." },
    { role: "system", text: "Type 'help' for available commands." },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, isThinking]);

  const handleCommand = async (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && input.trim()) {
      const cmd = input.trim();
      setHistory(prev => [...prev, { role: "user", text: cmd }]);
      setInput("");
      setIsThinking(true);

      try {
        const res = await fetch("/api/terminal", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ command: cmd }),
        });
        const data = await res.json();
        
        setHistory(prev => [
          ...prev, 
          { role: "system", text: `[ROUTING_SUCCESS]: ${data.metadata.category} MODULE_ENGAGED` },
          { role: "kernel", text: data.response }
        ]);
      } catch {
        setHistory(prev => [...prev, { role: "error", text: "CRITICAL_CONNECTION_FAILURE: Kernel offline." }]);
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
          className="fixed bottom-12 right-8 z-[60] flex items-center gap-3 px-6 py-3 bg-[#111420] border border-[#00f3ff]/30 text-[#00f3ff] hover:bg-[#00f3ff] hover:text-black transition-all group font-mono text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(0,243,255,0.15)]"
        >
          <Activity size={14} className="group-hover:animate-pulse" />
          <span className="font-bold">Initialize_Kernel</span>
        </button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 10 }}
            className="fixed bottom-24 right-8 w-[95vw] md:w-[700px] h-[550px] bg-[#0b0d17] border border-white/20 shadow-[0_30px_60px_rgba(0,0,0,0.8)] z-[60] flex flex-col font-mono overflow-hidden rounded-sm ring-1 ring-white/10"
          >
            {/* High-Contrast System Header */}
            <div className="flex items-center justify-between px-5 py-3 bg-[#1a1f35] border-b border-[#00f3ff]/20">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-[#00f3ff]">
                  <ShieldCheck size={14} />
                  <span className="text-[11px] uppercase font-bold tracking-tight">System_Secure</span>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-gray-300 border-l border-white/10 pl-6">
                  <Cpu size={12} className="text-[#00f3ff]" />
                  <span className="text-[10px] uppercase font-bold">Node: Arshad_V1.1_Mainframe</span>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="text-gray-400 hover:text-red-500 transition-colors p-1"
                aria-label="Close Terminal"
              >
                <X size={20} />
              </button>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex overflow-hidden bg-[#0d101b]">
              {/* Visual Integrity Bar */}
              <div className="hidden md:flex w-10 flex-col items-center py-6 border-r border-white/10 bg-[#080a14] text-[9px] text-gray-600 font-bold select-none">
                <div className="rotate-90 origin-center whitespace-nowrap mb-16 tracking-widest uppercase">Kernel_Core_Active</div>
                <div className="rotate-90 origin-center whitespace-nowrap tracking-widest uppercase text-[#00f3ff]/40">Status_200_OK</div>
              </div>

              {/* Enhanced Legibility Output */}
              <div className="flex-1 p-8 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 space-y-6">
                {history.map((msg, i) => (
                  <div key={i} className={`text-[13px] md:text-sm leading-relaxed ${
                    msg.role === 'user' ? 'text-white' : 
                    msg.role === 'system' ? 'text-gray-400 border-l-2 border-white/10 pl-4 py-1 italic' : 
                    msg.role === 'error' ? 'text-red-400 font-bold bg-red-400/5 p-2' : 'text-[#00f3ff]'
                  }`}>
                    {msg.role === 'user' && (
                      <div className="text-[10px] text-gray-500 uppercase font-black mb-1 flex items-center gap-2">
                         <div className="h-1 w-1 bg-gray-500 rounded-full" /> User_Query
                      </div>
                    )}
                    {msg.role === 'kernel' && (
                      <div className="text-[10px] text-[#00f3ff]/70 uppercase font-black mb-2 tracking-[0.2em]">
                        [Kernel_Transmission_Received]
                      </div>
                    )}
                    <span className="whitespace-pre-wrap font-medium">{msg.text}</span>
                  </div>
                ))}
                
                {isThinking && (
                  <div className="flex items-center gap-3 text-[#00f3ff] text-xs font-bold animate-pulse py-2">
                    <Activity size={14} className="animate-spin-slow" />
                    <span>KERNEL_ANALYZING_ARCHITECTURE...</span>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* High-Visibility Input Area */}
            <div className="p-5 bg-[#111420] border-t border-white/10 flex items-center gap-4">
              <span className="text-[#00f3ff] text-sm font-black">SYS_ROOT:~$</span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleCommand}
                disabled={isThinking}
                placeholder={isThinking ? "PROCESSING_HANDSHAKE..." : "Enter technical query..."}
                className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-600 text-sm font-bold"
                autoFocus
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}