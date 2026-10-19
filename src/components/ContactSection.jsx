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
      className="relative pt-36 sm:pt-48 pb-16 bg-[#EDE4D8] dark:bg-[#1A1815] text-[#292522] dark:text-[#F5EFEB] overflow-hidden transition-colors duration-300"
      role="contentinfo"
      aria-label="Contact and Social Links"
    >
      {/* Subtle Top Section Transition Divider */}
      <div className="section-divider absolute top-0 left-0 right-0" />

      {/* ─────────────────────────────────────────────────────────────
          FINAL SCENE ATMOSPHERE: SUBTLE BRONZE & CHAMPAGNE GLOW
      ───────────────────────────────────────────────────────────── */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[850px] sm:w-[1100px] h-[580px] rounded-full blur-[190px] pointer-events-none dark:opacity-25"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(168, 135, 90, 0.10) 0%, rgba(222, 211, 197, 0.45) 50%, transparent 80%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute top-1/4 right-10 w-[480px] h-[480px] rounded-full blur-[160px] pointer-events-none dark:opacity-25"
        style={{
          background: 'radial-gradient(circle, rgba(196, 166, 123, 0.08) 0%, rgba(247, 243, 237, 0.45) 50%, transparent 75%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10 text-center flex flex-col items-center font-sans">
        
        {/* Eyebrow */}
        <div
          className="inline-flex items-center gap-2.5 mb-6 px-3.5 py-1.5 rounded-full bg-[#FFFCF7] dark:bg-[#24201D] border border-[#DED3C5] dark:border-[#38332E] shadow-sm"
          style={{
            transition: 'opacity 700ms cubic-bezier(0.22, 1, 0.36, 1), transform 700ms cubic-bezier(0.22, 1, 0.36, 1)',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0px)' : 'translateY(20px)',
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#A8875A] dark:bg-[#C4A67B] animate-pulse" />
          <span className="text-xs font-serif tracking-[0.22em] uppercase text-[#A8875A] dark:text-[#C4A67B] font-bold">
            GET IN TOUCH
          </span>
        </div>

        {/* Grand Headline: LET'S BUILD SOMETHING MEANINGFUL. */}
        <h2
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] text-[#292522] dark:text-[#F5EFEB] max-w-4xl text-balance mb-8"
          style={{
            transition: 'opacity 1100ms cubic-bezier(0.22, 1, 0.36, 1) 100ms, transform 1100ms cubic-bezier(0.22, 1, 0.36, 1) 100ms, filter 1100ms cubic-bezier(0.22, 1, 0.36, 1) 100ms',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'scale(1)' : 'scale(0.90)',
            filter: isVisible ? 'blur(0px)' : 'blur(6px)',
          }}
        >
          <span className="block text-[#292522] dark:text-[#F5EFEB]">LET'S</span>
          <span className="block text-[#292522] dark:text-[#F5EFEB]">BUILD</span>
          <span className="block text-[#292522] dark:text-[#F5EFEB]">SOMETHING</span>
          <span className="block text-[#A8875A] dark:text-[#C4A67B]">MEANINGFUL.</span>
        </h2>

        {/* Subtitle */}
        <p
          className="text-base sm:text-xl text-[#5F5750] dark:text-[#D1C8C0] font-normal max-w-xl leading-relaxed mb-12 text-balance"
          style={{
            transition: 'opacity 800ms cubic-bezier(0.22, 1, 0.36, 1) 350ms, transform 800ms cubic-bezier(0.22, 1, 0.36, 1) 350ms',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0px)' : 'translateY(25px)',
          }}
        >
          Have an idea, opportunity, or project in mind? Open to impactful full-stack, Python, and AI software engineering conversations.
        </p>

        {/* Primary Contact Channels */}
        <div
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-20"
          style={{
            transition: 'opacity 800ms cubic-bezier(0.22, 1, 0.36, 1) 500ms, transform 800ms cubic-bezier(0.22, 1, 0.36, 1) 500ms',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0px) scale(1)' : 'translateY(30px) scale(0.96)',
          }}
        >
          {/* Email: Primary Action */}
          <a
            href={`mailto:${personalInfo.email}`}
            className="btn-hover-effect group inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-xs sm:text-sm tracking-[0.16em] uppercase text-[#F7F3ED] dark:text-[#141210] bg-[#292522] dark:bg-[#C4A67B] hover:bg-[#A8875A] dark:hover:bg-[#D8BC93] hover:text-[#292522] dark:hover:text-[#141210] border border-[#292522] dark:border-[#C4A67B] hover:border-[#A8875A] dark:hover:border-[#D8BC93] shadow-[0_4px_22px_rgba(41,37,34,0.18)] dark:shadow-[0_4px_22px_rgba(0,0,0,0.4)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A8875A] dark:focus-visible:ring-[#C4A67B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F7F3ED] dark:focus-visible:ring-offset-[#141210]"
          >
            <Mail className="w-4 h-4 text-inherit" />
            <span>EMAIL ME</span>
            <ArrowUpRight className="w-4 h-4 text-inherit transition-transform duration-250 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          {/* LinkedIn */}
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-hover-effect group inline-flex items-center gap-2.5 px-7 py-4 rounded-xl font-bold text-xs sm:text-sm tracking-[0.14em] uppercase text-[#292522] dark:text-[#F5EFEB] hover:text-[#292522] dark:hover:text-[#F5EFEB] bg-[#FFFCF7] dark:bg-[#24201D] hover:bg-[#EDE4D8] dark:hover:bg-[#2D2824] border border-[#DED3C5] dark:border-[#38332E] hover:border-[#A8875A] dark:hover:border-[#C4A67B] shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A8875A] dark:focus-visible:ring-[#C4A67B]"
          >
            <LinkedinIcon className="w-4 h-4 text-[#A8875A] dark:text-[#C4A67B]" />
            <span>LINKEDIN</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#A8875A] dark:text-[#C4A67B] transition-transform duration-250 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          {/* GitHub */}
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-hover-effect group inline-flex items-center gap-2.5 px-7 py-4 rounded-xl font-bold text-xs sm:text-sm tracking-[0.14em] uppercase text-[#292522] dark:text-[#F5EFEB] hover:text-[#292522] dark:hover:text-[#F5EFEB] bg-[#FFFCF7] dark:bg-[#24201D] hover:bg-[#EDE4D8] dark:hover:bg-[#2D2824] border border-[#DED3C5] dark:border-[#38332E] hover:border-[#A8875A] dark:hover:border-[#C4A67B] shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A8875A] dark:focus-visible:ring-[#C4A67B]"
          >
            <GithubIcon className="w-4 h-4 text-[#A8875A] dark:text-[#C4A67B]" />
            <span>GITHUB</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#A8875A] dark:text-[#C4A67B] transition-transform duration-250 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          {/* LeetCode */}
          <a
            href={personalInfo.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-hover-effect group inline-flex items-center gap-2.5 px-7 py-4 rounded-xl font-bold text-xs sm:text-sm tracking-[0.14em] uppercase text-[#292522] dark:text-[#F5EFEB] hover:text-[#292522] dark:hover:text-[#F5EFEB] bg-[#FFFCF7] dark:bg-[#24201D] hover:bg-[#EDE4D8] dark:hover:bg-[#2D2824] border border-[#DED3C5] dark:border-[#38332E] hover:border-[#A8875A] dark:hover:border-[#C4A67B] shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A8875A] dark:focus-visible:ring-[#C4A67B]"
          >
            <LeetcodeIcon className="w-4 h-4 text-[#A8875A] dark:text-[#C4A67B]" />
            <span>LEETCODE</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#A8875A] dark:text-[#C4A67B] transition-transform duration-250 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* BOTTOM MINIMAL FOOTER */}
        <div
          className="w-full pt-8 border-t border-[#DED3C5] dark:border-[#38332E] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7D736A] dark:text-[#9E9389] font-medium font-serif"
          style={{
            transition: 'opacity 700ms cubic-bezier(0.22, 1, 0.36, 1) 650ms',
            opacity: isVisible ? 1 : 0,
          }}
        >
          <div className="flex items-center gap-2">
            <span className="text-[#292522] dark:text-[#F5EFEB] font-bold">{personalInfo.brandName}</span>
            <span>·</span>
            <span>{personalInfo.location}</span>
          </div>

          <button
            onClick={scrollToTop}
            className="group inline-flex items-center gap-2 text-[#5F5750] dark:text-[#D1C8C0] hover:text-[#292522] dark:hover:text-[#F5EFEB] transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-[#A8875A] dark:focus-visible:ring-[#C4A67B] p-1.5 rounded cursor-pointer"
            aria-label="Scroll to top"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#A8875A] dark:text-[#C4A67B] group-hover:-translate-y-1 transition-transform duration-200" />
          </button>
        </div>

      </div>
    </footer>
  );
}
