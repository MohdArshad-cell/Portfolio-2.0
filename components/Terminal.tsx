"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Square, Terminal as TerminalIcon } from "lucide-react";

export default function Terminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([
    "Welcome to Arshad_OS v1.0.0",
    "Type 'help' to see available commands.",
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [history]);

  const navigateToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      return `Navigating to /${id}...`;
    }
    return `Error: Section /${id} not found.`;
  };

  const handleCommand = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      const cmd = input.trim().toLowerCase();
      let response = "";

      switch (cmd) {
        case "help":
          response = "Commands: help, ls, whoami, clear, contact, exit, [section_name]";
          break;
        case "ls":
          response = "about  skills  experience  projects  research  resume.pdf";
          break;
        case "whoami":
          response = "Mohd Arshad | Backend Architect | Distributed Systems Engineer";
          break;
        case "contact":
          response = "Opening mail client...";
          window.location.href = "mailto:arshadmohd8574@gmail.com";
          break;
        case "clear":
          setHistory([]);
          setInput("");
          return;
        case "exit":
          setIsOpen(false);
          break;
        case "about":
          response = navigateToSection("about");
          break;
        case "skills":
          response = navigateToSection("skills");
          break;
        case "experience":
        case "exp":
          response = navigateToSection("experience");
          break;
        case "projects":
          response = navigateToSection("projects");
          break;
        case "research":
          response = navigateToSection("research");
          break;
        case "resume":
        case "resume.pdf":
          response = "Downloading ARSHAD.pdf...";
          const link = document.createElement('a');
          link.href = '/asset/ARSHAD.pdf';
          link.download = 'ARSHAD.pdf';
          link.click();
          break;
        default:
          response = `Command not found: ${cmd}. Type 'help' for options.`;
      }

      setHistory([...history, `> ${input}`, response]);
      setInput("");
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
          // 🔴 ACCESSIBILITY: Accessible name for the trigger button
          aria-label="Open system terminal interface"
          className="fixed bottom-12 right-6 z-50 p-4 bg-[#0b0d17] border border-[#00f3ff] rounded-full text-[#00f3ff] shadow-[0_0_15px_rgba(0,243,255,0.3)] hover:bg-[#00f3ff] hover:text-black transition-colors"
        >
          {/* 🔴 ACCESSIBILITY: Hide decorative icon from screen readers */}
          <TerminalIcon size={24} aria-hidden="true" />
        </motion.button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="dialog" // 🔴 ACCESSIBILITY: Define as a dialog
            aria-label="System Terminal"
            drag
            dragMomentum={false}
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            className="fixed bottom-24 right-6 w-80 md:w-96 h-96 bg-[#0b0d17]/95 backdrop-blur-md border border-white/10 rounded-lg shadow-2xl z-50 flex flex-col overflow-hidden font-mono text-sm"
          >
            {/* Header / Title Bar */}
            <div className="bg-[#15192b] p-2 flex justify-between items-center border-b border-white/10 cursor-move">
              <div className="flex items-center gap-2 px-2">
                <TerminalIcon size={14} className="text-[#00f3ff]" aria-hidden="true" />
                {/* 🔴 CONTRAST: Upgraded from gray-400 to gray-300 */}
                <span className="text-gray-300 text-xs">admin@arshad-dev:~</span>
              </div>
              <div className="flex gap-2 px-2">
                {/* 🔴 CONTRAST: Upgraded from gray-500 to gray-400 */}
                <Minus size={14} className="text-gray-400 hover:text-white cursor-pointer" aria-hidden="true" />
                <Square size={12} className="text-gray-400 hover:text-white cursor-pointer" aria-hidden="true" />
                <button 
                  onClick={() => setIsOpen(false)}
                  aria-label="Close terminal" // 🔴 ACCESSIBILITY: Discernible name for close action
                  className="flex items-center justify-center"
                >
                  <X size={14} className="text-red-500 hover:text-red-400 cursor-pointer" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Terminal Output */}
            <div className="flex-1 p-4 overflow-y-auto text-green-400 font-mono">
              {history.map((line, i) => (
                <div key={i} className="mb-1 leading-relaxed">{line}</div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Field */}
            <div className="p-3 bg-[#0b0d17] flex items-center border-t border-white/10">
              <span className="text-[#00f3ff] mr-2" aria-hidden="true">$</span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleCommand}
                // 🔴 ACCESSIBILITY: Label for input field
                aria-label="Terminal command input"
                // 🔴 CONTRAST: Upgraded placeholder from gray-600 to gray-400
                className="w-full bg-transparent outline-none text-gray-200 placeholder-gray-400"
                placeholder="Type 'help'..."
                autoFocus
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}