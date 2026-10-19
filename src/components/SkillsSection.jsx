import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Layers, Database, Cpu, Wrench, Code2, Globe } from 'lucide-react';
import { skillsData } from '../data/portfolioData';

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const categories = ['ALL', ...skillsData.map((s) => s.category)];

  const displayedSkills = activeCategory === 'ALL'
    ? skillsData
    : skillsData.filter((s) => s.category === activeCategory);

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'PROGRAMMING':
        return <Code2 className="w-4 h-4 text-[#A8875A]" />;
      case 'WEB':
        return <Globe className="w-4 h-4 text-[#A8875A]" />;
      case 'DATA':
        return <Layers className="w-4 h-4 text-[#A8875A]" />;
      case 'BACKEND':
        return <Terminal className="w-4 h-4 text-[#A8875A]" />;
      case 'DATABASE':
        return <Database className="w-4 h-4 text-[#A8875A]" />;
      case 'FOUNDATIONS':
        return <Cpu className="w-4 h-4 text-[#A8875A]" />;
      case 'TOOLS':
        return <Wrench className="w-4 h-4 text-[#A8875A]" />;
      default:
        return <Code2 className="w-4 h-4 text-[#A8875A]" />;
    }
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-32 sm:py-40 lg:py-48 bg-[#EDE4D8] text-[#292522] overflow-hidden"
      role="region"
      aria-label="Technical Skills Ecosystem"
    >
      {/* Subtle Top Section Transition Divider */}
      <div className="section-divider absolute top-0 left-0 right-0" />

      {/* ─────────────────────────────────────────────────────────────
          ATMOSPHERIC BRONZE & CHAMPAGNE LIGHT SOURCE BEHIND SKILLS SECTION
      ───────────────────────────────────────────────────────────── */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] sm:w-[900px] h-[550px] rounded-full blur-[180px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(168, 135, 90, 0.08) 0%, rgba(222, 211, 197, 0.40) 50%, transparent 80%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10 font-sans">
        
        {/* Section Header */}
        <div
          className="mb-16 sm:mb-20"
          style={{
            transition: 'opacity 800ms cubic-bezier(0.22, 1, 0.36, 1), transform 800ms cubic-bezier(0.22, 1, 0.36, 1)',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0px)' : 'translateY(30px)',
          }}
        >
          <div className="inline-flex items-center gap-2.5 mb-4 px-3.5 py-1.5 rounded-full bg-[#FFFCF7] border border-[#DED3C5] shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A8875A] animate-pulse" />
            <span className="text-xs font-serif tracking-[0.25em] uppercase text-[#A8875A] font-bold">
              CAPABILITIES
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.12] text-[#292522] max-w-2xl">
            TECHNICAL ECOSYSTEM.
          </h2>
          <p className="mt-4 text-[#5F5750] text-base sm:text-lg font-normal max-w-xl leading-relaxed">
            Core competencies engineered through practical projects, continuous algorithmic study, and software development fundamentals.
          </p>
        </div>

        {/* Category Tabs / Filter */}
        <div className="flex flex-wrap items-center gap-2.5 mb-14 border-b border-[#DED3C5] pb-6">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-serif font-bold tracking-[0.14em] uppercase transition-all duration-250 focus-visible:ring-2 focus-visible:ring-[#A8875A] ${
                  isActive
                    ? 'bg-[#292522] text-[#F7F3ED] border border-[#292522] shadow-[0_4px_18px_rgba(41,37,34,0.18)] -translate-y-0.5'
                    : 'bg-[#FFFCF7] text-[#5F5750] hover:text-[#292522] border border-[#DED3C5] hover:border-[#A8875A] hover:-translate-y-0.5'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Skill Clusters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {displayedSkills.map((group) => (
            <div
              key={group.category}
              className="p-7 rounded-[20px] bg-[#FFFCF7] border border-[#DED3C5] hover:border-[#A8875A] card-hover-subtle shadow-[0_6px_24px_-4px_rgba(41,37,34,0.06)] flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    {getCategoryIcon(group.category)}
                    <span className="text-xs font-serif tracking-[0.18em] font-bold uppercase text-[#292522]">
                      {group.category}
                    </span>
                  </div>
                  <span className="text-xs font-serif text-[#7D736A] font-medium">
                    {group.skills.length} TECH
                  </span>
                </div>

                <p className="text-sm text-[#5F5750] font-normal leading-relaxed mb-6">
                  {group.description}
                </p>
              </div>

              {/* Skill Nodes */}
              <div className="flex flex-wrap gap-2 pt-3 border-t border-[#DED3C5]">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-lg bg-[#EDE4D8] hover:bg-[#FFFCF7] border border-[#DED3C5] hover:border-[#A8875A] text-xs font-serif text-[#292522] font-medium pill-hover-effect cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
