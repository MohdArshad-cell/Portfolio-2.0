"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Terminal as TerminalIcon, Zap, Command, Loader2, Bot, Activity } from "lucide-react";
import { playKeystrokeSound, playBootSound } from "@/lib/audio";

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
  const [, setActiveMetrics] = useState<Metrics | null>(null);
  
  // TERMINAL HISTORY & EASTER EGGS
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [matrixMode, setMatrixMode] = useState(false);
  const [crashMode, setCrashMode] = useState(false);
  
  // MULTI-AGENT STATE
  const [isDelegating, setIsDelegating] = useState(false);
  const [currentAgent, setCurrentAgent] = useState("");
  const [completedAgents, setCompletedAgents] = useState<string[]>([]);

  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'model', parts: { text: string }[] }[]>([]);
  const [displayHistory, setDisplayHistory] = useState([
    { role: "system", text: "ARSHAD_OS [Version 1.2.0.442]" },
    { role: "system", text: "(c) Arshad Systems. All architectural protocols active." },
    { role: "system", text: "Type 'help' for available commands." },
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [displayHistory, isThinking, isDelegating, currentAgent, completedAgents]);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  // Updated Regex for ES2020 compatibility
  const extractMetrics = (text: string): Metrics | null => {
    const match = text.match(/METRICS:\s*({[\s\S]*?})/);
    if (match) {
      try { return JSON.parse(match[1]); } catch { return null; }
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
    setCompletedAgents([]);
    for (const agent of agents) {
      setCurrentAgent(agent);
      await new Promise(resolve => setTimeout(resolve, 600));
      setCompletedAgents(prev => [...prev, agent]);
    }
    setCurrentAgent("");
    setIsDelegating(false);
  };

  const handleCommand = async (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
      return;
    }
    
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput("");
      }
      return;
    }

    if (e.key === "Enter" && input.trim()) {
      const cmd = input.trim();
      setDisplayHistory(prev => [...prev, { role: "user", text: cmd }]);
      setCommandHistory(prev => [...prev, cmd]);
      setHistoryIndex(-1);
      setInput("");
      
      // Local Commands Interception
      const lowerCmd = cmd.toLowerCase();
      
      if (lowerCmd === "clear") {
        setDisplayHistory([]);
        return;
      }
      
      if (lowerCmd === "help") {
        setDisplayHistory(prev => [...prev, { 
          role: "system", 
          text: "AVAILABLE COMMANDS:\n  help      - Show this menu\n  clear     - Clear terminal history\n  projects  - List active deployment architectures\n  resume    - Download technical CV\n  history   - View command history\n  matrix    - [CLASSIFIED]\n\nOr just type naturally to query the AI kernel."
        }]);
        return;
      }

      if (lowerCmd === "projects") {
        setDisplayHistory(prev => [...prev, { 
          role: "system", 
          text: "ACTIVE DEPLOYMENTS:\n  1. Career Catalyst [AI Pipeline]\n  2. FlashTix [High-Concurrency]\n  3. StreamFlow [Event Streaming]\n\nNavigate to the System_Architecture section to view blueprints."
        }]);
        return;
      }

      if (lowerCmd === "resume") {
        window.open("https://raw.githubusercontent.com/MohdArshad-cell/Portfolio-2.0/a2f4520ab852250d17e0b8a3e11df4a2eab1eaff/public/asset/ARSHAD.pdf", '_blank');
        setDisplayHistory(prev => [...prev, { role: "system", text: "DOWNLOADING PROTOCOL_CV.PDF..." }]);
        return;
      }

      if (lowerCmd === "history") {
        setDisplayHistory(prev => [...prev, { 
          role: "system", 
          text: commandHistory.length > 0 ? commandHistory.map((c, i) => `${i + 1}  ${c}`).join('\n') : "History empty."
        }]);
        return;
      }

      if (lowerCmd === "matrix") {
        setMatrixMode(true);
        setDisplayHistory(prev => [...prev, { role: "system", text: "WAKE UP, NEO..." }]);
        setTimeout(() => setMatrixMode(false), 5000);
        return;
      }

      if (lowerCmd === "sudo rm -rf /") {
        setCrashMode(true);
        setDisplayHistory(prev => [...prev, { role: "system", text: "FATAL ERROR: ROOT PARTITION DELETED.\nINITIATING KERNEL PANIC..." }]);
        setTimeout(() => {
          setCrashMode(false);
          setDisplayHistory([{ role: "system", text: "SYSTEM REBOOT SUCCESSFUL. NICE TRY." }]);
        }, 4000);
        return;
      }

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

      } catch {
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
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    onClick={() => {
      setIsOpen(true);
      playBootSound();
    }}
    className="!fixed !bottom-12 !right-8 z-[999] h-[48px] flex items-center gap-3 px-8 bg-[#05060a]/90 backdrop-blur-md border border-[#00f3ff]/50 text-[#00f3ff] font-mono text-[10px] uppercase tracking-[0.3em] group pointer-events-auto overflow-hidden shadow-[0_0_30px_rgba(0,243,255,0.1)] rounded-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00f3ff]"
    aria-label="Open Terminal"
  >
    <div className="absolute inset-0 bg-[#00f3ff] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
    
    <Zap size={14} className="relative z-10 group-hover:text-black transition-colors" />
    <span className="relative z-10 group-hover:text-black transition-colors font-black">
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
              className={`relative w-full max-w-5xl h-[85vh] bg-[#05060a]/95 border ${crashMode ? 'border-red-500 ring-red-500 animate-shake' : 'border-white/10 ring-white/5'} shadow-[0_0_100px_rgba(0,0,0,1)] flex flex-col font-mono rounded-none overflow-hidden backdrop-blur-3xl pointer-events-auto ring-1 transition-all duration-100`}
            >
              {/* Scanline Overlay Layer */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.05] z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,4px_100%]" />
              
              {/* Matrix Easter Egg Overlay */}
              <AnimatePresence>
                {matrixMode && (
                  <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="absolute inset-0 z-40 bg-black/80 pointer-events-none overflow-hidden flex flex-wrap text-emerald-500 font-mono text-xs opacity-50"
                  >
                    {Array.from({length: 200}).map((_, i) => (
                      <span key={i} className="animate-pulse" style={{animationDelay: `${Math.random() * 2}s`, marginLeft: `${Math.random() * 10}px`}}>
                        {String.fromCharCode(33 + Math.random() * 94)}
                      </span>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Crash Mode Overlay */}
              <AnimatePresence>
                {crashMode && (
                  <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="absolute inset-0 z-40 bg-red-900/90 pointer-events-none flex items-center justify-center text-white font-black text-4xl animate-pulse"
                  >
                    KERNEL PANIC
                  </motion.div>
                )}
              </AnimatePresence>

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
                <button aria-label="Close Terminal" onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-red-500 transition-all hover:rotate-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"><X size={20} /></button>
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
                      key={`msg-${i}`}
                      initial={{ opacity: 0, x: -10 }} 
                      animate={{ opacity: 1, x: 0 }} 
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

                  {/* Multi-Agent Delegation Feed */}
                  <AnimatePresence>
                    {(isDelegating || (isThinking && completedAgents.length > 0)) && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="max-w-[85%] space-y-1"
                      >
                        <div className="flex items-center gap-3 mb-3 text-[9px] font-black uppercase tracking-widest text-[#7000ff]/60">
                          <Bot size={10} />
                          <span>Multi_Agent_Handshake</span>
                        </div>
                        <div className="p-5 rounded-none border border-[#7000ff]/20 bg-[#7000ff]/5 backdrop-blur-sm space-y-2">
                          {completedAgents.map((agent, idx) => (
                            <motion.div
                              key={`agent-done-${idx}`}
                              initial={{ opacity: 0, x: -15 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3 }}
                              className="flex items-center gap-3 text-xs"
                            >
                              <span className="text-emerald-400 text-[10px]">✓</span>
                              <span className="text-gray-400 font-medium tracking-tight">{agent}</span>
                            </motion.div>
                          ))}
                          {isDelegating && currentAgent && !completedAgents.includes(currentAgent) && (
                            <motion.div
                              key={`agent-active-${currentAgent}`}
                              initial={{ opacity: 0, x: -15 }}
                              animate={{ opacity: 1, x: 0 }}
                              className="flex items-center gap-3 text-xs"
                            >
                              <Loader2 size={10} className="text-[#7000ff] animate-spin" />
                              <span className="text-[#7000ff] font-bold tracking-tight">{currentAgent}</span>
                            </motion.div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Thinking / API Call Indicator */}
                  <AnimatePresence>
                    {isThinking && !isDelegating && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="max-w-[85%]"
                      >
                        <div className="flex items-center gap-3 mb-3 text-[9px] font-black uppercase tracking-widest text-[#00f3ff]/60">
                          <TerminalIcon size={10} />
                          <span>Kernel_Processing</span>
                        </div>
                        <div className="p-5 rounded-none border border-[#00f3ff]/20 bg-[#00f3ff]/5 backdrop-blur-sm flex items-center gap-4">
                          <div className="flex gap-1.5">
                            <span className="w-1.5 h-1.5 bg-[#00f3ff] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                            <span className="w-1.5 h-1.5 bg-[#00f3ff] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                            <span className="w-1.5 h-1.5 bg-[#00f3ff] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                          </div>
                          <span className="text-xs text-[#00f3ff]/80 font-bold tracking-widest uppercase">Compiling_Response...</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* 6. INPUT: High-Focus Input with Prompt */}
              <div className={`p-8 bg-black/60 border-t border-white/10 flex items-center gap-6 transition-opacity ${isThinking ? 'opacity-50' : 'opacity-100'}`}>
                <div className="flex items-center gap-3 text-[#00f3ff]">
                  <span className={`text-xs font-black px-2 py-1 ${isThinking ? 'bg-yellow-500/10 text-yellow-500' : 'bg-[#00f3ff]/10'}`}>
                    {isThinking ? 'BUSY' : 'ADMIN'}
                  </span>
                  <span className="text-sm font-black tracking-widest">~$</span>
                </div>
                <input
                  type="text" 
                  value={input} 
                  onChange={(e) => {
                    setInput(e.target.value);
                    if (e.target.value.length > input.length) {
                      playKeystrokeSound();
                    }
                  }} 
                  onKeyDown={handleCommand}
                  disabled={isThinking}
                  className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-700 text-sm font-bold tracking-widest focus:ring-0 disabled:cursor-not-allowed"
                  placeholder={isThinking ? 'PROCESSING_REQUEST...' : 'EXECUTE COMMAND OR QUERY...'}
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}