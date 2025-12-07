"use client";
import { motion } from "framer-motion";
import { Terminal } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100 }} 
      animate={{ y: 0 }} 
      transition={{ duration: 0.5 }}
      className="fixed top-0 w-full z-50 px-6 py-4 backdrop-blur-md border-b border-white/5 bg-[#0b0d17]/80"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 text-[#00f3ff] font-mono text-lg font-bold group">
          <Terminal size={20} className="group-hover:text-[#7000ff] transition-colors"/>
          <span>ARSHAD_DEV::ROOT</span>
        </Link>

        <div className="hidden md:flex gap-8 font-mono text-sm text-gray-400">
          {["About", "Skills", "Projects", "Research"].map((item, index) => (
            <Link 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              className="hover:text-[#00f3ff] transition-colors"
            >
              0{index + 1}_{item.toUpperCase()}
            </Link>
          ))}
          <Link 
            href="#contact" 
            className="text-[#00f3ff] border border-[#00f3ff] px-4 py-1 hover:bg-[#00f3ff] hover:text-black transition-all font-bold"
          >
            ./HIRE_ME
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}