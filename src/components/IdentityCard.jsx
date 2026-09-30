import React from 'react';
import { Mail, MapPin, Sparkles, ExternalLink, ShieldCheck, Terminal, Cpu } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { personalInfo } from '../data/portfolioData';

export default function IdentityCard() {
  return (
    <section className="relative py-12 bg-dark-950 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Digital Identity Passport Card */}
        <div className="relative glass-panel rounded-3xl p-6 sm:p-8 border border-white/[0.1] shadow-2xl bg-gradient-to-br from-white/[0.04] via-transparent to-cyan-500/[0.03] overflow-hidden group">
          
          {/* Decorative Corner Accents */}
          <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-cyan-500/40 rounded-tl-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-indigo-500/40 rounded-br-3xl pointer-events-none" />
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
            
            {/* Left: Identity & Monogram */}
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400/20 via-blue-500/20 to-purple-500/20 border border-cyan-400/30 flex items-center justify-center font-mono font-extrabold text-xl text-cyan-300 shadow-[0_0_20px_rgba(0,242,254,0.2)] shrink-0">
                KB
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                    {personalInfo.name}
                  </h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                    VERIFIED STUDENT
                  </span>
                </div>

                <div className="text-xs sm:text-sm font-sans font-medium text-[#C8C5C0] mt-1">
                  Information Science Engineering
                </div>

                <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-slate-400 font-mono mt-2">
                  <span className="flex items-center gap-1 text-slate-300">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    Information Science Engineering
                  </span>
                  <span>•</span>
                  <span>Garden City University</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-slate-400">
                    <MapPin className="w-3 h-3 text-cyan-400" />
                    {personalInfo.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Quick Connectivity Matrix */}
            <div className="flex flex-wrap items-center gap-2 pt-3 md:pt-0 border-t md:border-t-0 border-white/[0.06] w-full md:w-auto justify-start md:justify-end">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-mono bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 border border-white/[0.08] hover:border-cyan-500/40 transition-colors"
                title="GitHub Profile"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>

              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-mono bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 border border-white/[0.08] hover:border-cyan-500/40 transition-colors"
                title="LinkedIn Profile"
              >
                <LinkedinIcon className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>

              <a
                href={`mailto:${personalInfo.email}`}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-semibold bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/30 transition-colors"
                title="Send Email"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
