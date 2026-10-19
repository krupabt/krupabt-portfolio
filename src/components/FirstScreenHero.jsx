import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, MapPin, GraduationCap } from 'lucide-react';
import { GithubIcon, LinkedinIcon, LeetcodeIcon } from './Icons';
import { personalInfo } from '../data/portfolioData';
import AbstractAiOrb from './AbstractAiOrb';

export default function FirstScreenHero({ isEntering = false }) {
  const [animState, setAnimState] = useState(0);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [imageSrc, setImageSrc] = useState('/profile.jpeg');
  const sectionRef = useRef(null);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(motionQuery.matches);
    const handleMotionChange = (e) => setIsReducedMotion(e.matches);
    motionQuery.addEventListener('change', handleMotionChange);

    if (motionQuery.matches) {
      setAnimState(4);
      return () => motionQuery.removeEventListener('change', handleMotionChange);
    }

    // Trigger Home animation when section enters viewport (20% threshold)
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Trigger choreographed sequence
          setTimeout(() => setAnimState(1), 50);
          setTimeout(() => setAnimState(2), 260);
          setTimeout(() => setAnimState(3), 440);
          setTimeout(() => setAnimState(4), 680);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
      motionQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  // Also trigger if isEntering prop changes
  useEffect(() => {
    if (isEntering && animState === 0 && !isReducedMotion) {
      setTimeout(() => setAnimState(1), 50);
      setTimeout(() => setAnimState(2), 260);
      setTimeout(() => setAnimState(3), 440);
      setTimeout(() => setAnimState(4), 680);
    }
  }, [isEntering, isReducedMotion, animState]);

  // Desktop subtle mouse parallax
  useEffect(() => {
    if (isReducedMotion) return;

    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768;
    if (isTouchDevice) return;

    let rafId = null;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const nx = (e.clientX / innerWidth) * 2 - 1;
      const ny = (e.clientY / innerHeight) * 2 - 1;

      targetX = nx * 14;
      targetY = ny * 14;
    };

    const updateParallax = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      setMouseOffset({
        x: Math.round(currentX * 10) / 10,
        y: Math.round(currentY * 10) / 10,
      });

      rafId = requestAnimationFrame(updateParallax);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    rafId = requestAnimationFrame(updateParallax);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isReducedMotion]);

  const scrollToProjects = (e) => {
    e.preventDefault();
    const target = document.getElementById('work');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-between pt-28 sm:pt-32 pb-12 text-[#F2FDF7] overflow-hidden"
      role="region"
      aria-label="Home and Personal Introduction"
    >
      <div id="hero" className="absolute top-0 left-0" />

      {/* ─────────────────────────────────────────────────────────────
          HERO ATMOSPHERE LIGHTING (Emerald & Moss Obsidian)
      ───────────────────────────────────────────────────────────── */}
      <div
        className="absolute top-1/4 right-0 lg:right-16 w-[600px] sm:w-[750px] h-[600px] sm:h-[750px] rounded-full blur-[160px] pointer-events-none transition-transform duration-700 ease-out"
        style={{
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.16) 0%, rgba(17, 28, 24, 0.45) 50%, transparent 80%)',
          transform: isReducedMotion
            ? 'none'
            : `translate3d(${-mouseOffset.x * 1.6}px, ${-mouseOffset.y * 1.6}px, 0)`,
        }}
        aria-hidden="true"
      />
      <div
        className="absolute top-1/3 left-2 lg:left-10 w-[450px] h-[450px] rounded-full blur-[150px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(52, 211, 153, 0.08) 0%, rgba(11, 19, 16, 0.5) 50%, transparent 75%)',
        }}
        aria-hidden="true"
      />

      {/* ─────────────────────────────────────────────────────────────
          MAIN ASYMMETRICAL EDITORIAL VIEWPORT
      ───────────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 w-full my-auto z-10 py-8 font-sans">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* LEFT SIDE: Recruiter-First Content */}
          <div
            className="lg:col-span-7 flex flex-col items-start space-y-6 text-left transition-transform duration-500 ease-out"
            style={{
              transform: isReducedMotion
                ? 'none'
                : `translate3d(${mouseOffset.x * 0.25}px, ${mouseOffset.y * 0.25}px, 0)`,
            }}
          >
            {/* INFORMATION SCIENCE ENGINEERING Eyebrow */}
            <div
              style={{
                transition: 'opacity 700ms cubic-bezier(0.22, 1, 0.36, 1), transform 700ms cubic-bezier(0.22, 1, 0.36, 1)',
                opacity: animState >= 1 ? 1 : 0,
                transform: animState >= 1 ? 'translateY(0px)' : 'translateY(25px)',
              }}
            >
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#10B981]/10 border border-[#10B981]/25 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                <span className="text-xs font-serif uppercase tracking-[0.20em] text-[#34D399] font-bold">
                  INFORMATION SCIENCE ENGINEERING
                </span>
              </div>
            </div>

            {/* Main Name KRUPA B T (Strictly ONE LINE on desktop) */}
            <div
              style={{
                transition: 'opacity 800ms cubic-bezier(0.22, 1, 0.36, 1), transform 800ms cubic-bezier(0.22, 1, 0.36, 1)',
                opacity: animState >= 1 ? 1 : 0,
                transform: animState >= 1 ? 'translateY(0px)' : 'translateY(40px)',
              }}
            >
              <h1 className="text-4xl min-[400px]:text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl font-bold tracking-[-0.03em] leading-[0.98] text-[#F2FDF7] lg:whitespace-nowrap">
                KRUPA B T
              </h1>
            </div>

            {/* Description: appears 150-250ms after the name */}
            <p
              className="text-[#93A79E] text-base sm:text-lg font-normal leading-relaxed max-w-xl"
              style={{
                transition: 'opacity 800ms cubic-bezier(0.22, 1, 0.36, 1), transform 800ms cubic-bezier(0.22, 1, 0.36, 1)',
                opacity: animState >= 2 ? 1 : 0,
                transform: animState >= 2 ? 'translateY(0px)' : 'translateY(30px)',
              }}
            >
              {personalInfo.supportingStatement}
            </p>

            {/* Academic Context */}
            <div
              className="space-y-2 pt-1 text-sm text-[#93A79E] font-normal"
              style={{
                transition: 'opacity 700ms cubic-bezier(0.22, 1, 0.36, 1), transform 700ms cubic-bezier(0.22, 1, 0.36, 1)',
                opacity: animState >= 3 ? 1 : 0,
                transform: animState >= 3 ? 'translateY(0px)' : 'translateY(25px)',
              }}
            >
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-[#10B981] flex-shrink-0" />
                <span className="font-semibold text-[#F2FDF7]">{personalInfo.education}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-serif text-[#CFDDD6] pl-6">
                <span>{personalInfo.institution}</span>
                <span className="text-white/20">·</span>
                <span className="text-[#10B981] font-semibold">{personalInfo.gpa}</span>
              </div>
              <div className="flex items-center gap-2 pl-6 text-xs text-[#93A79E]">
                <MapPin className="w-3.5 h-3.5 text-[#10B981] flex-shrink-0" />
                <span>{personalInfo.location}</span>
              </div>
            </div>

            {/* Action Buttons: appear last with enhanced 200-300ms hover lift */}
            <div
              className="flex flex-wrap items-center gap-3.5 pt-3"
              style={{
                transition: 'opacity 700ms cubic-bezier(0.22, 1, 0.36, 1), transform 700ms cubic-bezier(0.22, 1, 0.36, 1)',
                opacity: animState >= 4 ? 1 : 0,
                transform: animState >= 4 ? 'translateY(0px) scale(1)' : 'translateY(25px) scale(0.96)',
              }}
            >
              {/* Primary Action: VIEW MY WORK */}
              <button
                onClick={scrollToProjects}
                className="group relative inline-flex items-center justify-center px-8 py-3.5 rounded-xl font-bold text-xs tracking-[0.16em] uppercase text-white bg-[#10B981] hover:bg-[#059669] btn-hover-effect shadow-[0_4px_22px_rgba(16,185,129,0.30)] hover:-translate-y-1 active:scale-95 focus-visible:ring-2 focus-visible:ring-[#10B981] cursor-pointer"
              >
                <span>VIEW MY WORK</span>
                <span className="absolute -inset-0.5 rounded-xl bg-[#10B981]/25 blur opacity-0 group-hover:opacity-100 transition-opacity duration-250 pointer-events-none" />
              </button>

              {/* GITHUB */}
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-xs tracking-[0.14em] uppercase text-[#CFDDD6] hover:text-[#F2FDF7] bg-[#0B1310]/85 hover:bg-[#111C18] border border-white/[0.12] hover:border-[#10B981]/50 btn-hover-effect shadow-sm hover:-translate-y-1 active:scale-95 focus-visible:ring-2 focus-visible:ring-[#10B981]"
                title="GitHub Profile"
              >
                <GithubIcon className="w-3.5 h-3.5 text-[#10B981]" />
                <span>GITHUB</span>
                <ArrowUpRight className="w-3 h-3 text-[#10B981] transition-transform duration-250 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              {/* LINKEDIN */}
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-xs tracking-[0.14em] uppercase text-[#CFDDD6] hover:text-[#F2FDF7] bg-[#0B1310]/85 hover:bg-[#111C18] border border-white/[0.12] hover:border-[#10B981]/50 btn-hover-effect shadow-sm hover:-translate-y-1 active:scale-95 focus-visible:ring-2 focus-visible:ring-[#10B981]"
                title="LinkedIn Profile"
              >
                <LinkedinIcon className="w-3.5 h-3.5 text-[#10B981]" />
                <span>LINKEDIN</span>
                <ArrowUpRight className="w-3 h-3 text-[#10B981] transition-transform duration-250 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              {/* LEETCODE */}
              <a
                href={personalInfo.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-xs tracking-[0.14em] uppercase text-[#CFDDD6] hover:text-[#F2FDF7] bg-[#0B1310]/85 hover:bg-[#111C18] border border-white/[0.12] hover:border-[#10B981]/50 btn-hover-effect shadow-sm hover:-translate-y-1 active:scale-95 focus-visible:ring-2 focus-visible:ring-[#10B981]"
                title="LeetCode Profile"
              >
                <LeetcodeIcon className="w-3.5 h-3.5 text-[#10B981]" />
                <span>LEETCODE</span>
                <ArrowUpRight className="w-3 h-3 text-[#10B981] transition-transform duration-250 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>

          </div>

          {/* RIGHT SIDE: Portrait Animation
              opacity: 0 -> 1
              scale: 1.08 -> 1
              blur: 12px -> 0
          */}
          <div
            className="lg:col-span-5 w-full flex items-center justify-center lg:justify-end"
            style={{
              transition: 'opacity 1000ms cubic-bezier(0.22, 1, 0.36, 1), transform 1000ms cubic-bezier(0.22, 1, 0.36, 1), filter 1000ms cubic-bezier(0.22, 1, 0.36, 1)',
              opacity: animState >= 1 ? 1 : 0,
              transform: animState >= 1 ? 'scale(1)' : 'scale(1.08)',
              filter: animState >= 1 ? 'blur(0px)' : 'blur(12px)',
            }}
          >
            <div className="relative w-full max-w-[360px] sm:max-w-[400px] lg:max-w-[440px] flex items-center justify-center">
              
              {/* Soft Ambient Emerald Glow Behind Hero Profile */}
              <div
                className="absolute -inset-16 sm:-inset-24 rounded-full blur-[140px] pointer-events-none z-0"
                style={{
                  background: 'radial-gradient(circle, rgba(16, 185, 129, 0.18) 0%, rgba(17, 28, 24, 0.40) 50%, transparent 80%)',
                }}
                aria-hidden="true"
              />

              {/* Behind portrait: Abstract AI Orb */}
              <div className="absolute -inset-10 sm:-inset-16 flex items-center justify-center pointer-events-none z-0">
                <AbstractAiOrb mouseOffset={mouseOffset} isReducedMotion={isReducedMotion} />
              </div>

              {/* Blurred Edge Lighting Layer */}
              <div
                className="absolute inset-0 rounded-[32px] overflow-hidden filter blur-2xl opacity-25 scale-105 pointer-events-none transition-transform duration-700 ease-out"
                style={{
                  transform: isReducedMotion
                    ? 'none'
                    : `translate3d(${-mouseOffset.x * 0.9}px, ${-mouseOffset.y * 0.9}px, 0)`,
                }}
                aria-hidden="true"
              >
                <img
                  src={imageSrc}
                  alt=""
                  onError={() => setImageSrc('/profile.jpeg')}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Foreground Cinematic Portrait Frame */}
              <div
                className={`relative w-full aspect-[4/5] rounded-[28px] bg-gradient-to-b from-[#111C18]/85 via-[#0B1310] to-[#060A08] border border-white/[0.08] shadow-2xl overflow-hidden flex items-center justify-center backdrop-blur-md transition-all duration-300 hover:border-[#10B981]/40 z-10 ${
                  isReducedMotion ? '' : 'animate-float-slow'
                }`}
                style={{
                  transform: isReducedMotion
                    ? 'none'
                    : `translate3d(${-mouseOffset.x * 0.6}px, ${-mouseOffset.y * 0.6}px, 0)`,
                }}
              >
                <img
                  src={imageSrc}
                  alt="Portrait of Krupa B T"
                  onError={() => setImageSrc('/profile.jpeg')}
                  className="w-full h-full object-cover object-top filter contrast-[1.02] select-none transition-transform duration-500 ease-out hover:scale-[1.02]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#060A08]/90 via-[#060A08]/20 to-transparent pointer-events-none" />
                <div className="absolute inset-0 rounded-[28px] ring-1 ring-inset ring-white/[0.06] pointer-events-none" />

                {/* Status Pill with Location and Active Status */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#0B1310]/95 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/[0.08] shadow-lg flex items-center justify-between z-20">
                  <div>
                    <div className="text-xs font-semibold text-[#F2FDF7] tracking-tight">
                      {personalInfo.name}
                    </div>
                    <div className="text-[11px] text-[#93A79E] font-light">
                      {personalInfo.location}
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] font-serif text-[#10B981] font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                    <span>Active</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          BOTTOM SCROLL INDICATOR
      ───────────────────────────────────────────────────────────── */}
      <div
        className="w-full flex flex-col items-center justify-center gap-2 pt-2"
        style={{
          transition: 'opacity 700ms cubic-bezier(0.22, 1, 0.36, 1), transform 700ms cubic-bezier(0.22, 1, 0.36, 1)',
          opacity: animState >= 4 ? 1 : 0,
          transform: animState >= 4 ? 'translateY(0px)' : 'translateY(15px)',
        }}
      >
        <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#93A79E] font-medium">
          SCROLL TO EXPLORE
        </span>
        <div className="w-[1px] h-6 bg-gradient-to-b from-emerald-400/60 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
