import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { GithubIcon, LinkedinIcon, LeetcodeIcon } from './Icons';
import { personalInfo } from '../data/portfolioData';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const location = useLocation();

  const navLinks = [
    { label: 'ABOUT', targetId: 'about' },
    { label: 'WORK', targetId: 'work' },
    { label: 'EXPERIENCE', targetId: 'experience' },
    { label: 'EDUCATION', targetId: 'education' },
    { label: 'CERTIFICATIONS', targetId: 'certifications' },
    { label: 'CONTACT', targetId: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // IntersectionObserver to highlight active section
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0,
    };

    const sectionElements = navLinks
      .map((link) => document.getElementById(link.targetId))
      .filter(Boolean);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sectionElements.forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      sectionElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const scrollToSection = (e, targetId) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      window.location.href = `/#${targetId}`;
      return;
    }
    const elem = document.getElementById(targetId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-out font-serif ${
        scrolled
          ? 'py-3 sm:py-3.5 bg-[#F7F3ED]/92 backdrop-blur-md border-b border-[#DED3C5] shadow-[0_4px_20px_-4px_rgba(41,37,34,0.06)]'
          : 'py-4 sm:py-6 bg-[#F7F3ED]/70 backdrop-blur-sm border-b border-[#DED3C5]/40'
      }`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between">
        
        {/* Left: Brand Signature */}
        <a
          href="#home"
          onClick={(e) => scrollToSection(e, 'home')}
          className="group flex items-center tracking-tight transition-all duration-250 focus-visible:ring-2 focus-visible:ring-[#A8875A] rounded-lg py-1 pr-2"
          aria-label="Return to home"
        >
          <span className="text-base sm:text-lg font-bold tracking-[0.14em] uppercase text-[#292522] group-hover:text-[#A8875A] transition-colors duration-250">
            {personalInfo.brandName}
          </span>
        </a>

        {/* Right: Desktop Navigation + Subtle Socials */}
        <div className="hidden lg:flex items-center gap-7 xl:gap-8">
          <nav className="flex items-center gap-5 xl:gap-6" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = activeSection === link.targetId;
              return (
                <a
                  key={link.label}
                  href={`#${link.targetId}`}
                  onClick={(e) => scrollToSection(e, link.targetId)}
                  className={`text-sm font-semibold tracking-[0.12em] transition-all duration-250 relative py-1.5 focus-visible:ring-2 focus-visible:ring-[#A8875A] rounded group ${
                    isActive ? 'text-[#292522]' : 'text-[#5F5750] hover:text-[#292522]'
                  }`}
                >
                  <span>{link.label}</span>
                  {/* Subtle animated underline */}
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] bg-[#A8875A] shadow-[0_0_8px_rgba(168,135,90,0.4)] transition-all duration-250 ${
                      isActive ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          <div className="w-[1px] h-4 bg-[#DED3C5]" />

          <div className="flex items-center gap-2">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#5F5750] hover:text-[#A8875A] hover:bg-[#EDE4D8]/60 p-2 transition-all duration-250 focus-visible:ring-2 focus-visible:ring-[#A8875A] rounded-xl hover:-translate-y-0.5 active:scale-95"
              title="GitHub Profile"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#5F5750] hover:text-[#A8875A] hover:bg-[#EDE4D8]/60 p-2 transition-all duration-250 focus-visible:ring-2 focus-visible:ring-[#A8875A] rounded-xl hover:-translate-y-0.5 active:scale-95"
              title="LinkedIn Profile"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href={personalInfo.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#5F5750] hover:text-[#A8875A] hover:bg-[#EDE4D8]/60 p-2 transition-all duration-250 focus-visible:ring-2 focus-visible:ring-[#A8875A] rounded-xl hover:-translate-y-0.5 active:scale-95"
              title="LeetCode Profile"
              aria-label="LeetCode Profile"
            >
              <LeetcodeIcon className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Mobile / Tablet Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2.5 rounded-xl text-[#292522] hover:text-[#A8875A] hover:bg-[#EDE4D8]/60 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#A8875A]"
          aria-label="Toggle Navigation Menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FFFCF7]/98 backdrop-blur-xl border-b border-[#DED3C5] px-6 sm:px-10 py-7 shadow-xl animate-in fade-in slide-in-from-top-3 duration-250">
          <div className="flex flex-col gap-4 max-w-sm mx-auto">
            {navLinks.map((link) => {
              const isActive = activeSection === link.targetId;
              return (
                <a
                  key={link.label}
                  href={`#${link.targetId}`}
                  onClick={(e) => scrollToSection(e, link.targetId)}
                  className={`text-xs sm:text-sm font-semibold tracking-[0.14em] py-2 transition-colors flex items-center justify-between ${
                    isActive
                      ? 'text-[#A8875A] border-l-2 border-[#A8875A] pl-3'
                      : 'text-[#5F5750] hover:text-[#292522] pl-3'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#A8875A]" />}
                </a>
              );
            })}

            <div className="pt-4 mt-2 border-t border-[#DED3C5] flex items-center justify-between px-3">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-[#5F5750] hover:text-[#A8875A]"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-[#5F5750] hover:text-[#A8875A]"
              >
                <LinkedinIcon className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
              <a
                href={personalInfo.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-[#5F5750] hover:text-[#A8875A]"
              >
                <LeetcodeIcon className="w-4 h-4" />
                <span>LeetCode</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
