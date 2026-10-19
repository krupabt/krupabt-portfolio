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
      className="relative pt-36 sm:pt-48 pb-16 text-[#F2FDF7] overflow-hidden"
      role="contentinfo"
      aria-label="Contact and Social Links"
    >
      {/* Subtle Top Section Transition Divider */}
      <div className="section-divider absolute top-0 left-0 right-0" />

      {/* ─────────────────────────────────────────────────────────────
          FINAL SCENE ATMOSPHERE: SUBTLE EMERALD & DEEP OBSIDIAN GLOW
      ───────────────────────────────────────────────────────────── */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[850px] sm:w-[1100px] h-[580px] rounded-full blur-[190px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(16, 185, 129, 0.18) 0%, rgba(17, 28, 24, 0.45) 50%, transparent 80%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute top-1/4 right-10 w-[480px] h-[480px] rounded-full blur-[160px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(52, 211, 153, 0.08) 0%, rgba(11, 19, 16, 0.45) 50%, transparent 75%)',
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
          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
          <span className="text-xs font-serif tracking-[0.22em] uppercase text-[#34D399] font-bold">
            GET IN TOUCH
          </span>
        </div>

        {/* Grand Headline: LET'S BUILD SOMETHING MEANINGFUL. */}
        <h2
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] text-[#F2FDF7] max-w-4xl text-balance mb-8"
          style={{
            transition: 'opacity 1100ms cubic-bezier(0.22, 1, 0.36, 1) 100ms, transform 1100ms cubic-bezier(0.22, 1, 0.36, 1) 100ms, filter 1100ms cubic-bezier(0.22, 1, 0.36, 1) 100ms',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'scale(1)' : 'scale(0.90)',
            filter: isVisible ? 'blur(0px)' : 'blur(6px)',
          }}
        >
          <span className="block text-[#F2FDF7]">LET'S</span>
          <span className="block text-[#F2FDF7]">BUILD</span>
          <span className="block text-[#F2FDF7]">SOMETHING</span>
          <span className="block text-[#10B981]">MEANINGFUL.</span>
        </h2>

        {/* Subtitle */}
        <p
          className="text-base sm:text-xl text-[#93A79E] font-normal max-w-xl leading-relaxed mb-12 text-balance"
          style={{
            transition: 'opacity 800ms cubic-bezier(0.22, 1, 0.36, 1) 350ms, transform 800ms cubic-bezier(0.22, 1, 0.36, 1) 350ms',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0px)' : 'translateY(25px)',
          }}
        >
          Have an idea, opportunity, or project in mind? Open to impactful full-stack, Python, and AI software engineering conversations.
        </p>

        {/* Primary Contact Channels revealed underneath with 200-300ms hover lift */}
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
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-xs sm:text-sm tracking-[0.16em] uppercase text-white bg-[#10B981] hover:bg-[#059669] btn-hover-effect shadow-[0_4px_22px_rgba(16,185,129,0.30)] hover:-translate-y-1 active:scale-95 focus-visible:ring-2 focus-visible:ring-[#10B981]"
          >
            <Mail className="w-4 h-4 text-white" />
            <span>EMAIL ME</span>
            <ArrowUpRight className="w-4 h-4 text-white transition-transform duration-250 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>

          {/* LinkedIn */}
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 px-7 py-4 rounded-xl font-bold text-xs sm:text-sm tracking-[0.14em] uppercase text-[#CFDDD6] hover:text-[#F2FDF7] bg-[#0B1310]/85 hover:bg-[#111C18] border border-white/[0.12] hover:border-[#10B981]/50 btn-hover-effect shadow-sm hover:-translate-y-1 active:scale-95 focus-visible:ring-2 focus-visible:ring-[#10B981]"
          >
            <LinkedinIcon className="w-4 h-4 text-[#10B981]" />
            <span>LINKEDIN</span>
            <ArrowUpRight className="w-4 h-4 text-[#10B981] transition-transform duration-250 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>

          {/* GitHub */}
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 px-7 py-4 rounded-xl font-bold text-xs sm:text-sm tracking-[0.14em] uppercase text-[#CFDDD6] hover:text-[#F2FDF7] bg-[#0B1310]/85 hover:bg-[#111C18] border border-white/[0.12] hover:border-[#10B981]/50 btn-hover-effect shadow-sm hover:-translate-y-1 active:scale-95 focus-visible:ring-2 focus-visible:ring-[#10B981]"
          >
            <GithubIcon className="w-4 h-4 text-[#10B981]" />
            <span>GITHUB</span>
            <ArrowUpRight className="w-4 h-4 text-[#10B981] transition-transform duration-250 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>

          {/* LeetCode */}
          <a
            href={personalInfo.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 px-7 py-4 rounded-xl font-bold text-xs sm:text-sm tracking-[0.14em] uppercase text-[#CFDDD6] hover:text-[#F2FDF7] bg-[#0B1310]/85 hover:bg-[#111C18] border border-white/[0.12] hover:border-[#10B981]/50 btn-hover-effect shadow-sm hover:-translate-y-1 active:scale-95 focus-visible:ring-2 focus-visible:ring-[#10B981]"
          >
            <LeetcodeIcon className="w-4 h-4 text-[#10B981]" />
            <span>LEETCODE</span>
            <ArrowUpRight className="w-4 h-4 text-[#10B981] transition-transform duration-250 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
        </div>

        {/* BOTTOM MINIMAL FOOTER */}
        <div
          className="w-full pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#647870] font-medium font-serif"
          style={{
            transition: 'opacity 700ms cubic-bezier(0.22, 1, 0.36, 1) 650ms',
            opacity: isVisible ? 1 : 0,
          }}
        >
          <div className="flex items-center gap-2">
            <span className="text-[#F2FDF7] font-bold">{personalInfo.brandName}</span>
            <span>·</span>
            <span>{personalInfo.location}</span>
          </div>

          <button
            onClick={scrollToTop}
            className="group inline-flex items-center gap-2 text-[#93A79E] hover:text-[#F2FDF7] transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-[#10B981] p-1.5 rounded cursor-pointer"
            aria-label="Scroll to top"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#10B981] group-hover:-translate-y-1 transition-transform duration-200" />
          </button>
        </div>

      </div>
    </footer>
  );
}
