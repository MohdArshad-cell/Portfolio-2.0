"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Server, Cpu, Database, Activity, Network } from "lucide-react";

export default function SystemTelemetry() {
  const [metrics, setMetrics] = useState({
    cpu: 42.5,
    ram: 68.2,
    latency: 12,
    connections: 1024,
    cacheHit: 98.4,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        cpu: Math.max(10, Math.min(99, prev.cpu + (Math.random() * 10 - 5))),
        ram: Math.max(20, Math.min(95, prev.ram + (Math.random() * 4 - 2))),
        latency: Math.max(5, Math.min(40, prev.latency + (Math.random() * 8 - 4))),
        connections: Math.max(500, Math.min(2000, prev.connections + Math.floor(Math.random() * 50 - 25))),
        cacheHit: Math.max(90, Math.min(99.9, prev.cacheHit + (Math.random() * 1 - 0.5))),
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-12 px-6 bg-[#05060a] relative overflow-hidden border-y border-white/5 font-mono">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:20px_20px]" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex items-center gap-4 mb-8">
          <Activity className="text-[#00f3ff] animate-pulse" size={20} />
          <h2 className="text-[#00f3ff] text-xs uppercase tracking-[0.3em] font-black">Live_System_Telemetry</h2>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-[#00f3ff]/30 to-transparent" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          
          {/* CPU Load */}
          <div className="bg-black/40 border border-white/10 p-5 group hover:border-[#00f3ff]/50 transition-colors relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-100 transition-opacity">
              <Cpu size={16} className="text-[#00f3ff]" />
            </div>
            <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-2 font-bold">CPU_Load</div>
            <div className="text-2xl font-black text-white">{metrics.cpu.toFixed(1)}<span className="text-[#00f3ff] text-sm">%</span></div>
            <div className="w-full h-1 bg-white/5 mt-3">
              <motion.div 
                className="h-full bg-[#00f3ff]" 
                animate={{ width: `${metrics.cpu}%` }} 
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* RAM Usage */}
          <div className="bg-black/40 border border-white/10 p-5 group hover:border-[#7000ff]/50 transition-colors relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-100 transition-opacity">
              <Server size={16} className="text-[#7000ff]" />
            </div>
            <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-2 font-bold">Memory_Alloc</div>
            <div className="text-2xl font-black text-white">{metrics.ram.toFixed(1)}<span className="text-[#7000ff] text-sm">GB</span></div>
            <div className="w-full h-1 bg-white/5 mt-3">
              <motion.div 
                className="h-full bg-[#7000ff]" 
                animate={{ width: `${(metrics.ram / 128) * 100}%` }} 
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* P99 Latency */}
          <div className="bg-black/40 border border-white/10 p-5 group hover:border-emerald-500/50 transition-colors relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-100 transition-opacity">
              <Activity size={16} className="text-emerald-500" />
            </div>
            <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-2 font-bold">P99_Latency</div>
            <div className="text-2xl font-black text-white">{metrics.latency.toFixed(0)}<span className="text-emerald-500 text-sm">ms</span></div>
            <div className="w-full h-1 bg-white/5 mt-3">
              <motion.div 
                className="h-full bg-emerald-500" 
                animate={{ width: `${(metrics.latency / 100) * 100}%` }} 
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Active Connections */}
          <div className="bg-black/40 border border-white/10 p-5 group hover:border-orange-500/50 transition-colors relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-100 transition-opacity">
              <Network size={16} className="text-orange-500" />
            </div>
            <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-2 font-bold">Active_Sockets</div>
            <div className="text-2xl font-black text-white">{metrics.connections.toLocaleString()}<span className="text-orange-500 text-sm"></span></div>
            <div className="w-full h-1 bg-white/5 mt-3">
              <motion.div 
                className="h-full bg-orange-500" 
                animate={{ width: `${(metrics.connections / 3000) * 100}%` }} 
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Redis Cache Hit */}
          <div className="bg-black/40 border border-white/10 p-5 group hover:border-pink-500/50 transition-colors relative overflow-hidden col-span-2 md:col-span-1">
            <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-100 transition-opacity">
              <Database size={16} className="text-pink-500" />
            </div>
            <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-2 font-bold">Redis_Hit_Ratio</div>
            <div className="text-2xl font-black text-white">{metrics.cacheHit.toFixed(1)}<span className="text-pink-500 text-sm">%</span></div>
            <div className="w-full h-1 bg-white/5 mt-3">
              <motion.div 
                className="h-full bg-pink-500" 
                animate={{ width: `${metrics.cacheHit}%` }} 
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
