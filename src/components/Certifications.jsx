import React from 'react';
import { Award, CheckCircle2 } from 'lucide-react';
import { certifications } from '../data/portfolioData';

export default function Certifications() {
  return (
    <section className="py-24 bg-[#fafaf9] border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-700 mb-3">
            VALIDATIONS
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-2">
            CERTIFICATIONS
          </h2>
          <p className="text-slate-600 text-base font-normal">
            Programs completed through recognized educational and industry platforms.
          </p>
        </div>

        {/* Credentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certifications.map((cert, idx) => (
            <div
              key={idx}
              className="p-7 rounded-2xl bg-white border border-slate-200 shadow-soft hover:shadow-lift transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-blue-700 font-mono">
                    {cert.organization}
                  </span>
                  <div className="flex items-center gap-1 text-xs font-medium text-slate-500">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                    <span>Verified</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 tracking-tight mb-2">
                  {cert.title}
                </h3>

                <p className="text-slate-600 text-sm leading-relaxed font-normal">
                  {cert.focus}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Accredited Completion</span>
                <span className="font-medium text-slate-700">{cert.organization}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
