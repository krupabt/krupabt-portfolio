import React, { useState } from 'react';
import { Terminal, Briefcase, GraduationCap, Calendar, MapPin, CheckCircle2, Award, ArrowUpRight, Compass, Sparkles } from 'lucide-react';
import { experience, education, personalJourney } from '../data/portfolioData';

export default function ExperienceTimeline() {
  const [activeMilestone, setActiveMilestone] = useState(personalJourney.length - 1); // default to PRESENT

  return (
    <section id="experience" className="relative py-32 bg-dark-900/60 overflow-hidden border-t border-white/[0.04]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Subtle technical background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-cyan-400 mb-3 uppercase tracking-wider">
              <Terminal className="w-3.5 h-3.5" />
              <span>05 // GROWTH & TRAJECTORY</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Personal Journey & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">
                Practical Experience
              </span>
            </h2>
          </div>

          <p className="mt-4 md:mt-0 text-slate-400 text-sm max-w-md font-light leading-relaxed">
            An authentic track record as an Information Science Engineering student combining continuous academic diligence with hands-on development.
          </p>
        </div>

        {/* 1. PERSONAL JOURNEY VISUAL TRACK (2023 -> 2025 -> 2026 -> 2026 -> PRESENT) */}
        <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/[0.08] mb-16 relative overflow-hidden">
          
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-6">
            <Compass className="w-4 h-4" />
            <span>MY JOURNEY SO FAR</span>
          </div>

          {/* Journey Steps Track */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
            {personalJourney.map((step, idx) => {
              const isActive = activeMilestone === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveMilestone(idx)}
                  className={`p-4 rounded-2xl text-left transition-all duration-300 border flex flex-col justify-between ${
                    isActive
                      ? 'border-cyan-400/60 bg-cyan-500/15 shadow-[0_0_20px_rgba(0,242,254,0.15)] scale-[1.02]'
                      : 'border-white/[0.06] bg-dark-950/60 hover:bg-white/[0.04] hover:border-white/[0.15]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-sm font-black text-cyan-300">
                      {step.year}
                    </span>
                    <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-cyan-400 animate-ping' : 'bg-slate-700'}`} />
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {step.title}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detailed Milestone Inspector */}
          <div className="p-6 rounded-2xl bg-dark-950/80 border border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-mono text-cyan-400 uppercase mb-1">
                MILESTONE // {personalJourney[activeMilestone].year}
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-white mb-2">
                {personalJourney[activeMilestone].title}
              </h4>
              <p className="text-sm text-slate-300 font-light leading-relaxed max-w-3xl">
                {personalJourney[activeMilestone].desc}
              </p>
            </div>

            <div className="shrink-0 font-mono text-xs text-slate-400 bg-white/[0.03] px-3 py-2 rounded-xl border border-white/[0.05]">
              {personalJourney[activeMilestone].institution}
            </div>
          </div>

        </div>

        {/* 2. REAL INTERNSHIP & EDUCATION CARDS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Internship Card */}
          <div className="lg:col-span-7 glass-panel rounded-3xl p-6 sm:p-10 border border-white/[0.08] flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                  DEVELOPMENT INTERNSHIP
                </span>
                <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                  <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                  <span>January 2026 – April 2026</span>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-white tracking-tight mb-1">
                {experience[0].role}
              </h3>
              <div className="text-base font-semibold text-cyan-400 mb-4 flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                <span>{experience[0].company}</span>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed mb-6 font-light">
                {experience[0].description}
              </p>

              {/* Technologies Actually Worked On */}
              <div className="space-y-3 mb-6">
                <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  What I actually worked on:
                </div>
                <div className="flex flex-wrap gap-2">
                  {experience[0].technologies.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-lg text-xs font-mono bg-white/[0.04] text-slate-200 border border-white/[0.08]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actual responsibilities without fabrication */}
              <div className="space-y-2 pt-4 border-t border-white/[0.06]">
                {experience[0].responsibilities.map((resp, rIdx) => (
                  <div key={rIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                    <span>{resp}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Education Card */}
          <div className="lg:col-span-5 glass-panel rounded-3xl p-6 sm:p-10 border border-white/[0.08] flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                  ACADEMIC FOUNDATION
                </span>
                <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                  <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{education.period}</span>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-white tracking-tight mb-1">
                {education.degree}
              </h3>
              <div className="text-indigo-300 text-sm font-semibold mb-2">
                {education.field}
              </div>
              <div className="text-slate-400 text-xs flex items-center gap-2 mb-6">
                <GraduationCap className="w-4 h-4 text-indigo-400" />
                <span>{education.institution}</span>
              </div>

              {/* GPA Highlight */}
              <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-between mb-6">
                <div>
                  <div className="text-xs font-mono text-slate-300 uppercase">Cumulative GPA</div>
                  <div className="text-xs text-slate-400">Consistent academic focus</div>
                </div>
                <div className="text-2xl font-black font-mono text-cyan-300">
                  {education.gpa}
                </div>
              </div>

              <div className="space-y-2.5 pt-4 border-t border-white/[0.06]">
                {education.highlights.map((hl, hIdx) => (
                  <div key={hIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-indigo-400 mt-0.5 shrink-0" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
