"use client";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience"; // ✅ NEW: Import Experience
import Projects from "@/components/Projects";
import Research from "@/components/Research";
import Contact from "@/components/Contact";
import Terminal from "@/components/Terminal";   
import StatusBar from "@/components/StatusBar"; 

export default function Home() {
  return (
    <main className="bg-[#0b0d17] min-h-screen text-gray-300 selection:bg-[#00f3ff] selection:text-black overflow-hidden pb-10 relative">
      <Navbar />
      <Hero />
      <Skills />
      
      {/* ✅ NEW: Experience Section Added Here */}
      <Experience />
      
      <Projects />
    
      <Research />
      <Contact />
      
      {/* Floating Utilities */}
      <Terminal />
      <StatusBar />
    </main>
  );
}