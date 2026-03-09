"use client";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github } from "lucide-react";

export default function Contact() {
  return (
    <footer id="contact" className="py-24 px-6 border-t border-white/5 bg-[#0b0d17]">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <div className="font-mono text-[#00f3ff] mb-6">Initialize_Handshake::Sequence</div>
          <h2 className="text-4xl md:text-6xl font-bold mb-8">Ready to Scale?</h2>
          <p className="text-gray-300 max-w-xl mx-auto mb-12 text-lg leading-relaxed"> {/* 🔴 Contrast: gray-400 -> gray-300 */}
            Currently looking for Backend Engineering roles. If you need robust distributed systems or AI pipelines, lets talk.
          </p>

          <div className="flex justify-center gap-6 mb-16">
            <a 
              href="mailto:arshadmohd8574@gmail.com" 
              className="flex items-center gap-2 px-8 py-4 bg-[#00f3ff]/10 border border-[#00f3ff] text-[#00f3ff] hover:bg-[#00f3ff] hover:text-black transition-all font-mono rounded"
            >
              <Mail size={20} aria-hidden="true" />
              SEND_PACKET (Email)
            </a>
          </div>

          {/* 🔴 Contrast: gray-500 -> gray-400 */}
          <div className="flex justify-center gap-8 text-gray-400">
            <a 
              href="https://github.com/MohdArshad-cell" 
              target="_blank" 
              rel="noopener noreferrer" // 🔴 Security & SEO best practice
              aria-label="Visit Mohd Arshad's GitHub profile" // 🔴 ADD aria-label
              className="hover:text-white transition-colors"
            >
              <Github size={24} aria-hidden="true" />
            </a>
            <a 
              href="https://www.linkedin.com/in/mohd-arshad-156227314" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Visit Mohd Arshad's LinkedIn profile" // 🔴 ADD aria-label
              className="hover:text-white transition-colors"
            >
              <Linkedin size={24} aria-hidden="true" />
            </a>
          </div>
          
          {/* 🔴 Contrast: gray-700 -> gray-500 (gray-700 is invisible on black) */}
          <div className="mt-12 text-xs font-mono text-gray-500">
            SYSTEM_ID: MOHD_ARSHAD © 2025 // TERMINATING_SESSION
          </div>
        </motion.div>
      </div>
    </footer>
  );
}