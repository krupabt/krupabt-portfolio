import React, { useState } from 'react';
import { User, Sparkles, Code2, Terminal, ShieldCheck } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function ProfilePhotoFrame() {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="relative flex items-center justify-center p-4 select-none">
      
      {/* Outer ambient glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 via-indigo-500/15 to-purple-500/20 rounded-3xl blur-2xl pointer-events-none transform -rotate-1 scale-105" />

      {/* Outer Technical Frame */}
      <div className="relative w-72 h-80 sm:w-80 sm:h-96 rounded-3xl glass-panel p-3 border border-white/[0.12] shadow-2xl backdrop-blur-xl flex flex-col justify-between overflow-hidden group">
        
        {/* Animated perimeter border shimmer */}
        <div className="absolute inset-0 rounded-3xl border border-cyan-500/30 group-hover:border-cyan-400/60 transition-colors pointer-events-none" />

        {/* Top telemetry bar */}
        <div className="flex items-center justify-between px-2 pt-1 z-10 text-[10px] font-mono text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-300">ENG // ID: KB-2026</span>
          </div>
          <span className="text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
            GCU • ISE
          </span>
        </div>

        {/* Photo Container */}
        <div className="relative my-2 w-full flex-1 rounded-2xl overflow-hidden bg-dark-950/80 border border-white/[0.08] flex items-center justify-center group-hover:border-white/[0.18] transition-all">
          
          {/* Subtle grid pattern inside frame */}
          <div className="absolute inset-0 bg-noise opacity-40 pointer-events-none" />

          {!imageError ? (
            <img
              src={personalInfo.profilePhoto}
              alt={personalInfo.name}
              onError={() => setImageError(true)}
              className="w-full h-full object-cover object-center transform transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            /* Elegant Professional Placeholder when /profile.jpg is not yet added */
            <div className="flex flex-col items-center justify-center p-6 text-center space-y-3 z-10">
              <div className="relative">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shadow-[0_0_25px_rgba(0,242,254,0.2)]">
                  <User className="w-12 h-12 text-cyan-300 stroke-[1.5]" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-dark-950 border border-cyan-400 flex items-center justify-center text-[10px] text-cyan-300 font-mono font-bold">
                  ✓
                </div>
              </div>

              <div>
                <div className="text-sm font-bold text-white tracking-wide">
                  {personalInfo.name}
                </div>
                <div className="text-[11px] font-mono text-cyan-400 mt-0.5">
                  Information Science Engineering
                </div>
              </div>

              <div className="text-[10px] font-mono text-slate-400 bg-white/[0.04] px-2.5 py-1.5 rounded-lg border border-white/[0.06] max-w-[200px] leading-tight">
                Add your photo to <br />
                <span className="text-cyan-300 font-semibold">/public/profile.jpg</span>
              </div>
            </div>
          )}

          {/* Lens Corner Marks */}
          <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t-2 border-l-2 border-cyan-400/70" />
          <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t-2 border-r-2 border-cyan-400/70" />
          <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b-2 border-l-2 border-cyan-400/70" />
          <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b-2 border-r-2 border-cyan-400/70" />
        </div>

        {/* Bottom Status Ribbon */}
        <div className="flex items-center justify-between px-2 pb-1 z-10 text-[11px] font-mono text-slate-300">
          <span className="text-slate-400">STATUS:</span>
          <span className="text-emerald-400 font-medium flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Active Problem Solver
          </span>
        </div>

      </div>

      {/* Floating Decorative Technical Badges */}
      <div className="absolute -bottom-3 -left-3 glass-panel px-3 py-1.5 rounded-xl border border-white/[0.12] text-[11px] font-mono text-cyan-300 shadow-xl hidden sm:flex items-center gap-2">
        <Code2 className="w-3.5 h-3.5 text-cyan-400" />
        <span>Python • DSA • Web</span>
      </div>

      <div className="absolute -top-3 -right-3 glass-panel px-3 py-1.5 rounded-xl border border-white/[0.12] text-[11px] font-mono text-slate-200 shadow-xl hidden sm:flex items-center gap-2">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
        <span>CGPA: 9.17 / 10</span>
      </div>

    </div>
  );
}
