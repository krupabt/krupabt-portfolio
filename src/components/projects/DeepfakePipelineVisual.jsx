import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Video, Eye, Layers, Activity, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function DeepfakePipelineVisual() {
  const [activeStage, setActiveStage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const stages = [
    {
      step: "01",
      label: "IMAGE / VIDEO INPUT",
      desc: "Decompose video stream into spatial frame sequences & region-of-interest face crops",
      icon: Video,
      color: "text-cyan-400",
      border: "border-cyan-500/50",
      activeBg: "bg-cyan-500/10",
      dataPill: "256x256 RGB Tensor"
    },
    {
      step: "02",
      label: "CNN PRE-PROCESSING",
      desc: "Normalization, frequency domain decomposition, and multi-scale texture filtering",
      icon: Eye,
      color: "text-sky-400",
      border: "border-sky-500/50",
      activeBg: "bg-sky-500/10",
      dataPill: "Edge & Artifact Filters"
    },
    {
      step: "03",
      label: "VGG16 / MOBILENET",
      desc: "Deep spatial feature extraction across convolutional layers capturing blend seams & warping",
      icon: Layers,
      color: "text-indigo-400",
      border: "border-indigo-500/50",
      activeBg: "bg-indigo-500/10",
      dataPill: "Feature Vector [512-dim]"
    },
    {
      step: "04",
      label: "TEMPORAL GRU",
      desc: "Gated Recurrent Units model frame-to-frame temporal coherence and micro-expression flickers",
      icon: Activity,
      color: "text-purple-400",
      border: "border-purple-500/50",
      activeBg: "bg-purple-500/10",
      dataPill: "Hidden Sequence State"
    },
    {
      step: "05",
      label: "DETECTION RESULT",
      desc: "Dense classification layer generates probability score differentiating authentic from deepfake media",
      icon: ShieldCheck,
      color: "text-emerald-400",
      border: "border-emerald-500/50",
      activeBg: "bg-emerald-500/10",
      dataPill: "Binary Probability Output"
    }
  ];

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % stages.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [isPlaying, stages.length]);

  return (
    <div className="w-full rounded-2xl bg-dark-900/90 border border-white/[0.08] p-5 sm:p-6 text-slate-100 overflow-hidden shadow-2xl">
      {/* Visual Header & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-5 border-b border-white/[0.06]">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
          <span className="font-mono text-xs text-cyan-300 font-semibold tracking-wider uppercase">
            Deep Learning Architecture Flow
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-2.5 py-1 rounded-lg text-xs font-mono bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 flex items-center gap-1.5 border border-white/[0.08]"
            title={isPlaying ? "Pause automated flow" : "Resume flow"}
          >
            {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            <span>{isPlaying ? "Pause Flow" : "Simulate"}</span>
          </button>
          <button
            onClick={() => setActiveStage(0)}
            className="p-1 rounded-lg text-xs bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 border border-white/[0.08]"
            title="Restart from stage 1"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Pipeline Stage Sequence */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5 mb-6">
        {stages.map((stage, idx) => {
          const isCurrent = activeStage === idx;
          const isPast = activeStage > idx;
          const Icon = stage.icon;

          return (
            <div
              key={stage.step}
              onClick={() => {
                setActiveStage(idx);
                setIsPlaying(false);
              }}
              className={`relative p-3 rounded-xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                isCurrent
                  ? `${stage.border} ${stage.activeBg} shadow-[0_0_20px_rgba(0,242,254,0.15)] scale-[1.02]`
                  : isPast
                  ? 'border-white/[0.12] bg-white/[0.03] opacity-80'
                  : 'border-white/[0.04] bg-white/[0.01] opacity-50 hover:opacity-75'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[10px] text-slate-400">{stage.step}</span>
                <Icon className={`w-3.5 h-3.5 ${isCurrent ? stage.color : 'text-slate-400'}`} />
              </div>
              <div className="font-mono text-xs font-bold tracking-tight text-white mb-1">
                {stage.label}
              </div>
              <div className="text-[10px] font-mono text-slate-400 truncate">
                {stage.dataPill}
              </div>

              {/* Progress track at bottom */}
              <div className="w-full bg-slate-800 h-0.5 rounded-full mt-2.5 overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${
                    isCurrent ? 'w-full bg-cyan-400' : isPast ? 'w-full bg-slate-600' : 'w-0'
                  }`}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Stage Detailed Telemetry */}
      <div className="rounded-xl bg-dark-950/80 border border-white/[0.06] p-4 font-mono">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="text-cyan-400 font-semibold">
            &gt; STAGE {stages[activeStage].step}: {stages[activeStage].label}
          </span>
          <span className="text-[10px] text-slate-500 uppercase">Architecture Telemetry</span>
        </div>
        <p className="text-xs text-slate-300 font-sans leading-relaxed">
          {stages[activeStage].desc}
        </p>
        <div className="mt-3 pt-3 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
          <span className="flex items-center gap-1.5 text-cyan-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
            Layer Specification: {stages[activeStage].dataPill}
          </span>
          <span className="text-slate-500 text-[10px]">
            Spatial-Temporal Evaluation Active
          </span>
        </div>
      </div>
    </div>
  );
}
