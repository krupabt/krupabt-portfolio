import React from 'react';

export default function AbstractAiOrb({ mouseOffset = { x: 0, y: 0 }, isReducedMotion = false }) {
  return (
    <div
      className="relative w-[340px] sm:w-[420px] lg:w-[480px] aspect-square flex items-center justify-center pointer-events-none select-none"
      aria-hidden="true"
    >
      {/* ─────────────────────────────────────────────────────────────
          1. LUMINOUS GLOW CORE
      ───────────────────────────────────────────────────────────── */}
      <div
        className="absolute w-3/4 h-3/4 rounded-full bg-gradient-to-tr from-[#10B981]/25 via-[#10B981]/15 to-[#34D399]/10 blur-3xl transition-transform duration-700 ease-out"
        style={{
          transform: isReducedMotion
            ? 'none'
            : `translate3d(${-mouseOffset.x * 0.8}px, ${-mouseOffset.y * 0.8}px, 0)`,
        }}
      />

      {/* ─────────────────────────────────────────────────────────────
          2. TRANSLUCENT 3D ROTATING ORBITAL RINGS
      ───────────────────────────────────────────────────────────── */}
      {/* Outer Ring 1 (Slanted 60deg) */}
      <div
        className={`absolute inset-4 rounded-full border border-[#10B981]/25 transition-transform duration-1000 ease-out ${
          isReducedMotion ? '' : 'animate-float-slow'
        }`}
        style={{
          transform: `rotateX(65deg) rotateY(15deg) rotateZ(${mouseOffset.x * 2}deg)`,
          boxShadow: '0 0 25px rgba(16, 185, 129, 0.16)',
        }}
      />

      {/* Inner Ring 2 (Slanted Counter 45deg) */}
      <div
        className="absolute inset-10 rounded-full border border-[#34D399]/20 transition-transform duration-700 ease-out"
        style={{
          transform: `rotateX(45deg) rotateY(-35deg) rotateZ(${-mouseOffset.y * 2}deg)`,
          boxShadow: '0 0 20px rgba(16, 185, 129, 0.12)',
        }}
      />

      {/* Equatorial Hairline Ring with dash pattern */}
      <div
        className="absolute inset-16 rounded-full border border-dashed border-white/15 transition-transform duration-500 ease-out"
        style={{
          transform: `rotateX(80deg) rotateZ(25deg)`,
        }}
      />

      {/* ─────────────────────────────────────────────────────────────
          3. VECTOR NEURAL CONNECTIONS & GLOWING NODES (SVG)
      ───────────────────────────────────────────────────────────── */}
      <svg
        className="absolute inset-0 w-full h-full z-10 overflow-visible"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="neuralGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34D399" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#10B981" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#111C18" stopOpacity="0.05" />
          </linearGradient>
          <filter id="nodeGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Neural connection lines */}
        <path d="M 80 140 Q 180 90 280 120" stroke="url(#neuralGrad)" strokeWidth="1.2" strokeDasharray="3 3" />
        <path d="M 280 120 Q 320 220 240 300" stroke="url(#neuralGrad)" strokeWidth="1.2" />
        <path d="M 240 300 Q 120 310 90 240" stroke="url(#neuralGrad)" strokeWidth="1.2" strokeDasharray="4 2" />
        <path d="M 90 240 Q 60 170 80 140" stroke="url(#neuralGrad)" strokeWidth="1.2" />
        
        {/* Cross-axial nodes */}
        <line x1="80" y1="140" x2="240" y2="300" stroke="rgba(52, 211, 153, 0.15)" strokeWidth="1" />
        <line x1="280" y1="120" x2="90" y2="240" stroke="rgba(16, 185, 129, 0.15)" strokeWidth="1" />
        <line x1="200" y1="70" x2="200" y2="330" stroke="rgba(52, 211, 153, 0.1)" strokeWidth="0.8" strokeDasharray="2 4" />

        {/* Neural Nodes */}
        <circle cx="80" cy="140" r="3" fill="#34D399" filter="url(#nodeGlow)" className="animate-pulse" />
        <circle cx="280" cy="120" r="3.5" fill="#F2FDF7" filter="url(#nodeGlow)" />
        <circle cx="240" cy="300" r="3" fill="#10B981" filter="url(#nodeGlow)" className="animate-pulse" />
        <circle cx="90" cy="240" r="2.5" fill="#34D399" />
        <circle cx="200" cy="70" r="2" fill="#34D399" opacity="0.7" />
        <circle cx="200" cy="200" r="4.5" fill="#F2FDF7" filter="url(#nodeGlow)" />
      </svg>
    </div>
  );
}
