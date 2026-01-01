"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface HeaderProps {
  siteName?: string;
  logoUrl?: string | null;
}

export default function Header({ siteName = "JHEAC", logoUrl }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#mission", label: "Mission" },
    { href: "#projections", label: "Projections" },
    { href: "#courses", label: "Courses" },
    { href: "#about", label: "About" },
    { href: "#donate", label: "Donate" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[var(--color-navy)] shadow-lg py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          {logoUrl ? (
            <img src={logoUrl} alt={siteName} className="h-12 w-auto" />
          ) : (
            <div className="flex items-center gap-3">
              {/* Star of David Icon */}
              <div className="relative w-10 h-10">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <polygon
                    points="50,5 61,35 95,35 68,55 79,90 50,70 21,90 32,55 5,35 39,35"
                    fill="none"
                    stroke="var(--color-gold)"
                    strokeWidth="3"
                    className="group-hover:stroke-[var(--color-gold-light)] transition-colors"
                  />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-[var(--color-gold)] font-bold text-lg tracking-wider">
                  JHEAC
                </span>
                <span className="text-[var(--color-cream)] text-[10px] tracking-widest uppercase opacity-80">
                  Jewish Heritage Education
                </span>
              </div>
            </div>
          )}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[var(--color-cream)] hover:text-[var(--color-gold)] transition-colors text-sm uppercase tracking-wider font-medium"
            >
              {link.label}
            </Link>
          ))}
          <Link href="#contact" className="btn-primary text-sm rounded-sm">
            Get Involved
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-[var(--color-cream)] p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[var(--color-navy)] border-t border-[var(--color-gold)]/20 animate-fade-in">
          <nav className="flex flex-col p-6 gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[var(--color-cream)] hover:text-[var(--color-gold)] transition-colors text-sm uppercase tracking-wider font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="#contact"
              className="btn-primary text-sm rounded-sm text-center mt-4"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Get Involved
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
