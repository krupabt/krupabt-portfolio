import React from 'react';
import { Code2, Brain, Layers, Cpu, ArrowUpRight } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function About() {
  const themes = [
    {
      num: "01",
      title: "PYTHON",
      desc: "My primary language for building backend systems, machine learning prototypes, and automation tools. Focused on clean modular scripts and data transformations.",
      highlights: ["Data Processing (NumPy, Pandas)", "Backend Services (Django)", "Desktop GUI (CustomTkinter)"]
    },
    {
      num: "02",
      title: "AI/ML",
      desc: "Curious about intelligent systems and computer vision. Transforming theoretical architectures into practical media authentication and text evaluation tools.",
      highlights: ["Deepfake Detection (VGG16 / GRU)", "NLP Tokenization & TF-IDF", "Cosine Similarity Vector Space"]
    },
    {
      num: "03",
      title: "FULL-STACK",
      desc: "Connecting reactive client-side interfaces with robust RESTful APIs and relational databases. Focused on practical utility, clean code, and predictable states.",
      highlights: ["Modern React & JavaScript", "REST API (Node.js / Express)", "Relational Databases (SQL / MySQL)"]
    },
    {
      num: "04",
      title: "DSA",
      desc: "Actively solving algorithmic problems to build strong computational intuition, optimize space-time complexity, and write performant code.",
      highlights: ["Two Pointers & Sliding Windows", "Binary Trees & Graph Traversals", "Recursion & Dynamic Programming"]
    }
  ];

  return (
    <section id="about" className="py-28 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-700 mb-3">
            ABOUT ME
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
            "{personalInfo.aboutStatement}"
          </h2>
          <p className="text-slate-600 text-lg sm:text-xl font-normal leading-relaxed">
            {personalInfo.whoIAm}
          </p>
        </div>

        {/* Four Visual Themes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {themes.map((theme) => (
            <div
              key={theme.num}
              className="p-8 rounded-2xl bg-slate-50/70 border border-slate-200 hover:border-slate-300 hover:bg-white transition-all duration-300 shadow-soft hover:shadow-lift flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold text-blue-600">
                    {theme.num}
                  </span>
                  <div className="w-2 h-2 rounded-full bg-slate-300 group-hover:bg-blue-600 transition-colors" />
                </div>

                <h3 className="text-2xl font-bold text-slate-900 tracking-tight mb-3">
                  {theme.title}
                </h3>

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                  {theme.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/80">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Areas of Focus
                </div>
                <div className="flex flex-wrap gap-2">
                  {theme.highlights.map((h, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-md text-xs font-medium bg-white text-slate-700 border border-slate-200"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
