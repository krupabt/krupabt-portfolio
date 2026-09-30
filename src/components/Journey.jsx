import React from 'react';
import { journeyTimeline } from '../data/portfolioData';

export default function Journey() {
  return (
    <section className="py-24 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-700 mb-3">
            MILESTONES
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-2">
            PERSONAL JOURNEY
          </h2>
          <p className="text-slate-600 text-base font-normal">
            A chronological timeline of my technical evolution and academic progress.
          </p>
        </div>

        {/* Journey Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {journeyTimeline.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-50/60 border border-slate-200 hover:border-slate-300 hover:bg-white transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="text-2xl font-black font-mono text-blue-600 mb-2">
                  {item.year}
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-200/80 text-[10px] font-mono text-slate-400">
                PHASE 0{idx + 1}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
