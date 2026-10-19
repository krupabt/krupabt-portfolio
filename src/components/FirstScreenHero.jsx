import React, { useState, useEffect, useRef } from 'react';
import { ArrowDown, ArrowUpRight, MapPin, Sparkles, GraduationCap } from 'lucide-react';
import { GithubIcon, LinkedinIcon, LeetcodeIcon } from './Icons';
import ProfilePhoto from './ProfilePhoto';
import { personalInfo } from '../data/portfolioData';

export default function FirstScreenHero() {
  const [animState, setAnimState] = useState(0);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const sectionRef = useRef(null);

  // 1. Accessibility & Staggered Cinematic Reveal
  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(motionQuery.matches);

    const handleMotionChange = (e) => setIsReducedMotion(e.matches);
    motionQuery.addEventListener('change', handleMotionChange);

    if (motionQuery.matches) {
      setAnimState(4);
      return () => motionQuery.removeEventListener('change', handleMotionChange);
    }

    // Step 1: Eyebrow + Name appear together
    const t1 = setTimeout(() => setAnimState(1), 120);
    // Step 2: Description paragraph appears 150-250ms after the name
    const t2 = setTimeout(() => setAnimState(2), 340);
    // Step 3: Academic context (Education, University, GPA, Location) appears
    const t3 = setTimeout(() => setAnimState(3), 520);
    // Step 4: CTAs and status pills settle in
    const t4 = setTimeout(() => setAnimState(4), 700);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      motionQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  // 2. Subtle Parallax for mouse movement on desktop
  useEffect(() => {
    if (isReducedMotion) return;

    const isTouch = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 1024;
    if (isTouch) return;

    let rafId = null;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const nx = (e.clientX / innerWidth) * 2 - 1;
      const ny = (e.clientY / innerHeight) * 2 - 1;
      targetX = nx * 12;
      targetY = ny * 12;
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
          HERO BACKGROUND IMAGE WITH SUBTLE READABLE OVERLAY
      ───────────────────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden z-0"
        aria-hidden="true"
      >
        <img
          src="/hero-bg.jpg"
          alt=""
          className="w-full h-full object-cover object-center scale-[1.03]"
          style={{
            transform: isReducedMotion
              ? 'scale(1.01)'
              : `translate3d(${-mouseOffset.x * 0.4}px, ${-mouseOffset.y * 0.4}px, 0) scale(1.03)`,
            transition: 'transform 500ms ease-out',
          }}
        />
        {/* Subtle readable dark overlays */}
        <div className="absolute inset-0 bg-[#060A08]/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#060A08]/90 via-transparent to-[#060A08]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(6,10,8,0.7)_80%,#060A08_100%)]" />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          HERO ATMOSPHERE LIGHTING (Emerald & Moss Obsidian)
      ───────────────────────────────────────────────────────────── */}
      <div
        className="absolute top-1/4 right-0 lg:right-16 w-[600px] sm:w-[750px] h-[600px] sm:h-[750px] rounded-full blur-[160px] pointer-events-none transition-transform duration-700 ease-out z-0"
        style={{
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.16) 0%, rgba(17, 28, 24, 0.45) 50%, transparent 80%)',
          transform: isReducedMotion
            ? 'none'
            : `translate3d(${-mouseOffset.x * 1.6}px, ${-mouseOffset.y * 1.6}px, 0)`,
        }}
        aria-hidden="true"
      />
      <div
        className="absolute top-1/3 left-2 lg:left-10 w-[450px] h-[450px] rounded-full blur-[150px] pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle, rgba(52, 211, 153, 0.08) 0%, rgba(11, 19, 16, 0.5) 50%, transparent 75%)',
        }}
        aria-hidden="true"
      />

      {/* ─────────────────────────────────────────────────────────────
          MAIN ASYMMETRICAL EDITORIAL VIEWPORT
      ───────────────────────────────────────────────────────────── */}
      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 w-full my-auto z-10 py-8 font-sans">
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
              <div className="flex items-center gap-2 pl-6 text-xs text-[#93A79E] font-sans tracking-normal">
                <MapPin className="w-3.5 h-3.5 text-[#10B981] flex-shrink-0" />
                <span>Bengaluru, India</span>
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
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-bold text-xs tracking-[0.14em] uppercase text-[#CFDDD6] hover:text-[#F2FDF7] bg-[#0B1310]/85 hover:bg-[#111C18] border border-white/[0.12] hover:border-[#10B981]/50 btn-hover-effect shadow-sm hover:-translate-y-1 active:scale-95 focus-visible:ring-2 focus-visible:ring-[#10B981]"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="w-4 h-4 text-[#10B981]" />
                <span>GITHUB</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#10B981] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              {/* LINKEDIN */}
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-bold text-xs tracking-[0.14em] uppercase text-[#CFDDD6] hover:text-[#F2FDF7] bg-[#0B1310]/85 hover:bg-[#111C18] border border-white/[0.12] hover:border-[#10B981]/50 btn-hover-effect shadow-sm hover:-translate-y-1 active:scale-95 focus-visible:ring-2 focus-visible:ring-[#10B981]"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="w-4 h-4 text-[#10B981]" />
                <span>LINKEDIN</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#10B981] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              {/* LEETCODE */}
              <a
                href={personalInfo.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-bold text-xs tracking-[0.14em] uppercase text-[#CFDDD6] hover:text-[#F2FDF7] bg-[#0B1310]/85 hover:bg-[#111C18] border border-white/[0.12] hover:border-[#10B981]/50 btn-hover-effect shadow-sm hover:-translate-y-1 active:scale-95 focus-visible:ring-2 focus-visible:ring-[#10B981]"
                aria-label="LeetCode Profile"
              >
                <LeetcodeIcon className="w-4 h-4 text-[#10B981]" />
                <span>LEETCODE</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#10B981] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>

          {/* RIGHT SIDE: Real High-Quality Photo */}
          <div
            className="lg:col-span-5 flex justify-center items-center relative py-4 lg:py-6"
            style={{
              transition: 'opacity 800ms cubic-bezier(0.22, 1, 0.36, 1) 200ms, transform 800ms cubic-bezier(0.22, 1, 0.36, 1) 200ms',
              opacity: animState >= 1 ? 1 : 0,
              transform: animState >= 1 ? 'scale(1)' : 'scale(0.92)',
            }}
          >
            <div
              className="relative w-64 sm:w-72 lg:w-80 group transition-transform duration-500 ease-out"
              style={{
                transform: isReducedMotion
                  ? 'none'
                  : `translate3d(${-mouseOffset.x * 0.35}px, ${-mouseOffset.y * 0.35}px, 0)`,
              }}
            >
              {/* Silhouette backdrop glow behind portrait */}
              <div
                className="absolute inset-0 bg-gradient-to-tr from-[#10B981]/25 via-[#34D399]/20 to-transparent rounded-[32px] blur-2xl -z-10 transform scale-95 group-hover:scale-105 transition-transform duration-700 ease-out"
                aria-hidden="true"
              />

              {/* Framed Photo Container */}
              <div className="relative rounded-[28px] overflow-hidden border border-white/[0.08] group-hover:border-[#10B981]/40 transition-colors duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.85)] bg-[#0B1310]">
                <ProfilePhoto
                  alt="Krupa B T - Software Engineer"
                  className="w-full h-auto aspect-[4/5] object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  priority={true}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#060A08]/90 via-[#060A08]/20 to-transparent pointer-events-none" />
                <div className="absolute inset-0 rounded-[28px] ring-1 ring-inset ring-white/[0.06] pointer-events-none" />

                {/* Status Pill with Location and Active Status */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#0B1310]/95 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/[0.08] shadow-lg flex items-center justify-between z-20">
                  <div>
                    <div className="text-xs font-semibold text-[#F2FDF7] tracking-tight">
                      {personalInfo.name}
                    </div>
                    <div className="text-[11px] text-[#93A79E] font-sans tracking-normal font-normal">
                      Bengaluru, India
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
      <button
        onClick={() => {
          const target = document.getElementById('about');
          if (target) target.scrollIntoView({ behavior: 'smooth' });
        }}
        className="relative z-10 w-full flex flex-col items-center justify-center gap-2 pt-2 group cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#10B981] rounded py-1 bg-transparent border-0"
        style={{
          transition: 'opacity 700ms cubic-bezier(0.22, 1, 0.36, 1), transform 700ms cubic-bezier(0.22, 1, 0.36, 1)',
          opacity: animState >= 4 ? 1 : 0,
          transform: animState >= 4 ? 'translateY(0px)' : 'translateY(15px)',
        }}
        aria-label="Scroll to explore"
      >
        <span className="text-xs font-sans tracking-wide text-[#93A79E] group-hover:text-[#F2FDF7] transition-colors duration-200">
          SCROLL TO EXPLORE
        </span>
        <div className="w-[1px] h-6 bg-gradient-to-b from-[#10B981]/70 to-transparent animate-pulse group-hover:h-8 transition-all duration-300" />
      </button>
    </section>
  );
}
