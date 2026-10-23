import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { GithubIcon, LinkedinIcon, LeetcodeIcon } from './Icons';
import { personalInfo } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';

export default function Header() {
  const { theme, toggleTheme, isDark } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const location = useLocation();

  const navLinks = [
    { label: 'ABOUT', targetId: 'about' },
    { label: 'WORK', targetId: 'work' },
    { label: 'OPEN SOURCE CONTRIBUTIONS', targetId: 'open-source' },
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

    const hashTarget = `#${targetId}`;
    if (window.location.hash !== hashTarget) {
      window.history.pushState({ section: targetId, entered: true }, '', hashTarget);
    }

    if (targetId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const elem = document.getElementById(targetId);
      if (elem) {
        const headerOffset = 76;
        const elemPosition = elem.getBoundingClientRect().top;
        const offsetPosition = elemPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: 'smooth',
        });
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out font-serif ${
        scrolled
          ? 'py-3 sm:py-3.5 bg-[#F7F3ED]/95 dark:bg-[#141210]/95 backdrop-blur-md border-b border-[#DED3C5] dark:border-[#38332E] shadow-[0_4px_20px_-4px_rgba(41,37,34,0.06)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.3)]'
          : 'py-4 sm:py-5 bg-[#F7F3ED]/90 dark:bg-[#141210]/90 backdrop-blur-md border-b border-[#DED3C5]/40 dark:border-[#38332E]/40'
      }`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between">
        
        {/* Left: Brand Signature */}
        <a
          href="#home"
          onClick={(e) => scrollToSection(e, 'home')}
          className="group flex items-center tracking-tight transition-all duration-250 hover:-translate-y-0.5 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A8875A] dark:focus-visible:ring-[#C4A67B] rounded-lg py-1 pr-2"
          aria-label="Return to home"
        >
          <span className="text-base sm:text-lg font-bold tracking-[0.14em] uppercase text-[#292522] dark:text-[#F5EFEB] group-hover:text-[#A8875A] dark:group-hover:text-[#C4A67B] transition-colors duration-250">
            {personalInfo.brandName}
          </span>
        </a>

        {/* Right: Desktop Navigation + Theme Toggle + Subtle Socials */}
        <div className="hidden lg:flex items-center gap-4 xl:gap-6">
          <nav className="flex items-center gap-3.5 xl:gap-5" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = activeSection === link.targetId;
              return (
                <a
                  key={link.label}
                  href={`#${link.targetId}`}
                  onClick={(e) => scrollToSection(e, link.targetId)}
                  className={`text-xs xl:text-sm font-semibold tracking-[0.08em] xl:tracking-[0.11em] whitespace-nowrap transition-all duration-250 relative py-1.5 px-1 rounded hover:-translate-y-0.5 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A8875A] dark:focus-visible:ring-[#C4A67B] group ${
                    isActive
                      ? 'text-[#292522] dark:text-[#F5EFEB]'
                      : 'text-[#5F5750] dark:text-[#D1C8C0] hover:text-[#292522] dark:hover:text-[#F5EFEB]'
                  }`}
                >
                  <span>{link.label}</span>
                  {/* Subtle animated underline */}
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] bg-[#A8875A] dark:bg-[#C4A67B] shadow-[0_0_8px_rgba(168,135,90,0.4)] transition-all duration-250 ${
                      isActive ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          <div className="w-[1px] h-4 bg-[#DED3C5] dark:bg-[#38332E]" />

          {/* Social Icons */}
          <div className="flex items-center gap-1.5">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-hover-effect text-[#5F5750] dark:text-[#D1C8C0] hover:text-[#A8875A] dark:hover:text-[#C4A67B] hover:bg-[#EDE4D8]/60 dark:hover:bg-[#24201D] border border-transparent hover:border-[#DED3C5] dark:hover:border-[#38332E] p-2 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A8875A] dark:focus-visible:ring-[#C4A67B]"
              title="GitHub Profile"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-hover-effect text-[#5F5750] dark:text-[#D1C8C0] hover:text-[#A8875A] dark:hover:text-[#C4A67B] hover:bg-[#EDE4D8]/60 dark:hover:bg-[#24201D] border border-transparent hover:border-[#DED3C5] dark:hover:border-[#38332E] p-2 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A8875A] dark:focus-visible:ring-[#C4A67B]"
              title="LinkedIn Profile"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href={personalInfo.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-hover-effect text-[#5F5750] dark:text-[#D1C8C0] hover:text-[#A8875A] dark:hover:text-[#C4A67B] hover:bg-[#EDE4D8]/60 dark:hover:bg-[#24201D] border border-transparent hover:border-[#DED3C5] dark:hover:border-[#38332E] p-2 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A8875A] dark:focus-visible:ring-[#C4A67B]"
              title="LeetCode Profile"
              aria-label="LeetCode Profile"
            >
              <LeetcodeIcon className="w-4 h-4" />
            </a>
          </div>

          <div className="w-[1px] h-4 bg-[#DED3C5] dark:bg-[#38332E]" />

          {/* Desktop Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="btn-hover-effect group p-2 text-[#5F5750] hover:text-[#292522] dark:text-[#D1C8C0] dark:hover:text-[#F5EFEB] hover:bg-[#EDE4D8]/70 dark:hover:bg-[#24201D] border border-[#DED3C5] dark:border-[#38332E] hover:border-[#A8875A] dark:hover:border-[#C4A67B] rounded-xl cursor-pointer flex items-center justify-center shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A8875A] dark:focus-visible:ring-[#C4A67B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F7F3ED] dark:focus-visible:ring-offset-[#141210]"
            aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
            title={isDark ? "Switch to light theme" : "Switch to dark theme"}
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-[#C4A67B] transition-transform duration-250 group-hover:rotate-45" />
            ) : (
              <Moon className="w-4 h-4 text-[#A8875A] transition-transform duration-250 group-hover:-rotate-12" />
            )}
          </button>
        </div>

        {/* Mobile / Tablet Header Actions (Theme Toggle + Menu Button) */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="btn-hover-effect p-2 text-[#5F5750] dark:text-[#D1C8C0] hover:text-[#292522] dark:hover:text-[#F5EFEB] hover:bg-[#EDE4D8]/60 dark:hover:bg-[#24201D] border border-[#DED3C5] dark:border-[#38332E] hover:border-[#A8875A] dark:hover:border-[#C4A67B] rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A8875A] dark:focus-visible:ring-[#C4A67B]"
            aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
            title={isDark ? "Switch to light theme" : "Switch to dark theme"}
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-[#C4A67B]" />
            ) : (
              <Moon className="w-4 h-4 text-[#A8875A]" />
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="btn-hover-effect p-2.5 rounded-xl text-[#292522] dark:text-[#F5EFEB] hover:text-[#A8875A] dark:hover:text-[#C4A67B] hover:bg-[#EDE4D8]/60 dark:hover:bg-[#24201D] border border-transparent hover:border-[#DED3C5] dark:hover:border-[#38332E] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A8875A] dark:focus-visible:ring-[#C4A67B]"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FFFCF7]/98 dark:bg-[#1C1917]/98 backdrop-blur-xl border-b border-[#DED3C5] dark:border-[#38332E] px-6 sm:px-10 py-7 shadow-xl animate-in fade-in slide-in-from-top-3 duration-250">
          <div className="flex flex-col gap-4 max-w-sm mx-auto">
            {navLinks.map((link) => {
              const isActive = activeSection === link.targetId;
              return (
                <a
                  key={link.label}
                  href={`#${link.targetId}`}
                  onClick={(e) => scrollToSection(e, link.targetId)}
                  className={`text-xs sm:text-sm font-semibold tracking-[0.14em] py-2 transition-all duration-200 hover:translate-x-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A8875A] dark:focus-visible:ring-[#C4A67B] rounded flex items-center justify-between ${
                    isActive
                      ? 'text-[#A8875A] dark:text-[#C4A67B] border-l-2 border-[#A8875A] dark:border-[#C4A67B] pl-3'
                      : 'text-[#5F5750] dark:text-[#D1C8C0] hover:text-[#292522] dark:hover:text-[#F5EFEB] pl-3'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#A8875A] dark:bg-[#C4A67B]" />}
                </a>
              );
            })}

            {/* Mobile Theme Toggle Card */}
            <button
              onClick={toggleTheme}
              className="btn-hover-effect mt-2 flex items-center justify-between w-full py-2.5 px-3.5 rounded-xl bg-[#EDE4D8]/50 dark:bg-[#24201D] hover:bg-[#EDE4D8] dark:hover:bg-[#2D2824] text-xs font-semibold tracking-wider text-[#292522] dark:text-[#F5EFEB] border border-[#DED3C5] dark:border-[#38332E] hover:border-[#A8875A] dark:hover:border-[#C4A67B] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A8875A] dark:focus-visible:ring-[#C4A67B]"
              aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
            >
              <span className="flex items-center gap-2">
                {isDark ? <Sun className="w-4 h-4 text-[#C4A67B]" /> : <Moon className="w-4 h-4 text-[#A8875A]" />}
                <span>{isDark ? 'LIGHT THEME' : 'DARK THEME'}</span>
              </span>
              <span className="text-[11px] font-clean text-[#7D736A] dark:text-[#9E9389]">
                {isDark ? 'Switch to light' : 'Switch to dark'}
              </span>
            </button>

            <div className="pt-4 mt-2 border-t border-[#DED3C5] dark:border-[#38332E] flex items-center justify-between px-3">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-hover-effect flex items-center gap-2 text-xs text-[#5F5750] dark:text-[#D1C8C0] hover:text-[#A8875A] dark:hover:text-[#C4A67B] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A8875A] dark:focus-visible:ring-[#C4A67B] p-1.5 rounded-lg"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-hover-effect flex items-center gap-2 text-xs text-[#5F5750] dark:text-[#D1C8C0] hover:text-[#A8875A] dark:hover:text-[#C4A67B] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A8875A] dark:focus-visible:ring-[#C4A67B] p-1.5 rounded-lg"
              >
                <LinkedinIcon className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
              <a
                href={personalInfo.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-hover-effect flex items-center gap-2 text-xs text-[#5F5750] dark:text-[#D1C8C0] hover:text-[#A8875A] dark:hover:text-[#C4A67B] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A8875A] dark:focus-visible:ring-[#C4A67B] p-1.5 rounded-lg"
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
