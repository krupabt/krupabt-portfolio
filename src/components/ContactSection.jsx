import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, Mail, ArrowUp } from 'lucide-react';
import { GithubIcon, LinkedinIcon, LeetcodeIcon } from './Icons';
import { personalInfo } from '../data/portfolioData';

export default function ContactSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    // Triggers when 20-30% of the section enters the viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.22, rootMargin: '0px 0px -10% 0px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="contact"
      ref={sectionRef}
      className="relative pt-36 sm:pt-48 pb-16 text-[#F8F7FF] overflow-hidden"
      role="contentinfo"
      aria-label="Contact and Social Links"
    >
      {/* Subtle Top Section Transition Divider */}
      <div className="section-divider absolute top-0 left-0 right-0" />

      {/* ─────────────────────────────────────────────────────────────
          FINAL SCENE ATMOSPHERE: SUBTLE BLUE & DEEP NAVY GLOW
      ───────────────────────────────────────────────────────────── */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[850px] sm:w-[1100px] h-[580px] rounded-full blur-[190px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(91, 140, 255, 0.18) 0%, rgba(17, 24, 39, 0.45) 50%, transparent 80%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute top-1/4 right-10 w-[480px] h-[480px] rounded-full blur-[160px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(122, 162, 255, 0.08) 0%, rgba(13, 17, 24, 0.45) 50%, transparent 75%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10 text-center flex flex-col items-center font-sans">
        
        {/* Eyebrow */}
        <div
          className="inline-flex items-center gap-2.5 mb-6"
          style={{
            transition: 'opacity 700ms cubic-bezier(0.22, 1, 0.36, 1), transform 700ms cubic-bezier(0.22, 1, 0.36, 1)',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0px)' : 'translateY(20px)',
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#5B8CFF] animate-pulse" />
          <span className="text-xs font-mono tracking-[0.25em] uppercase text-[#7AA2FF] font-semibold">
            GET IN TOUCH
          </span>
        </div>

        {/* Grand Headline: LET'S BUILD SOMETHING MEANINGFUL. */}
        <h2
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.05] text-[#F5F7FA] max-w-4xl text-balance mb-8"
          style={{
            transition: 'opacity 1100ms cubic-bezier(0.22, 1, 0.36, 1) 100ms, transform 1100ms cubic-bezier(0.22, 1, 0.36, 1) 100ms, filter 1100ms cubic-bezier(0.22, 1, 0.36, 1) 100ms',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'scale(1)' : 'scale(0.90)',
            filter: isVisible ? 'blur(0px)' : 'blur(6px)',
          }}
        >
          <span className="block text-[#F5F7FA]">LET'S</span>
          <span className="block text-[#F5F7FA]">BUILD</span>
          <span className="block text-[#F5F7FA]">SOMETHING</span>
          <span className="block text-[#5B8CFF]">MEANINGFUL.</span>
        </h2>

        {/* Subtitle */}
        <p
          className="text-base sm:text-xl text-[#9AA4B2] font-normal max-w-xl leading-relaxed mb-12 text-balance"
          style={{
            transition: 'opacity 800ms cubic-bezier(0.22, 1, 0.36, 1) 350ms, transform 800ms cubic-bezier(0.22, 1, 0.36, 1) 350ms',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0px)' : 'translateY(25px)',
          }}
        >
          Have an idea, opportunity, or project in mind? Open to impactful full-stack, Python, and AI software engineering conversations.
        </p>

        {/* Primary Contact Channels revealed underneath */}
        <div
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-20"
          style={{
            transition: 'opacity 800ms cubic-bezier(0.22, 1, 0.36, 1) 500ms, transform 800ms cubic-bezier(0.22, 1, 0.36, 1) 500ms',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0px) scale(1)' : 'translateY(30px) scale(0.96)',
          }}
        >
          {/* Email */}
          <a
            href={`mailto:${personalInfo.email}`}
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-xs sm:text-sm tracking-[0.16em] uppercase text-white bg-[#5B8CFF] hover:bg-[#7AA2FF] transition-all duration-300 shadow-[0_4px_18px_rgba(91,140,255,0.25)] hover:-translate-y-0.5 active:scale-95"
          >
            <Mail className="w-4 h-4 text-white" />
            <span>EMAIL ME</span>
            <ArrowUpRight className="w-4 h-4 text-white transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          {/* LinkedIn */}
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 px-7 py-4 rounded-xl font-semibold text-xs sm:text-sm tracking-[0.14em] uppercase text-[#D7DCE5] hover:text-[#F5F7FA] bg-[#0D1118]/80 hover:bg-[#111827] border border-white/[0.12] hover:border-[#5B8CFF]/40 transition-all duration-300 shadow-sm hover:-translate-y-0.5 active:scale-95"
          >
            <LinkedinIcon className="w-4 h-4 text-[#5B8CFF]" />
            <span>LINKEDIN</span>
            <ArrowUpRight className="w-4 h-4 text-[#5B8CFF] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          {/* GitHub */}
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 px-7 py-4 rounded-xl font-semibold text-xs sm:text-sm tracking-[0.14em] uppercase text-[#D7DCE5] hover:text-[#F5F7FA] bg-[#0D1118]/80 hover:bg-[#111827] border border-white/[0.12] hover:border-[#5B8CFF]/40 transition-all duration-300 shadow-sm hover:-translate-y-0.5 active:scale-95"
          >
            <GithubIcon className="w-4 h-4 text-[#5B8CFF]" />
            <span>GITHUB</span>
            <ArrowUpRight className="w-4 h-4 text-[#5B8CFF] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          {/* LeetCode */}
          <a
            href={personalInfo.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 px-7 py-4 rounded-xl font-semibold text-xs sm:text-sm tracking-[0.14em] uppercase text-[#D7DCE5] hover:text-[#F5F7FA] bg-[#0D1118]/80 hover:bg-[#111827] border border-white/[0.12] hover:border-[#5B8CFF]/40 transition-all duration-300 shadow-sm hover:-translate-y-0.5 active:scale-95"
          >
            <LeetcodeIcon className="w-4 h-4 text-[#5B8CFF]" />
            <span>LEETCODE</span>
            <ArrowUpRight className="w-4 h-4 text-[#5B8CFF] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* BOTTOM MINIMAL FOOTER */}
        <div
          className="w-full pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6F7A89] font-medium"
          style={{
            transition: 'opacity 700ms cubic-bezier(0.22, 1, 0.36, 1) 650ms',
            opacity: isVisible ? 1 : 0,
          }}
        >
          <div className="flex items-center gap-2">
            <span className="text-[#F5F7FA] font-bold">{personalInfo.brandName}</span>
            <span>·</span>
            <span>{personalInfo.location}</span>
          </div>

          <button
            onClick={scrollToTop}
            className="group inline-flex items-center gap-2 text-[#9AA4B2] hover:text-[#F5F7FA] transition-colors focus:outline-none cursor-pointer"
            aria-label="Scroll to top"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#5B8CFF] group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>

      </div>
    </footer>
  );
}
