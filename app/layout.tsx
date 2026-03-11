import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";

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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#05060a] text-white`}
      >
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}