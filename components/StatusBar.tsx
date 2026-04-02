"use client";
import { useState, useEffect } from "react";
import { Wifi, MapPin, Globe, Activity } from "lucide-react";

export default function StatusBar() {
  const [location, setLocation] = useState("SCANNING_NODES...");
  const [ip, setIp] = useState("0.0.0.0");
  const [time, setTime] = useState("");

  useEffect(() => {
    // 1. Clock: Professional UTC Sync
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { 
        hour12: false, 
        timeZone: 'UTC',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }));
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);

    // StatusBar.tsx mein fetchIntel ko aise badlo:

const fetchIntel = async () => {
  try {
    // External URL ki jagah apne local API route ko call karo
    const res = await fetch('/api/location'); 
    const data = await res.json();
    
    // ipwho.is (jo tum route.ts mein use kar rahe ho) ka response structure check karo
    if (data.success !== false) {
      setLocation(`${data.city}, ${data.country_code}`);
      setIp(data.ip);
    } else {
      setLocation("ANONYMOUS_NODE");
    }
  } catch (err) {
    setLocation("OFFLINE_MODE");
    console.error("SYS_INTEL_FAILURE:", err);
  }
};

    fetchIntel();
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-0 w-full bg-[#05060a]/90 backdrop-blur-xl border-t border-white/5 py-2 px-6 flex justify-between items-center text-[9px] md:text-[10px] font-mono font-black tracking-widest text-gray-500 z-[100] select-none uppercase transition-all duration-500">
      
      {/* Left HUD: Connection Metrics */}
      <div className="flex gap-6 items-center">
        <div className="flex items-center gap-2 text-[#00f3ff]">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00f3ff] opacity-40"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#00f3ff]"></span>
          </div>
          <span className="hidden sm:inline">UPLINK_ESTABLISHED</span>
          <span className="sm:hidden">ACTIVE</span>
        </div>
        
        <div className="hidden lg:flex items-center gap-2 border-l border-white/10 pl-6 group cursor-crosshair">
          <Globe size={11} className="group-hover:text-[#00f3ff] transition-colors" />
          <span className="group-hover:text-white transition-colors">REMOTE_IP: <span className="text-gray-400">{ip}</span></span>
        </div>

        <div className="hidden xl:flex items-center gap-2 border-l border-white/10 pl-6">
          <Activity size={11} className="text-emerald-500" />
          <span>PKT_LOSS: 0%</span>
        </div>
      </div>

      {/* Right HUD: Temporal & Geospatial Data */}
      <div className="flex gap-8 items-center">
        <div className="flex items-center gap-2 text-white group cursor-default">
          <MapPin size={11} className="text-emerald-400 group-hover:animate-bounce" />
          <span className="tracking-[0.2em]">{location}</span>
        </div>
        
        <div className="flex items-center gap-3 border-l border-white/10 pl-8 text-[#00f3ff] font-bold min-w-[100px] justify-end">
          <span className="text-gray-600 font-black">UTC_SYNC:</span>
          <span className="tabular-nums">{time}</span>
        </div>
      </div>
    </div>
  );
}