"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface HeaderProps {
  siteName?: string;
  logoUrl?: string | null;
}

export default function Header({ siteName = "JHEA", logoUrl }: HeaderProps) {
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
    { href: "#news", label: "News" },
    { href: "#donate", label: "Donate" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-(--color-navy) shadow-lg py-2" : "bg-transparent py-3"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          {logoUrl ? (
            <Image
              src={logoUrl}
              alt={siteName}
              width={100}
              height={100}
              className="h-12 w-auto"
            />
          ) : (
            <div className="relative shrink-0 h-12 flex items-center">
              <Image
                src="/LOGO.svg"
                alt={siteName}
                width={300}
                height={48}
                className="w-[300px] h-auto object-contain"
                priority
                unoptimized
              />
            </div>
          )}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[var(--color-cream)] hover:text-[var(--color-white)] transition-colors text-sm uppercase tracking-wider font-medium"
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
        <div className="md:hidden bg-[var(--color-navy)] border-t border-[var(--color-white)]/20 animate-fade-in">
          <nav className="flex flex-col p-6 gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[var(--color-cream)] hover:text-[var(--color-white)] transition-colors text-sm uppercase tracking-wider font-medium py-2"
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
