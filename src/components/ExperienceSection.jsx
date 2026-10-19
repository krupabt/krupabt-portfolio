import React, { useState, useEffect, useRef } from 'react';
import { Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { experienceData } from '../data/portfolioData';

export default function ExperienceSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    // Triggers when 20-30% of the section enters the viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.22, rootMargin: '0px 0px -10% 0px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-32 sm:py-40 lg:py-48 text-[#F2FDF7] overflow-hidden"
      role="region"
      aria-label="Professional Experience"
    >
      {/* Subtle Top Section Transition Divider */}
      <div className="section-divider absolute top-0 left-0 right-0" />

      {/* ─────────────────────────────────────────────────────────────
          ATMOSPHERIC EMERALD LIGHT SOURCES BEHIND EXPERIENCE SECTION
      ───────────────────────────────────────────────────────────── */}
      <div
        className="absolute top-1/4 left-10 w-[600px] h-[600px] rounded-full blur-[170px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, rgba(17, 28, 24, 0.40) 50%, transparent 80%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 right-8 w-[480px] h-[480px] rounded-full blur-[160px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(52, 211, 153, 0.08) 0%, rgba(11, 19, 16, 0.45) 50%, transparent 75%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10 font-sans">
        
        {/* Section Header */}
        <div
          className="mb-20 sm:mb-24"
          style={{
            transition: 'opacity 800ms cubic-bezier(0.22, 1, 0.36, 1), transform 800ms cubic-bezier(0.22, 1, 0.36, 1)',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0px)' : 'translateY(30px)',
          }}
        >
          <div className="inline-flex items-center gap-2.5 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
            <span className="text-xs font-serif tracking-[0.25em] uppercase text-[#34D399] font-bold">
              EXPERIENCE
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.12] text-[#F2FDF7] max-w-2xl">
            PRACTICAL ENGINEERING.
          </h2>
          <p className="mt-4 text-[#93A79E] text-base sm:text-lg font-normal max-w-xl leading-relaxed">
            Applied software development, hands-on application logic, database architecture, and quality testing.
          </p>
        </div>

        {/* Vertical Timeline Container with Visible Growing Line */}
        <div className="relative pl-6 sm:pl-10 space-y-16">
          
          {/* Base Track */}
          <div className="absolute left-0 top-3 bottom-3 w-[2px] bg-white/[0.08] overflow-hidden rounded-full">
            <div
              className="w-full bg-gradient-to-b from-[#10B981] via-[#10B981]/60 to-[#111C18] rounded-full"
              style={{
                transition: 'height 1200ms cubic-bezier(0.22, 1, 0.36, 1)',
                height: isVisible ? '100%' : '0%',
                boxShadow: isVisible ? '0 0 16px rgba(16, 185, 129, 0.45)' : 'none',
              }}
            />
          </div>

          {experienceData.map((exp, idx) => (
            <div
              key={idx}
              className="relative group"
              style={{
                transition: 'opacity 850ms cubic-bezier(0.22, 1, 0.36, 1), transform 850ms cubic-bezier(0.22, 1, 0.36, 1)',
                transitionDelay: `${400 + idx * 250}ms`,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateX(0px)' : 'translateX(40px)',
              }}
            >
              
              {/* Pulsing Timeline Node */}
              <div
                className="absolute -left-[31px] sm:-left-[47px] top-2 w-4 h-4 rounded-full bg-[#060A08] border-2 border-[#10B981] flex items-center justify-center shadow-[0_0_12px_rgba(16,185,129,0.5)]"
                style={{
                  transition: 'opacity 600ms cubic-bezier(0.22, 1, 0.36, 1), transform 600ms cubic-bezier(0.22, 1, 0.36, 1)',
                  transitionDelay: `${450 + idx * 250}ms`,
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'scale(1)' : 'scale(0.5)',
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-ping" />
              </div>

              {/* Experience Card */}
              <div className="p-8 sm:p-10 rounded-[20px] bg-[rgba(17,28,24,0.65)] border border-white/[0.08] hover:border-[#10B981]/45 card-hover-subtle transition-all duration-300 shadow-xl space-y-6">
                
                {/* Meta Row: Role, Company, Period */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#F2FDF7] tracking-tight">
                      {exp.role}
                    </h3>
                    <div className="text-base font-bold text-[#10B981] mt-1 font-serif">
                      {exp.company}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs font-serif text-[#93A79E]">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#10B981]" />
                      <span>{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#10B981]" />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>

                {/* Resume Bullets */}
                <div className="space-y-3.5 pt-2">
                  {exp.bullets.map((bullet, bIdx) => (
                    <div key={bIdx} className="flex items-start gap-3.5 text-sm sm:text-base font-normal text-[#CFDDD6] leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-[#10B981] mt-1 flex-shrink-0" />
                      <span>
                        {typeof bullet === 'string' && bullet.includes('**')
                          ? bullet.split(/(\*\*.*?\*\*)/g).map((part, i) =>
                              part.startsWith('**') && part.endsWith('**') ? (
                                <strong key={i} className="font-bold text-[#F2FDF7]">
                                  {part.slice(2, -2)}
                                </strong>
                              ) : (
                                part
                              )
                            )
                          : bullet}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/[0.08]">
                  {exp.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1.5 text-xs font-serif text-[#CFDDD6] bg-[#111C18] border border-white/[0.08] rounded-lg pill-hover-effect hover:border-[#10B981]/50 hover:text-[#F2FDF7]"
                    >
                      {t}
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
