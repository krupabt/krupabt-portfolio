import React from 'react';
import { Code2, ArrowRight } from 'lucide-react';
import { dsaConcepts, currentlyLearningList } from '../data/portfolioData';

export default function ProblemSolving() {
  return (
    <section id="dsa" className="py-28 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-700 mb-3">
            ALGORITHMIC PRACTICE
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            PROBLEM SOLVING
          </h2>
          <p className="text-slate-600 text-lg sm:text-xl font-normal leading-relaxed">
            "Continuously improving my DSA and problem-solving skills through coding practice."
          </p>
        </div>

        {/* DSA Concepts Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 mb-16">
          {dsaConcepts.map((concept, index) => (
            <div
              key={concept}
              className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 hover:bg-white hover:shadow-soft transition-all duration-200 flex flex-col justify-between group cursor-default"
            >
              <div className="flex items-center justify-between mb-3 text-[11px] font-mono text-slate-400">
                <span>0{index + 1}</span>
                <Code2 className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition-colors" />
              </div>
              <div className="font-semibold text-sm text-slate-800 group-hover:text-blue-700 transition-colors">
                {concept}
              </div>
            </div>
          ))}
        </div>

        {/* CURRENTLY LEARNING SUB-SECTION */}
        <div className="p-8 sm:p-10 rounded-2xl bg-[#fafaf9] border border-slate-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 mb-6 border-b border-slate-200">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                CONTINUOUS GROWTH
              </div>
              <h3 className="text-2xl font-bold text-slate-900">
                CURRENTLY LEARNING
              </h3>
            </div>
            <p className="text-sm text-slate-500 max-w-md">
              Expanding depth across software systems, core algorithms, and intelligent architectures.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {currentlyLearningList.map((item) => (
              <div
                key={item}
                className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-sm font-medium text-slate-800 shadow-xs"
              >
                <span className="w-2 h-2 rounded-full bg-blue-600" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
