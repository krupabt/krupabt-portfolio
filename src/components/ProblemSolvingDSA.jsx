import React, { useState } from 'react';
import { Terminal, Code2, Cpu, Brain, CheckCircle2, ArrowUpRight, Sparkles, BookOpen, Activity } from 'lucide-react';
import { dsaTopics, currentlyLearning } from '../data/portfolioData';

export default function ProblemSolvingDSA() {
  const [selectedTopic, setSelectedTopic] = useState(dsaTopics[0]);

  return (
    <section id="dsa" className="relative py-28 bg-dark-900/40 overflow-hidden border-t border-white/[0.04]">
      {/* Ambient decorative lighting */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-cyan-400 mb-3 uppercase tracking-wider">
              <Terminal className="w-3.5 h-3.5" />
              <span>03 // ALGORITHMIC RIGOR</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              DSA & Problem Solving <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-sky-300 to-cyan-400">
                Foundations
              </span>
            </h2>
          </div>

          <p className="mt-4 md:mt-0 text-slate-400 text-sm max-w-md font-light leading-relaxed">
            "Continuously improving my problem-solving skills through DSA and coding practice." Focusing on space-time efficiency and core algorithmic patterns.
          </p>
        </div>

        {/* DSA Topic Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-8">
          {dsaTopics.map((topic) => {
            const isSelected = selectedTopic?.name === topic.name;

            return (
              <button
                key={topic.name}
                onClick={() => setSelectedTopic(topic)}
                className={`p-4 rounded-2xl text-left transition-all duration-300 glass-panel border flex flex-col justify-between ${
                  isSelected
                    ? 'border-purple-400/60 bg-purple-500/15 shadow-[0_0_20px_rgba(168,85,247,0.2)] -translate-y-1'
                    : 'border-white/[0.06] hover:border-white/[0.18] hover:bg-white/[0.04]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-slate-500">DSA PATTERN</span>
                  <Code2 className={`w-3.5 h-3.5 ${isSelected ? 'text-purple-300' : 'text-slate-500'}`} />
                </div>

                <div className="font-bold text-sm text-white mb-1">
                  {topic.name}
                </div>

                <div className="text-[10px] font-mono text-purple-300/90 truncate">
                  {topic.complexity}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Topic Inspector Card */}
        {selectedTopic && (
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/[0.08] mb-16 bg-dark-900/80">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-8 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-purple-400">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>PATTERN ANALYSIS // {selectedTopic.name.toUpperCase()}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {selectedTopic.name}
                </h3>
                <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed">
                  {selectedTopic.description}
                </p>
              </div>

              <div className="md:col-span-4 p-4 rounded-2xl bg-dark-950 border border-white/[0.06] font-mono text-xs">
                <div className="text-slate-400 text-[10px] uppercase tracking-wider mb-2">Complexity Target</div>
                <div className="text-lg font-bold text-cyan-300">{selectedTopic.complexity}</div>
                <div className="mt-2 text-[11px] text-slate-400 pt-2 border-t border-white/[0.06]">
                  Practicing edge cases, recurrence relations, and in-place memory optimization.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CURRENTLY LEARNING AREA */}
        <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/[0.08] relative overflow-hidden">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-white/[0.06]">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">
                <Activity className="w-3.5 h-3.5 text-emerald-400" />
                <span>CONTINUOUS PROGRESS TRACKER</span>
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                Currently Learning & Expanding
              </h3>
            </div>
            
            <span className="text-xs font-mono text-slate-400 bg-white/[0.03] px-3 py-1.5 rounded-xl border border-white/[0.06]">
              Daily Discipline • Zero Shortcuts
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentlyLearning.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-dark-950/70 border border-white/[0.05] hover:border-cyan-500/30 transition-colors group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
                      {item.status}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>

                  <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {item.topic}
                  </h4>

                  <p className="text-xs text-slate-400 font-light mt-2 leading-relaxed">
                    {item.detail}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/[0.04] text-[10px] font-mono text-slate-500 flex items-center justify-between">
                  <span>ACTIVE TRACK</span>
                  <span className="text-cyan-400">IN PROGRESS ➔</span>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
