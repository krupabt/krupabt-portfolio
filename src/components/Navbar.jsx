import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'DSA', href: '#dsa' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'py-4 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-sm' 
        : 'py-6 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        
        {/* Left: Brand Monogram / Name */}
        <a href="#hero" className="flex items-center gap-2.5 group">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs tracking-tight transition-colors ${
            scrolled
              ? 'bg-slate-900 text-white group-hover:bg-blue-600'
              : 'bg-white/10 text-white border border-white/20 group-hover:bg-white/20'
          }`}>
            KB
          </div>
          <span className={`font-bold text-base sm:text-lg tracking-tight transition-colors ${
            scrolled
              ? 'text-slate-900 group-hover:text-blue-600'
              : 'text-white group-hover:text-cinematic-lavender'
          }`}>
            {personalInfo.name}
          </span>
        </a>

        {/* Right: Modern Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                scrolled
                  ? 'text-slate-600 hover:text-slate-900'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              {link.label}
            </a>
          ))}

          <a
            href={`mailto:${personalInfo.email}`}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all border ${
              scrolled
                ? 'text-slate-900 bg-slate-100 hover:bg-slate-200 border-slate-200'
                : 'text-white bg-white/10 hover:bg-white/20 border-white/20 backdrop-blur-sm'
            }`}
          >
            <span>Get in Touch</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </nav>

        {/* Mobile Hamburger Trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`md:hidden p-2 rounded-lg transition-colors ${
            scrolled
              ? 'text-slate-700 hover:text-slate-900 bg-slate-100'
              : 'text-white hover:text-slate-200 bg-white/10'
          }`}
          aria-label="Toggle navigation"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-cinematic-950/95 backdrop-blur-xl border-b border-white/10 px-6 py-5 shadow-2xl animate-in fade-in">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-slate-200 py-1.5 hover:text-cinematic-lavender transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href={`mailto:${personalInfo.email}`}
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 text-center py-2.5 rounded-xl text-sm font-semibold bg-white text-slate-950 hover:bg-cinematic-lavender transition-colors"
            >
              Email Me
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
