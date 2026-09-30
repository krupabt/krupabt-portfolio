import React, { useState } from 'react';
import { Terminal, Cpu, Database, Globe, Sparkles, Layers, ArrowRight, Code2 } from 'lucide-react';
import { technologies, techCategories } from '../data/portfolioData';

export default function TechConstellation() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedTech, setSelectedTech] = useState(technologies[0]); // Default to Python

  const filteredTech = activeCategory === "All" 
    ? technologies 
    : technologies.filter(t => t.category === activeCategory || (activeCategory === "Languages" && (t.name === "Python" || t.name === "Java" || t.name === "SQL")));

  return (
    <section id="tech" className="relative py-28 bg-dark-950 overflow-hidden border-t border-white/[0.04]">
      {/* Layered ambient lighting */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Subtle technical background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-cyan-400 mb-3 uppercase tracking-wider">
              <Terminal className="w-3.5 h-3.5" />
              <span>02 // Interactive Tech Ecosystem</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Central Architecture & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">
                Technology Constellation
              </span>
            </h2>
          </div>

          <p className="mt-4 md:mt-0 text-slate-400 text-sm max-w-md font-light leading-relaxed">
            Connected around practical engineering. Hover or select any node to inspect architectural context and exact project utilization.
          </p>
        </div>

        {/* Central Ecosystem Hub & Category Filter */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {techCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono tracking-wide transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_15px_rgba(0,242,254,0.2)] font-semibold'
                    : 'text-slate-400 glass-panel border border-white/[0.06] hover:text-slate-200 hover:border-white/[0.15]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Core Ecosystem Badge */}
          <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-slate-400">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>Center Node: <span className="text-white font-bold">KRUPA</span> (All 18 Nodes Linked)</span>
          </div>
        </div>

        {/* Constellation Nodes Grid with Central Hub Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-8">
          {filteredTech.map((tech) => {
            const isSelected = selectedTech?.name === tech.name;

            return (
              <div
                key={tech.name}
                onMouseEnter={() => setSelectedTech(tech)}
                onClick={() => setSelectedTech(tech)}
                className={`group relative p-4 rounded-2xl transition-all duration-300 glass-panel border cursor-pointer select-none flex flex-col justify-between min-h-[120px] ${
                  isSelected
                    ? 'border-cyan-400/70 bg-cyan-500/10 shadow-[0_0_25px_rgba(0,242,254,0.25)] -translate-y-1'
                    : 'border-white/[0.06] hover:border-white/[0.2] hover:bg-white/[0.04]'
                }`}
              >
                {/* Node Connection Indicator */}
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-2 h-2 rounded-full transition-all ${
                    isSelected ? 'bg-cyan-400 shadow-[0_0_8px_#00f2fe]' : 'bg-slate-700 group-hover:bg-cyan-400/50'
                  }`} />
                  <span className="text-[9px] font-mono text-slate-500 uppercase">
                    {tech.level}
                  </span>
                </div>

                {/* Tech Title */}
                <div>
                  <h3 className={`text-base font-bold tracking-tight transition-colors ${
                    isSelected ? 'text-cyan-300' : 'text-slate-100 group-hover:text-cyan-400'
                  }`}>
                    {tech.name}
                  </h3>
                  <div className="text-[10px] font-mono text-slate-400 mt-1 truncate">
                    {tech.category}
                  </div>
                </div>

                {/* Connection Thread Marker */}
                <div className="mt-2 pt-2 border-t border-white/[0.05] flex items-center justify-between text-[9px] font-mono text-slate-500">
                  <span>KRUPA ➔ {tech.name}</span>
                  <span className={isSelected ? 'text-cyan-400 font-bold' : 'text-slate-600'}>●</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Telemetry & Usage Inspector Card */}
        {selectedTech && (
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-cyan-500/30 shadow-2xl bg-gradient-to-r from-dark-900/95 via-dark-900/90 to-dark-950/95 relative overflow-hidden animate-in fade-in duration-200">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              
              {/* Left Details */}
              <div className="md:col-span-8 space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                    NODE INSPECTOR // {selectedTech.name.toUpperCase()}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    Category: {selectedTech.category}
                  </span>
                </div>

                <h4 className="text-2xl font-bold text-white tracking-tight">
                  {selectedTech.name}
                </h4>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
                  {selectedTech.description}
                </p>

                {/* Where I used it */}
                <div className="pt-2 flex items-start gap-2 text-xs sm:text-sm text-cyan-300 font-mono">
                  <span className="text-slate-400 shrink-0 font-semibold">Practical Application:</span>
                  <span className="text-slate-200">{selectedTech.usedIn}</span>
                </div>
              </div>

              {/* Right Hub Node Visual representation */}
              <div className="md:col-span-4 p-5 rounded-2xl bg-dark-950/90 border border-white/[0.08] font-mono text-xs text-slate-300 space-y-2">
                <div className="flex items-center justify-between text-cyan-400 pb-2 border-b border-white/[0.06]">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    ECOSYSTEM NEXUS
                  </span>
                  <span className="text-[10px] text-slate-500">LIVE LINK</span>
                </div>

                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-400">Source:</span>
                  <span className="font-bold text-cyan-300">KRUPA (Developer Hub)</span>
                </div>

                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-400">Target Technology:</span>
                  <span className="font-bold text-white">{selectedTech.name}</span>
                </div>

                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-400">Integration Level:</span>
                  <span className="text-emerald-400 font-semibold">Project Proven</span>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
