import React from 'react';
import { ArrowRight, CheckCircle2, Video, Eye, Layers, Activity, ShieldCheck } from 'lucide-react';

export default function DeepfakeVisual() {
  const steps = [
    { label: "IMAGE / VIDEO", icon: Video, desc: "Frame Extraction" },
    { label: "CNN", icon: Eye, desc: "Spatial Filters" },
    { label: "VGG16 / MobileNet", icon: Layers, desc: "Feature Extraction" },
    { label: "GRU", icon: Activity, desc: "Temporal Modeling" },
    { label: "DETECTION", icon: ShieldCheck, desc: "Classification" }
  ];

  return (
    <div className="w-full rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 text-white shadow-xl">
      {/* Product Header */}
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
          <span className="text-xs font-semibold text-slate-300">
            Detection Architecture Pipeline
          </span>
        </div>
        <span className="text-xs font-mono text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded">
          Django / MySQL Backend
        </span>
      </div>

      {/* Clean Step Flow Diagram */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 mb-6">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div
              key={step.label}
              className="p-3.5 rounded-xl bg-slate-800/70 border border-slate-750 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono text-slate-400">0{idx + 1}</span>
                <Icon className="w-4 h-4 text-blue-400" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-100 leading-tight">
                  {step.label}
                </div>
                <div className="text-[10px] text-slate-400 mt-1">
                  {step.desc}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Media Inspection Summary Box */}
      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
        <div className="space-y-1">
          <div className="text-slate-400">Pipeline Methodology:</div>
          <div className="text-slate-200 font-medium">
            Sequential frame analysis evaluating spatial warping and temporal continuity across video frames.
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-blue-400 font-mono shrink-0">
          <CheckCircle2 className="w-4 h-4" />
          <span>Model Evaluated</span>
        </div>
      </div>
    </div>
  );
}
