import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SystemTelemetry from "@/components/SystemTelemetry";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Timeline from "@/components/Timeline";
import Projects from "@/components/Projects";
import Research from "@/components/Research";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="min-h-screen selection:bg-[#00f3ff] selection:text-black overflow-hidden pb-10 relative">
      <Navbar />
      <Hero />
      <SystemTelemetry />
      <Skills />
      <Experience />
      <Timeline />
      <Projects />
      <Research />
      <Contact />
    </main>
  );
}