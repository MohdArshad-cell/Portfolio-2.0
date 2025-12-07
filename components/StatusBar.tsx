"use client";
import { useState, useEffect } from "react";
import { Wifi, MapPin, Globe } from "lucide-react";

export default function StatusBar() {
  const [location, setLocation] = useState("LOCATING...");
  const [ip, setIp] = useState("0.0.0.0");
  const [time, setTime] = useState("");

  useEffect(() => {
    // 1. Clock
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
    }, 1000);

    // 2. Fetch Real User Data (The Backend Flex)
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        setLocation(`${data.city}, ${data.country_code}`);
        setIp(data.ip);
      })
      .catch(() => setLocation("UNKNOWN_ORIGIN"));

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-0 w-full bg-[#0b0d17] border-t border-white/10 py-1 px-4 flex justify-between items-center text-[10px] md:text-xs font-mono text-gray-500 z-40 select-none">
      <div className="flex gap-4 md:gap-6">
        <div className="flex items-center gap-2 text-[#00f3ff]">
          <Wifi size={12} />
          <span>CONNECTED</span>
        </div>
        <div className="hidden md:flex items-center gap-2 hover:text-white transition-colors">
          <Globe size={12} />
          <span>CLIENT_IP: {ip}</span>
        </div>
      </div>

      <div className="flex gap-4 md:gap-6">
        <div className="flex items-center gap-2 text-green-400">
          <MapPin size={12} />
          <span>{location.toUpperCase()}</span>
        </div>
        <div className="text-[#00f3ff]">
          {time} UTC
        </div>
      </div>
    </div>
  );
}