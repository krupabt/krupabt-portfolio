import React from 'react';
import { Calendar, MapPin, CheckCircle2, GraduationCap, Briefcase } from 'lucide-react';
import { experience, education } from '../data/portfolioData';

export default function Experience() {
  return (
    <section id="experience" className="py-28 bg-[#fafaf9] border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-700 mb-3">
            BACKGROUND
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            EXPERIENCE & EDUCATION
          </h2>
          <p className="text-slate-600 text-lg sm:text-xl font-normal leading-relaxed">
            Practical development internship experience alongside rigorous undergraduate engineering foundations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Experience Card */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 shadow-soft flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                  DEVELOPMENT INTERNSHIP
                </span>
                <span className="text-xs font-mono text-slate-500">
                  January 2026 — April 2026
                </span>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 tracking-tight mb-1">
                {experience[0].role}
              </h3>
              <div className="text-base font-semibold text-slate-700 mb-4">
                {experience[0].company} • Bengaluru, India
              </div>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                {experience[0].description}
              </p>

              {/* Technologies Worked On */}
              <div className="mb-6">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5">
                  Technologies & Competencies
                </div>
                <div className="flex flex-wrap gap-2">
                  {experience[0].technologies.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-800 border border-slate-200/80"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Responsibilities */}
              <div className="space-y-2.5 pt-4 border-t border-slate-100">
                {experience[0].responsibilities.map((resp, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                    <span>{resp}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Education Card */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 shadow-soft flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                  UNDERGRADUATE DEGREE
                </span>
                <span className="text-xs font-mono text-slate-500">
                  {education.period}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 tracking-tight mb-1">
                {education.degree}
              </h3>
              <div className="text-base font-semibold text-slate-700 mb-6">
                {education.institution}
              </div>

              {/* GPA Highlight Box — Only shown here */}
              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 mb-6 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Cumulative GPA
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Academic Standing
                  </div>
                </div>
                <div className="text-2xl font-extrabold text-blue-700 font-mono">
                  {education.gpa}
                </div>
              </div>

              <p className="text-slate-600 text-sm leading-relaxed font-normal">
                {education.details}
              </p>
            </div>

            <div className="pt-6 border-t border-slate-100 text-xs text-slate-500 font-medium">
              Bengaluru, Karnataka, India
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
