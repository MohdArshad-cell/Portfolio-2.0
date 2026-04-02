import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";
import Terminal from "@/components/Terminal";
import StatusBar from "@/components/StatusBar";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mohd Arshad | Systems Architect",
  description: "Official terminal of Mohd Arshad. Architecting high-concurrency engines and Multi-Agent AI systems.",
  // Added Arshad_OS metadata for that "Empire" feel
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#05060a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth bg-[#05060a]">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#05060a] text-white`}>
        
        {/* The Wrapper only handles the page content and the boot screen */}
        <LayoutWrapper>
          {children}
        </LayoutWrapper>

        {/* Floating components MUST live at the root body level */}
        <Terminal /> 
        <StatusBar />

      </body>
    </html>
  );
}