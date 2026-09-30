import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { projects } from '../data/portfolioData';
import DeepfakeVisual from './projects/DeepfakeVisual';
import OnlineShopVisual from './projects/OnlineShopVisual';
import ResumeVisual from './projects/ResumeVisual';
import ExpenseVisual from './projects/ExpenseVisual';
import ProjectModal from './projects/ProjectModal';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  const renderVisual = (type) => {
    switch (type) {
      case 'deepfake':
        return <DeepfakeVisual />;
      case 'ecommerce':
        return <OnlineShopVisual />;
      case 'resume':
        return <ResumeVisual />;
      case 'expense':
        return <ExpenseVisual />;
      default:
        return null;
    }
  };

  return (
    <section id="projects" className="py-32 bg-slate-900 text-white relative overflow-hidden">
      
      {/* Subtle background gradient lighting for depth */}
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-24">
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-400 mb-3 font-mono">
            FEATURED WORK
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight mb-4">
            PROJECTS
          </h2>
          <p className="text-slate-400 text-lg sm:text-xl font-normal leading-relaxed">
            Practical software systems, machine learning applications, and full-stack tools built with focus on clean architecture and usability.
          </p>
        </div>

        {/* Large Editorial Project Showcases */}
        <div className="space-y-32">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center pt-8 border-t border-slate-800"
            >
              
              {/* Left Column: Project Information */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Number & Category */}
                <div className="flex items-center gap-3">
                  <span className="text-sm font-mono font-bold text-blue-400">
                    {proj.number}
                  </span>
                  <span className="text-slate-600">—</span>
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                    {proj.category}
                  </span>
                </div>

                {/* Title */}
                <div>
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-1">
                    {proj.title}
                  </h3>
                  <div className="text-sm font-medium text-blue-400 mt-1">
                    {proj.subtitle}
                  </div>
                </div>

                {/* Description */}
                <p className="text-slate-300 text-base leading-relaxed font-normal">
                  {proj.shortDesc}
                </p>

                {/* Key Features */}
                <div className="space-y-2 pt-1">
                  {proj.keyFeatures.slice(0, 3).map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {proj.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700/80"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* View Project Button */}
                <div className="pt-4">
                  <button
                    onClick={() => setSelectedProject(proj)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold bg-white text-slate-900 hover:bg-blue-400 hover:text-slate-950 transition-colors shadow-sm"
                  >
                    <span>VIEW PROJECT</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>

              </div>

              {/* Right Column: Clean Software Product Visual */}
              <div className="lg:col-span-7 w-full">
                {renderVisual(proj.hasCustomVisual)}
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Case Study Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
