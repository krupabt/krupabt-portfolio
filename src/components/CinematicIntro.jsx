import React, { useState, useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';

export default function CinematicIntro({ onStartEnter }) {
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

    // STEP 1: Background starts dark & slightly blurred
    const t1 = setTimeout(() => setStep(1), 50);
    // STEP 2: Atmospheric light slowly expands into screen
    const t2 = setTimeout(() => setStep(2), 300);
    // STEP 3: Profile portrait appears from deep blur (18px) + scale (1.08 -> 1)
    const t3 = setTimeout(() => setStep(3), 650);
    // STEP 4: "WELCOME TO MY PORTFOLIO" appears with noticeable upward movement (translateY 35px -> 0)
    const t4 = setTimeout(() => setStep(4), 1100);
    // STEP 5: "KRUPA B T" appears with stronger reveal (scale 0.94 -> 1, blur 8px -> 0)
    const t5 = setTimeout(() => setStep(5), 1500);
    // STEP 6: Supporting information appears after the name
    const t6 = setTimeout(() => setStep(6), 1950);
    // STEP 7: ENTER MY PORTFOLIO button appears LAST
    const t7 = setTimeout(() => setStep(7), 2400);

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
    
    // Smooth forward push transition into the Home section
    if (onStartEnter) {
      onStartEnter(targetSection);
    }

    setTimeout(() => {
      setIsExiting(false);
    }, 1200);
  };

  // Keyboard accessibility: Enter or Space triggers entry
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        // Only trigger if scroll position is at top
        if (window.scrollY < 300) {
          e.preventDefault();
          triggerEnter('home');
        }
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
      className="relative min-h-screen w-full flex items-center justify-center text-[#F5F3EE] select-none overflow-hidden"
      style={{
        transition: 'transform 800ms cubic-bezier(0.22, 1, 0.36, 1), filter 800ms cubic-bezier(0.22, 1, 0.36, 1), opacity 800ms ease',
        transform: isExiting ? 'scale(1.04)' : 'scale(1)',
        filter: isExiting ? 'blur(4px)' : 'none',
        opacity: isExiting ? 0.6 : 1,
      }}
      role="region"
      aria-label="Welcome to Krupa BT's Portfolio"
    >
      {/* ─────────────────────────────────────────────────────────────
          STEP 1: DARK ATMOSPHERIC BACKGROUND (Starts dark & slightly blurred)
      ───────────────────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          transition: 'opacity 1200ms cubic-bezier(0.22, 1, 0.36, 1), filter 1200ms cubic-bezier(0.22, 1, 0.36, 1)',
          opacity: step >= 1 ? 1 : 0,
          filter: step >= 1 ? 'blur(0px)' : 'blur(14px)',
          background: 'radial-gradient(ellipse 95% 75% at 65% 30%, #091838 0%, #061026 38%, #040915 68%, #020409 100%)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#020409] via-transparent to-[#020409]/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(2,4,10,0.42)_78%,#020409_100%)]" />

        {/* Tactile Cinematic Grain */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.048] mix-blend-screen"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='introNoise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23introNoise)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          STEP 2: ATMOSPHERIC BLUE LIGHT EXPANDS INTO SCREEN
      ───────────────────────────────────────────────────────────── */}
      {/* Electric Blue Light bloom 1 (upper-right) */}
      <div
        className="absolute -top-20 right-0 lg:right-1/4 w-[650px] sm:w-[880px] h-[650px] sm:h-[880px] rounded-full blur-[200px] pointer-events-none"
        style={{
          transition: 'opacity 1400ms cubic-bezier(0.22, 1, 0.36, 1), transform 1400ms cubic-bezier(0.22, 1, 0.36, 1)',
          opacity: step >= 2 ? 0.9 : 0,
          transform: step >= 2 ? 'scale(1)' : 'scale(0.65)',
          background: 'radial-gradient(circle, rgba(37, 99, 235, 0.34) 0%, rgba(30, 64, 175, 0.22) 45%, rgba(8, 20, 50, 0.35) 70%, transparent 88%)',
        }}
      />

      {/* Electric Blue Light bloom 2 (bottom-left) */}
      <div
        className="absolute bottom-4 left-6 lg:left-1/5 w-[550px] h-[550px] rounded-full blur-[180px] pointer-events-none"
        style={{
          transition: 'opacity 1400ms cubic-bezier(0.22, 1, 0.36, 1), transform 1400ms cubic-bezier(0.22, 1, 0.36, 1)',
          opacity: step >= 2 ? 0.8 : 0,
          transform: step >= 2 ? 'scale(1)' : 'scale(0.65)',
          background: 'radial-gradient(circle, rgba(14, 165, 233, 0.24) 0%, rgba(8, 22, 52, 0.30) 45%, transparent 75%)',
        }}
      />

      {/* Blue Accent bloom 3 */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[480px] h-[480px] rounded-full blur-[170px] pointer-events-none"
        style={{
          transition: 'opacity 1200ms cubic-bezier(0.22, 1, 0.36, 1), transform 1200ms cubic-bezier(0.22, 1, 0.36, 1)',
          opacity: step >= 2 ? 0.75 : 0,
          transform: step >= 2 ? 'scale(1)' : 'scale(0.7)',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.26) 0%, rgba(8, 20, 48, 0.28) 50%, transparent 75%)',
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
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#5B8CFF]/10 border border-[#5B8CFF]/25 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5B8CFF] animate-pulse" />
              <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.24em] text-[#7AA2FF] font-semibold">
                WELCOME TO MY PORTFOLIO
              </span>
            </div>
          </div>

          {/* STEP 5: "KRUPA B T" enters with stronger cinematic reveal (0.94 -> 1, blur 8px -> 0) */}
          <div
            className="mt-5 sm:mt-7"
            style={{
              transition: 'opacity 800ms cubic-bezier(0.22, 1, 0.36, 1), transform 800ms cubic-bezier(0.22, 1, 0.36, 1), filter 800ms cubic-bezier(0.22, 1, 0.36, 1)',
              opacity: step >= 5 ? 1 : 0,
              transform: step >= 5 ? 'scale(1) translateY(0px)' : 'scale(0.94) translateY(20px)',
              filter: step >= 5 ? 'blur(0px)' : 'blur(8px)',
            }}
          >
            <h1 className="text-4xl min-[400px]:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-[-0.04em] text-[#F5F7FA] leading-none whitespace-nowrap">
              KRUPA B T
            </h1>
          </div>

          {/* STEP 6: Supporting information appears after the name */}
          <div
            className="mt-5 sm:mt-6 flex flex-col items-center lg:items-start space-y-2.5"
            style={{
              transition: 'opacity 700ms cubic-bezier(0.22, 1, 0.36, 1), transform 700ms cubic-bezier(0.22, 1, 0.36, 1)',
              opacity: step >= 6 ? 1 : 0,
              transform: step >= 6 ? 'translateY(0px)' : 'translateY(25px)',
            }}
          >
            {/* INFORMATION SCIENCE ENGINEERING */}
            <p className="text-sm sm:text-base md:text-lg font-sans font-semibold tracking-[0.16em] uppercase text-[#F5F7FA]">
              INFORMATION SCIENCE ENGINEERING
            </p>

            {/* BENGALURU, INDIA */}
            <div className="flex items-center gap-2 text-xs sm:text-sm font-mono tracking-[0.22em] uppercase text-[#9AA4B2]">
              <MapPin className="w-3.5 h-3.5 text-[#5B8CFF]" />
              <span>BENGALURU, INDIA</span>
            </div>

            {/* BUILDING · LEARNING · EXPLORING */}
            <div className="pt-2">
              <div className="py-1.5 px-3.5 rounded-lg border border-white/[0.08] bg-white/[0.02]">
                <span className="text-[11px] sm:text-xs font-mono tracking-[0.24em] uppercase text-[#D7DCE5] font-medium">
                  BUILDING · LEARNING · EXPLORING
                </span>
              </div>
            </div>
          </div>

          {/* STEP 7: ENTER MY PORTFOLIO button appears LAST */}
          <div
            className="mt-9 sm:mt-12 flex flex-col items-center lg:items-start"
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
              className="group relative inline-flex items-center gap-3 px-8 py-4 text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase text-white hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#5B8CFF]/60 rounded-xl bg-[#5B8CFF] hover:bg-[#7AA2FF] shadow-[0_4px_20px_rgba(91,140,255,0.25)] hover:-translate-y-0.5 active:scale-95 cursor-pointer z-30"
              aria-label="Enter My Portfolio"
            >
              <span>ENTER MY PORTFOLIO</span>
              <span className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1.5 font-bold">
                →
              </span>
            </button>

            <p className="mt-3.5 text-[10px] sm:text-[11px] font-mono tracking-widest text-[#6F7A89] uppercase">
              Click to step inside or scroll down to explore
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: STEP 3 - Krupa's Real Portrait from deep blur (18px) + scale (1.08 -> 1) */}
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
              opacity: step >= 3 ? 0.25 : 0,
              transform: isReducedMotion
                ? (step >= 3 ? 'scale(1.05)' : 'scale(0.92)')
                : `translate3d(${depthTranslateX}px, ${depthTranslateY}px, 0) ${step >= 3 ? 'scale(1.05)' : 'scale(0.92)'}`,
            }}
          >
            <img
              src="/profile.jpeg"
              alt=""
              aria-hidden="true"
              className="w-56 sm:w-64 lg:w-72 h-72 sm:h-80 lg:h-96 object-cover rounded-3xl filter blur-2xl pointer-events-none mix-blend-screen"
            />
          </div>

          {/* Delicate rim glow accent */}
          <div
            className="absolute w-56 sm:w-64 lg:w-72 h-72 sm:h-80 lg:h-96 rounded-3xl bg-gradient-to-b from-[#5B8CFF]/15 via-[#5B8CFF]/25 to-transparent blur-md pointer-events-none"
            style={{
              transition: 'opacity 1100ms cubic-bezier(0.22, 1, 0.36, 1)',
              opacity: step >= 3 ? 0.75 : 0,
            }}
          />

          {/* STEP 3 Main Foreground Portrait:
              Starts: opacity 0, filter blur(18px), transform scale(1.08)
              Animates to: opacity 1, filter blur(0px), transform scale(1)
          */}
          <div
            className="relative w-56 sm:w-64 lg:w-72 h-72 sm:h-80 lg:h-96 rounded-3xl overflow-hidden border border-white/[0.08] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)] bg-[#0D1118]"
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

            <div className="absolute inset-0 bg-gradient-to-t from-[#080A0F]/80 via-transparent to-black/10 pointer-events-none" />
            <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/[0.08] pointer-events-none" />
          </div>
        </div>

      </div>

    </section>
  );
}
