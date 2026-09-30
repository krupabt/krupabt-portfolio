import React from 'react';
import { MapPin, Mail, ArrowUpRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { personalInfo } from '../data/portfolioData';

export default function ProfileCard() {
  return (
    <section className="py-14 bg-[#fafaf9] border-y border-slate-200">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        
        {/* Editorial Identity Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 shadow-soft flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-base tracking-tight shadow-sm">
                KB
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                  {personalInfo.name}
                </h3>
                <div className="text-xs font-semibold text-blue-700">
                  {personalInfo.role}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs sm:text-sm text-slate-600 pt-1">
              <span className="font-medium text-slate-800">{personalInfo.education}</span>
              <span>•</span>
              <span>{personalInfo.institution}</span>
              <span>•</span>
              <span className="inline-flex items-center gap-1 text-slate-500">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {personalInfo.location}
              </span>
            </div>
          </div>

          {/* Direct Quick Links */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>

            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              <LinkedinIcon className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>

            <a
              href={`mailto:${personalInfo.email}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium text-white bg-slate-900 hover:bg-blue-600 transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email</span>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
