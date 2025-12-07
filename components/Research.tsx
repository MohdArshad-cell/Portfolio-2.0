"use client";
import { motion } from "framer-motion";
import { FileText, Download } from "lucide-react";

export default function Research() {
  return (
    <section id="research" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="glass-card p-10 md:p-14 rounded-3xl border border-green-500/20 relative overflow-hidden"
        >
          {/* Background Decor */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-[80px] pointer-events-none"></div>

          <div className="flex flex-col md:flex-row items-start gap-8 relative z-10">
            <div className="p-5 bg-[#0b0d17] border border-green-500/30 rounded-2xl text-green-400">
              <FileText size={40} />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-mono rounded-full">
                  PUBLICATION
                </span>
                <span className="text-gray-500 font-mono text-xs">Jan 2025</span>
              </div>
              
              <h3 className="text-3xl font-bold mb-4">GeoSentinel: Real-Time Geopolitical Tension Analysis</h3>
              
              <p className="text-gray-400 leading-relaxed mb-8">
                Authored a technical research paper validating the <span className="text-gray-200">Granger Causal link (p &lt; 0.05)</span> between 
                unstructured narrative sentiment and kinetic conflict. Utilizing 
                <span className="text-green-400 font-mono text-sm mx-1">PCA</span> and 
                <span className="text-green-400 font-mono text-sm mx-1">DistilBERT</span>, 
                the model achieved 92% correlation accuracy against historical baselines.
              </p>

              <a 
                href="/asset/Geosentinal.pdf" 
                target="_blank"
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-black font-bold rounded hover:bg-green-400 transition-all font-mono"
              >
                <Download size={18} />
                READ_RESEARCH_PAPER
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}