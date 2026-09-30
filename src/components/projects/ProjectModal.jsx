import React, { useEffect } from 'react';
import { X, ExternalLink, CheckCircle2 } from 'lucide-react';
import { GithubIcon } from '../Icons';

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative w-full max-w-3xl bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-2xl z-10 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-lg text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
          aria-label="Close Case Study"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Category & Index */}
        <div className="flex items-center gap-2 text-xs font-mono font-semibold text-blue-700 mb-2">
          <span>PROJECT {project.number}</span>
          <span>•</span>
          <span>{project.category}</span>
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
          {project.title}
        </h2>
        <div className="text-sm font-medium text-slate-500 mb-6">
          {project.subtitle}
        </div>

        {/* Narrative */}
        <div className="space-y-6 text-slate-600 text-sm sm:text-base leading-relaxed mb-8">
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
              Project Overview
            </h3>
            <p className="text-slate-600">
              {project.longDesc}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
              Key Engineering Accomplishments
            </h3>
            <div className="space-y-2.5">
              {project.keyFeatures.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Technologies Deployed */}
        <div className="mb-8 pt-6 border-t border-slate-100">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
            Technologies & Frameworks
          </div>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 text-slate-800 border border-slate-200"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs text-slate-500">
            Source code and documentation available upon request.
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => alert("GitHub repository link is configurable.")}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub Repo</span>
            </button>
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-slate-900 text-white hover:bg-blue-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
