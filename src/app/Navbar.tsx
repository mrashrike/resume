"use client";
import Link from "next/link";
import { siteConfig } from "../content";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FiCalendar } from "react-icons/fi";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Experience", href: "/experience" },
  { name: "Projects", href: "/projects" },
  { name: "Resume", href: "/resume" }
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full flex items-center justify-between px-4 md:px-8 pt-6 bg-transparent">
      {/* Left pill: Site Name */}
      <div className="px-4 md:px-6 py-2 rounded-full border border-[#2a3340] bg-white/10 backdrop-blur-lg shadow-xl flex items-center" style={{boxShadow: '0 4px 32px 0 rgba(24,28,35,0.18)'}}>
        <Link href="/" className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent tracking-tight">
          {siteConfig.name}
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden px-4 py-2 rounded-full border border-[#2a3340] bg-white/10 backdrop-blur-lg"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-100"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Desktop Navigation */}
      <div className="hidden md:flex px-6 py-2 rounded-full border border-[#2a3340] bg-white/10 backdrop-blur-lg shadow-xl items-center gap-4" style={{boxShadow: '0 4px 32px 0 rgba(24,28,35,0.18)'}}>
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={`text-base font-medium transition-colors px-2 py-1 rounded-full hover:text-cyan-400 focus:outline-none ${pathname === link.href ? "text-cyan-400" : "text-gray-100"}`}
          >
            {link.name}
          </Link>
        ))}
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 mx-4 px-6 py-4 rounded-2xl border border-[#2a3340] bg-white/10 backdrop-blur-lg shadow-xl md:hidden" style={{boxShadow: '0 4px 32px 0 rgba(24,28,35,0.18)'}}>
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`text-base font-medium transition-colors px-4 py-2 rounded-full hover:text-cyan-400 focus:outline-none ${pathname === link.href ? "text-cyan-400" : "text-gray-100"}`}
              >
                {link.name}
              </Link>
            ))}
            
          </div>
          
        </div>
        
      )}
      
    </nav>
  );
} 