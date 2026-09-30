import React, { useState } from 'react';
import { FileText, Cpu, Binary, GitCompare, PieChart, Sparkles, CheckCircle2 } from 'lucide-react';

export default function ResumePipelineVisual() {
  const [activeStage, setActiveStage] = useState(2); // Default to TF-IDF

  const stages = [
    {
      id: 0,
      title: "1. RESUME INGESTION",
      icon: FileText,
      subtitle: "Unstructured Document Parsing",
      desc: "Extracts raw text strings from PDF/DOCX candidate submissions and target Job Descriptions.",
      metrics: "Tokens Parsed: 1,420 words",
      codeSnippet: "raw_text = extract_text_from_pdf(resume_file)"
    },
    {
      id: 1,
      title: "2. TEXT PROCESSING",
      icon: Cpu,
      subtitle: "Tokenization & Lemmatization",
      desc: "Cleans punctuation, executes stopword filtering, lowercases vocabulary, and stems morphological variants.",
      metrics: "Stopwords Removed: 412 words",
      codeSnippet: "tokens = [lemmatize(w) for w in text if w not in STOPWORDS]"
    },
    {
      id: 2,
      title: "3. TF-IDF VECTORIZATION",
      icon: Binary,
      subtitle: "Sparse Term Weighting",
      desc: "Transforms vocabulary into high-dimensional vector representations balancing frequency with inverse corpus rarity.",
      metrics: "Vector Dimension: [1, 2400]",
      codeSnippet: "tfidf_matrix = TfidfVectorizer(ngram_range=(1,2)).fit_transform(corpus)"
    },
    {
      id: 3,
      title: "4. COSINE SIMILARITY",
      icon: GitCompare,
      subtitle: "Angular Vector Metric",
      desc: "Computes the geometric dot product of normalized resume and job requirement vector embeddings: cos(θ) = (A · B) / (||A|| ||B||).",
      metrics: "Cosine Metric: 0.8842",
      codeSnippet: "similarity_score = dot(vec_resume, vec_job) / (norm_r * norm_j)"
    },
    {
      id: 4,
      title: "5. MATCH ANALYSIS",
      icon: PieChart,
      subtitle: "Candidate Fit Diagnostic",
      desc: "Generates competency match percentile, isolates missing technical requirements, and surfaces alignment index.",
      metrics: "Match Index: 88.4%",
      codeSnippet: "report = generate_alignment_report(similarity_score, missing_skills)"
    }
  ];

  return (
    <div className="w-full rounded-2xl bg-dark-900/90 border border-white/[0.08] p-5 sm:p-6 text-slate-100 overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-5 border-b border-white/[0.06]">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-mono text-xs text-emerald-300 font-semibold tracking-wider uppercase">
            NLP Vector Space Pipeline
          </span>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
          <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.06]">
            Scikit-Learn / SciPy Framework
          </span>
        </div>
      </div>

      {/* Pipeline Navigation Nodes */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-6">
        {stages.map((stage) => {
          const isSelected = activeStage === stage.id;
          const Icon = stage.icon;

          return (
            <button
              key={stage.id}
              onClick={() => setActiveStage(stage.id)}
              className={`text-left p-3 rounded-xl border transition-all duration-200 flex flex-col justify-between ${
                isSelected
                  ? 'border-emerald-400/60 bg-emerald-500/15 shadow-[0_0_18px_rgba(16,185,129,0.2)]'
                  : 'border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/[0.15]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <Icon className={`w-4 h-4 ${isSelected ? 'text-emerald-300' : 'text-slate-400'}`} />
                <span className="text-[9px] font-mono text-slate-500">Stage 0{stage.id + 1}</span>
              </div>
              <div className="font-mono text-[11px] font-bold text-white leading-tight">
                {stage.title.split('. ')[1]}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Stage Deep-Dive */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 rounded-xl bg-dark-950/80 border border-white/[0.06] p-4 font-mono">
        <div className="md:col-span-7 flex flex-col justify-between">
          <div>
            <div className="text-xs text-emerald-400 font-bold mb-1">
              {stages[activeStage].title}: {stages[activeStage].subtitle}
            </div>
            <p className="text-xs text-slate-300 font-sans leading-relaxed mt-2">
              {stages[activeStage].desc}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center gap-3">
            <span className="text-[11px] text-slate-400">Diagnostic Metric:</span>
            <span className="text-xs font-bold text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              {stages[activeStage].metrics}
            </span>
          </div>
        </div>

        <div className="md:col-span-5 flex flex-col justify-between bg-dark-900/60 p-3 rounded-lg border border-white/[0.04]">
          <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>Python Execution Snippet</span>
            <span className="text-emerald-400 font-mono">.py</span>
          </div>

          <pre className="text-[11px] text-emerald-300/90 bg-black/40 p-2.5 rounded border border-white/[0.04] overflow-x-auto">
            <code>{stages[activeStage].codeSnippet}</code>
          </pre>

          <div className="mt-2 text-[10px] text-slate-500 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            <span>Mathematical Vector Alignment Validated</span>
          </div>
        </div>
      </div>
    </div>
  );
}
