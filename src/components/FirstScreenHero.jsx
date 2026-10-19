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
      className="relative min-h-screen flex flex-col justify-between pt-28 sm:pt-32 pb-12 text-[#292522] dark:text-[#F5EFEB] overflow-hidden transition-colors duration-300"
      role="region"
      aria-label="Home and Personal Introduction"
    >
      <div id="hero" className="absolute top-0 left-0" />



      {/* ─────────────────────────────────────────────────────────────
          HERO ATMOSPHERE LIGHTING (Champagne & Soft Taupe)
      ───────────────────────────────────────────────────────────── */}
      <div
        className="absolute top-1/4 right-0 lg:right-16 w-[600px] sm:w-[750px] h-[600px] sm:h-[750px] rounded-full blur-[160px] pointer-events-none transition-transform duration-700 ease-out z-0 dark:opacity-35"
        style={{
          background: 'radial-gradient(circle, rgba(168, 135, 90, 0.10) 0%, rgba(237, 228, 216, 0.4) 50%, transparent 80%)',
          transform: isReducedMotion
            ? 'none'
            : `translate3d(${-mouseOffset.x * 1.6}px, ${-mouseOffset.y * 1.6}px, 0)`,
        }}
        aria-hidden="true"
      />
      <div
        className="absolute top-1/3 left-2 lg:left-10 w-[450px] h-[450px] rounded-full blur-[150px] pointer-events-none z-0 dark:opacity-35"
        style={{
          background: 'radial-gradient(circle, rgba(196, 166, 123, 0.08) 0%, rgba(247, 243, 237, 0.5) 50%, transparent 75%)',
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
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#EDE4D8] dark:bg-[#24201D] border border-[#DED3C5] dark:border-[#38332E] shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#A8875A] dark:bg-[#C4A67B] animate-pulse" />
                <span className="text-xs font-serif uppercase tracking-[0.20em] text-[#A8875A] dark:text-[#C4A67B] font-bold">
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
              <h1 className="text-4xl min-[400px]:text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl font-bold tracking-[-0.03em] leading-[0.98] text-[#292522] dark:text-[#F5EFEB] lg:whitespace-nowrap">
                KRUPA B T
              </h1>
            </div>

            {/* Description: appears 150-250ms after the name */}
            <p
              className="text-[#5F5750] dark:text-[#D1C8C0] text-base sm:text-lg font-normal leading-relaxed max-w-xl"
              style={{
                transition: 'opacity 800ms cubic-bezier(0.22, 1, 0.36, 1), transform 800ms cubic-bezier(0.22, 1, 0.36, 1)',
                opacity: animState >= 2 ? 1 : 0,
                transform: animState >= 2 ? 'translateY(0px)' : 'translateY(30px)',
              }}
            >
              {personalInfo.supportingStatement}
            </p>

            {/* Academic Context with Normal Bengaluru Font */}
            <div
              className="space-y-2 pt-1 text-sm text-[#5F5750] dark:text-[#D1C8C0] font-normal"
              style={{
                transition: 'opacity 700ms cubic-bezier(0.22, 1, 0.36, 1), transform 700ms cubic-bezier(0.22, 1, 0.36, 1)',
                opacity: animState >= 3 ? 1 : 0,
                transform: animState >= 3 ? 'translateY(0px)' : 'translateY(25px)',
              }}
            >
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-[#A8875A] dark:text-[#C4A67B] flex-shrink-0" />
                <span className="font-semibold text-[#292522] dark:text-[#F5EFEB]">{personalInfo.education}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-serif text-[#5F5750] dark:text-[#D1C8C0] pl-6">
                <span>{personalInfo.institution}</span>
                <span className="text-[#DED3C5] dark:text-[#38332E]">·</span>
                <span className="text-[#A8875A] dark:text-[#C4A67B] font-semibold">{personalInfo.gpa}</span>
              </div>
              <div className="flex items-center gap-2 pl-6 text-xs text-[#7D736A] dark:text-[#9E9389] font-clean tracking-normal">
                <MapPin className="w-3.5 h-3.5 text-[#A8875A] dark:text-[#C4A67B] flex-shrink-0" />
                <span>Bengaluru, India</span>
              </div>
            </div>

            {/* Action Buttons */}
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
                className="group relative inline-flex items-center justify-center px-8 py-3.5 rounded-xl font-bold text-xs tracking-[0.16em] uppercase text-[#F7F3ED] dark:text-[#141210] bg-[#292522] dark:bg-[#C4A67B] hover:bg-[#A8875A] dark:hover:bg-[#D8BC93] hover:text-[#292522] dark:hover:text-[#141210] border border-[#292522] dark:border-[#C4A67B] hover:border-[#A8875A] btn-hover-effect shadow-[0_4px_20px_rgba(41,37,34,0.18)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:-translate-y-1 active:scale-95 focus-visible:ring-2 focus-visible:ring-[#A8875A] dark:focus-visible:ring-[#C4A67B] cursor-pointer"
              >
                <span>VIEW MY WORK</span>
                <span className="absolute -inset-0.5 rounded-xl bg-[#A8875A]/20 dark:bg-[#C4A67B]/30 blur opacity-0 group-hover:opacity-100 transition-opacity duration-250 pointer-events-none" />
              </button>

              {/* GITHUB */}
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-bold text-xs tracking-[0.14em] uppercase text-[#292522] dark:text-[#F5EFEB] hover:text-[#292522] dark:hover:text-[#F5EFEB] bg-[#FFFCF7] dark:bg-[#24201D] hover:bg-[#EDE4D8] dark:hover:bg-[#2D2824] border border-[#DED3C5] dark:border-[#38332E] hover:border-[#A8875A] dark:hover:border-[#C4A67B] btn-hover-effect shadow-sm hover:-translate-y-1 active:scale-95 focus-visible:ring-2 focus-visible:ring-[#A8875A] dark:focus-visible:ring-[#C4A67B]"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="w-4 h-4 text-[#A8875A] dark:text-[#C4A67B]" />
                <span>GITHUB</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#A8875A] dark:text-[#C4A67B] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              {/* LINKEDIN */}
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-bold text-xs tracking-[0.14em] uppercase text-[#292522] dark:text-[#F5EFEB] hover:text-[#292522] dark:hover:text-[#F5EFEB] bg-[#FFFCF7] dark:bg-[#24201D] hover:bg-[#EDE4D8] dark:hover:bg-[#2D2824] border border-[#DED3C5] dark:border-[#38332E] hover:border-[#A8875A] dark:hover:border-[#C4A67B] btn-hover-effect shadow-sm hover:-translate-y-1 active:scale-95 focus-visible:ring-2 focus-visible:ring-[#A8875A] dark:focus-visible:ring-[#C4A67B]"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="w-4 h-4 text-[#A8875A] dark:text-[#C4A67B]" />
                <span>LINKEDIN</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#A8875A] dark:text-[#C4A67B] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              {/* LEETCODE */}
              <a
                href={personalInfo.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-bold text-xs tracking-[0.14em] uppercase text-[#292522] dark:text-[#F5EFEB] hover:text-[#292522] dark:hover:text-[#F5EFEB] bg-[#FFFCF7] dark:bg-[#24201D] hover:bg-[#EDE4D8] dark:hover:bg-[#2D2824] border border-[#DED3C5] dark:border-[#38332E] hover:border-[#A8875A] dark:hover:border-[#C4A67B] btn-hover-effect shadow-sm hover:-translate-y-1 active:scale-95 focus-visible:ring-2 focus-visible:ring-[#A8875A] dark:focus-visible:ring-[#C4A67B]"
                aria-label="LeetCode Profile"
              >
                <LeetcodeIcon className="w-4 h-4 text-[#A8875A] dark:text-[#C4A67B]" />
                <span>LEETCODE</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#A8875A] dark:text-[#C4A67B] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
                className="absolute inset-0 bg-gradient-to-tr from-[#A8875A]/20 via-[#C4A67B]/15 to-transparent rounded-[32px] blur-2xl -z-10 transform scale-95 group-hover:scale-105 transition-transform duration-700 ease-out"
                aria-hidden="true"
              />

              {/* Framed Photo Container */}
              <div className="relative rounded-[28px] overflow-hidden border border-[#DED3C5] dark:border-[#38332E] group-hover:border-[#A8875A]/50 dark:group-hover:border-[#C4A67B]/50 transition-colors duration-500 shadow-[0_16px_40px_rgba(41,37,34,0.12)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.4)] bg-[#FFFCF7] dark:bg-[#24201D]">
                <ProfilePhoto
                  alt="Krupa B T - Software Engineer"
                  className="w-full h-auto aspect-[4/5] object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  priority={true}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#292522]/30 dark:from-[#141210]/40 via-transparent to-transparent pointer-events-none" />
                <div className="absolute inset-0 rounded-[28px] ring-1 ring-inset ring-[#DED3C5]/40 dark:ring-[#38332E]/50 pointer-events-none" />

                {/* Status Pill with Location and Active Status */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#FFFCF7]/95 dark:bg-[#24201D]/95 backdrop-blur-md px-4 py-2.5 rounded-xl border border-[#DED3C5] dark:border-[#38332E] shadow-md flex items-center justify-between z-20">
                  <div>
                    <div className="text-xs font-semibold text-[#292522] dark:text-[#F5EFEB] tracking-tight">
                      {personalInfo.name}
                    </div>
                    <div className="text-[11px] text-[#7D736A] dark:text-[#9E9389] font-clean tracking-normal font-normal">
                      Bengaluru, India
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] font-serif text-[#A8875A] dark:text-[#C4A67B] font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A8875A] dark:bg-[#C4A67B] animate-pulse" />
                    <span>Active</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          BOTTOM SCROLL INDICATOR (Clean font, neatly aligned, not clipped)
      ───────────────────────────────────────────────────────────── */}
      <div className="relative z-10 w-full flex justify-center px-4">
        <button
          onClick={() => {
            const target = document.getElementById('about');
            if (target) target.scrollIntoView({ behavior: 'smooth' });
          }}
          className="flex flex-col items-center justify-center gap-2 pt-2 group cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#A8875A] dark:focus-visible:ring-[#C4A67B] rounded py-1 bg-transparent border-0"
          style={{
            transition: 'opacity 700ms cubic-bezier(0.22, 1, 0.36, 1), transform 700ms cubic-bezier(0.22, 1, 0.36, 1)',
            opacity: animState >= 4 ? 1 : 0,
            transform: animState >= 4 ? 'translateY(0px)' : 'translateY(15px)',
          }}
          aria-label="Scroll to explore"
        >
          <span className="text-xs font-clean tracking-wide text-[#7D736A] dark:text-[#9E9389] group-hover:text-[#292522] dark:group-hover:text-[#F5EFEB] transition-colors duration-200 whitespace-nowrap">
            SCROLL TO EXPLORE
          </span>
          <div className="w-[1px] h-6 bg-gradient-to-b from-[#A8875A]/70 dark:from-[#C4A67B]/70 to-transparent animate-pulse group-hover:h-8 transition-all duration-300" />
        </button>
      </div>
    </section>
  );
}
