import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./Navbar";
import { siteConfig } from "../content";
import GlassmorphicPanel from "../components/GlassmorphicPanel";
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter, FaRedditAlien } from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: siteConfig.name + " | " + siteConfig.title,
  description: siteConfig.about.headline,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // These values should match the heatmap's logic
  const cell = 18;
  const gap = 3;
  const labelWidth = 36;
  // 53 weeks is the max for GitHub heatmap
  const weeks = 53;
  const gridWidth = weeks * (cell + gap) - gap;
  const boxWidth = gridWidth + labelWidth + 48; // 48px for left/right box padding
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-[#12161f] via-[#141a24] to-[#0f172a] text-[#f0f0f0]`}>
        {/* Background ambiance: soft radial glows + subtle grid */}
        <div className="pointer-events-none fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(800px_600px_at_20%_20%,rgba(34,211,238,0.12),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(1000px_700px_at_80%_30%,rgba(167,139,250,0.10),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(900px_700px_at_50%_85%,rgba(20,184,166,0.08),transparent_60%)]" />
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />
          <div className="absolute inset-0 bg-white/5 opacity-[0.04]" />
        </div>
        <div className="min-h-screen w-full flex justify-center items-stretch bg-transparent">
          <GlassmorphicPanel boxWidth={boxWidth}>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-1 w-full pt-14 md:pt-16">{children}</main>
              <footer className="w-full flex items-center justify-between px-8 py-6 border-t border-[#232b36] mt-auto text-gray-400 text-sm">
                <span>© 2025 ashish • all rights reserved</span>
                
              </footer>
            </div>
          </GlassmorphicPanel>
        </div>
      </body>
    </html>
  );
}