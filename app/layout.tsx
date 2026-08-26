import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";
import StatusBar from "@/components/StatusBar";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import { ThemeProvider } from "@/components/ThemeProvider";
import SkipToContent from "@/components/SkipToContent";
import TerminalWrapper from "@/components/TerminalWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// 1. Keep this for SEO
export const metadata: Metadata = {
  title: "Mohd Arshad | Systems Architect",
  description: "Official terminal of Mohd Arshad. Architecting high-concurrency engines and Multi-Agent AI systems.",
};

// 2. MOVE viewport and themeColor HERE
export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#05060a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Mohd Arshad",
    "jobTitle": "Systems Architect",
    "url": "https://mohdarshad.com", // Replace with real URL later
    "sameAs": [
      "https://github.com/mohdarshad-cell",
      "https://linkedin.com/in/mohdarshad" // Replace with real URL later
    ]
  };

  return (
    <html lang="en" className="scroll-smooth bg-white dark:bg-[#05060a]" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased bg-white dark:bg-[#05060a] text-gray-900 dark:text-white transition-colors duration-300`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
        
        <SkipToContent />
        
        {/* Scroll Progress Bar at the very top */}
        <ScrollProgress />

        {/* The Wrapper only handles the page content and the boot screen */}
        <LayoutWrapper>
          {children}
        </LayoutWrapper>

        {/* Floating components MUST live at the root body level */}
        <TerminalWrapper /> 
        <StatusBar />
        <BackToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}