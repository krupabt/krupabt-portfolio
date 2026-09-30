import React, { useState, useEffect, useRef } from 'react';
import { ArrowDown, ArrowUpRight, MapPin, Sparkles, Send } from 'lucide-react';
import { GithubIcon } from './Icons';
import ProfilePhoto from './ProfilePhoto';
import { personalInfo } from '../data/portfolioData';

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const heroRef = useRef(null);

  // 1. Smooth page-load animation trigger & accessibility check
  useEffect(() => {
    // Check user preference for reduced motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(motionQuery.matches);

    const handleMotionChange = (e) => setIsReducedMotion(e.matches);
    motionQuery.addEventListener('change', handleMotionChange);

    // Trigger entrance animation
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => {
      clearTimeout(timer);
      motionQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  // 2. Subtle mouse-responsive parallax with smooth interpolation
  useEffect(() => {
    if (isReducedMotion) return;

    // Disable parallax on mobile/touch devices
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768;
    if (isTouchDevice) return;

    let rafId = null;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      // Calculate normalized mouse coords (-1 to +1)
      const nx = (e.clientX / innerWidth) * 2 - 1;
      const ny = (e.clientY / innerHeight) * 2 - 1;

      targetX = nx * 14; // Max 14px shift
      targetY = ny * 14;
    };

    const updateParallax = () => {
      // Smooth lerp (linear interpolation) for buttery motion
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

  // Smooth scroll handler
  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center pt-28 pb-20 md:pt-36 md:pb-28 bg-cinematic-950 text-cinematic-warmWhite overflow-hidden"
    >
      {/* ─────────────────────────────────────────────────────────────
          DREAMY CINEMATIC AMBIENT LIGHTING BACKGROUND
      ───────────────────────────────────────────────────────────── */}
      {/* Deep layered base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-cinematic-950 via-cinematic-900 to-cinematic-950 pointer-events-none" />

      {/* Parallax ambient glow orbs */}
      <div
        className="absolute -top-32 left-1/4 w-[550px] h-[550px] bg-cinematic-purple/15 rounded-full blur-[120px] pointer-events-none transition-transform duration-700 ease-out"
        style={{
          transform: isReducedMotion
            ? 'none'
            : `translate3d(${-mouseOffset.x * 1.5}px, ${-mouseOffset.y * 1.5}px, 0)`,
        }}
      />
      <div
        className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-cinematic-violet/12 rounded-full blur-[140px] pointer-events-none transition-transform duration-700 ease-out"
        style={{
          transform: isReducedMotion
            ? 'none'
            : `translate3d(${mouseOffset.x * 1.8}px, ${mouseOffset.y * 1.8}px, 0)`,
        }}
      />
      <div
        className="absolute -bottom-20 left-10 w-[450px] h-[450px] bg-cinematic-deepPurple/20 rounded-full blur-[120px] pointer-events-none"
      />

      {/* Subtle fine film grain texture */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 0)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Cinematic vignette */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-cinematic-950/70 pointer-events-none" />

      {/* ─────────────────────────────────────────────────────────────
          MAIN CONTENT CONTAINER
      ───────────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* LEFT COLUMN: Editorial Typography & Content */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6 text-left">
            
            {/* Small Label: Information Science Engineering Student */}
            <div
              className={`inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.1] text-xs font-mono tracking-[0.2em] uppercase text-cinematic-lavender shadow-sm transition-all duration-700 ease-out ${
                isLoaded
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cinematic-lavender animate-pulse" />
              <span>INFORMATION SCIENCE ENGINEERING STUDENT</span>
            </div>

            {/* Main Heading: KRUPA B T (Split lines with monumental typography) */}
            <div
              className={`space-y-1 transition-all duration-800 ease-out delay-150 ${
                isLoaded
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-6'
              }`}
            >
              <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-[-0.035em] leading-[0.92] text-white">
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-cinematic-warmWhite to-cinematic-lavender/90">
                  KRUPA
                </span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-cinematic-violet/80">
                  B T
                </span>
              </h1>
            </div>

            {/* Professional Positioning */}
            <div
              className={`transition-all duration-700 ease-out delay-300 ${
                isLoaded
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-5'
              }`}
            >
              <div className="text-lg sm:text-2xl font-semibold tracking-tight text-[#C8C5C0]">
                Information Science Engineering
              </div>
            </div>

            {/* Supporting Statement */}
            <p
              className={`text-cinematic-softGray text-base sm:text-lg md:text-xl font-light leading-relaxed max-w-xl text-balance transition-all duration-700 ease-out delay-400 ${
                isLoaded
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-5'
              }`}
            >
              "{personalInfo.supportingStatement}"
            </p>

            {/* Buttons & Actions */}
            <div
              className={`flex flex-wrap items-center gap-4 pt-3 transition-all duration-700 ease-out delay-500 ${
                isLoaded
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-5'
              }`}
            >
              {/* Primary CTA: Explore My Work */}
              <a
                href="#projects"
                onClick={(e) => scrollToSection(e, 'projects')}
                className="group inline-flex items-center gap-2.5 px-7 py-4 rounded-full font-semibold text-sm text-cinematic-950 bg-cinematic-warmWhite hover:bg-cinematic-lavender hover:text-cinematic-950 transition-all duration-300 shadow-dreamy hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>EXPLORE MY WORK</span>
                <ArrowDown className="w-4 h-4 text-cinematic-950 group-hover:translate-y-0.5 transition-transform" />
              </a>

              {/* Secondary CTA: GitHub */}
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-full font-semibold text-sm text-cinematic-warmWhite bg-white/[0.04] hover:bg-white/[0.09] border border-white/[0.12] hover:border-cinematic-lavender/40 transition-all duration-300 shadow-sm active:scale-[0.98]"
              >
                <GithubIcon className="w-4 h-4 text-cinematic-warmWhite" />
                <span>GITHUB</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-cinematic-softGray" />
              </a>

              {/* Optional Third CTA: Let's Connect */}
              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, 'contact')}
                className="inline-flex items-center gap-2 px-5 py-4 rounded-full text-sm font-medium text-cinematic-softGray hover:text-cinematic-warmWhite hover:bg-white/[0.04] transition-all duration-200"
              >
                <Send className="w-3.5 h-3.5 text-cinematic-lavender" />
                <span>LET'S CONNECT</span>
              </a>
            </div>

            {/* Location Tag */}
            <div
              className={`pt-5 flex items-center gap-2 text-xs font-mono text-cinematic-softGray/80 tracking-wide transition-all duration-700 ease-out delay-600 ${
                isLoaded
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              }`}
            >
              <MapPin className="w-3.5 h-3.5 text-cinematic-lavender/80" />
              <span>{personalInfo.location}</span>
              <span className="text-white/20 mx-1.5">•</span>
              <span className="text-cinematic-softGray/70">Garden City University</span>
            </div>

          </div>

          {/* RIGHT COLUMN: Cinematic Portrait Frame */}
          <div
            className={`lg:col-span-5 w-full flex items-center justify-center lg:justify-end transition-all duration-1000 ease-out delay-200 ${
              isLoaded
                ? 'opacity-100 translate-y-0 scale-100'
                : 'opacity-0 translate-y-8 scale-[0.97]'
            }`}
          >
            <ProfilePhoto
              parallaxOffset={
                isReducedMotion
                  ? { x: 0, y: 0 }
                  : { x: mouseOffset.x * 0.75, y: mouseOffset.y * 0.75 }
              }
            />
          </div>

        </div>
      </div>

      {/* Subtle bottom gradient transition to blend softly into the next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-cinematic-950 via-cinematic-950/60 to-transparent pointer-events-none" />
    </section>
  );
}
