"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Square, Terminal as TerminalIcon } from "lucide-react";

export default function Terminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false); // 🟢 ACTIVATED: Loading state for AI
  const [history, setHistory] = useState([
    "Welcome to Arshad_OS v1.1.0 [RAG_ENABLED]",
    "System Status: Online | Kernel: Active",
    "Type 'help' for commands or ask a system design question.",
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [history, isThinking]);

  const navigateToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      return `Navigating to /${id}...`;
    }
    return `Error: Section /${id} not found.`;
  };

  // 🟢 ACTIVATED: Async Logic to talk to your AI API
  const handleCommand = async (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && input.trim()) {
      const cmd = input.trim();
      const lowerCmd = cmd.toLowerCase();
      
      // Add user input to history immediately
      setHistory(prev => [...prev, `> ${cmd}`]);
      setInput("");

      // 1. Static Command Processor
      switch (lowerCmd) {
        case "help":
          setHistory(prev => [...prev, "Commands: ls, whoami, clear, contact, exit, [ask_technical_questions]"]);
          return;
        case "ls":
          setHistory(prev => [...prev, "about  skills  experience  projects  research  resume.pdf"]);
          return;
        case "whoami":
          setHistory(prev => [...prev, "Mohd Arshad | Backend Architect | Distributed Systems Engineer"]);
          return;
        case "clear":
          setHistory([]);
          return;
        case "exit":
          setIsOpen(false);
          return;
        case "about": case "skills": case "experience": case "projects": case "research":
          setHistory(prev => [...prev, navigateToSection(lowerCmd)]);
          return;
      }

      // 2. AI Kernel Processor (For everything else)
      setIsThinking(true);
      try {
        const res = await fetch("/api/terminal", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ command: cmd }),
        });
        
        const data = await res.json();
        setHistory(prev => [...prev, data.response]);
      } catch (error) {
        setHistory(prev => [...prev, "ERROR_CONNECTION_LOST: Kernel Engine Offline."]);
      } finally {
        setIsThinking(false);
      }
    }
  };

  return (
    <>
      {!isOpen && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          onClick={() => setIsOpen(true)}
          aria-label="Open system terminal interface"
          className="fixed bottom-12 right-6 z-50 p-4 bg-[#0b0d17] border border-[#00f3ff] rounded-full text-[#00f3ff] shadow-[0_0_15px_rgba(0,243,255,0.3)] hover:bg-[#00f3ff] hover:text-black transition-colors"
        >
          <TerminalIcon size={24} aria-hidden="true" />
        </motion.button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="dialog"
            aria-label="System Terminal"
            drag
            dragMomentum={false}
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            className="fixed bottom-24 right-6 w-80 md:w-[500px] h-[500px] bg-[#0b0d17]/95 backdrop-blur-md border border-white/10 rounded-lg shadow-2xl z-50 flex flex-col overflow-hidden font-mono text-sm"
          >
            {/* Header */}
            <div className="bg-[#15192b] p-2 flex justify-between items-center border-b border-white/10 cursor-move">
              <div className="flex items-center gap-2 px-2">
                <TerminalIcon size={14} className="text-[#00f3ff]" aria-hidden="true" />
                <span className="text-gray-300 text-xs">admin@arshad-dev:~ [RAG_KERNEL_ACTIVE]</span>
              </div>
              <div className="flex gap-2 px-2">
                <Minus size={14} className="text-gray-400" aria-hidden="true" />
                <Square size={12} className="text-gray-400" aria-hidden="true" />
                <button onClick={() => setIsOpen(false)} aria-label="Close terminal">
                  <X size={14} className="text-red-500 hover:text-red-400" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Output Area */}
            <div className="flex-1 p-4 overflow-y-auto text-green-400 font-mono scrollbar-hide">
              {history.map((line, i) => (
                <div key={i} className="mb-2 leading-relaxed whitespace-pre-wrap">{line}</div>
              ))}
              {isThinking && (
                <div className="animate-pulse text-[#00f3ff] mt-1">
                  [KERNEL_ANALYZING_SYSTEM_DATA...]
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 bg-[#0b0d17] flex items-center border-t border-white/10">
              <span className="text-[#00f3ff] mr-2" aria-hidden="true">$</span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleCommand}
                disabled={isThinking}
                aria-label="Terminal command input"
                className="w-full bg-transparent outline-none text-gray-200 placeholder-gray-600 disabled:opacity-50"
                placeholder={isThinking ? "Kernel processing..." : "Ask about my architecture..."}
                autoFocus
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}