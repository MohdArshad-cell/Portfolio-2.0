"use client";
import { useState, useEffect } from "react";
import { Wifi, MapPin, Globe } from "lucide-react";

export default function StatusBar() {
  const [location, setLocation] = useState("LOCATING...");
  const [ip, setIp] = useState("0.0.0.0");
  const [time, setTime] = useState("");

  useEffect(() => {
    // 1. Clock
    const updateTime = () => {
      // "UTC" label ke liye actual UTC time use karte hain taaki professional lage
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour12: false, timeZone: 'UTC' }));
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);

    // 2. Fetch Real User Data (Using ipwho.is - More reliable for Portfolios)
    fetch('https://ipwho.is/')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setLocation(`${data.city}, ${data.country_code}`);
          setIp(data.ip);
        } else {
          console.warn("IP Fetch Error:", data.message);
          setLocation("UNKNOWN_ORIGIN");
        }
      })
      .catch((err) => {
        console.error("Network Error:", err);
        setLocation("OFFLINE_MODE");
      });

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-0 w-full bg-[#0b0d17] border-t border-white/10 py-1 px-4 flex justify-between items-center text-[10px] md:text-xs font-mono text-gray-500 z-50 select-none backdrop-blur-md bg-[#0b0d17]/90">
      <div className="flex gap-4 md:gap-6">
        <div className="flex items-center gap-2 text-[#00f3ff]">
          <Wifi size={12} />
          <span className="hidden sm:inline">SYSTEM_ONLINE</span>
          <span className="sm:hidden">ON</span>
        </div>
        <div className="hidden md:flex items-center gap-2 hover:text-white transition-colors cursor-help" title="Your Public IP">
          <Globe size={12} />
          <span>CLIENT_IP: {ip}</span>
        </div>
      </div>

      <div className="flex gap-4 md:gap-6">
        <div className="flex items-center gap-2 text-green-400">
          <MapPin size={12} />
          <span>{location.toUpperCase()}</span>
        </div>
        <div className="text-[#00f3ff] min-w-[60px] text-right">
          {time} UTC
        </div>
      </div>
    </div>
  );
}