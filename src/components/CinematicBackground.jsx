import React, { useState, useEffect, useRef } from 'react';
import { SECTION_ATMOSPHERES } from '../data/atmospheres';

export default function CinematicBackground({ activeSection = 'home' }) {
  const [currentSection, setCurrentSection] = useState(activeSection);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.3 });
  const [scrollY, setScrollY] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const targetPosRef = useRef({ x: 0.5, y: 0.3 });
  const currentPosRef = useRef({ x: 0.5, y: 0.3 });

  useEffect(() => {
    if (activeSection) {
      setCurrentSection(activeSection);
    }
  }, [activeSection]);

  // Section observer to smoothly morph background atmosphere across scroll
  useEffect(() => {
    const sectionIds = ['home', 'about', 'work', 'skills', 'experience', 'education', 'certifications', 'contact'];
    const elements = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.2) {
            setCurrentSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-10% 0px -40% 0px',
        threshold: [0.2, 0.5],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Parallax and scroll tracking
  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(motionQuery.matches);
    const handleMotionChange = (e) => setIsReducedMotion(e.matches);
    motionQuery.addEventListener('change', handleMotionChange);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768;
    if (isTouchDevice || motionQuery.matches) {
      return () => {
        window.removeEventListener('scroll', handleScroll);
        motionQuery.removeEventListener('change', handleMotionChange);
      };
    }

    let rafId = null;

    const handleMouseMove = (e) => {
      targetPosRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };

    const updateParallax = () => {
      currentPosRef.current.x += (targetPosRef.current.x - currentPosRef.current.x) * 0.03;
      currentPosRef.current.y += (targetPosRef.current.y - currentPosRef.current.y) * 0.03;

      setMousePos({
        x: Math.round(currentPosRef.current.x * 1000) / 1000,
        y: Math.round(currentPosRef.current.y * 1000) / 1000,
      });

      rafId = requestAnimationFrame(updateParallax);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    rafId = requestAnimationFrame(updateParallax);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
      motionQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  const atmosphere = SECTION_ATMOSPHERES[currentSection] || SECTION_ATMOSPHERES.home;

  // Parallax:
  // atmospheric primary layer: 0.15x scroll
  // secondary peripheral layer: -0.08x scroll
  // accent depth layer: 0.05x scroll
  const scrollOffsetPrimary = isReducedMotion ? 0 : scrollY * 0.15;
  const scrollOffsetSecondary = isReducedMotion ? 0 : -scrollY * 0.08;
  const scrollOffsetAccent = isReducedMotion ? 0 : scrollY * 0.05;

  const parallaxX = (mousePos.x - 0.5) * 24;
  const parallaxY = (mousePos.y - 0.5) * 24;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden transition-colors duration-1000 ease-out"
      style={{ backgroundColor: atmosphere.baseColor }}
      aria-hidden="true"
    >
      {/* ─────────────────────────────────────────────────────────────
          LAYER 0: DEEP BASE (Deep Forest Obsidian + Deep Moss Slate)
      ───────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 bg-[#060A08]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#060A08] via-[#0B1310] to-[#060A08]" />
      
      {/* Deep Dark Moss Ambient Mesh */}
      <div
        className="absolute inset-0 transition-all duration-1000 ease-out"
        style={{
          background: atmosphere.meshGradient || 'radial-gradient(circle at 50% 35%, #111C18 0%, #0B1310 45%, #060A08 100%)',
          opacity: 0.85,
        }}
      />

      {/* ─────────────────────────────────────────────────────────────
          LAYER 1: PRIMARY ATMOSPHERIC GRADIENT (0.15x scroll parallax)
      ───────────────────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 transition-opacity duration-1000 ease-out will-change-transform"
        style={{
          background: atmosphere.primaryGradient,
          transform: `translate3d(${-parallaxX * 0.8}px, ${scrollOffsetPrimary - parallaxY * 0.8}px, 0)`,
          transition: 'background 1000ms ease-out, transform 100ms linear',
        }}
      />

      {/* ─────────────────────────────────────────────────────────────
          LAYER 2: SECONDARY PERIPHERAL BLOOM (-0.08x scroll parallax)
      ───────────────────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 transition-opacity duration-1000 ease-out will-change-transform"
        style={{
          background: atmosphere.secondaryGradient,
          transform: `translate3d(${parallaxX * 0.6}px, ${scrollOffsetSecondary + parallaxY * 0.6}px, 0)`,
          transition: 'background 1000ms ease-out, transform 100ms linear',
        }}
      />

      {/* ─────────────────────────────────────────────────────────────
          LAYER 3: ACCENT DEPTH LUMINESCENCE (0.05x scroll parallax)
      ───────────────────────────────────────────────────────────── */}
      <div
        className={`absolute top-[16%] right-[12%] w-[650px] sm:w-[900px] h-[650px] sm:h-[900px] rounded-full blur-[160px] will-change-transform transition-all duration-1000 ease-out ${
          !isReducedMotion ? 'animate-drift-slow-1' : ''
        }`}
        style={{
          background: `radial-gradient(circle, ${atmosphere.accentLight} 0%, transparent 68%)`,
          transform: `translate3d(0, ${scrollOffsetAccent}px, 0)`,
        }}
      />

      {/* ─────────────────────────────────────────────────────────────
          LAYER 4: EDITORIAL SOFT VIGNETTE (Shades perimeter edges smoothly)
      ───────────────────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-1000 ease-out"
        style={{
          background: atmosphere.vignette,
        }}
      />

      {/* ─────────────────────────────────────────────────────────────
          LAYER 5: ULTRA-SUBTLE FILM GRAIN TEXTURE (0.03 opacity)
      ───────────────────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-screen"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
