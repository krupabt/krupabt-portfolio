import React from 'react';
import { FileText, CheckCircle2, TrendingUp, Cpu, Binary } from 'lucide-react';

export default function ResumeVisual() {
  const matchedSkills = ["Python", "SQL", "Machine Learning", "REST APIs", "Git"];

  return (
    <div className="w-full rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 text-white shadow-xl">
      {/* Product Header */}
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-teal-400" />
          <span className="text-xs font-semibold text-slate-300">
            Resume Match Diagnostic View
          </span>
        </div>
        <span className="text-xs font-mono text-teal-400 bg-teal-950/60 px-2.5 py-1 rounded border border-teal-800/60">
          NLP Pipeline Active
        </span>
      </div>

      {/* Main Scoring Display */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center mb-6">
        
        {/* Left Similarity Metric Gauge */}
        <div className="sm:col-span-5 p-5 rounded-xl bg-slate-800/80 border border-slate-700/80 text-center">
          <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2">
            Cosine Similarity Match
          </div>
          <div className="text-4xl font-extrabold text-teal-300 font-mono">
            88.4%
          </div>
          <div className="text-xs text-slate-400 mt-2">
            High Alignment with Job Spec
          </div>
        </div>

        {/* Right Matched Competencies */}
        <div className="sm:col-span-7 space-y-3">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Detected Technical Competencies
          </div>
          <div className="flex flex-wrap gap-2">
            {matchedSkills.map((skill) => (
              <span
                key={skill}
                className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700 flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-3 h-3 text-teal-400" />
                <span>{skill}</span>
              </span>
            ))}
          </div>
          <div className="text-[11px] text-slate-400 pt-1">
            Processed via TF-IDF tokenization & vector dot-product scoring.
          </div>
        </div>

      </div>

      {/* Bottom Pipeline Status */}
      <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs text-slate-400">
        <div className="font-mono text-slate-400">
          <span className="text-teal-400">TF-IDF Matrix:</span> [1, 2400] Vocabulary Dimension
        </div>
        <div className="flex items-center gap-1 text-[11px] text-slate-400">
          <Binary className="w-3.5 h-3.5 text-teal-400" />
          <span>Vector Normalized</span>
        </div>
      </div>
    </div>
  );
}
