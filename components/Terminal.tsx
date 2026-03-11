"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldCheck, Activity, Cpu, Terminal as TerminalIcon, Zap, BarChart3, Binary,Command } from "lucide-react";

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
  
  // MULTI-AGENT STATE
  const [isDelegating, setIsDelegating] = useState(false);
  const [currentAgent, setCurrentAgent] = useState("");

  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'model', parts: { text: string }[] }[]>([]);
  const [displayHistory, setDisplayHistory] = useState([
    { role: "system", text: "ARSHAD_OS [Version 1.2.0.442]" },
    { role: "system", text: "(c) Arshad Systems. All architectural protocols active." },
    { role: "system", text: "Type 'help' for available commands." },
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [displayHistory, isThinking, isDelegating]);

  // Updated Regex for ES2020 compatibility
  const extractMetrics = (text: string): Metrics | null => {
    const match = text.match(/METRICS:\s*({[\s\S]*?})/);
    if (match) {
      try { return JSON.parse(match[1]); } catch (e) { return null; }
    }
    return null;
  };

  // Simulation of the Multi-Agent Loop
  const simulateMultiAgentWork = async () => {
    const agents = [
      "Analyst_Agent: Scanning query intent...",
      "Architect_Agent: Retrieving technical context...",
      "Logic_Agent: Cross-referencing 2026 milestones...",
      "Reviewer_Agent: Validating response integrity..."
    ];
    setIsDelegating(true);
    for (const agent of agents) {
      setCurrentAgent(agent);
      await new Promise(resolve => setTimeout(resolve, 600)); 
    }
    setIsDelegating(false);
  };

  const handleCommand = async (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && input.trim()) {
      const cmd = input.trim();
      setDisplayHistory(prev => [...prev, { role: "user", text: cmd }]);
      setInput("");
      
      // Start Multi-Agent Handshake
      setIsThinking(true);
      await simulateMultiAgentWork();

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

        const metrics = extractMetrics(rawResponse);
        setActiveMetrics(metrics);

        const displayResponse = rawResponse
          .replace(/\[ACTION: .*?\]/g, "")
          .replace(/METRICS:\s*{[\s\S]*?}/, "")
          .trim();

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
      {/* 1. BOOT TRIGGER: Added Glow & Hover Scale */}
      {!isOpen && (
  <motion.button
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0,243,255,0.4)" }}
    whileTap={{ scale: 0.95 }}
    onClick={() => setIsOpen(true)}
    // 🔴 THE FIX: Use fixed, high z-index, and bottom-20 to stay above StatusBar
    className="fixed bottom-20 right-8 z-[100] flex items-center gap-3 px-8 py-4 bg-black/80 backdrop-blur-md border border-[#00f3ff]/50 text-[#00f3ff] font-mono text-[10px] uppercase tracking-[0.3em] rounded-none overflow-hidden group pointer-events-auto"
  >
    <div className="absolute inset-0 bg-[#00f3ff] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" />
    <Zap size={14} className="relative z-10 group-hover:text-black transition-colors" />
    <span className="relative z-10 group-hover:text-black transition-colors font-black uppercase">
      Initialise_Kernel
    </span>
  </motion.button>
)}

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 md:p-10 pointer-events-none">
            {/* 2. MAIN CONTAINER: Added Glassmorphism and Heavy Shadow */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.9, rotateX: 10 }}
              className="relative w-full max-w-5xl h-[85vh] bg-[#05060a]/95 border border-white/10 shadow-[0_0_100px_rgba(0,0,0,1)] flex flex-col font-mono rounded-none overflow-hidden backdrop-blur-3xl pointer-events-auto ring-1 ring-white/5"
            >
              {/* Scanline Overlay Layer */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.05] z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,4px_100%]" />

              {/* 3. HEADER: High-Contrast Industrial Header */}
              <div className="flex items-center justify-between px-8 py-5 bg-white/5 border-b border-white/10">
                <div className="flex items-center gap-10">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 bg-[#00f3ff] rounded-full animate-pulse shadow-[0_0_10px_#00f3ff]" />
                    <span className="text-[11px] font-black uppercase tracking-[0.4em] text-[#00f3ff]">Arshad_OS_V1.2</span>
                  </div>
                  <div className="hidden lg:flex items-center gap-6 text-gray-500 border-l border-white/10 pl-10">
                    <div className="flex flex-col">
                      <span className="text-[8px] uppercase font-bold text-gray-600">Secure_Node</span>
                      <span className="text-[10px] text-white font-bold">LKO_MAINFRAME_01</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[8px] uppercase font-bold text-gray-600">Auth_Status</span>
                      <span className="text-[10px] text-[#00f3ff] font-bold">ROOT_ACCESS</span>
                    </div>
                  </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-red-500 transition-all hover:rotate-90"><X size={20} /></button>
              </div>

              <div className="flex-1 flex overflow-hidden">
                {/* 4. SIDEBAR: Functional Navigation Indicators */}
                <div className="hidden md:flex w-16 flex-col items-center py-10 border-r border-white/10 bg-black/40">
                  <Activity size={18} className="text-[#00f3ff]/40 mb-12" />
                  <div className="flex-1 flex flex-col justify-around text-[9px] text-gray-600 font-black tracking-widest [writing-mode:vertical-lr] rotate-180">
                    <span>SECTOR_07_ACTIVE</span>
                    <span className="text-[#00f3ff]/30">ENCRYPTION_AES_256</span>
                    <span>SIGNAL_STRENGTH_MAX</span>
                  </div>
                </div>

                {/* 5. OUTPUT: Redesigned Message Bubbles */}
                <div className="flex-1 p-10 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 space-y-12 pr-12 relative">
                  {displayHistory.map((msg, i) => (
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }} 
                      animate={{ opacity: 1, x: 0 }} 
                      key={i} 
                      className={`relative group ${msg.role === 'user' ? 'ml-auto max-w-[70%]' : 'max-w-[85%]'}`}
                    >
                      {/* Meta Tags for messages */}
                      <div className={`flex items-center gap-3 mb-3 text-[9px] font-black uppercase tracking-widest ${msg.role === 'user' ? 'justify-end text-gray-500' : 'text-[#00f3ff]/60'}`}>
                        {msg.role === 'user' ? (
                          <><span>User_Auth_Session</span><Command size={10} /></>
                        ) : (
                          <><TerminalIcon size={10} /><span>Kernel_Response_014</span></>
                        )}
                      </div>

                      <div className={`p-6 rounded-none border ${
                        msg.role === 'user' 
                          ? 'bg-white/5 border-white/10 text-white' 
                          : 'bg-[#00f3ff]/5 border-[#00f3ff]/20 text-[#00f3ff]'
                      } shadow-lg backdrop-blur-sm`}>
                        <span className="whitespace-pre-wrap leading-relaxed text-sm font-medium tracking-tight">
                          {msg.text}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* 6. INPUT: High-Focus Input with Prompt */}
              <div className="p-8 bg-black/60 border-t border-white/10 flex items-center gap-6">
                <div className="flex items-center gap-3 text-[#00f3ff]">
                  <span className="text-xs font-black px-2 py-1 bg-[#00f3ff]/10">ADMIN</span>
                  <span className="text-sm font-black tracking-widest">~$</span>
                </div>
                <input
                  type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleCommand}
                  className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-700 text-sm font-bold tracking-widest focus:ring-0"
                  placeholder="EXECUTE COMMAND OR QUERY..."
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}