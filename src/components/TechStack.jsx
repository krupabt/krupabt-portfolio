import React from 'react';
import { techStackCategories } from '../data/portfolioData';

export default function TechStack() {
  return (
    <section id="skills" className="py-28 bg-[#fafaf9] border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-700 mb-3">
            CAPABILITIES
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            TECH STACK
          </h2>
          <p className="text-slate-600 text-base sm:text-lg font-normal leading-relaxed">
            Languages, frameworks, libraries, and tools I use to build practical software and explore intelligent algorithms.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {techStackCategories.map((group) => (
            <div
              key={group.category}
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-soft hover:shadow-lift transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                  <h3 className="text-xs font-bold text-slate-400 tracking-wider uppercase font-mono">
                    {group.category}
                  </h3>
                  <span className="text-[10px] font-mono text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                    {group.skills.length} Items
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-lg text-sm font-medium bg-slate-50 text-slate-800 border border-slate-200/80 hover:border-blue-400 hover:text-blue-700 hover:bg-blue-50/40 transition-all cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-100 text-[11px] text-slate-400">
                Applied across practical projects & coursework
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
