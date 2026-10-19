import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function CinematicIntro({ onStartEnter }) {
  const { theme, toggleTheme, isDark } = useTheme();
  const [step, setStep] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  // Choreograph film opening sequence
  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(motionQuery.matches);

    const handleMotionChange = (e) => setIsReducedMotion(e.matches);
    motionQuery.addEventListener('change', handleMotionChange);

    if (motionQuery.matches) {
      setStep(7);
      return () => motionQuery.removeEventListener('change', handleMotionChange);
    }

    // STEP 1: Background starts soft & slightly blurred
    const t1 = setTimeout(() => setStep(1), 50);
    // STEP 2: Atmospheric light slowly expands into screen
    const t2 = setTimeout(() => setStep(2), 250);
    // STEP 3: Profile portrait appears from deep blur (18px) + scale (1.08 -> 1)
    const t3 = setTimeout(() => setStep(3), 500);
    // STEP 4: "WELCOME TO MY PORTFOLIO" appears with noticeable upward movement (translateY 35px -> 0)
    const t4 = setTimeout(() => setStep(4), 850);
    // STEP 5: "KRUPA B T" appears with stronger reveal (scale 0.94 -> 1, blur 8px -> 0)
    const t5 = setTimeout(() => setStep(5), 1150);
    // STEP 6: Supporting information appears after the name
    const t6 = setTimeout(() => setStep(6), 1450);
    // STEP 7: ENTER MY PORTFOLIO button appears LAST
    const t7 = setTimeout(() => setStep(7), 1750);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
      clearTimeout(t7);
      motionQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  // Desktop subtle mouse parallax
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
      targetX = nx;
      targetY = ny;
    };

    const animateParallax = () => {
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;

      setMousePos({
        x: Math.round(currentX * 1000) / 1000,
        y: Math.round(currentY * 1000) / 1000,
      });

      rafId = requestAnimationFrame(animateParallax);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    rafId = requestAnimationFrame(animateParallax);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isReducedMotion]);

  const triggerEnter = (targetSection = 'home') => {
    if (isExiting) return;
    setIsExiting(true);
    
    // Smooth transition from intro screen into main website
    setTimeout(() => {
      if (onStartEnter) {
        onStartEnter(targetSection);
      }
    }, 450);
  };

  // Keyboard accessibility: Enter or Space triggers entry
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        triggerEnter('home');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isExiting]);

  const depthTranslateX = isReducedMotion ? 0 : mousePos.x * -10;
  const depthTranslateY = isReducedMotion ? 0 : mousePos.y * -10;

  const portraitTranslateX = isReducedMotion ? 0 : mousePos.x * 14;
  const portraitTranslateY = isReducedMotion ? 0 : mousePos.y * 14;

  const textTranslateX = isReducedMotion ? 0 : mousePos.x * 6;
  const textTranslateY = isReducedMotion ? 0 : mousePos.y * 6;

  return (
    <section
      id="welcome"
      ref={containerRef}
      className="relative min-h-screen w-full flex items-center justify-center text-[#292522] dark:text-[#F5EFEB] select-none overflow-hidden"
      style={{
        transition: 'transform 450ms cubic-bezier(0.22, 1, 0.36, 1), filter 450ms cubic-bezier(0.22, 1, 0.36, 1), opacity 450ms ease',
        transform: isExiting ? 'scale(1.03) translateY(-10px)' : 'scale(1)',
        filter: isExiting ? 'blur(8px)' : 'none',
        opacity: isExiting ? 0 : 1,
      }}
      role="region"
      aria-label="Welcome to Krupa BT's Portfolio"
    >
      {/* ─────────────────────────────────────────────────────────────
          TOP RIGHT THEME TOGGLE ON DEDICATED INTRO SCREEN
      ───────────────────────────────────────────────────────────── */}
      <div className="absolute top-5 right-5 sm:top-8 sm:right-10 z-30 flex items-center gap-3">
        <button
          onClick={toggleTheme}
          className="p-2.5 text-[#5F5750] hover:text-[#292522] dark:text-[#D1C8C0] dark:hover:text-[#F5EFEB] bg-[#FFFCF7]/85 dark:bg-[#24201D]/85 backdrop-blur-md border border-[#DED3C5] dark:border-[#38332E] rounded-xl transition-all duration-250 focus-visible:ring-2 focus-visible:ring-[#A8875A] dark:focus-visible:ring-[#C4A67B] hover:-translate-y-0.5 active:scale-95 cursor-pointer flex items-center justify-center shadow-sm"
          aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
          title={isDark ? "Switch to light theme" : "Switch to dark theme"}
        >
          {isDark ? (
            <Sun className="w-4 h-4 text-[#C4A67B] transition-transform duration-300 hover:rotate-45" />
          ) : (
            <Moon className="w-4 h-4 text-[#A8875A] transition-transform duration-300 hover:-rotate-12" />
          )}
        </button>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          STEP 1: NEW UPLOADED BACKGROUND IMAGE WITH READABLE OVERLAY
      ───────────────────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden z-0"
        style={{
          transition: 'opacity 1200ms cubic-bezier(0.22, 1, 0.36, 1), filter 1200ms cubic-bezier(0.22, 1, 0.36, 1)',
          opacity: step >= 1 ? 1 : 0,
          filter: step >= 1 ? 'blur(0px)' : 'blur(14px)',
        }}
      >
        <img
          src="/intro-bg.jpg"
          alt=""
          className="w-full h-full object-cover object-[center_35%] scale-[1.03]"
          style={{
            transform: isReducedMotion
              ? 'scale(1.02)'
              : `translate3d(${depthTranslateX * 0.4}px, ${depthTranslateY * 0.4}px, 0) scale(1.03)`,
          }}
          aria-hidden="true"
        />

        {/* Dual Theme Readability Overlays */}
        <div className="absolute inset-0 bg-[#F7F3ED]/80 dark:bg-[#141210]/80 backdrop-blur-[1.5px] transition-colors duration-300" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F7F3ED] via-[#F7F3ED]/75 to-[#F7F3ED]/85 dark:from-[#141210] dark:via-[#141210]/75 dark:to-[#141210]/85 transition-colors duration-300" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(237,228,216,0.55)_75%,#F7F3ED_100%)] dark:bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(28,25,23,0.65)_75%,#141210_100%)] transition-colors duration-300" />

        {/* Tactile Texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.015] dark:opacity-[0.025] mix-blend-multiply"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='introNoise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23introNoise)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          STEP 2: ATMOSPHERIC WARM CHAMPAGNE & BRONZE ACCENTS
      ───────────────────────────────────────────────────────────── */}
      <div
        className="absolute -top-20 right-0 lg:right-1/4 w-[650px] sm:w-[880px] h-[650px] sm:h-[880px] rounded-full blur-[180px] pointer-events-none dark:opacity-40"
        style={{
          transition: 'opacity 1400ms cubic-bezier(0.22, 1, 0.36, 1), transform 1400ms cubic-bezier(0.22, 1, 0.36, 1)',
          opacity: step >= 2 ? 0.7 : 0,
          transform: step >= 2 ? 'scale(1)' : 'scale(0.65)',
          background: 'radial-gradient(circle, rgba(168, 135, 90, 0.12) 0%, rgba(237, 228, 216, 0.45) 45%, transparent 80%)',
        }}
      />

      <div
        className="absolute bottom-4 left-6 lg:left-1/5 w-[550px] h-[550px] rounded-full blur-[160px] pointer-events-none dark:opacity-40"
        style={{
          transition: 'opacity 1400ms cubic-bezier(0.22, 1, 0.36, 1), transform 1400ms cubic-bezier(0.22, 1, 0.36, 1)',
          opacity: step >= 2 ? 0.6 : 0,
          transform: step >= 2 ? 'scale(1)' : 'scale(0.65)',
          background: 'radial-gradient(circle, rgba(196, 166, 123, 0.10) 0%, rgba(222, 211, 197, 0.40) 45%, transparent 75%)',
        }}
      />

      {/* ─────────────────────────────────────────────────────────────
          MAIN ASYMMETRICAL EDITORIAL COMPOSITION
      ───────────────────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-6xl w-full mx-auto px-6 sm:px-10 lg:px-12 py-8 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-14">

        {/* LEFT COLUMN: Typography Sequence */}
        <div
          className="w-full lg:w-3/5 flex flex-col items-center lg:items-start text-center lg:text-left transition-transform duration-500 ease-out"
          style={{
            transform: isReducedMotion
              ? 'none'
              : `translate3d(${textTranslateX}px, ${textTranslateY}px, 0)`,
          }}
        >
          {/* STEP 4: "WELCOME TO MY PORTFOLIO" appears with noticeable upward movement (translateY 35px -> 0) */}
          <div
            style={{
              transition: 'opacity 700ms cubic-bezier(0.22, 1, 0.36, 1), transform 700ms cubic-bezier(0.22, 1, 0.36, 1)',
              opacity: step >= 4 ? 1 : 0,
              transform: step >= 4 ? 'translateY(0px)' : 'translateY(35px)',
            }}
          >
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#EDE4D8] dark:bg-[#24201D] border border-[#DED3C5] dark:border-[#38332E] shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A8875A] dark:bg-[#C4A67B] animate-pulse" />
              <span className="text-xs font-serif uppercase tracking-[0.20em] text-[#A8875A] dark:text-[#C4A67B] font-bold">
                WELCOME TO MY PORTFOLIO
              </span>
            </div>
          </div>

          {/* STEP 5: "KRUPA B T" enters with stronger cinematic reveal */}
          <div
            className="mt-5 sm:mt-6"
            style={{
              transition: 'opacity 800ms cubic-bezier(0.22, 1, 0.36, 1), transform 800ms cubic-bezier(0.22, 1, 0.36, 1), filter 800ms cubic-bezier(0.22, 1, 0.36, 1)',
              opacity: step >= 5 ? 1 : 0,
              transform: step >= 5 ? 'scale(1) translateY(0px)' : 'scale(0.94) translateY(20px)',
              filter: step >= 5 ? 'blur(0px)' : 'blur(8px)',
            }}
          >
            <h1 className="text-4xl min-[400px]:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-[-0.03em] text-[#292522] dark:text-[#F5EFEB] leading-none whitespace-nowrap">
              KRUPA B T
            </h1>
          </div>

          {/* STEP 6: Smooth Scrolling Animated Text */}
          <div
            className="mt-6 sm:mt-7 w-full max-w-lg flex flex-col items-center lg:items-start space-y-3.5"
            style={{
              transition: 'opacity 700ms cubic-bezier(0.22, 1, 0.36, 1), transform 700ms cubic-bezier(0.22, 1, 0.36, 1)',
              opacity: step >= 6 ? 1 : 0,
              transform: step >= 6 ? 'translateY(0px)' : 'translateY(25px)',
            }}
          >
            {/* Primary Discipline Subtitle */}
            <p className="text-base sm:text-lg md:text-xl font-serif font-bold tracking-[0.14em] uppercase text-[#5F5750] dark:text-[#D1C8C0]">
              INFORMATION SCIENCE ENGINEERING
            </p>

            {/* Clean Scrolling Ribbon with normal Bengaluru, India font */}
            <div className="w-full overflow-hidden mask-edges-fade py-1">
              <div className="animate-marquee-continuous flex items-center gap-6 py-2 px-3 rounded-full bg-[#FFFCF7] dark:bg-[#24201D] border border-[#DED3C5] dark:border-[#38332E] shadow-sm text-xs sm:text-sm text-[#5F5750] dark:text-[#D1C8C0]">
                <div className="flex items-center gap-2 text-[#A8875A] dark:text-[#C4A67B] font-medium whitespace-nowrap font-clean tracking-normal">
                  <MapPin className="w-3.5 h-3.5 text-[#A8875A] dark:text-[#C4A67B]" />
                  <span>Bengaluru, India</span>
                </div>
                <span className="text-[#DED3C5] dark:text-[#38332E] select-none">✦</span>
                <span className="text-[#292522] dark:text-[#F5EFEB] whitespace-nowrap font-medium font-serif">Information Science Engineering</span>
                <span className="text-[#DED3C5] dark:text-[#38332E] select-none">✦</span>
                <span className="text-[#7D736A] dark:text-[#9E9389] whitespace-nowrap font-serif">Building · Learning · Exploring</span>
                <span className="text-[#DED3C5] dark:text-[#38332E] select-none">✦</span>
                {/* Seamless repeat loop segment */}
                <div className="flex items-center gap-2 text-[#A8875A] dark:text-[#C4A67B] font-medium whitespace-nowrap font-clean tracking-normal">
                  <MapPin className="w-3.5 h-3.5 text-[#A8875A] dark:text-[#C4A67B]" />
                  <span>Bengaluru, India</span>
                </div>
                <span className="text-[#DED3C5] dark:text-[#38332E] select-none">✦</span>
                <span className="text-[#292522] dark:text-[#F5EFEB] whitespace-nowrap font-medium font-serif">Information Science Engineering</span>
                <span className="text-[#DED3C5] dark:text-[#38332E] select-none">✦</span>
                <span className="text-[#7D736A] dark:text-[#9E9389] whitespace-nowrap font-serif">Building · Learning · Exploring</span>
                <span className="text-[#DED3C5] dark:text-[#38332E] select-none">✦</span>
              </div>
            </div>
          </div>

          {/* STEP 7: ENTER MY PORTFOLIO button */}
          <div
            className="mt-8 sm:mt-10 flex flex-col items-center lg:items-start"
            style={{
              transition: 'opacity 600ms cubic-bezier(0.22, 1, 0.36, 1), transform 600ms cubic-bezier(0.22, 1, 0.36, 1)',
              opacity: step >= 7 ? 1 : 0,
              transform: step >= 7 ? 'translateY(0px)' : 'translateY(20px)',
            }}
          >
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                triggerEnter('home');
              }}
              className="group relative inline-flex items-center gap-3.5 px-9 py-4 text-sm font-bold tracking-[0.16em] uppercase text-[#F7F3ED] dark:text-[#141210] transition-all duration-250 focus-visible:ring-2 focus-visible:ring-[#A8875A] dark:focus-visible:ring-[#C4A67B] rounded-xl bg-[#292522] dark:bg-[#C4A67B] hover:bg-[#A8875A] dark:hover:bg-[#D8BC93] hover:text-[#292522] dark:hover:text-[#141210] border border-[#292522] dark:border-[#C4A67B] hover:border-[#A8875A] shadow-[0_4px_20px_rgba(41,37,34,0.18)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:-translate-y-1 active:scale-95 cursor-pointer z-30"
              aria-label="Enter My Portfolio"
            >
              <span>ENTER MY PORTFOLIO</span>
              <span className="inline-block transition-transform duration-250 ease-out group-hover:translate-x-2 font-bold text-base">
                →
              </span>
            </button>

            <p className="mt-3.5 text-xs font-clean tracking-normal text-[#7D736A] dark:text-[#9E9389]">
              Click to step inside or explore
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: STEP 3 - Krupa's Real Portrait */}
        <div
          className="w-full lg:w-2/5 flex justify-center items-center relative py-2 lg:py-4"
          style={{
            transform: isReducedMotion
              ? 'none'
              : `translate3d(${portraitTranslateX}px, ${portraitTranslateY}px, 0)`,
          }}
        >
          {/* Depth Silhouette */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{
              transition: 'opacity 1100ms cubic-bezier(0.22, 1, 0.36, 1), transform 1100ms cubic-bezier(0.22, 1, 0.36, 1)',
              opacity: step >= 3 ? 0.20 : 0,
              transform: isReducedMotion
                ? (step >= 3 ? 'scale(1.05)' : 'scale(0.92)')
                : `translate3d(${depthTranslateX}px, ${depthTranslateY}px, 0) ${step >= 3 ? 'scale(1.05)' : 'scale(0.92)'}`,
            }}
          >
            <img
              src="/profile.jpeg"
              alt=""
              aria-hidden="true"
              className="w-56 sm:w-64 lg:w-72 h-72 sm:h-80 lg:h-96 object-cover rounded-3xl filter blur-2xl pointer-events-none"
            />
          </div>

          {/* Delicate rim glow accent */}
          <div
            className="absolute w-56 sm:w-64 lg:w-72 h-72 sm:h-80 lg:h-96 rounded-3xl bg-gradient-to-b from-[#A8875A]/20 via-[#C4A67B]/15 to-transparent blur-md pointer-events-none"
            style={{
              transition: 'opacity 1100ms cubic-bezier(0.22, 1, 0.36, 1)',
              opacity: step >= 3 ? 0.6 : 0,
            }}
          />

          {/* STEP 3 Main Foreground Portrait */}
          <div
            className="relative w-56 sm:w-64 lg:w-72 h-72 sm:h-80 lg:h-96 rounded-3xl overflow-hidden border border-[#DED3C5] dark:border-[#38332E] shadow-[0_20px_45px_-10px_rgba(41,37,34,0.15)] dark:shadow-[0_20px_45px_-10px_rgba(0,0,0,0.4)] bg-[#FFFCF7] dark:bg-[#24201D]"
            style={{
              transition: 'opacity 1100ms cubic-bezier(0.22, 1, 0.36, 1), transform 1100ms cubic-bezier(0.22, 1, 0.36, 1), filter 1100ms cubic-bezier(0.22, 1, 0.36, 1)',
              opacity: step >= 3 ? 1 : 0,
              transform: step >= 3 ? (isExiting ? 'scale(1.04)' : 'scale(1)') : 'scale(1.08)',
              filter: step >= 3 ? 'blur(0px)' : 'blur(18px)',
            }}
          >
            <img
              src="/profile.jpeg"
              alt="Krupa B T - Portrait"
              className="w-full h-full object-cover object-top filter contrast-[1.02] select-none"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#292522]/30 dark:from-[#141210]/40 via-transparent to-transparent pointer-events-none" />
            <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-[#DED3C5]/40 dark:ring-[#38332E]/50 pointer-events-none" />
          </div>
        </div>

      </div>

    </section>
  );
}
