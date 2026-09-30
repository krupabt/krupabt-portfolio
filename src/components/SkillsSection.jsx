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
        return <Code2 className="w-4 h-4 text-blue-400" />;
      case 'WEB':
        return <Globe className="w-4 h-4 text-sky-400" />;
      case 'DATA':
        return <Layers className="w-4 h-4 text-blue-400" />;
      case 'BACKEND':
        return <Terminal className="w-4 h-4 text-blue-500" />;
      case 'DATABASE':
        return <Database className="w-4 h-4 text-emerald-400" />;
      case 'FOUNDATIONS':
        return <Cpu className="w-4 h-4 text-cyan-400" />;
      case 'TOOLS':
        return <Wrench className="w-4 h-4 text-slate-400" />;
      default:
        return <Code2 className="w-4 h-4 text-blue-400" />;
    }
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-32 sm:py-40 lg:py-48 text-[#F8FAFC] overflow-hidden"
      role="region"
      aria-label="Technical Skills Ecosystem"
    >
      {/* Subtle Top Section Transition Divider */}
      <div className="section-divider absolute top-0 left-0 right-0" />

      {/* ─────────────────────────────────────────────────────────────
          ATMOSPHERIC BLUE LIGHT SOURCE BEHIND SKILLS SECTION
      ───────────────────────────────────────────────────────────── */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] sm:w-[900px] h-[550px] rounded-full blur-[180px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(91, 140, 255, 0.14) 0%, rgba(17, 24, 39, 0.40) 50%, transparent 80%)',
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
          <div className="inline-flex items-center gap-2.5 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5B8CFF] animate-pulse" />
            <span className="text-xs font-mono tracking-[0.25em] uppercase text-[#7AA2FF] font-semibold">
              CAPABILITIES
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.12] text-[#F5F7FA] max-w-2xl">
            TECHNICAL ECOSYSTEM.
          </h2>
          <p className="mt-4 text-[#9AA4B2] text-base sm:text-lg font-normal max-w-xl leading-relaxed">
            Core competencies engineered through practical projects, continuous algorithmic study, and software development fundamentals.
          </p>
        </div>

        {/* Category Tabs / Filter */}
        <div className="flex flex-wrap items-center gap-2.5 mb-14 border-b border-white/[0.08] pb-6">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-[0.12em] uppercase transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#5B8CFF]/50 ${
                  isActive
                    ? 'bg-[#5B8CFF] text-white font-semibold shadow-[0_4px_16px_rgba(91,140,255,0.25)]'
                    : 'bg-[#0D1118]/80 text-[#9AA4B2] hover:text-[#F5F7FA] border border-white/[0.12] hover:border-[#5B8CFF]/40'
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
              className="p-7 rounded-[20px] bg-[rgba(17,24,39,0.55)] border border-white/[0.08] hover:border-[#5B8CFF]/35 card-hover-subtle transition-all duration-500 shadow-lg flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    {getCategoryIcon(group.category)}
                    <span className="text-xs font-mono tracking-[0.2em] font-bold uppercase text-[#F5F7FA]">
                      {group.category}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-[#6F7A89] font-medium">
                    {group.skills.length} TECH
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#9AA4B2] font-normal leading-relaxed mb-6">
                  {group.description}
                </p>
              </div>

              {/* Skill Nodes */}
              <div className="flex flex-wrap gap-2 pt-3 border-t border-white/[0.08]">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-lg bg-[#111827] hover:bg-[#162032] border border-white/[0.08] hover:border-[#5B8CFF]/40 text-xs font-mono text-[#D7DCE5] hover:text-[#F5F7FA] font-medium transition-all duration-300"
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
